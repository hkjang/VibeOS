import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';
import {
  Swords,
  CheckCircle2,
  Circle,
  Flame,
  Award,
  Sparkles,
  Zap,
  Target,
  Trophy,
  Coins,
  Crown,
  ChevronRight,
  Gift,
} from 'lucide-react';

interface QuestItem {
  id: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  exp: number;
  coins: number;
  rewardIcon: string;
  type: 'daily' | 'weekly' | 'boss';
  actionTab?: string;
}

const INITIAL_QUESTS: QuestItem[] = [
  {
    id: 'quest-sprint',
    titleKo: '주말 바이브 코딩 스프린트 가동',
    titleEn: 'Ignite Weekend Vibe Sprint',
    descKo: '스프린트 칸반에서 1개 프로젝트를 선택하고 Flow를 시작하세요.',
    descEn: 'Pick 1 focus repository on Kanban and start the flow.',
    exp: 250,
    coins: 20,
    rewardIcon: '⚡',
    type: 'daily',
    actionTab: 'sprints',
  },
  {
    id: 'quest-zen',
    titleKo: '25분 딥 워크 젠 세션 완수',
    titleEn: 'Complete 25m Deep Work Session',
    descKo: '사운드스케이프 젠 터미널에서 방해 없는 몰입 세션을 완주하세요.',
    descEn: 'Finish a 25m flow session in the Ambient Zen Terminal.',
    exp: 200,
    coins: 15,
    rewardIcon: '🧘',
    type: 'daily',
  },
  {
    id: 'quest-asset',
    titleKo: '성장 레포에서 범용 레고 모듈 채굴',
    titleEn: 'Mine Reusable Lego Asset',
    descKo: '성장 엔진 프로젝트에서 독립 유틸리티/어댑터 코드를 발굴하세요.',
    descEn: 'Extract and assetize a standalone module from a growth repo.',
    exp: 350,
    coins: 30,
    rewardIcon: '💎',
    type: 'daily',
    actionTab: 'assets',
  },
  {
    id: 'quest-compare',
    titleKo: '프로젝트 1:1 4D 레이더 매칭 배틀',
    titleEn: 'Run 1:1 4D Radar Arena Matchup',
    descKo: '시너지 탭에서 2개 프로젝트의 4차원 역량을 비교 분석하세요.',
    descEn: 'Compare 2 repositories in the 4D Radar Arena.',
    exp: 300,
    coins: 25,
    rewardIcon: '⚔️',
    type: 'weekly',
    actionTab: 'synergy',
  },
  {
    id: 'quest-boss',
    titleKo: '🐉 [주간 보스 토벌] 신규 레포지토리 성장 단계 승격',
    titleEn: '🐉 [Weekly Boss] Promote Repo to Growth Engine',
    descKo: '프로토타입 또는 실험 프로젝트를 실전 성장(Grow) 단계로 승격시키세요.',
    descEn: 'Elevate a prototype repository to active Grow Engine stage.',
    exp: 1500,
    coins: 100,
    rewardIcon: '🏆',
    type: 'boss',
    actionTab: 'radar',
  },
];

export const DeveloperQuestBoard: React.FC = () => {
  const { setActiveTab, showToast } = useVibeStore();
  const { language } = useTranslation();

  // Load completed quests from localStorage
  const [completedQuests, setCompletedQuests] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('vibeos_completed_quests');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleQuest = (quest: QuestItem) => {
    const isNowComplete = !completedQuests[quest.id];
    const nextState = { ...completedQuests, [quest.id]: isNowComplete };
    setCompletedQuests(nextState);
    localStorage.setItem('vibeos_completed_quests', JSON.stringify(nextState));

    if (isNowComplete) {
      if (quest.type === 'boss') {
        soundEngine.playLevelUp();
        confetti({
          particleCount: 180,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#06B6D4'],
        });
        showToast(`🏆 BOSS QUEST CLEARED! +${quest.exp} EXP & +${quest.coins} V-Coins awarded!`, 'success');
      } else {
        soundEngine.playQuestComplete();
        showToast(`🎯 Quest Complete! +${quest.exp} EXP & +${quest.coins} V-Coins!`, 'info');
      }
    } else {
      soundEngine.playClick();
    }
  };

  const completedCount = Object.values(completedQuests).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / INITIAL_QUESTS.length) * 100);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white font-mono tracking-tight">
                {language === 'ko' ? '일일 퀘스트 & 주간 보스 바운티 보드' : 'Daily Quests & Boss Bounty Board'}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                {completedCount} / {INITIAL_QUESTS.length} Cleared
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ko'
                ? '매일 개발 미션을 완수하고 EXP와 Vibe 코인을 획득하여 레벨을 올리세요.'
                : 'Complete engineering bounties to gain EXP, Vibe-Coins, and rank up.'}
            </p>
          </div>
        </div>

        {/* Quest Progress */}
        <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Total Bounties:</span>
          <div className="w-24 h-2 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-bold text-amber-400">{progressPercent}%</span>
        </div>
      </div>

      {/* Quest Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {INITIAL_QUESTS.map((quest) => {
          const isDone = !!completedQuests[quest.id];
          const isBoss = quest.type === 'boss';

          return (
            <div
              key={quest.id}
              onClick={() => toggleQuest(quest)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 group relative overflow-hidden ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80'
                  : isBoss
                  ? 'bg-gradient-to-r from-rose-950/30 via-slate-950 to-slate-950 border-rose-500/40 hover:border-rose-400 shadow-md md:col-span-2'
                  : 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/60'
              }`}
            >
              {/* Checkbox Icon */}
              <div className="pt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                )}
              </div>

              {/* Quest Details */}
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                      isBoss
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse'
                        : quest.type === 'daily'
                        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                        : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                    }`}
                  >
                    {quest.type}
                  </span>
                  <h3
                    className={`text-xs sm:text-sm font-bold font-mono truncate ${
                      isDone ? 'line-through text-slate-400' : 'text-white group-hover:text-cyan-300'
                    }`}
                  >
                    {language === 'ko' ? quest.titleKo : quest.titleEn}
                  </h3>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-1 font-sans">
                  {language === 'ko' ? quest.descKo : quest.descEn}
                </p>
              </div>

              {/* Rewards & Action Pill */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold">
                  <span className="text-cyan-300">+{quest.exp} EXP</span>
                  <span className="text-amber-400 flex items-center gap-0.5">
                    <Coins className="w-3 h-3 inline" /> {quest.coins}
                  </span>
                </div>

                {quest.actionTab && !isDone && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playClick();
                      setActiveTab(quest.actionTab as any);
                    }}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-700"
                  >
                    <span>Execute</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
