import { Mic } from 'lucide-react';
import type { VoiceState } from '../../types';

export function VoiceOrb({
  state = 'idle',
  onClick,
  size = 120,
}: {
  state?: VoiceState;
  onClick?: () => void;
  size?: number;
}) {
  const isListening = state === 'listening';
  const isSpeaking = state === 'speaking';
  const isProcessing = state === 'processing';

  return (
    <div className="relative flex items-center justify-center my-4 cursor-pointer" onClick={onClick}>
      {/* Outer pulse rings when active */}
      {(isListening || isSpeaking || isProcessing) && (
        <>
          <div
            className="absolute rounded-full animate-ping opacity-30"
            style={{
              width: size + 36,
              height: size + 36,
              background: '#2C9C78',
            }}
          />
          <div
            className="absolute rounded-full opacity-20"
            style={{
              width: size + 20,
              height: size + 20,
              background: '#176B52',
            }}
          />
        </>
      )}

      {/* Main Orb */}
      <div
        className={`rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isListening ? 'animate-listening scale-105' : 'hover:scale-105 active:scale-95'
        }`}
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle at 40% 35%, #2C9C78, #176B52 70%)',
          boxShadow: '0 0 0 10px rgba(23,107,82,0.12), 0 0 0 22px rgba(23,107,82,0.06)',
        }}
      >
        <Mic size={size * 0.38} color="#FAF7F0" />
      </div>
    </div>
  );
}
