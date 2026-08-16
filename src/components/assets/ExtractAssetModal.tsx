import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { X, Sparkles, Plus, Code2, Tag, Layers } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface ExtractAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtractAssetModal: React.FC<ExtractAssetModalProps> = ({ isOpen, onClose }) => {
  const { projects, addAsset, showToast } = useVibeStore();
  const { language } = useTranslation();

  const [name, setName] = useState('');
  const [sourceProject, setSourceProject] = useState(projects[0]?.name || 'opengajae');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'auth' | 'ui' | 'llm' | 'database' | 'api' | 'utility' | 'infra'>('llm');
  const [codeSnippet, setCodeSnippet] = useState(`// Exported universal reusable module
export class UniversalAdapter {
  constructor(private config: Record<string, any>) {}

  async execute(payload: any) {
    // Shared runtime logic
    return { ok: true, timestamp: Date.now() };
  }
}`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      showToast('Please provide asset name and description', 'warning');
      return;
    }

    addAsset({
      name: name.trim(),
      sourceProject,
      description: description.trim(),
      category,
      language: 'TypeScript',
      codeSnippet,
      tags: ['universal', category, sourceProject],
      usageCount: 1,
    });

    soundEngine.playAiSuccess();
    showToast(`💎 Extracted asset "${name}" saved to Universal Hub!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-violet-400 font-mono">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              Extract Universal Reusable Asset
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs font-mono">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">Asset Module Name:</label>
            <input
              type="text"
              required
              placeholder="e.g. MultiChannelAgentRouter"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Source Repository:</label>
              <select
                value={sourceProject}
                onChange={(e) => setSourceProject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-violet-500"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.stage})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-violet-500"
              >
                <option value="llm">🤖 AI & LLM Routine</option>
                <option value="api">⚡ API / Protocol Wrapper</option>
                <option value="ui">🎨 UI & Visual Component</option>
                <option value="database">💾 Database & Storage Driver</option>
                <option value="utility">🛠️ DevTools & Utility</option>
                <option value="auth">🔒 Auth & Security</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">Value & Reusability Summary:</label>
            <textarea
              required
              rows={2}
              placeholder="Why is this module valuable across multiple repositories?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-violet-500 font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">Universal TypeScript Code Snippet:</label>
            <textarea
              required
              rows={6}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-violet-300 font-mono text-[11px] focus:border-violet-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-md shadow-violet-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Extract & Save Asset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
