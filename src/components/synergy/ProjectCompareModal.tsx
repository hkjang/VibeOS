import React, { useState } from 'react';
import { ProjectItem } from '../../types/project';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ScoreBadge } from '../common/ScoreBadge';
import { StageBadge } from '../common/StageBadge';
import { openInEditor } from '../../utils/editorLauncher';
import { soundEngine } from '../../utils/soundEngine';
import {
  X,
  Scale,
  Sparkles,
  ArrowRight,
  GitCommit,
  CheckCircle2,
  ExternalLink,
  Code2,
  Layers,
  Zap,
  Plus,
} from 'lucide-react';

interface ProjectCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCompareModal: React.FC<ProjectCompareModalProps> = ({ isOpen, onClose }) => {
  const { projects, addIdea, showToast } = useVibeStore();
  const { language } = useTranslation();

  const [projAId, setProjAId] = useState<string>(projects[0]?.id || '');
  const [projBId, setProjBId] = useState<string>(projects[1]?.id || '');

  if (!isOpen) return null;

  const projA = projects.find((p) => p.id === projAId) || projects[0];
  const projB = projects.find((p) => p.id === projBId) || projects[1];

  const sharedStacks = projA.stack.filter((s) => projB.stack.includes(s));
  const diffStacksA = projA.stack.filter((s) => !projB.stack.includes(s));
  const diffStacksB = projB.stack.filter((s) => !projA.stack.includes(s));

  // Compute 4D radar coordinates (Activity, Potential, Reuse, Maintainability)
  // Center (120, 120), Radius 80
  const cx = 120;
  const cy = 120;
  const r = 80;

  const getCoordinates = (scores: { activity: number; potential: number; reuse: number; maintainability: number }) => {
    // Top: Activity (0 deg / -90 in svg)
    // Right: Potential (90 deg)
    // Bottom: Reuse (180 deg)
    // Left: Maintainability (270 deg)
    const pActivity = [cx, cy - (scores.activity / 100) * r];
    const pPotential = [cx + (scores.potential / 100) * r, cy];
    const pReuse = [cx, cy + (scores.reuse / 100) * r];
    const pMaintain = [cx - (scores.maintainability / 100) * r, cy];

    return `${pActivity[0]},${pActivity[1]} ${pPotential[0]},${pPotential[1]} ${pReuse[0]},${pReuse[1]} ${pMaintain[0]},${pMaintain[1]}`;
  };

  const polyA = getCoordinates(projA.score);
  const polyB = getCoordinates(projB.score);

  const handleSynthesizeFusion = () => {
    soundEngine.playAiSuccess();
    const fusionTitle = `${projA.name} × ${projB.name} Fusion Engine`;
    const fusionDesc = `Automated fusion combining ${projA.name}'s architecture (${projA.dna.architecture}) with ${projB.name}'s capabilities. Unified stack: ${[...new Set([...projA.stack, ...projB.stack])].join(', ')}.`;

    addIdea(fusionTitle, fusionDesc, 'weekend', [...new Set([...projA.stack, ...projB.stack])]);

    showToast(`Created fusion idea: "${fusionTitle}" in Idea Backlog! 🚀`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] font-sans">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Scale className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-mono">
                {language === 'ko' ? '프로젝트 1:1 비교 & 4D 레이더 매칭 아레나' : 'Project 1:1 Comparison & 4D Radar Arena'}
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                {projects.length} Repositories Available for Head-to-Head Analysis
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Selectors */}
        <div className="p-4 sm:p-5 bg-slate-900/80 border-b border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Project A:
            </label>
            <select
              value={projAId}
              onChange={(e) => {
                soundEngine.playClick();
                setProjAId(e.target.value);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.stage}) — {p.score.total} pts
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-violet-400 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              Project B:
            </label>
            <select
              value={projBId}
              onChange={(e) => {
                soundEngine.playClick();
                setProjBId(e.target.value);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-violet-500 focus:outline-none"
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
          {/* Side-by-side Cards & 4D Radar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            {/* Project A Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white font-mono truncate">{projA.name}</span>
                <ScoreBadge score={projA.score.total} size="sm" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{projA.description}</p>
              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-cyan-500/20 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Stage:</span>
                  <StageBadge stage={projA.stage} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Activity Momentum:</span>
                  <span className="text-cyan-300 font-bold">{projA.score.activity} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Market Potential:</span>
                  <span className="text-cyan-300 font-bold">{projA.score.potential} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Architecture:</span>
                  <span className="text-white truncate max-w-[130px]">{projA.dna.architecture}</span>
                </div>
              </div>
            </div>

            {/* Center: 4D Radar SVG Comparison */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center space-y-2">
              <span className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                4-Dimensional Radar Comparison
              </span>

              <div className="relative w-[240px] h-[240px]">
                <svg viewBox="0 0 240 240" className="w-full h-full">
                  {/* Radar Circles */}
                  <circle cx={cx} cy={cy} r={r * 0.25} fill="none" stroke="#1E293B" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r={r * 0.5} fill="none" stroke="#1E293B" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r={r * 0.75} fill="none" stroke="#1E293B" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth="1" />

                  {/* Axes */}
                  <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Axis Labels */}
                  <text x={cx} y={cy - r - 6} fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    Activity
                  </text>
                  <text x={cx + r + 8} y={cy + 3} fill="#94A3B8" fontSize="9" textAnchor="start" fontFamily="monospace">
                    Potential
                  </text>
                  <text x={cx} y={cy + r + 14} fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    Reuse
                  </text>
                  <text x={cx - r - 8} y={cy + 3} fill="#94A3B8" fontSize="9" textAnchor="end" fontFamily="monospace">
                    Maintain
                  </text>

                  {/* Polygon A (Cyan) */}
                  <polygon points={polyA} fill="rgba(6, 182, 212, 0.25)" stroke="#06B6D4" strokeWidth="2" />

                  {/* Polygon B (Violet) */}
                  <polygon points={polyB} fill="rgba(139, 92, 246, 0.25)" stroke="#8B5CF6" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> {projA.name}
                </span>
                <span className="flex items-center gap-1 text-violet-400">
                  <span className="w-2 h-2 rounded-full bg-violet-400" /> {projB.name}
                </span>
              </div>
            </div>

            {/* Project B Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-violet-950/20 border border-violet-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white font-mono truncate">{projB.name}</span>
                <ScoreBadge score={projB.score.total} size="sm" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{projB.description}</p>
              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-violet-500/20 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Stage:</span>
                  <StageBadge stage={projB.stage} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Activity Momentum:</span>
                  <span className="text-violet-300 font-bold">{projB.score.activity} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Market Potential:</span>
                  <span className="text-violet-300 font-bold">{projB.score.potential} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Architecture:</span>
                  <span className="text-white truncate max-w-[130px]">{projB.dna.architecture}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Overlap & Differences */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Technology Stack Intersection & Delta
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1.5">
                <span className="text-cyan-400 font-bold block">{projA.name} Exclusive:</span>
                <div className="flex flex-wrap gap-1">
                  {diffStacksA.length ? (
                    diffStacksA.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 text-[11px]">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-[10px]">None</span>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
                <span className="text-emerald-400 font-bold block">Shared Ecosystem Core:</span>
                <div className="flex flex-wrap gap-1">
                  {sharedStacks.length ? (
                    sharedStacks.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-[11px]">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-[10px]">No stack overlap</span>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-violet-500/30 space-y-1.5">
                <span className="text-violet-400 font-bold block">{projB.name} Exclusive:</span>
                <div className="flex flex-wrap gap-1">
                  {diffStacksB.length ? (
                    diffStacksB.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-violet-950/40 text-violet-300 border border-violet-500/30 text-[11px]">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-[10px]">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400">
            Synthesize both projects into a unified next-generation engine
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openInEditor(projA.name, 'vscode')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-700 transition-colors"
            >
              Open {projA.name} in IDE
            </button>
            <button
              onClick={() => openInEditor(projB.name, 'vscode')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-700 transition-colors"
            >
              Open {projB.name} in IDE
            </button>
            <button
              onClick={handleSynthesizeFusion}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-xs font-mono hover:scale-[1.02] transition-all shadow-lg shadow-cyan-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Synthesize Fusion Concept</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
