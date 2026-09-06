import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, ScoreRing, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Screen, Mode } from '../../types';
import { Star } from 'lucide-react';

export function InsightScreen({
  mode = 'assisted',
  setScreen,
  onBack,
}: {
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  const score = 79;

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="reports"
      setScreen={setScreen}
      assistantMessage={
        t('assistant.insight') ||
        'Your business idea has strong fundamentals. Take this plan forward!'
      }
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('insight.title') || "Neev's simple reading"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('insight.subtitle') || 'Final synthesis and feasibility assessment.'}
          </p>
        </div>

        {/* Hero Quote Card */}
        <div
          className="rounded-3xl p-6 relative overflow-hidden shadow-md"
          style={{ background: C.primary }}
        >
          <div
            className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-10 pointer-events-none"
            style={{ background: '#ffffff', transform: 'translate(30%, -30%)' }}
          />
          <div className="flex flex-col gap-3 relative">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-gold"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <Star size={18} fill={C.gold} />
              </div>
              <span className="text-xs font-semibold text-cream/80">
                {t('insight.readingBadge') || 'Feasibility reading · Estimated'}
              </span>
            </div>
            <p
              className="font-display font-bold text-xl text-cream leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('insight.quote') || '"This idea has a real village-shaped opportunity."'}
            </p>
          </div>
        </div>

        {/* Breakdown Card */}
        <Card variant="white" className="p-4">
          <p className="text-sm text-charcoal leading-relaxed">
            {t('insight.explanation') ||
              'At ~39 litres a day, the shop meets its estimated operating and loan costs. Your planned 80 litres gives ample room for profit margin and reinvestment.'}
          </p>
        </Card>

        {/* Final Score with Sub-indicators */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-border">
          <div className="flex-shrink-0">
            <ScoreRing score={score} size={110} strokeWidth={9} />
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {[
              { label: t('insight.demand') || 'Demand', val: 'Strong', col: C.teal },
              { label: t('insight.capitalFit') || 'Capital fit', val: 'Good', col: C.primary },
              { label: t('insight.market') || 'Market opportunity', val: 'Promising', col: C.gold },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-muted font-medium">{item.label}</span>
                <span className="font-display font-bold" style={{ color: item.col }}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            label={t('insight.backToReports') || 'View all reports & downloads'}
            onClick={() => setScreen('reports')}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
