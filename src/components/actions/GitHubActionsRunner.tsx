import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import {
  FolderGit2,
  Play,
  Download,
  Copy,
  Check,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  Layers,
  Terminal,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  GITHUB_ACTIONS_WORKFLOW_YML,
  generateVibeDataExport,
  downloadJsonFile,
} from '../../services/exportService';

export const GitHubActionsRunner: React.FC = () => {
  const { projects, assets, ideas, summary, githubAuth, showToast } = useVibeStore();
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runLogs, setRunLogs] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('portfolio/summary.json');

  const exportData = generateVibeDataExport(projects, assets, ideas, summary);

  const fileTree = [
    { path: 'portfolio/summary.json', content: JSON.stringify(exportData.portfolio, null, 2) },
    ...projects.map((p) => ({
      path: `projects/${p.name}.json`,
      content: JSON.stringify(p, null, 2),
    })),
    { path: 'ideas/inbox.json', content: JSON.stringify(exportData.ideas, null, 2) },
    { path: 'assets/reusable.json', content: JSON.stringify(exportData.assets, null, 2) },
  ];

  const currentContent =
    fileTree.find((f) => f.path === selectedFile)?.content || '// Select a file';

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(GITHUB_ACTIONS_WORKFLOW_YML);
    setCopiedWorkflow(true);
    showToast('Workflow YAML copied to clipboard!', 'success');
    setTimeout(() => setCopiedWorkflow(false), 2000);
  };

  const handleDownloadSnapshot = () => {
    downloadJsonFile(exportData, `vibe-portfolio-data-${new Date().toISOString().slice(0, 10)}.json`);
    showToast('Downloaded full repository JSON snapshot', 'success');
  };

  const handleRunWorkflowSimulation = () => {
    setIsRunning(true);
    setRunLogs([
      `[${new Date().toLocaleTimeString()}] Starting GitHub Actions Workflow dispatch...`,
      `[${new Date().toLocaleTimeString()}] Authenticating with GITHUB_TOKEN permissions...`,
      `[${new Date().toLocaleTimeString()}] Scanning ${projects.length} repositories across workspace...`,
    ]);

    setTimeout(() => {
      setRunLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Running LLM intelligence scoring matrix (Activity, Maintainability, Reuse, Potential)...`,
      ]);
    }, 1000);

    setTimeout(() => {
      setRunLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Generating updated projects/*.json and portfolio/summary.json...`,
        `[${new Date().toLocaleTimeString()}] Committing diff to main branch (vibeos-bot [skip ci])...`,
        `[${new Date().toLocaleTimeString()}] ✅ Workflow completed successfully in 2.8s!`,
      ]);
      setIsRunning(false);
      showToast('GitHub Actions Analyzer job finished successfully!', 'success');
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <FolderGit2 className="w-5 h-5" />
            <span className="text-xs uppercase font-mono tracking-widest font-bold">
              Zero-Server Cloud Architecture
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            GitHub Actions & Data Repository
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            VibeOS operates entirely serverless: Git repository as your database, GitHub Actions as your AI batch worker, and GitHub Pages as your runtime frontend.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleDownloadSnapshot}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 text-xs font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            Download JSON Snapshot
          </button>

          <button
            disabled={isRunning}
            onClick={handleRunWorkflowSimulation}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all"
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Running Job...' : 'Trigger Workflow'}
          </button>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Database</span>
          <p className="font-bold text-sm text-white font-mono">Git Repository</p>
          <p className="text-xs text-slate-500">JSON files with full version history</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Worker Engine</span>
          <p className="font-bold text-sm text-emerald-400 font-mono">GitHub Actions</p>
          <p className="text-xs text-slate-500">Scheduled nightly or manual dispatch</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Hosting</span>
          <p className="font-bold text-sm text-cyan-400 font-mono">GitHub Pages</p>
          <p className="text-xs text-slate-500">Static SPA with client-side cache</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Data Ownership</span>
          <p className="font-bold text-sm text-violet-400 font-mono">100% User Owned</p>
          <p className="text-xs text-slate-500">No vendor lock-in or external DB</p>
        </div>
      </div>

      {/* Workflow Terminal & Output */}
      {runLogs.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#090D16] border border-emerald-500/30 space-y-2 animate-fadeIn font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-emerald-400">
            <span className="flex items-center gap-2 font-bold">
              <Terminal className="w-4 h-4" />
              GitHub Actions Execution Log
            </span>
            <span className="text-[10px] text-slate-500">Workflow Dispatch #1042</span>
          </div>
          <div className="space-y-1 text-slate-300 py-1">
            {runLogs.map((log, i) => (
              <p key={i} className="leading-relaxed">{log}</p>
            ))}
          </div>
        </div>
      )}

      {/* Split: Left Workflow YAML, Right Live Repository JSON Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Workflow YAML Definition */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-sm text-white font-mono">
                .github/workflows/vibeos-analyzer.yml
              </h3>
            </div>
            <button
              onClick={handleCopyWorkflow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-700 transition-colors"
            >
              {copiedWorkflow ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy YAML
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto max-h-[460px] leading-relaxed">
            {GITHUB_ACTIONS_WORKFLOW_YML}
          </pre>
        </div>

        {/* Right 6 Cols: Repository Data Tree Explorer */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white font-mono">
                vibe-portfolio-data / Repository Files
              </h3>
            </div>
          </div>

          {/* File selector pills */}
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            {fileTree.map((f) => (
              <button
                key={f.path}
                onClick={() => setSelectedFile(f.path)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedFile === f.path
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {f.path}
              </button>
            ))}
          </div>

          <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-[380px] leading-relaxed select-all">
            {currentContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
