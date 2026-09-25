import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { BUSINESS_CATEGORIES } from '../../data/businessCategories';
import type { Mode } from '../../types';
import { Check } from 'lucide-react';

export function BusinessSelectionScreen({
  currentCategory = 'dairy',
  onNext,
  onBack,
  mode = 'assisted',
}: {
  currentCategory?: string;
  onNext: (selected: { category: string; name: string; capital: number; sampleDump: string }) => void;
  onBack: () => void;
  mode?: Mode;
}) {
  const { language, t } = useLocalization();
  const [selectedId, setSelectedId] = useState<string>(() => {
    const found = BUSINESS_CATEGORIES.find(
      (c) =>
        c.id === currentCategory.toLowerCase() ||
        c.defaultTitle.toLowerCase().includes(currentCategory.toLowerCase())
    );
    return found ? found.id : 'dairy';
  });

  const selectedCategoryInfo =
    BUSINESS_CATEGORIES.find((c) => c.id === selectedId) || BUSINESS_CATEGORIES[0];

  const handleContinue = () => {
    onNext({
      category: selectedCategoryInfo.defaultTitle,
      name: selectedCategoryInfo.defaultName,
      capital: selectedCategoryInfo.defaultCapital,
      sampleDump:
        selectedCategoryInfo.sampleBrainDump[language] ||
        selectedCategoryInfo.sampleBrainDump.en,
    });
  };

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      assistantMessage={
        t('assistant.businessSelect') ||
        'Choose the business you want to start or grow. This customizes all upcoming questions and schemes.'
      }
    >
      <div className="flex flex-col gap-4 pt-1 pb-6">
        <div>
          <span className="text-xs font-bold text-muted uppercase tracking-wider">
            {t('business.selectStep') || 'Step 1 of Planning'}
          </span>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight mt-1">
            {t('business.selectTitle') || 'What business would you like to build?'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('business.selectSub') || 'Select your trade to get personalized guidance, schemes, and questions.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {BUSINESS_CATEGORIES.map((cat) => {
            const isSelected = selectedId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedId(cat.id)}
                className="rounded-2xl p-3.5 flex flex-col items-start text-left transition-all active:scale-98 cursor-pointer border relative"
                style={{
                  background: isSelected ? '#EBF7F3' : 'white',
                  borderColor: isSelected ? C.primary : C.border,
                  boxShadow: isSelected ? '0 4px 14px rgba(23,107,82,0.12)' : 'none',
                  minHeight: 104,
                }}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="text-2xl">{cat.icon}</span>
                  {isSelected && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                      style={{ background: C.primary }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>

                <p
                  className="font-display font-bold text-sm text-charcoal leading-snug"
                  style={{
                    fontFamily:
                      language === 'en' ? 'var(--font-display)' : 'var(--font-display-deva)',
                    color: isSelected ? C.primary : C.charcoal,
                  }}
                >
                  {t(cat.titleKey) || cat.defaultTitle}
                </p>
                <p className="text-[10px] text-muted line-clamp-2 mt-0.5 leading-tight">
                  {t(cat.descKey) || cat.defaultDesc}
                </p>
              </button>
            );
          })}
        </div>

        <div className="pt-3">
          <Button
            label={t('common.continue') || 'Continue'}
            onClick={handleContinue}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
