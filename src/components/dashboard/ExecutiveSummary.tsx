import React from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import {
  TrendingUp,
  Sparkles,
  Zap,
  Archive,
  ArrowRight,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Target,
  Cpu,
} from 'lucide-react';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
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

  const activeProjects = projects.filter((p) => p.status === 'active');
  const graveyardProjects = projects.filter((p) => p.status === 'graveyard');

  // Sorted by score descending for "Worth Continuing"
  const topProjects = [...activeProjects].sort((a, b) => b.score.total - a.score.total);

  // Stage counts for distribution
  const stageData = [
    { name: 'Growing', count: summary.growing, fill: '#10B981' },
    { name: 'Experiment', count: summary.experiment, fill: '#F59E0B' },
    { name: 'Maintain', count: summary.maintaining, fill: '#3B82F6' },
    { name: 'Prototype', count: projects.filter((p) => p.stage === 'prototype').length, fill: '#8B5CF6' },
    { name: 'Dormant', count: summary.dormant, fill: '#64748B' },
    { name: 'Archived', count: summary.archived, fill: '#F43F5E' },
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
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs uppercase font-mono tracking-widest font-bold">
                Portfolio Intelligence
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Vibe Coding Portfolio
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
              <span className="font-semibold text-white font-mono">{projects.length} Total Projects</span> —{' '}
              <span className="text-emerald-400 font-semibold">{summary.growing} Growing</span>,{' '}
              <span className="text-amber-400 font-semibold">{summary.experiment} Experimenting</span>,{' '}
              <span className="text-blue-400 font-semibold">{summary.maintaining} Maintaining</span>,{' '}
              <span className="text-slate-400 font-semibold">{summary.dormant} Dormant</span>,{' '}
              <span className="text-rose-400 font-semibold">{summary.archived} Archived in Graveyard</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('radar')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 hover:scale-[1.02] transition-all"
            >
              Open Radar
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => reAnalyzeAll()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 text-sm font-semibold transition-all"
            >
              Re-Score All
            </button>
          </div>
        </div>
      </div>

      {/* Hero Numbers KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-mono uppercase">Growing Momentum</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{summary.growing}</div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">Ready for production & scale</p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-mono uppercase">Active Experiments</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{summary.experiment}</div>
            <p className="text-xs text-amber-400 mt-1 font-medium">Problem-solution validation</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-mono uppercase">Harvested Assets</span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{assets.length}</div>
            <p className="text-xs text-violet-400 mt-1 font-medium">Reusable code & wrappers</p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-mono uppercase">Graveyard Assetization</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Archive className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{graveyardProjects.length}</div>
            <p className="text-xs text-rose-400 mt-1 font-medium">100% post-mortem cataloged</p>
          </div>
        </div>
      </div>

      {/* Core Question 1: TODAY — What should I build next? */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Ranked Next Actions for Today */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  TODAY: High-Leverage Next Actions
                </h2>
                <p className="text-xs text-slate-400">
                  AI-ranked next steps to move your projects forward
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              Top 4 Priority
            </span>
          </div>

          <div className="space-y-3">
            {topProjects.slice(0, 4).map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setActiveTab('radar');
                }}
                className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all cursor-pointer flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-slate-700/60 text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white font-mono group-hover:text-cyan-300 transition-colors">
                        {proj.name}
                      </span>
                      <StageBadge stage={proj.stage} size="sm" />
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">
                      {proj.nextAction}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                      <span className="capitalize font-mono text-[11px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                        {proj.nextActionCategory}
                      </span>
                      <span>•</span>
                      <span>Score: {proj.score.total}/100</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center self-center text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: "What You Built This Month" Intelligence Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Calendar className="w-4 h-4" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider">
                Monthly Synthesis
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              You Built This Month
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400">Projects Created</span>
                <span className="font-mono font-bold text-white text-base">
                  {summary.monthlyProjectsCreated} projects
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400">Total Commits</span>
                <span className="font-mono font-bold text-emerald-400 text-base">
                  {summary.monthlyCommitsCount} commits
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400">Reusable Assets Mined</span>
                <span className="font-mono font-bold text-violet-400 text-base">
                  {assets.length} assets
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400">Worth Continuing</span>
                <span className="font-mono font-bold text-cyan-400 text-base">
                  {summary.topWorthContinuingProjects.length} projects
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200/90 leading-relaxed">
            💡 <strong className="text-white">AI Takeaway:</strong> High velocity observed in{' '}
            <span className="font-mono text-cyan-300 font-semibold">{topProjects[0]?.name || 'current'}</span>.
            Focus coding hours here and avoid context-switching across more than 3 active projects.
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Stage Distribution */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              Stage Breakdown
            </h3>
            <span className="text-xs text-slate-400">{projects.length} Total</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" stroke="#64748B" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} width={80} />
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
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              Portfolio 4D Score
            </h3>
            <span className="text-xs text-cyan-400 font-mono">Avg Health</span>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={avgScores}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
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
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              Velocity Trend
            </h3>
            <span className="text-xs text-emerald-400 font-mono">+32% MoM</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData} margin={{ left: -15, right: 10 }}>
                <defs>
                  <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
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
      </div>
    </div>
  );
};
