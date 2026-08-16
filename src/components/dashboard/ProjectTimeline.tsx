import React, { useMemo, useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProjectItem } from '../../types/project';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
import { soundEngine } from '../../utils/soundEngine';
import {
  Calendar,
  TrendingUp,
  GitCommit,
  Layers,
  Sparkles,
  Award,
  ChevronRight,
  Milestone,
  ArrowRight,
  ExternalLink,
  Flame,
  Bot,
  Cpu,
  Compass,
} from 'lucide-react';

interface MonthBucket {
  label: string;
  yearMonth: string;
  year: number;
  projects: ProjectItem[];
  cumulativeCount: number;
}

interface GrowthEra {
  id: string;
  titleKo: string;
  titleEn: string;
  period: string;
  icon: any;
  accentColor: string;
  bgGradient: string;
  narrativeKo: string;
  narrativeEn: string;
  keyTechs: string[];
  startYearMonth: string;
  endYearMonth: string;
}

const GROWTH_ERAS: GrowthEra[] = [
  {
    id: 'era-foundations',
    titleKo: '🏛️ 기반 구축 & 유틸리티 탐구기',
    titleEn: '🏛️ Foundations & Tooling Epoch',
    period: '2018 – 2021',
    icon: Compass,
    accentColor: '#38BDF8', // cyan
    bgGradient: 'from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-500/30',
    narrativeKo:
      '초기 개발 인프라, 언어 기초 학습(Python, Go, Java), CLI 자동화 스크립트 및 오픈소스 기여를 통해 엔지니어링 펀더멘털을 다진 시기입니다.',
    narrativeEn:
      'Built core engineering foundations through Python/Go automation scripts, CLI utilities, and open-source contributions.',
    keyTechs: ['Python', 'Go', 'Bash', 'Docker', 'JavaScript'],
    startYearMonth: '2018-01',
    endYearMonth: '2021-12',
  },
  {
    id: 'era-platforms',
    titleKo: '⚙️ 데이터베이스 & 엔터프라이즈 플랫폼기',
    titleEn: '⚙️ Database & Enterprise Platform Epoch',
    period: '2022 – 2023',
    icon: Cpu,
    accentColor: '#818CF8', // indigo
    bgGradient: 'from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-500/30',
    narrativeKo:
      'SQL 쿼리 에디터, Tadpole DB 허브, API 서버, 사내 협업 봇(Slack/Mattermost) 등 본격적인 풀스택 플랫폼과 데이터 파이프라인을 구축한 확장기입니다.',
    narrativeEn:
      'Engineered full-stack SQL query engines, database tooling, API servers, and enterprise automation bots.',
    keyTechs: ['TypeScript', 'React', 'Java', 'SQL', 'PostgreSQL', 'Docker'],
    startYearMonth: '2022-01',
    endYearMonth: '2023-12',
  },
  {
    id: 'era-ai-agents',
    titleKo: '🤖 AI 에이전트 & 바이브 코딩 혁신기',
    titleEn: '🤖 Autonomous AI & Vibe-Coding Epoch',
    period: '2024 – 2026 (현재)',
    icon: Bot,
    accentColor: '#10B981', // emerald
    bgGradient: 'from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30',
    narrativeKo:
      'AgentHub, AgeForge, OpenGajae, VibeOS 등 LLM 기반 다중 에이전트 시스템, 프롬프트 엔지니어링, Local-First 아키텍처로 폭발적인 생산성을 실현한 시기입니다.',
    narrativeEn:
      'Pioneered autonomous AI agent swarms, Local-First architectures, and generative side-project OS (VibeOS, AgeForge, OpenGajae).',
    keyTechs: ['TypeScript', 'Claude Code', 'Ollama', 'RAG', 'VectorDB', 'TailwindCSS'],
    startYearMonth: '2024-01',
    endYearMonth: '2026-12',
  },
];

export const ProjectTimeline: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveTab } = useVibeStore();
  const { language } = useTranslation();

  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<MonthBucket | null>(null);
  const [viewMetric, setViewMetric] = useState<'velocity' | 'cumulative'>('velocity');

  // Build comprehensive month buckets from project createdAt dates
  const { months, peakMonth, totalMonths, earliestDate, latestDate, milestones } = useMemo(() => {
    const bucketMap: Record<string, { label: string; yearMonth: string; year: number; projects: ProjectItem[] }> = {};

    // Sort projects chronologically
    const sortedProjects = [...projects].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    let earliest = '2026-08';
    let latest = '2020-01';

    sortedProjects.forEach((p) => {
      const d = new Date(p.createdAt);
      if (isNaN(d.getTime())) return;
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (ym < earliest) earliest = ym;
      if (ym > latest) latest = ym;

      if (!bucketMap[ym]) {
        const monthNames =
          language === 'ko'
            ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        bucketMap[ym] = {
          label: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
          yearMonth: ym,
          year: d.getFullYear(),
          projects: [],
        };
      }
      bucketMap[ym].projects.push(p);
    });

    const sortedBuckets = Object.values(bucketMap).sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));

    let runningTotal = 0;
    const enrichedBuckets: MonthBucket[] = sortedBuckets.map((b) => {
      runningTotal += b.projects.length;
      return {
        ...b,
        cumulativeCount: runningTotal,
      };
    });

    let peak: MonthBucket | null = null;
    enrichedBuckets.forEach((m) => {
      if (!peak || m.projects.length > peak.projects.length) peak = m;
    });

    // Compute Milestones
    const milestonesList = [
      { count: 1, labelKo: '첫 번째 레포지토리 탄생', labelEn: 'First Repository Born', month: enrichedBuckets[0]?.label || '' },
      { count: 50, labelKo: '50개 프로젝트 돌파', labelEn: '50 Repositories Milestone', month: enrichedBuckets.find(b => b.cumulativeCount >= 50)?.label || '' },
      { count: 100, labelKo: '100개 센추리온 달성', labelEn: '100 Repos Centurion Mark', month: enrichedBuckets.find(b => b.cumulativeCount >= 100)?.label || '' },
      { count: 200, labelKo: '200개 그랜드 아키텍트', labelEn: '200 Repos Grand Architect', month: enrichedBuckets.find(b => b.cumulativeCount >= 200)?.label || '' },
    ];

    return {
      months: enrichedBuckets,
      peakMonth: peak as MonthBucket | null,
      totalMonths: enrichedBuckets.length,
      earliestDate: earliest,
      latestDate: latest,
      milestones: milestonesList,
    };
  }, [projects, language]);

  // Filter months based on selected era
  const displayedMonths = useMemo(() => {
    if (selectedEra === 'all') return months;
    const era = GROWTH_ERAS.find((e) => e.id === selectedEra);
    if (!era) return months;
    return months.filter((m) => m.yearMonth >= era.startYearMonth && m.yearMonth <= era.endYearMonth);
  }, [months, selectedEra]);

  const maxMonthlyVelocity = useMemo(() => {
    return Math.max(1, ...displayedMonths.map((m) => m.projects.length));
  }, [displayedMonths]);

  const maxCumulative = useMemo(() => {
    return Math.max(1, ...months.map((m) => m.cumulativeCount));
  }, [months]);

  // Active month's projects
  const activeMonthBucket = useMemo(() => {
    if (selectedMonth) {
      return months.find((m) => m.yearMonth === selectedMonth) || null;
    }
    return hoveredMonth || months[months.length - 1] || null;
  }, [selectedMonth, hoveredMonth, months]);

  const handleMonthClick = (ym: string) => {
    soundEngine.playClick();
    setSelectedMonth((prev) => (prev === ym ? null : ym));
  };

  const handleEraClick = (eraId: string) => {
    soundEngine.playClick();
    setSelectedEra((prev) => (prev === eraId ? 'all' : eraId));
    setSelectedMonth(null);
  };

  const handleProjectSelect = (projectId: string) => {
    soundEngine.playClick();
    setSelectedProjectId(projectId);
    setActiveTab('radar');
  };

  return (
    <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold text-white font-mono tracking-tight">
                  {language === 'ko'
                    ? '개발자 성장 타임라인 & 프로젝트 생성 내러티브'
                    : 'Developer Growth Timeline & Creation Narrative'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  {projects.length} Repos
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'ko'
                  ? `${earliestDate}부터 ${latestDate}까지 ${totalMonths}개월간 누적된 엔지니어링 여정과 3대 진화 챕터`
                  : `Chronological journey across ${totalMonths} months (${earliestDate} ~ ${latestDate}) and 3 evolutionary epochs`}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {peakMonth && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>
                <strong>Peak</strong>: {peakMonth.label} ({peakMonth.projects.length} repos)
              </span>
            </div>
          )}

          {/* Metric Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMetric('velocity');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMetric === 'velocity'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'ko' ? '월별 속도' : 'Velocity'}
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMetric('cumulative');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMetric === 'cumulative'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'ko' ? '누적 성장' : 'Cumulative'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Engineering Epoch Chapters (3대 시대별 내러티브 카드) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {GROWTH_ERAS.map((era) => {
          const isSelected = selectedEra === era.id;
          const Icon = era.icon;

          // Count projects in this era
          const eraProjects = projects.filter((p) => {
            const ym = p.createdAt.slice(0, 7);
            return ym >= era.startYearMonth && ym <= era.endYearMonth;
          });

          return (
            <div
              key={era.id}
              onClick={() => handleEraClick(era.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer bg-gradient-to-b relative overflow-hidden group ${
                isSelected
                  ? `${era.bgGradient} shadow-lg ring-1 ring-cyan-400/50 scale-[1.01]`
                  : 'from-slate-900/90 to-slate-950/90 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="p-1.5 rounded-xl text-white shadow-sm"
                    style={{ backgroundColor: `${era.accentColor}25` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: era.accentColor }} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white font-mono leading-tight">
                      {language === 'ko' ? era.titleKo : era.titleEn}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">{era.period}</span>
                  </div>
                </div>
                <span
                  className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border"
                  style={{
                    color: era.accentColor,
                    borderColor: `${era.accentColor}40`,
                    backgroundColor: `${era.accentColor}15`,
                  }}
                >
                  {eraProjects.length} repos
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3 mt-1 font-sans">
                {language === 'ko' ? era.narrativeKo : era.narrativeEn}
              </p>

              {/* Key tech tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {era.keyTechs.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Interactive Timeline Visual Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>
            {selectedEra !== 'all' ? (
              <span className="text-cyan-400">
                Filtered: {GROWTH_ERAS.find((e) => e.id === selectedEra)?.titleEn} (Click card to reset)
              </span>
            ) : (
              'Interactive Monthly Creation Velocity (Click any bar to filter projects)'
            )}
          </span>
          <span className="text-slate-500">
            {viewMetric === 'velocity' ? `Max Peak: ${maxMonthlyVelocity} repos/mo` : `Total: ${projects.length} repos`}
          </span>
        </div>

        {/* Scrollable Bar Chart */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-x-auto">
          <div className="inline-flex items-end gap-1.5 min-w-[760px] h-[160px] pt-4 pb-1">
            {displayedMonths.map((month) => {
              const count = viewMetric === 'velocity' ? month.projects.length : month.cumulativeCount;
              const max = viewMetric === 'velocity' ? maxMonthlyVelocity : maxCumulative;
              const heightPct = Math.max(8, (count / max) * 100);

              const isHovered = hoveredMonth?.yearMonth === month.yearMonth;
              const isSelected = selectedMonth === month.yearMonth;

              // Determine era accent color
              const era = GROWTH_ERAS.find(
                (e) => month.yearMonth >= e.startYearMonth && month.yearMonth <= e.endYearMonth
              );
              const barColor = era?.accentColor || '#38BDF8';

              return (
                <div
                  key={month.yearMonth}
                  onMouseEnter={() => setHoveredMonth(month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  onClick={() => handleMonthClick(month.yearMonth)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  style={{ minWidth: '22px' }}
                >
                  {/* Tooltip on Hover */}
                  <div
                    className={`text-[9px] font-mono font-bold transition-all duration-150 ${
                      isHovered || isSelected ? 'opacity-100 -translate-y-0.5 text-white' : 'opacity-0 text-transparent'
                    }`}
                  >
                    {count}
                  </div>

                  {/* Visual Bar */}
                  <div
                    className={`w-4 rounded-t-lg transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'ring-2 ring-white shadow-lg'
                        : isHovered
                        ? 'opacity-100 scale-y-105'
                        : 'opacity-70 group-hover:opacity-100'
                    }`}
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: isSelected || isHovered ? barColor : `${barColor}90`,
                      boxShadow: isSelected || isHovered ? `0 0 12px ${barColor}60` : undefined,
                    }}
                  />

                  {/* Year / Month Marker */}
                  <span
                    className={`text-[8px] font-mono transition-colors ${
                      isSelected
                        ? 'text-white font-bold'
                        : month.yearMonth.endsWith('-01')
                        ? 'text-cyan-400 font-bold'
                        : 'text-slate-600'
                    }`}
                  >
                    {month.yearMonth.endsWith('-01') ? month.yearMonth.slice(2, 4) + 'Y' : month.yearMonth.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Active Timeframe Project Spotlight (선택된 달/시대의 프로젝트 쇼케이스) */}
      {activeMonthBucket && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm font-bold text-white font-mono">
                {activeMonthBucket.label} Projects Spotlight ({activeMonthBucket.projects.length} repositories created)
              </span>
            </div>
            {selectedMonth && (
              <button
                onClick={() => setSelectedMonth(null)}
                className="text-[11px] font-mono text-cyan-400 hover:underline"
              >
                Clear Selection ×
              </button>
            )}
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
            {activeMonthBucket.projects.map((p) => (
              <div
                key={p.id}
                onClick={() => handleProjectSelect(p.id)}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white font-mono truncate group-hover:text-cyan-300 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {p.description}
                    </p>
                  </div>
                  <ScoreBadge score={p.score.total} size="sm" />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] font-mono">
                  <StageBadge stage={p.stage} size="sm" />
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Inspect <ArrowRight className="w-3 h-3 inline" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Historical Milestone Trophies */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 mb-3 text-slate-400 font-mono text-xs font-semibold">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{language === 'ko' ? '역대 주요 마일스톤 달성 기록' : 'Historical Milestone Accomplishments'}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {milestones.map((m) => (
            <div
              key={m.count}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-cyan-400 font-bold">#{m.count} Milestone</span>
                <span className="text-slate-500">{m.month}</span>
              </div>
              <p className="text-xs font-bold text-white font-mono truncate">
                {language === 'ko' ? m.labelKo : m.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
