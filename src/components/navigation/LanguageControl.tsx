import { useState } from 'react';
import { useLocalization } from '../../i18n';
import type { Language } from '../../types';
import { Globe, Check, X } from 'lucide-react';
import { C } from '../ui';

export const SUPPORTED_LANGUAGES: {
  id: Language;
  native: string;
  sub: string;
  flag: string;
  shortCode: string;
}[] = [
  { id: 'en', native: 'English', sub: 'English', flag: '🇬🇧', shortCode: 'EN' },
  { id: 'mr', native: 'मराठी', sub: 'Marathi', flag: '🇮🇳', shortCode: 'मरा' },
  { id: 'hi', native: 'हिन्दी', sub: 'Hindi', flag: '🇮🇳', shortCode: 'हि' },
  { id: 'gu', native: 'ગુજરાતી', sub: 'Gujarati', flag: '🇮🇳', shortCode: 'ગુ' },
  { id: 'ta', native: 'தமிழ்', sub: 'Tamil', flag: '🇮🇳', shortCode: 'த' },
  { id: 'te', native: 'తెలుగు', sub: 'Telugu', flag: '🇮🇳', shortCode: 'తె' },
  { id: 'kn', native: 'ಕನ್ನಡ', sub: 'Kannada', flag: '🇮🇳', shortCode: 'ಕ' },
  { id: 'ml', native: 'മലയാളം', sub: 'Malayalam', flag: '🇮🇳', shortCode: 'മ' },
  { id: 'pa', native: 'ਪੰਜਾਬੀ', sub: 'Punjabi', flag: '🇮🇳', shortCode: 'ਪੰ' },
  { id: 'tulu', native: 'ತುಳು', sub: 'Tulu', flag: '🇮🇳', shortCode: 'ತು' },
];

export function LanguageControl({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  const { language, setLanguage, t } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === language) || SUPPORTED_LANGUAGES[0];

  const handleSelect = (langId: Language) => {
    setLanguage(langId);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs border ${className}`}
        style={{
          background: 'white',
          borderColor: C.border,
          color: C.charcoal,
        }}
        title="Change Language / भाषा बदला"
        aria-label="Change Language"
      >
        <Globe size={14} className="text-teal" />
        <span
          className="font-bold text-xs"
          style={{
            fontFamily: language === 'en' ? 'var(--font-display)' : 'var(--font-display-deva)',
          }}
        >
          {compact ? currentLang.shortCode : currentLang.native}
        </span>
        <span className="text-[9px] text-muted font-normal ml-0.5">▼</span>
      </button>

      {/* Language Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full max-w-[340px] max-h-[85vh] bg-[#FAF7F0] rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/60 bg-cream">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ background: C.primary }}
                >
                  <Globe size={16} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-charcoal leading-tight">
                    {t('language.title') || 'Select Language'}
                  </h3>
                  <p className="text-[11px] text-muted">भाषा निवडा · भाषा चुनें</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal hover:bg-sand/60 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language List */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 max-h-[50vh]">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => handleSelect(lang.id)}
                    className="flex items-center justify-between p-3 rounded-2xl border transition-all active:scale-98 cursor-pointer text-left"
                    style={{
                      background: isSelected ? '#EBF7F3' : 'white',
                      borderColor: isSelected ? C.primary : C.border,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <p
                          className="font-bold text-base text-charcoal leading-tight"
                          style={{
                            fontFamily:
                              lang.id === 'en' ? 'var(--font-display)' : 'var(--font-display-deva)',
                          }}
                        >
                          {lang.native}
                        </p>
                        <p className="text-[11px] text-muted font-medium">{lang.sub}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                        style={{ background: C.primary }}
                      >
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 pt-2 border-t border-border/60 bg-cream text-center">
              <p className="text-[11px] text-muted">
                {t('language.changeLater') || 'You can change this anytime from the top-right corner.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
