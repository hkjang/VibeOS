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
  Pause,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Radio,
  Flame,
  X,
  Maximize2,
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

  const [carPos, setCarPos] = useState<Position>({ r: 1, c: 1 });
  const [carAngle, setCarAngle] = useState<number>(0); // 0 = right, 90 = down, 180 = left, 270 = up
  const [battery, setBattery] = useState<number>(100);
  const [speed, setSpeed] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isFsdActive, setIsFsdActive] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [collectedItems, setCollectedItems] = useState<Set<string>>(new Set());
  const [laserPath, setLaserPath] = useState<Position[]>([]);

  const autopilotTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BFS Pathfinding for Tesla FSD (Full Self-Driving) Autopilot
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

  // Handle Movement Logic
  const moveCar = useCallback(
    (dr: number, dc: number, targetAngle: number) => {
      if (hasWon) return;

      setCarPos((prev) => {
        const nr = prev.r + dr;
        const nc = prev.c + dc;

        // Check boundary & wall collision
        if (nr < 0 || nr >= MAZE_GRID.length || nc < 0 || nc >= MAZE_GRID[0].length || MAZE_GRID[nr][nc] === 1) {
          soundEngine.playClick();
          return prev;
        }

        soundEngine.playTeslaDrive();
        setCarAngle(targetAngle);
        setSpeed((s) => Math.min(110, s + 15));

        const itemKey = `${nr},${nc}`;
        const cellType = MAZE_GRID[nr][nc];

        // Item Collection
        if (!collectedItems.has(itemKey)) {
          if (cellType === 2) {
            // Supercharger
            soundEngine.playTeslaSupercharge();
            setBattery((b) => Math.min(100, b + 30));
            setScore((sc) => sc + 150);
            setCollectedItems((prevSet) => new Set(prevSet).add(itemKey));
            showToast('⚡ Tesla Supercharger Connected! +30% Battery & +150 EXP!', 'success');
          } else if (cellType === 3) {
            // Lego Asset Core
            soundEngine.playQuestComplete();
            setScore((sc) => sc + 250);
            setCollectedItems((prevSet) => new Set(prevSet).add(itemKey));
            showToast('💎 Mined Universal Lego Blueprint Data Core!', 'info');
          }
        }

        // Goal Check
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

      // Compute trajectory
      const path = findPathToGoal(carPos, { r: 11, c: 11 });
      setLaserPath(path);
    } else {
      soundEngine.playClick();
      setIsFsdActive(false);
      setLaserPath([]);
      showToast('Tesla FSD Disengaged. Manual Control active.', 'info');
    }
  };

  // FSD Auto-driving loop
  useEffect(() => {
    if (!isFsdActive || hasWon) {
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
  }, [isFsdActive, carPos, hasWon, findPathToGoal, moveCar]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user types in an input
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveCar]);

  // Restart Game
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
    <div className="p-5 sm:p-6 md:p-7 rounded-3xl bg-gradient-to-br from-[#080B12] via-slate-900 to-[#080B12] border border-cyan-500/40 shadow-2xl relative overflow-hidden space-y-5">
      {/* Background Neon Grid Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header: Title, FSD Status & HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          {/* Tesla Badge Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-400 p-[2px] shadow-lg shadow-red-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-bold text-red-400 font-mono text-xl">
              T
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white font-mono tracking-tight flex items-center gap-2">
                Tesla Model Y : Cyber Maze FSD Autopilot
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                FSD V13.2
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {language === 'ko'
                ? '방향키 또는 스페이스바로 FSD 자율주행을 켜고 사이버 회로 미로의 프로덕션 코어를 찾아가세요.'
                : 'Drive with Arrow keys or hit Spacebar to engage FSD Autopilot through the Cyber Circuit.'}
            </p>
          </div>
        </div>

        {/* Telemetry Pills */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Battery */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold">{battery}%</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 font-bold">{score} PTS</span>
          </div>

          {/* FSD Toggle Button */}
          <button
            onClick={toggleFsd}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all shadow-md ${
              isFsdActive
                ? 'bg-cyan-500 text-slate-950 border border-cyan-400 animate-pulse shadow-cyan-500/40'
                : 'bg-slate-900 text-cyan-400 border border-cyan-500/30 hover:bg-slate-800'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isFsdActive ? 'animate-spin' : ''}`} />
            <span>{isFsdActive ? '⚡ FSD ENGAGED' : 'ENGAGE FSD'}</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Restart Circuit"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Game Stage: Maze Grid & Touch Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center relative z-10">
        {/* Left 3 Cols: 13x13 Cyber Circuit Canvas Grid */}
        <div className="lg:col-span-3 bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-3 sm:p-5 shadow-2xl flex items-center justify-center relative overflow-hidden">
          {/* Laser Navigation Trace */}
          <div className="grid grid-cols-13 gap-1 sm:gap-1.5 w-full max-w-[540px] aspect-square">
            {MAZE_GRID.map((row, r) =>
              row.map((cell, c) => {
                const isCarHere = carPos.r === r && carPos.c === c;
                const isCollected = collectedItems.has(`${r},${c}`);
                const isLaserStep = isFsdActive && laserPath.some((p) => p.r === r && p.c === c);

                if (cell === 1) {
                  // Neon Circuit Wall
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="w-full h-full rounded-md sm:rounded-lg bg-slate-900 border border-slate-800/90 shadow-inner flex items-center justify-center relative group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-900/50" />
                    </div>
                  );
                }

                // Road / Items / Goal Cell
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-full h-full rounded-md sm:rounded-lg transition-all relative flex items-center justify-center ${
                      isLaserStep ? 'bg-cyan-950/40 shadow-sm shadow-cyan-500/20' : 'bg-slate-950/60'
                    }`}
                  >
                    {/* Road dot */}
                    {cell === 0 && !isCarHere && (
                      <div
                        className={`w-1 h-1 rounded-full ${
                          isLaserStep ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-slate-800'
                        }`}
                      />
                    )}

                    {/* Supercharger Node */}
                    {cell === 2 && !isCollected && !isCarHere && (
                      <div className="animate-bounce text-emerald-400 text-xs sm:text-sm font-bold">⚡</div>
                    )}

                    {/* Lego Asset Data Core */}
                    {cell === 3 && !isCollected && !isCarHere && (
                      <div className="animate-pulse text-amber-400 text-xs sm:text-sm font-bold">💎</div>
                    )}

                    {/* Production Hub Goal */}
                    {cell === 4 && (
                      <div className="relative flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute" />
                        <span className="text-xs sm:text-sm">🚀</span>
                      </div>
                    )}

                    {/* Tesla Model Y Top-Down Vector Sprite */}
                    {isCarHere && (
                      <div
                        className="relative z-20 w-full h-full flex items-center justify-center transition-transform duration-200"
                        style={{ transform: `rotate(${carAngle}deg)` }}
                      >
                        {/* Headlights beam projection */}
                        <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-7 h-5 bg-gradient-to-r from-cyan-300/60 via-cyan-400/20 to-transparent pointer-events-none rounded-r-full blur-[1px]" />

                        {/* Model Y Body (Top-down) */}
                        <div className="w-6 sm:w-8 h-3.5 sm:h-4.5 bg-gradient-to-r from-slate-200 via-white to-slate-300 rounded-[6px] shadow-lg border border-slate-400/80 relative flex items-center justify-between px-0.5">
                          {/* Front Windshield & Glass Roof */}
                          <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-slate-900 rounded-[3px] border border-cyan-400/50 flex items-center justify-center">
                            <span className="text-[6px] font-bold text-red-500 font-mono scale-75">T</span>
                          </div>
                          {/* Headlights LEDs */}
                          <div className="w-0.5 h-2 bg-cyan-300 rounded-full shadow-sm shadow-cyan-300" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Driving Telemetry & Touch Controller */}
        <div className="space-y-4 font-mono">
          {/* Real-time FSD Vision Display */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Compass className="w-3.5 h-3.5" />
                FSD Vision Radar
              </span>
              <span className="text-[10px] text-emerald-400">Online</span>
            </div>

            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="text-white font-bold">Tesla Model Y</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Autopilot:</span>
                <span className={isFsdActive ? 'text-cyan-400 font-bold animate-pulse' : 'text-slate-400'}>
                  {isFsdActive ? 'Full Self-Driving V13' : 'Manual Drive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Position:</span>
                <span className="text-slate-300">
                  [{carPos.r}, {carPos.c}]
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Goal:</span>
                <span className="text-rose-400 font-bold">Production Hub [11, 11]</span>
              </div>
            </div>
          </div>

          {/* On-Screen D-Pad Controller */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-1.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Manual D-Pad</span>

            <button
              onClick={() => moveCar(-1, 0, 270)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-slate-300 transition-all active:scale-90"
            >
              <ChevronUp className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => moveCar(0, -1, 180)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-slate-300 transition-all active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={toggleFsd}
                className={`px-3 py-1.5 rounded-xl font-bold text-[10px] border transition-all ${
                  isFsdActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/40'
                    : 'bg-slate-900 text-cyan-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                FSD
              </button>

              <button
                onClick={() => moveCar(0, 1, 0)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-slate-300 transition-all active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => moveCar(1, 0, 90)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-slate-300 transition-all active:scale-90"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
