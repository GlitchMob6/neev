import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, SourceBadge, Button, ScoreRing, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { useFinancialEngine } from '../../hooks/useFinancialEngine';
import { formatCurrency } from '../../utils/formatters';
import { downloadFinancialEngine, downloadReportPDF } from '../../utils/download';
import type { Screen, Mode, Business, FinancialInputs } from '../../types';
import {
  FileText,
  Download,
  FileSpreadsheet,
  TrendingUp,
  MapPin,
  Lightbulb,
  DollarSign,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export function ReportsScreen({
  business,
  financialInputs,
  mode = 'assisted',
  setScreen,
}: {
  business: Business;
  financialInputs: FinancialInputs;
  mode?: Mode;
  setScreen: (s: Screen) => void;
}) {
  const { t } = useLocalization();
  const outputs = useFinancialEngine(financialInputs);

  const handleDownloadEngine = () => {
    downloadFinancialEngine(financialInputs, outputs, business.name || 'Milk Collection Center');
  };

  const handleDownloadReport = () => {
    downloadReportPDF(business, financialInputs, outputs);
  };

  return (
    <ScreenWrap
      mode={mode}
      showNav={true}
      navScreen="reports"
      setScreen={setScreen}
      assistantMessage={
        t('assistant.reports') ||
        'Here is your full Business Health report and detailed breakdowns. You can export or print anytime.'
      }
    >
      <div className="flex flex-col gap-5 pt-1 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('reports.title') || 'Reports & Analysis'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('reports.subtitle') || 'Comprehensive health assessment and feasibility breakdown.'}
          </p>
        </div>

        {/* Business Health Hero Section (Placed in Reports per requirement) */}
        <Card
          variant="custom"
          className="border shadow-xs relative overflow-hidden p-5"
          style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={22} className="text-primary" />
              <h3 className="font-display font-bold text-base text-charcoal">
                {t('reports.businessHealth') || 'Business Health Score'}
              </h3>
            </div>
            <SourceBadge type="model" />
          </div>

          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex-1">
              <p className="text-xs text-muted leading-relaxed">
                Your milk collection idea has high local feasibility with strong repayment capacity.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white text-primary border border-primary/20">
                  Category: Dairy
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white text-teal border border-teal/20">
                  Nashik, MH
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ScoreRing score={79} size={90} strokeWidth={8} />
            </div>
          </div>
        </Card>

        {/* Financial Highlights */}
        <div>
          <h3 className="font-display font-bold text-base text-charcoal mb-2.5">
            {t('reports.financialSummary') || 'Financial Snapshot'}
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <Card variant="white" className="p-3.5 flex flex-col justify-between shadow-xs border" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-between mb-1.5">
                <SourceBadge type="model" />
              </div>
              <div>
                <p className="font-display font-extrabold text-xl text-primary">
                  {formatCurrency(financialInputs.totalProjectCost)}
                </p>
                <p className="text-xs font-semibold text-muted mt-0.5">
                  {t('financial.totalCost') || 'Total Project Cost'}
                </p>
              </div>
            </Card>

            <Card variant="white" className="p-3.5 flex flex-col justify-between shadow-xs border" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-between mb-1.5">
                <SourceBadge type="model" />
              </div>
              <div>
                <p className="font-display font-extrabold text-xl text-teal">
                  {formatCurrency(outputs.monthlyProfit)}
                </p>
                <p className="text-xs font-semibold text-muted mt-0.5">
                  {t('financial.monthlyProfit') || 'Est. Monthly Profit'}
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Report Navigation */}
        <div>
          <h3 className="font-display font-bold text-base text-charcoal mb-2.5">
            {t('reports.detailedReports') || 'Detailed Reports'}
          </h3>

          <div className="flex flex-col gap-2.5">
            {[
              {
                id: 'financialReport' as Screen,
                title: t('nav.financial') || 'Financial Snapshot',
                desc: 'Project cost, loan, revenue, and break-even metrics',
                icon: TrendingUp,
                color: C.primary,
              },
              {
                id: 'roadmap' as Screen,
                title: t('nav.roadmap') || 'Repayment Plan & Scheme',
                desc: 'Moratorium period, revenue sources & PMEGP scheme',
                icon: Compass,
                color: C.gold,
              },
              {
                id: 'market' as Screen,
                title: t('nav.market') || 'Market & Competition',
                desc: 'Local density, customer reach, and nearby competitors',
                icon: MapPin,
                color: C.teal,
              },
              {
                id: 'swot' as Screen,
                title: t('nav.swot') || 'SWOT Analysis',
                desc: 'Strengths, watch-outs, opportunities, and local threats',
                icon: Lightbulb,
                color: C.terracotta,
              },
              {
                id: 'pricing' as Screen,
                title: t('nav.pricing') || 'Suggested Pricing Range',
                desc: '₹56–₹80 / litre baseline and margin analysis',
                icon: DollarSign,
                color: C.teal,
              },
              {
                id: 'insight' as Screen,
                title: t('nav.insight') || "Neev's Simple Reading",
                desc: 'Hero feasibility reading and key performance indicators',
                icon: FileText,
                color: C.primary,
              },
            ].map((rep) => {
              const Icon = rep.icon;
              return (
                <button
                  key={rep.id}
                  type="button"
                  onClick={() => setScreen(rep.id)}
                  className="rounded-3xl p-4 flex items-center justify-between gap-3 bg-white border active:scale-98 text-left cursor-pointer hover:shadow-xs transition-all"
                  style={{ borderColor: C.border }}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${rep.color}15`, color: rep.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-sm text-charcoal truncate">
                        {rep.title}
                      </h4>
                      <p className="text-xs text-muted truncate mt-0.5">{rep.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-muted flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Download Section */}
        <div className="flex flex-col gap-2.5 pt-2">
          <Button
            label={t('reports.downloadPdf') || 'Download Project Report PDF'}
            onClick={handleDownloadReport}
            icon={<Download size={18} />}
          />
          <Button
            label={t('reports.downloadEngine') || 'Download Financial Engine (.csv)'}
            variant="secondary"
            onClick={handleDownloadEngine}
            icon={<FileSpreadsheet size={18} />}
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
