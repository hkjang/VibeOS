import React from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import {
  Layers,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  Settings,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { GitHubIcon } from './GitHubIcon';

export const Navbar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    githubAuth,
    syncFromGitHub,
    reAnalyzeAll,
    setIsSettingsOpen,
    setIsNewProjectOpen,
    setActiveTab,
    isLoading,
  } = useVibeStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-xl px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand / System Title */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#090D16] rounded-[11px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white font-mono">
                  Vibe<span className="text-cyan-400">OS</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Autonomous Vibe-Coder Operating System
              </p>
            </div>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, reusable assets, DNA stacks..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700/70 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions & Integrations */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Intelligence Re-Score */}
          <button
            onClick={() => reAnalyzeAll()}
            title="Run AI project intelligence scoring"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-violet-600/10 text-violet-300 border border-violet-500/30 hover:bg-violet-600/20 hover:border-violet-400 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden lg:inline">AI Scoring</span>
          </button>

          {/* Quick Idea Capture */}
          <button
            onClick={() => setActiveTab('ideas')}
            title="Idea Inbox"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 transition-all"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Idea Inbox</span>
          </button>

          {/* New Project */}
          <button
            onClick={() => setIsNewProjectOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">New Project</span>
          </button>

          {/* GitHub Sync Status */}
          {githubAuth.isValid ? (
            <button
              onClick={() => syncFromGitHub()}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-500 transition-all"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-white" />
              <span className="font-mono text-emerald-400 font-medium">@{githubAuth.username}</span>
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-cyan-400' : 'text-slate-400'}`} />
            </button>
          ) : (
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Connect PAT</span>
            </button>
          )}

          {/* Settings */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="Settings & Export"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
