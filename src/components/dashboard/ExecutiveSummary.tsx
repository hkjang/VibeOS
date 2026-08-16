import React from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import {
  TrendingUp,
  Sparkles,
  Zap,
  Archive,
  ArrowRight,
  Flame,
  Calendar,
  ChevronRight,
  Target,
  Cpu,
  Bot,
} from 'lucide-react';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
import { ContributionHeatmap } from './ContributionHeatmap';
import { RoiLeverageCalculator } from './RoiLeverageCalculator';
import { ProjectTimeline } from './ProjectTimeline';
import { AchievementBadges } from './AchievementBadges';
import { TechStackRadar } from './TechStackRadar';
import { DeveloperRpgHud } from './DeveloperRpgHud';
import { DeveloperQuestBoard } from './DeveloperQuestBoard';
import { TeslaMazeGame } from './TeslaMazeGame';
import { KingdomRushTowerDefense } from './KingdomRushTowerDefense';
import { DomainConquestRpg } from './DomainConquestRpg';
import { LiveActivityFeed } from './LiveActivityFeed';
import { ParticleField } from '../visual/ParticleField';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';

export const ExecutiveSummary: React.FC = () => {
  const {
    projects,
    assets,
    summary,
    setActiveTab,
    setSelectedProjectId,
    reAnalyzeAll,
  } = useVibeStore();

  const { t } = useTranslation();

  const activeProjects = projects.filter((p) => p.status === 'active');
  const graveyardProjects = projects.filter((p) => p.status === 'graveyard');

  // Sorted by score descending for "Worth Continuing"
  const topProjects = [...activeProjects].sort((a, b) => b.score.total - a.score.total);

  // Stage counts for distribution
  const stageData = [
    { name: t.stages.grow, count: summary.growing, fill: '#10B981' },
    { name: t.stages.experiment, count: summary.experiment, fill: '#F59E0B' },
    { name: t.stages.maintain, count: summary.maintaining, fill: '#3B82F6' },
    { name: t.stages.prototype, count: projects.filter((p) => p.stage === 'prototype').length, fill: '#8B5CF6' },
    { name: t.stages.dormant, count: summary.dormant, fill: '#64748B' },
    { name: t.stages.archived, count: summary.archived, fill: '#F43F5E' },
  ];

  // Radar chart aggregate score dimensions
  const avgScores = [
    {
      subject: 'Activity',
      value: Math.round(
        activeProjects.reduce((acc, p) => acc + p.score.activity, 0) / (activeProjects.length || 1)
      ),
    },
    {
      subject: 'Maintainability',
      value: Math.round(
        activeProjects.reduce((acc, p) => acc + p.score.maintainability, 0) / (activeProjects.length || 1)
      ),
    },
    {
      subject: 'Reuse',
      value: Math.round(
        activeProjects.reduce((acc, p) => acc + p.score.reuse, 0) / (activeProjects.length || 1)
      ),
    },
    {
      subject: 'Potential',
      value: Math.round(
        activeProjects.reduce((acc, p) => acc + p.score.potential, 0) / (activeProjects.length || 1)
      ),
    },
  ];

  // Velocity activity mock data for month
  const velocityData = [
    { week: 'Week 1', commits: 14, assets: 1 },
    { week: 'Week 2', commits: 22, assets: 2 },
    { week: 'Week 3', commits: 18, assets: 1 },
    { week: 'Week 4 (Now)', commits: 28, assets: 2 },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 animate-fadeIn pb-12">
      {/* Header Banner - Semantic Article for SEO / AEO */}
      <article className="p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        {/* Ambient Particle Field Background */}
        <ParticleField />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <header className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest font-bold">
                {t.dashboard.portfolioIntelligence}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {t.dashboard.heroTitle}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
              <span className="font-semibold text-white font-mono">{t.dashboard.heroTotal.replace('{total}', String(projects.length))}</span> —{' '}
              <span className="text-emerald-400 font-semibold">{t.dashboard.heroGrowing.replace('{count}', String(summary.growing))}</span>,{' '}
              <span className="text-amber-400 font-semibold">{t.dashboard.heroExperiment.replace('{count}', String(summary.experiment))}</span>,{' '}
              <span className="text-blue-400 font-semibold">{t.dashboard.heroMaintain.replace('{count}', String(summary.maintaining))}</span>,{' '}
              <span className="text-slate-400 font-semibold">{t.dashboard.heroDormant.replace('{count}', String(summary.dormant))}</span>,{' '}
              <span className="text-rose-400 font-semibold">{t.dashboard.heroArchived.replace('{count}', String(summary.archived))}</span>.
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setActiveTab('radar')}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
              <span>{t.radar.viewCosmos || 'Cosmos Galaxy'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => reAnalyzeAll()}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 text-xs sm:text-sm font-semibold transition-all"
            >
              {t.dashboard.reScoreAll}
            </button>
          </div>
        </div>
      </article>

      {/* Hero Numbers KPI Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Portfolio Key Metrics">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 font-mono uppercase">{t.dashboard.kpiGrowingTitle}</span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{summary.growing}</div>
            <p className="text-[10px] sm:text-xs text-emerald-400 mt-0.5 sm:mt-1 font-medium">{t.dashboard.kpiGrowingSub}</p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 font-mono uppercase">{t.dashboard.kpiExperimentTitle}</span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{summary.experiment}</div>
            <p className="text-[10px] sm:text-xs text-amber-400 mt-0.5 sm:mt-1 font-medium">{t.dashboard.kpiExperimentSub}</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 font-mono uppercase">{t.dashboard.kpiAssetsTitle}</span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-violet-500/10 text-violet-400">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{assets.length}</div>
            <p className="text-[10px] sm:text-xs text-violet-400 mt-0.5 sm:mt-1 font-medium">{t.dashboard.kpiAssetsSub}</p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 font-mono uppercase">{t.dashboard.kpiGraveyardTitle}</span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Archive className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{graveyardProjects.length}</div>
            <p className="text-[10px] sm:text-xs text-rose-400 mt-0.5 sm:mt-1 font-medium">{t.dashboard.kpiGraveyardSub}</p>
          </div>
        </div>
      </section>

      {/* Cyberpunk Developer RPG HUD & Character Progression */}
      <DeveloperRpgHud />

      {/* 365-Day Contribution & Activity Heatmap */}
      <ContributionHeatmap />

      {/* Compound ROI & Developer Leverage Calculator */}
      <RoiLeverageCalculator />

      {/* Developer Growth Timeline */}
      <ProjectTimeline />

      {/* Tesla Cyber Fleet FSD Autopilot Mini-Game */}
      <TeslaMazeGame />

      {/* Kingdom Rush : Cyber Tower Defense (킹덤 러쉬 타워 디펜스) */}
      <KingdomRushTowerDefense />

      {/* Daily Quests & Weekly Boss Bounty Board */}
      <DeveloperQuestBoard />

      {/* Achievement Badge Collection */}
      <AchievementBadges />

      {/* Tech Stack Distribution & Live Activity Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6" aria-label="Portfolio Analytics">
        <TechStackRadar />
        <LiveActivityFeed />
      </section>

      {/* TODAY High-Leverage Actions & Monthly Synthesis */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6" aria-label="Today Actions">
        {/* Left 2 Cols: Ranked Next Actions for Today */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {t.dashboard.todayTitle}
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  {t.dashboard.todaySub}
                </p>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              {t.dashboard.topPriority}
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {topProjects.slice(0, 4).map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setActiveTab('radar');
                }}
                className="p-3.5 sm:p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all cursor-pointer flex items-start justify-between gap-3 sm:gap-4 group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-700/60 text-slate-300 text-[11px] sm:text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs sm:text-sm text-white font-mono group-hover:text-cyan-300 transition-colors">
                        {proj.name}
                      </span>
                      <StageBadge stage={proj.stage} size="sm" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      {proj.nextAction}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-0.5">
                      <span className="capitalize font-mono text-[10px] text-cyan-400 bg-cyan-950/40 px-1.5 py-0.2 rounded border border-cyan-800/30">
                        {proj.nextActionCategory}
                      </span>
                      <span>•</span>
                      <span>Score: {proj.score.total}/100</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center self-center text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: "What You Built This Month" Intelligence Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs uppercase font-mono font-bold tracking-wider">
                {t.dashboard.monthlySubtitle}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t.dashboard.monthlyTitle}
            </h3>

            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400">{t.dashboard.projectsCreated}</span>
                <span className="font-mono font-bold text-white text-sm sm:text-base">
                  {summary.monthlyProjectsCreated}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400">{t.dashboard.totalCommits}</span>
                <span className="font-mono font-bold text-emerald-400 text-sm sm:text-base">
                  {summary.monthlyCommitsCount}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400">{t.dashboard.assetsMined}</span>
                <span className="font-mono font-bold text-violet-400 text-sm sm:text-base">
                  {assets.length}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400">{t.dashboard.worthContinuing}</span>
                <span className="font-mono font-bold text-cyan-400 text-sm sm:text-base">
                  {summary.topWorthContinuingProjects.length}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200/90 leading-relaxed">
            💡 <strong className="text-white">{t.dashboard.aiTakeawayTitle}:</strong> {t.dashboard.aiTakeawayText}
          </div>
        </div>
      </section>

      {/* Visual Analytics Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" aria-label="Visual Analytics Charts">
        {/* Chart 1: Stage Distribution */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t.dashboard.stageBreakdown}
            </h3>
            <span className="text-xs text-slate-400">{projects.length} Total</span>
          </div>
          <div className="h-52 sm:h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" stroke="#64748B" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={10} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: 4-Dimensional Portfolio Health Radar */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t.dashboard.radarHealth}
            </h3>
            <span className="text-xs text-cyan-400 font-mono">{t.dashboard.avgHealth}</span>
          </div>
          <div className="h-52 sm:h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={avgScores}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={10} />
                <Radar
                  name="Portfolio"
                  dataKey="value"
                  stroke="#38BDF8"
                  fill="#38BDF8"
                  fillOpacity={0.4}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Weekly Commit & Mining Velocity */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t.dashboard.velocityTrend}
            </h3>
            <span className="text-xs text-emerald-400 font-mono">+32% MoM</span>
          </div>
          <div className="h-52 sm:h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData} margin={{ left: -15, right: 10 }}>
                <defs>
                  <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="commits"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#commitGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* AEO / Answer Engine Direct Summary Box */}
      <section className="p-5 sm:p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs text-slate-400 font-sans" aria-label="AEO Structured Summary">
        <div className="flex items-center gap-2 text-slate-300 font-semibold font-mono">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>VibeOS Quick Facts (AEO & AI Search Summary)</span>
        </div>
        <p className="leading-relaxed">
          <strong>VibeOS</strong> is a serverless AI side-project portfolio operating system. It calculates 4-dimensional health scores (Activity, Maintainability, Reusability, Potential) for GitHub repositories, extracts reusable modules (Auth, LLM wrappers, UI tables), records Graveyard post-mortems to salvage developer knowledge, and prioritizes high-leverage next actions.
        </p>
      </section>
    </div>
  );
};
