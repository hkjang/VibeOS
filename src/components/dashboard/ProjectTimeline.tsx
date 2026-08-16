import React, { useMemo, useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { StageBadge } from '../common/StageBadge';
import { Calendar, TrendingUp, GitCommit, Layers } from 'lucide-react';

interface MonthBucket {
  label: string;
  yearMonth: string;
  projects: { name: string; stage: string }[];
}

export const ProjectTimeline: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveTab } = useVibeStore();
  const { language } = useTranslation();

  const [hoveredMonth, setHoveredMonth] = useState<MonthBucket | null>(null);

  // Build month buckets from project createdAt dates
  const { months, peakMonth, totalMonths } = useMemo(() => {
    const bucketMap: Record<string, MonthBucket> = {};

    projects.forEach((p) => {
      const d = new Date(p.createdAt);
      if (isNaN(d.getTime())) return;
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!bucketMap[ym]) {
        const monthNames =
          language === 'ko'
            ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        bucketMap[ym] = {
          label: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
          yearMonth: ym,
          projects: [],
        };
      }
      bucketMap[ym].projects.push({ name: p.name, stage: p.stage });
    });

    const sorted = Object.values(bucketMap).sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));
    let peak: MonthBucket | null = null;
    sorted.forEach((m) => {
      if (!peak || m.projects.length > peak.projects.length) peak = m;
    });

    return { months: sorted, peakMonth: peak as MonthBucket | null, totalMonths: sorted.length };
  }, [projects, language]);

  const maxCount = peakMonth ? peakMonth.projects.length : 1;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              {language === 'ko' ? '개발자 성장 타임라인 & 프로젝트 생성 내러티브' : 'Developer Growth Timeline & Project Creation Narrative'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {language === 'ko'
                ? `${totalMonths}개월에 걸쳐 234개 프로젝트 탄생 기록`
                : `234 projects born across ${totalMonths} months of engineering history`}
            </p>
          </div>
        </div>

        {peakMonth && (
          <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
            🔥 Peak: {peakMonth.label} ({peakMonth.projects.length} repos)
          </span>
        )}
      </div>

      {/* Timeline Bar Chart */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex items-end gap-1 min-w-[700px] h-[140px]">
          {months.map((month) => {
            const heightPct = Math.max(8, (month.projects.length / maxCount) * 100);
            const isHovered = hoveredMonth?.yearMonth === month.yearMonth;

            return (
              <div
                key={month.yearMonth}
                onMouseEnter={() => setHoveredMonth(month)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex flex-col items-center gap-1 cursor-pointer group"
                style={{ minWidth: '18px' }}
              >
                {/* Bar */}
                <div
                  className={`w-3.5 rounded-t-md transition-all duration-200 ${
                    isHovered
                      ? 'bg-cyan-400 shadow-md shadow-cyan-500/40'
                      : 'bg-gradient-to-t from-cyan-600/60 to-cyan-400/40 group-hover:from-cyan-500 group-hover:to-cyan-300'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
                {/* Year marker on Jan */}
                {month.yearMonth.endsWith('-01') && (
                  <span className="text-[8px] font-mono text-slate-500 mt-0.5">{month.yearMonth.slice(0, 4)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover Detail */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
        <div className="text-slate-400">
          {hoveredMonth ? (
            <span>
              <strong className="text-white font-bold">{hoveredMonth.label}</strong>:{' '}
              <span className="text-cyan-400 font-bold">{hoveredMonth.projects.length} projects created</span>
              {' — '}
              {hoveredMonth.projects
                .slice(0, 5)
                .map((p) => p.name)
                .join(', ')}
              {hoveredMonth.projects.length > 5 && ` +${hoveredMonth.projects.length - 5} more`}
            </span>
          ) : (
            <span className="text-slate-500">Hover over any bar to explore monthly creation velocity</span>
          )}
        </div>
      </div>
    </div>
  );
};
