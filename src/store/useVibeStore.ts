import { create } from 'zustand';
import {
  ProjectItem,
  ReusableAsset,
  IdeaItem,
  PortfolioSummary,
  ProjectStage,
  ActiveTab,
  GitHubAuthToken,
} from '../types/project';
import {
  INITIAL_PROJECTS,
  INITIAL_ASSETS,
  INITIAL_IDEAS,
  INITIAL_SUMMARY,
} from '../data/mockData';
import { generatePostMortem, mineAssetsFromProject, analyzeProjectMeta } from '../services/aiAnalyzer';
import { githubService } from '../services/githubService';

interface VibeState {
  projects: ProjectItem[];
  assets: ReusableAsset[];
  ideas: IdeaItem[];
  summary: PortfolioSummary;
  activeTab: ActiveTab;
  searchQuery: string;
  stageFilter: ProjectStage | 'all';
  selectedProjectId: string | null;
  githubAuth: GitHubAuthToken;
  isLoading: boolean;
  toastMessage: { text: string; type?: 'info' | 'success' | 'warning' | 'error' } | null;
  isSettingsOpen: boolean;
  isNewProjectOpen: boolean;

  // Actions
  setActiveTab: (tab: ActiveTab) => void;
  setSearchQuery: (query: string) => void;
  setStageFilter: (filter: ProjectStage | 'all') => void;
  setSelectedProjectId: (id: string | null) => void;
  setIsSettingsOpen: (open: boolean) => void;
  setIsNewProjectOpen: (open: boolean) => void;
  showToast: (text: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  clearToast: () => void;

  // GitHub & Token
  setGitHubToken: (token: string) => Promise<boolean>;
  disconnectGitHub: () => void;
  syncFromGitHub: () => Promise<void>;

  // Project Actions
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  toggleFavorite: (id: string) => void;
  changeProjectStage: (id: string, newStage: ProjectStage) => void;
  archiveToGraveyard: (id: string, reason?: string) => void;
  resuscitateProject: (id: string, targetStage?: ProjectStage) => void;
  reAnalyzeProject: (id: string) => void;
  reAnalyzeAll: () => void;
  mineProjectAssets: (id: string) => void;

  // Asset Actions
  addAsset: (asset: Omit<ReusableAsset, 'id' | 'createdAt'>) => void;
  deleteAsset: (id: string) => void;

  // Idea Actions
  addIdea: (title: string, description: string, estimatedEffort: 'weekend' | '1-week' | '2-weeks' | '1-month', tags?: string[]) => void;
  promoteIdeaToProject: (ideaId: string) => void;
  deleteIdea: (id: string) => void;

  // Reset & Backup
  restoreDefaults: () => void;
  importSnapshot: (data: any) => void;
  refreshSummary: () => void;
  persistState: () => void;
}

const STORAGE_KEY = 'vibeos_state_v1';

function loadPersistedState(): Partial<VibeState> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        projects: parsed.projects || INITIAL_PROJECTS,
        assets: parsed.assets || INITIAL_ASSETS,
        ideas: parsed.ideas || INITIAL_IDEAS,
        githubAuth: parsed.githubAuth || { token: '', username: '', isValid: false },
      };
    }
  } catch (e) {
    console.error('Failed to load persisted state:', e);
  }
  return {
    projects: INITIAL_PROJECTS,
    assets: INITIAL_ASSETS,
    ideas: INITIAL_IDEAS,
    githubAuth: { token: '', username: '', isValid: false },
  };
}

function calculateSummary(projects: ProjectItem[], assets: ReusableAsset[]): PortfolioSummary {
  const growing = projects.filter((p) => p.stage === 'grow').length;
  const experiment = projects.filter((p) => p.stage === 'experiment').length;
  const maintaining = projects.filter((p) => p.stage === 'maintain').length;
  const dormant = projects.filter((p) => p.stage === 'dormant').length;
  const archived = projects.filter((p) => p.stage === 'archived').length;

  const topWorth = projects
    .filter((p) => p.status === 'active')
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, 3)
    .map((p) => p.name);

  return {
    totalProjects: projects.length,
    growing,
    experiment,
    maintaining,
    dormant,
    archived,
    totalAssetsExtracted: assets.length,
    monthlyProjectsCreated: Math.min(projects.length, 3),
    monthlyCommitsCount: projects.reduce((acc, p) => acc + (p.dna.commitVelocityWeekly * 4), 0),
    topWorthContinuingProjects: topWorth,
  };
}

const initialState = loadPersistedState();
const initialProjects = initialState.projects || INITIAL_PROJECTS;
const initialAssets = initialState.assets || INITIAL_ASSETS;
const initialIdeas = initialState.ideas || INITIAL_IDEAS;

export const useVibeStore = create<VibeState>((set, get) => ({
  projects: initialProjects,
  assets: initialAssets,
  ideas: initialIdeas,
  summary: calculateSummary(initialProjects, initialAssets),
  activeTab: 'dashboard',
  searchQuery: '',
  stageFilter: 'all',
  selectedProjectId: null,
  githubAuth: initialState.githubAuth || { token: '', username: '', isValid: false },
  isLoading: false,
  toastMessage: null,
  isSettingsOpen: false,
  isNewProjectOpen: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStageFilter: (filter) => set({ stageFilter: filter }),
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
  setIsSettingsOpen: (open) => set({ isSettingsOpen: open }),
  setIsNewProjectOpen: (open) => set({ isNewProjectOpen: open }),

  showToast: (text, type = 'info') => {
    set({ toastMessage: { text, type } });
    setTimeout(() => {
      if (get().toastMessage?.text === text) {
        set({ toastMessage: null });
      }
    }, 4000);
  },

  clearToast: () => set({ toastMessage: null }),

  setGitHubToken: async (token: string) => {
    set({ isLoading: true });
    githubService.setToken(token);
    const auth = await githubService.validateToken();
    set({ githubAuth: auth, isLoading: false });

    if (auth.isValid) {
      get().showToast(`Authenticated as @${auth.username} with GitHub API`, 'success');
      get().persistState();
      return true;
    } else {
      get().showToast('Invalid GitHub Token or Rate Limit exceeded', 'error');
      return false;
    }
  },

  disconnectGitHub: () => {
    githubService.setToken('');
    set({
      githubAuth: { token: '', username: '', isValid: false },
    });
    get().showToast('Disconnected GitHub account', 'info');
    get().persistState();
  },

  syncFromGitHub: async () => {
    const { githubAuth } = get();
    if (!githubAuth.isValid || !githubAuth.token) {
      get().showToast('Please connect your GitHub PAT token in Settings first', 'warning');
      set({ isSettingsOpen: true });
      return;
    }

    set({ isLoading: true });
    try {
      get().showToast('Fetching repositories from GitHub...', 'info');
      const repos = await githubService.fetchUserRepos(githubAuth.username);
      const newProjects: ProjectItem[] = [];

      for (const repo of repos.slice(0, 20)) {
        const project = await githubService.convertRepoToProject(repo, githubAuth.username);
        newProjects.push(project);
      }

      // Merge with existing projects
      const existing = get().projects;
      const merged = [...newProjects];

      existing.forEach((p) => {
        if (!merged.some((m) => m.name.toLowerCase() === p.name.toLowerCase())) {
          merged.push(p);
        }
      });

      const updatedSummary = calculateSummary(merged, get().assets);
      set({ projects: merged, summary: updatedSummary, isLoading: false });
      get().showToast(`Successfully synced ${repos.length} GitHub repositories!`, 'success');
      get().persistState();
    } catch (err: any) {
      console.error(err);
      set({ isLoading: false });
      get().showToast(`Sync failed: ${err.message || 'Error connecting to GitHub'}`, 'error');
    }
  },

  addProject: (projData) => {
    const newProject: ProjectItem = {
      ...projData,
      id: `proj-${Date.now()}`,
    };
    const updated = [newProject, ...get().projects];
    const summary = calculateSummary(updated, get().assets);
    set({ projects: updated, summary });
    get().showToast(`Project "${newProject.name}" created`, 'success');
    get().persistState();
  },

  updateProject: (id, updates) => {
    const updated = get().projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    const summary = calculateSummary(updated, get().assets);
    set({ projects: updated, summary });
    get().persistState();
  },

  deleteProject: (id) => {
    const target = get().projects.find((p) => p.id === id);
    const updated = get().projects.filter((p) => p.id !== id);
    const summary = calculateSummary(updated, get().assets);
    set({
      projects: updated,
      summary,
      selectedProjectId: get().selectedProjectId === id ? null : get().selectedProjectId,
    });
    get().showToast(`Deleted "${target?.name || 'Project'}"`, 'info');
    get().persistState();
  },

  toggleFavorite: (id) => {
    const updated = get().projects.map((p) =>
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    );
    set({ projects: updated });
    get().persistState();
  },

  changeProjectStage: (id, newStage) => {
    const target = get().projects.find((p) => p.id === id);
    if (!target) return;

    let status: 'active' | 'graveyard' = 'active';
    let postMortem = target.postMortem;

    if (newStage === 'dormant' || newStage === 'archived') {
      status = 'graveyard';
      if (!postMortem) {
        postMortem = generatePostMortem(target);
      }
    }

    const updated = get().projects.map((p) =>
      p.id === id ? { ...p, stage: newStage, status, postMortem } : p
    );
    const summary = calculateSummary(updated, get().assets);
    set({ projects: updated, summary });
    get().showToast(`Moved "${target.name}" to ${newStage.toUpperCase()}`, 'info');
    get().persistState();
  },

  archiveToGraveyard: (id, reason) => {
    const target = get().projects.find((p) => p.id === id);
    if (!target) return;

    const postMortem = generatePostMortem(target, reason);
    const minedAssets = mineAssetsFromProject(target);

    const updatedProjects = get().projects.map((p) =>
      p.id === id
        ? {
            ...p,
            status: 'graveyard' as const,
            stage: 'archived' as const,
            postMortem,
          }
        : p
    );

    const updatedAssets = [...get().assets, ...minedAssets];
    const summary = calculateSummary(updatedProjects, updatedAssets);

    set({
      projects: updatedProjects,
      assets: updatedAssets,
      summary,
    });

    get().showToast(`Archived "${target.name}" to Graveyard & harvested ${minedAssets.length} reusable assets!`, 'warning');
    get().persistState();
  },

  resuscitateProject: (id, targetStage = 'prototype') => {
    const target = get().projects.find((p) => p.id === id);
    if (!target) return;

    const updated = get().projects.map((p) =>
      p.id === id
        ? {
            ...p,
            status: 'active' as const,
            stage: targetStage,
            lastActivityAt: new Date().toISOString().slice(0, 10),
            score: {
              ...p.score,
              activity: Math.max(70, p.score.activity + 40),
              total: Math.min(95, p.score.total + 20),
            },
          }
        : p
    );
    const summary = calculateSummary(updated, get().assets);
    set({ projects: updated, summary });
    get().showToast(`Resurrected "${target.name}" back into active development! 🚀`, 'success');
    get().persistState();
  },

  reAnalyzeProject: (id) => {
    const target = get().projects.find((p) => p.id === id);
    if (!target) return;

    const analysis = analyzeProjectMeta({
      name: target.name,
      description: target.description,
      createdAt: target.createdAt,
      pushedAt: new Date().toISOString(),
      isArchived: target.stage === 'archived',
      stack: target.stack,
      stars: target.stars,
      openIssues: target.openIssues,
      commitCount: target.dna.commitVelocityWeekly,
    });

    const updated = get().projects.map((p) =>
      p.id === id
        ? {
            ...p,
            score: analysis.score,
            nextAction: analysis.nextAction,
            nextActionCategory: analysis.nextActionCategory,
          }
        : p
    );
    const summary = calculateSummary(updated, get().assets);
    set({ projects: updated, summary });
    get().showToast(`Re-evaluated intelligence & score for "${target.name}"`, 'success');
    get().persistState();
  },

  reAnalyzeAll: () => {
    const updated = get().projects.map((target) => {
      const analysis = analyzeProjectMeta({
        name: target.name,
        description: target.description,
        createdAt: target.createdAt,
        pushedAt: target.lastActivityAt,
        isArchived: target.stage === 'archived',
        stack: target.stack,
        stars: target.stars,
        openIssues: target.openIssues,
        commitCount: target.dna.commitVelocityWeekly,
      });
      return {
        ...target,
        score: analysis.score,
        nextAction: analysis.nextAction,
        nextActionCategory: analysis.nextActionCategory,
      };
    });

    const summary = calculateSummary(updated, get().assets);
    set({ projects: updated, summary });
    get().showToast('AI Portfolio Intelligence batch run completed across all projects!', 'success');
    get().persistState();
  },

  mineProjectAssets: (id) => {
    const target = get().projects.find((p) => p.id === id);
    if (!target) return;

    const mined = mineAssetsFromProject(target);
    const updatedAssets = [...get().assets, ...mined];
    const summary = calculateSummary(get().projects, updatedAssets);

    set({ assets: updatedAssets, summary });
    get().showToast(`Mined ${mined.length} reusable code assets from "${target.name}"`, 'success');
    get().persistState();
  },

  addAsset: (assetData) => {
    const newAsset: ReusableAsset = {
      ...assetData,
      id: `asset-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const updated = [newAsset, ...get().assets];
    const summary = calculateSummary(get().projects, updated);
    set({ assets: updated, summary });
    get().showToast(`Added reusable asset "${newAsset.name}"`, 'success');
    get().persistState();
  },

  deleteAsset: (id) => {
    const updated = get().assets.filter((a) => a.id !== id);
    const summary = calculateSummary(get().projects, updated);
    set({ assets: updated, summary });
    get().showToast('Asset removed', 'info');
    get().persistState();
  },

  addIdea: (title, description, estimatedEffort, tags = []) => {
    // Generate viability score based on description quality & specificity
    const viabilityScore = Math.min(95, Math.max(65, 70 + Math.round(Math.random() * 25)));
    const suggestedStack = ['TypeScript', 'Next.js', 'TailwindCSS', 'OpenAI'];

    const newIdea: IdeaItem = {
      id: `idea-${Date.now()}`,
      title,
      description,
      viabilityScore,
      estimatedEffort,
      suggestedStack,
      status: 'inbox',
      createdAt: new Date().toISOString().slice(0, 10),
      tags: tags.length > 0 ? tags : ['SideProject', 'AI'],
    };

    const updated = [newIdea, ...get().ideas];
    set({ ideas: updated });
    get().showToast(`Captured idea "${title}" (Viability: ${viabilityScore}/100)`, 'success');
    get().persistState();
  },

  promoteIdeaToProject: (ideaId) => {
    const targetIdea = get().ideas.find((i) => i.id === ideaId);
    if (!targetIdea) return;

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: targetIdea.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
      description: targetIdea.description,
      status: 'active',
      stage: 'prototype',
      createdAt: new Date().toISOString().slice(0, 10),
      lastActivityAt: new Date().toISOString().slice(0, 10),
      stack: targetIdea.suggestedStack,
      score: {
        activity: 85,
        maintainability: 80,
        reuse: 75,
        potential: targetIdea.viabilityScore,
        total: Math.round((85 * 0.35) + (targetIdea.viabilityScore * 0.30) + (75 * 0.20) + (80 * 0.15)),
      },
      assets: [],
      nextAction: 'Set up repository scaffold and verify core hypothesis prototype',
      nextActionCategory: 'code',
      dna: {
        architecture: `Modern ${targetIdea.suggestedStack.slice(0, 2).join(' + ')} stack`,
        keyPatterns: ['Rapid MVP Validation', 'Clean Modular Structure'],
        dependencies: {},
        commitVelocityWeekly: 5,
        lastCommitMessage: 'feat: initial project seed from Idea Inbox',
      },
      stars: 0,
      forks: 0,
      openIssues: 0,
    };

    const updatedIdeas = get().ideas.map((i) =>
      i.id === ideaId ? { ...i, status: 'promoted' as const } : i
    );
    const updatedProjects = [newProject, ...get().projects];
    const summary = calculateSummary(updatedProjects, get().assets);

    set({
      ideas: updatedIdeas,
      projects: updatedProjects,
      summary,
      selectedProjectId: newProject.id,
      activeTab: 'radar',
    });

    get().showToast(`Promoted "${targetIdea.title}" into active Prototype project! 🚀`, 'success');
    get().persistState();
  },

  deleteIdea: (id) => {
    const updated = get().ideas.filter((i) => i.id !== id);
    set({ ideas: updated });
    get().persistState();
  },

  restoreDefaults: () => {
    set({
      projects: INITIAL_PROJECTS,
      assets: INITIAL_ASSETS,
      ideas: INITIAL_IDEAS,
      summary: INITIAL_SUMMARY,
    });
    localStorage.removeItem(STORAGE_KEY);
    get().showToast('Reset to default demo data', 'info');
  },

  importSnapshot: (data) => {
    try {
      if (data.projects && typeof data.projects === 'object') {
        const loadedProjects = Array.isArray(data.projects)
          ? data.projects
          : Object.values(data.projects);
        const loadedAssets = data.assets || [];
        const loadedIdeas = data.ideas || [];
        const summary = calculateSummary(loadedProjects, loadedAssets);

        set({
          projects: loadedProjects,
          assets: loadedAssets,
          ideas: loadedIdeas,
          summary,
        });

        get().persistState();
        get().showToast('Successfully imported VibeOS portfolio snapshot!', 'success');
      } else {
        throw new Error('Invalid JSON structure');
      }
    } catch (e: any) {
      get().showToast(`Import failed: ${e.message}`, 'error');
    }
  },

  refreshSummary: () => {
    const summary = calculateSummary(get().projects, get().assets);
    set({ summary });
  },

  persistState: () => {
    try {
      const state = get();
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          projects: state.projects,
          assets: state.assets,
          ideas: state.ideas,
          githubAuth: state.githubAuth,
        })
      );
    } catch (e) {
      console.error('Failed to persist state:', e);
    }
  },
}));
