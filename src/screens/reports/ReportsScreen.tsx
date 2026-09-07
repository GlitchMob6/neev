import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, SourceBadge, Button, C } from '../../components/ui';
import { HighlightTarget } from '../../hooks/useHighlight';
import { useLocalization } from '../../i18n';
import { useFinancialEngine } from '../../hooks/useFinancialEngine';
import { formatCurrency } from '../../utils/formatters';
import { downloadFinancialEngine, downloadReportPDF } from '../../utils/download';
import {
  getApplicableScheme,
  calculateMarginAndLoan,
  calculateEMI,
} from '../../utils/financialCalculations';
import type { Screen, Mode, Business, FinancialInputs, ScorecardData } from '../../types';
import {
  Download,
  FileSpreadsheet,
  TrendingUp,
  MapPin,
  Target,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

export function ReportsScreen({
  business,
  financialInputs,
  scorecardData,
  mode = 'assisted',
  setScreen,
  loanSelected = false,
  onBack,
}: {
  business: Business;
  financialInputs: FinancialInputs;
  scorecardData?: ScorecardData;
  mode?: Mode;
  setScreen: (s: Screen) => void;
  loanSelected?: boolean;
  onBack?: () => void;
}) {
  const { t } = useLocalization();
  const outputs = useFinancialEngine(financialInputs);
  const scheme = getApplicableScheme(financialInputs.totalProjectCost);
  const { margin, loanAmount } = calculateMarginAndLoan(financialInputs.totalProjectCost);
  const emi = scheme ? calculateEMI(loanAmount, scheme.interestRate, scheme.tenureMonths - scheme.moratoriumMonths) : 0;

  const handleDownloadEngine = () => {
    downloadFinancialEngine(financialInputs, outputs, business.name || 'Milk Collection Center');
  };

  const handleDownloadReport = () => {
    downloadReportPDF(business, financialInputs, outputs);
  };

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="reports"
      setScreen={setScreen}
      assistantMessage={
        t('assistant.reports') ||
        'This is your complete business report. You can download it as PDF or Excel.'
      }
    >
      <div className="flex flex-col gap-5 pt-1 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('reports.title') || 'Business Report'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('reports.subtitle') || 'Your complete Neev assessment'}
          </p>
        </div>

        {/* ═══ SECTION 1: BUSINESS SNAPSHOT ═══ */}
        <HighlightTarget id="businessSnapshot">
          <Card
            variant="custom"
            className="border shadow-xs relative overflow-hidden p-5"
            style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={20} className="text-primary" />
              <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                {t('reports.businessSnapshot') || 'Business Snapshot'}
              </h3>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🥛</span>
              <div>
                <p className="font-display font-bold text-base text-charcoal">
                  {business.name || 'Milk Collection & Retail Centre'}
                </p>
                <p className="text-xs text-muted flex items-center gap-1">
                  <MapPin size={11} />
                  {business.location || 'Nashik'}, {business.state || 'Maharashtra'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2.5 border-t" style={{ borderColor: '#B8DFD4' }}>
              <div>
                <p className="text-[10px] font-bold text-muted uppercase">Category</p>
                <p className="font-display font-bold text-sm text-charcoal">{business.category || 'Dairy'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted uppercase">Capital</p>
                <p className="font-display font-bold text-sm text-charcoal">{formatCurrency(financialInputs.ownContribution)}</p>
              </div>
            </div>
          </Card>
        </HighlightTarget>

        {/* ═══ SECTION 2: MARKET UNDERSTANDING ═══ */}
        <HighlightTarget id="marketUnderstanding">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <MapPin size={18} className="text-teal" />
              <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                {t('reports.marketUnderstanding') || 'Market Understanding'}
              </h3>
            </div>
            <Card variant="white" className="p-4 shadow-xs border" style={{ borderColor: C.border }}>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="font-display font-bold text-sm text-teal">Strong</p>
                  <p className="text-[10px] text-muted mt-0.5">Local demand</p>
                </div>
                <div>
                  <p className="font-display font-bold text-sm" style={{ color: C.gold }}>Moderate</p>
                  <p className="text-[10px] text-muted mt-0.5">Competition</p>
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-primary">Promising</p>
                  <p className="text-[10px] text-muted mt-0.5">Opportunity</p>
                </div>
              </div>
              {scorecardData && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: C.border }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted font-medium">Understanding Score</span>
                    <span className="font-display font-bold text-sm text-primary">
                      {scorecardData.understandingScore}/500
                    </span>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </HighlightTarget>

        {/* ═══ SECTION 3: BUSINESS VIABILITY ═══ */}
        {scorecardData && (
          <HighlightTarget id="reportViability">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <TrendingUp size={18} className="text-primary" />
                <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                  {t('reports.viability') || 'Business Viability'}
                </h3>
                <span className="font-display font-bold text-sm ml-auto" style={{ color: C.primary }}>
                  {scorecardData.viabilityScore}/100
                </span>
              </div>
              <Card variant="white" className="p-4 shadow-xs border" style={{ borderColor: C.border }}>
                <div className="flex flex-col gap-2">
                  {scorecardData.viabilityDimensions.map((dim) => (
                    <div key={dim.labelKey} className="flex items-center gap-2">
                      <span className="text-xs text-muted w-[130px] flex-shrink-0 text-right">{dim.label}</span>
                      <div className="flex-1 h-4 rounded-md overflow-hidden" style={{ background: `${C.primary}12` }}>
                        <div
                          className="h-full rounded-md"
                          style={{
                            width: `${dim.percentage}%`,
                            background: dim.percentage >= 75 ? C.primary : dim.percentage >= 60 ? C.teal : C.gold,
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-muted w-[32px]">{dim.percentage}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </HighlightTarget>
        )}

        {/* ═══ SECTION 4: FINANCIAL PICTURE ═══ */}
        <HighlightTarget id="financialPicture">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg">📊</span>
              <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                {t('reports.financialPicture') || 'Financial Picture'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <Card variant="white" className="p-3.5 shadow-xs border" style={{ borderColor: C.border }}>
                <SourceBadge type="model" />
                <p className="font-display font-extrabold text-lg text-primary mt-2">
                  {formatCurrency(financialInputs.totalProjectCost)}
                </p>
                <p className="text-[10px] font-semibold text-muted mt-0.5">Total Project Cost</p>
              </Card>
              <Card variant="white" className="p-3.5 shadow-xs border" style={{ borderColor: C.border }}>
                <SourceBadge type="local" />
                <p className="font-display font-extrabold text-lg text-teal mt-2">
                  {formatCurrency(outputs.monthlyRevenue)}
                </p>
                <p className="text-[10px] font-semibold text-muted mt-0.5">Monthly Revenue</p>
              </Card>
              <Card variant="white" className="p-3.5 shadow-xs border" style={{ borderColor: C.border }}>
                <SourceBadge type="model" />
                <p className="font-display font-extrabold text-lg" style={{ color: C.gold }}>
                  {formatCurrency(Math.round(outputs.monthlyEMI))}
                </p>
                <p className="text-[10px] font-semibold text-muted mt-0.5">Indicative EMI</p>
              </Card>
              <Card variant="white" className="p-3.5 shadow-xs border" style={{ borderColor: C.border }}>
                <SourceBadge type="model" />
                <p className="font-display font-extrabold text-lg text-primary mt-2">
                  {formatCurrency(Math.round(outputs.monthlyProfit))}
                </p>
                <p className="text-[10px] font-semibold text-muted mt-0.5">Est. Monthly Profit</p>
              </Card>
            </div>
          </div>
        </HighlightTarget>

        {/* ═══ SECTION 5: FINANCING RECOMMENDATION (if loan selected) ═══ */}
        {loanSelected && scheme && (
          <HighlightTarget id="financingRec">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <CreditCard size={18} className="text-primary" />
                <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                  {t('reports.financing') || 'Financing Recommendation'}
                </h3>
              </div>
              <Card
                variant="custom"
                className="border shadow-xs p-4"
                style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-sm text-charcoal">{scheme.name}</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                    style={{ background: C.teal }}
                  >
                    Eligible
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted">Loan Amount: </span>
                    <span className="font-bold text-charcoal">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div>
                    <span className="text-muted">Your Margin: </span>
                    <span className="font-bold text-charcoal">{formatCurrency(margin)}</span>
                  </div>
                  <div>
                    <span className="text-muted">Interest: </span>
                    <span className="font-bold text-charcoal">{scheme.interestRate}% p.a.</span>
                  </div>
                  <div>
                    <span className="text-muted">Tenure: </span>
                    <span className="font-bold text-charcoal">{scheme.tenureYears} years</span>
                  </div>
                  <div>
                    <span className="text-muted">EMI: </span>
                    <span className="font-bold text-charcoal">{formatCurrency(Math.round(emi))}</span>
                  </div>
                  <div>
                    <span className="text-muted">Moratorium: </span>
                    <span className="font-bold text-charcoal">{scheme.moratoriumMonths} months</span>
                  </div>
                </div>
              </Card>
            </div>
          </HighlightTarget>
        )}

        {/* ═══ SECTION 6: YOUR USP ═══ */}
        {scorecardData && (
          <HighlightTarget id="reportUsp">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Target size={18} className="text-gold" />
                <h3 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                  {t('reports.usp') || 'Your USP'}
                </h3>
              </div>
              <Card
                variant="custom"
                className="border shadow-xs p-4"
                style={{ background: '#FFF8EC', borderColor: '#F5D88A' }}
              >
                <p className="font-display font-bold text-base text-charcoal leading-relaxed">
                  "{scorecardData.usp}"
                </p>
              </Card>
            </div>
          </HighlightTarget>
        )}

        {/* ═══ YOUR CORNER — Downloads ═══ */}
        <HighlightTarget id="yourCorner">
          <div>
            <h3 className="font-display font-bold text-base text-charcoal mb-2.5">
              {t('reports.yourCorner') || 'Your Corner'}
            </h3>
            <div className="flex flex-col gap-2.5">
              <Button
                label={t('reports.downloadPdf') || 'Download PDF'}
                onClick={handleDownloadReport}
                icon={<Download size={18} />}
              />
              <Button
                label={t('reports.downloadExcel') || 'Download Excel'}
                variant="secondary"
                onClick={handleDownloadEngine}
                icon={<FileSpreadsheet size={18} />}
              />
            </div>
          </div>
        </HighlightTarget>
      </div>
    </ScreenWrap>
  );
}
