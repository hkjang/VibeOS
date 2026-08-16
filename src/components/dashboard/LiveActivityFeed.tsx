import React, { useMemo } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { Activity, GitCommit, ArrowUpRight, Plus, Star, Sparkles } from 'lucide-react';

interface FeedEvent {
  id: string;
  type: 'commit' | 'stage_change' | 'new_project' | 'star_gained' | 'asset_mined';
  projectName: string;
  projectId: string;
  description: string;
  descriptionKo: string;
  timestamp: Date;
  icon: React.ReactNode;
  iconColor: string;
}

function relativeTime(date: Date, lang: 'ko' | 'en'): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (lang === 'ko') {
    if (diffMin < 60) return `${Math.max(1, diffMin)}분 전`;
    if (diffHr < 24) return `${diffHr}시간 전`;
    if (diffDay < 7) return `${diffDay}일 전`;
    if (diffWeek < 5) return `${diffWeek}주 전`;
    return `${diffMonth}개월 전`;
  }
  if (diffMin < 60) return `${Math.max(1, diffMin)}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 5) return `${diffWeek}w ago`;
  return `${diffMonth}mo ago`;
}

export const LiveActivityFeed: React.FC = () => {
  const { projects, setActiveTab, setSelectedProjectId } = useVibeStore();
  const { language } = useTranslation();

  const events = useMemo(() => {
    const all: FeedEvent[] = [];

    projects.forEach((p) => {
      const lastActivity = new Date(p.lastActivityAt);
      const created = new Date(p.createdAt);

      // High commit velocity → commit event
      if (p.dna.commitVelocityWeekly >= 3) {
        all.push({
          id: `commit-${p.id}`,
          type: 'commit',
          projectName: p.name,
          projectId: p.id,
          description: `${p.dna.commitVelocityWeekly} commits/week in ${p.name}`,
          descriptionKo: `${p.name}에서 주당 ${p.dna.commitVelocityWeekly}회 커밋`,
          timestamp: lastActivity,
          icon: <GitCommit className="w-3.5 h-3.5" />,
          iconColor: 'text-cyan-400 bg-cyan-500/15',
        });
      }

      // Recently created → new_project event
      all.push({
        id: `new-${p.id}`,
        type: 'new_project',
        projectName: p.name,
        projectId: p.id,
        description: `New project "${p.name}" created`,
        descriptionKo: `새 프로젝트 "${p.name}" 생성됨`,
        timestamp: created,
        icon: <Plus className="w-3.5 h-3.5" />,
        iconColor: 'text-violet-400 bg-violet-500/15',
      });

      // Stars → star event
      if (p.stars && p.stars > 0) {
        all.push({
          id: `star-${p.id}`,
          type: 'star_gained',
          projectName: p.name,
          projectId: p.id,
          description: `${p.name} earned ${p.stars} ★ stars`,
          descriptionKo: `${p.name}이(가) ★ ${p.stars}개 획득`,
          timestamp: lastActivity,
          icon: <Star className="w-3.5 h-3.5" />,
          iconColor: 'text-amber-400 bg-amber-500/15',
        });
      }

      // Assets mined
      if (p.assets.length > 0) {
        all.push({
          id: `asset-${p.id}`,
          type: 'asset_mined',
          projectName: p.name,
          projectId: p.id,
          description: `${p.assets.length} reusable assets mined from ${p.name}`,
          descriptionKo: `${p.name}에서 ${p.assets.length}개 재사용 자산 채굴`,
          timestamp: lastActivity,
          icon: <Sparkles className="w-3.5 h-3.5" />,
          iconColor: 'text-rose-400 bg-rose-500/15',
        });
      }

      // Stage advancement (grow/maintain are positive signals)
      if (p.stage === 'grow' || p.stage === 'maintain') {
        all.push({
          id: `stage-${p.id}`,
          type: 'stage_change',
          projectName: p.name,
          projectId: p.id,
          description: `${p.name} advanced to "${p.stage}" stage`,
          descriptionKo: `${p.name}이(가) "${p.stage}" 단계로 승격`,
          timestamp: lastActivity,
          icon: <ArrowUpRight className="w-3.5 h-3.5" />,
          iconColor: 'text-emerald-400 bg-emerald-500/15',
        });
      }
    });

    return all.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 15);
  }, [projects]);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setActiveTab('radar');
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              {language === 'ko' ? '실시간 포트폴리오 활동 피드' : 'Live Portfolio Activity Feed'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {language === 'ko'
                ? `최근 ${events.length}개 활동 이벤트`
                : `${events.length} most recent activity events`}
            </p>
          </div>
        </div>
        {/* Live indicator */}
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Feed List */}
      <div className="space-y-0.5 max-h-[340px] overflow-y-auto scrollbar-thin">
        {events.map((event, i) => (
          <div
            key={event.id}
            className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all hover:bg-slate-800/40 ${
              i === 0 ? 'bg-slate-800/20' : ''
            }`}
          >
            {/* Icon */}
            <div className={`p-1.5 rounded-lg shrink-0 ${event.iconColor}`}>
              {event.icon}
            </div>

            {/* Description */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-300 truncate leading-snug">
                {language === 'ko' ? event.descriptionKo : event.description}
              </p>
              <button
                onClick={() => handleProjectClick(event.projectId)}
                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                → {event.projectName}
              </button>
            </div>

            {/* Relative Time */}
            <span className="text-[10px] font-mono text-slate-500 shrink-0">
              {relativeTime(event.timestamp, language)}
            </span>

            {/* Pulse on latest */}
            {i === 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
