import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
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
  MapPin,
  Compass,
  ArrowRight,
} from 'lucide-react';

export type TowerType = 'archer' | 'barracks' | 'mage' | 'artillery';
export type EnemyType = 'goblin' | 'orc' | 'flying' | 'shaman' | 'boss';
export type HeroType = 'paladin' | 'ranger' | 'archmage';

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

// 4대 테마 스테이지 정보
interface StageConfig {
  id: number;
  name: string;
  desc: string;
  theme: 'forest' | 'volcano' | 'snow' | 'abyss';
  bgColor: string;
  roadColor: string;
  roadBorder: string;
  waypoints: Waypoint[];
  slots: TowerSlot[];
  maxWaves: number;
  bossName: string;
}

const STAGES: StageConfig[] = [
  {
    id: 1,
    name: '제1관문: 비취 숲길 협곡',
    desc: '울창한 숲속 샛길을 따라 고블린 정찰대와 오크 선봉대가 침공합니다.',
    theme: 'forest',
    bgColor: '#0F1F18',
    roadColor: '#2D3E33',
    roadBorder: '#1A2920',
    maxWaves: 6,
    bossName: '거대 오크 족장 그롬마쉬',
    waypoints: [
      { x: 20, y: 180 },
      { x: 180, y: 180 },
      { x: 260, y: 120 },
      { x: 420, y: 120 },
      { x: 490, y: 240 },
      { x: 320, y: 290 },
      { x: 240, y: 380 },
      { x: 490, y: 400 },
      { x: 650, y: 320 },
      { x: 780, y: 320 },
    ],
    slots: [
      { id: 1, x: 200, y: 90, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 210, y: 150 } },
      { id: 2, x: 210, y: 230, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 210, y: 180 } },
      { id: 3, x: 370, y: 70, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 370, y: 120 } },
      { id: 4, x: 440, y: 190, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 470, y: 200 } },
      { id: 5, x: 390, y: 340, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 360, y: 290 } },
      { id: 6, x: 170, y: 360, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 230, y: 380 } },
      { id: 7, x: 560, y: 350, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 550, y: 370 } },
      { id: 8, x: 630, y: 250, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 650, y: 320 } },
    ],
  },
  {
    id: 2,
    name: '제2관문: 용암 마그마 협곡',
    desc: '붉은 용암이 끓어오르는 대지 위로 철갑 오크 군단이 돌파를 시도합니다.',
    theme: 'volcano',
    bgColor: '#1F0F0F',
    roadColor: '#3E2424',
    roadBorder: '#291414',
    maxWaves: 8,
    bossName: '화염 골렘 이그니스',
    waypoints: [
      { x: 20, y: 120 },
      { x: 220, y: 120 },
      { x: 320, y: 250 },
      { x: 180, y: 360 },
      { x: 400, y: 410 },
      { x: 550, y: 320 },
      { x: 620, y: 180 },
      { x: 780, y: 180 },
    ],
    slots: [
      { id: 1, x: 140, y: 60, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 140, y: 120 } },
      { id: 2, x: 260, y: 180, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 260, y: 140 } },
      { id: 3, x: 370, y: 190, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 330, y: 250 } },
      { id: 4, x: 250, y: 310, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 220, y: 360 } },
      { id: 5, x: 290, y: 440, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 360, y: 410 } },
      { id: 6, x: 480, y: 370, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 480, y: 360 } },
      { id: 7, x: 590, y: 240, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 590, y: 220 } },
      { id: 8, x: 700, y: 120, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 700, y: 180 } },
    ],
  },
  {
    id: 3,
    name: '제3관문: 얼어붙은 네온 설산',
    desc: '살을 에는 눈보라 속에서 비행 가고일과 서리 트롤 부대가 날아듭니다.',
    theme: 'snow',
    bgColor: '#0C1726',
    roadColor: '#1E324D',
    roadBorder: '#122033',
    maxWaves: 8,
    bossName: '서리 용군주 프로스트바이트',
    waypoints: [
      { x: 20, y: 250 },
      { x: 180, y: 250 },
      { x: 280, y: 140 },
      { x: 500, y: 140 },
      { x: 600, y: 260 },
      { x: 450, y: 380 },
      { x: 300, y: 380 },
      { x: 650, y: 430 },
      { x: 780, y: 430 },
    ],
    slots: [
      { id: 1, x: 120, y: 180, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 120, y: 250 } },
      { id: 2, x: 220, y: 90, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 250, y: 140 } },
      { id: 3, x: 390, y: 90, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 390, y: 140 } },
      { id: 4, x: 550, y: 200, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 550, y: 220 } },
      { id: 5, x: 520, y: 320, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 500, y: 360 } },
      { id: 6, x: 370, y: 330, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 370, y: 380 } },
      { id: 7, x: 560, y: 450, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 560, y: 420 } },
      { id: 8, x: 710, y: 360, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 710, y: 430 } },
    ],
  },
  {
    id: 4,
    name: '제4관문: 심연의 오버로드 성채',
    desc: '어둠의 심연에서 최종 보스 기가 타이탄과 전 몬스터 군단이 총공세를 펼칩니다.',
    theme: 'abyss',
    bgColor: '#160B24',
    roadColor: '#2F184B',
    roadBorder: '#1F0F33',
    maxWaves: 10,
    bossName: '재앙의 군주 기가 타이탄',
    waypoints: [
      { x: 20, y: 100 },
      { x: 200, y: 100 },
      { x: 300, y: 220 },
      { x: 180, y: 340 },
      { x: 380, y: 380 },
      { x: 520, y: 260 },
      { x: 440, y: 140 },
      { x: 620, y: 140 },
      { x: 700, y: 280 },
      { x: 780, y: 280 },
    ],
    slots: [
      { id: 1, x: 120, y: 50, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 120, y: 100 } },
      { id: 2, x: 250, y: 160, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 250, y: 130 } },
      { id: 3, x: 130, y: 280, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 160, y: 330 } },
      { id: 4, x: 280, y: 320, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 280, y: 360 } },
      { id: 5, x: 450, y: 320, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 440, y: 350 } },
      { id: 6, x: 380, y: 200, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 400, y: 220 } },
      { id: 7, x: 520, y: 90, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 530, y: 140 } },
      { id: 8, x: 620, y: 210, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 620, y: 180 } },
      { id: 9, x: 710, y: 210, type: null, level: 1, range: 110, damage: 14, rate: 22, cooldown: 0, rallyPoint: { x: 710, y: 280 } },
    ],
  },
];

// 영웅 챔피언 3종 설정
interface HeroConfig {
  id: HeroType;
  name: string;
  title: string;
  icon: string;
  desc: string;
  skillName: string;
  color: string;
  hp: number;
  atk: number;
}

const HEROES: Record<HeroType, HeroConfig> = {
  paladin: {
    id: 'paladin',
    name: '성기사단장 카이렌',
    title: '근접 철벽 방어 & 성검 베기',
    icon: '⚔️',
    desc: '높은 체력과 방어력으로 보스를 직접 저지하며 성검으로 베어넘깁니다.',
    skillName: '성스러운 수호 오라',
    color: '#38BDF8',
    hp: 350,
    atk: 32,
  },
  ranger: {
    id: 'ranger',
    name: '엘프 궁술사 루나',
    title: '초장거리 멀티샷 저격수',
    icon: '🏹',
    desc: '빠른 기동력과 장거리 관통 화살로 날아오는 비행 몬스터를 격추합니다.',
    skillName: '질풍의 화살비',
    color: '#10B981',
    hp: 240,
    atk: 42,
  },
  archmage: {
    id: 'archmage',
    name: '아케인 현자 제피로스',
    title: '광역 연쇄 번개 & 둔화 마법',
    icon: '🧙',
    desc: '적들의 방어력을 무시하는 연쇄 번개 마법으로 무리를 감전시킵니다.',
    skillName: '연쇄 체인 라이트닝',
    color: '#A855F7',
    hp: 200,
    atk: 58,
  },
};

// 4대 타워 및 4단계 진화 정보 (한국어)
export const TOWER_INFO: Record<
  TowerType,
  {
    name: string;
    levelNames: string[];
    icon: string;
    color: string;
    desc: string;
    cost: number;
    baseDmg: number;
    range: number;
    rate: number;
  }
> = {
  archer: {
    name: '궁수 타워',
    levelNames: ['수습 궁수 초소', '정예 궁수 망루', '명사수의 요새', '숲의 레인저 은신처'],
    icon: '🏹',
    color: '#10B981',
    desc: '빠른 연사 속도와 비행 몬스터 요격에 탁월한 관통 사격',
    cost: 70,
    baseDmg: 16,
    range: 125,
    rate: 20,
  },
  barracks: {
    name: '기사단 병영',
    levelNames: ['민병대 훈련소', '보병대 주둔지', '중장기사 요새', '성기사 홀리 오더'],
    icon: '🛡️',
    color: '#38BDF8',
    desc: '도로 위로 3명의 성기사를 출격시켜 몬스터를 길목에서 직접 저지 및 백병전',
    cost: 70,
    baseDmg: 10,
    range: 100,
    rate: 30,
  },
  mage: {
    name: '아케인 마법탑',
    levelNames: ['비전술사 탑', '에너지 빔 타워', '소서러 마법탑', '대마법사 아크메이지'],
    icon: '🧙',
    color: '#A855F7',
    desc: '철갑을 두른 오크와 골렘의 물리 방어력을 무시하고 관통하는 마법 빔',
    cost: 100,
    baseDmg: 35,
    range: 115,
    rate: 45,
  },
  artillery: {
    name: '박격포 대포탑',
    levelNames: ['드워프 야포', '중포 박격포대', '지진 파쇄포', '500mm 메가 테슬라포'],
    icon: '💣',
    color: '#F59E0B',
    desc: '광역 폭발 스플래시 피해로 떼지어 오는 적군 무리를 한 번에 섬멸',
    cost: 125,
    baseDmg: 52,
    range: 105,
    rate: 65,
  },
};

export const KingdomRushTowerDefense: React.FC = () => {
  const { showToast } = useVibeStore();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [selectedHero, setSelectedHero] = useState<HeroType>('paladin');

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [gold, setGold] = useState<number>(250);
  const [hearts, setHearts] = useState<number>(20);
  const [wave, setWave] = useState<number>(1);
  const [isWaveActive, setIsWaveActive] = useState<boolean>(false);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  // Spells Cooldown
  const [meteorCooldown, setMeteorCooldown] = useState<number>(0);
  const [reinforceCooldown, setReinforceCooldown] = useState<number>(0);
  const [activeSpell, setActiveSpell] = useState<'meteor' | 'reinforce' | null>(null);

  const currentStage = useMemo(
    () => STAGES.find((s) => s.id === selectedStageId) || STAGES[0],
    [selectedStageId]
  );
  const currentHeroInfo = HEROES[selectedHero];

  // Hero Unit State
  const [heroPos, setHeroPos] = useState<{ x: number; y: number; hp: number; maxHp: number }>({
    x: 480,
    y: 240,
    hp: currentHeroInfo.hp,
    maxHp: currentHeroInfo.hp,
  });

  // Dynamic Game State Refs for 60FPS loop
  const towersRef = useRef<TowerSlot[]>(currentStage.slots);
  const soldiersRef = useRef<Soldier[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Switch Stage
  const handleSelectStage = (stageId: number) => {
    soundEngine.playQuestComplete();
    setSelectedStageId(stageId);
    const targetStage = STAGES.find((s) => s.id === stageId) || STAGES[0];
    towersRef.current = JSON.parse(JSON.stringify(targetStage.slots));
    soldiersRef.current = [];
    enemiesRef.current = [];
    projectilesRef.current = [];
    floatingTextsRef.current = [];
    setGold(250);
    setHearts(20);
    setWave(1);
    setIsWaveActive(false);
    setSelectedSlotId(null);
    setHeroPos({
      x: targetStage.waypoints[Math.floor(targetStage.waypoints.length / 2)].x,
      y: targetStage.waypoints[Math.floor(targetStage.waypoints.length / 2)].y,
      hp: currentHeroInfo.hp,
      maxHp: currentHeroInfo.hp,
    });
    showToast(`🗺️ ${targetStage.name} 진입!`, 'info');
  };

  // Change Hero
  const handleChangeHero = (heroId: HeroType) => {
    soundEngine.playTeslaFsdEngage();
    setSelectedHero(heroId);
    const h = HEROES[heroId];
    setHeroPos((prev) => ({ ...prev, hp: h.hp, maxHp: h.hp }));
    showToast(`👑 영웅 [${h.name}] 참전!`, 'success');
  };

  // Trigger Meteor Rain of Fire
  const castMeteor = useCallback(
    (targetX: number, targetY: number) => {
      soundEngine.playMeteorImpact();
      floatingTextsRef.current.push({
        id: `${Date.now()}`,
        x: targetX,
        y: targetY - 20,
        text: '🔥 유성우 폭격! (-100)',
        color: '#EF4444',
        life: 40,
      });

      enemiesRef.current.forEach((enemy) => {
        const dist = Math.hypot(enemy.x - targetX, enemy.y - targetY);
        if (dist < 130) {
          enemy.hp -= 100;
          floatingTextsRef.current.push({
            id: `${Math.random()}`,
            x: enemy.x,
            y: enemy.y,
            text: '-100 화염 피해!',
            color: '#F97316',
            life: 30,
          });
        }
      });

      setMeteorCooldown(30);
      setActiveSpell(null);
      showToast('☄️ 화염 메테오 폭격으로 적군을 불태웠습니다!', 'success');
    },
    [showToast]
  );

  // Trigger Call Reinforcements
  const castReinforce = useCallback(
    (targetX: number, targetY: number) => {
      soundEngine.playQuestComplete();
      soldiersRef.current.push(
        {
          id: `militia-1-${Date.now()}`,
          towerId: -1,
          x: targetX - 12,
          y: targetY,
          hp: 100,
          maxHp: 100,
          targetEnemyId: null,
          respawnTimer: 0,
        },
        {
          id: `militia-2-${Date.now()}`,
          towerId: -1,
          x: targetX + 12,
          y: targetY,
          hp: 100,
          maxHp: 100,
          targetEnemyId: null,
          respawnTimer: 0,
        }
      );

      floatingTextsRef.current.push({
        id: `${Date.now()}`,
        x: targetX,
        y: targetY - 15,
        text: '🛡️ 의용군 출격 완료!',
        color: '#38BDF8',
        life: 35,
      });

      setReinforceCooldown(15);
      setActiveSpell(null);
      showToast('🛡️ 의용군 2명이 전선에 긴급 배치되었습니다!', 'info');
    },
    [showToast]
  );

  // Start Next Wave
  const startNextWave = useCallback(() => {
    if (isWaveActive) return;
    setIsWaveActive(true);
    soundEngine.playInvasionAlarm();

    const waveEnemies: Enemy[] = [];
    const count = 6 + wave * 3;
    const isBossWave = wave === currentStage.maxWaves;

    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      let type: EnemyType = 'goblin';
      let hp = 45 + wave * 14;
      let speed = 1.6;
      let armor = 0;
      let magicResist = 0;
      let isFlying = false;
      let rewardGold = 14;

      if (typeRand > 0.7) {
        type = 'orc';
        hp = 120 + wave * 28;
        speed = 0.85;
        armor = 0.55;
        rewardGold = 28;
      } else if (typeRand > 0.5 && wave >= 2) {
        type = 'flying';
        hp = 55 + wave * 12;
        speed = 1.85;
        isFlying = true;
        rewardGold = 20;
      } else if (typeRand > 0.35 && wave >= 3) {
        type = 'shaman';
        hp = 95 + wave * 18;
        speed = 1.1;
        magicResist = 0.45;
        rewardGold = 24;
      }

      waveEnemies.push({
        id: `wave-${wave}-enemy-${i}`,
        type,
        x: currentStage.waypoints[0].x - i * 38,
        y: currentStage.waypoints[0].y + (Math.random() * 12 - 6),
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

    if (isBossWave) {
      waveEnemies.push({
        id: `wave-${wave}-BOSS`,
        type: 'boss',
        x: currentStage.waypoints[0].x - (count + 1) * 40,
        y: currentStage.waypoints[0].y,
        waypointIndex: 1,
        hp: 650 + wave * 180,
        maxHp: 650 + wave * 180,
        speed: 0.6,
        armor: 0.45,
        magicResist: 0.35,
        isFlying: false,
        rewardGold: 150,
        blockedBySoldierId: null,
        attackCooldown: 0,
      });
      showToast(`🚨 [보스 출현] ${currentStage.bossName}이(가) 진격합니다!`, 'warning');
    } else {
      showToast(`⚔️ [웨이브 ${wave}/${currentStage.maxWaves}] 몬스터 군단 진격 개시!`, 'info');
    }

    enemiesRef.current = waveEnemies;
  }, [wave, isWaveActive, currentStage, showToast]);

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

          // Melee Combat Stalling
          if (e.blockedBySoldierId) {
            e.attackCooldown--;
            if (e.attackCooldown <= 0) {
              e.attackCooldown = 35;
              const s = soldiersRef.current.find((sol) => sol.id === e.blockedBySoldierId);
              if (s) {
                s.hp -= 16;
                if (s.hp <= 0) {
                  e.blockedBySoldierId = null;
                  s.respawnTimer = 160;
                }
              } else {
                e.blockedBySoldierId = null;
              }
            }
            continue;
          }

          const targetWp = currentStage.waypoints[e.waypointIndex];
          if (!targetWp) {
            // Reached Kingdom Core
            soundEngine.playExplosion();
            setHearts((h) => {
              const nextH = Math.max(0, h - (e.type === 'boss' ? 5 : 1));
              if (nextH === 0) {
                showToast('💀 패배: 성채가 함락되었습니다!', 'error');
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

          // Check Melee Interception with Soldiers or Hero
          if (!e.isFlying) {
            // Check Hero collision
            if (Math.hypot(heroPos.x - e.x, heroPos.y - e.y) < 26) {
              e.blockedBySoldierId = 'hero';
              if (Math.random() < 0.1) {
                e.hp -= currentHeroInfo.atk;
                floatingTextsRef.current.push({
                  id: `${Math.random()}`,
                  x: e.x,
                  y: e.y - 12,
                  text: `-${currentHeroInfo.atk} 영웅의 일격!`,
                  color: currentHeroInfo.color,
                  life: 25,
                });
              }
            } else {
              for (const s of soldiersRef.current) {
                if (s.hp > 0 && !s.targetEnemyId && Math.hypot(s.x - e.x, s.y - e.y) < 22) {
                  e.blockedBySoldierId = s.id;
                  s.targetEnemyId = e.id;
                  break;
                }
              }
            }
          }
        }

        // 2. Tower Target Acquisition & Firing
        towersRef.current.forEach((t) => {
          if (!t.type) return;

          // Spawn Barracks soldiers
          if (t.type === 'barracks') {
            const existing = soldiersRef.current.filter((s) => s.towerId === t.id);
            if (existing.length < 3) {
              for (let k = existing.length; k < 3; k++) {
                soldiersRef.current.push({
                  id: `sol-${t.id}-${k}`,
                  towerId: t.id,
                  x: t.rallyPoint.x + (k - 1) * 14,
                  y: t.rallyPoint.y + (k % 2) * 8,
                  hp: 110 * t.level,
                  maxHp: 110 * t.level,
                  targetEnemyId: null,
                  respawnTimer: 0,
                });
              }
            }
            return;
          }

          t.cooldown--;
          if (t.cooldown > 0) return;

          // Find candidate in range
          const candidate = enemies.find((e) => {
            if (e.isFlying && t.type === 'artillery') return false;
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
                speed: 0.14,
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
                speed: 0.18,
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
                speed: 0.07,
                damage: t.damage * t.level,
                splashRadius: 60,
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
            if (p.type === 'bomb') {
              soundEngine.playExplosion();
              enemies.forEach((en) => {
                if (Math.hypot(en.x - p.targetX, en.y - p.targetY) <= (p.splashRadius || 55)) {
                  en.hp -= p.damage;
                  floatingTextsRef.current.push({
                    id: `${Math.random()}`,
                    x: en.x,
                    y: en.y - 10,
                    text: `-${p.damage} 대포 폭파!`,
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
              if (Math.random() < 0.08) {
                enemy.hp -= 14;
                floatingTextsRef.current.push({
                  id: `${Math.random()}`,
                  x: s.x,
                  y: s.y - 12,
                  text: '-14 성검술!',
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

          if (wave >= currentStage.maxWaves) {
            confetti({
              particleCount: 260,
              spread: 110,
              origin: { y: 0.5 },
              colors: ['#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
            });
            showToast(`👑 ${currentStage.name} 완전 정복! 3성 퍼펙트 클리어! 🏆`, 'success');
          } else {
            setWave((w) => w + 1);
            setGold((g) => g + 60);
            showToast(`✨ 웨이브 ${wave} 클리어! 골드 보상 +60 G 획득!`, 'success');
          }
        }
      }

      // ==========================================
      // RENDER CANVAS (Detailed Kingdom Rush Graphics)
      // ==========================================
      ctx.clearRect(0, 0, width, height);

      // 1. Stage Terrain Background
      ctx.fillStyle = currentStage.bgColor;
      ctx.fillRect(0, 0, width, height);

      // 2. Realistic Winding Cobblestone Road
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Road Outer Border
      ctx.strokeStyle = currentStage.roadBorder;
      ctx.lineWidth = 44;
      ctx.beginPath();
      ctx.moveTo(currentStage.waypoints[0].x, currentStage.waypoints[0].y);
      for (let i = 1; i < currentStage.waypoints.length; i++) {
        ctx.lineTo(currentStage.waypoints[i].x, currentStage.waypoints[i].y);
      }
      ctx.stroke();

      // Road Inner Sand/Path
      ctx.strokeStyle = currentStage.roadColor;
      ctx.lineWidth = 36;
      ctx.stroke();
      ctx.restore();

      // Kingdom Castle Core Gate (Goal)
      const lastWp = currentStage.waypoints[currentStage.waypoints.length - 1];
      ctx.fillStyle = '#06B6D4';
      ctx.shadowColor = '#06B6D4';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(lastWp.x, lastWp.y, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏰 성문', lastWp.x, lastWp.y + 4);

      // 3. Draw Tower Slots & Towers
      towersRef.current.forEach((slot) => {
        const isSelected = selectedSlotId === slot.id;

        if (!slot.type) {
          // Empty Plot
          ctx.fillStyle = isSelected ? '#06B6D4' : '#1E293B';
          ctx.strokeStyle = isSelected ? '#FFFFFF' : '#475569';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(slot.x, slot.y, 19, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#94A3B8';
          ctx.font = 'bold 13px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('건설', slot.x, slot.y + 4);
        } else {
          // Built Tower
          const info = TOWER_INFO[slot.type];
          ctx.fillStyle = info.color;
          ctx.shadowColor = info.color;
          ctx.shadowBlur = isSelected ? 18 : 6;

          ctx.beginPath();
          ctx.arc(slot.x, slot.y, 22, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Tower Icon
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '18px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(info.icon, slot.x, slot.y + 7);

          // Level Badge
          ctx.fillStyle = '#0F172A';
          ctx.beginPath();
          ctx.arc(slot.x + 14, slot.y - 14, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#38BDF8';
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(`L${slot.level}`, slot.x + 14, slot.y - 11);

          // Range circle when selected
          if (isSelected) {
            ctx.strokeStyle = `${info.color}66`;
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
        ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#EF4444';
        ctx.fillRect(s.x - 8, s.y - 11, 16, 2.5);
        ctx.fillStyle = '#10B981';
        ctx.fillRect(s.x - 8, s.y - 11, (s.hp / s.maxHp) * 16, 2.5);
      });

      // 5. Draw Hero Champion
      ctx.save();
      ctx.fillStyle = currentHeroInfo.color;
      ctx.shadowColor = currentHeroInfo.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(heroPos.x, heroPos.y, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentHeroInfo.icon, heroPos.x, heroPos.y + 4);
      ctx.restore();

      // 6. Draw Enemies
      enemiesRef.current.forEach((en) => {
        const isBoss = en.type === 'boss';
        ctx.fillStyle = isBoss
          ? '#E11D48'
          : en.type === 'orc'
          ? '#D97706'
          : en.type === 'flying'
          ? '#06B6D4'
          : '#10B981';

        ctx.beginPath();
        ctx.arc(en.x, en.y, isBoss ? 18 : 9, 0, Math.PI * 2);
        ctx.fill();

        const barWidth = isBoss ? 36 : 18;
        ctx.fillStyle = '#334155';
        ctx.fillRect(en.x - barWidth / 2, en.y - (isBoss ? 26 : 15), barWidth, 3.5);
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(en.x - barWidth / 2, en.y - (isBoss ? 26 : 15), (en.hp / en.maxHp) * barWidth, 3.5);
      });

      // 7. Draw Projectiles
      projectilesRef.current.forEach((p) => {
        if (p.type === 'arrow') {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 5, p.y - 5);
          ctx.stroke();
        } else if (p.type === 'magic') {
          ctx.fillStyle = '#A855F7';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'bomb') {
          ctx.fillStyle = '#F59E0B';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
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
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        if (ft.life <= 0) fTexts.splice(fIdx, 1);
      }

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    // Canvas Click Listener
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const cx = (e.clientX - rect.left) * scaleX;
      const cy = (e.clientY - rect.top) * scaleY;

      if (activeSpell === 'meteor') {
        castMeteor(cx, cy);
        return;
      }
      if (activeSpell === 'reinforce') {
        castReinforce(cx, cy);
        return;
      }

      let clickedSlot = null;
      for (const slot of towersRef.current) {
        if (Math.hypot(slot.x - cx, slot.y - cy) < 28) {
          clickedSlot = slot.id;
          break;
        }
      }

      if (clickedSlot) {
        soundEngine.playClick();
        setSelectedSlotId(clickedSlot);
      } else {
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
  }, [isPlaying, isWaveActive, wave, selectedSlotId, activeSpell, heroPos, currentStage, currentHeroInfo, castMeteor, castReinforce, showToast]);

  // Build Tower Action
  const handleBuildTower = (type: TowerType) => {
    if (!selectedSlotId) return;
    const info = TOWER_INFO[type];
    if (gold < info.cost) {
      soundEngine.playClick();
      showToast(`⚠️ 골드가 부족합니다! (${info.cost} G 필요)`, 'warning');
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
    showToast(`🏰 [${info.name}] 1단계 건설 완료!`, 'success');
  };

  // Upgrade Tower Action
  const handleUpgradeTower = () => {
    if (!selectedSlotId) return;
    const slot = towersRef.current.find((s) => s.id === selectedSlotId);
    if (!slot || !slot.type) return;

    if (slot.level >= 4) {
      showToast('타워가 이미 최고 4단계 전직 상태입니다!', 'info');
      return;
    }

    const upgradeCost = slot.level * 95;
    if (gold < upgradeCost) {
      soundEngine.playClick();
      showToast(`⚠️ 골드가 부족합니다! (${upgradeCost} G 필요)`, 'warning');
      return;
    }

    soundEngine.playLevelUp();
    setGold((g) => g - upgradeCost);
    slot.level++;
    slot.damage += Math.round(slot.damage * 0.65);
    slot.range += 12;

    const tInfo = TOWER_INFO[slot.type];
    showToast(`✨ [${tInfo.levelNames[slot.level - 1]}] 진화 완료!`, 'success');
  };

  // Sell Tower
  const handleSellTower = () => {
    if (!selectedSlotId) return;
    const slot = towersRef.current.find((s) => s.id === selectedSlotId);
    if (!slot || !slot.type) return;

    soundEngine.playClick();
    setGold((g) => g + 45);
    slot.type = null;
    slot.level = 1;
    setSelectedSlotId(null);
    showToast('타워를 철거하고 골드 +45 G를 회수했습니다.', 'info');
  };

  const selectedSlot = towersRef.current.find((s) => s.id === selectedSlotId);

  return (
    <>
      {/* Dashboard Launcher Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0A1A14] via-[#102920] to-[#0A1A14] border border-emerald-500/40 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xl relative overflow-hidden group">
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <Crown className="w-6 h-6 text-amber-400 animate-bounce" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-white">
                킹덤 러쉬 : 왕국 수호 정통 타워 디펜스 RPG
              </h3>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                {currentStage.name} (웨이브 {wave}/{currentStage.maxWaves})
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              4대 테마 전장(숲길·용암·설산·심연) | 3대 영웅 조작 | 4단계 타워 진화 및 메테오·의용군 지원
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => {
              soundEngine.playQuestComplete();
              setIsOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Swords className="w-4 h-4" />
            <span>킹덤 러쉬 전장 출격</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Fullscreen / Modal Kingdom Rush Station */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn font-sans">
          <div className="relative w-full max-w-5xl rounded-3xl bg-[#091310] border border-emerald-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
            {/* Header Telemetry Bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white">
                      {currentStage.name}
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      웨이브 {wave} / {currentStage.maxWaves}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    부지를 눌러 타워를 건설하고 도로를 탭하여 영웅을 이동시키세요
                  </span>
                </div>
              </div>

              {/* Stage & Hero Selectors */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Stage Dropdown */}
                <select
                  value={selectedStageId}
                  onChange={(e) => handleSelectStage(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-bold"
                >
                  {STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                {/* Hero Dropdown */}
                <select
                  value={selectedHero}
                  onChange={(e) => handleChangeHero(e.target.value as HeroType)}
                  className="bg-slate-900 border border-slate-700 text-xs text-amber-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-bold"
                >
                  {Object.values(HEROES).map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.icon} {h.name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">{gold} G</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-300 font-bold">{hearts} 생명</span>
                </div>

                <button
                  onClick={startNextWave}
                  disabled={isWaveActive}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>{isWaveActive ? '전투 진행 중...' : `웨이브 ${wave} 출격`}</span>
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
              {/* Canvas 800x500 Stage */}
              <div className="w-full max-w-4xl aspect-[8/5] rounded-2xl bg-slate-950 border border-emerald-500/40 overflow-hidden shadow-2xl relative">
                <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

                {/* Spells Floating Toolbar on Canvas Bottom-Left */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
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
                    <span>☄️ 화염 메테오 폭격</span>
                  </button>

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
                    <span>🛡️ 의용군 긴급 출격</span>
                  </button>
                </div>
              </div>

              {/* Tower Build & Upgrade Bottom Bar */}
              {selectedSlotId && (
                <div className="w-full max-w-4xl p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
                  {!selectedSlot?.type ? (
                    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-xs font-bold text-slate-300">
                        {selectedSlotId}번 부지 선택됨 — 건설할 타워를 선택하세요:
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {(['archer', 'barracks', 'mage', 'artillery'] as TowerType[]).map((tType) => {
                          const tInfo = TOWER_INFO[tType];
                          return (
                            <button
                              key={tType}
                              onClick={() => handleBuildTower(tType)}
                              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-400 text-xs font-bold text-white transition-all shadow-md active:scale-95"
                            >
                              <span className="text-base">{tInfo.icon}</span>
                              <span>{tInfo.name}</span>
                              <span className="text-amber-400 font-extrabold">{tInfo.cost} G</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="text-xl">{TOWER_INFO[selectedSlot.type].icon}</span>
                        <div>
                          <span className="font-bold text-white text-sm">
                            {TOWER_INFO[selectedSlot.type].levelNames[selectedSlot.level - 1]} ({selectedSlot.level}단계)
                          </span>
                          <div className="text-[11px] text-slate-400">
                            공격력: {selectedSlot.damage * selectedSlot.level} | 사정거리: {selectedSlot.range}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleUpgradeTower}
                          disabled={selectedSlot.level >= 4}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
                        >
                          {selectedSlot.level >= 4
                            ? '최고 레벨 달성'
                            : `${selectedSlot.level + 1}단계 진화 (${selectedSlot.level * 95} G)`}
                        </button>

                        <button
                          onClick={handleSellTower}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 text-xs font-bold transition-all"
                        >
                          철거 (+45 G)
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
