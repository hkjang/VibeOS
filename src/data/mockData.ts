import { ProjectItem, ReusableAsset, IdeaItem, PortfolioSummary } from '../types/project';

export const INITIAL_ASSETS: ReusableAsset[] = [
  {
    id: 'asset-auth-jwt',
    name: 'FastAPI JWT Auth & Role Middleware',
    category: 'auth',
    sourceProject: 'clustara',
    description: 'Production-ready Python FastAPI JWT authentication with refresh tokens and RBAC middleware.',
    language: 'Python',
    tags: ['FastAPI', 'JWT', 'Security', 'RBAC'],
    usageCount: 4,
    createdAt: '2026-06-12',
    codeSnippet: `from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secure-secret-key"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return {"username": username, "role": payload.get("role", "user")}
    except JWTError:
        raise credentials_exception`,
  },
  {
    id: 'asset-openai-structured',
    name: 'OpenAI Structured Output Type-Safe Wrapper',
    category: 'llm',
    sourceProject: 'clustara',
    description: 'TypeScript Zod schema wrapper for OpenAI JSON schema structured outputs with automatic retry & fallback.',
    language: 'TypeScript',
    tags: ['OpenAI', 'Zod', 'StructuredOutputs', 'AI'],
    usageCount: 7,
    createdAt: '2026-07-03',
    codeSnippet: `import { OpenAI } from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI();

export async function generateStructured<T extends z.ZodTypeAny>(
  prompt: string,
  schema: T,
  schemaName: string = "ResponseSchema"
): Promise<z.infer<T>> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a precise data extraction engine." },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(schema, schemaName),
  });

  const message = completion.choices[0]?.message;
  if (message?.parsed) {
    return message.parsed;
  }
  throw new Error("Failed to parse structured LLM response");
}`,
  },
  {
    id: 'asset-claude-prompt-chain',
    name: 'Anthropic Claude Prompt Chain Orchestrator',
    category: 'llm',
    sourceProject: 'vibe-coders',
    description: 'Sequential multi-agent prompt runner with context window compaction and step evaluation.',
    language: 'TypeScript',
    tags: ['Claude', 'Anthropic', 'PromptEngineering', 'Agents'],
    usageCount: 5,
    createdAt: '2026-07-20',
    codeSnippet: `export interface ChainStep {
  name: string;
  systemPrompt: string;
  userPromptTemplate: (prevOutput: string) => string;
}

export async function runPromptChain(steps: ChainStep[], initialInput: string): Promise<Record<string, string>> {
  const outputs: Record<string, string> = {};
  let currentContext = initialInput;

  for (const step of steps) {
    const prompt = step.userPromptTemplate(currentContext);
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2048,
        system: step.systemPrompt,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    outputs[step.name] = text;
    currentContext = text;
  }
  return outputs;
}`,
  },
  {
    id: 'asset-virtual-table',
    name: 'React Virtualized Glass Table Component',
    category: 'ui',
    sourceProject: 'clustara',
    description: 'Ultra-fast virtual scrolling data grid styled with Tailwind glassmorphism and multi-column sorting.',
    language: 'TypeScript (React)',
    tags: ['React', 'TailwindCSS', 'VirtualScroll', 'UI'],
    usageCount: 3,
    createdAt: '2026-06-25',
    codeSnippet: `import React, { useState } from 'react';

export function GlassDataTable<T extends { id: string | number }>({
  data,
  columns
}: {
  data: T[];
  columns: { key: keyof T; header: string; render?: (item: T) => React.ReactNode }[];
}) {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
      <div className="p-3 border-b border-white/10">
        <input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter data..."
          className="w-full bg-slate-800/80 text-sm px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-400"
        />
      </div>
      <table className="w-full text-left text-sm text-slate-200">
        <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
          <tr>
            {columns.map(col => <th key={String(col.key)} className="p-3 font-semibold">{col.header}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map(row => (
            <tr key={row.id} className="hover:bg-cyan-500/5 transition-colors">
              {columns.map(col => (
                <td key={String(col.key)} className="p-3">
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
  },
  {
    id: 'asset-whisper-chunker',
    name: 'Python Audio Chunk & Whisper Streamer',
    category: 'api',
    sourceProject: 'voice-memo-ai',
    description: 'Rescued from voice-memo-ai graveyard: Splices large audio files with silence detection for Whisper API without timeouts.',
    language: 'Python',
    tags: ['Whisper', 'Audio', 'Python', 'GraveyardRescue'],
    usageCount: 2,
    createdAt: '2026-05-18',
    codeSnippet: `from pydub import AudioSegment
from pydub.silence import split_on_silence
import openai

def transcribe_large_audio(file_path: str, min_silence_len=700, silence_thresh=-40):
    sound = AudioSegment.from_file(file_path)
    chunks = split_on_silence(sound, min_silence_len=min_silence_len, silence_thresh=silence_thresh)
    transcripts = []
    
    for i, chunk in enumerate(chunks):
        chunk_name = f"/tmp/chunk_{i}.wav"
        chunk.export(chunk_name, format="wav")
        with open(chunk_name, "rb") as audio_file:
            response = openai.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )
            transcripts.append(response.text)
    return " ".join(transcripts)`,
  },
  {
    id: 'asset-lemon-billing',
    name: 'LemonSqueezy Webhook & License Key Validator',
    category: 'api',
    sourceProject: 'micro-saas-starter',
    description: 'Cryptographically verifies LemonSqueezy webhook signatures and syncs customer tier status.',
    language: 'TypeScript',
    tags: ['LemonSqueezy', 'Payments', 'Webhooks', 'Security'],
    usageCount: 6,
    createdAt: '2026-08-01',
    codeSnippet: `import crypto from 'crypto';

export function verifyLemonSqueezySignature(
  rawPayload: string,
  signatureHeader: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(rawPayload).digest('hex'), 'utf8');
  const signature = Buffer.from(signatureHeader, 'utf8');
  
  if (digest.length !== signature.length) {
    return false;
  }
  return crypto.timingSafeEqual(digest, signature);
}`,
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-clustara',
    name: 'clustara',
    description: 'AI-driven clustering & taxonomy classification engine for unstructured customer feedback.',
    status: 'active',
    stage: 'grow',
    createdAt: '2025-11-10',
    lastActivityAt: '2026-08-15',
    stack: ['TypeScript', 'React', 'FastAPI', 'OpenAI', 'TailwindCSS'],
    score: {
      activity: 92,
      maintainability: 78,
      reuse: 85,
      potential: 88,
      total: 86,
    },
    assets: ['asset-auth-jwt', 'asset-openai-structured', 'asset-virtual-table'],
    nextAction: 'Extract authentication package as independent workspace package',
    nextActionCategory: 'refactor',
    dna: {
      architecture: 'Monorepo (Turborepo) with React Vite frontend + FastAPI backend',
      keyPatterns: ['Clean Architecture', 'Repository Pattern', 'Zod LLM Parsing'],
      promptPatterns: ['JSON Schema Taxonomy Tree Generator', 'Sentiment Matrix Vectorizer'],
      dependencies: {
        'react': '^18.3.1',
        'fastapi': '^0.111.0',
        'openai': '^4.47.1',
        'pydantic': '^2.7.1'
      },
      linesOfCode: 12450,
      commitVelocityWeekly: 14,
      lastCommitMessage: 'feat(clustering): improve HDBSCAN parameter tuning heuristic',
      githubUrl: 'https://github.com/hkjang/clustara'
    },
    stars: 38,
    forks: 7,
    openIssues: 3,
    isFavorite: true,
  },
  {
    id: 'proj-vibe-coders',
    name: 'vibe-coders',
    description: 'Collaborative real-time canvas for vibe coders to share prompts, artifacts, and live previews.',
    status: 'active',
    stage: 'grow',
    createdAt: '2026-01-15',
    lastActivityAt: '2026-08-14',
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Anthropic API', 'TailwindCSS'],
    score: {
      activity: 95,
      maintainability: 88,
      reuse: 90,
      potential: 92,
      total: 91,
    },
    assets: ['asset-claude-prompt-chain'],
    nextAction: 'Automate E2E testing suite and deploy preview link for beta testers',
    nextActionCategory: 'deploy',
    dna: {
      architecture: 'Next.js App Router with Server Actions + Supabase Realtime Channels',
      keyPatterns: ['Optimistic UI', 'Edge Middleware', 'Multi-Agent Chain'],
      promptPatterns: ['Vibe Code Synthesizer', 'Bug Auto-Healer'],
      dependencies: {
        'next': '^14.2.4',
        '@supabase/supabase-js': '^2.43.4',
        '@anthropic-ai/sdk': '^0.22.0'
      },
      linesOfCode: 18900,
      commitVelocityWeekly: 22,
      lastCommitMessage: 'feat: add real-time collaborative cursor presence',
      githubUrl: 'https://github.com/hkjang/vibe-coders'
    },
    stars: 84,
    forks: 19,
    openIssues: 5,
    isFavorite: true,
  },
  {
    id: 'proj-nova',
    name: 'project-nova',
    description: 'Autonomous synthetic user persona interview simulator for product hypothesis testing.',
    status: 'active',
    stage: 'experiment',
    createdAt: '2026-07-01',
    lastActivityAt: '2026-08-12',
    stack: ['React', 'Vite', 'Python', 'WebSockets', 'LangGraph'],
    score: {
      activity: 76,
      maintainability: 68,
      reuse: 74,
      potential: 82,
      total: 75,
    },
    assets: ['asset-openai-structured'],
    nextAction: 'Validate idea demand with 5 target users before writing further backend logic',
    nextActionCategory: 'validation',
    dna: {
      architecture: 'FastAPI WebSockets + LangGraph Agent Graph + React Flow Canvas',
      keyPatterns: ['StateGraph', 'Event-Driven Agents', 'Vector Memory'],
      promptPatterns: ['Skeptical User Persona', 'Curious Adopter Persona'],
      dependencies: {
        'langgraph': '^0.0.60',
        'reactflow': '^11.11.3',
        'chromadb': '^0.5.0'
      },
      linesOfCode: 6420,
      commitVelocityWeekly: 8,
      lastCommitMessage: 'experiment: persona belief shift graph visualization',
      githubUrl: 'https://github.com/hkjang/project-nova'
    },
    stars: 12,
    forks: 2,
    openIssues: 1,
  },
  {
    id: 'proj-micro-saas',
    name: 'micro-saas-starter',
    description: 'Opinionated boilerplate for shipping vibe-coded SaaS with auth, billing, and multitenancy in 2 hours.',
    status: 'active',
    stage: 'maintain',
    createdAt: '2026-03-20',
    lastActivityAt: '2026-08-08',
    stack: ['Next.js 14', 'Prisma', 'TailwindCSS', 'LemonSqueezy', 'PostgreSQL'],
    score: {
      activity: 65,
      maintainability: 94,
      reuse: 98,
      potential: 89,
      total: 86,
    },
    assets: ['asset-lemon-billing'],
    nextAction: 'Update to React 19 and add Resend transactional email template',
    nextActionCategory: 'code',
    dna: {
      architecture: 'Fullstack Next.js with Prisma ORM and SQLite/PostgreSQL switchable adapter',
      keyPatterns: ['Server Components', 'Webhook Verification', 'Tenant Isolation'],
      dependencies: {
        'next': '^14.2.4',
        '@prisma/client': '^5.15.0',
        'resend': '^3.2.0'
      },
      linesOfCode: 8300,
      commitVelocityWeekly: 3,
      lastCommitMessage: 'chore(deps): bump prisma to 5.15 and refresh schema migrations',
      githubUrl: 'https://github.com/hkjang/micro-saas-starter'
    },
    stars: 142,
    forks: 48,
    openIssues: 4,
    isFavorite: true,
  },
  {
    id: 'proj-fast-landing',
    name: 'fast-landing',
    description: 'Ultra-lightweight static landing page generator with dynamic A/B headline testing.',
    status: 'active',
    stage: 'maintain',
    createdAt: '2026-02-14',
    lastActivityAt: '2026-07-29',
    stack: ['Astro', 'TailwindCSS', 'Svelte', 'Cloudflare Pages'],
    score: {
      activity: 58,
      maintainability: 90,
      reuse: 82,
      potential: 70,
      total: 75,
    },
    assets: [],
    nextAction: 'Upgrade Astro to latest v4.11 patch and audit lighthouse score',
    nextActionCategory: 'refactor',
    dna: {
      architecture: 'Static Islands with Astro SSR fallback on Cloudflare Workers',
      keyPatterns: ['Island Architecture', 'Zero-JS by Default'],
      dependencies: {
        'astro': '^4.11.0',
        'tailwindcss': '^3.4.4'
      },
      linesOfCode: 3100,
      commitVelocityWeekly: 1,
      lastCommitMessage: 'perf: optimize hero webp image preloading',
      githubUrl: 'https://github.com/hkjang/fast-landing'
    },
    stars: 27,
    forks: 5,
    openIssues: 0,
  },
  {
    id: 'proj-omni-prompt',
    name: 'omni-prompt',
    description: 'Chrome Extension providing universal AI prompt expansion and variable injection across web inputs.',
    status: 'active',
    stage: 'prototype',
    createdAt: '2026-07-25',
    lastActivityAt: '2026-08-11',
    stack: ['TypeScript', 'React', 'Chrome Extension MV3', 'TailwindCSS'],
    score: {
      activity: 82,
      maintainability: 64,
      reuse: 70,
      potential: 78,
      total: 73,
    },
    assets: [],
    nextAction: 'Implement Manifest V3 background service worker synchronization',
    nextActionCategory: 'code',
    dna: {
      architecture: 'Chrome Manifest V3 Content Script + Shadow DOM Popover + Background Service Worker',
      keyPatterns: ['Shadow DOM Encapsulation', 'Message Passing'],
      dependencies: {
        'react': '^18.3.1',
        'lucide-react': '^0.395.0'
      },
      linesOfCode: 4200,
      commitVelocityWeekly: 9,
      lastCommitMessage: 'wip: popup state sync across multiple tab sessions',
      githubUrl: 'https://github.com/hkjang/omni-prompt'
    },
    stars: 9,
    forks: 1,
    openIssues: 2,
  },
  {
    id: 'proj-code-sniper',
    name: 'code-sniper-bot',
    description: 'Automated GitHub PR reviewer that flags architectural anti-patterns and suggests zero-dependency refactors.',
    status: 'active',
    stage: 'experiment',
    createdAt: '2026-06-10',
    lastActivityAt: '2026-08-04',
    stack: ['Node.js', 'GitHub API', 'OpenAI', 'Docker'],
    score: {
      activity: 70,
      maintainability: 75,
      reuse: 80,
      potential: 85,
      total: 78,
    },
    assets: [],
    nextAction: 'Package as GitHub Action for marketplace release',
    nextActionCategory: 'deploy',
    dna: {
      architecture: 'Node.js Probot framework + Dockerized execution sandbox',
      keyPatterns: ['Webhook Ingestion', 'AST Diff Inspection'],
      dependencies: {
        'probot': '^13.0.0',
        'openai': '^4.47.1'
      },
      linesOfCode: 5600,
      commitVelocityWeekly: 4,
      lastCommitMessage: 'feat: add support for python ast linting',
      githubUrl: 'https://github.com/hkjang/code-sniper-bot'
    },
    stars: 31,
    forks: 4,
    openIssues: 2,
  },
  {
    id: 'proj-dev-graveyard',
    name: 'dev-status-board',
    description: 'Custom team status board built with Vue and Firebase before standardizing on React/Next.js.',
    status: 'graveyard',
    stage: 'dormant',
    createdAt: '2025-08-01',
    lastActivityAt: '2025-10-15',
    stack: ['Vue 3', 'Firebase', 'Pinia', 'TailwindCSS'],
    score: {
      activity: 12,
      maintainability: 55,
      reuse: 75,
      potential: 35,
      total: 44,
    },
    assets: [],
    nextAction: 'Mine Firebase Realtime listener hook and officially archive repository',
    nextActionCategory: 'refactor',
    dna: {
      architecture: 'Vue 3 SPA with Firebase Firestore & Cloud Functions',
      keyPatterns: ['Reactive State', 'Firestore Realtime Listeners'],
      dependencies: {
        'vue': '^3.4.0',
        'firebase': '^10.7.0'
      },
      linesOfCode: 4800,
      commitVelocityWeekly: 0,
      lastCommitMessage: 'refactor: clean up unused firebase rules',
      githubUrl: 'https://github.com/hkjang/dev-status-board'
    },
    postMortem: {
      stoppedDate: '2025-10-15',
      failedReason: 'Framework divergence: Team shifted entirely to React/TypeScript ecosystem.',
      detailedAnalysis: 'Building the same CRUD logic in Vue when all surrounding microservices used React caused high context-switching friction. Firebase pricing unpredictability during load spikes also created hesitation.',
      keyLearning: 'Standardize core frontend primitives across all side projects so components are 100% swappable.',
      extractedAssets: ['Firebase Auth Reactive Hook', 'Glassmorphism Kanban CSS'],
      revivalTrigger: 'If building a quick lightweight standalone Vue dashboard widget.',
      totalHoursInvested: 45
    },
    stars: 6,
    forks: 1,
    openIssues: 0,
  },
  {
    id: 'proj-voice-memo',
    name: 'voice-memo-ai',
    description: 'Real-time audio transcription and structured summary generator built during early Whisper experimentation.',
    status: 'graveyard',
    stage: 'archived',
    createdAt: '2025-04-10',
    lastActivityAt: '2025-06-20',
    stack: ['Python', 'Streamlit', 'OpenAI Whisper', 'PyAudio'],
    score: {
      activity: 5,
      maintainability: 40,
      reuse: 88,
      potential: 45,
      total: 42,
    },
    assets: ['asset-whisper-chunker'],
    nextAction: 'Harvest audio chunking utility (done) — Keep archived',
    nextActionCategory: 'code',
    dna: {
      architecture: 'Streamlit Python app with synchronous OpenAI Whisper requests',
      keyPatterns: ['Audio Chunk Slicing', 'Silence Thresholding'],
      dependencies: {
        'streamlit': '^1.32.0',
        'pydub': '^0.25.1',
        'openai': '^1.14.0'
      },
      linesOfCode: 2100,
      commitVelocityWeekly: 0,
      lastCommitMessage: 'archive: extracted audio chunking utility to assets',
      githubUrl: 'https://github.com/hkjang/voice-memo-ai'
    },
    postMortem: {
      stoppedDate: '2025-06-20',
      failedReason: 'Streamlit latency was too high for fluid real-time audio interaction; API costs unsustainable.',
      detailedAnalysis: 'Streamlit reruns the whole script on input state changes, leading to audio buffer glitches. Also, Whisper API roundtrips caused 3-4s lag per sentence.',
      keyLearning: 'Never use synchronous Python web frameworks for real-time streaming audio interfaces. Use WebAudio + WebSockets.',
      extractedAssets: ['Python Audio Chunk & Whisper Streamer'],
      revivalTrigger: 'When client-side Whisper WebAssembly models become lightweight enough to run 100% offline in browser.',
      totalHoursInvested: 60
    },
    stars: 15,
    forks: 3,
    openIssues: 0,
  },
  {
    id: 'proj-retro-pixel',
    name: 'retro-pixel-art',
    description: 'Algorithmic 8-bit retro pixel art generator with custom palette quantizer.',
    status: 'graveyard',
    stage: 'archived',
    createdAt: '2025-02-05',
    lastActivityAt: '2025-03-12',
    stack: ['Vanilla JavaScript', 'HTML5 Canvas', 'CSS3'],
    score: {
      activity: 0,
      maintainability: 82,
      reuse: 70,
      potential: 25,
      total: 39,
    },
    assets: [],
    nextAction: 'Archived project — Code preserved as canvas reference',
    nextActionCategory: 'refactor',
    dna: {
      architecture: 'Single-page zero-dependency HTML5 Canvas matrix manipulation',
      keyPatterns: ['Floyd-Steinberg Dithering', 'Color Quantization'],
      dependencies: {},
      linesOfCode: 1400,
      commitVelocityWeekly: 0,
      lastCommitMessage: 'chore: completed weekend hackathon submission and archived',
      githubUrl: 'https://github.com/hkjang/retro-pixel-art'
    },
    postMortem: {
      stoppedDate: '2025-03-12',
      failedReason: 'Niche hobby hackathon project with no recurring user demand or monetization loop.',
      detailedAnalysis: 'Goal of exploring HTML5 Canvas 2D image dithering was completely achieved in 2 days. Keeping it active without feature roadmap would be a distraction.',
      keyLearning: 'Weekend hacks should be consciously archived immediately once learning objective is satisfied.',
      extractedAssets: ['Canvas Export PNG High-DPI Helper', 'Floyd-Steinberg Dithering Algorithm'],
      revivalTrigger: 'If building retro NFT or retro gaming avatar generator.',
      totalHoursInvested: 18
    },
    stars: 22,
    forks: 4,
    openIssues: 0,
  }
];

export const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: 'idea-1',
    title: 'GitLog-to-Changelog AI Agent',
    description: 'GitHub Action that reads git commit messages and diffs every release tag and writes a human-friendly changelog formatted for marketing & user updates.',
    viabilityScore: 88,
    estimatedEffort: 'weekend',
    suggestedStack: ['TypeScript', 'GitHub Actions', 'Claude 3.5 Sonnet'],
    status: 'inbox',
    createdAt: '2026-08-14',
    tags: ['DevTool', 'GitHubAction', 'AI']
  },
  {
    id: 'idea-2',
    title: 'Self-Hosted AI Code Snippet Vault',
    description: 'Local-first desktop app (Tauri + React + SQLite) with vector search to catalog and copy AI-generated snippets with one keystroke.',
    viabilityScore: 92,
    estimatedEffort: '1-week',
    suggestedStack: ['Tauri', 'React', 'Rust', 'SQLite-vec'],
    status: 'inbox',
    createdAt: '2026-08-13',
    tags: ['Desktop', 'Productivity', 'LocalFirst']
  },
  {
    id: 'idea-3',
    title: 'Figma-to-Tailwind Prompt Generator for Non-Designers',
    description: 'Inspects a screenshot or UI wireframe and outputs bulletproof semantic Tailwind CSS v3 components with zero hallucinated classes.',
    viabilityScore: 84,
    estimatedEffort: 'weekend',
    suggestedStack: ['Next.js', 'GPT-4o Vision', 'TailwindCSS'],
    status: 'inbox',
    createdAt: '2026-08-10',
    tags: ['Design', 'Tailwind', 'AI']
  }
];

export const INITIAL_SUMMARY: PortfolioSummary = {
  totalProjects: 10,
  growing: 2,
  experiment: 2,
  maintaining: 2,
  dormant: 1,
  archived: 3,
  totalAssetsExtracted: 6,
  monthlyProjectsCreated: 3,
  monthlyCommitsCount: 68,
  topWorthContinuingProjects: ['clustara', 'vibe-coders', 'micro-saas-starter']
};
