import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import {
  Cpu,
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldAlert,
} from 'lucide-react';
import { StageBadge } from '../common/StageBadge';

export const ProjectDnaView: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveTab } = useVibeStore();
  const { t, language } = useTranslation();

  // Aggregate tech stacks frequency
  const stackCountMap: Record<string, number> = {};
  projects.forEach((p) => {
    p.stack.forEach((tech) => {
      stackCountMap[tech] = (stackCountMap[tech] || 0) + 1;
    });
  });

  const sortedTechs = Object.entries(stackCountMap).sort((a, b) => b[1] - a[1]);

  // Technology Radar categorizer
  const adoptList = sortedTechs.filter(([_, count]) => count >= 20);
  const trialList = sortedTechs.filter(([_, count]) => count >= 6 && count < 20);
  const assessList = sortedTechs.filter(([_, count]) => count >= 2 && count < 6);
  const holdList = [
    { name: 'ActiveX / Win32 API', reason: 'Deprecated legacy bindings (Kiwoom-Helper)' },
    { name: 'Direct Third-Party REST APIs', reason: 'Fragile schemas replaced by Multi-Channel Adapters' },
    { name: 'Monolithic Express Servers', reason: 'Shifted to Serverless Vite SPA + GitHub Actions' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 shadow-xl">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center gap-2 text-sky-400">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest font-bold">
              Engineering Matrix & Technology Radar
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.dna.title}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {t.dna.subtitle}
          </p>
        </div>
      </div>

      {/* Technology Radar Rings Grid */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Compass className="w-5 h-5 text-cyan-400 animate-spin" />
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              Vibe Technology Radar (234 Repositories Mastery)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Adopt / Trial / Assess / Hold</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ring 1: ADOPT */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> ADOPT (20+ Repos)
              </span>
              <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-500/20">
                Core Standard
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              검증 완료된 포트폴리오 기본 표준 스택입니다.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {adoptList.map(([tech, count]) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs font-mono text-emerald-300 font-bold"
                >
                  {tech} <span className="text-[10px] text-slate-500 font-normal">({count})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Ring 2: TRIAL */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> TRIAL (6-19 Repos)
              </span>
              <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-500/20">
                High Velocity
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              최근 신규 성장 엔진에 적극 도입 중인 기술군입니다.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {trialList.map(([tech, count]) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-semibold"
                >
                  {tech} <span className="text-[10px] text-slate-500 font-normal">({count})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Ring 3: ASSESS */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> ASSESS (2-5 Repos)
              </span>
              <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/20">
                Exploring
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              가설 검증 및 프로토타입 프로젝트에서 타당성 평가 중입니다.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {assessList.map(([tech, count]) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-amber-500/40 text-xs font-mono text-amber-300"
                >
                  {tech} <span className="text-[10px] text-slate-500 font-normal">({count})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Ring 4: HOLD */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 font-mono flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> HOLD (Deprecated)
              </span>
              <span className="text-[10px] font-mono text-rose-300 px-2 py-0.5 rounded-full bg-rose-500/20">
                Archived
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              과거 묘지 프로젝트에서 교훈을 얻고 격리한 안티패턴입니다.
            </p>
            <div className="space-y-1.5 pt-1">
              {holdList.map((h, i) => (
                <div key={i} className="text-[11px] font-mono p-2 rounded-xl bg-slate-950/80 border border-rose-500/30">
                  <span className="text-rose-300 font-bold block">{h.name}</span>
                  <span className="text-slate-500 text-[10px]">{h.reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Distribution */}
      <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-xs sm:text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
          {t.dna.dominantStacks} (전체 스택 분포)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {sortedTechs.map(([tech, count]) => (
            <div
              key={tech}
              className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
            >
              <span className="font-mono text-xs text-white font-semibold">{tech}</span>
              <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {count} repo{count > 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Architectural Profiles */}
      <div className="space-y-3.5 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
            {t.dna.archProfiles}
          </h2>
          <span className="text-xs font-mono text-slate-500">234 Repositories Cataloged</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {projects.slice(0, 36).map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProjectId(p.id);
                setActiveTab('radar');
              }}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer space-y-2.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white font-mono group-hover:text-cyan-300 transition-colors truncate max-w-[180px]">
                  {p.name}
                </span>
                <StageBadge stage={p.stage} size="sm" />
              </div>

              <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 line-clamp-1">
                {p.dna.architecture}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono text-[11px]">
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
