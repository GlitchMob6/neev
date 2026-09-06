import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, Card, ScoreRing, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Mode } from '../../types';
import { Info } from 'lucide-react';

export function ScoreScreen({
  onNext,
  onBack,
  mode = 'assisted',
}: {
  onNext: () => void;
  onBack: () => void;
  mode?: Mode;
}) {
  const { t } = useLocalization();
  const score = 79;

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      assistantMessage={t('assistant.score') || 'These numbers are estimates, not guarantees.'}
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('score.title') || 'Your idea is off to a good start.'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('score.subtitle') || 'Early feasibility estimate'}
          </p>
        </div>

        {/* Animated Score Ring */}
        <div className="flex justify-center py-2">
          <ScoreRing score={score} size={190} strokeWidth={14} />
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            {
              label: t('score.demand') || 'Local demand',
              value: t('score.demandVal') || 'Strong',
              color: C.teal,
            },
            {
              label: t('score.loanFit') || 'Loan fit',
              value: t('score.loanFitVal') || 'Good',
              color: C.primary,
            },
            {
              label: t('score.dailyTarget') || 'Daily target',
              value: '~39 L/day',
              color: C.gold,
            },
          ].map((item, i) => (
            <Card
              key={i}
              variant="white"
              className="flex flex-col items-center justify-center p-3 text-center"
            >
              <span
                className="font-display font-bold text-sm tracking-tight"
                style={{ color: item.color }}
              >
                {item.value}
              </span>
              <span className="text-[10px] font-semibold text-muted mt-1 leading-tight">
                {item.label}
              </span>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          className="rounded-2xl p-3.5 flex items-start gap-2.5"
          style={{ background: '#FFF8EC', border: '1px solid #F5D88A' }}
        >
          <Info size={18} className="flex-shrink-0 mt-0.5 text-gold" />
          <p className="text-xs text-[#8B6914] leading-relaxed">
            <strong>{t('score.earlyEstimate') || 'Early estimate'}</strong>{' '}
            {t('score.disclaimer') ||
              'based on category-level averages. Answer a few quick questions to personalize this.'}
          </p>
        </div>

        <div className="pt-2">
          <Button
            label={t('score.answerQuestions') || 'Answer a few questions'}
            onClick={onNext}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
