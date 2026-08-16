import React, { useMemo, useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { Code2, Layers, ChevronDown, ChevronUp } from 'lucide-react';

interface StackEntry {
  name: string;
  count: number;
  projects: string[];
  tier: 'master' | 'expert' | 'proficient' | 'familiar' | 'exploring';
}

const TIER_STYLES: Record<string, { bg: string; text: string; border: string; bar: string; label: string; labelKo: string }> = {
  master: { bg: 'bg-cyan-500/10', text: 'text-cyan-300', border: 'border-cyan-500/30', bar: 'bg-gradient-to-r from-cyan-600 to-cyan-400', label: 'Master', labelKo: '마스터' },
  expert: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30', bar: 'bg-gradient-to-r from-emerald-600 to-emerald-400', label: 'Expert', labelKo: '전문가' },
  proficient: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30', bar: 'bg-gradient-to-r from-amber-600 to-amber-400', label: 'Proficient', labelKo: '숙련' },
  familiar: { bg: 'bg-slate-500/10', text: 'text-slate-300', border: 'border-slate-500/30', bar: 'bg-gradient-to-r from-slate-600 to-slate-400', label: 'Familiar', labelKo: '익숙' },
  exploring: { bg: 'bg-rose-500/10', text: 'text-rose-300', border: 'border-rose-500/30', bar: 'bg-gradient-to-r from-rose-600 to-rose-400', label: 'Exploring', labelKo: '탐색 중' },
};

function getTier(count: number): StackEntry['tier'] {
  if (count >= 20) return 'master';
  if (count >= 10) return 'expert';
  if (count >= 5) return 'proficient';
  if (count >= 2) return 'familiar';
  return 'exploring';
}

export const TechStackRadar: React.FC = () => {
  const { projects } = useVibeStore();
  const { language } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const [hoveredStack, setHoveredStack] = useState<StackEntry | null>(null);

  const { entries, uniqueCount } = useMemo(() => {
    const map: Record<string, { count: number; projects: string[] }> = {};
    projects.forEach((p) => {
      p.stack.forEach((tech) => {
        const key = tech.toLowerCase().trim();
        if (!key) return;
        if (!map[key]) map[key] = { count: 0, projects: [] };
        map[key].count++;
        if (map[key].projects.length < 20) map[key].projects.push(p.name);
      });
    });

    const sorted: StackEntry[] = Object.entries(map)
      .map(([name, data]) => ({
        name,
        count: data.count,
        projects: data.projects,
        tier: getTier(data.count),
      }))
      .sort((a, b) => b.count - a.count);

    return { entries: sorted, uniqueCount: sorted.length };
  }, [projects]);

  const displayed = showAll ? entries : entries.slice(0, 15);
  const maxCount = entries[0]?.count || 1;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              {language === 'ko' ? '기술 스택 분포 & 마스터리 레이더' : 'Tech Stack Distribution & Mastery Radar'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {language === 'ko'
                ? `${uniqueCount}개 고유 기술 스택 감지 — 포트폴리오 전체 분석`
                : `${uniqueCount} unique stacks detected — full portfolio analysis`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-xl border border-violet-500/20">
            <Layers className="w-3 h-3 inline mr-1" />
            {uniqueCount} stacks
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-1.5">
        {displayed.map((entry) => {
          const widthPct = Math.max(4, (entry.count / maxCount) * 100);
          const style = TIER_STYLES[entry.tier];
          const isHovered = hoveredStack?.name === entry.name;

          return (
            <div
              key={entry.name}
              onMouseEnter={() => setHoveredStack(entry)}
              onMouseLeave={() => setHoveredStack(null)}
              className={`flex items-center gap-3 py-1.5 px-2 rounded-xl cursor-default transition-all ${
                isHovered ? 'bg-slate-800/60' : 'hover:bg-slate-800/30'
              }`}
            >
              {/* Tech name */}
              <span className="text-xs font-mono text-slate-300 w-24 shrink-0 truncate capitalize font-semibold">
                {entry.name}
              </span>

              {/* Bar */}
              <div className="flex-1 h-5 bg-slate-800/40 rounded-lg overflow-hidden relative">
                <div
                  className={`h-full rounded-lg ${style.bar} transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-75'}`}
                  style={{ width: `${widthPct}%` }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/80 font-bold">
                  {entry.count}
                </span>
              </div>

              {/* Tier badge */}
              <span
                className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-lg border shrink-0 ${style.bg} ${style.text} ${style.border}`}
              >
                {language === 'ko' ? style.labelKo : style.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Show All / Collapse toggle */}
      {entries.length > 15 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 py-2 transition-colors"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-3 h-3" />
              {language === 'ko' ? `Top 15만 보기` : `Show Top 15 Only`}
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              {language === 'ko' ? `전체 ${entries.length}개 스택 보기` : `Show All ${entries.length} Stacks`}
            </>
          )}
        </button>
      )}

      {/* Hover detail */}
      <div className="pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400 min-h-[32px]">
        {hoveredStack ? (
          <span>
            <strong className="text-white">{hoveredStack.name}</strong>
            {' — '}
            <span className={TIER_STYLES[hoveredStack.tier].text}>
              {language === 'ko' ? TIER_STYLES[hoveredStack.tier].labelKo : TIER_STYLES[hoveredStack.tier].label}
            </span>
            {' — '}
            {hoveredStack.projects.slice(0, 6).join(', ')}
            {hoveredStack.projects.length > 6 && ` +${hoveredStack.projects.length - 6} more`}
          </span>
        ) : (
          <span className="text-slate-500">
            {language === 'ko' ? '기술 스택 위에 마우스를 올려 사용 프로젝트를 확인하세요' : 'Hover any stack to see which projects use it'}
          </span>
        )}
      </div>
    </div>
  );
};
