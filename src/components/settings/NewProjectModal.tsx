import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProjectStage } from '../../types/project';
import { analyzeProjectMeta } from '../../services/aiAnalyzer';
import { X, Rocket } from 'lucide-react';

export const NewProjectModal: React.FC = () => {
  const { isNewProjectOpen, setIsNewProjectOpen, addProject, showToast } = useVibeStore();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState<ProjectStage>('prototype');
  const [stackInput, setStackInput] = useState('TypeScript, React, TailwindCSS');
  const [githubUrl, setGithubUrl] = useState('');
  const [architecture, setArchitecture] = useState('React Vite SPA with TailwindCSS');

  if (!isNewProjectOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Project name is required', 'warning');
      return;
    }

    const stack = stackInput.split(',').map((s) => s.trim()).filter(Boolean);
    const analysis = analyzeProjectMeta({
      name,
      description,
      createdAt: new Date().toISOString(),
      pushedAt: new Date().toISOString(),
      stack,
      commitCount: 5,
    });

    addProject({
      name: name.toLowerCase().replace(/\s+/g, '-'),
      description: description || 'New Vibe-coded side project',
      status: 'active',
      stage,
      createdAt: new Date().toISOString().slice(0, 10),
      lastActivityAt: new Date().toISOString().slice(0, 10),
      stack: stack.length > 0 ? stack : ['TypeScript', 'React'],
      score: analysis.score,
      assets: [],
      nextAction: analysis.nextAction,
      nextActionCategory: analysis.nextActionCategory,
      dna: {
        architecture: architecture || 'Standard modular architecture',
        keyPatterns: ['Clean Architecture', 'Modular Components'],
        dependencies: {},
        commitVelocityWeekly: 6,
        lastCommitMessage: 'feat: initialize project scaffold',
        githubUrl: githubUrl || undefined,
      },
      stars: 0,
      forks: 0,
      openIssues: 0,
    });

    setIsNewProjectOpen(false);
    setName('');
    setDescription('');
    setGithubUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0F172A] border border-slate-700 w-full max-w-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-mono">
                {t.radar.addProject}
              </h2>
              <p className="text-xs text-slate-400">Track and score an AI side-project</p>
            </div>
          </div>

          <button
            onClick={() => setIsNewProjectOpen(false)}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-xs font-mono">
          <div>
            <label className="text-slate-300 block mb-1">Project Name / Slug</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. omni-prompt-ai"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this project do?"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className="text-slate-300 block mb-1">Initial Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="prototype">{t.stages.prototype}</option>
                <option value="experiment">{t.stages.experiment}</option>
                <option value="grow">{t.stages.grow}</option>
                <option value="maintain">{t.stages.maintain}</option>
                <option value="idea">{t.stages.idea}</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Tech Stack (Comma-separated)</label>
              <input
                type="text"
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                placeholder="TypeScript, React, FastAPI, OpenAI"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Architecture Summary (Optional)</label>
            <input
              type="text"
              value={architecture}
              onChange={(e) => setArchitecture(e.target.value)}
              placeholder="e.g. Next.js 14 App Router + Supabase + Anthropic"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">GitHub Repo URL (Optional)</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 sm:pt-3">
            <button
              type="button"
              onClick={() => setIsNewProjectOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-[1.02] shadow-md shadow-cyan-500/20"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
