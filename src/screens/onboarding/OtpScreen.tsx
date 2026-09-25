import { useState, useRef, useEffect } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, Card, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { ShieldCheck } from 'lucide-react';

export function OtpScreen({
  phone = '98765 43210',
  onNext,
  onBack,
}: {
  phone?: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [timer]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) {
      refs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <ScreenWrap onBack={onBack} progress={3} totalSteps={6}>
      <div className="flex flex-col gap-6 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('otp.title') || 'Verify your number'}
          </h1>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            {t('otp.subtitle') || "We've sent a 6-digit OTP to"}{' '}
            <strong className="text-charcoal">+91 {phone}</strong>
          </p>
        </div>

        <div className="flex gap-2 justify-between">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="text-center rounded-2xl outline-none transition-all font-display font-bold text-xl"
              style={{
                width: 46,
                height: 56,
                color: C.charcoal,
                background: digit ? '#EBF7F3' : 'white',
                border: `2px solid ${digit ? C.primary : C.border}`,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            label={t('otp.verify') || 'Verify & continue'}
            onClick={onNext}
          />
          <button
            onClick={() => setTimer(30)}
            disabled={timer > 0}
            className={`text-center text-sm font-semibold py-2 transition-colors cursor-pointer ${
              timer > 0 ? 'text-muted cursor-not-allowed' : 'text-primary hover:underline'
            }`}
          >
            {timer > 0 ? `${t('otp.resend') || 'Resend OTP'} (${timer}s)` : t('otp.resend') || 'Resend OTP'}
          </button>
        </div>

        <Card variant="sand" className="mt-2">
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#EBF7F3', color: C.primary }}
            >
              <ShieldCheck size={18} />
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {t('otp.securityNotice') ||
                'Your number is only used to keep your account safe. Neev never shares it.'}
            </p>
          </div>
        </Card>
      </div>
    </ScreenWrap>
  );
}
