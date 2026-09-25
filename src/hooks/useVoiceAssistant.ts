import { useState, useCallback, useRef } from 'react';
import type { VoiceState } from '../types';

/**
 * Simulated voice assistant hook for prototype.
 * Structured to be replaced with real speech APIs later.
 */
export function useVoiceAssistant() {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const startListening = useCallback(() => {
    setVoiceState('listening');
    setTranscript('');

    // Simulate speech-to-text after 3 seconds
    timerRef.current = setTimeout(() => {
      setVoiceState('processing');
      setTimeout(() => {
        setTranscript(
          'I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings and want to collect milk from local farmers.'
        );
        setVoiceState('idle');
      }, 1500);
    }, 3000);
  }, []);

  const stopListening = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (voiceState === 'listening') {
      setVoiceState('processing');
      setTimeout(() => {
        setTranscript(
          'I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings.'
        );
        setVoiceState('idle');
      }, 1500);
    }
  }, [voiceState]);

  const speak = useCallback((text: string) => {
    setSpokenText(text);
    setVoiceState('speaking');
    // Simulate speech duration
    timerRef.current = setTimeout(() => {
      setVoiceState('idle');
      setSpokenText('');
    }, 3000);
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVoiceState('idle');
    setTranscript('');
    setSpokenText('');
  }, []);

  return {
    state: voiceState,
    voiceState,
    transcript,
    spokenText,
    startListening,
    stopListening,
    speak,
    reset,
    isListening: voiceState === 'listening',
    isProcessing: voiceState === 'processing',
    isSpeaking: voiceState === 'speaking',
  };
}
