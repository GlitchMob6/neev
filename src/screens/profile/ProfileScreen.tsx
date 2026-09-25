import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, InputField, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Mode, Language, User } from '../../types';
import { Globe, Headphones, User as UserIcon } from 'lucide-react';

export function ProfileScreen({
  user,
  setUser,
  mode,
  setMode,
  onBack,
}: {
  user: User;
  setUser: (u: User) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  onBack: () => void;
}) {
  const { language, setLanguage, t } = useLocalization();

  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [location, setLocation] = useState(user.location || '');

  const handleSave = () => {
    setUser({
      ...user,
      firstName,
      lastName,
      location,
    });
    onBack();
  };

  const languages: { id: Language; label: string; sub: string }[] = [
    { id: 'en', label: 'English', sub: 'English' },
    { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { id: 'mr', label: 'मराठी', sub: 'Marathi' },
  ];

  const modes: { id: Mode; label: string; desc: string }[] = [
    { id: 'voice', label: t('mode.voice.title') || 'Talk to Neev', desc: 'Two-way voice conversation' },
    { id: 'assisted', label: t('mode.assisted.title') || 'Let Neev guide me', desc: 'Voice tips & assisted guidance' },
    { id: 'normal', label: t('mode.normal.title') || "I'll use the app", desc: 'Standard manual interaction' },
  ];

  return (
    <ScreenWrap
      mode={mode}
      showNav={false}
      onBack={onBack}
      assistantMessage="Here you can update your profile, language, and interaction mode."
    >
      <div className="flex flex-col gap-5 pt-1 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage your personal information and preferences.
          </p>
        </div>

        <div>
          <h3 className="font-display font-bold text-sm text-charcoal mb-2.5 flex items-center gap-1.5">
            <UserIcon size={16} className="text-primary" />
            <span>Personal Details</span>
          </h3>
          <Card variant="white" className="p-4 flex flex-col gap-3">
            <InputField
              label="First Name"
              value={firstName}
              onChange={setFirstName}
              placeholder="e.g. Ramesh"
            />
            <InputField
              label="Last Name"
              value={lastName}
              onChange={setLastName}
              placeholder="e.g. Patil"
            />
            <InputField
              label="Location"
              value={location}
              onChange={setLocation}
              placeholder="e.g. Nashik"
            />
          </Card>
        </div>

        <div>
          <h3 className="font-display font-bold text-sm text-charcoal mb-2.5 flex items-center gap-1.5">
            <Globe size={16} className="text-teal" />
            <span>{t('settings.language') || 'Language / भाषा'}</span>
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => {
              const isSelected = language === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setLanguage(lang.id)}
                  className="rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all cursor-pointer border"
                  style={{
                    background: isSelected ? '#EBF7F3' : 'white',
                    borderColor: isSelected ? C.primary : C.border,
                  }}
                >
                  <span
                    className="font-bold text-base"
                    style={{
                      fontFamily: lang.id === 'en' ? 'var(--font-display)' : 'var(--font-display-deva)',
                      color: isSelected ? C.primary : C.charcoal,
                    }}
                  >
                    {lang.label}
                  </span>
                  <span className="text-[10px] text-muted font-medium mt-0.5">{lang.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-sm text-charcoal mb-2.5 flex items-center gap-1.5">
            <Headphones size={16} className="text-gold" />
            <span>{t('settings.mode') || 'Interaction Mode'}</span>
          </h3>
          <div className="flex flex-col gap-2">
            {modes.map((m) => {
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className="rounded-2xl p-3.5 flex items-center justify-between transition-all cursor-pointer border text-left"
                  style={{
                    background: isSelected ? '#EBF7F3' : 'white',
                    borderColor: isSelected ? C.primary : C.border,
                  }}
                >
                  <div>
                    <p className="font-display font-bold text-sm" style={{ color: isSelected ? C.primary : C.charcoal }}>
                      {m.label}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{m.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: C.primary }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4">
          <Button label="Save Changes" onClick={handleSave} />
        </div>
      </div>
    </ScreenWrap>
  );
}
