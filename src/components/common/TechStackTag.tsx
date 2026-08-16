import React from 'react';
import { Code2 } from 'lucide-react';

interface TechStackTagProps {
  name: string;
  size?: 'sm' | 'md';
}

export const TechStackTag: React.FC<TechStackTagProps> = ({ name, size = 'sm' }) => {
  const getTagColor = (tech: string) => {
    const lower = tech.toLowerCase();
    if (lower.includes('react') || lower.includes('vite')) return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
    if (lower.includes('next')) return 'bg-slate-800 text-slate-100 border-slate-600';
    if (lower.includes('python') || lower.includes('fastapi')) return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
    if (lower.includes('typescript')) return 'bg-sky-500/10 text-sky-300 border-sky-500/30';
    if (lower.includes('ai') || lower.includes('openai') || lower.includes('claude') || lower.includes('llm')) return 'bg-violet-500/10 text-violet-300 border-violet-500/30';
    if (lower.includes('tailwind')) return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
    if (lower.includes('vue')) return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    if (lower.includes('astro') || lower.includes('svelte')) return 'bg-orange-500/10 text-orange-300 border-orange-500/30';
    return 'bg-slate-800/80 text-slate-300 border-slate-700';
  };

  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-mono ${getTagColor(
        name
      )} ${sizeClass}`}
    >
      <Code2 className="w-3 h-3 opacity-60" />
      <span>{name}</span>
    </span>
  );
};
