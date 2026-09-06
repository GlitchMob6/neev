import { AssistantAvatar } from './AssistantAvatar';
import { Waveform } from './Waveform';
import { C } from '../ui';
import { Volume2 } from 'lucide-react';

export function AssistantBanner({
  message,
  onSpeak,
  isSpeaking = false,
}: {
  message: string;
  onSpeak?: () => void;
  isSpeaking?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-3.5 mb-4 flex items-center gap-3 animate-fadeIn border"
      style={{
        background: '#EBF7F3',
        borderColor: '#B8DFD4',
      }}
    >
      <AssistantAvatar size={36} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide">Neev says</p>
        <p className="text-sm font-medium text-charcoal leading-snug">{message}</p>
      </div>
      {onSpeak && (
        <button
          onClick={onSpeak}
          className="p-2 rounded-xl text-primary hover:bg-white transition-colors cursor-pointer flex-shrink-0"
          title="Listen to Neev"
          aria-label="Listen to Neev"
        >
          {isSpeaking ? <Waveform active={true} color={C.primary} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  );
}
