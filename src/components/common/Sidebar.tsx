import React from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ActiveTab } from '../../types/project';
import {
  LayoutDashboard,
  Radar,
  Sparkles,
  Archive,
  Lightbulb,
  Cpu,
  Flame,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, projects, assets, ideas, summary, githubAuth } = useVibeStore();
  const { t } = useTranslation();

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
      label: t.nav.dashboard,
      description: t.nav.dashboardDesc,
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: `${summary.growing} Growing`,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'radar',
      label: t.nav.radar,
      description: t.nav.radarDesc,
      icon: <Radar className="w-4 h-4 text-cyan-400" />,
      badge: activeProjectsCount,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    },
    {
      id: 'assets',
      label: t.nav.assets,
      description: t.nav.assetsDesc,
      icon: <Sparkles className="w-4 h-4 text-violet-400" />,
      badge: assets.length,
      badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    },
    {
      id: 'graveyard',
      label: t.nav.graveyard,
      description: t.nav.graveyardDesc,
      icon: <Archive className="w-4 h-4 text-rose-400" />,
      badge: graveyardCount,
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
    {
      id: 'ideas',
      label: t.nav.ideas,
      description: t.nav.ideasDesc,
      icon: <Lightbulb className="w-4 h-4 text-amber-400" />,
      badge: ideasCount,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      id: 'dna',
      label: t.nav.dna,
      description: t.nav.dnaDesc,
      icon: <Cpu className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'actions',
      label: t.nav.actions,
      description: t.nav.actionsDesc,
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between border-r border-slate-800/80 bg-[#0B0F19]/90 min-h-[calc(100vh-61px)] p-4">
      {/* Top Nav Items */}
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
            {t.nav.operatingSystem}
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
            <span className="text-xs font-bold font-mono uppercase tracking-wider">{t.nav.vibeOsTenet}</span>
          </div>
          <p className="text-xs text-slate-300 italic leading-relaxed">
            "{t.nav.vibeOsQuote}"
          </p>
        </div>
      </div>

      {/* Bottom Storage & Security Status */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs px-2 text-slate-400">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {t.nav.localIndexedDb}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">{t.nav.clientSideOnly}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="truncate">{t.nav.githubRuntime}</span>
          <span className="font-mono text-cyan-400 text-[10px]">
            {githubAuth.isValid ? `@${githubAuth.username}` : t.nav.demoMode}
          </span>
        </div>
      </div>
    </aside>
  );
};
