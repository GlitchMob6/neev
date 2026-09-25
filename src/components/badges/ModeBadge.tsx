import type { Mode } from '../../types';
import { useLocalization } from '../../i18n';
import { Mic, HelpCircle, Smartphone } from 'lucide-react';
import { C } from '../ui';

export function ModeBadge({ mode, onClick }: { mode: Mode; onClick?: () => void }) {
  const { t } = useLocalization();

  const config = {
    voice: {
      label: t('mode.voice.title'),
      icon: <Mic size={12} />,
      bg: 'rgba(201,103,75,0.15)',
      color: C.terracotta,
      border: 'rgba(201,103,75,0.3)',
    },
    assisted: {
      label: t('mode.assisted.title'),
      icon: <HelpCircle size={12} />,
      bg: 'rgba(44,156,120,0.15)',
      color: C.teal,
      border: 'rgba(44,156,120,0.3)',
    },
    normal: {
      label: t('mode.normal.title'),
      icon: <Smartphone size={12} />,
      bg: 'rgba(107,123,116,0.15)',
      color: C.muted,
      border: 'rgba(107,123,116,0.3)',
    },
  }[mode];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
        onClick ? 'cursor-pointer hover:opacity-80 active:scale-95' : 'cursor-default'
      }`}
      style={{
        background: config.bg,
        color: config.color,
        borderColor: config.border,
      }}
    >
      {config.icon}
      <span>{config.label}</span>
    </button>
  );
}
