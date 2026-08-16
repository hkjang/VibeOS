import React, { useState, useEffect, useRef } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import {
  Search,
  FolderGit2,
  Sparkles,
  Bot,
  Network,
  Cpu,
  Archive,
  ArrowRight,
  Command,
  FileText,
  Zap,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const {
    projects,
    assets,
    setActiveTab,
    setSelectedProjectId,
    reAnalyzeAll,
    setIsNewProjectOpen,
  } = useVibeStore();
  const { t, language } = useTranslation();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filtered projects and quick actions
  const filteredProjects = projects
    .filter(
      (p) =>
        query === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.stack.some((s) => s.toLowerCase().includes(query.toLowerCase()))
    )
    .slice(0, 6);

  const actions = [
    {
      id: 'action-copilot',
      name: 'Open Vibe Copilot AI Terminal',
      category: 'AI Tool',
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      run: () => setActiveTab('copilot'),
    },
    {
      id: 'action-synergy',
      name: 'Open Project Synergy Network Graph',
      category: 'Visualization',
      icon: <Network className="w-4 h-4 text-indigo-400" />,
      run: () => setActiveTab('synergy'),
    },
    {
      id: 'action-new-project',
      name: 'Register / Create New Project',
      category: 'Action',
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      run: () => setIsNewProjectOpen(true),
    },
    {
      id: 'action-rescore',
      name: 'Run AI Re-Score across all 234 Repositories',
      category: 'AI Audit',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      run: () => reAnalyzeAll(),
    },
    {
      id: 'action-assets',
      name: 'Browse Harvested Asset Mining Hub',
      category: 'Code Hub',
      icon: <Sparkles className="w-4 h-4 text-violet-400" />,
      run: () => setActiveTab('assets'),
    },
  ].filter((a) => query === '' || a.name.toLowerCase().includes(query.toLowerCase()));

  const allItems = [
    ...actions.map((a) => ({ type: 'action' as const, data: a })),
    ...filteredProjects.map((p) => ({ type: 'project' as const, data: p })),
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (allItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % (allItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = allItems[selectedIndex];
      if (current) {
        if (current.type === 'action') {
          current.data.run();
        } else {
          setSelectedProjectId(current.data.id);
          setActiveTab('radar');
        }
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-[#090D16] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col font-sans"
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              language === 'ko'
                ? '234개 프로젝트 검색, AI 명령, 빠른 탭 이동...'
                : 'Search 234 repositories, AI commands, switch views (Esc to exit)...'
            }
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {actions.length > 0 && (
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 font-bold">
              Global Commands & Views
            </div>
          )}

          {actions.map((act, i) => {
            const isSelected = selectedIndex === i;
            return (
              <button
                key={act.id}
                onClick={() => {
                  act.run();
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border border-cyan-500/30 text-white'
                    : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                    {act.icon}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold block">{act.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{act.category}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            );
          })}

          {filteredProjects.length > 0 && (
            <div className="px-3 pt-3 pb-1.5 text-[10px] font-mono uppercase text-slate-500 font-bold">
              Repositories ({filteredProjects.length} of 234)
            </div>
          )}

          {filteredProjects.map((proj, idx) => {
            const itemIdx = actions.length + idx;
            const isSelected = selectedIndex === itemIdx;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setActiveTab('radar');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border border-cyan-500/30 text-white'
                    : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[11px] font-bold">
                    {proj.score.total}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold font-mono text-white block">
                      {proj.name}
                    </span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">
                      {proj.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <span className="uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {proj.stage}
                  </span>
                </div>
              </button>
            );
          })}

          {allItems.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              No matching commands or projects found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>234 Repositories Indexed</span>
        </div>
      </div>
    </div>
  );
};
