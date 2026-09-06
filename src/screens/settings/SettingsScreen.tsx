import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Screen, Mode, Language, User } from '../../types';
import { Globe, Headphones, RotateCcw, Shield } from 'lucide-react';

export function SettingsScreen({
  user,
  mode,
  setMode,
  setScreen,
  onReset,
}: {
  user: User;
  mode: Mode;
  setMode: (m: Mode) => void;
  setScreen: (s: Screen) => void;
  onReset: () => void;
}) {
  const { language, setLanguage, t } = useLocalization();

  const languages: { id: Language; label: string; sub: string }[] = [
    { id: 'en', label: 'English', sub: 'English' },
    { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { id: 'mr', label: 'मराठी', sub: 'Marathi' },
  ];

  const modes: { id: Mode; label: string; desc: string }[] = [
    {
      id: 'voice',
      label: t('mode.voice.title') || 'Talk to Neev',
      desc: 'Two-way voice conversation',
    },
    {
      id: 'assisted',
      label: t('mode.assisted.title') || 'Let Neev guide me',
      desc: 'Voice tips & assisted guidance',
    },
    {
      id: 'normal',
      label: t('mode.normal.title') || "I'll use the app",
      desc: 'Standard manual interaction',
    },
  ];

  return (
    <ScreenWrap
      mode={mode}
      showNav={true}
      navScreen="settings"
      setScreen={setScreen}
      assistantMessage={t('assistant.settings') || 'Adjust your language, voice mode, and profile preferences here.'}
    >
      <div className="flex flex-col gap-5 pt-1 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('settings.title') || 'Settings'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('settings.subtitle') || 'Preferences and app configuration'}
          </p>
        </div>

        {/* Profile Card */}
        <Card variant="white" className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
              style={{ background: C.primary }}
            >
              {user.firstName ? user.firstName[0] : 'U'}
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-charcoal">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-xs text-muted">
                +91 {user.phone || '98765 43210'} · {user.location || 'Nashik, Maharashtra'}
              </p>
            </div>
          </div>
        </Card>

        {/* Language Selection */}
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
                      fontFamily:
                        lang.id === 'en' ? 'var(--font-display)' : 'var(--font-display-deva)',
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

        {/* Interaction Mode Selection */}
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
                    <p
                      className="font-display font-bold text-sm"
                      style={{ color: isSelected ? C.primary : C.charcoal }}
                    >
                      {m.label}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{m.desc}</p>
                  </div>
                  {isSelected && (
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: C.primary }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Restart Onboarding CTA */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onReset}
            className="w-full py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-terracotta border transition-all hover:bg-white cursor-pointer active:scale-98 text-sm font-bold"
            style={{ borderColor: 'rgba(201,103,75,0.4)', background: '#FEF3ED' }}
          >
            <RotateCcw size={16} />
            <span>{t('settings.restartOnboarding') || 'Restart Business Onboarding'}</span>
          </button>
        </div>

        {/* App Info Footer */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted flex items-center justify-center gap-1">
            <Shield size={12} />
            <span>NEEV v1.0.0 · Foundation for Indian Entrepreneurs</span>
          </p>
        </div>
      </div>
    </ScreenWrap>
  );
}
