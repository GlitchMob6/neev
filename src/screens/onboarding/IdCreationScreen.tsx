import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, InputField, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { User } from '../../types';

export function IdCreationScreen({
  user,
  onNext,
  onBack,
}: {
  user: User;
  onNext: (updatedUser: Partial<User>) => void;
  onBack: () => void;
}) {
  const { t } = useLocalization();
  // State starts empty so demo data isn't pre-filled.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | 'prefer-not-to-say' | ''>('');

  const genderOptions: { id: 'male' | 'female' | 'other' | 'prefer-not-to-say'; label: string; icon: string }[] = [
    { id: 'female', label: t('id.female') || 'Female', icon: '👩' },
    { id: 'male', label: t('id.male') || 'Male', icon: '👨' },
    { id: 'other', label: t('id.other') || 'Other', icon: '🧑' },
    { id: 'prefer-not-to-say', label: t('id.preferNot') || 'Prefer not to say', icon: '🔒' },
  ];

  const handleContinue = () => {
    onNext({
      firstName: firstName.trim() || user.firstName,
      lastName: lastName.trim() || user.lastName,
      age: parseInt(age, 10) || user.age || 30,
      gender: gender || user.gender || 'male',
    });
  };

  return (
    <ScreenWrap onBack={onBack} progress={4} totalSteps={6}>
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('id.title') || 'Tell us about yourself'}
          </h1>
          <p className="mt-1.5 text-sm text-muted leading-relaxed">
            {t('id.subtitle') || 'This helps Neev personalize your guidance and recommendations.'}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label={t('id.firstName') || 'First Name'}
              value={firstName}
              onChange={setFirstName}
              placeholder={user.firstName || "e.g. Ramesh"}
            />
            <InputField
              label={t('id.lastName') || 'Last Name'}
              value={lastName}
              onChange={setLastName}
              placeholder={user.lastName || "e.g. Patil"}
            />
          </div>

          <InputField
            label={t('id.age') || 'Age'}
            value={age}
            onChange={(val) => setAge(val.replace(/\D/g, '').slice(0, 3))}
            placeholder={user.age ? String(user.age) : "e.g. 32"}
            type="number"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-charcoal">
              {t('id.gender') || 'Gender'}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {genderOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setGender(opt.id)}
                  className="rounded-2xl p-3 flex items-center gap-2.5 transition-all active:scale-98 text-left cursor-pointer border"
                  style={{
                    background: gender === opt.id ? '#EBF7F3' : 'white',
                    borderColor: gender === opt.id ? C.primary : C.border,
                  }}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span
                    className="font-medium text-sm truncate"
                    style={{
                      color: gender === opt.id ? C.primary : C.charcoal,
                      fontWeight: gender === opt.id ? 700 : 500,
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            label={t('common.continue') || 'Continue'}
            onClick={handleContinue}
            disabled={false}
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
