import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { useFinancialEngine } from '../../hooks/useFinancialEngine';
import { getMockBusiness } from '../../data/mockBusiness';
import { formatCurrency } from '../../utils/formatters';
import { ToolsGrid } from '../../components/tools/ToolsGrid';
import type { Screen, Mode, User, Business, FinancialInputs } from '../../types';
import {
  MapPin,
  Wrench,
  CreditCard,
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
  const activeCategory = business.category || localizedMock.category;

  const hasCalculatedEMI = outputs.monthlyEMI > 0;

  return (
    <ScreenWrap
      mode={mode}
      showNav={true}
      navScreen="dashboard"
      setScreen={setScreen}
      assistantMessage={t('assistant.dashboard')}
    >
      <div className="flex flex-col gap-4.5 pt-1 pb-6">
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
          className="border shadow-xs relative overflow-hidden p-4"
          style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
        >
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="text-2xl flex-shrink-0">🏪</span>
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
            <span className="text-[10px] font-bold text-teal px-2 py-0.5 rounded-full bg-white border border-teal/20">
              {activeCategory}
            </span>
          </div>
        </Card>

        {/* ═══ PROMINENT MONTHLY EMI CARD ═══ */}
        {hasCalculatedEMI ? (
          <div
            className="rounded-3xl p-4.5 border shadow-sm relative overflow-hidden flex items-center justify-between transition-all"
            style={{
              background: 'linear-gradient(135deg, #176B52 0%, #0F4A38 100%)',
              color: 'white',
              borderColor: '#0F4A38',
            }}
          >
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <CreditCard size={14} className="text-gold" />
                <p className="text-[11px] font-bold text-white/85 uppercase tracking-widest">
                  {t('dashboard.monthlyEmi') || 'MONTHLY EMI'}
                </p>
              </div>
              <p className="font-display font-extrabold text-2xl text-white">
                {formatCurrency(Math.round(outputs.monthlyEMI))}
                <span className="text-xs font-normal text-white/70 ml-1">/ mo</span>
              </p>
              <p className="text-[10px] text-white/75 mt-1">
                Loan: {formatCurrency(financialInputs.loanAmount)} · {financialInputs.interestRate}% p.a.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setScreen('financialReport')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
              style={{ background: '#FAF7F0', color: C.primary }}
            >
              {t('dashboard.viewDetails') || 'Details →'}
            </button>
          </div>
        ) : (
          <div
            className="rounded-3xl p-4 border border-dashed flex items-center justify-between"
            style={{ borderColor: C.border, background: 'white' }}
          >
            <div>
              <p className="text-xs font-bold text-charcoal">
                {t('dashboard.monthlyEmi') || 'MONTHLY EMI'}
              </p>
              <p className="text-[11px] text-muted mt-0.5">
                {t('dashboard.emiPending') || 'EMI will appear after financial analysis'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setScreen('financialReport')}
              className="text-xs font-bold text-teal hover:underline cursor-pointer"
            >
              Analyze →
            </button>
          </div>
        )}

        {/* ═══ 2 METRIC CARDS ═══ */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl p-3.5 bg-white border border-border flex flex-col justify-between">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
              {t('dashboard.yourCapital') || 'Your Capital'}
            </span>
            <p className="font-display font-bold text-lg text-charcoal mt-1">
              {formatCurrency(financialInputs.ownContribution)}
            </p>
          </div>

          <div className="rounded-2xl p-3.5 bg-white border border-border flex flex-col justify-between">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
              {t('dashboard.estProfit') || 'Est. Profit / Mo'}
            </span>
            <p className="font-display font-bold text-lg text-primary mt-1">
              {outputs.monthlyProfit > 0 ? formatCurrency(Math.round(outputs.monthlyProfit)) : '₹18,500'}
            </p>
          </div>
        </div>

        {/* ═══ BUSINESS TOOLS (3-COLUMN GRID) ═══ */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h3 className="font-display font-bold text-base text-charcoal flex items-center gap-1.5">
              <Wrench size={18} className="text-teal" />
              <span>{t('dashboard.tools') || 'Business Tools'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setScreen('tools')}
              className="text-xs font-bold text-teal hover:underline cursor-pointer"
            >
              {t('dashboard.viewAll') || 'View all'}
            </button>
          </div>

          {/* 3-Column Tools Grid */}
          <ToolsGrid setScreen={setScreen} />
        </div>
      </div>
    </ScreenWrap>
  );
}
