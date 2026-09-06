import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, Button, C } from '../../components/ui';
import { DonutChart } from '../../components/charts/DonutChart';
import { useLocalization } from '../../i18n';
import { getMockMarketData } from '../../data/mockMarket';
import { formatCurrency } from '../../utils/formatters';
import type { Screen, Mode, FinancialInputs } from '../../types';
import { Award, Clock, Calendar } from 'lucide-react';

export function RoadmapScreen({
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
  const { language, t } = useLocalization();
  const marketData = getMockMarketData(language);

  const donutSegments = marketData.revenueBreakdown.map((item) => ({
    label: item.label,
    percentage: item.percentage,
    color: item.color,
    amount: formatCurrency((item.percentage / 100) * 132000),
  }));

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="reports"
      setScreen={setScreen}
      assistantMessage={t('assistant.roadmap')}
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('roadmap.title') || 'Repayment plan'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('roadmap.subtitle') || 'Timeline and cash flow structure for your loan.'}
          </p>
        </div>

        {/* Repayment Timeline Card */}
        <Card variant="sand" className="p-4">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                style={{ background: C.gold }}
              >
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">
                  {t('roadmap.moratorium') || 'MORATORIUM PERIOD'}
                </p>
                <p className="font-display font-bold text-base text-charcoal">
                  {financialInputs.moratoriumMonths || 6} {language === 'mr' ? 'महिने' : language === 'hi' ? 'महीने' : 'months'}
                </p>
                <p className="text-xs text-muted">
                  {t('roadmap.noEmi') || 'No EMI due during setup and initial growth'}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-border/60" />

            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                style={{ background: C.primary }}
              >
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">
                  {t('roadmap.repayment') || 'REPAYMENT TENURE'}
                </p>
                <p className="font-display font-bold text-base text-charcoal">
                  {Math.round(financialInputs.loanTenureMonths / 12)} {language === 'mr' ? 'वर्षे (८४ महिने)' : language === 'hi' ? 'वर्ष (84 महीने)' : 'years (84 months)'}
                </p>
                <p className="text-xs text-muted">
                  ~{formatCurrency(46536)} / {language === 'mr' ? 'महिना हप्ता' : language === 'hi' ? 'माह EMI' : 'month EMI'} ({financialInputs.interestRate}% {language === 'mr' ? 'वार्षिक व्याज' : language === 'hi' ? 'वार्षिक ब्याज' : 'interest p.a.'})
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Revenue Source Donut Chart */}
        <div>
          <h2 className="font-display font-bold text-base text-charcoal mb-2.5">
            {t('roadmap.revenueSources') || 'Where revenue can come from'}
          </h2>
          <Card variant="white" className="p-4">
            <DonutChart
              segments={donutSegments}
              centerLabel={language === 'mr' ? 'एकूण' : language === 'hi' ? 'कुल' : 'Total'}
              centerValue="₹1.32L"
              size={140}
            />
          </Card>
        </div>

        {/* Government Scheme Recommendation */}
        <Card
          variant="custom"
          className="border"
          style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
              style={{ background: C.primary }}
            >
              <Award size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider">
                {t('roadmap.scheme') || 'RECOMMENDED SCHEME'}
              </p>
              <h4 className="font-display font-bold text-sm text-charcoal">
                PMEGP / Mudra Kishor Scheme
              </h4>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                {language === 'mr'
                  ? 'ग्रामीण व निमशहरी निकषांनुसार प्रकल्प खर्चावर २५% पर्यंत अनुदानासाठी (Subsidy) पात्र.'
                  : language === 'hi'
                  ? 'ग्रामीण व अर्ध-शहरी मानदंडों के तहत प्रोजेक्ट लागत पर 25% तक सब्सिडी हेतु पात्र।'
                  : 'Eligible for up to 25% subsidy on project capital under rural/semi-urban criteria.'}
              </p>
            </div>
          </div>
        </Card>

        <div className="pt-2">
          <Button
            label={t('roadmap.seeMarket') || 'View market & competition'}
            onClick={() => setScreen('market')}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
