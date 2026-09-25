import { useState, useEffect } from 'react';
import { AssistantAvatar } from './AssistantAvatar';
import { C } from '../ui';
import { useLocalization } from '../../i18n';
import type { Mode } from '../../types';
import { Volume2, X, Sparkles } from 'lucide-react';

export function FloatingAssistant({
  message,
  mode,
  onSpeak,
  autoShow = false,
}: {
  message?: string;
  mode?: Mode;
  onSpeak?: () => void;
  autoShow?: boolean;
}) {
  const { t, language } = useLocalization();
  const [open, setOpen] = useState(autoShow);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // If message changes, can open briefly or reset
  useEffect(() => {
    if (autoShow && message) {
      setOpen(true);
    }
  }, [message, autoShow]);

  if (mode === 'voice' || !message) return null;

  const handleSpeech = () => {
    if (onSpeak) {
      onSpeak();
      return;
    }
    // Web Speech API fallback for prototype accessibility
    if ('speechSynthesis' in window && message) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'mr') utterance.lang = 'mr-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="absolute bottom-20 right-3.5 z-40 flex flex-col items-end gap-1.5 pointer-events-auto select-none">
      {open && (
        <div
          className="rounded-3xl rounded-br-md p-3.5 shadow-2xl max-w-[260px] animate-fadeInUp relative border border-white/25"
          style={{
            background: 'linear-gradient(135deg, #176B52 0%, #0F4A38 100%)',
            color: '#FAF7F0',
            boxShadow: '0 8px 30px rgba(0,0,0,0.22)',
          }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-cream/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close message"
          >
            <X size={13} />
          </button>

          <div className="pr-5">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles size={11} className="text-gold" />
              <p className="text-[10px] font-bold text-gold uppercase tracking-wider">
                {t('assistant.title') || 'NEEV COPILOT'}
              </p>
            </div>
            <p className="text-xs leading-relaxed font-medium text-white/95">{message}</p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between">
            <button
              onClick={handleSpeech}
              className="text-[11px] font-bold text-gold flex items-center gap-1.5 cursor-pointer hover:underline"
            >
              <Volume2 size={14} className={isSpeaking ? 'animate-bounce' : ''} />
              <span>{isSpeaking ? (t('assistant.speaking') || 'Speaking...') : (t('assistant.listen') || 'Listen')}</span>
            </button>

            <button
              onClick={() => setOpen(false)}
              className="text-[10px] text-white/60 hover:text-white/90"
            >
              {t('common.dismiss') || 'Dismiss'}
            </button>
          </div>
        </div>
      )}

      {/* Floating Avatar Trigger Button */}
      <div className="relative">
        <button
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next && mode === 'assisted') {
              handleSpeech();
            }
          }}
          className="rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer hover:scale-105 shadow-lg relative"
          style={{
            width: 48,
            height: 48,
            background: 'white',
            border: `2.5px solid ${C.primary}`,
            boxShadow: '0 4px 16px rgba(23,107,82,0.3)',
          }}
          aria-label="Open assistant guidance"
          title="Neev Copilot"
        >
          <AssistantAvatar size={38} active={open || isSpeaking} />
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-gold rounded-full border-2 border-white flex items-center justify-center shadow-xs">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
