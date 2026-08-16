import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProjectItem, ProjectStage } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
import { CosmicProjectGalaxy } from '../visual/CosmicProjectGalaxy';
import {
  LayoutGrid,
  List,
  Radar,
  Sparkles,
  Plus,
  ArrowUpDown,
  Orbit,
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

  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState<'grid' | 'matrix' | 'cosmos' | 'table'>('grid');
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
    { id: 'all', label: t.radar.allProjects },
    { id: 'grow', label: t.radar.growing },
    { id: 'experiment', label: t.radar.experiment },
    { id: 'maintain', label: t.radar.maintain },
    { id: 'prototype', label: t.radar.prototype },
    { id: 'dormant', label: t.radar.dormant },
    { id: 'archived', label: t.radar.archived },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 animate-fadeIn pb-12">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Radar className="w-4 h-4 sm:w-5 sm:h-5" />
            <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {t.radar.title}
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 mt-0.5 sm:mt-1">
            {t.radar.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Buttons */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">{t.radar.viewGrid}</span>
            </button>

            <button
              onClick={() => setViewMode('cosmos')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all ${
                viewMode === 'cosmos'
                  ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span className="text-[11px] sm:text-xs">{t.radar.viewCosmos || 'Cosmos'}</span>
            </button>

            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all ${
                viewMode === 'matrix'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">{t.radar.viewMatrix}</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">{t.radar.viewTable}</span>
            </button>
          </div>

          <button
            onClick={() => setIsNewProjectOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">{t.radar.addProject}</span>
          </button>
        </div>
      </div>

      {/* Filter & Sort Bar (Hidden in Cosmos mode for clean immersion, or available) */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
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
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 border text-xs ${
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
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">{t.radar.sortBy}:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-xl px-2.5 sm:px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-mono w-full sm:w-auto"
          >
            <option value="score">{t.radar.sortScore}</option>
            <option value="activity">{t.radar.sortActivity}</option>
            <option value="potential">{t.radar.sortPotential}</option>
            <option value="activityDate">{t.radar.sortDate}</option>
            <option value="name">{t.radar.sortName}</option>
          </select>
        </div>
      </div>

      {/* View Mode 1: Cosmic Galaxy Visual Metaphor */}
      {viewMode === 'cosmos' && (
        <CosmicProjectGalaxy
          projects={filteredProjects}
          onSelectProject={(id) => setSelectedProjectId(id)}
        />
      )}

      {/* View Mode 2: Card Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProjectId(project.id)}
            />
          ))}

          {sortedProjects.length === 0 && (
            <div className="col-span-full p-8 sm:p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
              <p className="text-slate-400 text-xs sm:text-sm">{t.radar.emptyProjects}</p>
              <button
                onClick={() => setStageFilter('all')}
                className="text-xs text-cyan-400 font-mono underline hover:text-cyan-300"
              >
                {t.radar.clearFilter}
              </button>
            </div>
          )}
        </div>
      )}

      {/* View Mode 3: 2D Matrix View */}
      {viewMode === 'matrix' && (
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-mono">
                {t.radar.opportunityMatrixTitle}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                {t.radar.opportunityMatrixSub}
              </p>
            </div>
          </div>

          {/* 4 Quadrants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative min-h-[400px]">
            {/* Quadrant 1: Hidden Gems */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/10 border border-amber-500/20 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  {t.radar.quadrantGemTitle}
                </span>
                <span className="text-[10px] text-slate-400">{t.radar.quadrantGemSub}</span>
              </div>

              <div className="flex flex-wrap gap-2 py-2">
                {projects
                  .filter((p) => p.score.potential >= 75 && p.score.activity < 75 && p.status === 'active')
                  .map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-left hover:border-amber-400 hover:scale-105 transition-all shadow-md"
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
              <p className="text-[10px] sm:text-[11px] text-slate-500 italic">{t.radar.quadrantGemNote}</p>
            </div>

            {/* Quadrant 2: Growth Engines */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/30 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  {t.radar.quadrantGrowthTitle}
                </span>
                <span className="text-[10px] text-emerald-400">{t.radar.quadrantGrowthSub}</span>
              </div>

              <div className="flex flex-wrap gap-2 py-2">
                {projects
                  .filter((p) => p.score.potential >= 75 && p.score.activity >= 75 && p.status === 'active')
                  .map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-left hover:border-emerald-400 hover:scale-105 transition-all shadow-md"
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
              <p className="text-[10px] sm:text-[11px] text-emerald-400/80 italic font-medium">
                {t.radar.quadrantGrowthNote}
              </p>
            </div>

            {/* Quadrant 3: Graveyard Vault */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/10 border border-rose-500/20 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                  {t.radar.quadrantGraveyardTitle}
                </span>
                <span className="text-[10px] text-slate-400">{t.radar.quadrantGraveyardSub}</span>
              </div>

              <div className="flex flex-wrap gap-2 py-2">
                {projects
                  .filter((p) => p.score.potential < 75 && p.score.activity < 70)
                  .map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-rose-500/30 text-left hover:border-rose-400 hover:scale-105 transition-all shadow-md"
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
              <p className="text-[10px] sm:text-[11px] text-slate-500 italic">
                {t.radar.quadrantGraveyardNote}
              </p>
            </div>

            {/* Quadrant 4: Quick Hacks */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/10 border border-cyan-500/20 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  {t.radar.quadrantHackTitle}
                </span>
                <span className="text-[10px] text-slate-400">{t.radar.quadrantHackSub}</span>
              </div>

              <div className="flex flex-wrap gap-2 py-2">
                {projects
                  .filter((p) => p.score.potential < 75 && p.score.activity >= 70 && p.status === 'active')
                  .map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-left hover:border-cyan-400 hover:scale-105 transition-all shadow-md"
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
              <p className="text-[10px] sm:text-[11px] text-slate-500 italic">{t.radar.quadrantHackNote}</p>
            </div>
          </div>
        </div>
      )}

      {/* View Mode 4: Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-left text-xs text-slate-300 min-w-[640px]">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5 sm:p-4">Project</th>
                <th className="p-3.5 sm:p-4">Stage</th>
                <th className="p-3.5 sm:p-4">Score</th>
                <th className="p-3.5 sm:p-4">Activity</th>
                <th className="p-3.5 sm:p-4">Potential</th>
                <th className="p-3.5 sm:p-4">{t.radar.nextAction}</th>
                <th className="p-3.5 sm:p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {sortedProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className="hover:bg-cyan-500/5 transition-colors cursor-pointer"
                >
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-white text-xs sm:text-sm">
                    {p.name}
                  </td>
                  <td className="p-3.5 sm:p-4">
                    <StageBadge stage={p.stage} size="sm" />
                  </td>
                  <td className="p-3.5 sm:p-4">
                    <ScoreBadge score={p.score.total} size="sm" />
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono text-emerald-400">{p.score.activity}</td>
                  <td className="p-3.5 sm:p-4 font-mono text-cyan-400">{p.score.potential}</td>
                  <td className="p-3.5 sm:p-4 max-w-xs truncate text-slate-300">{p.nextAction}</td>
                  <td className="p-3.5 sm:p-4 text-right font-mono text-cyan-400 hover:underline">
                    {t.radar.inspect}
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
