import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Screen, Mode } from '../../types';
import { Bot, Sparkles, CheckCircle2 } from 'lucide-react';

export function AgenticAIScreen({
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
          className="w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-lg relative"
          style={{ background: C.primary }}
        >
          <Bot size={40} />
          <div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white"
            style={{ background: C.gold }}
          >
            <Sparkles size={14} />
          </div>
        </div>

        <div>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
            style={{ background: C.gold }}
          >
            {t('common.comingSoon') || 'Coming Soon'}
          </span>
          <h1 className="font-display font-bold text-2xl text-charcoal mt-3">
            Autonomous Agentic AI
          </h1>
          <p className="text-sm text-muted mt-1 max-w-xs leading-relaxed">
            Your personal 24/7 AI business co-pilot that helps automate customer enquiries, daily stock logging, and scheme subsidy tracking.
          </p>
        </div>

        <Card variant="white" className="text-left w-full p-4 flex flex-col gap-3">
          <h4 className="font-display font-bold text-sm text-charcoal">Upcoming Capabilities:</h4>
          {[
            'Voice-based WhatsApp orders & billing bot',
            'Automated dairy supplier payments log',
            'Real-time milk fat testing ledger integration',
            'Direct subsidy application filler with banks',
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal">
              <CheckCircle2 size={16} className="text-teal flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
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
