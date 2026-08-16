import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProjectItem } from '../../types/project';
import {
  Archive,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Clock,
  ChevronDown,
  ChevronUp,
  Cpu,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GraveyardView: React.FC = () => {
  const { projects, resuscitateProject } = useVibeStore();
  const { t } = useTranslation();
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
    <div className="space-y-5 sm:space-y-6 animate-fadeIn pb-12">
      {/* Memorial Header */}
      <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <Archive className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest font-bold">
              Project Graveyard & Memorial Vault
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.graveyard.title}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {t.graveyard.subtitle}
          </p>
        </div>
      </div>

      {/* Assetization Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 font-mono uppercase">
              {t.graveyard.repositories}
            </span>
            <Archive className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {graveyardProjects.length}
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500">Zero deleted code; all cataloged</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 font-mono uppercase">
              {t.graveyard.salvaged}
            </span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {totalHarvestedAssets}
          </div>
          <p className="text-[10px] sm:text-xs text-violet-400">Extracted and ready for new projects</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 font-mono uppercase">
              {t.graveyard.hoursRescued}
            </span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            ~{totalHoursRescued} hrs
          </div>
          <p className="text-[10px] sm:text-xs text-cyan-400">Compound engineering knowledge retained</p>
        </div>
      </div>

      {/* Post-Mortem Cards List */}
      <div className="space-y-3.5 sm:space-y-4">
        <h2 className="text-xs sm:text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
          {t.graveyard.casesTitle}
        </h2>

        {graveyardProjects.map((project) => {
          const pm = project.postMortem;
          const isExpanded = expandedId === project.id;

          return (
            <div
              key={project.id}
              className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-rose-500/30 transition-all space-y-3.5 sm:space-y-4 shadow-lg"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-white font-mono">
                      {project.name}
                    </span>
                    <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono uppercase">
                      {project.stage}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Stopped: {pm?.stoppedDate || project.lastActivityAt}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{project.description}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => handleResuscitate(project)}
                    className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t.graveyard.resuscitate}
                  </button>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Post-Mortem Callout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-1 sm:space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 font-mono font-bold uppercase text-[10px] sm:text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {t.graveyard.rootCause}
                  </div>
                  <p className="text-rose-200/90 font-medium leading-relaxed text-xs">
                    {pm?.failedReason || 'Development discontinued.'}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 space-y-1 sm:space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-mono font-bold uppercase text-[10px] sm:text-[11px]">
                    <Lightbulb className="w-3.5 h-3.5" />
                    {t.graveyard.lessonLearned}
                  </div>
                  <p className="text-amber-200/90 font-medium leading-relaxed text-xs">
                    {pm?.keyLearning || 'Extract reusable patterns early.'}
                  </p>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="pt-3 sm:pt-4 border-t border-slate-800 space-y-3 sm:space-y-4 animate-fadeIn">
                  {/* Detailed Analysis */}
                  {pm?.detailedAnalysis && (
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                        {t.graveyard.deepAnalysis}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
                        {pm.detailedAnalysis}
                      </p>
                    </div>
                  )}

                  {/* Harvested Assets Salvaged */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                      {t.graveyard.salvagedModules}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pm?.extractedAssets && pm.extractedAssets.length > 0 ? (
                        pm.extractedAssets.map((assetName) => (
                          <span
                            key={assetName}
                            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-violet-500/10 text-violet-300 text-xs font-mono border border-violet-500/20 flex items-center gap-1.5"
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
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-xs flex items-start gap-2.5">
                      <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-cyan-300 font-bold">
                          {t.graveyard.revivalTrigger}:
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
          <div className="p-8 sm:p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-400 text-xs sm:text-sm space-y-2">
            <Archive className="w-8 h-8 mx-auto text-slate-600" />
            <p>{t.graveyard.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
};
