export type ProjectStage =
  | 'idea'
  | 'prototype'
  | 'experiment'
  | 'grow'
  | 'maintain'
  | 'dormant'
  | 'archived';

export interface ProjectScore {
  activity: number;
  maintainability: number;
  reuse: number;
  potential: number;
  total: number;
}

export interface ReusableAsset {
  id: string;
  name: string;
  category: 'auth' | 'ui' | 'llm' | 'database' | 'api' | 'utility' | 'infra';
  sourceProject: string;
  description: string;
  language: string;
  codeSnippet: string;
  tags: string[];
  usageCount: number;
  appliedProjects?: string[];
  createdAt: string;
}

export interface PostMortem {
  stoppedDate: string;
  failedReason: string;
  detailedAnalysis: string;
  keyLearning: string;
  extractedAssets: string[];
  revivalTrigger: string;
  totalHoursInvested?: number;
}

export interface ProjectDNA {
  architecture: string;
  keyPatterns: string[];
  promptPatterns?: string[];
  dependencies: Record<string, string>;
  linesOfCode?: number;
  commitVelocityWeekly: number;
  lastCommitMessage?: string;
  githubUrl?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'graveyard';
  stage: ProjectStage;
  createdAt: string;
  lastActivityAt: string;
  stack: string[];
  score: ProjectScore;
  assets: string[];
  nextAction: string;
  nextActionCategory: 'code' | 'validation' | 'refactor' | 'deploy' | 'marketing' | 'feature' | 'assetize';
  dna: ProjectDNA;
  postMortem?: PostMortem;
  stars?: number;
  forks?: number;
  openIssues?: number;
  isFavorite?: boolean;
  isPrivate?: boolean;
}

export interface IdeaItem {
  id: string;
  title: string;
  description: string;
  viabilityScore: number;
  estimatedEffort: 'weekend' | '1-week' | '2-weeks' | '1-month';
  suggestedStack: string[];
  status: 'inbox' | 'promoted' | 'discarded';
  createdAt: string;
  tags: string[];
}

export interface PortfolioSummary {
  totalProjects: number;
  growing: number;
  experiment: number;
  maintaining: number;
  dormant: number;
  archived: number;
  totalAssetsExtracted: number;
  monthlyProjectsCreated: number;
  monthlyCommitsCount: number;
  topWorthContinuingProjects: string[];
}

export interface GitHubAuthToken {
  token: string;
  username: string;
  avatarUrl?: string;
  rateLimitRemaining?: number;
  rateLimitTotal?: number;
  rateLimitReset?: string;
  isValid: boolean;
}

export type ActiveTab =
  | 'dashboard'
  | 'radar'
  | 'sprints'
  | 'synergy'
  | 'assets'
  | 'graveyard'
  | 'ideas'
  | 'dna'
  | 'actions'
  | 'copilot';
