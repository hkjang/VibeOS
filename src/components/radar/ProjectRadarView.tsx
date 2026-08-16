import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { ProjectItem, ProjectStage } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
import {
  LayoutGrid,
  List,
  Radar,
  Filter,
  Plus,
  ArrowUpDown,
  Search,
  Sparkles,
  ExternalLink,
  Flame,
} from 'lucide-react';

export const ProjectRadarView: React.FC = () => {
  const {
    projects,
    searchQuery,
    stageFilter,
    setStageFilter,
    selectedProjectId,
    setSelectedProjectId,
    setIsNewProjectOpen,
  } = useVibeStore();

  const [viewMode, setViewMode] = useState<'grid' | 'matrix' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'score' | 'activity' | 'potential' | 'activityDate' | 'name'>('score');

  // Filter projects by search query and stage
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStage = stageFilter === 'all' || p.stage === stageFilter;

    return matchesSearch && matchesStage;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'score') return b.score.total - a.score.total;
    if (sortBy === 'activity') return b.score.activity - a.score.activity;
    if (sortBy === 'potential') return b.score.potential - a.score.potential;
    if (sortBy === 'activityDate') return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime();
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const stagesList: { id: ProjectStage | 'all'; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'grow', label: 'Growing' },
    { id: 'experiment', label: 'Experiment' },
    { id: 'maintain', label: 'Maintain' },
    { id: 'prototype', label: 'Prototype' },
    { id: 'dormant', label: 'Dormant' },
    { id: 'archived', label: 'Archived' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Radar className="w-5 h-5" />
            <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
              Project Radar
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time multi-dimensional portfolio scanner & lifecycle manager
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Buttons */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'matrix'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span>2D Matrix</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setIsNewProjectOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        {/* Stage Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 text-xs font-mono">
          {stagesList.map((st) => {
            const isSelected = stageFilter === st.id;
            const count =
              st.id === 'all'
                ? projects.length
                : projects.filter((p) => p.stage === st.id).length;

            return (
              <button
                key={st.id}
                onClick={() => setStageFilter(st.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40 font-bold shadow-sm shadow-cyan-500/10'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <span>{st.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/80 text-slate-400">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400 font-mono">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="score">Total Score (High → Low)</option>
            <option value="activity">Activity Momentum</option>
            <option value="potential">Market Potential</option>
            <option value="activityDate">Recent Commit Date</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Main View Display */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProjectId(project.id)}
            />
          ))}

          {sortedProjects.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
              <p className="text-slate-400 text-sm">No projects found matching the criteria.</p>
              <button
                onClick={() => setStageFilter('all')}
                className="text-xs text-cyan-400 font-mono underline hover:text-cyan-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2D Matrix View */}
      {viewMode === 'matrix' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                2D Portfolio Opportunity Matrix
              </h3>
              <p className="text-xs text-slate-400">
                X-Axis: Activity & Momentum | Y-Axis: Market Potential & Scope
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Click any project dot to inspect
            </div>
          </div>

          {/* 4 Quadrants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative min-h-[480px]">
            {/* Quadrant 1: High Potential + Low Activity (Hidden Gems / Need Push) */}
            <div className="p-5 rounded-2xl bg-amber-950/10 border border-amber-500/20 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  💎 Hidden Gems (High Potential / Low Momentum)
                </span>
                <span className="text-[11px] text-slate-400">Needs Focus Push</span>
              </div>

              <div className="flex flex-wrap gap-2.5 py-4">
                {projects
                  .filter((p) => p.score.potential >= 75 && p.score.activity < 75 && p.status === 'active')
                  .map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-left hover:border-amber-400 hover:scale-105 transition-all shadow-md"
                    >
                      <span className="font-bold text-xs text-white font-mono block">
                        {proj.name}
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono">
                        Pot: {proj.score.potential} | Act: {proj.score.activity}
                      </span>
                    </button>
                  ))}
              </div>
              <p className="text-[11px] text-slate-500 italic">High payoff if given dedicated weekend sprint.</p>
            </div>

            {/* Quadrant 2: High Potential + High Activity (Growth Engines) */}
            <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/30 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  🚀 Growth Engines (High Potential / High Momentum)
                </span>
                <span className="text-[11px] text-emerald-400">Scale & Launch</span>
              </div>

              <div className="flex flex-wrap gap-2.5 py-4">
                {projects
                  .filter((p) => p.score.potential >= 75 && p.score.activity >= 75 && p.status === 'active')
                  .map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-left hover:border-emerald-400 hover:scale-105 transition-all shadow-md"
                    >
                      <span className="font-bold text-xs text-emerald-300 font-mono block">
                        {proj.name}
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono">
                        Score: {proj.score.total}/100
                      </span>
                    </button>
                  ))}
              </div>
              <p className="text-[11px] text-emerald-400/80 italic font-medium">
                Primary revenue & portfolio flagship candidates.
              </p>
            </div>

            {/* Quadrant 3: Low Potential + Low Activity (Dormant & Graveyard Candidates) */}
            <div className="p-5 rounded-2xl bg-rose-950/10 border border-rose-500/20 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                  ⚰️ Graveyard Vault (Low Potential / Low Momentum)
                </span>
                <span className="text-[11px] text-slate-400">Mine Assets & Archive</span>
              </div>

              <div className="flex flex-wrap gap-2.5 py-4">
                {projects
                  .filter((p) => p.score.potential < 75 && p.score.activity < 70)
                  .map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-rose-500/30 text-left hover:border-rose-400 hover:scale-105 transition-all shadow-md"
                    >
                      <span className="font-bold text-xs text-slate-300 font-mono block">
                        {proj.name}
                      </span>
                      <span className="text-[10px] text-rose-300 font-mono">
                        {proj.status === 'graveyard' ? 'Archived' : 'Stagnant'}
                      </span>
                    </button>
                  ))}
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Extract reusable components to avoid sunk cost fallacy.
              </p>
            </div>

            {/* Quadrant 4: Low Potential + High Activity (Quick Hacks & Tooling) */}
            <div className="p-5 rounded-2xl bg-cyan-950/10 border border-cyan-500/20 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  ⚡ Quick Hacks & Prototypes (High Momentum / Tactical)
                </span>
                <span className="text-[11px] text-slate-400">Fast Proofs</span>
              </div>

              <div className="flex flex-wrap gap-2.5 py-4">
                {projects
                  .filter((p) => p.score.potential < 75 && p.score.activity >= 70 && p.status === 'active')
                  .map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-left hover:border-cyan-400 hover:scale-105 transition-all shadow-md"
                    >
                      <span className="font-bold text-xs text-white font-mono block">
                        {proj.name}
                      </span>
                      <span className="text-[10px] text-cyan-300 font-mono">
                        Act: {proj.score.activity}
                      </span>
                    </button>
                  ))}
              </div>
              <p className="text-[11px] text-slate-500 italic">Keep light; validate before expanding.</p>
            </div>
          </div>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Total Score</th>
                <th className="p-4">Activity</th>
                <th className="p-4">Potential</th>
                <th className="p-4">Next Action</th>
                <th className="p-4">Last Activity</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {sortedProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className="hover:bg-cyan-500/5 transition-colors cursor-pointer"
                >
                  <td className="p-4 font-mono font-bold text-white text-sm">
                    {p.name}
                  </td>
                  <td className="p-4">
                    <StageBadge stage={p.stage} size="sm" />
                  </td>
                  <td className="p-4">
                    <ScoreBadge score={p.score.total} size="sm" />
                  </td>
                  <td className="p-4 font-mono text-emerald-400">{p.score.activity}</td>
                  <td className="p-4 font-mono text-cyan-400">{p.score.potential}</td>
                  <td className="p-4 max-w-xs truncate text-slate-300">{p.nextAction}</td>
                  <td className="p-4 font-mono text-slate-400">{p.lastActivityAt}</td>
                  <td className="p-4 text-right font-mono text-cyan-400 hover:underline">
                    Inspect
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
};
