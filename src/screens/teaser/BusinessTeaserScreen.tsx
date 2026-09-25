import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button } from '../../components/ui';
import { BusinessTeaser } from '../../components/teaser/BusinessTeaser';
import { useLocalization } from '../../i18n';
import type { Mode, Business } from '../../types';

export function BusinessTeaserScreen({
  business,
  mode = 'assisted',
  onNext,
  onBack,
}: {
  business: Business;
  mode?: Mode;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      assistantMessage={
        t('assistant.teaser') ||
        'Here is your business potential! Now let’s answer 5 simple common questions to personalize your plan.'
      }
    >
      <div className="flex flex-col gap-5 pt-1 pb-6">
        <div>
          <span className="text-xs font-bold text-muted uppercase tracking-wider">
            {t('teaser.stepLabel') || 'AI Evaluation'}
          </span>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight mt-1">
            {t('teaser.title') || 'Your Business Opportunity'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('teaser.subtitle') ||
              'Based on your idea, here is the market opportunity we see for your enterprise.'}
          </p>
        </div>

        <BusinessTeaser
          category={business.category || 'Dairy'}
          brainDumpText={business.brainDumpText}
        />

        <div className="pt-2">
          <Button
            label={t('teaser.continueBtn') || 'Continue to 5 Quick Questions'}
            onClick={onNext}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
