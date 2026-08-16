import { ProjectStage, ProjectScore, PostMortem, ReusableAsset, ProjectItem } from '../types/project';

export interface MetaAnalysisInput {
  name: string;
  description: string;
  createdAt: string;
  pushedAt: string;
  isArchived?: boolean;
  stack: string[];
  stars?: number;
  openIssues?: number;
  commitCount?: number;
}

export function analyzeProjectMeta(input: MetaAnalysisInput): {
  stage: ProjectStage;
  score: ProjectScore;
  nextAction: string;
  nextActionCategory: 'code' | 'validation' | 'refactor' | 'deploy' | 'marketing';
} {
  const now = new Date();
  const pushDate = input.pushedAt ? new Date(input.pushedAt) : new Date(input.createdAt);
  const diffDays = Math.floor((now.getTime() - pushDate.getTime()) / (1000 * 60 * 60 * 24));
  const stars = input.stars || 0;
  const issues = input.openIssues || 0;
  const commits = input.commitCount || 1;

  // 1. Calculate Activity Score (0 - 100)
  let activity = 0;
  if (diffDays <= 7) activity = 90 + Math.min(10, commits * 2);
  else if (diffDays <= 30) activity = 70 + Math.max(0, 20 - diffDays);
  else if (diffDays <= 90) activity = 40 + Math.max(0, (90 - diffDays) / 2);
  else activity = Math.max(5, 30 - Math.floor(diffDays / 10));
  activity = Math.min(100, Math.max(0, Math.round(activity)));

  // 2. Calculate Maintainability Score (0 - 100)
  let maintainability = 65;
  if (input.stack.includes('TypeScript')) maintainability += 15;
  if (input.stack.includes('TailwindCSS')) maintainability += 5;
  if (issues > 5) maintainability -= Math.min(20, issues * 2);
  maintainability = Math.min(98, Math.max(30, maintainability));

  // 3. Calculate Reuse Score (0 - 100)
  let reuse = 50;
  if (input.stack.some(s => ['FastAPI', 'Next.js', 'React', 'Zod', 'Prisma'].includes(s))) reuse += 25;
  if (input.stack.some(s => s.toLowerCase().includes('ai') || s.toLowerCase().includes('llm') || s.toLowerCase().includes('openai'))) reuse += 15;
  reuse = Math.min(95, Math.max(20, reuse));

  // 4. Calculate Potential Score (0 - 100)
  let potential = 55 + Math.min(30, stars * 3);
  if (activity > 75) potential += 10;
  if (input.description && input.description.length > 30) potential += 5;
  potential = Math.min(96, Math.max(20, potential));

  // 5. Total Weighted Score
  const total = Math.round(
    activity * 0.35 +
    potential * 0.30 +
    reuse * 0.20 +
    maintainability * 0.15
  );

  const score: ProjectScore = {
    activity,
    maintainability,
    reuse,
    potential,
    total,
  };

  // 6. Stage Auto-Classification
  let stage: ProjectStage = 'experiment';
  if (input.isArchived) {
    stage = 'archived';
  } else if (diffDays > 120) {
    stage = 'dormant';
  } else if (activity >= 85 && stars > 15) {
    stage = 'grow';
  } else if (diffDays <= 45 && maintainability > 75 && activity < 70) {
    stage = 'maintain';
  } else if (commits <= 2 || diffDays <= 7) {
    stage = 'prototype';
  } else {
    stage = 'experiment';
  }

  // 7. Next Action Recommendation Heuristics
  let nextAction = '';
  let nextActionCategory: 'code' | 'validation' | 'refactor' | 'deploy' | 'marketing' = 'code';

  if (stage === 'grow') {
    if (maintainability < 80) {
      nextAction = 'Extract modular authentication and API clients before adding new features';
      nextActionCategory = 'refactor';
    } else {
      nextAction = 'Set up automated CI/CD and deploy live production preview for real user feedback';
      nextActionCategory = 'deploy';
    }
  } else if (stage === 'experiment') {
    if (activity > 60) {
      nextAction = 'Validate problem-solution fit with 3-5 users before expanding codebase complexity';
      nextActionCategory = 'validation';
    } else {
      nextAction = 'Review core user feedback to decide whether to pivot or advance to Prototype';
      nextActionCategory = 'validation';
    }
  } else if (stage === 'maintain') {
    nextAction = 'Audit dependencies for security advisories and bump patch versions';
    nextActionCategory = 'code';
  } else if (stage === 'dormant') {
    nextAction = 'Review project for reusable utility code, mine assets, and archive repository';
    nextActionCategory = 'refactor';
  } else if (stage === 'archived') {
    nextAction = 'Project is archived. Code and post-mortem are preserved in the Graveyard';
    nextActionCategory = 'refactor';
  } else {
    nextAction = 'Implement core MVP loop and deploy early test build';
    nextActionCategory = 'code';
  }

  return { stage, score, nextAction, nextActionCategory };
}

export function generatePostMortem(project: ProjectItem, customReason?: string): PostMortem {
  const reason = customReason || (
    project.score.activity < 30
      ? 'Inactivity / Stalled development: Shifted priorities to higher leverage projects.'
      : 'Hypothesis invalidated: Solution did not find sticky user retention loop.'
  );

  const learnings = [
    'Always validate customer problem willingness to pay prior to writing heavy infrastructure.',
    'Keep initial prototype footprint under 2,000 lines of code for ultra-fast iteration.',
    'Extract standalone utility modules early so discontinued code becomes platform assets.',
  ];
  const learning = learnings[Math.floor(Math.random() * learnings.length)];

  return {
    stoppedDate: new Date().toISOString().slice(0, 10),
    failedReason: reason,
    detailedAnalysis: `Project "${project.name}" was active with stack [${project.stack.join(', ')}]. During evaluation, activity dropped to ${project.score.activity}/100 with total score ${project.score.total}/100. Rather than letting the codebase rot in an untracked folder, it has been cataloged as a reusable knowledge asset.`,
    keyLearning: learning,
    extractedAssets: project.assets.length > 0 ? project.assets : [`${project.name} Core Architecture Pattern`],
    revivalTrigger: `When a new project requires a similar ${project.stack[0] || 'TypeScript'} foundation or specialized business logic.`,
    totalHoursInvested: Math.max(12, Math.round(project.score.total * 0.6)),
  };
}

export function mineAssetsFromProject(project: ProjectItem): ReusableAsset[] {
  const timestamp = new Date().toISOString().slice(0, 10);
  const mined: ReusableAsset[] = [];

  const mainTech = project.stack[0] || 'TypeScript';

  if (project.stack.some(s => s.toLowerCase().includes('auth') || s.toLowerCase().includes('fastapi') || s.toLowerCase().includes('next'))) {
    mined.push({
      id: `mined-auth-${Date.now()}`,
      name: `${project.name} — Auth & Session Handler`,
      category: 'auth',
      sourceProject: project.name,
      description: `Authentication flow extracted automatically from ${project.name} using ${mainTech}.`,
      language: mainTech,
      tags: [mainTech, 'Auth', 'Mined'],
      usageCount: 1,
      createdAt: timestamp,
      codeSnippet: `// Auto-mined from ${project.name}\nexport async function validateUserSession(token: string) {\n  if (!token) throw new Error("Invalid token");\n  // Decoded claims\n  return { valid: true, timestamp: Date.now() };\n}`,
    });
  }

  mined.push({
    id: `mined-util-${Date.now() + 1}`,
    name: `${project.name} — Core Service Adapter`,
    category: 'utility',
    sourceProject: project.name,
    description: `Modular adapter utilities extracted from ${project.name}.`,
    language: mainTech,
    tags: [mainTech, 'Utility', 'Adapter'],
    usageCount: 1,
    createdAt: timestamp,
    codeSnippet: `// Reusable helper extracted from ${project.name}\nexport function formatProjectPayload<T>(data: T) {\n  return JSON.parse(JSON.stringify(data));\n}`,
  });

  return mined;
}
