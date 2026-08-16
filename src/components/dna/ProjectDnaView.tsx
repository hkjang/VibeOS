import React from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import {
  Cpu,
  Layers,
  Sparkles,
  Code2,
  GitBranch,
  Terminal,
  Database,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { TechStackTag } from '../common/TechStackTag';
import { StageBadge } from '../common/StageBadge';

export const ProjectDnaView: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveTab } = useVibeStore();

  // Aggregate tech stacks frequency
  const stackCountMap: Record<string, number> = {};
  projects.forEach((p) => {
    p.stack.forEach((tech) => {
      stackCountMap[tech] = (stackCountMap[tech] || 0) + 1;
    });
  });

  const sortedTechs = Object.entries(stackCountMap).sort((a, b) => b[1] - a[1]);

  // Aggregate all prompt patterns
  const allPrompts = projects.flatMap((p) =>
    (p.dna.promptPatterns || []).map((prompt) => ({
      prompt,
      project: p.name,
      stage: p.stage,
    }))
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-400">
            <Cpu className="w-5 h-5" />
            <span className="text-xs uppercase font-mono tracking-widest font-bold">
              Engineering Matrix
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Project DNA & Architecture Library
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            Standardize architectures, prompt engineering patterns, and dependencies across all your
            vibe-coding experiments.
          </p>
        </div>
      </div>

      {/* Tech Stack Distribution */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
          Dominant Tech Stacks Across Portfolio
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {sortedTechs.map(([tech, count]) => (
            <div
              key={tech}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
            >
              <span className="font-mono text-xs text-white font-semibold">{tech}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {count} repo{count > 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Patterns Library */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-violet-400">
            <Sparkles className="w-4 h-4" />
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              AI Prompt & Agent DNA Library
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {allPrompts.length} Cataloged Prompts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPrompts.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 hover:border-violet-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-violet-300 font-bold">
                  {item.prompt}
                </span>
                <StageBadge stage={item.stage} size="sm" showIcon={false} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                <span>From: <strong className="text-white font-mono">{item.project}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Architectural Profiles */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
          Individual Project Architectural DNA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProjectId(p.id);
                setActiveTab('radar');
              }}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-white font-mono group-hover:text-cyan-300 transition-colors">
                  {p.name}
                </span>
                <StageBadge stage={p.stage} size="sm" />
              </div>

              <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                {p.dna.architecture}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
                <span>{Object.keys(p.dna.dependencies).length} dependencies</span>
                <span className="text-emerald-400">{p.dna.commitVelocityWeekly} commits/wk</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
