import { ProjectItem, GitHubAuthToken, ProjectStage } from '../types/project';
import { analyzeProjectMeta } from './aiAnalyzer';

const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  pushed_at: string;
  updated_at: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  fork: boolean;
  topics?: string[];
  default_branch: string;
}

export class GitHubService {
  private token: string = '';

  constructor(token?: string) {
    if (token) {
      this.token = token;
    }
  }

  setToken(token: string) {
    this.token = token.trim();
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async validateToken(): Promise<GitHubAuthToken> {
    if (!this.token) {
      return {
        token: '',
        username: '',
        isValid: false,
      };
    }

    try {
      const res = await fetch(`${GITHUB_API_BASE}/user`, {
        headers: this.getHeaders(),
      });

      const remaining = Number(res.headers.get('x-ratelimit-remaining') || 0);
      const total = Number(res.headers.get('x-ratelimit-limit') || 5000);
      const reset = res.headers.get('x-ratelimit-reset')
        ? new Date(Number(res.headers.get('x-ratelimit-reset')) * 1000).toLocaleTimeString()
        : undefined;

      if (!res.ok) {
        return {
          token: this.token,
          username: '',
          isValid: false,
          rateLimitRemaining: remaining,
          rateLimitTotal: total,
          rateLimitReset: reset,
        };
      }

      const user = await res.json();
      return {
        token: this.token,
        username: user.login,
        avatarUrl: user.avatar_url,
        isValid: true,
        rateLimitRemaining: remaining,
        rateLimitTotal: total,
        rateLimitReset: reset,
      };
    } catch (error) {
      console.error('GitHub token validation error:', error);
      return {
        token: this.token,
        username: '',
        isValid: false,
      };
    }
  }

  async fetchUserRepos(username?: string): Promise<GitHubRepoResponse[]> {
    const url = username
      ? `${GITHUB_API_BASE}/users/${username}/repos?sort=pushed&per_page=100`
      : `${GITHUB_API_BASE}/user/repos?sort=pushed&per_page=100&type=all`;

    const res = await fetch(url, {
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const repos: GitHubRepoResponse[] = await res.json();
    // Filter out forks if desired or include all
    return repos;
  }

  async fetchRepoPackageJson(owner: string, repo: string): Promise<Record<string, any> | null> {
    try {
      const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/package.json`, {
        headers: this.getHeaders(),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.content && data.encoding === 'base64') {
        const decoded = atob(data.content.replace(/\s/g, ''));
        return JSON.parse(decoded);
      }
      return null;
    } catch {
      return null;
    }
  }

  async fetchRepoRecentCommits(owner: string, repo: string): Promise<{ count: number; lastMessage: string }> {
    try {
      const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=10`, {
        headers: this.getHeaders(),
      });
      if (!res.ok) return { count: 0, lastMessage: '' };
      const commits = await res.json();
      if (Array.isArray(commits) && commits.length > 0) {
        return {
          count: commits.length,
          lastMessage: commits[0]?.commit?.message || '',
        };
      }
      return { count: 0, lastMessage: '' };
    } catch {
      return { count: 0, lastMessage: '' };
    }
  }

  async convertRepoToProject(repo: GitHubRepoResponse, owner: string): Promise<ProjectItem> {
    const pkg = await this.fetchRepoPackageJson(owner, repo.name);
    const commitsInfo = await this.fetchRepoRecentCommits(owner, repo.name);

    const dependencies: Record<string, string> = {
      ...(pkg?.dependencies || {}),
      ...(pkg?.devDependencies || {}),
    };

    const stack: string[] = [];
    if (repo.language) stack.push(repo.language);
    if (dependencies['react'] || dependencies['react-dom']) stack.push('React');
    if (dependencies['next']) stack.push('Next.js');
    if (dependencies['vue']) stack.push('Vue');
    if (dependencies['tailwindcss']) stack.push('TailwindCSS');
    if (dependencies['fastapi'] || dependencies['pydantic']) stack.push('FastAPI');
    if (dependencies['openai'] || dependencies['@anthropic-ai/sdk']) stack.push('LLM/AI');
    if (dependencies['typescript'] && !stack.includes('TypeScript')) stack.push('TypeScript');

    if (repo.topics && repo.topics.length > 0) {
      repo.topics.forEach((t) => {
        if (!stack.includes(t)) stack.push(t);
      });
    }

    const { stage, score, nextAction, nextActionCategory } = analyzeProjectMeta({
      name: repo.name,
      description: repo.description || '',
      createdAt: repo.created_at,
      pushedAt: repo.pushed_at,
      isArchived: repo.archived,
      stack,
      stars: repo.stargazers_count,
      openIssues: repo.open_issues_count,
      commitCount: commitsInfo.count,
    });

    return {
      id: `gh-${repo.id}`,
      name: repo.name,
      description: repo.description || 'Imported from GitHub repository without description.',
      status: (stage === 'dormant' || stage === 'archived') ? 'graveyard' : 'active',
      stage,
      createdAt: repo.created_at.slice(0, 10),
      lastActivityAt: repo.pushed_at ? repo.pushed_at.slice(0, 10) : repo.updated_at.slice(0, 10),
      stack: stack.length > 0 ? stack : ['JavaScript'],
      score,
      assets: [],
      nextAction,
      nextActionCategory,
      dna: {
        architecture: `Standard ${stack.slice(0, 2).join(' + ')} architecture`,
        keyPatterns: ['Git-tracked repository', 'Automated CI/CD ready'],
        dependencies,
        commitVelocityWeekly: Math.max(1, commitsInfo.count * 2),
        lastCommitMessage: commitsInfo.lastMessage || 'Synced from GitHub',
        githubUrl: repo.html_url,
      },
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
    };
  }

  async triggerWorkflowDispatch(
    owner: string,
    repo: string,
    workflowFileName: string = 'vibeos-analyzer.yml',
    ref: string = 'main'
  ): Promise<boolean> {
    if (!this.token) {
      throw new Error('GitHub PAT token required to trigger workflow_dispatch');
    }

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/workflows/${workflowFileName}/dispatches`;
    const res = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ ref }),
    });

    return res.status === 204 || res.ok;
  }
}

export const githubService = new GitHubService();
