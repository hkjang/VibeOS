import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';
import {
  Crown,
  Shield,
  Zap,
  Swords,
  Sparkles,
  Flag,
  Flame,
  TowerControl as Tower,
  ChevronRight,
  RotateCcw,
  Trophy,
  Compass,
  Layers,
  Dices,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Building,
  Target,
  ArrowUpRight,
  Maximize2,
  X,
  Radio,
} from 'lucide-react';

export type SectorType = 'ai' | 'database' | 'chat' | 'devtools' | 'fintech' | 'security';
export type SectorOwner = 'player' | 'neutral' | 'boss';

export interface SectorNode {
  id: string;
  r: number;
  c: number;
  name: string;
  type: SectorType;
  owner: SectorOwner;
  level: number; // 1 to 5
  firewallPower: number; // 10 to 90
  resourceYield: { gold: number; exp: number };
  guardianRepo: string;
  isSpecialBoss?: boolean;
}

const SECTOR_TYPES: Record<
  SectorType,
  { nameKo: string; nameEn: string; color: string; icon: string; bg: string }
> = {
  ai: {
    nameKo: '뉴럴 AI 요새',
    nameEn: 'Neural AI Citadel',
    color: '#10B981',
    icon: '🤖',
    bg: 'from-emerald-950/70 to-emerald-900/30',
  },
  database: {
    nameKo: '데이터 쿼리 성역',
    nameEn: 'Data Stream Sanctum',
    color: '#06B6D4',
    icon: '💾',
    bg: 'from-cyan-950/70 to-cyan-900/30',
  },
  chat: {
    nameKo: '매트릭스 릴레이 기지',
    nameEn: 'Matrix Relay Hub',
    color: '#8B5CF6',
    icon: '💬',
    bg: 'from-violet-950/70 to-violet-900/30',
  },
  devtools: {
    nameKo: '엔진 파운드리',
    nameEn: 'DevTools Foundry',
    color: '#F59E0B',
    icon: '⚡',
    bg: 'from-amber-950/70 to-amber-900/30',
  },
  fintech: {
    nameKo: '퀀트 볼트 금고',
    nameEn: 'Quantum FinTech Vault',
    color: '#F43F5E',
    icon: '📈',
    bg: 'from-rose-950/70 to-rose-900/30',
  },
  security: {
    nameKo: '아이언 방화벽 요새',
    nameEn: 'Iron Firewall Fortress',
    color: '#6366F1',
    icon: '🛡️',
    bg: 'from-indigo-950/70 to-indigo-900/30',
  },
};

const GRID_ROWS = 6;
const GRID_COLS = 6;

export const DomainConquestRpg: React.FC = () => {
  const { projects, showToast } = useVibeStore();
  const { language } = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [playerEnergy, setPlayerEnergy] = useState<number>(10);
  const [goldBalance, setGoldBalance] = useState<number>(450);
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>('0-0');
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isAttacking, setIsAttacking] = useState<boolean>(false);
  const [diceRoll, setDiceRoll] = useState<{ player: number; defense: number; isCrit: boolean } | null>(null);

  // Initialize 6x6 Sector Grid
  const [grid, setGrid] = useState<SectorNode[]>(() => {
    const nodes: SectorNode[] = [];
    const types: SectorType[] = ['ai', 'database', 'chat', 'devtools', 'fintech', 'security'];

    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const type = types[(r * GRID_COLS + c) % types.length];
        const isStart = r === 0 && c === 0;
        const isBoss = (r === 5 && c === 5) || (r === 2 && c === 3);

        const nodeName = isStart
          ? 'Home Base (HQ)'
          : isBoss
          ? `Overlord Core [${r},${c}]`
          : `Sector ${String.fromCharCode(65 + r)}${c + 1}`;

        nodes.push({
          id: `${r}-${c}`,
          r,
          c,
          name: nodeName,
          type,
          owner: isStart ? 'player' : isBoss ? 'boss' : 'neutral',
          level: isStart ? 2 : 1,
          firewallPower: isStart ? 20 : isBoss ? 75 : Math.floor(Math.random() * 35 + 20),
          resourceYield: {
            gold: Math.floor(Math.random() * 20 + 15),
            exp: Math.floor(Math.random() * 30 + 25),
          },
          guardianRepo: isStart ? 'VibeOS' : '',
          isSpecialBoss: isBoss,
        });
      }
    }
    return nodes;
  });

  const selectedSector = useMemo(
    () => grid.find((s) => s.id === selectedSectorId) || grid[0],
    [grid, selectedSectorId]
  );

  // Conquest Metrics
  const capturedCount = useMemo(() => grid.filter((s) => s.owner === 'player').length, [grid]);
  const totalSectors = GRID_ROWS * GRID_COLS;
  const dominancePercent = Math.round((capturedCount / totalSectors) * 100);

  // Empire Rank Progression
  const rankInfo = useMemo(() => {
    if (dominancePercent >= 90) {
      return { rank: 'Lv. 5 Grand Sovereign of Cyberspace', title: '사이버스페이스 총사령관', color: 'text-amber-400', badge: 'bg-amber-500/20 border-amber-500/40 text-amber-300' };
    } else if (dominancePercent >= 60) {
      return { rank: 'Lv. 4 Cyber Archon', title: '사이버 대공', color: 'text-cyan-400', badge: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' };
    } else if (dominancePercent >= 35) {
      return { rank: 'Lv. 3 Sector Overlord', title: '섹터 군주', color: 'text-violet-400', badge: 'bg-violet-500/20 border-violet-500/40 text-violet-300' };
    } else if (dominancePercent >= 15) {
      return { rank: 'Lv. 2 Domain Overseer', title: '도메인 감시관', color: 'text-emerald-400', badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' };
    }
    return { rank: 'Lv. 1 Cyber Scout', title: '사이버 탐색관', color: 'text-slate-300', badge: 'bg-slate-800 border-slate-700 text-slate-300' };
  }, [dominancePercent]);

  // Check if sector is adjacent to any player sector
  const isAttackable = useCallback(
    (sector: SectorNode) => {
      if (sector.owner === 'player') return false;

      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      for (const [dr, dc] of directions) {
        const nr = sector.r + dr;
        const nc = sector.c + dc;
        const adj = grid.find((s) => s.r === nr && s.c === nc);
        if (adj && adj.owner === 'player') {
          return true;
        }
      }
      return false;
    },
    [grid]
  );

  // Attack / Conquer Sector
  const handleAttackSector = (target: SectorNode) => {
    if (playerEnergy < 2) {
      soundEngine.playClick();
      showToast('⚠️ Not enough Energy AP! Need 2 AP to launch cyber assault.', 'warning');
      return;
    }

    if (!isAttackable(target)) {
      soundEngine.playClick();
      showToast('⚠️ Can only conquer sectors adjacent to your controlled territory!', 'warning');
      return;
    }

    setIsAttacking(true);
    soundEngine.playTeslaDrive();

    // Dice Roll Calculation (Player Roll with ATK buffs vs Sector Firewall)
    const playerBase = Math.floor(Math.random() * 20 + 1);
    const isCrit = playerBase >= 18;
    const playerTotal = isCrit ? 99 : playerBase + 25; // ATK advantage
    const defenseTotal = target.firewallPower;

    setDiceRoll({
      player: playerTotal,
      defense: defenseTotal,
      isCrit,
    });

    setTimeout(() => {
      setPlayerEnergy((e) => Math.max(0, e - 2));

      if (playerTotal >= defenseTotal || isCrit) {
        // VICTORY!
        soundEngine.playQuestComplete();

        // Assign a random public repo from user's portfolio as guardian
        const randomRepo = projects[Math.floor(Math.random() * projects.length)]?.name || 'VibeOS Core';

        setGrid((prev) =>
          prev.map((s) =>
            s.id === target.id
              ? {
                  ...s,
                  owner: 'player',
                  guardianRepo: randomRepo,
                  level: 1,
                }
              : s
          )
        );

        setGoldBalance((g) => g + target.resourceYield.gold * 3);
        const logMsg = `⚔️ CONQUERED [${target.name}]! Assigned Guardian: "${randomRepo}" (+${target.resourceYield.gold * 3} Gold)`;
        setBattleLog((logs) => [logMsg, ...logs.slice(0, 7)]);
        showToast(logMsg, 'success');

        if (target.isSpecialBoss) {
          soundEngine.playLevelUp();
          confetti({
            particleCount: 180,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
          });
          showToast(`🏆 DEFEATED OVERLORD NODE! Unlocked Legendary Dominion Core!`, 'success');
        }
      } else {
        // DEFEAT
        soundEngine.playClick();
        const logMsg = `❌ Assault on [${target.name}] repelled by Firewall (Rolled ${playerTotal} vs Defense ${defenseTotal})`;
        setBattleLog((logs) => [logMsg, ...logs.slice(0, 7)]);
        showToast(logMsg, 'error');
      }

      setIsAttacking(false);
    }, 650);
  };

  // Fortify / Upgrade Sector
  const handleUpgradeSector = (sector: SectorNode) => {
    if (sector.owner !== 'player') return;
    if (sector.level >= 5) {
      showToast('Sector already at Maximum Citadel Level 5!', 'info');
      return;
    }

    const cost = sector.level * 120;
    if (goldBalance < cost) {
      soundEngine.playClick();
      showToast(`⚠️ Need ${cost} Gold to upgrade to Level ${sector.level + 1}!`, 'warning');
      return;
    }

    soundEngine.playLevelUp();
    setGoldBalance((g) => g - cost);
    setGrid((prev) =>
      prev.map((s) =>
        s.id === sector.id
          ? {
              ...s,
              level: s.level + 1,
              resourceYield: {
                gold: s.resourceYield.gold + 15,
                exp: s.resourceYield.exp + 25,
              },
            }
          : s
      )
    );

    const logMsg = `🏰 Fortified [${sector.name}] to Level ${sector.level + 1} Citadel!`;
    setBattleLog((logs) => [logMsg, ...logs.slice(0, 7)]);
    showToast(logMsg, 'success');
  };

  // EMP Overclock Skill
  const handleEmpOverclock = () => {
    if (playerEnergy < 3) {
      soundEngine.playClick();
      showToast('⚠️ Need 3 Energy AP for EMP Overclock!', 'warning');
      return;
    }

    soundEngine.playTeslaFsdEngage();
    setPlayerEnergy((e) => e - 3);

    setGrid((prev) =>
      prev.map((s) =>
        s.owner !== 'player'
          ? { ...s, firewallPower: Math.max(10, Math.floor(s.firewallPower * 0.6)) }
          : s
      )
    );

    showToast('⚡ EMP Overclock Pulse Fired! All enemy firewalls weakened by 40%!', 'info');
  };

  // Recharge Energy AP
  const handleRechargeAp = () => {
    soundEngine.playTeslaSupercharge();
    setPlayerEnergy(10);
    showToast('⚡ Supercharger Connected! AP Recharged to 10/10!', 'success');
  };

  // Reset World Map
  const handleResetMap = () => {
    soundEngine.playClick();
    const types: SectorType[] = ['ai', 'database', 'chat', 'devtools', 'fintech', 'security'];
    const nodes: SectorNode[] = [];

    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const type = types[(r * GRID_COLS + c + Math.floor(Math.random() * 3)) % types.length];
        const isStart = r === 0 && c === 0;
        const isBoss = (r === 5 && c === 5) || (r === 2 && c === 4);

        nodes.push({
          id: `${r}-${c}`,
          r,
          c,
          name: isStart
            ? 'Home Base (HQ)'
            : isBoss
            ? `Overlord Core [${r},${c}]`
            : `Sector ${String.fromCharCode(65 + r)}${c + 1}`,
          type,
          owner: isStart ? 'player' : isBoss ? 'boss' : 'neutral',
          level: isStart ? 2 : 1,
          firewallPower: isStart ? 20 : isBoss ? 80 : Math.floor(Math.random() * 40 + 20),
          resourceYield: {
            gold: Math.floor(Math.random() * 20 + 15),
            exp: Math.floor(Math.random() * 30 + 25),
          },
          guardianRepo: isStart ? 'VibeOS' : '',
          isSpecialBoss: isBoss,
        });
      }
    }
    setGrid(nodes);
    setPlayerEnergy(10);
    setGoldBalance(450);
    setBattleLog(['🗺️ New Cyber Conquest Matrix initialized. HQ established at [0, 0].']);
    showToast('🎲 New Territory Conquest Matrix generated!', 'info');
  };

  return (
    <>
      {/* Dashboard Launcher Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0C101E] via-[#0E1528] to-[#0C101E] border border-indigo-500/40 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xl relative overflow-hidden group">
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <Crown className="w-6 h-6 text-indigo-400" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                VibeConquest : Cyber Domain Territory RPG (사이버 영토 점령전)
              </h3>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold uppercase ${rankInfo.badge}`}>
                {rankInfo.rank}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-1">
              {language === 'ko'
                ? `점령률: ${dominancePercent}% (${capturedCount}/${totalSectors} 구역) | 보유 골드: ${goldBalance} G | 234개 리포지토리 수호대 배치`
                : `Dominion: ${dominancePercent}% (${capturedCount}/${totalSectors} Sectors) | Gold: ${goldBalance} G | Guarded by 234 Public Repos`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          {/* Dominance Progress Bar */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono text-cyan-400 font-bold">
              Dominance {dominancePercent}%
            </span>
            <div className="w-28 h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${dominancePercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playQuestComplete();
              setIsOpenModal(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold font-mono transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Swords className="w-4 h-4" />
            <span>{language === 'ko' ? '영토 점령전 시작' : 'Enter Conquest'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Fullscreen / Modal Conquest Command Center */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn font-sans">
          <div className="relative w-full max-w-5xl rounded-3xl bg-[#090D18] border border-indigo-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
            {/* Command Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white font-mono">
                      VibeConquest : Cyber Domain Territory Matrix
                    </h2>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${rankInfo.badge}`}>
                      {rankInfo.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Turn-based Sector Conquest | Defend & Fortify with Public GitHub Repositories
                  </span>
                </div>
              </div>

              {/* Player AP & Economy Telemetry */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-400">AP:</span>
                  <span className="text-cyan-300 font-bold">{playerEnergy}/10</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">{goldBalance} G</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <Flag className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">{dominancePercent}% Owned</span>
                </div>

                <button
                  onClick={handleRechargeAp}
                  className="px-2.5 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono transition-all"
                  title="Recharge AP to 10"
                >
                  ⚡ Recharge
                </button>

                <button
                  onClick={handleResetMap}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Regenerate World Map"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsOpenModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Battle Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
              {/* 6x6 Tactile Sector Grid */}
              <div className="bg-slate-950/90 border border-indigo-500/30 rounded-3xl p-3 sm:p-4 shadow-2xl w-full max-w-[480px] aspect-square flex items-center justify-center relative">
                <div
                  className="w-full h-full gap-2 sm:gap-2.5"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                    gridTemplateRows: 'repeat(6, minmax(0, 1fr))',
                  }}
                >
                  {grid.map((sector) => {
                    const isSelected = selectedSectorId === sector.id;
                    const isPlayerOwned = sector.owner === 'player';
                    const isBoss = sector.owner === 'boss';
                    const canAttack = isAttackable(sector);
                    const sectorType = SECTOR_TYPES[sector.type];

                    return (
                      <button
                        key={sector.id}
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedSectorId(sector.id);
                        }}
                        className={`w-full h-full rounded-xl sm:rounded-2xl transition-all duration-200 relative flex flex-col items-center justify-between p-1 sm:p-1.5 border group select-none ${
                          isSelected
                            ? 'scale-105 z-20 border-white shadow-lg shadow-cyan-500/50'
                            : isPlayerOwned
                            ? 'border-cyan-500/60 bg-gradient-to-br from-cyan-950/80 via-slate-900 to-indigo-950/80 shadow-md shadow-cyan-500/20'
                            : isBoss
                            ? 'border-rose-500/60 bg-gradient-to-br from-rose-950/80 via-slate-900 to-red-950/80 animate-pulse'
                            : canAttack
                            ? 'border-amber-500/50 bg-slate-900/90 hover:border-amber-400 hover:scale-105'
                            : 'border-slate-800/80 bg-slate-950/80 opacity-70'
                        }`}
                      >
                        {/* Top Indicator */}
                        <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px] font-mono leading-none">
                          <span className="text-slate-400">{String.fromCharCode(65 + sector.r)}{sector.c + 1}</span>
                          {isPlayerOwned ? (
                            <span className="text-cyan-400 font-bold">Lv.{sector.level}</span>
                          ) : (
                            <span className={isBoss ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                              {sector.firewallPower}
                            </span>
                          )}
                        </div>

                        {/* Center Icon */}
                        <div className="text-xs sm:text-base transition-transform group-hover:scale-110">
                          {isPlayerOwned ? (
                            <span className="text-cyan-300">🏰</span>
                          ) : isBoss ? (
                            <span className="text-rose-400">👾</span>
                          ) : (
                            <span>{sectorType.icon}</span>
                          )}
                        </div>

                        {/* Bottom Status */}
                        <div className="w-full flex items-center justify-center">
                          {isPlayerOwned ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                          ) : canAttack ? (
                            <span className="text-[7px] sm:text-[8px] text-amber-300 font-bold font-mono uppercase">
                              ⚔️ Target
                            </span>
                          ) : (
                            <div className="w-1 h-1 rounded-full bg-slate-700" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sector Tactical Details & Command Actions */}
              <div className="flex-1 w-full space-y-4 font-mono">
                {/* Selected Sector Dossier */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{SECTOR_TYPES[selectedSector.type].icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {selectedSector.name}
                        </h4>
                        <span
                          className="text-[10px]"
                          style={{ color: SECTOR_TYPES[selectedSector.type].color }}
                        >
                          {SECTOR_TYPES[selectedSector.type].nameKo}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                        selectedSector.owner === 'player'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : selectedSector.owner === 'boss'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {selectedSector.owner === 'player'
                        ? 'Player Territory'
                        : selectedSector.owner === 'boss'
                        ? 'Corrupted Boss Core'
                        : 'Neutral Sector'}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">Citadel Level:</span>
                      <span className="text-white font-bold">Lv. {selectedSector.level}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">Firewall Shield:</span>
                      <span className={selectedSector.owner === 'player' ? 'text-cyan-400 font-bold' : 'text-rose-400 font-bold'}>
                        {selectedSector.firewallPower} DEF
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">Gold Yield:</span>
                      <span className="text-amber-400 font-bold">+{selectedSector.resourceYield.gold} G</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">EXP Yield:</span>
                      <span className="text-emerald-400 font-bold">+{selectedSector.resourceYield.exp} EXP</span>
                    </div>
                  </div>

                  {/* Guardian Repository Assignment */}
                  {selectedSector.owner === 'player' && (
                    <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-indigo-300">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Guardian Repo:</span>
                      </div>
                      <span className="text-white font-bold truncate max-w-[140px]">
                        {selectedSector.guardianRepo || 'VibeOS Core'}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2 flex-wrap">
                    {selectedSector.owner !== 'player' ? (
                      <button
                        onClick={() => handleAttackSector(selectedSector)}
                        disabled={isAttacking || !isAttackable(selectedSector)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold shadow-lg transition-all ${
                          isAttackable(selectedSector)
                            ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-rose-500 text-white shadow-rose-600/30 hover:scale-[1.02] active:scale-95'
                            : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                        }`}
                      >
                        <Swords className="w-4 h-4" />
                        <span>{isAttacking ? 'Breaching Firewall...' : 'Conquer Sector (2 AP)'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpgradeSector(selectedSector)}
                        disabled={selectedSector.level >= 5}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <Building className="w-4 h-4" />
                        <span>
                          {selectedSector.level >= 5
                            ? 'Max Level 5'
                            : `Fortify Citadel (${selectedSector.level * 120} G)`}
                        </span>
                      </button>
                    )}

                    <button
                      onClick={handleEmpOverclock}
                      disabled={playerEnergy < 3}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-cyan-300 text-xs font-bold transition-all disabled:opacity-50"
                      title="Weaken all enemy firewalls by 40% (Costs 3 AP)"
                    >
                      ⚡ EMP (3 AP)
                    </button>
                  </div>
                </div>

                {/* Live Conquest Battle Logs */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold border-b border-slate-800 pb-1">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      Tactical Dispatch Feed
                    </span>
                    <span>Recent Actions</span>
                  </div>

                  <div className="space-y-1 max-h-28 overflow-y-auto text-[11px] text-slate-300">
                    {battleLog.length === 0 ? (
                      <p className="text-slate-500 italic text-[10px]">Select adjacent sectors with target marks to launch attacks.</p>
                    ) : (
                      battleLog.map((log, i) => (
                        <div key={i} className="leading-snug truncate">
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
