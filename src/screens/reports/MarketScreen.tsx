import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, SourceBadge, Button, C } from '../../components/ui';
import { CompetitorCard } from '../../components/cards/CompetitorCard';
import { useLocalization } from '../../i18n';
import { getMockMarketData } from '../../data/mockMarket';
import type { Screen, Mode } from '../../types';

export function MarketScreen({
  mode = 'assisted',
  setScreen,
  onBack,
}: {
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onBack: () => void;
}) {
  const { language, t } = useLocalization();
  const marketData = getMockMarketData(language);

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="reports"
      setScreen={setScreen}
      assistantMessage={t('assistant.market')}
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('market.title') || 'Market reach'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('market.subtitle') || 'Local demand dynamics and competition assessment.'}
          </p>
        </div>

        {/* 3 Indicator Cards */}
        <div className="flex flex-col gap-3">
          {[
            {
              label: t('market.localDemand') || 'Local demand',
              value: marketData.localDemand,
              icon: '↗',
              color: C.teal,
              badge: 'govt' as const,
            },
            {
              label: t('market.density') || 'Competitor density',
              value: marketData.competitorDensity,
              icon: '~',
              color: C.gold,
              badge: 'local' as const,
            },
            {
              label: t('market.opportunity') || 'Customer opportunity',
              value: marketData.customerOpportunity,
              icon: '✦',
              color: C.primary,
              badge: 'model' as const,
            },
          ].map((item, i) => (
            <Card key={i} variant="white" className="p-4">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-bold"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted font-medium">{item.label}</p>
                  <p className="font-display font-bold text-lg text-charcoal truncate mt-0.5">
                    {item.value}
                  </p>
                </div>
                <SourceBadge type={item.badge} />
              </div>
            </Card>
          ))}
        </div>

        {/* Nearby Competitors (Localized) */}
        <div>
          <h2 className="font-display font-bold text-base text-charcoal mb-2.5">
            {t('market.nearbyCompetition') || 'Nearby competition'}
          </h2>
          <div className="flex flex-col gap-2.5">
            {marketData.competitors.map((c, i) => (
              <CompetitorCard key={i} competitor={c} />
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            label={t('market.seeSwot') || 'See strengths & risks'}
            onClick={() => setScreen('swot')}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
