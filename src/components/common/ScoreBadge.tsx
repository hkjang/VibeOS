import React from 'react';

interface ScoreBadgeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showBar?: boolean;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  label,
  size = 'md',
  showBar = false,
}) => {
  const getColor = (val: number) => {
    if (val >= 85) return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', bar: 'bg-emerald-400' };
    if (val >= 70) return { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', bar: 'bg-cyan-400' };
    if (val >= 50) return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', bar: 'bg-amber-400' };
    return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', bar: 'bg-rose-400' };
  };

  const style = getColor(score);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-mono',
    md: 'text-sm px-2.5 py-1 font-mono font-semibold',
    lg: 'text-base px-3.5 py-1.5 font-mono font-bold',
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <div className={`inline-flex items-center gap-1.5 rounded-lg border ${style.bg} ${style.text} ${style.border} ${sizeClasses[size]}`}>
        {label && <span className="text-xs font-sans text-slate-400 font-normal uppercase">{label}:</span>}
        <span>{score}</span>
        <span className="text-[10px] text-slate-500">/100</span>
      </div>
      {showBar && (
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full ${style.bar} transition-all duration-500`}
            style={{ width: `${Math.min(100, score)}%` }}
          />
        </div>
      )}
    </div>
  );
};
