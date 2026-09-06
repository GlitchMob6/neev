import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { AnswerCard } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Mode } from '../../types';
import { Volume2 } from 'lucide-react';

export function WizardScreen({
  onNext,
  onBack,
  mode = 'assisted',
}: {
  onNext: (answers: Record<string, string>) => void;
  onBack: () => void;
  mode?: Mode;
}) {
  const { t } = useLocalization();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    rent: '',
    competition: '',
    customers: '',
    pricing: '',
  });

  const questions = [
    {
      id: 'rent',
      q: t('wizard.q1') || 'What will your monthly rent look like?',
      sub: t('wizard.q1sub') || 'A small estimate is enough to start.',
      opts: [
        { label: t('wizard.q1_opt1') || 'I already have a space (₹0)', value: '0' },
        { label: t('wizard.q1_opt2') || 'Around ₹5,000 per month', value: '5000' },
        { label: t('wizard.q1_opt3') || 'Around ₹10,000 per month', value: '10000' },
        { label: t('wizard.q1_opt4') || '₹15,000 or more per month', value: '15000' },
      ],
    },
    {
      id: 'competition',
      q: t('wizard.q2') || 'How many similar businesses are nearby?',
      sub: t('wizard.q2sub') || 'Think about shops within walking distance.',
      opts: [
        { label: t('wizard.q2_opt1') || 'None that I know of', value: '0' },
        { label: t('wizard.q2_opt2') || '1–2 nearby shops', value: '1-2' },
        { label: t('wizard.q2_opt3') || '3–5 nearby shops', value: '3-5' },
        { label: t('wizard.q2_opt4') || "Many — it's competitive", value: 'many' },
      ],
    },
    {
      id: 'customers',
      q: t('wizard.q3') || 'Do you already have customers?',
      sub: t('wizard.q3sub') || 'Even a few regular buyers count.',
      opts: [
        { label: t('wizard.q3_opt1') || 'Yes, a few regulars already', value: 'regulars' },
        { label: t('wizard.q3_opt2') || 'Some interested people in locality', value: 'interested' },
        { label: t('wizard.q3_opt3') || 'Not yet, starting completely fresh', value: 'none' },
        { label: t('wizard.q3_opt4') || 'I have a large existing customer base', value: 'large' },
      ],
    },
    {
      id: 'pricing',
      q: t('wizard.q4') || 'What do similar businesses charge locally?',
      sub: t('wizard.q4sub') || 'An approximate market price per unit.',
      opts: [
        { label: t('wizard.q4_opt1') || '₹40–₹50 per litre', value: '48' },
        { label: t('wizard.q4_opt2') || '₹50–₹65 per litre', value: '60' },
        { label: t('wizard.q4_opt3') || '₹65–₹80 per litre', value: '72' },
        { label: t('wizard.q4_opt4') || "I'm not sure yet", value: '65' },
      ],
    },
  ];

  const currentQ = questions[step];

  const handleSelect = (val: string) => {
    setAnswers({ ...answers, [currentQ.id]: val });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onNext(answers);
    }
  };

  return (
    <ScreenWrap
      onBack={step > 0 ? () => setStep(step - 1) : onBack}
      step={step + 1}
      totalSteps={4}
      mode={mode}
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">
            {t('wizard.questionNumber', { current: step + 1, total: 4 }) ||
              `Question ${step + 1} of 4`}
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
            {currentQ.q}
          </h1>
          <p className="mt-1 text-sm text-muted">{currentQ.sub}</p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          {currentQ.opts.map((opt) => (
            <AnswerCard
              key={opt.value}
              label={opt.label}
              selected={answers[currentQ.id] === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>

        <div className="pt-6 flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#176B52', color: 'white' }}
            onClick={handleNext}
            disabled={!answers[currentQ.id]}
          >
            <span>{step < questions.length - 1 ? (t('wizard.next') || 'Next') : (t('common.finish') || 'Complete')}</span>
            <span className="text-lg leading-none">→</span>
          </button>
        </div>
      </div>
    </ScreenWrap>
  );
}
