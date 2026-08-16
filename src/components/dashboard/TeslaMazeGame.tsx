import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';
import {
  Zap,
  BatteryCharging,
  Compass,
  Sparkles,
  Trophy,
  RotateCcw,
  Play,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Radio,
  Gamepad2,
  Minimize2,
  Maximize2,
  ChevronRight as ArrowRight,
  X,
} from 'lucide-react';

// 13x13 Maze Layout (0 = Road, 1 = Neon Wall, 2 = Supercharger, 3 = Lego Core, 4 = Goal)
const MAZE_GRID = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 2, 1, 1, 1, 0, 1, 0, 1, 0, 1, 3, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

interface Position {
  r: number;
  c: number;
}

export const TeslaMazeGame: React.FC = () => {
  const { projects, showToast } = useVibeStore();
  const { language } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [carPos, setCarPos] = useState<Position>({ r: 1, c: 1 });
  const [carAngle, setCarAngle] = useState<number>(0);
  const [battery, setBattery] = useState<number>(100);
  const [speed, setSpeed] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isFsdActive, setIsFsdActive] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [collectedItems, setCollectedItems] = useState<Set<string>>(new Set());
  const [laserPath, setLaserPath] = useState<Position[]>([]);

  const autopilotTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BFS Pathfinding for Tesla FSD Autopilot
  const findPathToGoal = useCallback((start: Position, goal: Position): Position[] => {
    const queue: { pos: Position; path: Position[] }[] = [{ pos: start, path: [start] }];
    const visited = new Set<string>();
    visited.add(`${start.r},${start.c}`);

    const directions = [
      { r: 0, c: 1, angle: 0 },
      { r: 1, c: 0, angle: 90 },
      { r: 0, c: -1, angle: 180 },
      { r: -1, c: 0, angle: 270 },
    ];

    while (queue.length > 0) {
      const { pos, path } = queue.shift()!;
      if (pos.r === goal.r && pos.c === goal.c) {
        return path;
      }

      for (const d of directions) {
        const nr = pos.r + d.r;
        const nc = pos.c + d.c;
        const key = `${nr},${nc}`;

        if (
          nr >= 0 &&
          nr < MAZE_GRID.length &&
          nc >= 0 &&
          nc < MAZE_GRID[0].length &&
          MAZE_GRID[nr][nc] !== 1 &&
          !visited.has(key)
        ) {
          visited.add(key);
          queue.push({ pos: { r: nr, c: nc }, path: [...path, { r: nr, c: nc }] });
        }
      }
    }
    return [];
  }, []);

  // Movement handler
  const moveCar = useCallback(
    (dr: number, dc: number, targetAngle: number) => {
      if (hasWon) return;

      setCarPos((prev) => {
        const nr = prev.r + dr;
        const nc = prev.c + dc;

        if (nr < 0 || nr >= MAZE_GRID.length || nc < 0 || nc >= MAZE_GRID[0].length || MAZE_GRID[nr][nc] === 1) {
          soundEngine.playClick();
          return prev;
        }

        soundEngine.playTeslaDrive();
        setCarAngle(targetAngle);
        setSpeed((s) => Math.min(110, s + 15));

        const itemKey = `${nr},${nc}`;
        const cellType = MAZE_GRID[nr][nc];

        // Supercharger
        if (!collectedItems.has(itemKey)) {
          if (cellType === 2) {
            soundEngine.playTeslaSupercharge();
            setBattery((b) => Math.min(100, b + 30));
            setScore((sc) => sc + 150);
            setCollectedItems((prevSet) => new Set(prevSet).add(itemKey));
            showToast('⚡ Tesla Supercharger Connected! +30% Battery & +150 EXP!', 'success');
          } else if (cellType === 3) {
            soundEngine.playQuestComplete();
            setScore((sc) => sc + 250);
            setCollectedItems((prevSet) => new Set(prevSet).add(itemKey));
            showToast('💎 Mined Universal Lego Blueprint Data Core!', 'info');
          }
        }

        // Production Hub Goal
        if (cellType === 4 && !hasWon) {
          setHasWon(true);
          setIsFsdActive(false);
          soundEngine.playLevelUp();
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#06B6D4', '#EF4444', '#10B981', '#F59E0B'],
          });
          const unlockedRepo = projects[Math.floor(Math.random() * projects.length)]?.name || 'VibeOS';
          showToast(`🚀 Tesla Model Y reached Production Core! Unlocked ${unlockedRepo}! 🏆`, 'success');
        }

        return { r: nr, c: nc };
      });
    },
    [hasWon, collectedItems, projects, showToast]
  );

  // Toggle FSD Autopilot
  const toggleFsd = () => {
    if (hasWon) return;

    if (!isFsdActive) {
      soundEngine.playTeslaFsdEngage();
      setIsFsdActive(true);
      showToast('⚡ Tesla FSD V13 Autopilot Engaged! Navigating cyber maze...', 'info');

      const path = findPathToGoal(carPos, { r: 11, c: 11 });
      setLaserPath(path);
    } else {
      soundEngine.playClick();
      setIsFsdActive(false);
      setLaserPath([]);
      showToast('Tesla FSD Disengaged. Manual Control active.', 'info');
    }
  };

  // FSD loop
  useEffect(() => {
    if (!isOpen || !isFsdActive || hasWon) {
      if (autopilotTimerRef.current) clearInterval(autopilotTimerRef.current);
      return;
    }

    autopilotTimerRef.current = setInterval(() => {
      const path = findPathToGoal(carPos, { r: 11, c: 11 });
      if (path.length > 1) {
        const next = path[1];
        const dr = next.r - carPos.r;
        const dc = next.c - carPos.c;
        let angle = 0;
        if (dr === 1) angle = 90;
        else if (dr === -1) angle = 270;
        else if (dc === 1) angle = 0;
        else if (dc === -1) angle = 180;

        moveCar(dr, dc, angle);
      }
    }, 220);

    return () => {
      if (autopilotTimerRef.current) clearInterval(autopilotTimerRef.current);
    };
  }, [isOpen, isFsdActive, carPos, hasWon, findPathToGoal, moveCar]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement).tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        moveCar(0, 1, 0);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        moveCar(1, 0, 90);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        moveCar(0, -1, 180);
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        moveCar(-1, 0, 270);
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleFsd();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, moveCar]);

  const handleReset = () => {
    soundEngine.playClick();
    setCarPos({ r: 1, c: 1 });
    setCarAngle(0);
    setBattery(100);
    setSpeed(0);
    setScore(0);
    setHasWon(false);
    setIsFsdActive(false);
    setCollectedItems(new Set());
    setLaserPath([]);
  };

  return (
    <>
      {/* Sleek Arcade Banner Card on Dashboard */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0B0F19] via-slate-900 to-[#0B0F19] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl relative overflow-hidden group">
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-[2px] shadow-lg shadow-red-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-extrabold text-red-400 font-mono text-xl">
              T
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white font-mono">
                Tesla Model Y : Cyber Maze FSD Autopilot
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-bold uppercase">
                Mini Game
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {language === 'ko'
                ? '테슬라 모델 Y로 사이버 회로 미로를 주행하거나 FSD 자율주행으로 프로덕션 코어를 공략하세요.'
                : 'Navigate through the cyber circuit maze with Tesla Model Y or engage FSD Autopilot.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playTeslaFsdEngage();
            setIsOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold font-mono transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02] shrink-0 active:scale-95"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>{language === 'ko' ? '테슬라 미로 게임 시작' : 'Launch Tesla Maze'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Fullscreen / Modal Cyber Arcade Cabinet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#080B12] border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center font-bold font-mono text-sm">
                  T
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white font-mono">
                    Tesla Model Y Cyber Maze FSD Autopilot
                  </h2>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Arrow keys to drive | Spacebar for FSD Autopilot | Esc to close
                  </span>
                </div>
              </div>

              {/* Telemetry & Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">{battery}%</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">{score} PTS</span>
                </div>

                <button
                  onClick={toggleFsd}
                  className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all ${
                    isFsdActive
                      ? 'bg-cyan-500 text-slate-950 border border-cyan-400 animate-pulse'
                      : 'bg-slate-900 text-cyan-400 border border-cyan-500/30 hover:bg-slate-800'
                  }`}
                >
                  {isFsdActive ? '⚡ FSD ON' : 'ENGAGE FSD'}
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  title="Reset Circuit"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stage Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col lg:flex-row items-center justify-center gap-6">
              {/* 13x13 Pure CSS Grid Stage */}
              <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-2 sm:p-3 shadow-2xl w-full max-w-[420px] sm:max-w-[460px] aspect-square flex items-center justify-center">
                <div
                  className="w-full h-full gap-1 sm:gap-1.5"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
                    gridTemplateRows: 'repeat(13, minmax(0, 1fr))',
                  }}
                >
                  {MAZE_GRID.map((row, r) =>
                    row.map((cell, c) => {
                      const isCarHere = carPos.r === r && carPos.c === c;
                      const isCollected = collectedItems.has(`${r},${c}`);
                      const isLaserStep = isFsdActive && laserPath.some((p) => p.r === r && p.c === c);

                      if (cell === 1) {
                        return (
                          <div
                            key={`${r}-${c}`}
                            className="w-full h-full rounded bg-slate-900 border border-slate-800 flex items-center justify-center"
                          >
                            <div className="w-1 h-1 rounded-full bg-cyan-950" />
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`w-full h-full rounded transition-all relative flex items-center justify-center ${
                            isLaserStep ? 'bg-cyan-950/60 shadow-sm shadow-cyan-500/30' : 'bg-slate-950/80'
                          }`}
                        >
                          {cell === 0 && !isCarHere && (
                            <div className={`w-1 h-1 rounded-full ${isLaserStep ? 'bg-cyan-400' : 'bg-slate-800'}`} />
                          )}

                          {cell === 2 && !isCollected && !isCarHere && (
                            <span className="text-[10px] sm:text-xs animate-bounce">⚡</span>
                          )}

                          {cell === 3 && !isCollected && !isCarHere && (
                            <span className="text-[10px] sm:text-xs animate-pulse">💎</span>
                          )}

                          {cell === 4 && (
                            <div className="relative flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute" />
                              <span className="text-[10px] sm:text-xs">🚀</span>
                            </div>
                          )}

                          {/* Model Y Car Top-Down Sprite */}
                          {isCarHere && (
                            <div
                              className="relative z-20 w-full h-full flex items-center justify-center transition-transform duration-150"
                              style={{ transform: `rotate(${carAngle}deg)` }}
                            >
                              <div className="w-4 sm:w-5 h-2.5 sm:h-3.5 bg-gradient-to-r from-slate-200 via-white to-slate-300 rounded-[3px] border border-slate-400 relative flex items-center justify-between px-0.5 shadow-md shadow-cyan-500/50">
                                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-slate-950 rounded-[2px] border border-cyan-400/60 flex items-center justify-center">
                                  <span className="text-[5px] text-red-500 font-mono font-bold scale-75">T</span>
                                </div>
                                <div className="w-0.5 h-1.5 bg-cyan-300 rounded-full" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* D-Pad Controller */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-2 font-mono">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Touch Navigation</span>
                <button
                  onClick={() => moveCar(-1, 0, 270)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 active:scale-95"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => moveCar(0, -1, 180)}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleFsd}
                    className={`px-3 py-2 rounded-xl text-xs font-bold font-mono border ${
                      isFsdActive ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-cyan-400 border-slate-700'
                    }`}
                  >
                    FSD
                  </button>
                  <button
                    onClick={() => moveCar(0, 1, 0)}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => moveCar(1, 0, 90)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 active:scale-95"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
