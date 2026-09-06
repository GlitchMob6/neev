import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { AnswerCard, Button } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Mode, SchemeDiscoveryAnswers } from '../../types';

export function SchemeDiscoveryScreen({
  mode,
  onComplete,
  onBack,
}: {
  mode?: Mode;
  onComplete: (answers: SchemeDiscoveryAnswers) => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<SchemeDiscoveryAnswers>({});

  const totalSteps = 3;

  const handleSelect = (key: keyof SchemeDiscoveryAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-6 animate-fadeInRight">
            <div>
              <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
                {t('scheme.wiz.q1') || 'What do you need funding for?'}
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { id: 'start', label: t('scheme.wiz.q1.o1') || 'Start a new business' },
                { id: 'expand', label: t('scheme.wiz.q1.o2') || 'Expand existing business' },
                { id: 'equipment', label: t('scheme.wiz.q1.o3') || 'Buy equipment/machinery' },
                { id: 'working_capital', label: t('scheme.wiz.q1.o4') || 'Working capital' },
              ].map((opt) => (
                <AnswerCard
                  key={opt.id}
                  label={opt.label}
                  selected={answers.fundingReason === opt.id}
                  onClick={() => handleSelect('fundingReason', opt.id)}
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-6 animate-fadeInRight">
            <div>
              <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
                {t('scheme.wiz.q2') || 'How much funding do you need?'}
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { id: 'micro', label: t('scheme.wiz.q2.o1') || 'Up to ₹50,000' },
                { id: 'small', label: t('scheme.wiz.q2.o2') || '₹50,000 to ₹5 Lakhs' },
                { id: 'medium', label: t('scheme.wiz.q2.o3') || '₹5 Lakhs to ₹10 Lakhs' },
                { id: 'large', label: t('scheme.wiz.q2.o4') || 'More than ₹10 Lakhs' },
              ].map((opt) => (
                <AnswerCard
                  key={opt.id}
                  label={opt.label}
                  selected={answers.amount === opt.id}
                  onClick={() => handleSelect('amount', opt.id)}
                />
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-6 animate-fadeInRight">
            <div>
              <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
                {t('scheme.wiz.q3') || 'What type of business do you run?'}
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { id: 'trading', label: t('scheme.wiz.q3.o1') || 'Trading / Retail' },
                { id: 'manufacturing', label: t('scheme.wiz.q3.o2') || 'Manufacturing / Production' },
                { id: 'services', label: t('scheme.wiz.q3.o3') || 'Services' },
                { id: 'agriculture', label: t('scheme.wiz.q3.o4') || 'Agriculture / Allied' },
              ].map((opt) => (
                <AnswerCard
                  key={opt.id}
                  label={opt.label}
                  selected={answers.businessPhase === opt.id}
                  onClick={() => handleSelect('businessPhase', opt.id)}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ScreenWrap
      mode={mode}
      onBack={step > 1 ? () => setStep(step - 1) : onBack}
      step={step}
      totalSteps={totalSteps}
      assistantMessage={t('assistant.schemeWiz') || 'I will use these details to find schemes that match your profile.'}
    >
      <div className="pt-2 pb-6 flex flex-col h-full">
        <div className="flex-1">
          {renderStep()}
        </div>
        <div className="pt-6 flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#176B52', color: 'white' }}
            onClick={handleNextStep}
            disabled={
              (step === 1 && !answers.fundingReason) ||
              (step === 2 && !answers.amount) ||
              (step === 3 && !answers.businessPhase)
            }
          >
            <span>{step < totalSteps ? (t('wizard.next') || 'Next') : (t('common.finish') || 'Find Schemes')}</span>
            <span className="text-lg leading-none">→</span>
          </button>
        </div>
      </div>
    </ScreenWrap>
  );
}
