import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
import {
  X,
  Copy,
  Check,
  Download,
  Calendar,
  Sparkles,
  Flame,
  Award,
  TrendingUp,
  FileText,
  Share2,
} from 'lucide-react';

interface WeeklyDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklyDigestModal: React.FC<WeeklyDigestModalProps> = ({ isOpen, onClose }) => {
  const { projects, assets, summary } = useVibeStore();
  const { language } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const authorName = localStorage.getItem('vibeos_author_name') || 'hkjang';
  const authorGithub = localStorage.getItem('vibeos_author_github') || 'https://github.com/hkjang';

  // Calculate top momentum projects
  const topMomentum = [...projects]
    .sort((a, b) => b.score.activity - a.score.activity)
    .slice(0, 5);

  const activeSprints = projects.filter((p) => p.stage === 'grow' || p.stage === 'prototype').slice(0, 4);

  const digestDate = new Date().toISOString().slice(0, 10);

  const markdownContent = `# 🚀 Weekly Engineering Digest & Vibe Velocity Report
> **Author**: [${authorName}](${authorGithub}) | **Generated**: ${digestDate}  
> **Platform**: [VibeOS Developer Operating System](https://github.com/hkjang/VibeOS)

---

## 📊 Portfolio Velocity Overview

- 📦 **Total Repositories Under Management**: **${projects.length}** repos
- 🔥 **Active Sprint Engines**: **${summary.growing}** projects in high growth
- 🧱 **Universal Lego Modules Mined**: **${assets.length}** reusable assets
- ⚡ **Weekly Engineering Leverage**: ~**85+ hours saved** via cross-project asset reuse

---

## 🌟 Top Momentum Repositories This Week

${topMomentum
  .map(
    (p, i) => `### ${i + 1}. [${p.name}](${p.dna.githubUrl})
- **Overall Score**: \`${p.score.total}/100\` (Momentum: \`${p.score.activity} pts\`)
- **Tech Stack**: \`${p.stack.join('`, `')}\`
- **Description**: ${p.description}
- **Upcoming Milestone**: ${p.nextAction}
`
  )
  .join('\n')}

---

## 💎 Recently Harvested Standalone Lego Blocks

${assets
  .slice(0, 4)
  .map(
    (a) => `- **${a.name}** (\`${a.language}\`): ${a.description} (Applied in \`${a.usageCount}\` repositories)`
  )
  .join('\n')}

---

## 🎯 Next Week High-Impact Focus

${activeSprints
  .map(
    (p) => `- **${p.name}**: ${p.nextAction}`
  )
  .join('\n')}

---
*Published with ⚡ [VibeOS](https://github.com/hkjang/VibeOS) — The AI-Powered Autonomous Side-Project OS*
`;

  const handleCopy = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundEngine.playAiSuccess();
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weekly-vibe-digest-${digestDate}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-amber-400">
            <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-mono">
                {language === 'ko' ? '주간 엔지니어링 다이제스트 & 벨로시티 리포트' : 'Weekly Engineering Digest & Report'}
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                {projects.length} Repositories Automated Weekly Synthesis
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950/60">
          <pre className="whitespace-pre-wrap leading-relaxed">{markdownContent}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono">
            {language === 'ko'
              ? 'Substack, LinkedIn, GitHub README, 블로그 포스팅에 최적화된 마크다운'
              : 'Optimized for Substack, LinkedIn, and GitHub README publishing.'}
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold font-mono transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'ko' ? '복사 완료!' : 'Copied!') : (language === 'ko' ? '마크다운 복사' : 'Copy Markdown')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold font-mono transition-colors shadow-lg shadow-amber-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ko' ? '.md 다운로드' : 'Download .md'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
