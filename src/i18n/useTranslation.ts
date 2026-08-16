import { useVibeStore } from '../store/useVibeStore';
import { translations, Language } from './translations';

export function useTranslation() {
  const language = useVibeStore((state) => state.language);
  const setLanguage = useVibeStore((state) => state.setLanguage);

  const t = translations[language] || translations.ko;

  return { t, language, setLanguage };
}
