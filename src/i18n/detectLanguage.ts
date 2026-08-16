import { Language } from './translations';

export function detectBrowserLanguage(): Language {
  // 1. Check URL query param (e.g. ?lang=ko or ?lang=en)
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') || params.get('l');
      if (urlLang === 'ko' || urlLang === 'en') {
        return urlLang;
      }
    } catch {
      // Ignore URL parsing errors
    }
  }

  // 2. Check navigator languages array
  if (typeof navigator !== 'undefined') {
    const navLanguages = navigator.languages || [navigator.language];
    for (const lang of navLanguages) {
      if (!lang) continue;
      const lower = lang.toLowerCase();
      if (lower.startsWith('ko')) {
        return 'ko';
      }
    }
  }

  // Default to English for international browser locales
  return 'en';
}

export function syncDocumentLanguage(lang: Language) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;

    // Update document title and meta description dynamically based on language
    if (lang === 'ko') {
      document.title = 'VibeOS — 바이브 코더를 위한 포트폴리오 운영체제 | AI 프로젝트 레이더 & 자산 마이닝';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'VibeOS는 바이브 코더를 위한 서버리스 프로젝트 생애주기 운영체제입니다. 4D AI 점수 평가, 우선순위 행동 제안, 재사용 코드 자산화, 묘지 포스트모템을 지원합니다.'
        );
      }
    } else {
      document.title = 'VibeOS — The Operating System for Vibe Coders | AI Portfolio & Asset Mining';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'VibeOS is a serverless operating system for vibe-coders. Track, score with 4D AI metrics, prioritize next actions, mine reusable code assets, and convert dead projects into personal development platforms.'
        );
      }
    }
  }
}
