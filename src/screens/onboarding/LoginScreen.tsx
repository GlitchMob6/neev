import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { NeevLogo } from '../../components/layout/NeevLogo';
import { Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';

export function LoginScreen({ onNext }: { onNext: (phone: string) => void }) {
  const { t } = useLocalization();
  const [phone, setPhone] = useState('');

  const isValid = phone.trim().length === 10;

  return (
    <ScreenWrap progress={1} totalSteps={6}>
      <div className="flex flex-col gap-6 pt-4 pb-6">
        <div className="flex flex-col items-center gap-2 pt-2">
          <NeevLogo size={56} />
          <span className="font-display font-extrabold text-2xl text-charcoal">NEEV</span>
        </div>

        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('login.title') || 'Welcome to Neev'}
          </h1>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            {t('login.subtitle') || "Let's start building your business idea."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-charcoal">
            {t('login.phoneLabel') || 'Your mobile number'}
          </label>
          <div
            className="flex items-center gap-3 rounded-2xl px-4 transition-all"
            style={{
              background: 'white',
              border: `2px solid ${C.border}`,
              height: 56,
            }}
          >
            <div
              className="flex items-center gap-2 pr-3"
              style={{ borderRight: `1px solid ${C.border}` }}
            >
              <span className="text-lg">🇮🇳</span>
              <span className="text-charcoal font-semibold text-sm">+91</span>
            </div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder={t('login.phonePlaceholder') || 'Enter mobile number'}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="flex-1 outline-none text-base text-charcoal bg-transparent font-display font-medium"
            />
          </div>
          <p className="text-xs text-muted">
            {t('login.otpNotice') || "We'll send you a 6-digit OTP to verify."}
          </p>
        </div>

        <Button
          label={t('login.continue') || 'Continue'}
          onClick={() => onNext(phone || '9876543210')}
          icon="→"
          disabled={phone.length > 0 && !isValid}
        />

        <p className="text-center text-xs text-muted leading-relaxed mt-2">
          {t('login.terms') || "By continuing, you agree to Neev's Terms of Use and Privacy Policy."}
        </p>
      </div>
    </ScreenWrap>
  );
}
