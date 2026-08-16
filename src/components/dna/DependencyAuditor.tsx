import React, { useMemo, useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
import {
  Package,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight,
  Bot,
  Copy,
  Check,
  Search,
  CheckCircle2,
} from 'lucide-react';

interface DependencyStat {
  name: string;
  count: number;
  category: 'core' | 'ui' | 'backend' | 'tooling' | 'database' | 'ai';
  projects: string[];
}

export const DependencyAuditor: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveTab, showToast } = useVibeStore();
  const { language } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDep, setSelectedDep] = useState<DependencyStat | null>(null);
  const [selectedBlueprint, setSelectedBlueprint] = useState<{ dep: string; prompt: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Extract and aggregate tech stacks and dependencies across all 232 projects
  const { depStats, totalLibraries, coreStacksCount } = useMemo(() => {
    const counts: Record<string, { count: number; projects: string[]; category: DependencyStat['category'] }> = {};

    projects.forEach((p) => {
      // 1. Stack elements
      p.stack.forEach((s) => {
        if (!counts[s]) {
          let cat: DependencyStat['category'] = 'tooling';
          if (['React', 'Next.js', 'Vue.js', 'TailwindCSS', 'Flutter'].includes(s)) cat = 'ui';
          else if (['TypeScript', 'JavaScript', 'Python', 'Go', 'Java'].includes(s)) cat = 'core';
          else if (['Express', 'NestJS', 'Node.js', 'Docker', 'FastAPI'].includes(s)) cat = 'backend';
          else if (['PostgreSQL', 'SQLite', 'SQL', 'MongoDB', 'Redis', 'VectorDB'].includes(s)) cat = 'database';
          else if (['Claude Code', 'Ollama', 'RAG', 'AgentHub', 'AI', 'LLM'].includes(s)) cat = 'ai';

          counts[s] = { count: 0, projects: [], category: cat };
        }
        counts[s].count += 1;
        counts[s].projects.push(p.name);
      });

      // 2. DNA dependencies if present
      if (p.dna && Array.isArray(p.dna.dependencies)) {
        p.dna.dependencies.forEach((d) => {
          if (!counts[d]) {
            counts[d] = { count: 0, projects: [], category: 'tooling' };
          }
          if (!counts[d].projects.includes(p.name)) {
            counts[d].count += 1;
            counts[d].projects.push(p.name);
          }
        });
      }
    });

    const sorted: DependencyStat[] = Object.entries(counts)
      .map(([name, data]) => ({
        name,
        count: data.count,
        category: data.category,
        projects: data.projects,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      depStats: sorted,
      totalLibraries: sorted.length,
      coreStacksCount: sorted.filter((s) => s.count >= 5).length,
    };
  }, [projects]);

  const filteredStats = useMemo(() => {
    if (!searchQuery.trim()) return depStats;
    const q = searchQuery.toLowerCase();
    return depStats.filter(
      (d) => d.name.toLowerCase().includes(q) || d.projects.some((p) => p.toLowerCase().includes(q))
    );
  }, [depStats, searchQuery]);

  const handleGenerateBlueprint = (depName: string) => {
    soundEngine.playClick();
    const prompt = `### 🛠️ Architecture Modernization & Dependency Blueprint: ${depName}

**Target Portfolio Ecosystem**: 232 Repositories (hkjang Ecosystem)
**Standardized Core**: Migrate legacy configurations to unified modern standard for **${depName}**.

#### 🎯 Goal:
1. Standardize \`${depName}\` configuration across repositories to reduce dependency drift.
2. Upgrade build pipeline to support native ESM and Vite/Turbopack tooling.
3. Decouple hardcoded backend calls with Local-First multi-channel adapter pattern.

#### 📋 Execution Checklist:
- [ ] Run \`npm audit\` / \`go vet\` to verify zero breaking vulnerabilities.
- [ ] Update \`package.json\` / \`go.mod\` / \`pom.xml\` to current LTS version.
- [ ] Configure tree-shaking & dynamic bundle splitting for high performance.
- [ ] Verify test suite passes with \`npm test\` or \`go test ./...\`.

#### 🤖 Antigravity / Claude Code Prompt:
\`\`\`bash
Please inspect this repository and upgrade '${depName}' to the latest stable standard, ensuring strict TypeScript compilation, zero deprecation warnings, and local caching compliance.
\`\`\`
`;
    setSelectedBlueprint({ dep: depName, prompt });
  };

  const handleCopyPrompt = () => {
    if (!selectedBlueprint) return;
    soundEngine.playClick();
    navigator.clipboard.writeText(selectedBlueprint.prompt);
    setCopied(true);
    showToast('Modernization Blueprint copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold text-white font-mono tracking-tight">
                {language === 'ko'
                  ? '크로스 프로젝트 의존성 & 라이브러리 통합 진단'
                  : 'Cross-Project Dependency & Health Auditor'}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                {totalLibraries} Stacks
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ko'
                ? '전체 232개 레포지토리의 프레임워크 분포, 라이브러리 사용 빈도 및 현대화 청사진'
                : 'Dependency convergence, tech distribution, and AI modernization blueprints'}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ko' ? '라이브러리 또는 프로젝트 검색...' : 'Search stack or repo...'}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono border border-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Grid of Top Standardized Stacks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{language === 'ko' ? '주요 채택 기술 및 적용 프로젝트 수' : 'Top Adopted Stacks & Usage Counts'}</span>
          </span>
          <span className="text-slate-500">
            {coreStacksCount} {language === 'ko' ? '개 핵심 표준 기술 (5회 이상 채택)' : 'Core Standard Stacks (≥5 Repos)'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredStats.map((dep) => {
            const isSelected = selectedDep?.name === dep.name;
            const pct = Math.min(100, Math.round((dep.count / projects.length) * 100));

            return (
              <div
                key={dep.name}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedDep((prev) => (prev?.name === dep.name ? null : dep));
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 group ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 hover:border-emerald-500/30 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono group-hover:text-emerald-300 transition-colors truncate">
                      {dep.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono capitalize">{dep.category}</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 shrink-0">
                    {dep.count} repos
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>{pct}% of portfolio</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateBlueprint(dep.name);
                      }}
                      className="text-cyan-400 hover:underline flex items-center gap-0.5"
                    >
                      <Bot className="w-2.5 h-2.5" /> AI Spec
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Dep Projects Drilldown */}
      {selectedDep && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs sm:text-sm font-bold text-white font-mono">
                {selectedDep.name} Repositories ({selectedDep.projects.length} projects)
              </span>
            </div>
            <button
              onClick={() => setSelectedDep(null)}
              className="text-[11px] font-mono text-emerald-400 hover:underline"
            >
              Close ×
            </button>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1">
            {selectedDep.projects.map((pName) => {
              const proj = projects.find((p) => p.name === pName);
              return (
                <button
                  key={pName}
                  onClick={() => {
                    if (proj) {
                      soundEngine.playClick();
                      setSelectedProjectId(proj.id);
                      setActiveTab('radar');
                    }
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono border border-slate-800 hover:border-emerald-500/50 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>{pName}</span>
                  {proj && <span className="text-[10px] text-emerald-400 font-bold">({proj.score.total} pts)</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Blueprint Modal Overlay */}
      {selectedBlueprint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
                <Bot className="w-4 h-4" />
                <span>AI Modernization Blueprint: {selectedBlueprint.dep}</span>
              </div>
              <button
                onClick={() => setSelectedBlueprint(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 max-h-[50vh] overflow-y-auto font-mono text-xs text-slate-300">
              <pre className="whitespace-pre-wrap leading-relaxed">{selectedBlueprint.prompt}</pre>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold font-mono text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
