import React, { useState, useEffect } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
import { X, Copy, Check, Download, FileText, User, Briefcase, Mail, Globe, Sparkles } from 'lucide-react';

interface ResumeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeExportModal: React.FC<ResumeExportModalProps> = ({ isOpen, onClose }) => {
  const { projects, assets, summary } = useVibeStore();
  const { language } = useTranslation();
  const [copied, setCopied] = useState(false);

  // User Customizable Profile fields (persisted to localStorage)
  const [authorName, setAuthorName] = useState(() => {
    return localStorage.getItem('vibeos_author_name') || 'hkjang';
  });
  const [authorTitle, setAuthorTitle] = useState(() => {
    return localStorage.getItem('vibeos_author_title') || 'AI & Full-Stack Platform Engineer';
  });
  const [authorEmail, setAuthorEmail] = useState(() => {
    return localStorage.getItem('vibeos_author_email') || 'gagagiga@naver.com';
  });
  const [authorGithub, setAuthorGithub] = useState(() => {
    return localStorage.getItem('vibeos_author_github') || 'https://github.com/hkjang';
  });

  useEffect(() => {
    localStorage.setItem('vibeos_author_name', authorName);
    localStorage.setItem('vibeos_author_title', authorTitle);
    localStorage.setItem('vibeos_author_email', authorEmail);
    localStorage.setItem('vibeos_author_github', authorGithub);
  }, [authorName, authorTitle, authorEmail, authorGithub]);

  if (!isOpen) return null;

  const growingProjects = projects.filter((p) => p.stage === 'grow');
  const activeProjects = projects.filter((p) => p.status === 'active');
  const graveyardProjects = projects.filter((p) => p.status === 'graveyard' || p.stage === 'archived');

  // Tech stack occurrences
  const stackCounts: Record<string, number> = {};
  projects.forEach((p) => {
    p.stack.forEach((s) => {
      stackCounts[s] = (stackCounts[s] || 0) + 1;
    });
  });

  const topStacks = Object.entries(stackCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const markdownContent = `# ${authorName} — Engineering Portfolio & Platform Summary

> **${authorTitle}**  
> GitHub: [${authorGithub}](${authorGithub}) | Email: [${authorEmail}](mailto:${authorEmail})  
> Generated on: ${new Date().toISOString().slice(0, 10)} via [VibeOS](https://github.com/hkjang/VibeOS)

---

## 🚀 Executive Portfolio Summary

- **Total Repositories Managed**: **${projects.length}** projects
- **Active Growth Engines**: **${growingProjects.length}** projects
- **Validated Prototypes & Utilities**: **${projects.filter(p => p.stage === 'prototype' || p.stage === 'maintain').length}** projects
- **Harvested Standalone Modules**: **${assets.length}** universal assets
- **Total Estimated Engineering Leverage Time**: ~**3,850+ hours** preserved

---

## 🛠️ Core Tech Stack & Verified Competencies

${topStacks.map(([s, count]) => `- **${s}**: ${count} repositories`).join('\n')}

---

## 🌟 Flagship Growth Engines & Star Projects

${growingProjects
  .slice(0, 10)
  .map(
    (p) => `### [${p.name}](${p.dna.githubUrl})
- **Score**: ${p.score.total}/100 (Momentum: ${p.score.activity} pts, Market Potential: ${p.score.potential} pts)
- **Stack**: \`${p.stack.join('`, `')}\`
- **Description**: ${p.description}
- **Architecture**: ${p.dna.architecture}
- **Next High-Impact Action**: ${p.nextAction}
`
  )
  .join('\n')}

---

## 💎 Harvested Standalone Modules & Reusable Assets

${assets
  .map(
    (a) => `### ${a.name}
- **Source Project**: \`${a.sourceProject}\` | **Language**: \`${a.language}\` | **Usage Count**: ${a.usageCount} times
- **Description**: ${a.description}
- **Tags**: \`${a.tags.join('`, `')}\`
`
  )
  .join('\n')}

---

## ⚰️ Post-Mortem & Architecture Retention

- **Archived Experiments / Graveyard**: ${graveyardProjects.length} repositories
- **Key Engineering Philosophy**: Decoupled monolithic dependencies into **Local-First, Zero-Backend, Multi-Agent Orchestrator Architecture**.

---
*Generated with [VibeOS Developer OS](https://github.com/hkjang/VibeOS)*
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
    const cleanFileName = authorName.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    a.href = url;
    a.download = `${cleanFileName}-portfolio-resume-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <FileText className="w-5 h-5" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-mono">
                {language === 'ko' ? '포트폴리오 이력서 & 마크다운 내보내기' : 'Portfolio Resume & Markdown Exporter'}
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                {projects.length} {language === 'ko' ? '개 프로젝트 실시간 집계' : 'Repositories dynamically compiled'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Customization Inputs Bar */}
        <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
              <User className="w-3 h-3 text-cyan-400" />
              {language === 'ko' ? '작성자 이름' : 'Author Name'}
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="hkjang"
              className="w-full bg-slate-950 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
              <Briefcase className="w-3 h-3 text-emerald-400" />
              {language === 'ko' ? '직함 / 타이틀' : 'Title / Role'}
            </label>
            <input
              type="text"
              value={authorTitle}
              onChange={(e) => setAuthorTitle(e.target.value)}
              placeholder="AI & Full-Stack Platform Engineer"
              className="w-full bg-slate-950 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
              <Mail className="w-3 h-3 text-amber-400" />
              {language === 'ko' ? '이메일' : 'Email'}
            </label>
            <input
              type="text"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="gagagiga@naver.com"
              className="w-full bg-slate-950 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
              <Globe className="w-3 h-3 text-violet-400" />
              {language === 'ko' ? 'GitHub URL' : 'GitHub URL'}
            </label>
            <input
              type="text"
              value={authorGithub}
              onChange={(e) => setAuthorGithub(e.target.value)}
              placeholder="https://github.com/hkjang"
              className="w-full bg-slate-950 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-violet-400"
            />
          </div>
        </div>

        {/* Markdown Preview Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950/60">
          <pre className="whitespace-pre-wrap leading-relaxed">{markdownContent}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono">
            {language === 'ko'
              ? '위 입력란에서 이름/직함을 수정하면 실시간 반영 및 영구 저장됩니다.'
              : 'Edit fields above to customize Markdown in real-time.'}
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold font-mono transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'ko' ? '복사 완료!' : 'Copied!') : (language === 'ko' ? '클립보드 복사' : 'Copy Markdown')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold font-mono transition-colors shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ko' ? '.md 파일 다운로드' : 'Download .md'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
