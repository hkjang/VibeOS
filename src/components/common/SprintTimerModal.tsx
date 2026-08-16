import React, { useState, useEffect, useRef } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
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
  Headphones,
  Maximize2,
  Minimize2,
  Target,
  FileEdit,
  Save,
  Radio,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SprintTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SoundscapeType = 'off' | 'rain' | 'drone' | 'lofi' | 'alpha';

export const SprintTimerModal: React.FC<SprintTimerModalProps> = ({ isOpen, onClose }) => {
  const { projects, updateProject, showToast } = useVibeStore();
  const { language } = useTranslation();

  const activeProjects = projects.filter((p) => p.status === 'active');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(activeProjects[0]?.id || '');
  const [durationMin, setDurationMin] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundscape, setSoundscape] = useState<SoundscapeType>('off');
  const [scratchpadNote, setScratchpadNote] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const selectedProj = projects.find((p) => p.id === selectedProjectId) || activeProjects[0];

  // Web Audio procedural sound generator ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundNodesRef = useRef<{ source?: any; gain?: GainNode; filter?: BiquadFilterNode; osc1?: OscillatorNode; osc2?: OscillatorNode } | null>(null);

  // Stop procedural audio
  const stopAudio = () => {
    if (soundNodesRef.current) {
      try {
        if (soundNodesRef.current.osc1) soundNodesRef.current.osc1.stop();
        if (soundNodesRef.current.osc2) soundNodesRef.current.osc2.stop();
        if (soundNodesRef.current.source) soundNodesRef.current.source.stop();
      } catch {}
      soundNodesRef.current = null;
    }
  };

  // Play procedural soundscape
  const startSoundscape = (type: SoundscapeType) => {
    stopAudio();
    if (type === 'off') return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'rain') {
        // Procedural brown/pink noise rain
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        const gain = ctx.createGain();
        gain.gain.value = 0.15;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start();

        soundNodesRef.current = { source, gain, filter };
      } else if (type === 'drone') {
        // Deep Space resonant drone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.value = 55; // A1
        osc2.type = 'sine';
        osc2.frequency.value = 110; // A2

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 240;

        gain.gain.value = 0.08;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        soundNodesRef.current = { osc1, osc2, gain, filter };
      } else if (type === 'alpha') {
        // 10Hz Binaural Beats (200Hz + 210Hz)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.value = 200;
        osc2.type = 'sine';
        osc2.frequency.value = 210;

        gain.gain.value = 0.05;

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        soundNodesRef.current = { osc1, osc2, gain };
      } else if (type === 'lofi') {
        // Lo-Fi pulsing pad
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc1.frequency.value = 174.61; // F3
        osc2.type = 'sine';
        osc2.frequency.value = 220.00; // A3

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 350;

        gain.gain.value = 0.06;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        soundNodesRef.current = { osc1, osc2, gain, filter };
      }
    } catch (e) {
      console.warn('Audio synthesis note:', e);
    }
  };

  useEffect(() => {
    startSoundscape(soundscape);
    return () => stopAudio();
  }, [soundscape]);

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
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
    soundEngine.playAiSuccess();

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
        `Deep Work Sprint Complete! +8 Momentum added to "${selectedProj.name}" 🚀`,
        'success'
      );
    }
  };

  const handleSaveNote = () => {
    if (!scratchpadNote.trim()) return;
    soundEngine.playClick();
    showToast(`Sprint log saved: "${scratchpadNote}"`, 'info');
    setScratchpadNote('');
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((durationMin * 60 - timeLeft) / (durationMin * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen ? 'max-w-4xl p-8 space-y-6' : 'max-w-xl p-5 sm:p-6 space-y-5'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Timer className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-mono">
                {language === 'ko' ? '딥 워크 & 사운드스케이프 젠 터미널' : 'Deep Work & Ambient Zen Terminal'}
              </h2>
              <span className="text-[10px] font-mono text-slate-400">Distraction-Free Flow State Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Focus Project Selector & Next Goal Pin */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              {language === 'ko' ? '스프린트 집중 대상:' : 'Sprint Target Repository:'}
            </span>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs font-mono px-3 py-1 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 max-w-[200px]"
            >
              {activeProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.score.total} pts)
                </option>
              ))}
            </select>
          </div>

          {selectedProj && (
            <div className="text-xs font-mono text-cyan-300 bg-cyan-950/20 px-3 py-1.5 rounded-xl border border-cyan-500/20 truncate">
              <span className="text-slate-500 text-[10px] uppercase font-bold mr-1.5">Sprint Goal:</span>
              <span>{selectedProj.nextAction}</span>
            </div>
          )}
        </div>

        {/* Circular / Large Timer Display */}
        <div className="flex flex-col items-center justify-center py-2 relative">
          {/* Progress ring background */}
          <div className="text-5xl sm:text-7xl font-extrabold text-white font-mono tracking-tight drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          {/* Progress bar line */}
          <div className="w-full max-w-xs h-1.5 rounded-full bg-slate-800 mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Duration Presets */}
          <div className="flex items-center gap-2 mt-4">
            {[
              { min: 25, label: '25m Pomodoro' },
              { min: 50, label: '50m Deep Flow' },
              { min: 90, label: '90m Ultradian' },
            ].map((p) => (
              <button
                key={p.min}
                onClick={() => {
                  soundEngine.playClick();
                  setDurationMin(p.min);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                  durationMin === p.min
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Procedural Ambient Soundscape Selector */}
        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300 font-bold">
              <Headphones className="w-3.5 h-3.5 text-violet-400" />
              {language === 'ko' ? '생성형 앰비언트 사운드스케이프' : 'Generative Ambient Soundscape'}
            </span>
            <span className="text-[10px] text-slate-500">100% In-Browser Web Audio Synthesizer</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-[10px] font-mono">
            {[
              { id: 'off', label: '🔇 Off' },
              { id: 'rain', label: '🌧️ Rain' },
              { id: 'drone', label: '🚀 Drone' },
              { id: 'lofi', label: '🎧 Lo-Fi' },
              { id: 'alpha', label: '🧠 Alpha 10Hz' },
            ].map((snd) => (
              <button
                key={snd.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSoundscape(snd.id as SoundscapeType);
                }}
                className={`py-1.5 px-1 rounded-xl text-center transition-all ${
                  soundscape === snd.id
                    ? 'bg-violet-500/20 text-violet-300 font-bold border border-violet-500/40 shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Scratchpad / Commit Logger */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <FileEdit className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={scratchpadNote}
              onChange={(e) => setScratchpadNote(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
              placeholder={language === 'ko' ? '스프린트 중 빠른 메모/로그 기록... (Enter로 저장)' : 'Quick session log note... (Press Enter)'}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            onClick={handleSaveNote}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-colors"
            title="Save Log"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <button
            onClick={() => {
              soundEngine.playClick();
              setTimeLeft(durationMin * 60);
              setIsRunning(false);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ko' ? '초기화' : 'Reset'}</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setIsRunning((prev) => !prev);
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-mono font-bold text-xs shadow-lg transition-all ${
              isRunning
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>{language === 'ko' ? '일시 정지' : 'Pause Flow'}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{language === 'ko' ? '딥 워크 시작' : 'Enter Flow State'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
