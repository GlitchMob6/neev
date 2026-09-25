import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import type { Mode } from '../../types';
import { Mic, Headphones, Smartphone, Check } from 'lucide-react';

export function ModeScreen({
  currentMode = 'assisted',
  onNext,
  onBack,
  setMode,
}: {
  currentMode?: Mode;
  onNext: () => void;
  onBack: () => void;
  setMode: (m: Mode) => void;
}) {
  const { t } = useLocalization();
  const [selected, setSelected] = useState<Mode>(currentMode);

  const modes: {
    id: Mode;
    title: string;
    desc: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    border: string;
    accent: string;
  }[] = [
    {
      id: 'voice',
      title: t('mode.voice.title') || 'Talk to Neev',
      desc: t('mode.voice.desc') || 'Just speak. Neev will listen, ask questions, and guide you.',
      label: t('mode.voice.badge') || 'Two-way voice',
      color: '#FEF3ED',
      border: '#F5C4B0',
      accent: C.terracotta,
      icon: <Mic size={28} />,
    },
    {
      id: 'assisted',
      title: t('mode.assisted.title') || 'Let Neev guide me',
      desc: t('mode.assisted.desc') || 'You use the app. Neev explains what to do next with voice tips.',
      label: t('mode.assisted.badge') || 'Voice guidance',
      color: '#EBF7F3',
      border: '#B8DFD4',
      accent: C.teal,
      icon: <Headphones size={28} />,
    },
    {
      id: 'normal',
      title: t('mode.normal.title') || "I'll use the app",
      desc: t('mode.normal.desc') || 'Use Neev normally with standard taps and typing.',
      label: t('mode.normal.badge') || 'Standard mode',
      color: C.sand,
      border: C.border,
      accent: C.charcoal,
      icon: <Smartphone size={28} />,
    },
  ];

  const handleSelect = (mode: Mode) => {
    setSelected(mode);
    setMode(mode);
  };

  return (
    <ScreenWrap onBack={onBack} progress={6} totalSteps={6}>
      <div className="flex flex-col gap-4 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('mode.title') || 'How would you like to use Neev?'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('mode.subtitle') || 'Choose what feels easiest for you.'}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {modes.map((m) => {
            const isSelected = selected === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelect(m.id)}
                className="rounded-3xl p-4 flex items-start gap-3.5 transition-all active:scale-98 text-left cursor-pointer border relative"
                style={{
                  background: isSelected ? m.color : '#ffffff',
                  borderColor: isSelected ? m.accent : C.border,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isSelected ? m.accent : '#F0E8D8',
                    color: isSelected ? '#ffffff' : m.accent,
                  }}
                >
                  {m.icon}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-display font-bold text-base"
                      style={{ color: isSelected ? m.accent : C.charcoal }}
                    >
                      {m.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mt-0.5">{m.desc}</p>
                </div>

                {isSelected && (
                  <div
                    className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-white"
                    style={{ background: m.accent }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <Button
            label={t('common.continue') || 'Continue'}
            onClick={onNext}
            icon="→"
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
