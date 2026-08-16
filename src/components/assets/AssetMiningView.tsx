import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { ReusableAsset } from '../../types/project';
import {
  Sparkles,
  Copy,
  Check,
  Code2,
  FolderGit2,
  Filter,
  Plus,
  Trash2,
  FileCode,
  Tag,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const AssetMiningView: React.FC = () => {
  const { assets, addAsset, deleteAsset, projects, mineProjectAssets, showToast } = useVibeStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<ReusableAsset | null>(assets[0] || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Asset form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ReusableAsset['category']>('utility');
  const [formSource, setFormSource] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formLang, setFormLang] = useState('TypeScript');
  const [formCode, setFormCode] = useState('');
  const [formTags, setFormTags] = useState('');

  const categories = [
    { id: 'all', label: 'All Assets' },
    { id: 'auth', label: 'Auth & Security' },
    { id: 'llm', label: 'LLM & AI Wrappers' },
    { id: 'ui', label: 'UI Components' },
    { id: 'api', label: 'API & Adapters' },
    { id: 'utility', label: 'Core Utilities' },
  ];

  const filteredAssets = assets.filter((a) => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    showToast('Code copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCode.trim()) {
      showToast('Name and code snippet are required', 'warning');
      return;
    }

    addAsset({
      name: formName,
      category: formCategory,
      sourceProject: formSource || 'Universal',
      description: formDesc || 'Reusable extracted code block',
      language: formLang,
      codeSnippet: formCode,
      tags: formTags ? formTags.split(',').map((t) => t.trim()) : [formLang],
      usageCount: 1,
    });

    setIsAddModalOpen(false);
    setFormName('');
    setFormCode('');
    setFormDesc('');
    setFormTags('');
  };

  const handleMineAll = () => {
    let count = 0;
    projects.forEach((p) => {
      mineProjectAssets(p.id);
      count++;
    });
    showToast(`Scanned ${count} repositories and mined latest reusable abstractions!`, 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-violet-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-violet-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs uppercase font-mono tracking-widest font-bold">
              Knowledge Extraction Hub
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Asset Mining & Code Bank
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            Never rewrite auth, LLM wrappers, or UI tables from scratch. Every project in VibeOS
            is continuously mined for battle-tested snippets and shared across your workspace.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleMineAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/40 hover:bg-violet-600/30 text-xs font-bold transition-all"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            Scan & Mine All Projects
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-violet-500/20 text-violet-300 border-violet-500 font-bold shadow-md shadow-violet-500/10'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Split View: Asset List on Left, Code Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Asset Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filteredAssets.map((asset) => {
            const isSelected = selectedAsset?.id === asset.id;
            return (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-slate-900 border-violet-500/60 shadow-lg shadow-violet-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      {asset.category}
                    </span>
                    <h3 className="font-bold text-sm text-white font-mono">{asset.name}</h3>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                    {asset.language}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {asset.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 mt-2 border-t border-slate-800/80 font-mono">
                  <span>Source: {asset.sourceProject}</span>
                  <span className="text-violet-400">Used in {asset.usageCount} projects</span>
                </div>
              </div>
            );
          })}

          {filteredAssets.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-xs text-slate-400">
              No assets in this category.
            </div>
          )}
        </div>

        {/* Right Column: Code Snippet & Inspector */}
        <div className="lg:col-span-7">
          {selectedAsset ? (
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 sticky top-20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white font-mono">
                      {selectedAsset.name}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{selectedAsset.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(selectedAsset.codeSnippet, selectedAsset.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 shadow-md shadow-violet-600/20 transition-all"
                  >
                    {copiedId === selectedAsset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Snippet
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove asset "${selectedAsset.name}"?`)) {
                        deleteAsset(selectedAsset.id);
                        setSelectedAsset(assets.find((a) => a.id !== selectedAsset.id) || null);
                      }
                    }}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tags & Meta */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                  Extracted from: <strong className="text-white">{selectedAsset.sourceProject}</strong>
                </span>
                <span className="text-slate-600">•</span>
                <div className="flex flex-wrap gap-1">
                  {selectedAsset.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Syntax Highlighted Code Viewer */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0F19]">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-slate-300 font-semibold">{selectedAsset.language}</span>
                  </div>
                  <span>{selectedAsset.codeSnippet.split('\n').length} lines</span>
                </div>

                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-[460px] leading-relaxed select-all">
                  <code>{selectedAsset.codeSnippet}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-400 text-sm">
              Select an asset from the list to view code.
            </div>
          )}
        </div>
      </div>

      {/* Add Custom Asset Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0F172A] border border-slate-700 w-full max-w-xl rounded-3xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white font-mono">Catalog New Reusable Asset</h2>
            <form onSubmit={handleCreateAsset} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Asset Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. OpenAI Vector Search Hook"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="auth">Auth & Security</option>
                    <option value="llm">LLM & AI Wrapper</option>
                    <option value="ui">UI Component</option>
                    <option value="api">API & Webhook</option>
                    <option value="database">Database</option>
                    <option value="utility">Utility</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Language</label>
                  <input
                    type="text"
                    value={formLang}
                    onChange={(e) => setFormLang(e.target.value)}
                    placeholder="TypeScript"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Description</label>
                <input
                  type="text"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="What problem does this reusable snippet solve?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Code Snippet</label>
                <textarea
                  required
                  rows={8}
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="Paste snippet code here..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-cyan-300 font-mono text-xs focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500"
                >
                  Save to Asset Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
