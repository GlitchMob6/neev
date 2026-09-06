import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Mode, Scheme, SchemeFit } from '../../types';
import { CheckCircle2, AlertCircle, HelpCircle, FileText, Share2, Bookmark } from 'lucide-react';

export function SchemeDetailScreen({
  scheme,
  fit = 'relevant',
  mode,
  onBack,
}: {
  scheme: Scheme | null;
  fit?: SchemeFit;
  mode?: Mode;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  const [saved, setSaved] = useState(false);

  if (!scheme) return null;

  const getFitConfig = (fitState: SchemeFit) => {
    switch (fitState) {
      case 'highly_relevant':
        return { icon: <CheckCircle2 size={20} color={C.teal} />, text: t('scheme.fit.high') || 'Looks highly relevant', bg: '#EBF7F3', color: C.teal };
      case 'relevant':
        return { icon: <CheckCircle2 size={20} color={C.primary} />, text: t('scheme.fit.med') || 'May be relevant', bg: C.sand, color: C.charcoal };
      case 'more_info_needed':
      default:
        return { icon: <HelpCircle size={20} color={C.terracotta} />, text: t('scheme.fit.low') || 'More information needed', bg: '#FDF2F0', color: C.terracotta };
    }
  };

  const fitConfig = getFitConfig(fit);

  return (
    <ScreenWrap
      mode={mode}
      onBack={onBack}
      assistantMessage={t('assistant.schemeDetail') || 'This scheme looks like a good match based on your requirement. Make sure to verify eligibility.'}
    >
      <div className="flex flex-col gap-6 pt-2 pb-8">
        
        {/* Header section */}
        <div>
           <div className="flex justify-between items-start mb-3">
             <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-green-50 text-teal-700" style={{ background: '#EBF7F3', color: C.teal }}>
               {t(scheme.intendedForKey) || 'Target Audience'}
             </span>
             <div className="flex gap-2">
               <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm transition-all active:scale-95" onClick={() => setSaved(!saved)}>
                 <Bookmark size={18} fill={saved ? C.primary : 'none'} color={saved ? C.primary : C.charcoal} />
               </button>
               <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm transition-all active:scale-95">
                 <Share2 size={18} color={C.charcoal} />
               </button>
             </div>
           </div>
           
           <h1 className="font-display font-bold text-3xl text-charcoal leading-tight">
             {t(scheme.nameKey) || scheme.id}
           </h1>
           <p className="mt-2 text-base text-muted leading-relaxed">
             {t(scheme.shortDescKey) || 'Description of the scheme.'}
           </p>
        </div>

        {/* Personalized Fit */}
        <div className="rounded-3xl p-4 flex flex-col gap-2" style={{ background: fitConfig.bg }}>
           <div className="flex items-center gap-2">
             {fitConfig.icon}
             <span className="font-bold text-sm" style={{ color: fitConfig.color }}>
               {t('scheme.yourFit') || 'Your Fit:'} {fitConfig.text}
             </span>
           </div>
           <p className="text-xs text-charcoal/80 leading-relaxed pl-7">
             {t('scheme.fitReason') || 'Based on your business type and funding requirement, this scheme matches your profile.'}
           </p>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card variant="white" className="p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-xs font-bold text-muted uppercase tracking-wider">{t('scheme.loanAmount') || 'Funding Range'}</span>
            <span className="font-display font-bold text-xl text-charcoal">{t(scheme.loanRangeKey) || 'Amount'}</span>
          </Card>
          <Card variant="white" className="p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-xs font-bold text-muted uppercase tracking-wider">{t('scheme.benefit') || 'Primary Benefit'}</span>
            <span className="font-display font-bold text-xl text-charcoal">{t(scheme.primaryBenefitKey) || 'Benefit'}</span>
          </Card>
        </div>

        {/* Details Sections */}
        <div className="flex flex-col gap-5 mt-2">
           <div>
             <h3 className="font-bold text-lg text-charcoal mb-2 flex items-center gap-2">
               <CheckCircle2 size={18} color={C.primary} />
               {t('scheme.eligibility') || 'Eligibility Criteria'}
             </h3>
             <ul className="list-disc pl-5 text-sm text-charcoal leading-relaxed space-y-1.5 marker:text-primary/50">
               <li>{t('scheme.el1') || 'Must be an Indian citizen'}</li>
               <li>{t('scheme.el2') || 'Business should be a micro or small enterprise'}</li>
               <li>{t('scheme.el3') || 'No previous defaults with any bank'}</li>
             </ul>
           </div>

           <div>
             <h3 className="font-bold text-lg text-charcoal mb-2 flex items-center gap-2">
               <FileText size={18} color={C.primary} />
               {t('scheme.docs') || 'Documents Usually Required'}
             </h3>
             <ul className="list-disc pl-5 text-sm text-charcoal leading-relaxed space-y-1.5 marker:text-primary/50">
               <li>{t('scheme.doc1') || 'Identity Proof (Aadhaar / PAN)'}</li>
               <li>{t('scheme.doc2') || 'Business Registration Proof'}</li>
               <li>{t('scheme.doc3') || 'Project Report / Business Plan'}</li>
             </ul>
           </div>

           <div className="bg-orange-50 rounded-2xl p-4 flex gap-3 border border-orange-100">
             <AlertCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
             <p className="text-xs text-orange-800 leading-relaxed">
               {t('scheme.disclaimer') || 'This information is indicative. Final eligibility and loan approval are subject to the verifying bank or agency.'}
             </p>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-3">
          <Button 
            label={t('scheme.apply') || 'Check Official Details'}
            onClick={() => {}} 
          />
          <Button 
            label={saved ? (t('scheme.saved') || '✓ Saved to your list') : (t('scheme.save') || 'Save this Scheme')}
            variant="secondary"
            onClick={() => setSaved(!saved)}
          />
        </div>

      </div>
    </ScreenWrap>
  );
}
