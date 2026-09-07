import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { downloadFinancialEngine } from '../../utils/download';
import { useFinancialEngine } from '../../hooks/useFinancialEngine';
import { getMockBusiness } from '../../data/mockBusiness';
import type { Screen, Mode, User, Business, FinancialInputs } from '../../types';
import {
  FileSpreadsheet,
  MapPin,
  FileText,
  Users,
  Bot,
  Receipt,
  ArrowRight,
  Sparkles,
  Wrench,
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
          <div className="flex items-start justify-between gap-2.5 mb-1">
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
          </div>
        </Card>

        {/* ═══ COLUMN 1: QUICK ACTIONS ═══ */}
        <div>
          <h3 className="font-display font-bold text-base text-charcoal mb-2.5 flex items-center gap-1.5">
            <Sparkles size={18} className="text-gold" />
            <span>{t('dashboard.quickActions') || 'Quick Actions'}</span>
          </h3>

          <div className="flex flex-col gap-2.5">
            {/* Excel / Financial Analysis */}
            <DashboardActionCard
              icon={<FileSpreadsheet size={20} />}
              iconBg={C.teal}
              title={t('dashboard.excelAnalysis') || 'Excel / Financial Analysis'}
              subtitle={t('dashboard.excelAnalysisSub') || 'Export calculations as spreadsheet'}
              onClick={handleDownloadEngine}
            />

            {/* Market Competition */}
            <DashboardActionCard
              icon={<MapPin size={20} />}
              iconBg={C.gold}
              title={t('dashboard.marketCompetition') || 'Market Competition'}
              subtitle={t('dashboard.marketCompetitionSub') || 'Local demand & competitor analysis'}
              onClick={() => setScreen('market')}
            />

            {/* Business Report */}
            <DashboardActionCard
              icon={<FileText size={20} />}
              iconBg={C.primary}
              title={t('dashboard.businessReport') || 'Business Report'}
              subtitle={t('dashboard.businessReportSub') || 'Complete assessment & downloads'}
              onClick={() => setScreen('reports')}
            />
          </div>
        </div>

        {/* ═══ COLUMN 2: TOOLS ═══ */}
        <div>
          <h3 className="font-display font-bold text-base text-charcoal mb-2.5 flex items-center gap-1.5">
            <Wrench size={18} className="text-teal" />
            <span>{t('dashboard.tools') || 'Tools'}</span>
          </h3>

          <div className="flex flex-col gap-2.5">
            {/* Networking */}
            <DashboardActionCard
              icon={<Users size={20} />}
              iconBg="#8B6BB5"
              title={t('dashboard.networking') || 'Networking'}
              subtitle={t('dashboard.networkingSub') || 'Connect with fellow entrepreneurs'}
              onClick={() => setScreen('network')}
              comingSoon
            />

            {/* Agentic AI */}
            <DashboardActionCard
              icon={<Bot size={20} />}
              iconBg={C.terracotta}
              title={t('dashboard.agenticAI') || 'Agentic AI'}
              subtitle={t('dashboard.agenticAISub') || 'Autonomous business agent'}
              onClick={() => setScreen('agenticAI')}
              comingSoon
            />

            {/* Invoice System */}
            <DashboardActionCard
              icon={<Receipt size={20} />}
              iconBg="#4A7B6B"
              title={t('dashboard.invoiceSystem') || 'Invoice System'}
              subtitle={t('dashboard.invoiceSystemSub') || 'Create & manage invoices'}
              onClick={() => {}}
              comingSoon
            />
          </div>
        </div>
      </div>
    </ScreenWrap>
  );
}

// ─── Dashboard Action Card ──────────────────────────────────────────────────
function DashboardActionCard({
  icon,
  iconBg,
  title,
  subtitle,
  onClick,
  comingSoon = false,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  comingSoon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl p-3.5 flex items-center gap-3.5 bg-white border active:scale-98 text-left cursor-pointer hover:shadow-xs transition-all w-full"
      style={{ borderColor: C.border }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-display font-bold text-sm text-charcoal truncate">
            {title}
          </h4>
          {comingSoon && (
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex-shrink-0"
              style={{ background: C.gold }}
            >
              Soon
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted truncate mt-0.5">{subtitle}</p>
      </div>
      <ArrowRight size={16} className="text-muted flex-shrink-0" />
    </button>
  );
}
