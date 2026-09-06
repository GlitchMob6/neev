import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { mockSchemes } from '../../data/mockSchemes';
import type { Screen, Mode, Scheme, Business } from '../../types';
import { Search, ChevronRight } from 'lucide-react';

export function SchemesScreen({
  business,
  mode,
  setScreen,
  onSchemeSelect,
}: {
  business?: Business;
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onSchemeSelect: (scheme: Scheme) => void;
}) {
  const { t } = useLocalization();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Seeded demo business check
  const isDemoDairy = business?.location === 'Nashik' && (business?.category?.includes('Dairy') || business?.category?.includes('डेयरी') || business?.category?.includes('डेअरी'));
  const pmmyScheme = mockSchemes.find(s => s.id === 'pm-mudra');

  return (
    <ScreenWrap
      mode={mode}
      showNav={true}
      navScreen="schemes"
      setScreen={setScreen}
      assistantMessage={t('assistant.schemes') || 'Let me help you find the right government support for your business.'}
    >
       <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('schemes.title') || 'Government Schemes'}
          </h1>
          <p className="mt-1 text-sm text-muted leading-relaxed">
            {t('schemes.subtitle') || 'Discover funding and support options relevant to your business.'}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} color={C.muted} />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none"
            style={{ background: '#fff', border: `1.5px solid ${C.border}`, color: C.charcoal }}
            placeholder={t('schemes.search') || 'Search schemes, loans...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Wizard CTA */}
        <Card variant="green" className="flex flex-col gap-3 p-4">
          <div className="flex gap-3">
             <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white flex-shrink-0 shadow-sm text-xl">
               🎯
             </div>
             <div>
               <h3 className="font-bold text-charcoal">{t('schemes.findFit') || 'Find your perfect fit'}</h3>
               <p className="text-xs text-muted leading-relaxed mt-0.5">
                 {t('schemes.findFitDesc') || 'Answer 3 simple questions and we will recommend the best options.'}
               </p>
             </div>
          </div>
          <Button 
            label={t('schemes.startWizard') || 'Find Schemes'} 
            onClick={() => setScreen('schemeDiscovery')}
            className="mt-1"
          />
        </Card>

        {/* Recommended for Your Business (if demo dairy) */}
        {isDemoDairy && pmmyScheme && (
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm text-terracotta tracking-wide uppercase">
                {t('schemes.recommendedForYou') || 'Recommended For Your Business'}
              </h2>
            </div>
            <button 
              onClick={() => {
                onSchemeSelect(pmmyScheme);
                setScreen('schemeDetail');
              }}
              className="flex flex-col gap-2 rounded-3xl p-4 text-left transition-all active:scale-98 bg-white cursor-pointer shadow-md"
              style={{ border: `2px solid ${C.primary}` }}
            >
              <div className="flex justify-between items-start w-full">
                <h3 className="font-bold text-charcoal text-base pr-2 leading-tight">
                  {t(pmmyScheme.nameKey) || 'Pradhan Mantri MUDRA Yojana'}
                </h3>
                <div className="p-1.5 rounded-full text-white bg-primary">
                  <ChevronRight size={16} />
                </div>
              </div>
              <p className="text-sm text-muted">
                {t('schemes.demoReason') || 'Based on your Dairy business profile and capital needs, this scheme offers collateral-free loans to help you start.'}
              </p>
              <div className="flex gap-2 mt-1.5 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md" style={{ background: C.sand, color: C.charcoal }}>
                  {t(pmmyScheme.loanRangeKey) || 'Up to ₹10 Lakhs'}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-green-50 text-teal-700" style={{ background: '#EBF7F3', color: C.teal }}>
                  {t(pmmyScheme.intendedForKey) || 'Micro Enterprises'}
                </span>
              </div>
            </button>
          </div>
        )}

        {/* List of Schemes */}
        <div className="flex flex-col gap-3">
           <div className="flex items-center justify-between">
             <h2 className="font-bold text-lg text-charcoal">
               {t('schemes.popular') || 'Popular Schemes'}
             </h2>
           </div>
           
           <div className="flex flex-col gap-3">
             {mockSchemes.map(scheme => (
               <button 
                 key={scheme.id}
                 onClick={() => {
                   onSchemeSelect(scheme);
                   setScreen('schemeDetail');
                 }}
                 className="flex flex-col gap-2 rounded-3xl p-4 text-left transition-all active:scale-98 bg-white cursor-pointer hover:shadow-md"
                 style={{ border: `1px solid ${C.border}` }}
               >
                  <div className="flex justify-between items-start w-full">
                    <h3 className="font-bold text-charcoal text-base pr-2 leading-tight">
                      {t(scheme.nameKey) || scheme.id}
                    </h3>
                    <div className="p-1.5 rounded-full text-primary" style={{ background: C.sand }}>
                       <ChevronRight size={16} />
                    </div>
                  </div>
                  <p className="text-sm text-muted line-clamp-2">
                    {t(scheme.shortDescKey) || 'Description'}
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md" style={{ background: C.sand, color: C.charcoal }}>
                      {t(scheme.loanRangeKey) || 'Amount'}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-green-50 text-teal-700" style={{ background: '#EBF7F3', color: C.teal }}>
                      {t(scheme.intendedForKey) || 'Target'}
                    </span>
                  </div>
               </button>
             ))}
           </div>
        </div>
       </div>
    </ScreenWrap>
  );
}
