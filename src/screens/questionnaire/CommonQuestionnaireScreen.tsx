import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { useLocalization } from '../../i18n';
import { COMMON_QUESTIONS } from '../../data/questionnaireData';
import { Volume2, Check } from 'lucide-react';
import { C } from '../../components/ui';
import type { Mode } from '../../types';

export function CommonQuestionnaireScreen({
  initialAnswers = {},
  mode = 'assisted',
  onNext,
  onBack,
}: {
  initialAnswers?: Record<string, string>;
  mode?: Mode;
  onNext: (answers: Record<string, string>) => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);

  const currentQ = COMMON_QUESTIONS[step];
  const isSelected = Boolean(answers[currentQ.id]);

  const handleSelect = (val: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  };

  const handleNext = () => {
    if (step < COMMON_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onNext(answers);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <ScreenWrap
      onBack={handleBack}
      step={step + 1}
      totalSteps={5}
      mode={mode}
      assistantMessage={
        t('assistant.commonQuestions') ||
        'Great! I just need a few simple details to understand your business better.'
      }
    >
      <div className="flex flex-col gap-4 pt-1 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">
            {t('q.common.stepHeader', { current: step + 1, total: 5 }) ||
              `Common Question ${step + 1} of 5`}
          </span>

          {mode === 'assisted' && (
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-teal cursor-pointer"
              style={{ background: '#EBF7F3', border: '1px solid #B8DFD4' }}
            >
              <Volume2 size={14} />
              <span>{t('wizard.hearThis') || 'Hear this'}</span>
            </button>
          )}
        </div>

        <div>
          <h1 className="font-display font-bold text-xl text-charcoal leading-snug">
            {t(currentQ.qKey) || currentQ.defaultQ}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t(currentQ.subKey) || currentQ.defaultSub}
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2.5 pt-1">
          {currentQ.options.map((opt) => {
            const active = answers[currentQ.id] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className="w-full rounded-2xl p-4 flex items-center justify-between text-left transition-all active:scale-98 cursor-pointer border shadow-2xs"
                style={{
                  background: active ? '#EBF7F3' : 'white',
                  borderColor: active ? C.primary : C.border,
                }}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {opt.icon && <span className="text-2xl flex-shrink-0">{opt.icon}</span>}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-display font-bold text-sm text-charcoal leading-snug"
                      style={{ color: active ? C.primary : C.charcoal }}
                    >
                      {t(opt.labelKey) || opt.defaultLabel}
                    </p>
                    {opt.subtext && (
                      <p className="text-[11px] text-muted font-medium mt-0.5">{opt.subtext}</p>
                    )}
                  </div>
                </div>

                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ml-2"
                  style={{
                    background: active ? C.primary : 'transparent',
                    border: `2px solid ${active ? C.primary : C.border}`,
                  }}
                >
                  {active && <Check size={14} color="#ffffff" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            style={{ background: C.primary, color: 'white' }}
            onClick={handleNext}
            disabled={!isSelected}
          >
            <span>
              {step < COMMON_QUESTIONS.length - 1
                ? t('wizard.next') || 'Next'
                : t('q.proceedToAdaptive') || 'Continue to Business Questions'}
            </span>
            <span className="text-lg leading-none">→</span>
          </button>
        </div>
      </div>
    </ScreenWrap>
  );
}
