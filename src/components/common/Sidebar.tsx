import React from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { ActiveTab } from '../../types/project';
import {
  LayoutDashboard,
  Radar,
  Sparkles,
  Archive,
  Lightbulb,
  Cpu,
  Layers,
  Flame,
  GitFork,
  CheckSquare,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, projects, assets, ideas, summary, githubAuth } = useVibeStore();

  const activeProjectsCount = projects.filter((p) => p.status === 'active').length;
  const graveyardCount = projects.filter((p) => p.status === 'graveyard').length;
  const ideasCount = ideas.filter((i) => i.status === 'inbox').length;

  const navItems: {
    id: ActiveTab;
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Executive Overview',
      description: 'Portfolio health & today actions',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: `${summary.growing} Growing`,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'radar',
      label: 'Project Radar',
      description: '4D Matrix & project states',
      icon: <Radar className="w-4 h-4 text-cyan-400" />,
      badge: activeProjectsCount,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    },
    {
      id: 'assets',
      label: 'Asset Mining Hub',
      description: 'Harvested reusable code',
      icon: <Sparkles className="w-4 h-4 text-violet-400" />,
      badge: assets.length,
      badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    },
    {
      id: 'graveyard',
      label: 'The Graveyard',
      description: 'Post-mortems & salvaged assets',
      icon: <Archive className="w-4 h-4 text-rose-400" />,
      badge: graveyardCount,
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
    {
      id: 'ideas',
      label: 'Idea Inbox',
      description: 'AI viability evaluation',
      icon: <Lightbulb className="w-4 h-4 text-amber-400" />,
      badge: ideasCount,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      id: 'dna',
      label: 'Project DNA & Stacks',
      description: 'Architectures & prompt library',
      icon: <Cpu className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'actions',
      label: 'GitHub Runtime & DB',
      description: 'Serverless Actions & JSON storage',
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between border-r border-slate-800/80 bg-[#0B0F19]/90 min-h-[calc(100vh-61px)] p-4">
      {/* Top Nav Items */}
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
            OPERATING SYSTEM
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                    isActive
                      ? 'bg-cyan-500/10 text-white font-medium border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold leading-tight">{item.label}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[110px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Philosophy Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0F172A] border border-slate-800 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
            <Flame className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider">VibeOS Tenet</span>
          </div>
          <p className="text-xs text-slate-300 italic leading-relaxed">
            "20 archived experiments isn't 20 failures — it's your personal development platform."
          </p>
        </div>
      </div>

      {/* Bottom Storage & Security Status */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs px-2 text-slate-400">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Local IndexedDB
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">100% Client-Side</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="truncate">GitHub Runtime</span>
          <span className="font-mono text-cyan-400 text-[10px]">
            {githubAuth.isValid ? `@${githubAuth.username}` : 'Demo Mode'}
          </span>
        </div>
      </div>
    </aside>
  );
};
