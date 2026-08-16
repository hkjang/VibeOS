import React from 'react';
import { ProjectItem } from '../../types/project';
import { useVibeStore } from '../../store/useVibeStore';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
import { TechStackTag } from '../common/TechStackTag';
import {
  Star,
  ExternalLink,
  ChevronRight,
  Sparkles,
  GitCommit,
  Clock,
  ArrowUpRight,
  GitPullRequest,
} from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { toggleFavorite, archiveToGraveyard, mineProjectAssets } = useVibeStore();

  return (
    <div
      onClick={onClick}
      className="glass-panel-interactive rounded-3xl p-5 md:p-6 flex flex-col justify-between space-y-4 cursor-pointer relative group border border-slate-800 hover:border-cyan-500/50"
    >
      {/* Top row: Title, Favorite, Stage */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(project.id);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                project.isFavorite
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-600 hover:text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
            <div>
              <h3 className="font-bold text-base md:text-lg text-white font-mono group-hover:text-cyan-300 transition-colors">
                {project.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-1">
            <StageBadge stage={project.stage} size="sm" />
            {project.stars !== undefined && project.stars > 0 && (
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                ⭐ {project.stars}
              </span>
            )}
          </div>
        </div>

        {/* Tech Stacks */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 4).map((tech) => (
            <TechStackTag key={tech} name={tech} size="sm" />
          ))}
          {project.stack.length > 4 && (
            <span className="text-[10px] text-slate-500 px-1.5 py-0.5 font-mono">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Next Action Pill */}
      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 uppercase tracking-wider font-mono font-semibold flex items-center gap-1 text-[10px]">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Next Action
          </span>
          <span className="text-[10px] text-cyan-400 font-mono capitalize">
            {project.nextActionCategory}
          </span>
        </div>
        <p className="text-xs text-slate-200 font-medium line-clamp-1">
          {project.nextAction}
        </p>
      </div>

      {/* Score Grid & Footer */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <ScoreBadge score={project.score.total} label="Score" size="sm" />
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span title="Activity Score">⚡ {project.score.activity}</span>
            <span title="Potential Score">🚀 {project.score.potential}</span>
            <span title="Reuse Score">🧩 {project.score.reuse}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-cyan-300 font-medium">
          <span>Details</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
