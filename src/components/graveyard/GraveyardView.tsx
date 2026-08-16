import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { ProjectItem } from '../../types/project';
import {
  Archive,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GraveyardView: React.FC = () => {
  const { projects, resuscitateProject, setSelectedProjectId, showToast } = useVibeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const graveyardProjects = projects.filter((p) => p.status === 'graveyard');

  const totalHoursRescued = graveyardProjects.reduce(
    (acc, p) => acc + (p.postMortem?.totalHoursInvested || 30),
    0
  );

  const totalHarvestedAssets = graveyardProjects.reduce(
    (acc, p) => acc + (p.postMortem?.extractedAssets.length || 0),
    0
  );

  const handleResuscitate = (project: ProjectItem) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    resuscitateProject(project.id);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Memorial Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <Archive className="w-5 h-5" />
            <span className="text-xs uppercase font-mono tracking-widest font-bold">
              Project Graveyard & Memorial Vault
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            The Graveyard of Side Projects
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            Dead projects are not wasted time. In VibeOS, every discontinued repository is preserved
            with deep post-mortem analysis and converted into modular building blocks for your future products.
          </p>
        </div>
      </div>

      {/* Assetization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-mono uppercase">
              Archived Repositories
            </span>
            <Archive className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {graveyardProjects.length}
          </div>
          <p className="text-xs text-slate-500">Zero deleted code; all cataloged</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-mono uppercase">
              Salvaged Reusable Assets
            </span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {totalHarvestedAssets}
          </div>
          <p className="text-xs text-violet-400">Extracted and ready for new projects</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 font-mono uppercase">
              Development Hours Rescued
            </span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            ~{totalHoursRescued} hrs
          </div>
          <p className="text-xs text-cyan-400">Compound engineering knowledge retained</p>
        </div>
      </div>

      {/* Post-Mortem Cards List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
          Memorial Case Studies & Post-Mortems
        </h2>

        {graveyardProjects.map((project) => {
          const pm = project.postMortem;
          const isExpanded = expandedId === project.id;

          return (
            <div
              key={project.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-rose-500/30 transition-all space-y-4 shadow-lg"
            >
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg font-bold text-white font-mono">
                      {project.name}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono uppercase">
                      {project.stage}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Stopped: {pm?.stoppedDate || project.lastActivityAt}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{project.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResuscitate(project)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Resuscitate
                  </button>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Post-Mortem Callout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 font-mono font-bold uppercase text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Failure / Stagnation Root Cause
                  </div>
                  <p className="text-rose-200/90 font-medium leading-relaxed">
                    {pm?.failedReason || 'Development discontinued.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-mono font-bold uppercase text-[11px]">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Core Lesson Learned
                  </div>
                  <p className="text-amber-200/90 font-medium leading-relaxed">
                    {pm?.keyLearning || 'Extract reusable patterns early.'}
                  </p>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
                  {/* Detailed Analysis */}
                  {pm?.detailedAnalysis && (
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                        Deep Post-Mortem Breakdown
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        {pm.detailedAnalysis}
                      </p>
                    </div>
                  )}

                  {/* Harvested Assets Salvaged */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                      Harvested Components Salvaged
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pm?.extractedAssets && pm.extractedAssets.length > 0 ? (
                        pm.extractedAssets.map((assetName) => (
                          <span
                            key={assetName}
                            className="px-3 py-1.5 rounded-xl bg-violet-500/10 text-violet-300 text-xs font-mono border border-violet-500/20 flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                            {assetName}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500 font-mono">
                          No distinct modules extracted.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Revival Condition */}
                  {pm?.revivalTrigger && (
                    <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-xs flex items-start gap-2.5">
                      <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-cyan-300 font-bold">
                          Future Resurrection Trigger:
                        </span>
                        <p className="text-slate-300 mt-0.5">{pm.revivalTrigger}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {graveyardProjects.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-400 text-sm space-y-2">
            <Archive className="w-8 h-8 mx-auto text-slate-600" />
            <p>Your Graveyard is empty. All projects are currently in active development!</p>
          </div>
        )}
      </div>
    </div>
  );
};
