import { ProjectItem, ReusableAsset, IdeaItem, PortfolioSummary } from '../types/project';

export interface VibeDataRepositoryExport {
  metadata: {
    exportedAt: string;
    version: string;
    generator: string;
  };
  projects: Record<string, ProjectItem>;
  analysis: Record<string, any>;
  assets: ReusableAsset[];
  ideas: IdeaItem[];
  portfolio: PortfolioSummary;
}

export function generateVibeDataExport(
  projects: ProjectItem[],
  assets: ReusableAsset[],
  ideas: IdeaItem[],
  portfolio: PortfolioSummary
): VibeDataRepositoryExport {
  const projectsMap: Record<string, ProjectItem> = {};
  const analysisMap: Record<string, any> = {};

  projects.forEach((p) => {
    projectsMap[p.name] = p;
    analysisMap[p.name] = {
      latestScore: p.score,
      dna: p.dna,
      stage: p.stage,
      nextAction: p.nextAction,
      updatedAt: p.lastActivityAt,
    };
  });

  return {
    metadata: {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      generator: 'VibeOS AI Portfolio System',
    },
    projects: projectsMap,
    analysis: analysisMap,
    assets,
    ideas,
    portfolio,
  };
}

export function downloadJsonFile(data: any, filename: string = 'vibe-portfolio-data.json') {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const GITHUB_ACTIONS_WORKFLOW_YML = `name: VibeOS Portfolio AI Analyzer

on:
  schedule:
    - cron: '0 0 * * *' # Every midnight UTC
  workflow_dispatch: # Manual trigger from VibeOS UI

permissions:
  contents: write
  pull-requests: read

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Data Repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run VibeOS Analyzer Engine
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          echo "Scanning all repositories in user workspace..."
          echo "Calculating Activity, Maintainability, Reuse, and Potential scores..."
          echo "Updating projects/*.json and portfolio/summary.json"

      - name: Commit & Push Intelligence Updates
        run: |
          git config --global user.name "vibeos-bot[bot]"
          git config --global user.email "bot@vibeos.dev"
          git add projects/ analysis/ assets/ portfolio/
          git diff --quiet && git diff --staged --quiet || git commit -m "chore(ai): automated portfolio radar scoring [skip ci]"
          git push origin main
`;
