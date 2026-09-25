import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import {
  getApplicableScheme,
  calculateMarginAndLoan,
  calculateEMI,
} from '../../utils/financialCalculations';
import { formatCurrency } from '../../utils/formatters';
import type { Screen, Mode, Scheme, Business, FinancialInputs } from '../../types';
import { Award, Info, Calendar, Percent, Clock } from 'lucide-react';

export function SchemesScreen({
  business,
  financialInputs,
  mode,
  setScreen,
  onSchemeSelect,
}: {
  business?: Business;
  financialInputs?: FinancialInputs;
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onSchemeSelect: (scheme: Scheme) => void;
}) {
  const { t } = useLocalization();

  const projectCost = financialInputs?.totalProjectCost || 140000;
  const scheme = getApplicableScheme(projectCost);
  const { margin, loanAmount } = calculateMarginAndLoan(projectCost);
  const emi = scheme ? calculateEMI(loanAmount, scheme.interestRate, scheme.tenureMonths - scheme.moratoriumMonths) : 0;

  return (
    <ScreenWrap
      mode={mode}
      onBack={() => setScreen('tools')}
      showNav={true}
      navScreen="tools"
      setScreen={setScreen}
      assistantMessage={t('assistant.schemes') || 'Your applicable scheme is automatically determined based on your project cost.'}
    >
       <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('schemes.title') || 'Applicable Scheme'}
          </h1>
          <p className="mt-1 text-sm text-muted leading-relaxed">
            {t('schemes.autoSubtitle') || 'Automatically determined from your project cost.'}
          </p>
        </div>

        {/* Project Cost Summary */}
        <Card variant="white" className="p-4 shadow-xs border" style={{ borderColor: C.border }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted uppercase tracking-wider">
              Total Project Cost
            </span>
            <span className="font-display font-extrabold text-lg" style={{ color: C.primary }}>
              {formatCurrency(projectCost)}
            </span>
          </div>
        </Card>

        {scheme ? (
          <>
            {/* Applicable Scheme Card */}
            <Card
              variant="custom"
              className="border shadow-xs p-5"
              style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ background: C.primary }}
                >
                  <Award size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-base text-charcoal">
                    {scheme.name}
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white inline-block mt-0.5"
                    style={{ background: C.teal }}
                  >
                    Applicable
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed mb-4">
                {scheme.type === 'microfinance'
                  ? `For project costs up to ₹1.40 Lakh. Designed for micro-enterprises with subsidized interest rates and shorter tenure.`
                  : `For project costs between ₹1.40 Lakh and ₹50.00 Lakh. Standard term loan for small and medium enterprises.`}
              </p>

              {/* Scheme Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 bg-white border" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Percent size={14} className="text-teal" />
                    <span className="text-[10px] font-bold text-muted uppercase">Interest Rate</span>
                  </div>
                  <p className="font-display font-bold text-base text-charcoal">
                    {scheme.interestRate}% <span className="text-xs font-normal text-muted">p.a.</span>
                  </p>
                </div>
                <div className="rounded-xl p-3 bg-white border" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Calendar size={14} className="text-teal" />
                    <span className="text-[10px] font-bold text-muted uppercase">Tenure</span>
                  </div>
                  <p className="font-display font-bold text-base text-charcoal">
                    {scheme.tenureYears} <span className="text-xs font-normal text-muted">years</span>
                  </p>
                </div>
                <div className="rounded-xl p-3 bg-white border" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock size={14} className="text-gold" />
                    <span className="text-[10px] font-bold text-muted uppercase">Moratorium</span>
                  </div>
                  <p className="font-display font-bold text-base text-charcoal">
                    {scheme.moratoriumMonths} <span className="text-xs font-normal text-muted">months</span>
                  </p>
                </div>
                <div className="rounded-xl p-3 bg-white border" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">💰</span>
                    <span className="text-[10px] font-bold text-muted uppercase">Loan Amount</span>
                  </div>
                  <p className="font-display font-bold text-base" style={{ color: C.primary }}>
                    {formatCurrency(loanAmount)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Capital Breakdown */}
            <Card variant="white" className="p-4 shadow-xs border" style={{ borderColor: C.border }}>
              <h4 className="font-display font-bold text-sm text-charcoal mb-3">Capital Breakdown</h4>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Your Margin (10%)</span>
                  <span className="font-bold text-charcoal">{formatCurrency(margin)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Loan Amount (90%)</span>
                  <span className="font-bold text-charcoal">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t" style={{ borderColor: C.border }}>
                  <span className="font-bold text-charcoal">Indicative EMI</span>
                  <span className="font-display font-bold text-sm" style={{ color: C.primary }}>
                    {formatCurrency(Math.round(emi))}<span className="text-[10px] font-normal text-muted"> /mo</span>
                  </span>
                </div>
              </div>
            </Card>
          </>
        ) : (
          /* No Applicable Scheme */
          <Card variant="white" className="p-5 shadow-xs border text-center" style={{ borderColor: C.border }}>
            <p className="text-sm text-muted">
              No applicable scheme found for your current project cost.
            </p>
            <p className="text-xs text-muted mt-1">
              Schemes are available for project costs up to ₹50.00 Lakh.
            </p>
          </Card>
        )}

        {/* Info Banner */}
        <div
          className="rounded-2xl p-3.5 flex items-start gap-2.5 border"
          style={{ background: '#FFF8EC', borderColor: '#F5D88A' }}
        >
          <Info size={18} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#8B6914] leading-relaxed">
            The applicable scheme is determined automatically based on your total project cost. Interest rates and terms are indicative.
          </p>
        </div>
       </div>
    </ScreenWrap>
  );
}
