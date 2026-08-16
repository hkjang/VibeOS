import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import {
  X,
  Key,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { GitHubIcon } from '../common/GitHubIcon';
import { generateVibeDataExport, downloadJsonFile } from '../../services/exportService';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    githubAuth,
    setGitHubToken,
    disconnectGitHub,
    restoreDefaults,
    importSnapshot,
    projects,
    assets,
    ideas,
    summary,
    showToast,
    isLoading,
  } = useVibeStore();

  const { t } = useTranslation();

  const [inputToken, setInputToken] = useState(githubAuth.token || '');
  const [activeTab, setActiveTab] = useState<'github' | 'data' | 'about'>('github');

  if (!isSettingsOpen) return null;

  const handleSaveToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputToken.trim()) return;
    const success = await setGitHubToken(inputToken.trim());
    if (success) {
      setIsSettingsOpen(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        importSnapshot(json);
        setIsSettingsOpen(false);
      } catch (err: any) {
        showToast(`Failed to parse JSON file: ${err.message}`, 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleExportData = () => {
    const exportData = generateVibeDataExport(projects, assets, ideas, summary);
    downloadJsonFile(exportData, `vibe-portfolio-export-${new Date().toISOString().slice(0, 10)}.json`);
    showToast('Exported complete VibeOS data backup', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0F172A] border border-slate-700 w-full max-w-2xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-mono">
                {t.settings.title}
              </h2>
              <p className="text-xs text-slate-400">{t.settings.subtitle}</p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 sm:px-6 border-b border-slate-800 flex items-center gap-1 sm:gap-2 bg-slate-950/40 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('github')}
            className={`py-2.5 sm:py-3 px-2.5 sm:px-3 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'github'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.settings.tabGithub}
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`py-2.5 sm:py-3 px-2.5 sm:px-3 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'data'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.settings.tabData}
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-2.5 sm:py-3 px-2.5 sm:px-3 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'about'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.settings.tabAbout}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto max-h-[70vh]">
          {activeTab === 'github' && (
            <div className="space-y-4 sm:space-y-5 text-xs">
              {/* GitHub Connection Status */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <GitHubIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white font-mono">
                      {githubAuth.isValid ? `@${githubAuth.username}` : 'No GitHub Token Connected'}
                    </p>
                    <p className="text-slate-400 text-[11px] sm:text-xs">
                      {githubAuth.isValid
                        ? t.settings.authenticated
                            .replace('{remaining}', String(githubAuth.rateLimitRemaining || 5000))
                            .replace('{total}', String(githubAuth.rateLimitTotal || 5000))
                        : t.settings.standalone}
                    </p>
                  </div>
                </div>

                {githubAuth.isValid && (
                  <button
                    onClick={disconnectGitHub}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 font-mono transition-colors self-start sm:self-auto"
                  >
                    {t.settings.disconnect}
                  </button>
                )}
              </div>

              {/* Token Input Form */}
              <form onSubmit={handleSaveToken} className="space-y-3.5 sm:space-y-4">
                <div>
                  <label className="text-slate-300 font-mono font-semibold block mb-1">
                    {t.settings.tokenLabel}
                  </label>
                  <input
                    type="password"
                    value={inputToken}
                    onChange={(e) => setInputToken(e.target.value)}
                    placeholder="github_pat_11..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 space-y-1.5 sm:space-y-2 text-slate-300">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    {t.settings.tokenSecurity}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 leading-relaxed text-[11px] sm:text-xs">
                    <li>{t.settings.security1}</li>
                    <li>{t.settings.security2}</li>
                    <li>{t.settings.security3}</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <a
                    href="https://github.com/settings/tokens?type=beta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono text-xs"
                  >
                    {t.settings.generateToken}
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all font-mono"
                  >
                    {isLoading ? 'Verifying...' : t.settings.saveAuth}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-4 sm:space-y-5 text-xs">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold uppercase">
                  <Download className="w-4 h-4" />
                  {t.settings.exportTitle}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {t.settings.exportDesc}
                </p>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono hover:bg-cyan-400 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t.settings.downloadBackup}
                </button>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-violet-400 font-mono font-bold uppercase">
                  <Upload className="w-4 h-4" />
                  {t.settings.importTitle}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {t.settings.importDesc}
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block w-full text-slate-400 font-mono file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-500"
                />
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-mono font-bold uppercase">
                  <RotateCcw className="w-4 h-4" />
                  {t.settings.resetTitle}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {t.settings.resetDesc}
                </p>
                <button
                  onClick={() => {
                    if (confirm('Reset workspace to initial demonstration data?')) {
                      restoreDefaults();
                      setIsSettingsOpen(false);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold font-mono hover:bg-rose-500 transition-colors"
                >
                  {t.settings.resetButton}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white font-mono text-sm">
                  {t.settings.philosophyTitle}
                </h3>
                <p className="text-slate-400">
                  {t.settings.philosophyDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
                <p className="text-cyan-400 font-bold">VibeOS v1.0.0 Production</p>
                <p className="text-slate-500">Repository: https://github.com/hkjang/VibeOS</p>
                <p className="text-slate-500">License: MIT</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
