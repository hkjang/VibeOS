import React, { useState } from 'react';
import { ProjectItem } from '../../types/project';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ScoreBadge } from '../common/ScoreBadge';
import { StageBadge } from '../common/StageBadge';
import { openInEditor } from '../../utils/editorLauncher';
import {
  X,
  Scale,
  Sparkles,
  ArrowRight,
  GitCommit,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface ProjectCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCompareModal: React.FC<ProjectCompareModalProps> = ({ isOpen, onClose }) => {
  const { projects } = useVibeStore();
  const { language } = useTranslation();

  const [projAId, setProjAId] = useState<string>(projects[0]?.id || '');
  const [projBId, setProjBId] = useState<string>(projects[1]?.id || '');

  if (!isOpen) return null;

  const projA = projects.find((p) => p.id === projAId) || projects[0];
  const projB = projects.find((p) => p.id === projBId) || projects[1];

  const sharedStacks = projA.stack.filter((s) => projB.stack.includes(s));
  const diffStacksA = projA.stack.filter((s) => !projB.stack.includes(s));
  const diffStacksB = projB.stack.filter((s) => !projA.stack.includes(s));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Scale className="w-5 h-5" />
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              Project 1:1 Comparison & Synergy Arena
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Selectors */}
        <div className="p-4 sm:p-6 bg-slate-900/60 border-b border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-cyan-400 font-bold">Select Project A:</label>
            <select
              value={projAId}
              onChange={(e) => setProjAId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.stage}) — {p.score.total} pts
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-violet-400 font-bold">Select Project B:</label>
            <select
              value={projBId}
              onChange={(e) => setProjBId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-violet-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.stage}) — {p.score.total} pts
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Side-by-side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project A Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white font-mono">{projA.name}</span>
                <ScoreBadge score={projA.score.total} size="sm" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{projA.description}</p>
              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-cyan-500/20 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Activity Momentum:</span>
                  <span className="text-emerald-400 font-bold">{projA.score.activity}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Market Potential:</span>
                  <span className="text-cyan-400 font-bold">{projA.score.potential}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Code Reusability:</span>
                  <span className="text-violet-400 font-bold">{projA.score.reuse}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weekly Commits:</span>
                  <span className="text-white">{projA.dna.commitVelocityWeekly} commits/wk</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <StageBadge stage={projA.stage} size="sm" />
                <button
                  onClick={() => openInEditor(projA.name, 'vscode')}
                  className="text-[11px] text-cyan-400 hover:underline font-mono"
                >
                  Open VS Code ➔
                </button>
              </div>
            </div>

            {/* Project B Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-violet-950/20 border border-violet-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white font-mono">{projB.name}</span>
                <ScoreBadge score={projB.score.total} size="sm" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{projB.description}</p>
              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-violet-500/20 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Activity Momentum:</span>
                  <span className="text-emerald-400 font-bold">{projB.score.activity}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Market Potential:</span>
                  <span className="text-cyan-400 font-bold">{projB.score.potential}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Code Reusability:</span>
                  <span className="text-violet-400 font-bold">{projB.score.reuse}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weekly Commits:</span>
                  <span className="text-white">{projB.dna.commitVelocityWeekly} commits/wk</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <StageBadge stage={projB.stage} size="sm" />
                <button
                  onClick={() => openInEditor(projB.name, 'vscode')}
                  className="text-[11px] text-violet-400 hover:underline font-mono"
                >
                  Open VS Code ➔
                </button>
              </div>
            </div>
          </div>

          {/* Tech Stack Overlap & Synergy Analysis */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Cross-Project Synergy & Stack Overlap</span>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-slate-500 block text-[11px]">Shared Tech Stacks:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {sharedStacks.length > 0 ? (
                    sharedStacks.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      >
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">No direct stack overlap</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-cyan-400 text-[11px] block font-bold">{projA.name} Unique:</span>
                  <span className="text-slate-300">{diffStacksA.join(', ') || 'None'}</span>
                </div>
                <div>
                  <span className="text-violet-400 text-[11px] block font-bold">{projB.name} Unique:</span>
                  <span className="text-slate-300">{diffStacksB.join(', ') || 'None'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
          >
            Close Arena
          </button>
        </div>
      </div>
    </div>
  );
};
