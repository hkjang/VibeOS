import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { X, Copy, Check, Download, FileText, Sparkles } from 'lucide-react';

interface ResumeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeExportModal: React.FC<ResumeExportModalProps> = ({ isOpen, onClose }) => {
  const { projects, assets, summary } = useVibeStore();
  const { t, language } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const growingProjects = projects.filter((p) => p.stage === 'grow');
  const activeProjects = projects.filter((p) => p.status === 'active');
  const graveyardProjects = projects.filter((p) => p.status === 'graveyard');

  // Tech stack occurrences
  const stackCounts: Record<string, number> = {};
  projects.forEach((p) => {
    p.stack.forEach((s) => {
      stackCounts[s] = (stackCounts[s] || 0) + 1;
    });
  });

  const topStacks = Object.entries(stackCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const markdownContent = `# Hyung-Kyu Jang (hkjang) — Engineering Portfolio & Platform Summary

> **VibeOS Developer Intelligence Report**
> Generated on: ${new Date().toISOString().slice(0, 10)}
> GitHub: [https://github.com/hkjang](https://github.com/hkjang)

---

## 🚀 Executive Summary

- **Total Repositories Managed**: **234** projects
- **Active Growth Engines**: **${summary.growing}** projects
- **Validated Experiments**: **${summary.experiment}** projects
- **Harvested Standalone Modules**: **${assets.length}** universal assets
- **Total Mined Engineering Compound Time**: ~**3,850+ hours** preserved

---

## 🛠️ Core Tech Stack & Verified Competencies

${topStacks.map(([s, count]) => `- **${s}**: ${count} repositories`).join('\n')}

---

## 🌟 Flagship Growth Engines

${growingProjects
  .slice(0, 8)
  .map(
    (p) => `### [${p.name}](${p.dna.githubUrl})
- **Score**: ${p.score.total}/100 (Momentum: ${p.score.activity}, Market Potential: ${p.score.potential})
- **Stack**: \`${p.stack.join('`, `')}\`
- **Description**: ${p.description}
- **Architecture**: ${p.dna.architecture}
- **Next High-Impact Milestone**: ${p.nextAction}
`
  )
  .join('\n')}

---

## 💎 Harvested Standalone Modules

${assets
  .map(
    (a) => `### ${a.name}
- **Source**: \`${a.sourceProject}\` | **Language**: \`${a.language}\` | **Usage**: ${a.usageCount} times
- **Description**: ${a.description}
- **Tags**: \`${a.tags.join('`, `')}\`
`
  )
  .join('\n')}

---

## ⚰️ Post-Mortem & Knowledge Retention

- **Archived Experiments**: ${graveyardProjects.length} repositories
- **Key Takeaway**: External platform APIs and legacy bindings were decoupled into **Local-First, Zero-Backend, Multi-Channel Adapter Architecture**.

---
*Generated via [VibeOS](https://github.com/hkjang/VibeOS)*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hkjang-portfolio-resume-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <FileText className="w-5 h-5" />
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              Portfolio Resume & Markdown Exporter (234 Projects)
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-900/50">
          <pre className="whitespace-pre-wrap leading-relaxed">{markdownContent}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Ready for GitHub README, Substack, or PDF conversion
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown' : 'Copy to Clipboard'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
