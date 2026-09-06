import { useState } from 'react';
import { AssistantAvatar } from './AssistantAvatar';
import { C } from '../ui';
import { useLocalization } from '../../i18n';
import type { Mode } from '../../types';
import { Volume2, X } from 'lucide-react';

export function FloatingAssistant({
  message,
  mode,
  onSpeak,
}: {
  message?: string;
  mode?: Mode;
  onSpeak?: () => void;
}) {
  const { t } = useLocalization();
  const [open, setOpen] = useState(false);

  if (mode === 'voice') return null;

  return (
    <div className="absolute bottom-24 right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {open && message && (
        <div
          className="rounded-2xl rounded-br-none p-3.5 shadow-xl max-w-[250px] animate-fadeInUp relative"
          style={{ background: C.primary, color: '#FAF7F0', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-cream/70 hover:text-white cursor-pointer"
            aria-label="Close message"
          >
            <X size={14} />
          </button>
          <div className="pr-3">
            <p className="text-[11px] font-bold text-gold uppercase tracking-wider mb-0.5">
              {t('assistant.title') || 'NEEV Assistant'}
            </p>
            <p className="text-xs leading-relaxed font-medium">{message}</p>
          </div>
          {onSpeak && (
            <button
              onClick={onSpeak}
              className="mt-2.5 text-xs font-bold text-gold flex items-center gap-1.5 cursor-pointer hover:underline"
            >
              <Volume2 size={14} />
              <span>{t('assistant.listen') || 'Listen'}</span>
            </button>
          )}
        </div>
      )}
      <div className="relative">
        <button
          onClick={() => {
            setOpen(!open);
            if (!open && onSpeak) onSpeak();
          }}
          className="rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-95 cursor-pointer hover:scale-105"
          style={{
            width: 52,
            height: 52,
            background: 'white',
            border: `3px solid ${C.primary}`,
            boxShadow: '0 4px 16px rgba(23,107,82,0.3)',
          }}
          aria-label="Open assistant"
        >
          <AssistantAvatar size={42} active={open} />
        </button>
      </div>
    </div>
  );
}
