import React, { useMemo, useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProjectItem } from '../../types/project';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
import { soundEngine } from '../../utils/soundEngine';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import {
  Calendar,
  Sparkles,
  Award,
  ArrowRight,
  Flame,
  Bot,
  Cpu,
  Compass,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

interface MonthBucket {
  label: string;
  yearMonth: string;
  year: number;
  shortLabel: string;
  projects: ProjectItem[];
  velocity: number;
  cumulativeCount: number;
  eraId: string;
  eraColor: string;
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
  const [viewMetric, setViewMetric] = useState<'velocity' | 'cumulative'>('velocity');

  // Build comprehensive month buckets from project createdAt dates
  const { months, peakMonth, totalMonths, earliestDate, latestDate, milestones } = useMemo(() => {
    const bucketMap: Record<string, { label: string; yearMonth: string; year: number; shortLabel: string; projects: ProjectItem[] }> = {};

    // Sort projects chronologically
    const sortedProjects = [...projects].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    let earliest = '2026-08';
    let latest = '2019-01';

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
          label: `${d.getFullYear()} ${monthNames[d.getMonth()]}`,
          yearMonth: ym,
          year: d.getFullYear(),
          shortLabel: ym.endsWith('-01') ? `${d.getFullYear().toString().slice(2)}'` : monthNames[d.getMonth()],
          projects: [],
        };
      }
      bucketMap[ym].projects.push(p);
    });

    const sortedBuckets = Object.values(bucketMap).sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));

    let runningTotal = 0;
    const enrichedBuckets: MonthBucket[] = sortedBuckets.map((b) => {
      runningTotal += b.projects.length;

      const era = GROWTH_ERAS.find(
        (e) => b.yearMonth >= e.startYearMonth && b.yearMonth <= e.endYearMonth
      );

      return {
        ...b,
        velocity: b.projects.length,
        cumulativeCount: runningTotal,
        eraId: era?.id || 'era-foundations',
        eraColor: era?.accentColor || '#38BDF8',
      };
    });

    let peak: MonthBucket | null = null;
    enrichedBuckets.forEach((m) => {
      if (!peak || m.velocity > peak.velocity) peak = m;
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

  // Active month's projects
  const activeMonthBucket = useMemo(() => {
    if (selectedMonth) {
      return months.find((m) => m.yearMonth === selectedMonth) || null;
    }
    return months[months.length - 1] || null;
  }, [selectedMonth, months]);

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

  // Custom Recharts Tooltip
  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: MonthBucket = payload[0].payload;
      return (
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-1.5 min-w-[200px] font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-cyan-300">{data.label}</span>
            <span
              className="text-[9px] px-2 py-0.5 rounded-md font-bold"
              style={{ backgroundColor: `${data.eraColor}20`, color: data.eraColor }}
            >
              {data.eraId.replace('era-', '').toUpperCase()}
            </span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-slate-400">{language === 'ko' ? '월 생성 속도' : 'Monthly Created'}:</span>
            <strong className="text-emerald-400 font-bold">+{data.velocity} repos</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">{language === 'ko' ? '누적 총계' : 'Cumulative Total'}:</span>
            <span className="text-white font-bold">{data.cumulativeCount} repos</span>
          </div>

          <div className="pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-300">
            <span className="text-slate-500 block text-[9px] uppercase mb-0.5">Projects:</span>
            <span className="line-clamp-2">
              {data.projects.map((p) => p.name).join(', ')}
            </span>
          </div>
        </div>
      );
    }
    return null;
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

        {/* Quick Stats Pills & View Mode Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {peakMonth && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>
                <strong>Peak</strong>: {peakMonth.label} (+{peakMonth.velocity} repos)
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
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                viewMetric === 'velocity'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3 h-3" />
              <span>{language === 'ko' ? '월별 속도' : 'Velocity'}</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMetric('cumulative');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                viewMetric === 'cumulative'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>{language === 'ko' ? '누적 성장' : 'Cumulative'}</span>
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

      {/* 3. Recharts Visual Chart Container (Guaranteed 100% Reliable Render) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {selectedEra !== 'all' ? (
              <span className="text-cyan-300 font-bold">
                Filtered: {GROWTH_ERAS.find((e) => e.id === selectedEra)?.titleEn} (Click chapter card to reset)
              </span>
            ) : viewMetric === 'velocity' ? (
              <span>Monthly Project Ingestion Velocity (Click any bar to inspect projects)</span>
            ) : (
              <span>Cumulative Portfolio Growth Trajectory (1 ➔ {projects.length} repositories)</span>
            )}
          </span>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Foundations
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#818CF8]" /> Platforms
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" /> AI Agents
            </span>
          </div>
        </div>

        {/* Recharts Chart Area */}
        <div className="h-60 sm:h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {viewMetric === 'velocity' ? (
              <BarChart
                data={displayedMonths}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    const ym = e.activePayload[0].payload.yearMonth;
                    soundEngine.playClick();
                    setSelectedMonth(ym);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis
                  dataKey="yearMonth"
                  stroke="#64748B"
                  fontSize={10}
                  tickFormatter={(val) => {
                    const parts = val.split('-');
                    return parts[1] === '01' ? `${parts[0].slice(2)}Y` : `${parseInt(parts[1])}M`;
                  }}
                />
                <YAxis stroke="#64748B" fontSize={10} allowDecimals={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Bar dataKey="velocity" radius={[4, 4, 0, 0]}>
                  {displayedMonths.map((entry) => (
                    <Cell
                      key={entry.yearMonth}
                      fill={selectedMonth === entry.yearMonth ? '#FFFFFF' : entry.eraColor}
                      opacity={selectedMonth && selectedMonth !== entry.yearMonth ? 0.35 : 0.9}
                      className="cursor-pointer transition-all duration-200 hover:opacity-100"
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <AreaChart
                data={displayedMonths}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    const ym = e.activePayload[0].payload.yearMonth;
                    soundEngine.playClick();
                    setSelectedMonth(ym);
                  }
                }}
              >
                <defs>
                  <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.6} />
                    <stop offset="50%" stopColor="#818CF8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis
                  dataKey="yearMonth"
                  stroke="#64748B"
                  fontSize={10}
                  tickFormatter={(val) => {
                    const parts = val.split('-');
                    return parts[1] === '01' ? `${parts[0].slice(2)}Y` : `${parseInt(parts[1])}M`;
                  }}
                />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip content={<CustomChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="cumulativeCount"
                  stroke="#38BDF8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#cumulativeGradient)"
                  className="cursor-pointer"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
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
