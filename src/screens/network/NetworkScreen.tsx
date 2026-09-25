import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Screen, Mode } from '../../types';
import { Users, Store, Building2, CheckCircle2 } from 'lucide-react';

export function NetworkScreen({
  mode = 'assisted',
  setScreen,
  onBack,
}: {
  mode?: Mode;
  setScreen: (s: Screen) => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      showNav={true}
      navScreen="dashboard"
      setScreen={setScreen}
    >
      <div className="flex flex-col items-center text-center gap-5 pt-4 pb-6">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-lg"
          style={{ background: C.teal }}
        >
          <Users size={40} />
        </div>

        <div>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
            style={{ background: C.gold }}
          >
            {t('common.comingSoon') || 'Coming Soon'}
          </span>
          <h1 className="font-display font-bold text-2xl text-charcoal mt-3">
            Entrepreneur Network
          </h1>
          <p className="text-sm text-muted mt-1 max-w-xs leading-relaxed">
            Connect directly with bulk milk buyers, local farmers, chilling plant operators, and peer entrepreneurs across Maharashtra.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 w-full">
          <Card variant="white" className="p-3.5 flex flex-col items-center text-center gap-1.5">
            <Store size={24} className="text-primary" />
            <h5 className="font-bold text-xs text-charcoal">Hotel & Tea Buyers</h5>
            <p className="text-[10px] text-muted">Direct bulk contracts</p>
          </Card>

          <Card variant="white" className="p-3.5 flex flex-col items-center text-center gap-1.5">
            <Building2 size={24} className="text-teal" />
            <h5 className="font-bold text-xs text-charcoal">Dairy Cooperatives</h5>
            <p className="text-[10px] text-muted">Surplus collection tie-ups</p>
          </Card>
        </div>

        <Card variant="white" className="text-left w-full p-4 flex flex-col gap-2.5">
          <h4 className="font-display font-bold text-sm text-charcoal">Community Features:</h4>
          {[
            'Verified local buyer requests with guaranteed price rates',
            'Equipment & chilling unit sharing collective',
            'Peer advice forum in Marathi & Hindi',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal">
              <CheckCircle2 size={16} className="text-teal flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </Card>

        <div className="w-full pt-2">
          <Button
            label={t('common.backToDashboard') || 'Back to Dashboard'}
            onClick={() => setScreen('dashboard')}
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
