import React, { useMemo } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import {
  Trophy,
  Flame,
  Skull,
  Star,
  GitCommit,
  Sparkles,
  Layers,
  Zap,
  ShieldCheck,
  Rocket,
  HeartPulse,
} from 'lucide-react';

import { soundEngine } from '../../utils/soundEngine';

interface Badge {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleKo: string;
  description: string;
  descriptionKo: string;
  unlocked: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export const AchievementBadges: React.FC = () => {
  const { projects, assets, summary } = useVibeStore();
  const { language } = useTranslation();

  const badges: Badge[] = useMemo(() => {
    const totalProjects = projects.length;
    const growingCount = projects.filter((p) => p.stage === 'grow').length;
    const graveyardCount = projects.filter((p) => p.stage === 'archived').length;
    const experimentCount = projects.filter((p) => p.stage === 'experiment').length;
    const assetCount = assets.length;

    // Unique tech stacks
    const allStacks = new Set<string>();
    projects.forEach((p) => p.stack.forEach((s) => allStacks.add(s)));

    return [
      {
        id: 'centurion',
        icon: <Layers className="w-5 h-5" />,
        title: 'Centurion Builder',
        titleKo: '센추리온 빌더',
        description: `Created 100+ repositories (${totalProjects} total)`,
        descriptionKo: `100개 이상 레포지토리 생성 (총 ${totalProjects}개)`,
        unlocked: totalProjects >= 100,
        tier: 'diamond',
      },
      {
        id: 'growth-engine',
        icon: <Rocket className="w-5 h-5" />,
        title: 'Growth Engine Master',
        titleKo: '성장 엔진 마스터',
        description: `${growingCount} actively growing projects`,
        descriptionKo: `${growingCount}개 프로젝트 활발하게 성장 중`,
        unlocked: growingCount >= 10,
        tier: 'gold',
      },
      {
        id: 'graveyard-scholar',
        icon: <Skull className="w-5 h-5" />,
        title: 'Graveyard Scholar',
        titleKo: '묘지 학자',
        description: `Learned from ${graveyardCount} archived experiments`,
        descriptionKo: `${graveyardCount}개 아카이브에서 교훈 습득`,
        unlocked: graveyardCount >= 50,
        tier: 'gold',
      },
      {
        id: 'polyglot',
        icon: <Zap className="w-5 h-5" />,
        title: 'Polyglot Architect',
        titleKo: '다중 언어 아키텍트',
        description: `Mastered ${allStacks.size} unique technologies`,
        descriptionKo: `${allStacks.size}개 고유 기술 스택 마스터`,
        unlocked: allStacks.size >= 8,
        tier: 'silver',
      },
      {
        id: 'asset-miner',
        icon: <Sparkles className="w-5 h-5" />,
        title: 'Asset Miner',
        titleKo: '자산 채굴자',
        description: `Harvested ${assetCount} reusable modules`,
        descriptionKo: `${assetCount}개 재사용 모듈 채굴 완료`,
        unlocked: assetCount >= 3,
        tier: 'bronze',
      },
      {
        id: 'mad-scientist',
        icon: <Flame className="w-5 h-5" />,
        title: 'Mad Scientist',
        titleKo: '매드 사이언티스트',
        description: `${experimentCount} active experiments running`,
        descriptionKo: `${experimentCount}개 실험 프로젝트 가동 중`,
        unlocked: experimentCount >= 5,
        tier: 'silver',
      },
      {
        id: 'platform-thinker',
        icon: <ShieldCheck className="w-5 h-5" />,
        title: 'Platform Thinker',
        titleKo: '플랫폼 사고가',
        description: 'Built VibeOS — an OS for managing side projects',
        descriptionKo: 'VibeOS — 사이드 프로젝트 관리 OS 구축 완료',
        unlocked: true,
        tier: 'diamond',
      },
      {
        id: 'heart-coder',
        icon: <HeartPulse className="w-5 h-5" />,
        title: 'Weekend Warrior',
        titleKo: '주말 전사',
        description: '5+ projects shipped on weekends',
        descriptionKo: '주말 해커톤 5개 이상 프로젝트 출시',
        unlocked: growingCount >= 5,
        tier: 'bronze',
      },
    ];
  }, [projects, assets]);

  const tierStyles: Record<string, string> = {
    diamond: 'from-cyan-400 to-blue-500 border-cyan-400/60 shadow-cyan-500/30',
    gold: 'from-amber-400 to-yellow-500 border-amber-400/60 shadow-amber-500/30',
    silver: 'from-slate-300 to-slate-400 border-slate-300/60 shadow-slate-400/30',
    bronze: 'from-orange-400 to-orange-600 border-orange-400/60 shadow-orange-500/30',
  };

  const tierBg: Record<string, string> = {
    diamond: 'bg-cyan-950/30 border-cyan-500/30',
    gold: 'bg-amber-950/30 border-amber-500/30',
    silver: 'bg-slate-800/40 border-slate-600/30',
    bronze: 'bg-orange-950/30 border-orange-500/30',
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              {language === 'ko' ? '개발자 업적 & 뱃지 컬렉션' : 'Developer Achievements & Badge Collection'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {language === 'ko'
                ? `${unlockedCount}/${badges.length} 업적 달성 완료`
                : `${unlockedCount}/${badges.length} achievements unlocked`}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
          {Math.round((unlockedCount / badges.length) * 100)}% Complete
        </span>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => {
              if (badge.unlocked) {
                soundEngine.playQuestComplete();
              } else {
                soundEngine.playClick();
              }
            }}
            className={`p-3.5 rounded-2xl border transition-all space-y-2 cursor-pointer ${
              badge.unlocked
                ? `${tierBg[badge.tier]} hover:scale-[1.03] hover:shadow-lg active:scale-95`
                : 'bg-slate-950/60 border-slate-800/60 opacity-40 grayscale hover:opacity-60'
            }`}
          >
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                badge.unlocked
                  ? `bg-gradient-to-br ${tierStyles[badge.tier]} text-white shadow-lg`
                  : 'bg-slate-800 text-slate-600'
              }`}
            >
              {badge.icon}
            </div>

            {/* Text */}
            <div>
              <h4 className="text-xs font-bold text-white font-mono leading-tight">
                {language === 'ko' ? badge.titleKo : badge.title}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                {language === 'ko' ? badge.descriptionKo : badge.description}
              </p>
            </div>

            {/* Tier Badge */}
            {badge.unlocked && (
              <span
                className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-md inline-block ${
                  badge.tier === 'diamond'
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : badge.tier === 'gold'
                    ? 'bg-amber-500/20 text-amber-300'
                    : badge.tier === 'silver'
                    ? 'bg-slate-500/20 text-slate-300'
                    : 'bg-orange-500/20 text-orange-300'
                }`}
              >
                {badge.tier}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
