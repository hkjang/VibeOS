import React, { useState } from 'react';
import { ProjectItem } from '../../types/project';
import { useTranslation } from '../../i18n/useTranslation';
import { openInEditor } from '../../utils/editorLauncher';
import { X, Copy, Check, Bot, Terminal, ExternalLink, Sparkles } from 'lucide-react';

interface PromptBlueprintModalProps {
  project: ProjectItem;
  isOpen: boolean;
  onClose: () => void;
}

export const PromptBlueprintModal: React.FC<PromptBlueprintModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { language } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const antigravityPrompt = `You are an elite agentic pair-programmer working on \`${project.name}\`.
Local Workspace Directory: /mnt/d/project/${project.name}

# Project Context & DNA:
- **Description**: ${project.description}
- **Tech Stack**: ${project.stack.join(', ')}
- **Architecture**: ${project.dna.architecture}
- **Key Patterns**: ${project.dna.keyPatterns.join(', ')}
- **Lifecycle Stage**: ${project.stage.toUpperCase()} (4D AI Score: ${project.score.total}/100)

# Current High-Leverage Milestone to Execute:
🎯 **Goal**: ${project.nextAction}
- **Category**: ${project.nextActionCategory.toUpperCase()}

# Engineering Guidelines:
1. Inspect the codebase structure under \`/mnt/d/project/${project.name}\`.
2. Keep dependencies minimal and adhere strictly to TypeScript strict mode.
3. Modularize reusable components and utilities for global VibeOS asset harvesting.
4. Execute the goal, verify with local builds/tests, and report what was completed.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(antigravityPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] font-sans">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-violet-400">
            <Bot className="w-5 h-5 text-violet-400" />
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              Antigravity & Claude Code AI Prompt Starter — {project.name}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-900/50">
          <pre className="whitespace-pre-wrap leading-relaxed">{antigravityPrompt}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => openInEditor(project.name, 'vscode')}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:underline font-mono"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open in VS Code (`/mnt/d/project/${project.name}`)</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-500 text-xs font-bold font-mono transition-colors shadow-md shadow-violet-600/20"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Prompt' : 'Copy AI Starter Prompt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
