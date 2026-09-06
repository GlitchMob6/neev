import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, SourceBadge, C } from '../../components/ui';
import { QuickActionCard } from '../../components/cards/QuickActionCard';
import { useLocalization } from '../../i18n';
import { useFinancialEngine } from '../../hooks/useFinancialEngine';
import { getMockBusiness } from '../../data/mockBusiness';
import { formatCurrency } from '../../utils/formatters';
import { downloadFinancialEngine, downloadReportPDF } from '../../utils/download';
import type { Screen, Mode, User, Business, FinancialInputs } from '../../types';
import {
  TrendingUp,
  Download,
  FileSpreadsheet,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  MapPin,
} from 'lucide-react';

export function DashboardScreen({
  user,
  business,
  financialInputs,
  mode = 'assisted',
  setScreen,
}: {
  user: User;
  business: Business;
  financialInputs: FinancialInputs;
  mode?: Mode;
  setScreen: (s: Screen) => void;
}) {
  const { language, t } = useLocalization();
  const outputs = useFinancialEngine(financialInputs);
  const localizedMock = getMockBusiness(language);

  const activeBusinessName = business.name || localizedMock.name;
  const activeLocation = business.location || localizedMock.location;

  const handleDownloadEngine = () => {
    downloadFinancialEngine(financialInputs, outputs, activeBusinessName);
  };

  const handleDownloadReport = () => {
    downloadReportPDF(
      { ...business, name: activeBusinessName, location: activeLocation },
      financialInputs,
      outputs,
      `${user.firstName} ${user.lastName}`
    );
  };

  return (
    <ScreenWrap
      mode={mode}
      showNav={true}
      navScreen="dashboard"
      setScreen={setScreen}
      assistantMessage={t('assistant.dashboard')}
    >
      <div className="flex flex-col gap-5 pt-1 pb-6">
        {/* Header with greeting */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted font-semibold uppercase tracking-wider">
              {t('dashboard.greeting') || 'Good day,'}
            </p>
            <h1 className="font-display font-bold text-2xl text-charcoal flex items-center gap-1.5">
              <span>{user.firstName || 'Entrepreneur'}</span>
              <span className="text-xl">👋</span>
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setScreen('profile')}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-xs"
            style={{ background: C.primary }}
          >
            {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
            {user.lastName ? user.lastName[0].toUpperCase() : ''}
          </button>
        </div>

        {/* Business Hero Card */}
        <Card
          variant="custom"
          className="border shadow-xs relative overflow-hidden"
          style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
        >
          <div className="flex items-start justify-between gap-2.5 mb-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="text-2xl flex-shrink-0">🥛</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-base text-charcoal truncate">
                  {activeBusinessName}
                </h3>
                <p className="text-xs text-muted font-medium flex items-center gap-1 truncate mt-0.5">
                  <MapPin size={12} className="flex-shrink-0" />
                  <span className="truncate">{activeLocation}, {business.state || 'Maharashtra'}</span>
                </p>
              </div>
            </div>
            <SourceBadge type="self" className="flex-shrink-0 mt-0.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-primary/15">
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wide">
                {t('dashboard.yourCapital') || 'Your Capital'}
              </p>
              <p className="font-display font-bold text-base text-charcoal mt-0.5">
                {formatCurrency(financialInputs.ownContribution)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wide">
                {t('dashboard.estProfit') || 'Est. Monthly Profit'}
              </p>
              <p className="font-display font-bold text-base text-primary mt-0.5">
                {formatCurrency(outputs.monthlyProfit)}
              </p>
            </div>
          </div>
        </Card>

        {/* Financial Highlights Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-display font-bold text-base text-charcoal flex items-center gap-1.5">
              <TrendingUp size={18} className="text-primary" />
              <span>{t('dashboard.financialMetrics') || 'Business Economics'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setScreen('financialReport')}
              className="text-xs font-bold text-teal flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{t('dashboard.viewAll') || 'View all'}</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Card variant="white" className="p-3.5 flex flex-col justify-between shadow-xs border" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-center mb-1.5">
                <SourceBadge type="local" />
              </div>
              <div className="text-center">
                <p className="font-display font-extrabold text-xl text-teal">
                  {formatCurrency(outputs.monthlyRevenue)}
                </p>
                <p className="text-xs font-semibold text-charcoal mt-0.5">
                  {t('financial.monthlyRevenue') || 'Monthly Revenue'}
                </p>
                <p className="text-[10px] text-muted font-medium mt-0.5">
                  {financialInputs.dailyOutputUnits}L @ ₹{financialInputs.pricePerUnit}/L
                </p>
              </div>
            </Card>

            <Card variant="white" className="p-3.5 flex flex-col justify-between shadow-xs border" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-center mb-1.5">
                <SourceBadge type="model" />
              </div>
              <div className="text-center">
                <p className="font-display font-extrabold text-xl text-terracotta">
                  {formatCurrency(outputs.monthlyEMI)}
                </p>
                <p className="text-xs font-semibold text-charcoal mt-0.5">
                  {t('financial.estimatedEMI') || 'Estimated Monthly EMI'}
                </p>
                <p className="text-[10px] text-muted font-medium mt-0.5">
                  {Math.round(financialInputs.loanTenureMonths / 12)} yrs @ {financialInputs.interestRate}% p.a.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions (4 Cards) */}
        <div>
          <h3 className="font-display font-bold text-base text-charcoal mb-2.5 flex items-center gap-1.5">
            <Sparkles size={18} className="text-gold" />
            <span>{t('dashboard.quickActions') || 'Quick Actions'}</span>
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {/* 1. Download Financial Engine */}
            <QuickActionCard
              title={t('dashboard.downloadEngine') || 'Financial Engine'}
              subtitle={t('dashboard.downloadEngineSub') || 'Export calculations CSV'}
              icon={<FileSpreadsheet size={20} />}
              onClick={handleDownloadEngine}
              variant="primary"
            />

            {/* 2. Download Report PDF */}
            <QuickActionCard
              title={t('dashboard.downloadReport') || 'Project Report'}
              subtitle={t('dashboard.downloadReportSub') || 'Printable summary'}
              icon={<Download size={20} />}
              onClick={handleDownloadReport}
              variant="white"
            />

            {/* 3. Find a Scheme */}
            <QuickActionCard
              title={t('dashboard.schemes') || 'Find a Scheme'}
              subtitle={t('dashboard.schemesSub') || 'Govt funding options'}
              icon={<Award size={20} />}
              onClick={() => setScreen('schemes')}
              variant="white"
            />

            {/* 4. Network (Coming Soon) */}
            <QuickActionCard
              title={t('dashboard.network') || 'Entrepreneur Network'}
              subtitle={t('dashboard.networkSub') || 'Peer community & buyers'}
              icon={<Users size={20} />}
              comingSoon={true}
              onClick={() => setScreen('network')}
              variant="sand"
            />
          </div>
        </div>

        {/* Modules / Report Navigation */}
        <div>
          <h3 className="font-display font-bold text-base text-charcoal mb-2.5">
            {t('dashboard.modules') || 'Business Analysis Modules'}
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                icon: '📊',
                title: t('nav.financial') || 'Financial Snapshot',
                desc: 'Project cost & loan',
                screen: 'financialReport' as Screen,
              },
              {
                icon: '🗓️',
                title: t('nav.roadmap') || 'Repayment Plan',
                desc: 'Moratorium & timeline',
                screen: 'roadmap' as Screen,
              },
              {
                icon: '🗺️',
                title: t('nav.market') || 'Market & Competition',
                desc: 'Local density & reach',
                screen: 'market' as Screen,
              },
              {
                icon: '💡',
                title: t('nav.swot') || 'SWOT Analysis',
                desc: 'Strengths & risks',
                screen: 'swot' as Screen,
              },
            ].map((mod, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setScreen(mod.screen)}
                className="rounded-3xl p-3.5 flex flex-col items-start gap-1.5 transition-all bg-white border active:scale-98 text-left cursor-pointer hover:shadow-sm"
                style={{ borderColor: C.border }}
              >
                <span className="text-2xl">{mod.icon}</span>
                <div>
                  <h4 className="font-display font-bold text-xs text-charcoal leading-tight">
                    {mod.title}
                  </h4>
                  <p className="text-[10px] text-muted font-medium mt-0.5">{mod.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScreenWrap>
  );
}
