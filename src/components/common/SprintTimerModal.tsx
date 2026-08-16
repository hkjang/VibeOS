import React, { useState, useEffect, useRef } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SprintTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SprintTimerModal: React.FC<SprintTimerModalProps> = ({ isOpen, onClose }) => {
  const { projects, updateProject, showToast } = useVibeStore();
  const { t, language } = useTranslation();

  const activeProjects = projects.filter((p) => p.status === 'active');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(activeProjects[0]?.id || '');
  const [durationMin, setDurationMin] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const selectedProj = projects.find((p) => p.id === selectedProjectId) || activeProjects[0];

  useEffect(() => {
    setTimeLeft(durationMin * 60);
    setIsRunning(false);
  }, [durationMin, selectedProjectId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      handleSprintComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSprintComplete = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    if (selectedProj) {
      const newAct = Math.min(100, selectedProj.score.activity + 8);
      const newTotal = Math.round(
        newAct * 0.35 +
          selectedProj.score.potential * 0.3 +
          selectedProj.score.reuse * 0.2 +
          selectedProj.score.maintainability * 0.15
      );

      updateProject(selectedProj.id, {
        score: {
          ...selectedProj.score,
          activity: newAct,
          total: newTotal,
        },
      });

      showToast(
        `Sprint Complete! +8 Momentum added to "${selectedProj.name}"`,
        'success'
      );
    }
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((durationMin * 60 - timeLeft) / (durationMin * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col p-6 space-y-6 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Timer className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white font-mono">
              Vibe Focus Sprint Mode
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-400">Sprint Target Project:</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500"
          >
            {activeProjects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.stage}) — {p.nextAction}
              </option>
            ))}
          </select>
        </div>

        {/* Duration selector */}
        <div className="flex items-center justify-center gap-2 font-mono text-xs">
          {[15, 25, 50].map((m) => (
            <button
              key={m}
              onClick={() => setDurationMin(m)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                durationMin === m
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {m} Min
            </button>
          ))}
        </div>

        {/* Circular Countdown Progress Display */}
        <div className="flex flex-col items-center justify-center py-4 relative">
          <div className="w-48 h-48 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950 to-slate-900 shadow-inner">
            <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-cyan-400 font-mono mt-1">
              {isRunning ? '🔥 Deep Work in Progress' : 'Ready to Sprint'}
            </span>
          </div>
        </div>

        {/* Next Action Prompt */}
        {selectedProj && (
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
            <span className="text-slate-400 font-mono block text-[10px] uppercase">
              Current Next Action:
            </span>
            <p className="text-slate-200 font-medium">{selectedProj.nextAction}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-xs font-mono shadow-lg transition-all ${
              isRunning
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause Sprint' : 'Start Focus Sprint'}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(durationMin * 60);
            }}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
