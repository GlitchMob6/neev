import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { SwotCard } from '../../components/cards/SwotCard';
import { Button } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { getMockSwotData } from '../../data/mockMarket';
import type { Screen, Mode } from '../../types';

export function SwotScreen({
  mode = 'assisted',
  setScreen,
  onBack,
}: {
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onBack: () => void;
}) {
  const { language, t } = useLocalization();
  const swotCategories = getMockSwotData(language);

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="reports"
      setScreen={setScreen}
      assistantMessage={t('assistant.swot')}
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('swot.title') || 'Strengths & risks'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('swot.subtitle') || 'Balanced strategic breakdown of opportunities and risk factors.'}
          </p>
        </div>

        {/* 2x2 Localized SWOT Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {swotCategories.map((s, i) => (
            <SwotCard
              key={i}
              title={s.title}
              icon={s.icon}
              color={s.color}
              bg={s.bgColor}
              border={s.borderColor}
              items={s.items}
            />
          ))}
        </div>

        <div className="pt-2">
          <Button
            label={t('swot.seePricing') || 'See pricing guidance'}
            onClick={() => setScreen('pricing')}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
