import React from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import {
  Layers,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  Settings,
  Lightbulb,
  Globe,
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

  const { t, language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090D16]/95 backdrop-blur-xl px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand / System Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#090D16] rounded-[11px] flex items-center justify-center">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white font-mono">
                  Vibe<span className="text-cyan-400">OS</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {t.nav.version}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden xl:block">
                {t.nav.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-9 pr-4 py-1.5 sm:py-2 bg-slate-900/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions & Integrations */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            title={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:py-2 text-xs font-mono font-semibold rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase text-[11px] font-bold">
              {language === 'ko' ? 'KO' : 'EN'}
            </span>
          </button>

          {/* AI Intelligence Re-Score */}
          <button
            onClick={() => reAnalyzeAll()}
            title={t.nav.aiScoring}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-violet-600/10 text-violet-300 border border-violet-500/30 hover:bg-violet-600/20 hover:border-violet-400 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden lg:inline">{t.nav.aiScoring}</span>
          </button>

          {/* Quick Idea Capture */}
          <button
            onClick={() => setActiveTab('ideas')}
            title={t.nav.ideaInbox}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 transition-all"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">{t.nav.ideaInbox}</span>
          </button>

          {/* New Project */}
          <button
            onClick={() => setIsNewProjectOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="font-medium whitespace-nowrap">{t.nav.newProject}</span>
          </button>

          {/* GitHub Sync Status */}
          {githubAuth.isValid ? (
            <button
              onClick={() => syncFromGitHub()}
              disabled={isLoading}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-500 transition-all"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-white" />
              <span className="font-mono text-emerald-400 font-medium text-[11px] hidden sm:inline">
                @{githubAuth.username}
              </span>
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-cyan-400' : 'text-slate-400'}`} />
            </button>
          ) : (
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono text-[11px]">{t.nav.connectPat}</span>
            </button>
          )}

          {/* Settings */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title={t.nav.settings}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
