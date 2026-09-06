import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, SourceBadge, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Screen, Mode } from '../../types';
import { Info } from 'lucide-react';

export function PricingScreen({
  mode = 'assisted',
  setScreen,
  onBack,
}: {
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="reports"
      setScreen={setScreen}
      assistantMessage={
        t('assistant.pricing') ||
        'We recommend starting between ₹56 and ₹65 per litre for retail to stay competitive.'
      }
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('pricing.title') || 'Suggested pricing range'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('pricing.subtitle') || 'Start close to the prevailing local market price.'}
          </p>
        </div>

        {/* Large Hero Pricing Card */}
        <div
          className="rounded-3xl flex flex-col items-center gap-2 py-8 px-6 text-center relative overflow-hidden shadow-md"
          style={{ background: C.primary }}
        >
          <div
            className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-10 pointer-events-none"
            style={{ background: '#ffffff', transform: 'translate(30%, -30%)' }}
          />
          <p className="text-xs font-semibold text-cream/80 uppercase tracking-wider">
            {t('pricing.suggestedRange') || 'Suggested range'}
          </p>
          <p
            className="font-display font-extrabold text-5xl tracking-tight text-cream"
            style={{ lineHeight: 1 }}
          >
            ₹56–₹80
          </p>
          <p className="text-xs text-cream/80">{t('pricing.perLitre') || 'per litre'}</p>
          <div className="mt-1">
            <SourceBadge type="local" />
          </div>
        </div>

        {/* Comparable Local Price */}
        <Card variant="white" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-base text-charcoal">
                {t('pricing.freshMilk') || 'Fresh Cow Milk'}
              </p>
              <p className="text-xs text-muted">
                {t('pricing.comparable') || 'Prevailing local retail benchmark'}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-xl text-primary">₹56</p>
              <div className="mt-0.5">
                <SourceBadge type="local" />
              </div>
            </div>
          </div>
        </Card>

        {/* Context Disclaimer Card */}
        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ background: '#FFF8EC', border: '1px solid #F5D88A' }}
        >
          <Info size={20} className="flex-shrink-0 text-gold mt-0.5" />
          <p className="text-xs text-[#8B6914] leading-relaxed">
            {t('pricing.disclaimer') ||
              'Neev compares your inputs with local market signals in Nashik to suggest a starting range. This is a baseline guide, not a ceiling.'}
          </p>
        </div>

        <div className="pt-2">
          <Button
            label={t('pricing.seeInsight') || "See Neev's reading"}
            onClick={() => setScreen('insight')}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
