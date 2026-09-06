import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, SourceBadge, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { useFinancialEngine } from '../../hooks/useFinancialEngine';
import { formatCurrency } from '../../utils/formatters';
import type { Screen, Mode, FinancialInputs } from '../../types';

export function FinancialReportScreen({
  financialInputs,
  mode = 'assisted',
  setScreen,
  onBack,
}: {
  financialInputs: FinancialInputs;
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  const outputs = useFinancialEngine(financialInputs);

  const cards = [
    {
      label: t('financial.totalCost') || 'Total project cost',
      value: formatCurrency(financialInputs.totalProjectCost),
      badge: 'model' as const,
      color: C.primary,
    },
    {
      label: t('financial.loanNeeded') || 'Loan needed',
      value: formatCurrency(financialInputs.loanAmount),
      badge: 'model' as const,
      color: C.terracotta,
    },
    {
      label: t('financial.monthlyRevenue') || 'Monthly revenue',
      value: formatCurrency(outputs.monthlyRevenue),
      badge: 'local' as const,
      color: C.teal,
    },
    {
      label: t('financial.estimatedEmi') || 'Estimated EMI',
      value: formatCurrency(outputs.monthlyEMI),
      badge: 'model' as const,
      color: C.gold,
    },
  ];

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="reports"
      setScreen={setScreen}
      assistantMessage={
        t('assistant.financial') ||
        'These estimates come from similar businesses in your area. Every number is backed by a data source.'
      }
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('financial.title') || 'The numbers at a glance'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('financial.subtitle') || 'Financial snapshot based on your capital and location.'}
          </p>
        </div>

        {/* 4 Headline Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {cards.map((card, i) => (
            <Card key={i} variant="white" className="p-3.5 flex flex-col justify-between shadow-xs border" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-center mb-1.5">
                <SourceBadge type={card.badge} />
              </div>
              <div className="text-center">
                <p
                  className="font-display font-extrabold text-xl tracking-tight"
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
                <p className="text-xs font-semibold text-muted leading-snug mt-0.5">
                  {card.label}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Business Economics List */}
        <div>
          <h2 className="font-display font-bold text-base text-charcoal mb-2.5">
            {t('financial.economics') || 'Business economics'}
          </h2>
          <Card variant="white" className="p-0 overflow-hidden shadow-xs border" style={{ borderColor: C.border }}>
            <div className="divide-y divide-border/60">
              {[
                {
                  label: t('financial.dailyCollection') || 'Daily milk collection',
                  value: `~${financialInputs.dailyOutputUnits} litres/day`,
                  badge: 'self' as const,
                },
                {
                  label: t('financial.dailyBreakEven') || 'Daily break-even',
                  value: `~${formatCurrency(outputs.dailyBreakEven)}`,
                  badge: 'model' as const,
                },
                {
                  label: t('financial.localPriceRange') || 'Local price range',
                  value: '₹56–₹80 / litre',
                  badge: 'local' as const,
                },
                {
                  label: t('financial.monthlyProfit') || 'Estimated net profit',
                  value: formatCurrency(outputs.monthlyProfit),
                  badge: 'model' as const,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-white">
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-xs font-semibold text-charcoal">{item.label}</p>
                    <SourceBadge type={item.badge} />
                  </div>
                  <span className="font-display font-bold text-base text-primary">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="pt-2">
          <Button
            label={t('financial.seeRepayment') || 'See repayment plan'}
            onClick={() => setScreen('roadmap')}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
