import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { en, type TranslationKeys } from './en';
import { hi } from './hi';
import { mr } from './mr';
import type { Language } from '../types';

const translations: Record<Language, Record<string, string>> = { en, hi, mr };

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys | string, params?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export function LocalizationProvider({
  children,
  initialLanguage = 'en',
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(
    () => (sessionStorage.getItem('neev-lang') as Language) || initialLanguage || 'en'
  );

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    sessionStorage.setItem('neev-lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
  }, []);

  const t = useCallback(
    (key: TranslationKeys | string, params?: Record<string, string | number>): string => {
      const langDict = translations[language];
      const enDict = translations.en;
      let text = (langDict && langDict[key]) || (enDict && enDict[key]) || '';
      if (!text) return '';
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [language]
  );

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  return useContext(LocalizationContext);
}

export { type TranslationKeys };
