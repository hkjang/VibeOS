import React, { useEffect, useState, useCallback } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ActiveTab } from '../../types/project';
import { Keyboard, Navigation2, Folder, Zap, X } from 'lucide-react';

const TAB_MAP: Record<string, ActiveTab> = {
  '1': 'dashboard',
  '2': 'radar',
  '3': 'sprints',
  '4': 'synergy',
  '5': 'copilot',
  '6': 'assets',
  '7': 'graveyard',
  '8': 'ideas',
  '9': 'dna',
};

interface ShortcutGroup {
  icon: React.ReactNode;
  titleEn: string;
  titleKo: string;
  shortcuts: { keys: string[]; descEn: string; descKo: string }[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    icon: <Navigation2 className="w-4 h-4" />,
    titleEn: 'Navigation',
    titleKo: '탐색',
    shortcuts: [
      { keys: ['Ctrl', 'K'], descEn: 'Open Command Palette', descKo: '명령 팔레트 열기' },
      { keys: ['Shift', '?'], descEn: 'Toggle this Shortcut Guide', descKo: '이 단축키 가이드 토글' },
      { keys: ['1', '–', '9'], descEn: 'Switch between tabs', descKo: '탭 간 전환 (1~9)' },
    ],
  },
  {
    icon: <Folder className="w-4 h-4" />,
    titleEn: 'Project Actions',
    titleKo: '프로젝트 액션',
    shortcuts: [
      { keys: ['N'], descEn: 'New Project', descKo: '새 프로젝트 생성' },
      { keys: ['S'], descEn: 'Open Settings', descKo: '설정 열기' },
      { keys: ['F'], descEn: 'Toggle Favorite', descKo: '즐겨찾기 토글' },
      { keys: ['E'], descEn: 'Export Resume / Portfolio', descKo: '이력서 / 포트폴리오 내보내기' },
    ],
  },
  {
    icon: <Zap className="w-4 h-4" />,
    titleEn: 'Productivity',
    titleKo: '생산성',
    shortcuts: [
      { keys: ['T'], descEn: 'Start Deep Work Timer', descKo: '딥 워크 타이머 시작' },
      { keys: ['Esc'], descEn: 'Close any modal or overlay', descKo: '모달 / 오버레이 닫기' },
      { keys: ['M'], descEn: 'Toggle Sound (mute / unmute)', descKo: '사운드 토글 (음소거)' },
    ],
  },
];

export const KeyboardShortcutOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useTranslation();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      // Shift + ? to toggle overlay
      if (e.shiftKey && e.key === '?') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // Number keys for tab switching (only when overlay is NOT open)
      if (!isOpen && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        const tab = TAB_MAP[e.key];
        if (tab) {
          e.preventDefault();
          useVibeStore.getState().setActiveTab(tab);
          return;
        }

        // N → New Project
        if (e.key === 'n' || e.key === 'N') {
          e.preventDefault();
          useVibeStore.getState().setIsNewProjectOpen(true);
          return;
        }

        // S → Settings
        if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          useVibeStore.getState().setIsSettingsOpen(true);
          return;
        }
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="max-w-lg w-full rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-mono">
                {language === 'ko' ? '키보드 단축키 가이드' : 'Keyboard Shortcuts'}
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                {language === 'ko' ? 'Shift+? 로 토글' : 'Press Shift+? to toggle'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Groups */}
        <div className="space-y-5">
          {SHORTCUT_GROUPS.map((group, gi) => (
            <div key={gi}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-slate-400">{group.icon}</span>
                <h3 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
                  {language === 'ko' ? group.titleKo : group.titleEn}
                </h3>
              </div>
              <div className="space-y-1.5">
                {group.shortcuts.map((sc, si) => (
                  <div key={si} className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                    <span className="text-xs text-slate-300">
                      {language === 'ko' ? sc.descKo : sc.descEn}
                    </span>
                    <div className="flex items-center gap-1">
                      {sc.keys.map((key, ki) => (
                        <kbd
                          key={ki}
                          className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-mono text-cyan-300 min-w-[24px] text-center"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <p className="text-[10px] font-mono text-slate-500">
            {language === 'ko'
              ? '입력 필드에 포커스가 있을 때는 단축키가 비활성화됩니다'
              : 'Shortcuts are disabled when an input field is focused'}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
