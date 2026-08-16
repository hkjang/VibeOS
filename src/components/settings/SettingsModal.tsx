import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import {
  X,
  Key,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Lock,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0F172A] border border-slate-700 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono">
                VibeOS Settings & Integrations
              </h2>
              <p className="text-xs text-slate-400">Zero-server GitHub API & Data Management</p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 border-b border-slate-800 flex items-center gap-2 bg-slate-950/40 text-xs font-mono">
          <button
            onClick={() => setActiveTab('github')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'github'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            GitHub Integration (PAT)
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'data'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Data Backup & Snapshot
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'about'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Architecture & Philosophy
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {activeTab === 'github' && (
            <div className="space-y-5 text-xs">
              {/* GitHub Connection Status */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitHubIcon className="w-6 h-6 text-white" />
                  <div>
                    <p className="font-bold text-sm text-white font-mono">
                      {githubAuth.isValid ? `@${githubAuth.username}` : 'No GitHub Token Connected'}
                    </p>
                    <p className="text-slate-400">
                      {githubAuth.isValid
                        ? `Authenticated (Rate Limit: ${githubAuth.rateLimitRemaining || 5000}/${githubAuth.rateLimitTotal || 5000} req/hr)`
                        : 'Running in standalone local / demo mode'}
                    </p>
                  </div>
                </div>

                {githubAuth.isValid && (
                  <button
                    onClick={disconnectGitHub}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 font-mono transition-colors"
                  >
                    Disconnect
                  </button>
                )}
              </div>

              {/* Token Input Form */}
              <form onSubmit={handleSaveToken} className="space-y-4">
                <div>
                  <label className="text-slate-300 font-mono font-semibold block mb-1">
                    GitHub Personal Access Token (Fine-Grained or Classic)
                  </label>
                  <input
                    type="password"
                    value={inputToken}
                    onChange={(e) => setInputToken(e.target.value)}
                    placeholder="github_pat_11..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 space-y-2 text-slate-300">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    Security & Token Safety Guarantee
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 leading-relaxed">
                    <li>Your token is stored <strong>only in client-side memory / local storage</strong>.</li>
                    <li>No backend server receives or records your credentials.</li>
                    <li>Required scopes: <code className="text-cyan-300">repo</code> (read/write repositories), <code className="text-cyan-300">workflow</code> (run GitHub Actions).</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a
                    href="https://github.com/settings/tokens?type=beta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    Generate Fine-Grained PAT on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all font-mono"
                  >
                    {isLoading ? 'Verifying...' : 'Save & Authenticate'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-5 text-xs">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold uppercase">
                  <Download className="w-4 h-4" />
                  Export Complete Portfolio State
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Export all projects, 4D scoring metadata, harvested assets, idea inbox items, and post-mortems as a standard JSON snapshot compatible with GitHub repository synchronization.
                </p>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono hover:bg-cyan-400 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download JSON Backup
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-violet-400 font-mono font-bold uppercase">
                  <Upload className="w-4 h-4" />
                  Import Portfolio Snapshot
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Restore previously exported JSON backup or load custom team portfolio datasets.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block w-full text-slate-400 font-mono file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-500"
                />
              </div>

              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-mono font-bold uppercase">
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default Demo State
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Reset the workspace to the rich sample dataset containing Clustara, VibeCoders, NovaAgent, FastLanding, and other demonstration projects.
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
                  Reset Workspace
                </button>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white font-mono text-sm">
                  “VibeOS does not own your projects.”
                </h3>
                <p className="text-slate-400">
                  Your code lives on GitHub. Your project metadata lives in your Git repository.
                  Your intelligence runs via GitHub Actions. If VibeOS ceases to exist, your entire
                  development history, reusable code snippets, and post-mortems remain 100% yours.
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
