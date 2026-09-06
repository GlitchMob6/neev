import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Language } from '../../types';
import { Check } from 'lucide-react';

export function LanguageScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { language, setLanguage, t } = useLocalization();

  const languages: {
    id: Language;
    native: string;
    sub: string;
    flag: string;
    recommended?: boolean;
  }[] = [
    { id: 'en', native: 'English', sub: 'English', flag: '🇬🇧', recommended: false },
    { id: 'hi', native: 'हिन्दी', sub: 'Hindi', flag: '🇮🇳', recommended: false },
    { id: 'mr', native: 'मराठी', sub: 'Marathi', flag: '🇮🇳', recommended: true },
  ];

  const handleSelect = (langId: Language) => {
    setLanguage(langId);
  };

  return (
    <ScreenWrap onBack={onBack} progress={5} totalSteps={6}>
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('language.title') || 'Choose your language'}
          </h1>
          <p
            className="mt-1 text-sm text-muted"
            style={{ fontFamily: 'var(--font-display-deva)' }}
          >
            {t('language.subtitle') || 'भाषा चुनें · भाषा निवडा'}
          </p>
          <p className="mt-0.5 text-xs text-muted">
            {t('language.changeLater') || 'You can change this anytime in Settings.'}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {languages.map((lang) => {
            const isSelected = language === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => handleSelect(lang.id)}
                className="rounded-3xl flex items-center gap-4 px-4 py-3.5 transition-all active:scale-98 text-left cursor-pointer border"
                style={{
                  height: 76,
                  background: isSelected ? '#EBF7F3' : 'white',
                  borderColor: isSelected ? C.primary : C.border,
                }}
              >
                <span className="text-3xl">{lang.flag}</span>
                <div className="flex-1">
                  <div
                    className="text-xl font-bold text-charcoal"
                    style={{
                      fontFamily: lang.id === 'en' ? 'var(--font-display)' : 'var(--font-display-deva)',
                    }}
                  >
                    {lang.native}
                  </div>
                  <div className="text-xs text-muted font-medium">{lang.sub}</div>
                </div>

                {lang.recommended && (
                  <div
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs"
                    style={{ background: C.gold }}
                  >
                    {t('language.recommended') || 'Recommended'}
                  </div>
                )}

                {isSelected && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: C.primary }}
                  >
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <Button
            label={t('common.continue') || 'Continue'}
            onClick={onNext}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
