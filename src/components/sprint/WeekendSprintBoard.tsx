import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProjectItem } from '../../types/project';
import { openInEditor } from '../../utils/editorLauncher';
import { ScoreBadge } from '../common/ScoreBadge';
import { StageBadge } from '../common/StageBadge';
import { PromptBlueprintModal } from '../common/PromptBlueprintModal';
import {
  Kanban,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Plus,
  Terminal,
  Bot,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

type SprintStatus = 'planned' | 'in_flow' | 'mined' | 'shipped';

interface SprintItem {
  projectId: string;
  sprintStatus: SprintStatus;
  estimatedHours: number;
}

export const WeekendSprintBoard: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveTab, showToast } = useVibeStore();
  const { t, language } = useTranslation();

  // Local sprint board state mapped to projects
  const [sprintState, setSprintState] = useState<Record<string, SprintStatus>>(() => {
    return {
      vibeos: 'in_flow',
      opengajae: 'in_flow',
      jask: 'planned',
      trace: 'planned',
      orbit: 'planned',
      weekly: 'shipped',
      jainsight: 'mined',
      aura: 'planned',
      gitframe: 'shipped',
      kkiit: 'planned',
    };
  });

  const [selectedPromptProject, setSelectedPromptProject] = useState<ProjectItem | null>(null);

  const activeProjects = projects.filter((p) => p.status === 'active');

  const moveSprintStatus = (projectId: string, newStatus: SprintStatus) => {
    setSprintState((prev) => ({
      ...prev,
      [projectId]: newStatus,
    }));

    const proj = projects.find((p) => p.id === projectId || p.name.toLowerCase() === projectId);
    if (newStatus === 'shipped') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      showToast(`🚀 Shipped "${proj?.name || projectId}"!`, 'success');
    }
  };

  const columns: { id: SprintStatus; title: string; subtitle: string; color: string; icon: any }[] = [
    {
      id: 'planned',
      title: language === 'ko' ? '🎯 이번 주말 스프린트 후보' : '🎯 Weekend Backlog',
      subtitle: 'Ready for deep-work focus',
      color: 'border-cyan-500/40 bg-cyan-950/10 text-cyan-400',
      icon: Flame,
    },
    {
      id: 'in_flow',
      title: language === 'ko' ? '⚡ 집중 코딩 중 (In Flow)' : '⚡ In Flow / Active Coding',
      subtitle: 'Currently building in IDE',
      color: 'border-amber-500/40 bg-amber-950/10 text-amber-400',
      icon: Play,
    },
    {
      id: 'mined',
      title: language === 'ko' ? '💎 자산화 & 검증 완료' : '💎 Mined & Verified',
      subtitle: 'Reusable assets extracted',
      color: 'border-violet-500/40 bg-violet-950/10 text-violet-400',
      icon: Sparkles,
    },
    {
      id: 'shipped',
      title: language === 'ko' ? '🚀 배포 & 완료 (Shipped)' : '🚀 Shipped & Live',
      subtitle: 'Deployed to production',
      color: 'border-emerald-500/40 bg-emerald-950/10 text-emerald-400',
      icon: CheckCircle2,
    },
  ];

  // Helper to get items for column (only projects explicitly tracked on sprint board)
  const getColumnProjects = (colId: SprintStatus) => {
    return activeProjects.filter((p) => {
      const status = sprintState[p.id] || sprintState[p.name.toLowerCase()];
      return status === colId;
    });
  };

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState('');

  const handleAddProjectToSprint = (projectId: string) => {
    if (!projectId) return;
    setSprintState((prev) => ({
      ...prev,
      [projectId]: 'planned',
    }));
    const proj = projects.find((p) => p.id === projectId);
    showToast(`Added "${proj?.name || projectId}" to Weekend Sprint! 🎯`, 'info');
    setSelectedToAdd('');
    setIsAddingProject(false);
  };

  const handleRemoveFromSprint = (projectId: string) => {
    setSprintState((prev) => {
      const next = { ...prev };
      delete next[projectId];
      delete next[projectId.toLowerCase()];
      return next;
    });
    showToast('Removed from active sprint', 'info');
  };

  // Projects not currently on board
  const availableToAdd = activeProjects.filter(
    (p) => !sprintState[p.id] && !sprintState[p.name.toLowerCase()]
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400">
            <Kanban className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest font-bold">
              Weekend Vibe Coding Sprint Flow
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ko' ? '주말 바이브 코딩 스프린트 칸반' : 'Weekend Sprint Kanban'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {language === 'ko'
              ? '주말에 집중할 2~3개 프로젝트를 선정하고, VS Code 직접 실행 및 Antigravity 프롬프트로 고속 배포를 달성하세요.'
              : 'Select 2-3 focus repositories for this weekend, launch into IDE, and ship with AI prompts.'}
          </p>
        </div>

        {/* Add Project to Sprint Action */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedToAdd}
            onChange={(e) => handleAddProjectToSprint(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-mono px-3 py-2 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors focus:outline-none focus:border-amber-400"
          >
            <option value="">+ {language === 'ko' ? '스프린트에 프로젝트 추가...' : 'Add Repo to Sprint...'}</option>
            {availableToAdd.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.score.total} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 Columns Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 items-start">
        {columns.map((col) => {
          const colProjects = getColumnProjects(col.id);
          const Icon = col.icon;

          return (
            <div
              key={col.id}
              className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col space-y-4 min-h-[500px]"
            >
              {/* Column Header */}
              <div className={`p-3 rounded-2xl border ${col.color} space-y-1`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs">
                    <Icon className="w-4 h-4" />
                    <span>{col.title}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 font-bold">
                    {colProjects.length}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans">{col.subtitle}</p>
              </div>

              {/* Column Project Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 shadow-md group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4
                          onClick={() => {
                            setSelectedProjectId(proj.id);
                            setActiveTab('radar');
                          }}
                          className="font-bold text-sm text-white font-mono group-hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          {proj.name}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                          {proj.description}
                        </p>
                      </div>
                      <ScoreBadge score={proj.score.total} size="sm" />
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-cyan-300 font-mono">
                      <span className="text-slate-500 block text-[9px] uppercase">Goal:</span>
                      <span className="line-clamp-1">{proj.nextAction}</span>
                    </div>

                    {/* Action Toolbar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 gap-1 flex-wrap text-xs font-mono">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openInEditor(proj.name, 'vscode')}
                          className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20"
                          title="Open in VS Code"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedPromptProject(proj)}
                          className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20"
                          title="Copy AI Prompt Blueprint"
                        >
                          <Bot className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveFromSprint(proj.id)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-700"
                          title="Remove from Sprint"
                        >
                          ×
                        </button>
                      </div>

                      {/* State Advance Button */}
                      {col.id === 'planned' && (
                        <button
                          onClick={() => moveSprintStatus(proj.id, 'in_flow')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] hover:bg-amber-400"
                        >
                          <span>Start Flow</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {col.id === 'in_flow' && (
                        <button
                          onClick={() => moveSprintStatus(proj.id, 'mined')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500 text-white font-bold text-[10px] hover:bg-violet-400"
                        >
                          <span>Mine Assets</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {col.id === 'mined' && (
                        <button
                          onClick={() => moveSprintStatus(proj.id, 'shipped')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[10px] hover:bg-emerald-400"
                        >
                          <span>Ship Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {col.id === 'shipped' && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          ✓ Live
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {colProjects.length === 0 && (
                  <div className="p-6 text-center text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-2xl">
                    Empty column
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prompt Blueprint Modal */}
      {selectedPromptProject && (
        <PromptBlueprintModal
          project={selectedPromptProject}
          isOpen={!!selectedPromptProject}
          onClose={() => setSelectedPromptProject(null)}
        />
      )}
    </div>
  );
};
