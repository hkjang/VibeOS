import React from 'react';
import { ProjectStage } from '../../types/project';
import { useTranslation } from '../../i18n/useTranslation';
import { Sparkles, FlaskConical, Wrench, Sprout, Moon, Archive, Lightbulb } from 'lucide-react';

interface StageBadgeProps {
  stage: ProjectStage;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StageBadge: React.FC<StageBadgeProps> = ({
  stage,
  size = 'md',
  showIcon = true,
}) => {
  const { t } = useTranslation();

  const configs: Record<
    ProjectStage,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    grow: {
      label: t.stages.grow,
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      icon: <Sprout className="w-3.5 h-3.5" />,
    },
    experiment: {
      label: t.stages.experiment,
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      icon: <FlaskConical className="w-3.5 h-3.5" />,
    },
    maintain: {
      label: t.stages.maintain,
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      icon: <Wrench className="w-3.5 h-3.5" />,
    },
    prototype: {
      label: t.stages.prototype,
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    idea: {
      label: t.stages.idea,
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      icon: <Lightbulb className="w-3.5 h-3.5" />,
    },
    dormant: {
      label: t.stages.dormant,
      bg: 'bg-slate-500/10',
      text: 'text-slate-400',
      border: 'border-slate-500/30',
      icon: <Moon className="w-3.5 h-3.5" />,
    },
    archived: {
      label: t.stages.archived,
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      icon: <Archive className="w-3.5 h-3.5" />,
    },
  };

  const config = configs[stage] || configs.idea;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 space-x-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      {showIcon && <span>{config.icon}</span>}
      <span className="capitalize">{config.label}</span>
    </span>
  );
};
