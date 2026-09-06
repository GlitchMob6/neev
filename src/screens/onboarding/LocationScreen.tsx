import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, Card, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { MapPin, CheckCircle2 } from 'lucide-react';

export function LocationScreen({
  location = 'Nashik, Maharashtra',
  onNext,
  onBack,
}: {
  location?: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();

  return (
    <ScreenWrap onBack={onBack} progress={4} totalSteps={6}>
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('location.title') || "Let's find your location"}
          </h1>
          <p className="mt-1.5 text-sm text-muted leading-relaxed">
            {t('location.subtitle') || 'This helps Neev understand your local market.'}
          </p>
        </div>

        {/* Map illustration */}
        <div
          className="rounded-3xl overflow-hidden flex items-center justify-center relative shadow-xs"
          style={{ height: 180, background: '#E8F5F0', border: `1px solid ${C.border}` }}
        >
          <svg width="320" height="180" viewBox="0 0 320 180" fill="none">
            {/* Roads */}
            <line x1="160" y1="0" x2="160" y2="180" stroke={C.border} strokeWidth="3" />
            <line x1="0" y1="90" x2="320" y2="90" stroke={C.border} strokeWidth="3" />
            <line
              x1="80"
              y1="0"
              x2="80"
              y2="180"
              stroke={C.border}
              strokeWidth="1.5"
              strokeDasharray="6,4"
            />
            <line
              x1="240"
              y1="0"
              x2="240"
              y2="180"
              stroke={C.border}
              strokeWidth="1.5"
              strokeDasharray="6,4"
            />
            {/* Blocks */}
            {[
              [20, 20, 50, 60],
              [100, 20, 50, 60],
              [200, 20, 110, 60],
              [20, 110, 50, 55],
              [100, 110, 50, 55],
              [200, 110, 110, 55],
            ].map((b, i) => (
              <rect
                key={i}
                x={b[0]}
                y={b[1]}
                width={b[2]}
                height={b[3]}
                rx="4"
                fill="white"
                opacity="0.75"
              />
            ))}
            {/* Pin */}
            <circle cx="160" cy="85" r="24" fill={C.primary} opacity="0.15" />
            <circle cx="160" cy="85" r="14" fill={C.primary} />
            <circle cx="160" cy="85" r="5" fill="white" />
            <path d="M160 99 L156 110 L160 106 L164 110 Z" fill={C.primary} />
          </svg>
        </div>

        {/* Detected Location Card */}
        <Card
          variant="custom"
          className="border"
          style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white"
              style={{ background: C.primary }}
            >
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted uppercase tracking-wider">
                {t('location.yourLocation') || 'Your location'}
              </p>
              <p className="text-lg font-bold font-display text-charcoal">
                {location}
              </p>
              <p className="text-xs text-teal font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={13} />
                <span>{t('location.detected') || 'Location detected automatically'}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Why we need this */}
        <Card variant="sand">
          <p className="text-xs text-muted leading-relaxed">
            <strong className="text-charcoal">{t('location.whyTitle') || 'Why we need this:'}</strong>{' '}
            {t('location.whyDesc') ||
              'Neev uses your location to understand your local market, nearby competition, and applicable government schemes.'}
          </p>
        </Card>

        <div className="flex flex-col gap-2.5 pt-1">
          <Button
            label={t('location.useLocation') || 'Use this location'}
            onClick={onNext}
          />
          <Button
            label={t('location.changeLocation') || 'Change location'}
            variant="secondary"
            onClick={onNext}
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
