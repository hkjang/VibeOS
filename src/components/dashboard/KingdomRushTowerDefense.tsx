import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';
import {
  Shield,
  Zap,
  Swords,
  Sparkles,
  Flame,
  Heart,
  Crown,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Maximize2,
  X,
  Target,
  Users,
  ChevronRight,
  Crosshair,
  Award,
} from 'lucide-react';

export type TowerType = 'archer' | 'barracks' | 'mage' | 'artillery';
export type EnemyType = 'goblin' | 'orc' | 'flying' | 'shaman' | 'boss';

interface Waypoint {
  x: number;
  y: number;
}

interface TowerSlot {
  id: number;
  x: number;
  y: number;
  type: TowerType | null;
  level: number; // 1 to 4
  range: number;
  damage: number;
  rate: number; // attack cooldown ticks
  cooldown: number;
  rallyPoint: { x: number; y: number };
}

interface Soldier {
  id: string;
  towerId: number;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  targetEnemyId: string | null;
  respawnTimer: number;
}

interface Enemy {
  id: string;
  type: EnemyType;
  x: number;
  y: number;
  waypointIndex: number;
  hp: number;
  maxHp: number;
  speed: number;
  armor: number; // 0 to 0.7 damage reduction
  magicResist: number;
  isFlying: boolean;
  rewardGold: number;
  blockedBySoldierId: string | null;
  attackCooldown: number;
}

interface Projectile {
  id: string;
  type: 'arrow' | 'magic' | 'bomb';
  startX: number;
  startY: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  targetEnemyId: string | null;
  progress: number;
  speed: number;
  damage: number;
  splashRadius?: number;
}

interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

// Kingdom Rush Winding Valley Road Waypoints (Relative 0..800 x 0..500)
const PATH_WAYPOINTS: Waypoint[] = [
  { x: 20, y: 180 },
  { x: 160, y: 180 },
  { x: 240, y: 120 },
  { x: 420, y: 120 },
  { x: 480, y: 240 },
  { x: 300, y: 280 },
  { x: 220, y: 380 },
  { x: 480, y: 400 },
  { x: 640, y: 320 },
  { x: 780, y: 320 },
];

// 8 Strategic Tower Building Plots
const INITIAL_TOWER_SLOTS: TowerSlot[] = [
  { id: 1, x: 190, y: 90, type: null, level: 1, range: 110, damage: 12, rate: 25, cooldown: 0, rallyPoint: { x: 200, y: 150 } },
  { id: 2, x: 200, y: 230, type: null, level: 1, range: 110, damage: 12, rate: 25, cooldown: 0, rallyPoint: { x: 200, y: 180 } },
  { id: 3, x: 360, y: 70, type: null, level: 1, range: 110, damage: 12, rate: 25, cooldown: 0, rallyPoint: { x: 360, y: 120 } },
  { id: 4, x: 430, y: 190, type: null, level: 1, range: 110, damage: 12, rate: 25, cooldown: 0, rallyPoint: { x: 460, y: 200 } },
  { id: 5, x: 380, y: 340, type: null, level: 1, range: 110, damage: 12, rate: 25, cooldown: 0, rallyPoint: { x: 350, y: 290 } },
  { id: 6, x: 160, y: 360, type: null, level: 1, range: 110, damage: 12, rate: 25, cooldown: 0, rallyPoint: { x: 220, y: 380 } },
  { id: 7, x: 550, y: 350, type: null, level: 1, range: 110, damage: 12, rate: 25, cooldown: 0, rallyPoint: { x: 540, y: 370 } },
  { id: 8, x: 620, y: 250, type: null, level: 1, range: 110, damage: 12, rate: 25, cooldown: 0, rallyPoint: { x: 640, y: 320 } },
];

export const TOWER_INFO: Record<
  TowerType,
  { nameKo: string; nameEn: string; icon: string; color: string; descKo: string; cost: number; baseDmg: number; range: number; rate: number }
> = {
  archer: {
    nameKo: '궁수 타워 (Archer)',
    nameEn: 'Marksman Tower',
    icon: '🏹',
    color: '#10B981',
    descKo: '빠른 연사 속도와 비행 유닛 요격에 탁월한 관통 사격',
    cost: 70,
    baseDmg: 14,
    range: 125,
    rate: 22,
  },
  barracks: {
    nameKo: '기사단 병영 (Barracks)',
    nameEn: 'Soldier Garrison',
    icon: '🛡️',
    color: '#3B82F6',
    descKo: '도로에 3명의 성기사를 출격시켜 몬스터를 물리적으로 저지 & 백병전',
    cost: 70,
    baseDmg: 8,
    range: 100,
    rate: 30,
  },
  mage: {
    nameKo: '아케인 마법사 (Mage)',
    nameEn: 'Arcane Mage Tower',
    icon: '🧙',
    color: '#8B5CF6',
    descKo: '철갑을 두른 오크와 거대 골렘의 물리 방어력을 무시하는 마법 빔',
    cost: 100,
    baseDmg: 32,
    range: 115,
    rate: 45,
  },
  artillery: {
    nameKo: '박격포 대포 (Artillery)',
    nameEn: 'Dwarven Bombard',
    icon: '💣',
    color: '#F59E0B',
    descKo: '광역 폭발 스플래시 피해로 떼지어 오는 적군 무리를 한 번에 섬멸',
    cost: 125,
    baseDmg: 48,
    range: 105,
    rate: 65,
  },
};

export const KingdomRushTowerDefense: React.FC = () => {
  const { projects, showToast } = useVibeStore();
  const { language } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [gold, setGold] = useState<number>(220);
  const [hearts, setHearts] = useState<number>(20);
  const [wave, setWave] = useState<number>(1);
  const [isWaveActive, setIsWaveActive] = useState<boolean>(false);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  // Spells Cooldown
  const [meteorCooldown, setMeteorCooldown] = useState<number>(0);
  const [reinforceCooldown, setReinforceCooldown] = useState<number>(0);
  const [activeSpell, setActiveSpell] = useState<'meteor' | 'reinforce' | null>(null);

  // Hero Unit (Grand Architect Paladin)
  const [heroPos, setHeroPos] = useState<{ x: number; y: number; hp: number; maxHp: number }>({
    x: 480,
    y: 240,
    hp: 250,
    maxHp: 250,
  });

  // Dynamic Game State Refs for 60FPS loop
  const towersRef = useRef<TowerSlot[]>(INITIAL_TOWER_SLOTS);
  const soldiersRef = useRef<Soldier[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Trigger Meteor Rain of Fire
  const castMeteor = useCallback((targetX: number, targetY: number) => {
    soundEngine.playMeteorImpact();
    floatingTextsRef.current.push({
      id: `${Date.now()}`,
      x: targetX,
      y: targetY - 20,
      text: 'METEOR SHOWER! ☄️',
      color: '#EF4444',
      life: 40,
    });

    // Damage all enemies in 120px radius
    enemiesRef.current.forEach((enemy) => {
      const dist = Math.hypot(enemy.x - targetX, enemy.y - targetY);
      if (dist < 120) {
        enemy.hp -= 90;
        floatingTextsRef.current.push({
          id: `${Math.random()}`,
          x: enemy.x,
          y: enemy.y,
          text: '-90 FIRE DMG!',
          color: '#F97316',
          life: 30,
        });
      }
    });

    setMeteorCooldown(30);
    setActiveSpell(null);
    showToast('☄️ Rain of Fire scorched the battlefield!', 'success');
  }, [showToast]);

  // Trigger Call Reinforcements
  const castReinforce = useCallback((targetX: number, targetY: number) => {
    soundEngine.playQuestComplete();
    soldiersRef.current.push(
      {
        id: `militia-1-${Date.now()}`,
        towerId: -1,
        x: targetX - 10,
        y: targetY,
        hp: 80,
        maxHp: 80,
        targetEnemyId: null,
        respawnTimer: 0,
      },
      {
        id: `militia-2-${Date.now()}`,
        towerId: -1,
        x: targetX + 10,
        y: targetY,
        hp: 80,
        maxHp: 80,
        targetEnemyId: null,
        respawnTimer: 0,
      }
    );

    floatingTextsRef.current.push({
      id: `${Date.now()}`,
      x: targetX,
      y: targetY - 15,
      text: 'REINFORCEMENTS! 🛡️',
      color: '#38BDF8',
      life: 35,
    });

    setReinforceCooldown(18);
    setActiveSpell(null);
    showToast('🛡️ Militia squad dispatched to hold the road!', 'info');
  }, [showToast]);

  // Start Next Monster Wave
  const startNextWave = useCallback(() => {
    if (isWaveActive) return;
    setIsWaveActive(true);
    soundEngine.playInvasionAlarm();

    const waveEnemies: Enemy[] = [];
    const count = 6 + wave * 3;
    const hasBoss = wave % 5 === 0;

    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      let type: EnemyType = 'goblin';
      let hp = 45 + wave * 12;
      let speed = 1.6;
      let armor = 0;
      let magicResist = 0;
      let isFlying = false;
      let rewardGold = 12;

      if (typeRand > 0.75) {
        type = 'orc';
        hp = 110 + wave * 25;
        speed = 0.9;
        armor = 0.5; // 50% armor
        rewardGold = 25;
      } else if (typeRand > 0.55 && wave >= 2) {
        type = 'flying';
        hp = 50 + wave * 10;
        speed = 1.8;
        isFlying = true;
        rewardGold = 18;
      } else if (typeRand > 0.4 && wave >= 3) {
        type = 'shaman';
        hp = 90 + wave * 15;
        speed = 1.1;
        magicResist = 0.4;
        rewardGold = 22;
      }

      waveEnemies.push({
        id: `wave-${wave}-enemy-${i}`,
        type,
        x: PATH_WAYPOINTS[0].x - i * 35,
        y: PATH_WAYPOINTS[0].y + (Math.random() * 12 - 6),
        waypointIndex: 1,
        hp,
        maxHp: hp,
        speed,
        armor,
        magicResist,
        isFlying,
        rewardGold,
        blockedBySoldierId: null,
        attackCooldown: 0,
      });
    }

    if (hasBoss) {
      waveEnemies.push({
        id: `wave-${wave}-BOSS`,
        type: 'boss',
        x: PATH_WAYPOINTS[0].x - (count + 1) * 35,
        y: PATH_WAYPOINTS[0].y,
        waypointIndex: 1,
        hp: 500 + wave * 150,
        maxHp: 500 + wave * 150,
        speed: 0.65,
        armor: 0.4,
        magicResist: 0.3,
        isFlying: false,
        rewardGold: 100,
        blockedBySoldierId: null,
        attackCooldown: 0,
      });
    }

    enemiesRef.current = waveEnemies;
    showToast(`⚔️ Kingdom Rush Wave ${wave} Spawning! Defend the Crystal Core!`, 'warning');
  }, [wave, isWaveActive, showToast]);

  // Main 60FPS Game Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = 800);
    let height = (canvas.height = 500);

    const gameLoop = () => {
      if (isPlaying) {
        // 1. Move Enemies along path
        const enemies = enemiesRef.current;
        for (let i = enemies.length - 1; i >= 0; i--) {
          const e = enemies[i];

          // If blocked in melee combat by soldier or hero, fight instead of moving
          if (e.blockedBySoldierId) {
            e.attackCooldown--;
            if (e.attackCooldown <= 0) {
              e.attackCooldown = 40;
              // Deal damage to soldier
              const s = soldiersRef.current.find((sol) => sol.id === e.blockedBySoldierId);
              if (s) {
                s.hp -= 15;
                if (s.hp <= 0) {
                  e.blockedBySoldierId = null;
                  s.respawnTimer = 180;
                }
              } else {
                e.blockedBySoldierId = null;
              }
            }
            continue;
          }

          const targetWp = PATH_WAYPOINTS[e.waypointIndex];
          if (!targetWp) {
            // Reached Kingdom Gate! Lose Life
            soundEngine.playExplosion();
            setHearts((h) => {
              const nextH = Math.max(0, h - (e.type === 'boss' ? 5 : 1));
              if (nextH === 0) {
                showToast('💀 DEFEAT: Kingdom has fallen to the horde!', 'error');
              }
              return nextH;
            });
            enemies.splice(i, 1);
            continue;
          }

          const dx = targetWp.x - e.x;
          const dy = targetWp.y - e.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 8) {
            e.waypointIndex++;
          } else {
            e.x += (dx / dist) * e.speed;
            e.y += (dy / dist) * e.speed;
          }

          // Check if enemy steps into melee range of any idle soldier on road
          if (!e.isFlying) {
            for (const s of soldiersRef.current) {
              if (s.hp > 0 && !s.targetEnemyId && Math.hypot(s.x - e.x, s.y - e.y) < 22) {
                e.blockedBySoldierId = s.id;
                s.targetEnemyId = e.id;
                break;
              }
            }
          }
        }

        // 2. Tower Target Acquisition & Firing
        towersRef.current.forEach((t) => {
          if (!t.type) return;

          // Spawn Barracks soldiers if needed
          if (t.type === 'barracks') {
            const existing = soldiersRef.current.filter((s) => s.towerId === t.id);
            if (existing.length < 3) {
              for (let k = existing.length; k < 3; k++) {
                soldiersRef.current.push({
                  id: `sol-${t.id}-${k}`,
                  towerId: t.id,
                  x: t.rallyPoint.x + (k - 1) * 14,
                  y: t.rallyPoint.y + (k % 2) * 8,
                  hp: 100 * t.level,
                  maxHp: 100 * t.level,
                  targetEnemyId: null,
                  respawnTimer: 0,
                });
              }
            }
            return;
          }

          t.cooldown--;
          if (t.cooldown > 0) return;

          // Find target enemy in range
          const candidate = enemies.find((e) => {
            if (e.isFlying && t.type === 'artillery') return false; // artillery can't hit flyers
            return Math.hypot(e.x - t.x, e.y - t.y) <= t.range;
          });

          if (candidate) {
            t.cooldown = t.rate;

            if (t.type === 'archer') {
              soundEngine.playArrowShot();
              projectilesRef.current.push({
                id: `arrow-${Date.now()}-${Math.random()}`,
                type: 'arrow',
                startX: t.x,
                startY: t.y,
                x: t.x,
                y: t.y,
                targetX: candidate.x,
                targetY: candidate.y,
                targetEnemyId: candidate.id,
                progress: 0,
                speed: 0.12,
                damage: t.damage * t.level,
              });
            } else if (t.type === 'mage') {
              soundEngine.playMagicZap();
              projectilesRef.current.push({
                id: `mage-${Date.now()}-${Math.random()}`,
                type: 'magic',
                startX: t.x,
                startY: t.y,
                x: t.x,
                y: t.y,
                targetX: candidate.x,
                targetY: candidate.y,
                targetEnemyId: candidate.id,
                progress: 0,
                speed: 0.16,
                damage: t.damage * t.level,
              });
            } else if (t.type === 'artillery') {
              soundEngine.playCannonBlast();
              projectilesRef.current.push({
                id: `bomb-${Date.now()}-${Math.random()}`,
                type: 'bomb',
                startX: t.x,
                startY: t.y,
                x: t.x,
                y: t.y,
                targetX: candidate.x,
                targetY: candidate.y,
                targetEnemyId: null,
                progress: 0,
                speed: 0.06,
                damage: t.damage * t.level,
                splashRadius: 55,
              });
            }
          }
        });

        // 3. Update Projectiles
        const projs = projectilesRef.current;
        for (let pIdx = projs.length - 1; pIdx >= 0; pIdx--) {
          const p = projs[pIdx];
          p.progress += p.speed;

          p.x = p.startX + (p.targetX - p.startX) * p.progress;
          p.y = p.startY + (p.targetY - p.startY) * p.progress;

          if (p.progress >= 1) {
            // Impact!
            if (p.type === 'bomb') {
              soundEngine.playExplosion();
              // AOE Splash
              enemies.forEach((en) => {
                if (Math.hypot(en.x - p.targetX, en.y - p.targetY) <= (p.splashRadius || 50)) {
                  en.hp -= p.damage;
                  floatingTextsRef.current.push({
                    id: `${Math.random()}`,
                    x: en.x,
                    y: en.y - 10,
                    text: `-${p.damage} BOOM!`,
                    color: '#F59E0B',
                    life: 25,
                  });
                }
              });
            } else if (p.targetEnemyId) {
              const victim = enemies.find((e) => e.id === p.targetEnemyId);
              if (victim) {
                const effDmg = p.type === 'magic' ? p.damage : Math.round(p.damage * (1 - victim.armor));
                victim.hp -= effDmg;
                floatingTextsRef.current.push({
                  id: `${Math.random()}`,
                  x: victim.x,
                  y: victim.y - 10,
                  text: `-${effDmg}`,
                  color: p.type === 'magic' ? '#A855F7' : '#10B981',
                  life: 25,
                });
              }
            }
            projs.splice(pIdx, 1);
          }
        }

        // 4. Soldier Melee Combat & Respawn
        soldiersRef.current.forEach((s) => {
          if (s.hp <= 0) {
            s.respawnTimer--;
            if (s.respawnTimer <= 0) {
              s.hp = s.maxHp;
            }
            return;
          }

          if (s.targetEnemyId) {
            const enemy = enemies.find((e) => e.id === s.targetEnemyId);
            if (!enemy || enemy.hp <= 0) {
              s.targetEnemyId = null;
            } else {
              // Deal melee sword damage
              if (Math.random() < 0.08) {
                enemy.hp -= 12;
                floatingTextsRef.current.push({
                  id: `${Math.random()}`,
                  x: s.x,
                  y: s.y - 12,
                  text: '-12 SWORD!',
                  color: '#38BDF8',
                  life: 20,
                });
              }
            }
          }
        });

        // 5. Clean Dead Enemies & Reward Gold
        for (let i = enemies.length - 1; i >= 0; i--) {
          const en = enemies[i];
          if (en.hp <= 0) {
            setGold((g) => g + en.rewardGold);
            floatingTextsRef.current.push({
              id: `${Math.random()}`,
              x: en.x,
              y: en.y,
              text: `+${en.rewardGold} G`,
              color: '#FBBF24',
              life: 30,
            });
            enemies.splice(i, 1);
          }
        }

        // Check Wave Victory
        if (isWaveActive && enemies.length === 0) {
          setIsWaveActive(false);
          soundEngine.playLevelUp();
          setWave((w) => w + 1);
          setGold((g) => g + 50);

          if (wave >= 10) {
            confetti({
              particleCount: 250,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
            });
            showToast('👑 KINGDOM DEFENDED! ALL 10 WAVES DEFEATED! 3-STAR VICTORY! 🏆', 'success');
          } else {
            showToast(`🏆 Wave ${wave} Cleared! +50 Gold Reward!`, 'success');
          }
        }
      }

      // ==========================================
      // RENDER CANVAS (Kingdom Rush Visuals)
      // ==========================================
      ctx.clearRect(0, 0, width, height);

      // 1. Background Grassland Terrain
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, width, height);

      // Subtle topographic lines
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Winding Dirt / Cobblestone Road
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Road Outer Border
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 42;
      ctx.beginPath();
      ctx.moveTo(PATH_WAYPOINTS[0].x, PATH_WAYPOINTS[0].y);
      for (let i = 1; i < PATH_WAYPOINTS.length; i++) {
        ctx.lineTo(PATH_WAYPOINTS[i].x, PATH_WAYPOINTS[i].y);
      }
      ctx.stroke();

      // Road Inner Sand/Path
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 36;
      ctx.stroke();
      ctx.restore();

      // Kingdom Core Gate (Goal)
      ctx.fillStyle = '#06B6D4';
      ctx.shadowColor = '#06B6D4';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(PATH_WAYPOINTS[PATH_WAYPOINTS.length - 1].x, PATH_WAYPOINTS[PATH_WAYPOINTS.length - 1].y, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CORE', PATH_WAYPOINTS[PATH_WAYPOINTS.length - 1].x, PATH_WAYPOINTS[PATH_WAYPOINTS.length - 1].y + 4);

      // 3. Draw Tower Slots & Towers
      towersRef.current.forEach((slot) => {
        const isSelected = selectedSlotId === slot.id;

        if (!slot.type) {
          // Empty Plot
          ctx.fillStyle = isSelected ? '#06B6D4' : '#1E293B';
          ctx.strokeStyle = isSelected ? '#FFFFFF' : '#475569';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(slot.x, slot.y, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#94A3B8';
          ctx.font = 'bold 14px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('+', slot.x, slot.y + 5);
        } else {
          // Built Tower
          const info = TOWER_INFO[slot.type];
          ctx.fillStyle = info.color;
          ctx.shadowColor = info.color;
          ctx.shadowBlur = isSelected ? 16 : 6;

          ctx.beginPath();
          ctx.arc(slot.x, slot.y, 20, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Tower Icon / Level
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '16px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(info.icon, slot.x, slot.y + 6);

          // Level Badge
          ctx.fillStyle = '#0F172A';
          ctx.beginPath();
          ctx.arc(slot.x + 12, slot.y - 12, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#38BDF8';
          ctx.font = 'bold 9px monospace';
          ctx.fillText(`L${slot.level}`, slot.x + 12, slot.y - 9);

          // Range circle when selected
          if (isSelected) {
            ctx.strokeStyle = `${info.color}55`;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(slot.x, slot.y, slot.range, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      });

      // 4. Draw Barracks Soldiers
      soldiersRef.current.forEach((s) => {
        if (s.hp <= 0) return;
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Mini Soldier HP Bar
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(s.x - 7, s.y - 10, 14, 2.5);
        ctx.fillStyle = '#10B981';
        ctx.fillRect(s.x - 7, s.y - 10, (s.hp / s.maxHp) * 14, 2.5);
      });

      // 5. Draw Hero Champion
      ctx.save();
      ctx.fillStyle = '#F59E0B';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(heroPos.x, heroPos.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#000000';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👑', heroPos.x, heroPos.y + 3);
      ctx.restore();

      // 6. Draw Enemies
      enemiesRef.current.forEach((en) => {
        const isBoss = en.type === 'boss';
        ctx.fillStyle = isBoss ? '#E11D48' : en.type === 'orc' ? '#D97706' : en.type === 'flying' ? '#06B6D4' : '#10B981';

        ctx.beginPath();
        ctx.arc(en.x, en.y, isBoss ? 16 : 8, 0, Math.PI * 2);
        ctx.fill();

        // Enemy HP Bar
        const barWidth = isBoss ? 32 : 16;
        ctx.fillStyle = '#334155';
        ctx.fillRect(en.x - barWidth / 2, en.y - (isBoss ? 24 : 14), barWidth, 3);
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(en.x - barWidth / 2, en.y - (isBoss ? 24 : 14), (en.hp / en.maxHp) * barWidth, 3);
      });

      // 7. Draw Projectiles
      projectilesRef.current.forEach((p) => {
        if (p.type === 'arrow') {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 4, p.y - 4);
          ctx.stroke();
        } else if (p.type === 'magic') {
          ctx.fillStyle = '#A855F7';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'bomb') {
          ctx.fillStyle = '#F59E0B';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 8. Draw Floating Damage Texts
      const fTexts = floatingTextsRef.current;
      for (let fIdx = fTexts.length - 1; fIdx >= 0; fIdx--) {
        const ft = fTexts[fIdx];
        ft.life--;
        ft.y -= 0.6;
        ctx.fillStyle = ft.color;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        if (ft.life <= 0) fTexts.splice(fIdx, 1);
      }

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    // Canvas Click Listener (Build Tower / Cast Spell / Move Hero)
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const cx = (e.clientX - rect.left) * scaleX;
      const cy = (e.clientY - rect.top) * scaleY;

      // Spell casting
      if (activeSpell === 'meteor') {
        castMeteor(cx, cy);
        return;
      }
      if (activeSpell === 'reinforce') {
        castReinforce(cx, cy);
        return;
      }

      // Check click on tower slot
      let clickedSlot = null;
      for (const slot of towersRef.current) {
        if (Math.hypot(slot.x - cx, slot.y - cy) < 26) {
          clickedSlot = slot.id;
          break;
        }
      }

      if (clickedSlot) {
        soundEngine.playClick();
        setSelectedSlotId(clickedSlot);
      } else {
        // Move Hero to tapped road position
        soundEngine.playTeslaDrive();
        setHeroPos((prev) => ({ ...prev, x: cx, y: cy }));
        setSelectedSlotId(null);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isWaveActive, wave, selectedSlotId, activeSpell, heroPos, castMeteor, castReinforce, showToast]);

  // Build Tower Action
  const handleBuildTower = (type: TowerType) => {
    if (!selectedSlotId) return;
    const info = TOWER_INFO[type];
    if (gold < info.cost) {
      soundEngine.playClick();
      showToast(`⚠️ Need ${info.cost} G to build ${info.nameKo}!`, 'warning');
      return;
    }

    soundEngine.playLevelUp();
    setGold((g) => g - info.cost);

    const slot = towersRef.current.find((s) => s.id === selectedSlotId);
    if (slot) {
      slot.type = type;
      slot.level = 1;
      slot.damage = info.baseDmg;
      slot.range = info.range;
      slot.rate = info.rate;
    }

    setSelectedSlotId(null);
    showToast(`Built ${info.nameKo}!`, 'success');
  };

  // Upgrade Tower Action
  const handleUpgradeTower = () => {
    if (!selectedSlotId) return;
    const slot = towersRef.current.find((s) => s.id === selectedSlotId);
    if (!slot || !slot.type) return;

    if (slot.level >= 4) {
      showToast('Tower already at MAX Level 4!', 'info');
      return;
    }

    const upgradeCost = slot.level * 90;
    if (gold < upgradeCost) {
      soundEngine.playClick();
      showToast(`⚠️ Need ${upgradeCost} G to upgrade!`, 'warning');
      return;
    }

    soundEngine.playLevelUp();
    setGold((g) => g - upgradeCost);
    slot.level++;
    slot.damage += Math.round(slot.damage * 0.6);
    slot.range += 12;

    showToast(`Upgraded to Level ${slot.level}!`, 'success');
  };

  // Sell Tower
  const handleSellTower = () => {
    if (!selectedSlotId) return;
    const slot = towersRef.current.find((s) => s.id === selectedSlotId);
    if (!slot || !slot.type) return;

    soundEngine.playClick();
    setGold((g) => g + 40);
    slot.type = null;
    slot.level = 1;
    setSelectedSlotId(null);
    showToast('Tower Sold (+40 G)', 'info');
  };

  const selectedSlot = towersRef.current.find((s) => s.id === selectedSlotId);

  return (
    <>
      {/* Dashboard Launcher Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0C1322] via-[#101B30] to-[#0C1322] border border-cyan-500/40 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xl relative overflow-hidden group">
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
            <Crown className="w-6 h-6 text-amber-400 animate-bounce" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                Kingdom Rush : Cyber Tower Defense (킹덤 러쉬 타워 디펜스)
              </h3>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold uppercase">
                Wave {wave}/10
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-1">
              {language === 'ko'
                ? `실시간 궁수·병영·마법사·대포 타워 건설, 영웅 조작, 메테오 폭격 및 몬스터 웨이브 방어`
                : `Real-time Kingdom Rush Tower Defense: Archers, Barracks, Mages, Artillery & Meteors`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => {
              soundEngine.playQuestComplete();
              setIsOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold font-mono transition-all shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Swords className="w-4 h-4" />
            <span>{language === 'ko' ? '킹덤 러쉬 게임 시작' : 'Launch Kingdom Rush'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Fullscreen / Modal Kingdom Rush Station */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn font-sans">
          <div className="relative w-full max-w-5xl rounded-3xl bg-[#090D18] border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
            {/* Header Telemetry Bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white">
                      Kingdom Rush : Cyber Tower Defense
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Wave {wave}/10
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Click plot to build towers | Tap road to move Hero Champion | Cast Spells
                  </span>
                </div>
              </div>

              {/* Economy Bar */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">{gold} G</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-300 font-bold">{hearts} Lives</span>
                </div>

                <button
                  onClick={startNextWave}
                  disabled={isWaveActive}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>{isWaveActive ? 'Defending Wave...' : `Start Wave ${wave}`}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stage Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center gap-4">
              {/* Canvas 800x500 Winding Valley Stage */}
              <div className="w-full max-w-4xl aspect-[8/5] rounded-2xl bg-slate-950 border border-cyan-500/40 overflow-hidden shadow-2xl relative">
                <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

                {/* Spells Floating Toolbar on Canvas Bottom-Left */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 font-mono">
                  {/* Meteor Rain of Fire */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveSpell(activeSpell === 'meteor' ? null : 'meteor');
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold backdrop-blur-md transition-all ${
                      activeSpell === 'meteor'
                        ? 'bg-rose-600 text-white border-white scale-110 shadow-lg shadow-rose-600/50 ring-2 ring-white'
                        : 'bg-slate-950/80 border-rose-500/40 text-rose-300 hover:bg-slate-900'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>☄️ Rain of Fire</span>
                  </button>

                  {/* Call Reinforcements */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveSpell(activeSpell === 'reinforce' ? null : 'reinforce');
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold backdrop-blur-md transition-all ${
                      activeSpell === 'reinforce'
                        ? 'bg-cyan-600 text-white border-white scale-110 shadow-lg shadow-cyan-600/50 ring-2 ring-white'
                        : 'bg-slate-950/80 border-cyan-500/40 text-cyan-300 hover:bg-slate-900'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span>🛡️ Reinforce</span>
                  </button>
                </div>
              </div>

              {/* Tower Build & Upgrade Bottom Bar */}
              {selectedSlotId && (
                <div className="w-full max-w-4xl p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono animate-fadeIn">
                  {!selectedSlot?.type ? (
                    /* Build Menu: 4 Classic Towers */
                    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-xs font-bold text-slate-300">
                        Plot #{selectedSlotId} Selected — Choose Tower to Construct:
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {(['archer', 'barracks', 'mage', 'artillery'] as TowerType[]).map((tType) => {
                          const tInfo = TOWER_INFO[tType];
                          return (
                            <button
                              key={tType}
                              onClick={() => handleBuildTower(tType)}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-bold text-white transition-all shadow-md active:scale-95"
                            >
                              <span>{tInfo.icon}</span>
                              <span>{tInfo.nameEn}</span>
                              <span className="text-amber-400 font-extrabold">{tInfo.cost} G</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Upgrade Menu for Existing Tower */
                    <div className="w-full flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-base">{TOWER_INFO[selectedSlot.type].icon}</span>
                        <span className="font-bold text-white">
                          {TOWER_INFO[selectedSlot.type].nameKo} (Level {selectedSlot.level})
                        </span>
                        <span className="text-slate-400">
                          Damage: {selectedSlot.damage * selectedSlot.level} | Range: {selectedSlot.range}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleUpgradeTower}
                          disabled={selectedSlot.level >= 4}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all"
                        >
                          {selectedSlot.level >= 4
                            ? 'Max Level 4'
                            : `Upgrade to L${selectedSlot.level + 1} (${selectedSlot.level * 90} G)`}
                        </button>

                        <button
                          onClick={handleSellTower}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 text-xs font-bold transition-all"
                        >
                          Sell Tower (+40 G)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
