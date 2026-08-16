const fs = require('fs');
const path = require('path');

const baseDir = '/mnt/d/project';
const dirNames = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.'))
  .map(d => d.name)
  .sort();

console.log(`Processing ${dirNames.length} total repositories from ${baseDir}...`);

const allProjects = [];

for (const name of dirNames) {
  const dirPath = path.join(baseDir, name);
  let pkg = null;
  let readme = '';
  let stats = null;

  try {
    stats = fs.statSync(dirPath);
  } catch {}

  const pkgPath = path.join(dirPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    } catch {}
  }

  const readmePath = path.join(dirPath, 'README.md');
  if (fs.existsSync(readmePath)) {
    try {
      readme = fs.readFileSync(readmePath, 'utf8');
    } catch {}
  }

  const hasGit = fs.existsSync(path.join(dirPath, '.git'));

  // Detect tech stack
  const stack = [];
  if (fs.existsSync(path.join(dirPath, 'tsconfig.json')) || fs.existsSync(path.join(dirPath, 'src')) || pkg?.devDependencies?.typescript) stack.push('TypeScript');
  else if (pkg) stack.push('JavaScript');

  if (pkg?.dependencies?.react || pkg?.dependencies?.['react-dom']) stack.push('React');
  if (pkg?.dependencies?.next || pkg?.devDependencies?.next) stack.push('Next.js');
  if (pkg?.dependencies?.vue || pkg?.devDependencies?.vue) stack.push('Vue.js');
  if (pkg?.dependencies?.tailwindcss || pkg?.devDependencies?.tailwindcss) stack.push('TailwindCSS');
  if (pkg?.dependencies?.vite || pkg?.devDependencies?.vite) stack.push('Vite');
  if (pkg?.dependencies?.['@nestjs/core']) stack.push('NestJS');
  if (pkg?.dependencies?.express) stack.push('Express');
  if (fs.existsSync(path.join(dirPath, 'go.mod'))) stack.push('Go');
  if (fs.existsSync(path.join(dirPath, 'pom.xml')) || fs.existsSync(path.join(dirPath, 'build.gradle'))) stack.push('Java');
  if (fs.existsSync(path.join(dirPath, 'requirements.txt')) || fs.existsSync(path.join(dirPath, 'setup.py')) || fs.existsSync(path.join(dirPath, 'pyproject.toml'))) stack.push('Python');
  if (fs.existsSync(path.join(dirPath, 'pubspec.yaml'))) stack.push('Flutter');
  if (fs.existsSync(path.join(dirPath, 'Dockerfile')) || fs.existsSync(path.join(dirPath, 'docker-compose.yml'))) stack.push('Docker');
  if (name.startsWith('node-red-contrib-')) stack.push('Node-RED');

  if (stack.length === 0) stack.push('TypeScript');

  // Activity Date & Stage
  const mtimeStr = stats ? stats.mtime.toISOString().slice(0, 10) : '2024-01-01';
  const year = parseInt(mtimeStr.slice(0, 4), 10);
  const month = parseInt(mtimeStr.slice(5, 7), 10);

  let stage = 'prototype';
  let status = 'active';

  // Core high-growth projects
  const highGrowthNames = ['VibeOS', 'orbit', 'trace', 'opengajae', 'weekly', 'ssak', 'webgx', 'visitflow', 'relio', 'velo', 'vibe-coders', 'AgeForge', 'AutoForge'];
  const experimentNames = ['jask', 'mattermost-myagents-plugin', 'mattermost-paw-plugin', 'mattermost-flow-plugin', 'mattermost-langflow-plugin', 'GitFrame', 'tunny', 'ollama-summarizer', 'Kkiit', 'Planexus'];
  const maintainNames = ['jainsight', 'aura', 'stockboom', 'tagflow', 'specflow', 'openpro', 'opencode', 'openclaude', 'openclaw', 'seaton', 'ptium', 'sqlon', 'postra', 'jasca', 'jaSlide', 'playchroma', 'jamail'];

  if (highGrowthNames.includes(name) || (year >= 2026 && month >= 6)) {
    stage = 'grow';
    status = 'active';
  } else if (experimentNames.includes(name) || (year >= 2026 && month >= 1)) {
    stage = 'experiment';
    status = 'active';
  } else if (maintainNames.includes(name) || year === 2025) {
    stage = 'maintain';
    status = 'active';
  } else {
    stage = 'archived';
    status = 'graveyard';
  }

  // Description extraction
  let description = pkg?.description || '';
  if (!description && readme) {
    const lines = readme.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#') && !l.startsWith('!') && !l.startsWith('<') && !l.startsWith('['));
    if (lines.length > 0) description = lines[0].replace(/[\r\n\t]+/g, ' ').slice(0, 150);
  }
  if (!description) {
    description = `${name} — AI & engineering project by hkjang`;
  }

  // Scores
  let activityScore = stage === 'grow' ? (92 + Math.floor(Math.random() * 7)) : (stage === 'experiment' ? (78 + Math.floor(Math.random() * 12)) : (stage === 'maintain' ? (58 + Math.floor(Math.random() * 15)) : (10 + Math.floor(Math.random() * 20))));
  let potentialScore = (stack.includes('AI') || stack.includes('Next.js') || stack.includes('React') || name.toLowerCase().includes('ai') || name.toLowerCase().includes('agent') || name.toLowerCase().includes('flow') || name.toLowerCase().includes('sql') || name.toLowerCase().includes('plugin')) ? (86 + Math.floor(Math.random() * 11)) : (68 + Math.floor(Math.random() * 16));
  let reuseScore = stack.length >= 3 ? (85 + Math.floor(Math.random() * 12)) : (72 + Math.floor(Math.random() * 15));
  let maintainScore = hasGit ? (82 + Math.floor(Math.random() * 14)) : (65 + Math.floor(Math.random() * 15));
  let totalScore = Math.round(activityScore * 0.35 + potentialScore * 0.30 + reuseScore * 0.20 + maintainScore * 0.15);

  const deps = pkg ? { ...pkg.dependencies } : {};

  // Post-Mortem for archived projects
  let postMortem = undefined;
  if (status === 'graveyard') {
    postMortem = {
      stoppedDate: mtimeStr,
      failedReason: name.startsWith('node-red-contrib-') ? 'Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경' : (name.startsWith('mattermost-') ? 'Mattermost v7/v8 메이저 업그레이드로 인한 인터페이스 마이그레이션' : '외부 API 스키마 변경 또는 레거시 런타임 종속성'),
      detailedAnalysis: `${name} 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.`,
      keyLearning: '외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.',
      extractedAssets: [`${name} Core Utility`, `${name} Client Adapter`],
      revivalTrigger: '차세대 AI Agent 마이크로서비스로 재구축 요구 시',
      totalHoursInvested: 25 + Math.floor(Math.random() * 35),
    };
  }

  allProjects.push({
    id: name.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
    name,
    description,
    status,
    stage,
    createdAt: mtimeStr,
    lastActivityAt: mtimeStr,
    stack,
    score: {
      total: totalScore,
      activity: activityScore,
      potential: potentialScore,
      reuse: reuseScore,
      maintainability: maintainScore,
    },
    assets: [],
    nextAction: stage === 'grow' ? '핵심 기능 확장 및 배포 파이프라인 점검' : (stage === 'experiment' ? '가설 검증 피드백 수집 및 MVP 개선' : (stage === 'maintain' ? '의존성 업데이트 및 안정화' : '재사용 가능한 유틸리티 추출 및 아카이브')),
    nextActionCategory: stage === 'grow' ? 'code' : (stage === 'experiment' ? 'validation' : (stage === 'maintain' ? 'refactor' : 'assetize')),
    dna: {
      architecture: `${stack.join(' + ')} Modular Architecture`,
      keyPatterns: ['Clean Architecture', 'Modular Components'],
      dependencies: deps,
      commitVelocityWeekly: stage === 'grow' ? 8 : (stage === 'experiment' ? 4 : (stage === 'maintain' ? 1 : 0)),
      lastCommitMessage: 'feat: update project codebase',
      githubUrl: `https://github.com/hkjang/${name}`
    },
    postMortem,
    stars: stage === 'grow' ? Math.floor(Math.random() * 5) : 0,
    forks: 0,
    openIssues: 0
  });
}

const initialAssets = [
  {
    id: 'asset-1',
    name: 'Multi-Channel Chat Gateway (WhatsApp / Slack / Discord)',
    category: 'api',
    sourceProject: 'opengajae',
    description: 'WhatsApp(Baileys), Slack(Bolt), Discord, Telegram 채널 메시지를 단일 표준 인터페이스로 수신·발신하는 어댑터',
    language: 'TypeScript',
    codeSnippet: `import { EventEmitter } from 'events';

export interface UnifiedMessage {
  channel: 'whatsapp' | 'slack' | 'discord' | 'line';
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
}

export class MultiChannelGateway extends EventEmitter {
  async handleIncoming(channel: UnifiedMessage['channel'], payload: any) {
    const msg: UnifiedMessage = {
      channel,
      senderId: payload.from || payload.user,
      senderName: payload.pushName || payload.userName || 'Anonymous',
      content: payload.text || payload.body || '',
      timestamp: Date.now(),
    };
    this.emit('message', msg);
  }
}`,
    tags: ['ChatBot', 'MultiChannel', 'Baileys', 'SlackBolt', 'TypeScript'],
    usageCount: 14,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-2',
    name: 'Monaco SQL Editor with Auto-Complete & Query Formatter',
    category: 'ui',
    sourceProject: 'jainsight',
    description: '다크 테마 Monaco Editor 기반 SQL 하이라이팅, 테이블/컬럼 자동완성 및 프리티파이어 컴포넌트',
    language: 'TypeScript',
    codeSnippet: `import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

export const SqlMonacoEditor: React.FC<{ value: string; onChange: (val: string) => void }> = ({
  value,
  onChange,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        const suggestions = [
          { label: 'SELECT', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'SELECT ', range },
          { label: 'WHERE', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'WHERE ', range },
          { label: 'GROUP BY', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'GROUP BY ', range },
        ];
        return { suggestions };
      },
    });
  };

  return (
    <Editor
      height="300px"
      defaultLanguage="sql"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v || '')}
      onMount={handleEditorDidMount}
      options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
    />
  );
};`,
    tags: ['Monaco', 'SQL', 'React', 'SyntaxHighlight', 'UI'],
    usageCount: 12,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-3',
    name: 'NL2SQL Schema Prompt Ingestion Engine',
    category: 'llm',
    sourceProject: 'jask',
    description: '데이터베이스 DDL 및 관계형 외래키 제약조건을 LLM Few-Shot 시스템 프롬프트로 최적화 포맷팅하는 유틸',
    language: 'TypeScript',
    codeSnippet: `export function buildNl2SqlPrompt(schemaDdl: string, userQuery: string, dialect: 'postgres' | 'mysql' | 'sqlite' = 'postgres') {
  return \`You are an expert SQL engineer. Generate a valid, optimized \${dialect.toUpperCase()} query.
Database Schema:
\${schemaDdl}

Guidelines:
1. Return ONLY the executable SQL query inside a markdown codeblock.
2. Avoid destructive operations (DROP, DELETE, TRUNCATE) unless explicitly requested.
3. Optimize for index usage and join conditions.

User Request: \${userQuery}\`;
}`,
    tags: ['NL2SQL', 'PromptEngineering', 'LLM', 'SchemaContext'],
    usageCount: 18,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-4',
    name: 'Playwright Video & Snapshot Headless Recorder',
    category: 'utility',
    sourceProject: 'GitFrame',
    description: 'Playwright를 활용하여 로컬 개발 서버를 대기(wait-on)하고 데모 영상 및 스크린샷을 자동 캡처하는 런타임',
    language: 'TypeScript',
    codeSnippet: `import { chromium } from 'playwright';
import waitOn from 'wait-on';

export async function recordProjectDemo(url: string, outputVideoPath: string, durationSec = 10) {
  await waitOn({ resources: [url], timeout: 30000 });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: { dir: './recordings', size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();
  await page.goto(url);
  await page.waitForTimeout(durationSec * 1000);
  await context.close();
  await browser.close();
}`,
    tags: ['Playwright', 'Automation', 'VideoRecorder', 'Testing'],
    usageCount: 9,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-5',
    name: 'SQLite-Vec Local Embedding & Semantic RAG Search',
    category: 'database',
    sourceProject: 'opengajae',
    description: 'SQLite-Vec 확장을 활용한 제로 클라우드 비용 로컬 벡터 임베딩 유사도 검색 엔진',
    language: 'TypeScript',
    codeSnippet: `import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';

export class LocalVectorStore {
  private db: Database.Database;

  constructor(dbPath = ':memory:') {
    this.db = new Database(dbPath);
    sqliteVec.load(this.db);
    this.db.exec(\`
      CREATE VIRTUAL TABLE IF NOT EXISTS vec_documents USING vec0(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        embedding float[1536]
      );
    \`);
  }

  insert(content: string, embedding: number[]) {
    const stmt = this.db.prepare('INSERT INTO vec_documents(content, embedding) VALUES (?, ?)');
    stmt.run(content, new Float32Array(embedding));
  }
}`,
    tags: ['SQLite', 'VectorDB', 'Embedding', 'RAG', 'LocalFirst'],
    usageCount: 15,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-6',
    name: 'Postman Collection v2 to Markdown Exporter',
    category: 'utility',
    sourceProject: 'afterman',
    description: 'Postman Export JSON을 읽어 엔드포인트 파라미터, 헤더, 예제 응답을 마크다운 문서로 변환',
    language: 'TypeScript',
    codeSnippet: `export function postmanToMarkdown(collection: any): string {
  let md = "# " + (collection.info?.name || "API Documentation") + "\\n\\n";
  for (const item of collection.item || []) {
    md += "## " + item.name + "\\n";
    md += "**Method**: \`" + (item.request?.method || "GET") + "\`\\n";
    md += "**URL**: \`" + (item.request?.url?.raw || item.request?.url || "") + "\`\\n\\n";
  }
  return md;
}`,
    tags: ['Postman', 'Markdown', 'ApiDoc', 'Converter'],
    usageCount: 7,
    createdAt: '2026-08-16',
  },
];

const initialIdeas = [
  {
    id: 'idea-1',
    title: 'Local SQLite-Vec MCP Server for Antigravity & Claude',
    description: '로컬 /mnt/d/project 내 모든 소스코드와 마크다운 문서를 실시간 임베딩하여 AI 어시스턴트가 0.1초만에 시맨틱 검색하도록 지원하는 MCP 서버',
    viabilityScore: 95,
    estimatedEffort: 'weekend',
    suggestedStack: ['TypeScript', 'SQLite-Vec', 'MCP SDK', 'Ollama'],
    status: 'inbox',
    createdAt: '2026-08-16',
    tags: ['MCP', 'AI', 'LocalFirst', 'VectorDB'],
  },
  {
    id: 'idea-2',
    title: 'Mattermost AI Daily Standup & Commit Digest Bot',
    description: '팀원들의 당일 GitHub 커밋 및 PR diff를 수집하여 Mattermost 스탠드업 채널에 매일 아침 9시 지능형 서머리를 브리핑하는 봇',
    viabilityScore: 91,
    estimatedEffort: 'weekend',
    suggestedStack: ['Go', 'TypeScript', 'Mattermost API', 'OpenAI'],
    status: 'inbox',
    createdAt: '2026-08-14',
    tags: ['Mattermost', 'Bot', 'Automation', 'DevProductivity'],
  },
  {
    id: 'idea-3',
    title: 'Vibe-Coding Prompt Auto-Refiner CLI',
    description: '자연어로 작성한 초기 아이디어를 구조화된 프로젝트 아키텍처 스펙, 디렉토리 트리, TypeScript 타입 정의서로 자동 확장해주는 CLI',
    viabilityScore: 88,
    estimatedEffort: '1-week',
    suggestedStack: ['TypeScript', 'Commander', 'Anthropic Claude 3.5 Sonnet'],
    status: 'inbox',
    createdAt: '2026-08-12',
    tags: ['CLI', 'VibeCoding', 'PromptEngineering'],
  },
  {
    id: 'idea-4',
    title: 'Self-Hosted Atlassian Forge Bridge for On-Prem AI',
    description: '폐쇄망 Bitbucket / Confluence 인프라에서 외부 클라우드 통신 없이 로컬 vLLM으로 코드 리뷰와 문서 작성을 수행하는 브릿지',
    viabilityScore: 84,
    estimatedEffort: '2-weeks',
    suggestedStack: ['Java', 'vLLM', 'Atlassian P2 Plugin', 'Docker'],
    status: 'inbox',
    createdAt: '2026-08-05',
    tags: ['Atlassian', 'OnPremise', 'vLLM', 'Enterprise'],
  },
];

const fileContent = `import { ProjectItem, ReusableAsset, IdeaItem, PortfolioSummary } from '../types/project';

export const INITIAL_PROJECTS: ProjectItem[] = ${JSON.stringify(allProjects, null, 2)};

export const INITIAL_ASSETS: ReusableAsset[] = ${JSON.stringify(initialAssets, null, 2)};

export const INITIAL_IDEAS: IdeaItem[] = ${JSON.stringify(initialIdeas, null, 2)};

export const INITIAL_SUMMARY: PortfolioSummary = {
  totalProjects: INITIAL_PROJECTS.length,
  growing: INITIAL_PROJECTS.filter((p) => p.stage === 'grow').length,
  experiment: INITIAL_PROJECTS.filter((p) => p.stage === 'experiment').length,
  maintaining: INITIAL_PROJECTS.filter((p) => p.stage === 'maintain').length,
  dormant: INITIAL_PROJECTS.filter((p) => p.stage === 'dormant').length,
  archived: INITIAL_PROJECTS.filter((p) => p.stage === 'archived').length,
  totalAssetsExtracted: INITIAL_ASSETS.length,
  monthlyProjectsCreated: 14,
  monthlyCommitsCount: INITIAL_PROJECTS.reduce((acc, p) => acc + (p.dna.commitVelocityWeekly * 4), 0),
  topWorthContinuingProjects: INITIAL_PROJECTS.filter((p) => p.status === 'active').sort((a, b) => b.score.total - a.score.total).slice(0, 4).map((p) => p.name),
};
`;

fs.writeFileSync('/mnt/d/project/VibeOS/src/data/mockData.ts', fileContent);
console.log('Successfully generated full dataset with', allProjects.length, 'projects in src/data/mockData.ts!');
