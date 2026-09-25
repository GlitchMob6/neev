import { useState, useMemo } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { getRecommendedSchemes } from '../../data/mockSchemes';
import type { Mode, User, Business, Scheme } from '../../types';
import { Sparkles, ChevronRight, Award, ShieldCheck } from 'lucide-react';

export function SchemesRecommendationScreen({
  user,
  business,
  commonAnswers = {},
  adaptiveAnswers = {},
  mode = 'assisted',
  onSchemeSelect,
  onNext,
  onBack,
}: {
  user: User;
  business: Business;
  commonAnswers?: Record<string, string>;
  adaptiveAnswers?: Record<string, string>;
  mode?: Mode;
  onSchemeSelect: (scheme: Scheme) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);

  const { generalSchemes, womenSchemes, reason } = useMemo(() => {
    return getRecommendedSchemes(user, business, commonAnswers, adaptiveAnswers);
  }, [user, business, commonAnswers, adaptiveAnswers]);

  const handleCardClick = (scheme: Scheme) => {
    setSelectedSchemeId(scheme.id);
    onSchemeSelect(scheme);
  };

  const isFemale = user.gender === 'female';

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      assistantMessage={
        t('assistant.schemes') ||
        "Based on what you've told me, here are the support options and government schemes that match your enterprise."
      }
    >
      <div className="flex flex-col gap-5 pt-1 pb-6">
        <div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/70 text-xs font-bold text-charcoal w-fit">
            <Sparkles size={13} className="text-gold" />
            <span>{t('schemes.matchedBadge') || 'Direct Eligibility Match'}</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight mt-1.5">
            {t('schemes.matchedTitle') || 'Government Schemes & Loans'}
          </h1>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            {t('schemes.matchedSub') ||
              'Automatically matched based on your business type, capital, and location.'}
          </p>
        </div>

        {/* ═══ SECTION: WOMEN EMPOWERMENT (ONLY FOR FEMALE USERS) ═══ */}
        {isFemale && womenSchemes.length > 0 && (
          <div className="flex flex-col gap-2.5 animate-fadeIn">
            <div className="flex items-center gap-2 px-1">
              <span className="text-lg">🌸</span>
              <h2 className="font-display font-bold text-sm text-[#9C27B0] uppercase tracking-wider">
                {t('schemes.womenTitle') || 'Opportunities for Women Entrepreneurs'}
              </h2>
            </div>

            <div
              className="rounded-3xl p-3.5 border flex flex-col gap-2.5"
              style={{
                background: 'linear-gradient(145deg, #FBF2FA 0%, #FFFFFF 100%)',
                borderColor: '#E1BEE7',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-[#9C27B0]">
                  {t('schemes.exclusiveForWomen') || 'Exclusive Women Category'}
                </span>
                <p className="text-[11px] text-muted">Special interest concession & lower collateral</p>
              </div>

              <div className="flex flex-col gap-2.5">
                {womenSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    type="button"
                    onClick={() => handleCardClick(scheme)}
                    className="rounded-2xl p-3.5 flex flex-col text-left transition-all active:scale-98 bg-white border cursor-pointer hover:shadow-xs"
                    style={{
                      borderColor: selectedSchemeId === scheme.id ? '#9C27B0' : '#E8D5EC',
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div>
                        <h4 className="font-display font-bold text-sm text-charcoal leading-snug">
                          {t(scheme.nameKey) || scheme.id}
                        </h4>
                        <p className="text-xs text-muted line-clamp-2 mt-0.5">
                          {t(scheme.shortDescKey) || 'Tailored financial support for women entrepreneurs.'}
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-[#9C27B0] flex-shrink-0 mt-0.5" />
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#F3E5F5] text-[#7B1FA2]">
                        {t(scheme.primaryBenefitKey) || 'Concessional Interest'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sand/60 text-charcoal">
                        {t(scheme.loanRangeKey) || '₹10L - ₹1Cr'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ SECTION: GENERAL APPLICABLE SCHEMES ═══ */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2 px-1">
            <Award size={18} className="text-teal" />
            <h2 className="font-display font-bold text-sm text-charcoal uppercase tracking-wider">
              {t('schemes.generalTitle') || 'Universal Enterprise Schemes'}
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            {generalSchemes.map((scheme) => (
              <button
                key={scheme.id}
                type="button"
                onClick={() => handleCardClick(scheme)}
                className="rounded-2xl p-3.5 flex flex-col text-left transition-all active:scale-98 bg-white border cursor-pointer hover:shadow-xs"
                style={{
                  borderColor: selectedSchemeId === scheme.id ? C.primary : C.border,
                }}
              >
                <div className="flex items-start justify-between gap-2 w-full">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="font-display font-bold text-sm text-charcoal leading-snug">
                        {t(scheme.nameKey) || scheme.id}
                      </h4>
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex-shrink-0"
                        style={{ background: C.teal }}
                      >
                        {t('schemes.eligible') || 'Eligible'}
                      </span>
                    </div>
                    <p className="text-xs text-muted line-clamp-2">
                      {t(scheme.shortDescKey) || 'Credit-linked support to establish and expand operations.'}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted flex-shrink-0 mt-1" />
                </div>

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                    style={{ background: '#EBF7F3', color: C.teal }}
                  >
                    {t(scheme.primaryBenefitKey) || 'Collateral-free'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sand/60 text-charcoal">
                    {t(scheme.loanRangeKey) || 'Up to ₹10 Lakhs'}
                  </span>
                  <span className="text-[10px] text-muted ml-auto font-medium">
                    {t(scheme.intendedForKey) || 'Small Business'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ═══ REASONING BANNER ═══ */}
        <div
          className="rounded-2xl p-3 flex items-start gap-2.5 border"
          style={{ background: '#FFF8EC', borderColor: '#F5D88A' }}
        >
          <ShieldCheck size={18} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#8B6914] leading-relaxed">
            {reason}
          </p>
        </div>

        {/* ═══ PRIMARY CTA ═══ */}
        <div className="pt-2">
          <Button
            label={t('schemes.proceedToViability') || 'Proceed to Viability Assessment'}
            onClick={onNext}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
