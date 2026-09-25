import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, SourceBadge, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { useFinancialEngine } from '../../hooks/useFinancialEngine';
import { formatCurrency } from '../../utils/formatters';
import { downloadFinancialEngine } from '../../utils/download';
import { FileSpreadsheet, Edit2, Check } from 'lucide-react';
import type { Screen, Mode, FinancialInputs } from '../../types';

export function FinancialReportScreen({
  financialInputs,
  setFinancialInputs,
  mode = 'assisted',
  setScreen,
  onBack,
}: {
  financialInputs: FinancialInputs;
  setFinancialInputs?: (fn: (prev: FinancialInputs) => FinancialInputs) => void;
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  const [isEditing, setIsEditing] = useState(false);

  // Local editable state for business inputs
  const [editSales, setEditSales] = useState(
    String(financialInputs.dailyOutputUnits * financialInputs.pricePerUnit * financialInputs.workingDaysPerMonth)
  );
  const [editExpenses, setEditExpenses] = useState(
    String(
      financialInputs.monthlyRent +
      financialInputs.rawMaterialCost +
      financialInputs.laborCost +
      financialInputs.transportCost +
      financialInputs.otherOperatingCosts
    )
  );
  const [editVolume, setEditVolume] = useState(String(financialInputs.dailyOutputUnits));
  const [editCapital, setEditCapital] = useState(String(financialInputs.ownContribution));

  const handleSaveInputs = () => {
    if (setFinancialInputs) {
      const salesNum = parseInt(editSales, 10) || 0;
      const expensesNum = parseInt(editExpenses, 10) || 0;
      const volumeNum = parseInt(editVolume, 10) || 0;
      const capitalNum = parseInt(editCapital, 10) || 0;

      setFinancialInputs((prev) => {
        const workingDays = prev.workingDaysPerMonth || 26;
        const pricePerUnit = volumeNum > 0 && workingDays > 0
          ? Math.round(salesNum / (volumeNum * workingDays))
          : prev.pricePerUnit;

        return {
          ...prev,
          dailyOutputUnits: volumeNum,
          pricePerUnit,
          ownContribution: capitalNum,
          monthlyRent: Math.round(expensesNum * 0.07), // rough proportional split
          rawMaterialCost: Math.round(expensesNum * 0.65),
          laborCost: Math.round(expensesNum * 0.17),
          transportCost: Math.round(expensesNum * 0.06),
          otherOperatingCosts: Math.round(expensesNum * 0.05),
        };
      });
    }
    setIsEditing(false);
  };

  const outputs = useFinancialEngine(financialInputs);

  const handleDownloadExcel = () => {
    downloadFinancialEngine(financialInputs, outputs, 'Enterprise Financial Analysis');
  };

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
      label: t('financial.monthlyProfit') || 'Est. monthly profit',
      value: formatCurrency(Math.round(outputs.monthlyProfit)),
      badge: 'model' as const,
      color: C.primary,
    },
  ];

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="tools"
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

        {/* ═══ CURRENT BUSINESS INPUTS ═══ */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="font-display font-bold text-base text-charcoal">
              Current Business Inputs
            </h2>
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  handleSaveInputs();
                } else {
                  setIsEditing(true);
                }
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer border"
              style={{
                color: isEditing ? 'white' : C.teal,
                background: isEditing ? C.primary : 'white',
                borderColor: isEditing ? C.primary : C.border,
              }}
            >
              {isEditing ? (
                <><Check size={12} /> Save</>
              ) : (
                <><Edit2 size={12} /> Edit</>
              )}
            </button>
          </div>

          <Card variant="white" className="p-4 shadow-xs border" style={{ borderColor: C.border }}>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: 'Current Monthly Sales',
                  value: editSales,
                  onChange: setEditSales,
                  prefix: '₹',
                },
                {
                  label: 'Current Monthly Expenses',
                  value: editExpenses,
                  onChange: setEditExpenses,
                  prefix: '₹',
                },
                {
                  label: 'Daily Production Volume',
                  value: editVolume,
                  onChange: setEditVolume,
                  suffix: 'units/day',
                },
                {
                  label: 'Available Capital',
                  value: editCapital,
                  onChange: setEditCapital,
                  prefix: '₹',
                },
              ].map((field) => (
                <div key={field.label} className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-charcoal flex-1">
                    {field.label}
                  </span>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      {field.prefix && <span className="text-xs text-muted">{field.prefix}</span>}
                      <input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-24 px-2 py-1.5 rounded-lg text-sm font-bold text-charcoal text-right outline-none"
                        style={{ border: `1.5px solid ${C.primary}`, background: '#FAFAFA' }}
                      />
                      {field.suffix && <span className="text-[10px] text-muted">{field.suffix}</span>}
                    </div>
                  ) : (
                    <span className="font-display font-bold text-sm text-primary">
                      {field.prefix}{parseInt(field.value, 10).toLocaleString('en-IN')}
                      {field.suffix ? ` ${field.suffix}` : ''}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
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
                  label: t('financial.dailyCollection') || 'Daily production volume',
                  value: `~${financialInputs.dailyOutputUnits} units/day`,
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

        <div className="flex flex-col gap-2.5 pt-2">
          <Button
            label={t('financial.exportExcel') || 'Export Financial Analysis (.xlsx / .csv)'}
            variant="secondary"
            onClick={handleDownloadExcel}
            icon={<FileSpreadsheet size={18} />}
          />
          <Button
            label={t('common.backToTools') || 'Back to Tools'}
            onClick={() => setScreen('tools')}
            icon="←"
            variant="secondary"
          />
          <button
            type="button"
            onClick={() => setScreen('roadmap')}
            className="text-xs font-bold text-center py-2 text-teal hover:underline cursor-pointer"
          >
            {t('financial.seeRepayment') || 'See repayment schedule & moratorium details →'}
          </button>
        </div>
      </div>
    </ScreenWrap>
  );
}
