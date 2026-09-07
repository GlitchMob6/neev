import { useState, useEffect, useRef, useCallback } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, Button, C } from '../../components/ui';
import { HighlightTarget } from '../../hooks/useHighlight';
import { useLocalization } from '../../i18n';
import { formatCurrency } from '../../utils/formatters';
import {
  getApplicableScheme,
  calculateMarginAndLoan,
  calculateEMI,
  generateRepaymentSchedule,
} from '../../utils/financialCalculations';
import type { Mode, Screen, ScorecardData, FinancialInputs } from '../../types';
import { Sparkles, TrendingUp, Target, CreditCard, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';

// ─── Animated Counter Hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 1200, enabled: boolean = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, enabled]);
  return value;
}

// ─── Intersection Observer Hook ──────────────────────────────────────────────
function useInView(threshold: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Viability Bar Component ─────────────────────────────────────────────────
function ViabilityBar({ label, percentage, inView, delay }: {
  label: string;
  percentage: number;
  inView: boolean;
  delay: number;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setWidth(percentage), delay);
    return () => clearTimeout(timer);
  }, [inView, percentage, delay]);

  const barColor = percentage >= 75 ? C.primary : percentage >= 60 ? C.teal : C.gold;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-charcoal w-[140px] flex-shrink-0 text-right">
        {label}
      </span>
      <div className="flex-1 h-6 rounded-lg relative overflow-hidden" style={{ background: `${barColor}12` }}>
        <div
          className="h-full rounded-lg transition-all ease-out"
          style={{
            width: `${width}%`,
            background: barColor,
            transitionDuration: '800ms',
          }}
        />
      </div>
      <span
        className="text-xs font-bold w-[36px] flex-shrink-0 text-right transition-opacity duration-500"
        style={{ color: barColor, opacity: inView ? 1 : 0 }}
      >
        {inView ? `${percentage}%` : ''}
      </span>
    </div>
  );
}

// ─── Main Scorecard Screen ───────────────────────────────────────────────────
export function ScorecardScreen({
  scorecardData,
  financialInputs,
  mode = 'assisted',
  setScreen,
  onLoanIntent,
}: {
  scorecardData: ScorecardData;
  financialInputs: FinancialInputs;
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onLoanIntent: (intent: 'yes' | 'no') => void;
}) {
  const { t } = useLocalization();
  const [showFinancing, setShowFinancing] = useState(false);
  const [repaymentExpanded, setRepaymentExpanded] = useState(false);
  const financingRef = useRef<HTMLDivElement>(null);

  // Animated score
  const understandingCount = useCountUp(scorecardData.understandingScore, 1500);
  const viabilityCount = useCountUp(scorecardData.viabilityScore, 1200);

  // Viability section observer
  const viabilityView = useInView(0.2);

  // Scheme calculations
  const scheme = getApplicableScheme(financialInputs.totalProjectCost);
  const { margin, loanAmount } = calculateMarginAndLoan(financialInputs.totalProjectCost);
  const emi = scheme ? calculateEMI(loanAmount, scheme.interestRate, scheme.tenureMonths - scheme.moratoriumMonths) : 0;

  // Handle loan intent
  const handleLoanYes = useCallback(() => {
    onLoanIntent('yes');
    setShowFinancing(true);
    setTimeout(() => {
      financingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }, [onLoanIntent]);

  const handleLoanNo = useCallback(() => {
    onLoanIntent('no');
    setScreen('reports');
  }, [onLoanIntent, setScreen]);

  // Repayment schedule (first 6 entries for preview)
  const repaymentSchedule = scheme
    ? generateRepaymentSchedule(loanAmount, scheme.interestRate, scheme.tenureMonths, scheme.moratoriumMonths)
    : [];

  return (
    <ScreenWrap
      onBack={() => setScreen('dashboard')}
      mode={mode}
      assistantMessage={t('assistant.scorecard') || 'This is your complete business assessment. Scroll through to see your understanding, viability, and financing options.'}
    >
      <div className="flex flex-col gap-6 pt-2 pb-8">
        {/* ═══ TITLE ═══ */}
        <div className="text-center">
          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">
            {t('scorecard.badge') || 'Your Assessment'}
          </p>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('scorecard.title') || 'Your Neev Scorecard'}
          </h1>
        </div>

        {/* ═══ SECTION 1: YOUR UNDERSTANDING ═══ */}
        <HighlightTarget id="understanding">
          <Card
            variant="custom"
            className="border shadow-xs p-5 text-center"
            style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={18} className="text-primary" />
              <h2 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                {t('scorecard.understanding') || 'Your Understanding'}
              </h2>
            </div>

            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span
                className="font-display font-extrabold text-5xl"
                style={{ color: C.primary, lineHeight: 1 }}
              >
                {understandingCount}
              </span>
              <span className="text-lg font-bold text-muted">/500</span>
            </div>

            <p className="text-xs text-muted leading-relaxed max-w-[240px] mx-auto">
              {t('scorecard.understandingDesc') || 'How well you understand your market and business'}
            </p>
          </Card>
        </HighlightTarget>

        {/* ═══ SECTION 2: YOUR USP ═══ */}
        <HighlightTarget id="usp">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Target size={18} className="text-gold" />
              <h2 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                {t('scorecard.usp') || 'Your USP'}
              </h2>
            </div>
            <Card
              variant="custom"
              className="border shadow-xs p-5"
              style={{ background: '#FFF8EC', borderColor: '#F5D88A' }}
            >
              <p className="font-display font-bold text-base text-charcoal leading-relaxed">
                "{scorecardData.usp}"
              </p>
            </Card>
          </div>
        </HighlightTarget>

        {/* ═══ SECTION 3: BUSINESS VIABILITY ═══ */}
        <HighlightTarget id="viability">
          <div ref={viabilityView.ref}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-teal" />
                <h2 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                  {t('scorecard.viability') || 'Business Viability'}
                </h2>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-2xl" style={{ color: C.teal }}>
                  {viabilityView.inView ? viabilityCount : 0}
                </span>
                <span className="text-sm font-bold text-muted">/100</span>
              </div>
            </div>

            <Card variant="white" className="p-4 shadow-xs border" style={{ borderColor: C.border }}>
              <div className="flex flex-col gap-3">
                {scorecardData.viabilityDimensions.map((dim, i) => (
                  <ViabilityBar
                    key={dim.labelKey}
                    label={t(dim.labelKey) || dim.label}
                    percentage={dim.percentage}
                    inView={viabilityView.inView}
                    delay={i * 120}
                  />
                ))}
              </div>
            </Card>
          </div>
        </HighlightTarget>

        {/* ═══ SECTION 4: LOAN INTENT ═══ */}
        {!showFinancing && scorecardData.loanIntent !== 'no' && (
          <HighlightTarget id="loanIntent">
            <Card
              variant="custom"
              className="border shadow-xs p-5 text-center"
              style={{ background: C.cream, borderColor: C.border }}
            >
              <h2 className="font-display font-bold text-lg text-charcoal mb-1">
                {t('scorecard.loanQuestion') || 'Do you want to apply for a loan?'}
              </h2>
              <p className="text-xs text-muted mb-4">
                {t('scorecard.loanQuestionSub') || 'Neev can suggest a financing plan based on your assessment'}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleLoanYes}
                  className="flex-1 py-3.5 rounded-2xl font-display font-bold text-base text-white transition-all active:scale-95 cursor-pointer"
                  style={{ background: C.primary, boxShadow: '0 4px 16px rgba(23,107,82,0.25)' }}
                >
                  {t('common.yes') || 'Yes'}
                </button>
                <button
                  type="button"
                  onClick={handleLoanNo}
                  className="flex-1 py-3.5 rounded-2xl font-display font-bold text-base transition-all active:scale-95 cursor-pointer border-2"
                  style={{ color: C.charcoal, borderColor: C.border, background: 'white' }}
                >
                  {t('common.no') || 'No'}
                </button>
              </div>
            </Card>
          </HighlightTarget>
        )}

        {/* ═══ SECTION 5: FINANCING REVEAL ═══ */}
        {showFinancing && scheme && (
          <div
            ref={financingRef}
            className="flex flex-col gap-5 animate-fadeInUp"
          >
            {/* Scheme Possibility */}
            <HighlightTarget id="scheme">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <CreditCard size={18} className="text-primary" />
                  <h2 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                    {t('scorecard.schemePossibility') || 'Suggested Scheme'}
                  </h2>
                </div>
                <Card
                  variant="custom"
                  className="border shadow-xs p-4"
                  style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-base text-charcoal">
                      {scheme.name}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ background: C.teal }}
                    >
                      {t('scorecard.eligible') || 'Eligible'}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {scheme.type === 'microfinance'
                      ? (t('scorecard.microfinanceDesc') || `For total requirements up to ₹1.4 lakh at ${scheme.interestRate}% interest over ${scheme.tenureYears} years`)
                      : (t('scorecard.termLoanDesc') || `For total requirements up to ₹50 lakh at ${scheme.interestRate}% interest over ${scheme.tenureYears} years`)}
                  </p>
                </Card>
              </div>
            </HighlightTarget>

            {/* Capital & Margin */}
            <HighlightTarget id="capitalMargin">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-lg">💰</span>
                  <h2 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                    {t('scorecard.capitalMargin') || 'Capital & Margin'}
                  </h2>
                </div>
                <Card variant="white" className="p-4 shadow-xs border" style={{ borderColor: C.border }}>
                  {/* Visual breakdown */}
                  <div className="flex gap-2 mb-4">
                    <div
                      className="rounded-xl p-3 flex-[1]"
                      style={{ background: `${C.gold}15`, border: `1px solid ${C.gold}30` }}
                    >
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-1">
                        {t('scorecard.yourContribution') || 'Your Contribution'}
                      </p>
                      <p className="font-display font-extrabold text-lg" style={{ color: C.gold }}>
                        {formatCurrency(margin)}
                      </p>
                      <p className="text-[10px] text-muted font-medium">10% margin</p>
                    </div>
                    <div
                      className="rounded-xl p-3 flex-[2]"
                      style={{ background: `${C.primary}10`, border: `1px solid ${C.primary}20` }}
                    >
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-1">
                        {t('scorecard.loanAmount') || 'Loan Amount'}
                      </p>
                      <p className="font-display font-extrabold text-lg" style={{ color: C.primary }}>
                        {formatCurrency(loanAmount)}
                      </p>
                      <p className="text-[10px] text-muted font-medium">90% financed</p>
                    </div>
                  </div>
                  {/* Total bar */}
                  <div className="rounded-lg overflow-hidden h-3 flex" style={{ background: C.border }}>
                    <div style={{ width: '10%', background: C.gold }} />
                    <div style={{ width: '90%', background: C.primary }} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] font-medium text-muted">
                      {t('scorecard.total') || 'Total'}: {formatCurrency(financialInputs.totalProjectCost)}
                    </span>
                  </div>
                </Card>
              </div>
            </HighlightTarget>

            {/* EMI Calculator */}
            <HighlightTarget id="emi">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-lg">📱</span>
                  <h2 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                    {t('scorecard.emiCalculator') || 'EMI Calculator'}
                  </h2>
                </div>
                <Card
                  variant="custom"
                  className="border shadow-xs p-5 text-center"
                  style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
                >
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
                    {t('scorecard.indicativeEmi') || 'Indicative Monthly EMI'}
                  </p>
                  <p className="font-display font-extrabold text-3xl" style={{ color: C.primary }}>
                    {formatCurrency(Math.round(emi))}
                  </p>
                  <p className="text-xs text-muted mt-1">/month</p>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t" style={{ borderColor: '#B8DFD4' }}>
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase">Loan</p>
                      <p className="font-display font-bold text-sm text-charcoal">{formatCurrency(loanAmount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase">Rate</p>
                      <p className="font-display font-bold text-sm text-charcoal">{scheme.interestRate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase">Tenure</p>
                      <p className="font-display font-bold text-sm text-charcoal">{scheme.tenureYears} yrs</p>
                    </div>
                  </div>
                </Card>
              </div>
            </HighlightTarget>

            {/* Repayment Plan */}
            <HighlightTarget id="repayment">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Calendar size={18} className="text-gold" />
                  <h2 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
                    {t('scorecard.repaymentPlan') || 'Repayment Plan'}
                  </h2>
                </div>
                <Card variant="white" className="p-4 shadow-xs border overflow-hidden" style={{ borderColor: C.border }}>
                  {/* Moratorium info */}
                  <div
                    className="rounded-xl p-3 mb-3 flex items-start gap-2.5"
                    style={{ background: '#FFF8EC', border: '1px solid #F5D88A' }}
                  >
                    <span className="text-sm flex-shrink-0 mt-0.5">⏳</span>
                    <div>
                      <p className="text-xs font-bold text-charcoal">
                        {scheme.moratoriumMonths}-month moratorium
                      </p>
                      <p className="text-[10px] text-muted mt-0.5">
                        {t('scorecard.moratoriumNote') || 'No EMI during initial setup period. Interest accrues.'}
                      </p>
                    </div>
                  </div>

                  {/* Schedule preview */}
                  <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2 flex justify-between px-1">
                    <span>Month</span>
                    <span>EMI</span>
                    <span>Balance</span>
                  </div>
                  {repaymentSchedule.slice(0, repaymentExpanded ? 12 : 6).map((entry) => (
                    <div
                      key={entry.month}
                      className="flex justify-between py-1.5 px-1 border-b text-xs"
                      style={{ borderColor: `${C.border}80` }}
                    >
                      <span className="text-muted w-14">
                        {entry.isMoratorium ? `M${entry.month} ⏳` : `M${entry.month}`}
                      </span>
                      <span className="font-semibold text-charcoal w-20 text-right">
                        {entry.emi === 0 ? '—' : formatCurrency(entry.emi)}
                      </span>
                      <span className="text-muted w-20 text-right">
                        {formatCurrency(entry.balance)}
                      </span>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => setRepaymentExpanded(!repaymentExpanded)}
                    className="flex items-center justify-center gap-1 w-full pt-2.5 text-xs font-bold cursor-pointer"
                    style={{ color: C.teal }}
                  >
                    {repaymentExpanded ? (
                      <>Show less <ChevronUp size={14} /></>
                    ) : (
                      <>Show more months <ChevronDown size={14} /></>
                    )}
                  </button>

                  <p className="text-[10px] text-muted mt-2 text-center italic">
                    {t('scorecard.repaymentDisclaimer') || 'Estimated repayment. Actual terms may vary.'}
                  </p>
                </Card>
              </div>
            </HighlightTarget>

            {/* Business Report Preview */}
            <HighlightTarget id="reportPreview">
              <Card
                variant="custom"
                className="border shadow-xs p-5"
                style={{ background: `${C.primary}08`, borderColor: `${C.primary}25` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: C.primary, color: 'white' }}
                  >
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-charcoal">
                      {t('scorecard.reportPreview') || 'Business Report Preview'}
                    </h3>
                    <p className="text-[10px] text-muted">
                      {t('scorecard.reportPreviewDesc') || 'Your complete assessment is ready to view'}
                    </p>
                  </div>
                </div>
                <Button
                  label={t('scorecard.viewReport') || 'View Report'}
                  onClick={() => setScreen('reports')}
                  icon="→"
                />
              </Card>
            </HighlightTarget>
          </div>
        )}
      </div>
    </ScreenWrap>
  );
}
