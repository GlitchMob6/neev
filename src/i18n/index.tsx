import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { en, type TranslationKeys } from './en';
import { hi } from './hi';
import { mr } from './mr';
import { gu } from './gu';
import { ta } from './ta';
import { te } from './te';
import { ml } from './ml';
import { kn } from './kn';
import { tulu } from './tulu';
import { pa } from './pa';

import type { Language } from '../types';

const translations: Record<Language, Record<string, string>> = { en, hi, mr, gu, ta, te, ml, kn, tulu, pa };

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
  const [language, setLanguageState] = useState<Language>(initialLanguage || 'en');

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', initialLanguage || 'en');
  }, [initialLanguage]);

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
