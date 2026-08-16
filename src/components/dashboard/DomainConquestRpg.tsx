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
  Crosshair,
  Satellite,
  Wrench,
  Activity,
  Skull,
  Play,
  FastForward,
} from 'lucide-react';

export type BuildingType = 'none' | 'nexus' | 'tesla_turret' | 'iron_shield' | 'ai_barracks' | 'tech_vault';
export type SectorOwner = 'player' | 'neutral' | 'enemy';

export interface SectorNode {
  id: string;
  r: number;
  c: number;
  name: string;
  owner: SectorOwner;
  building: BuildingType;
  level: number; // 1 to 5
  hp: number; // Max 100
  maxHp: number;
  defense: number;
  attackPower: number;
  guardianRepo: string;
  isInvasionTarget?: boolean;
  enemyThreatLevel?: number; // 0 to 100
  laserAnim?: boolean;
}

export interface EnemyWave {
  waveNumber: number;
  name: string;
  totalUnits: number;
  attackPower: number;
  bossUnit: string;
  threatSector: string;
}

const BUILDINGS: Record<
  BuildingType,
  { nameKo: string; nameEn: string; icon: string; color: string; descKo: string; descEn: string; cost: number; atk: number; def: number }
> = {
  none: {
    nameKo: '빈 토지',
    nameEn: 'Empty Plot',
    icon: '⬛',
    color: '#64748B',
    descKo: '성채나 방어 타워를 건설할 수 있습니다.',
    descEn: 'Ready for defensive construction.',
    cost: 0,
    atk: 0,
    def: 0,
  },
  nexus: {
    nameKo: '사이버 넥서스 본성',
    nameEn: 'Cyber Nexus Citadel',
    icon: '🏰',
    color: '#06B6D4',
    descKo: '턴당 골드 +40 & EXP +50 생산, 아군 영토의 중심 코어',
    descEn: '+40 Gold & +50 EXP per wave. Empire Core.',
    cost: 150,
    atk: 20,
    def: 40,
  },
  tesla_turret: {
    nameKo: '테슬라 코일 레이저 타워',
    nameEn: 'Tesla Coil Laser Turret',
    icon: '⚡',
    color: '#38BDF8',
    descKo: '적 침공 시 70 공격력의 고압 레이저로 침공군을 자동 요격',
    descEn: '70 ATK high-voltage laser automatically repels raiders.',
    cost: 180,
    atk: 70,
    def: 30,
  },
  iron_shield: {
    nameKo: '아이언 포트리스 & 방어막',
    nameEn: 'Iron Fortress & Shield',
    icon: '🛡️',
    color: '#10B981',
    descKo: '방어력 +85, 적의 침공 피해를 60% 이상 흡수 및 국경 방어',
    descEn: '+85 DEF. Blocks 60%+ siege assault damage.',
    cost: 160,
    atk: 15,
    def: 85,
  },
  ai_barracks: {
    nameKo: 'AI 센티넬 드론 병영',
    nameEn: 'AI Sentinel Barracks',
    icon: '🤖',
    color: '#8B5CF6',
    descKo: '웨이브마다 AI 정찰 드론을 출격시켜 인접 적군 거점 반격 (공격력 55)',
    descEn: 'Dispatches Sentinel Drones to counter-attack enemy hubs.',
    cost: 200,
    atk: 55,
    def: 45,
  },
  tech_vault: {
    nameKo: '양자 테크 연구소',
    nameEn: 'Quantum Tech Vault',
    icon: '💎',
    color: '#F59E0B',
    descKo: '턴당 골드 +70 및 전술 위성 궤도포 쿨타임 대폭 단축',
    descEn: '+70 Gold & accelerates Orbital Cannon cooldown.',
    cost: 220,
    atk: 10,
    def: 25,
  },
};

const GRID_ROWS = 6;
const GRID_COLS = 6;

export const DomainConquestRpg: React.FC = () => {
  const { projects, showToast } = useVibeStore();
  const { language } = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentWave, setCurrentWave] = useState<number>(1);
  const [goldBalance, setGoldBalance] = useState<number>(550);
  const [playerEnergy, setPlayerEnergy] = useState<number>(10);
  const [selectedSectorId, setSelectedSectorId] = useState<string>('0-0');
  const [isProcessingWave, setIsProcessingWave] = useState<boolean>(false);
  const [orbitalCooldown, setOrbitalCooldown] = useState<number>(0);
  const [empActive, setEmpActive] = useState<boolean>(false);

  const [battleLogs, setBattleLogs] = useState<
    { id: string; time: string; text: string; type: 'conquest' | 'defense' | 'alert' | 'upgrade' }[]
  >([
    {
      id: 'init-1',
      time: '00:01',
      text: '🏰 Cyber Command Center established at Sector A1. Construct Turrets and Fortresses to repel incoming Botnet Raids!',
      type: 'defense',
    },
  ]);

  // Floating Combat Damage Animations
  const [combatEffects, setCombatEffects] = useState<
    { id: string; r: number; c: number; text: string; color: string }[]
  >([]);

  // Initialize 6x6 Sector Grid
  const [grid, setGrid] = useState<SectorNode[]>(() => {
    const nodes: SectorNode[] = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const isStart = r === 0 && c === 0;
        const isEnemyBase = (r === 5 && c === 5) || (r === 0 && c === 5) || (r === 5 && c === 0);
        const isEnemyOutpost = (r === 2 && c === 4) || (r === 4 && c === 2);

        const owner: SectorOwner = isStart ? 'player' : isEnemyBase || isEnemyOutpost ? 'enemy' : 'neutral';
        const building: BuildingType = isStart ? 'nexus' : 'none';

        nodes.push({
          id: `${r}-${c}`,
          r,
          c,
          name: isStart
            ? 'Home Base Nexus (HQ)'
            : isEnemyBase
            ? `Botnet Hive [${r},${c}]`
            : `Sector ${String.fromCharCode(65 + r)}${c + 1}`,
          owner,
          building,
          level: isStart ? 2 : 1,
          hp: 100,
          maxHp: 100,
          defense: isStart ? 50 : isEnemyBase ? 80 : Math.floor(Math.random() * 30 + 20),
          attackPower: isStart ? 30 : isEnemyBase ? 60 : Math.floor(Math.random() * 25 + 15),
          guardianRepo: isStart ? 'VibeOS Core' : '',
          isInvasionTarget: false,
          enemyThreatLevel: isEnemyBase ? 90 : 0,
        });
      }
    }
    return nodes;
  });

  const selectedSector = useMemo(
    () => grid.find((s) => s.id === selectedSectorId) || grid[0],
    [grid, selectedSectorId]
  );

  // Territory Metrics
  const capturedSectors = useMemo(() => grid.filter((s) => s.owner === 'player'), [grid]);
  const dominancePercent = Math.round((capturedSectors.length / (GRID_ROWS * GRID_COLS)) * 100);

  // Total Empire Defense & Attack Power
  const empireStats = useMemo(() => {
    let totalAtk = 0;
    let totalDef = 0;
    let goldPerTurn = 0;

    capturedSectors.forEach((s) => {
      const b = BUILDINGS[s.building];
      totalAtk += b.atk * s.level + s.attackPower;
      totalDef += b.def * s.level + s.defense;
      if (s.building === 'nexus') goldPerTurn += 40 * s.level;
      if (s.building === 'tech_vault') goldPerTurn += 70 * s.level;
      goldPerTurn += 10;
    });

    return { totalAtk, totalDef, goldPerTurn };
  }, [capturedSectors]);

  // Check if a sector is adjacent to player territory
  const isAttackable = useCallback(
    (sector: SectorNode) => {
      if (sector.owner === 'player') return false;
      const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (const [dr, dc] of dirs) {
        const nr = sector.r + dr;
        const nc = sector.c + dc;
        const adj = grid.find((s) => s.r === nr && s.c === nc);
        if (adj && adj.owner === 'player') return true;
      }
      return false;
    },
    [grid]
  );

  // Trigger floating combat effect
  const spawnCombatEffect = (r: number, c: number, text: string, color: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setCombatEffects((prev) => [...prev, { id, r, c, text, color }]);
    setTimeout(() => {
      setCombatEffects((prev) => prev.filter((e) => e.id !== id));
    }, 1200);
  };

  // Add Log Entry
  const addLog = (text: string, type: 'conquest' | 'defense' | 'alert' | 'upgrade') => {
    const now = new Date();
    const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setBattleLogs((prev) => [{ id: `${Date.now()}-${Math.random()}`, time: timeStr, text, type }, ...prev.slice(0, 14)]);
  };

  // 1. Build or Upgrade Defensive Structure on Sector
  const handleConstructBuilding = (buildingType: BuildingType) => {
    if (selectedSector.owner !== 'player') {
      showToast('⚠️ You can only build structures on your conquered territory!', 'warning');
      return;
    }

    const buildingInfo = BUILDINGS[buildingType];
    if (goldBalance < buildingInfo.cost) {
      soundEngine.playClick();
      showToast(`⚠️ Not enough Gold! Need ${buildingInfo.cost} G to construct ${buildingInfo.nameKo}.`, 'warning');
      return;
    }

    soundEngine.playLevelUp();
    setGoldBalance((g) => g - buildingInfo.cost);

    setGrid((prev) =>
      prev.map((s) =>
        s.id === selectedSector.id
          ? {
              ...s,
              building: buildingType,
              level: 1,
              defense: s.defense + buildingInfo.def,
              attackPower: s.attackPower + buildingInfo.atk,
            }
          : s
      )
    );

    spawnCombatEffect(selectedSector.r, selectedSector.c, `+${buildingInfo.nameEn}!`, '#06B6D4');
    addLog(`🏰 Constructed [${buildingInfo.nameKo}] at ${selectedSector.name}!`, 'upgrade');
    showToast(`Built ${buildingInfo.nameKo} on ${selectedSector.name}!`, 'success');
  };

  // 2. Upgrade Existing Building
  const handleUpgradeBuilding = () => {
    if (selectedSector.owner !== 'player') return;
    if (selectedSector.building === 'none') return;
    if (selectedSector.level >= 5) {
      showToast('Building already at MAX Level 5!', 'info');
      return;
    }

    const upgradeCost = selectedSector.level * 140;
    if (goldBalance < upgradeCost) {
      soundEngine.playClick();
      showToast(`⚠️ Need ${upgradeCost} G to upgrade to Level ${selectedSector.level + 1}!`, 'warning');
      return;
    }

    soundEngine.playLevelUp();
    setGoldBalance((g) => g - upgradeCost);

    const bInfo = BUILDINGS[selectedSector.building];
    setGrid((prev) =>
      prev.map((s) =>
        s.id === selectedSector.id
          ? {
              ...s,
              level: s.level + 1,
              hp: 100,
              defense: s.defense + 25,
              attackPower: s.attackPower + 20,
            }
          : s
      )
    );

    spawnCombatEffect(selectedSector.r, selectedSector.c, `LEVEL UP ${selectedSector.level + 1}!`, '#10B981');
    addLog(`✨ Upgraded [${selectedSector.name}] to Citadel Level ${selectedSector.level + 1}!`, 'upgrade');
    showToast(`Upgraded ${selectedSector.name} to Level ${selectedSector.level + 1}!`, 'success');
  };

  // 3. Offensive Assault on Enemy/Neutral Sector
  const handleConquerAssault = (target: SectorNode) => {
    if (playerEnergy < 2) {
      soundEngine.playClick();
      showToast('⚠️ Need 2 Energy AP to launch cyber assault!', 'warning');
      return;
    }

    if (!isAttackable(target)) {
      soundEngine.playClick();
      showToast('⚠️ Can only assault sectors directly adjacent to your territory!', 'warning');
      return;
    }

    soundEngine.playTurretLaser();
    setPlayerEnergy((e) => Math.max(0, e - 2));

    const playerRoll = Math.floor(Math.random() * 30 + 35) + Math.floor(empireStats.totalAtk * 0.1);
    const defenseThreshold = target.defense + (target.owner === 'enemy' ? 25 : 0);

    if (playerRoll >= defenseThreshold || Math.random() < 0.25) {
      // VICTORY!
      soundEngine.playQuestComplete();
      const randomRepo = projects[Math.floor(Math.random() * projects.length)]?.name || 'VibeOS Engine';

      setGrid((prev) =>
        prev.map((s) =>
          s.id === target.id
            ? {
                ...s,
                owner: 'player',
                building: 'none',
                level: 1,
                hp: 100,
                guardianRepo: randomRepo,
                isInvasionTarget: false,
                enemyThreatLevel: 0,
              }
            : s
        )
      );

      const rewardGold = Math.floor(Math.random() * 50 + 60);
      setGoldBalance((g) => g + rewardGold);

      spawnCombatEffect(target.r, target.c, 'CONQUERED! 🚩', '#10B981');
      addLog(`⚔️ CONQUERED Sector [${target.name}]! Assigned Guardian: "${randomRepo}" (+${rewardGold} G)`, 'conquest');
      showToast(`🚩 Captured ${target.name}! Guardian "${randomRepo}" deployed.`, 'success');

      if (dominancePercent >= 90) {
        soundEngine.playLevelUp();
        confetti({
          particleCount: 220,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
        });
        showToast('👑 100% CYBER DOMAIN DOMINANCE ACHIEVED! YOU ARE THE GRAND SOVEREIGN!', 'success');
      }
    } else {
      // Defeat / Repelled
      soundEngine.playExplosion();
      spawnCombatEffect(target.r, target.c, 'REPELLED! ❌', '#EF4444');
      addLog(`❌ Assault on [${target.name}] failed. Enemy Firewall held (${playerRoll} ATK vs ${defenseThreshold} DEF)`, 'alert');
      showToast(`Assault on ${target.name} repelled by enemy defenses!`, 'error');
    }
  };

  // 4. Tactical Superweapon: Orbital Satellite Cannon
  const handleOrbitalStrike = () => {
    if (orbitalCooldown > 0) {
      showToast(`🛰️ Orbital Cannon recharging (${orbitalCooldown} waves remaining)`, 'info');
      return;
    }

    if (selectedSector.owner === 'player') {
      showToast('⚠️ Target an enemy or neutral sector for orbital strike!', 'warning');
      return;
    }

    soundEngine.playExplosion();
    setOrbitalCooldown(3);

    setGrid((prev) =>
      prev.map((s) =>
        s.id === selectedSector.id
          ? {
              ...s,
              defense: Math.max(0, s.defense - 80),
              hp: Math.max(10, s.hp - 70),
            }
          : s
      )
    );

    spawnCombatEffect(selectedSector.r, selectedSector.c, 'ORBITAL NUKE -80 DEF! 💥', '#F43F5E');
    addLog(`🛰️ ORBITAL STRIKE vaporized defenses at [${selectedSector.name}] (-80 DEF, -70 HP)!`, 'conquest');
    showToast(`🛰️ Orbital Laser Strike blasted ${selectedSector.name}!`, 'success');
  };

  // 5. Tactical Superweapon: Tesla Storm EMP Overclock
  const handleTeslaEmp = () => {
    if (playerEnergy < 3) {
      soundEngine.playClick();
      showToast('⚠️ Need 3 Energy AP for Tesla EMP Storm!', 'warning');
      return;
    }

    soundEngine.playTeslaFsdEngage();
    setPlayerEnergy((e) => e - 3);
    setEmpActive(true);

    addLog(`⚡ TESLA EMP OVERCLOCK ACTIVATED! All enemy invasion forces paralyzed for 1 wave!`, 'defense');
    showToast('⚡ Tesla EMP Activated! Incoming raids paralyzed!', 'info');
  };

  // 6. Tactical Superweapon: Nanite Emergency Repair
  const handleNaniteRepair = () => {
    if (goldBalance < 120) {
      showToast('⚠️ Need 120 G for Nanite Full Fleet Repair!', 'warning');
      return;
    }

    soundEngine.playShieldDefend();
    setGoldBalance((g) => g - 120);

    setGrid((prev) =>
      prev.map((s) => (s.owner === 'player' ? { ...s, hp: 100 } : s))
    );

    showToast('🛡️ Nanite Fleet Repaired all player fortresses to 100% HP!', 'success');
  };

  // 7. INVASION WAVE SIMULATION: Next Wave / End Turn
  const handleNextInvasionWave = () => {
    if (isProcessingWave) return;
    setIsProcessingWave(true);
    soundEngine.playInvasionAlarm();

    // 1. Target a random player border sector
    const playerBorderSectors = grid.filter(
      (s) => s.owner === 'player' && isAttackable(s)
    );
    const targetSector =
      playerBorderSectors.length > 0
        ? playerBorderSectors[Math.floor(Math.random() * playerBorderSectors.length)]
        : capturedSectors[0] || grid[0];

    addLog(`🚨 INVASION ALERT: Botnet Wave ${currentWave} attacking [${targetSector.name}]!`, 'alert');

    // Simulate Turret Counter-Fire after brief delay
    setTimeout(() => {
      // Check if Tesla Turrets or Iron Shields defend
      const hasTurrets = capturedSectors.some((s) => s.building === 'tesla_turret');
      const hasShields = targetSector.building === 'iron_shield';

      const enemyAssaultPower = Math.floor(Math.random() * 30 + 20) + currentWave * 12;
      const targetDefense = targetSector.defense + (hasShields ? 60 : 0) + (hasTurrets ? 40 : 0);

      if (empActive) {
        // EMP paralyzed enemies!
        soundEngine.playShieldDefend();
        spawnCombatEffect(targetSector.r, targetSector.c, '⚡ EMP BLOCKED RAID!', '#38BDF8');
        addLog(`🛡️ Tesla EMP completely neutralized Wave ${currentWave} assault on [${targetSector.name}]!`, 'defense');
        setEmpActive(false);
      } else if (hasTurrets || targetDefense >= enemyAssaultPower) {
        // Defended successfully!
        soundEngine.playTurretLaser();
        setTimeout(() => soundEngine.playExplosion(), 200);

        const lootGold = Math.floor(Math.random() * 40 + 50) + currentWave * 10;
        setGoldBalance((g) => g + lootGold + empireStats.goldPerTurn);

        spawnCombatEffect(targetSector.r, targetSector.c, `VICTORY! +${lootGold} G 🏆`, '#10B981');
        addLog(`🏰 DEFENSE SUCCESS: Tesla Turrets obliterated Botnet Wave ${currentWave}! Looted +${lootGold} G.`, 'defense');
        showToast(`🏰 Repelled Wave ${currentWave}! Defense held strong (+${lootGold} G).`, 'success');
      } else {
        // Breached! Damage fortress
        soundEngine.playExplosion();
        const damage = Math.max(15, enemyAssaultPower - targetDefense);

        setGrid((prev) =>
          prev.map((s) =>
            s.id === targetSector.id
              ? {
                  ...s,
                  hp: Math.max(0, s.hp - damage),
                  defense: Math.max(10, s.defense - 15),
                }
              : s
          )
        );

        spawnCombatEffect(targetSector.r, targetSector.c, `-${damage} HP BREACH! 💥`, '#EF4444');
        addLog(`💥 SECTOR DAMAGED: [${targetSector.name}] took -${damage} DMG from Enemy Wave ${currentWave}!`, 'alert');
        showToast(`⚠️ Sector ${targetSector.name} breached! Took -${damage} DMG!`, 'warning');
      }

      // Collect Passive Empire Income
      setGoldBalance((g) => g + empireStats.goldPerTurn);
      setPlayerEnergy(10);
      setCurrentWave((w) => w + 1);
      setOrbitalCooldown((c) => Math.max(0, c - 1));
      setIsProcessingWave(false);
    }, 750);
  };

  return (
    <>
      {/* Dashboard Commercial RTS Banner Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#080D1A] via-[#0E172C] to-[#080D1A] border border-cyan-500/40 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xl relative overflow-hidden group">
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
            <Tower className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                Cyber Fortress : Domain Invasion & Castle Defense RPG
              </h3>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold uppercase">
                Wave {currentWave} (RTS Mode)
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-1">
              {language === 'ko'
                ? `점령률: ${dominancePercent}% (${capturedSectors.length}/36) | 성채 공격력: ${empireStats.totalAtk} ATK | 방어막: ${empireStats.totalDef} DEF | 턴 수익: +${empireStats.goldPerTurn} G`
                : `Dominion: ${dominancePercent}% | Total ATK: ${empireStats.totalAtk} | Total DEF: ${empireStats.totalDef} | Income: +${empireStats.goldPerTurn} G/Wave`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={handleNextInvasionWave}
            disabled={isProcessingWave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold font-mono transition-all shadow-lg shadow-rose-600/30 active:scale-95 disabled:opacity-50"
            title="Trigger Next Enemy Invasion Wave"
          >
            <Skull className="w-4 h-4 text-white animate-bounce" />
            <span>{isProcessingWave ? 'Defending...' : `Wave ${currentWave} Start`}</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playQuestComplete();
              setIsOpenModal(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold font-mono transition-all shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Building className="w-4 h-4" />
            <span>{language === 'ko' ? '포트리스 사령부 입장' : 'Enter Fortress'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Commercial 4X / Tower Defense Command Center Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn font-sans">
          <div className="relative w-full max-w-6xl rounded-3xl bg-[#080D1A] border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
            {/* Header Telemetry Bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                  <Tower className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white font-mono">
                      Cyber Fortress : Territory Defense & RTS Conquest
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold uppercase">
                      Enemy Wave {currentWave}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Construct Tesla Turrets & Iron Shields | Repel Botnet Raids | Expand 36 Sectors
                  </span>
                </div>
              </div>

              {/* Resource Economy */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">{goldBalance} G</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <Swords className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-300 font-bold">{empireStats.totalAtk} ATK</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">{empireStats.totalDef} DEF</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <Flag className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300 font-bold">{dominancePercent}%</span>
                </div>

                <button
                  onClick={handleNextInvasionWave}
                  disabled={isProcessingWave}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold font-mono shadow-md shadow-rose-600/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Skull className="w-3.5 h-3.5" />
                  <span>{isProcessingWave ? 'Defending...' : `Launch Wave ${currentWave}`}</span>
                </button>

                <button
                  onClick={() => setIsOpenModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tactical Game Stage */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
              {/* 6x6 Isometric Cyber Grid Matrix */}
              <div className="bg-slate-950/95 border border-cyan-500/40 rounded-3xl p-3 sm:p-4 shadow-2xl w-full max-w-[500px] aspect-square flex items-center justify-center relative">
                {/* Floating Combat Damage Overlays */}
                {combatEffects.map((eff) => (
                  <div
                    key={eff.id}
                    className="absolute z-30 pointer-events-none font-mono font-extrabold text-xs sm:text-sm animate-bounce drop-shadow-md"
                    style={{
                      left: `${((eff.c + 0.5) / 6) * 100}%`,
                      top: `${((eff.r + 0.2) / 6) * 100}%`,
                      color: eff.color,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {eff.text}
                  </div>
                ))}

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
                    const isEnemy = sector.owner === 'enemy';
                    const canAttack = isAttackable(sector);
                    const buildingInfo = BUILDINGS[sector.building];

                    return (
                      <button
                        key={sector.id}
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedSectorId(sector.id);
                        }}
                        className={`w-full h-full rounded-xl sm:rounded-2xl transition-all duration-200 relative flex flex-col items-center justify-between p-1 sm:p-1.5 border group select-none ${
                          isSelected
                            ? 'scale-105 z-20 border-white shadow-xl shadow-cyan-500/60 ring-2 ring-cyan-400'
                            : isPlayerOwned
                            ? 'border-cyan-500/60 bg-gradient-to-br from-cyan-950/80 via-[#0A1224] to-indigo-950/80 shadow-md shadow-cyan-500/20'
                            : isEnemy
                            ? 'border-rose-500/60 bg-gradient-to-br from-rose-950/80 via-[#1A0A10] to-red-950/80 animate-pulse'
                            : canAttack
                            ? 'border-amber-500/50 bg-slate-900/90 hover:border-amber-400 hover:scale-105 shadow-md shadow-amber-500/20'
                            : 'border-slate-800/80 bg-slate-950/80 opacity-60'
                        }`}
                      >
                        {/* Top Coordinate & Citadel Level */}
                        <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px] font-mono leading-none">
                          <span className="text-slate-400 font-bold">
                            {String.fromCharCode(65 + sector.r)}{sector.c + 1}
                          </span>
                          {isPlayerOwned && sector.building !== 'none' ? (
                            <span className="text-cyan-300 font-extrabold">Lv.{sector.level}</span>
                          ) : (
                            <span className={isEnemy ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                              {sector.defense}
                            </span>
                          )}
                        </div>

                        {/* Center Structure Icon */}
                        <div className="text-sm sm:text-lg transition-transform group-hover:scale-125 drop-shadow-md">
                          {isPlayerOwned ? (
                            <span>{buildingInfo.icon}</span>
                          ) : isEnemy ? (
                            <span className="text-rose-500">👾</span>
                          ) : (
                            <span className="opacity-40">⬛</span>
                          )}
                        </div>

                        {/* Bottom HP / Armor Bar */}
                        <div className="w-full flex items-center justify-center">
                          {isPlayerOwned ? (
                            <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                                style={{ width: `${sector.hp}%` }}
                              />
                            </div>
                          ) : canAttack ? (
                            <span className="text-[7px] sm:text-[8px] text-amber-300 font-bold font-mono uppercase tracking-tighter">
                              ⚔️ TARGET
                            </span>
                          ) : (
                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tactical Fortress Command Panel */}
              <div className="flex-1 w-full space-y-4 font-mono">
                {/* Selected Sector Tactical Dossier */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{BUILDINGS[selectedSector.building].icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {selectedSector.name}
                        </h4>
                        <span className="text-[10px] text-cyan-300">
                          {selectedSector.owner === 'player'
                            ? BUILDINGS[selectedSector.building].nameKo
                            : selectedSector.owner === 'enemy'
                            ? '적군 봇넷 하이브 거점'
                            : '미점령 중립 구역'}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${
                        selectedSector.owner === 'player'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : selectedSector.owner === 'enemy'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {selectedSector.owner === 'player'
                        ? 'Allied Territory'
                        : selectedSector.owner === 'enemy'
                        ? 'Hostile Botnet'
                        : 'Unclaimed Plot'}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col">
                      <span className="text-[10px] text-slate-400">Fortress HP</span>
                      <span className="text-emerald-400 font-bold">{selectedSector.hp}/100</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col">
                      <span className="text-[10px] text-slate-400">Attack Power</span>
                      <span className="text-rose-400 font-bold">
                        {BUILDINGS[selectedSector.building].atk * selectedSector.level + selectedSector.attackPower} ATK
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col">
                      <span className="text-[10px] text-slate-400">Armor Shield</span>
                      <span className="text-cyan-400 font-bold">
                        {BUILDINGS[selectedSector.building].def * selectedSector.level + selectedSector.defense} DEF
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col">
                      <span className="text-[10px] text-slate-400">Citadel Level</span>
                      <span className="text-amber-400 font-bold">Lv. {selectedSector.level}</span>
                    </div>
                  </div>

                  {/* Public Repo Guardian */}
                  {selectedSector.owner === 'player' && (
                    <div className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-indigo-300">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Guardian Fleet Repo:</span>
                      </div>
                      <span className="text-white font-bold">{selectedSector.guardianRepo || 'VibeOS'}</span>
                    </div>
                  )}

                  {/* Construction & Defense Build Options (If player owned) */}
                  {selectedSector.owner === 'player' ? (
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold text-cyan-300 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5" />
                          Construct & Upgrade Defense Structures
                        </span>
                        {selectedSector.building !== 'none' && (
                          <button
                            onClick={handleUpgradeBuilding}
                            disabled={selectedSector.level >= 5}
                            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-[11px] transition-all shadow-md"
                          >
                            {selectedSector.level >= 5 ? 'Max Level 5' : `Upgrade (Lv.${selectedSector.level + 1} : ${selectedSector.level * 140} G)`}
                          </button>
                        )}
                      </div>

                      {/* 5 Building Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {(['nexus', 'tesla_turret', 'iron_shield', 'ai_barracks', 'tech_vault'] as BuildingType[]).map(
                          (bType) => {
                            const b = BUILDINGS[bType];
                            const isCurrent = selectedSector.building === bType;

                            return (
                              <button
                                key={bType}
                                onClick={() => handleConstructBuilding(bType)}
                                className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between ${
                                  isCurrent
                                    ? 'border-cyan-400 bg-cyan-950/60 shadow-md shadow-cyan-500/20'
                                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-800'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-base">{b.icon}</span>
                                  <span className="text-[10px] font-bold text-amber-300">{b.cost} G</span>
                                </div>
                                <div>
                                  <div className="text-[11px] font-bold text-white leading-tight mt-1 truncate">{b.nameKo}</div>
                                  <div className="text-[9px] text-slate-400 line-clamp-1">{b.descKo}</div>
                                </div>
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Assault Command on Hostile/Neutral Sector */
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <button
                        onClick={() => handleConquerAssault(selectedSector)}
                        disabled={!isAttackable(selectedSector)}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold shadow-lg transition-all ${
                          isAttackable(selectedSector)
                            ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-rose-500 text-white shadow-rose-600/30 hover:scale-[1.01] active:scale-95'
                            : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                        }`}
                      >
                        <Swords className="w-4 h-4" />
                        <span>
                          {isAttackable(selectedSector)
                            ? `Assault & Conquer Sector (Cost 2 AP)`
                            : 'Must be adjacent to player territory'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Tactical Superweapons Bar */}
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                    Commander Skills:
                  </span>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleOrbitalStrike}
                      disabled={orbitalCooldown > 0}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold transition-all disabled:opacity-40"
                      title="Launch Orbital Laser Strike (-80 DEF)"
                    >
                      <Satellite className="w-3.5 h-3.5" />
                      <span>{orbitalCooldown > 0 ? `Orbital (${orbitalCooldown}w)` : '🛰️ Orbital Strike'}</span>
                    </button>

                    <button
                      onClick={handleTeslaEmp}
                      disabled={playerEnergy < 3}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold transition-all disabled:opacity-40"
                      title="Paralyze all incoming raids for 1 wave (Cost 3 AP)"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Tesla EMP (3 AP)</span>
                    </button>

                    <button
                      onClick={handleNaniteRepair}
                      disabled={goldBalance < 120}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold transition-all disabled:opacity-40"
                      title="Repair all player structures to 100% HP (Cost 120 G)"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>🛡️ Repair Fleet (120 G)</span>
                    </button>
                  </div>
                </div>

                {/* Real-time Combat Dispatch Logs */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold border-b border-slate-800 pb-1">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      Live Fortress Combat Dispatch
                    </span>
                    <span>RTS Feed</span>
                  </div>

                  <div className="space-y-1 max-h-28 overflow-y-auto text-[11px] text-slate-300">
                    {battleLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`leading-snug truncate ${
                          log.type === 'alert'
                            ? 'text-rose-400 font-bold'
                            : log.type === 'conquest'
                            ? 'text-emerald-400 font-bold'
                            : log.type === 'upgrade'
                            ? 'text-cyan-300'
                            : 'text-slate-300'
                        }`}
                      >
                        <span className="text-slate-500 mr-1.5">[{log.time}]</span>
                        {log.text}
                      </div>
                    ))}
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
