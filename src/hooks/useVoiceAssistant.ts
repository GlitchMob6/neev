import { useState, useCallback, useRef } from 'react';
import type { VoiceState } from '../types';
import type { Language } from '../types';
import { textToSpeech, playAudioBlob } from '../services/sarvamService';

/**
 * Voice assistant hook — real Sarvam AI TTS, simulated STT.
 *
 * TTS: Uses Sarvam AI bulbul:v2 model via REST API.
 * STT: Still simulated (not requested for integration).
 */
export function useVoiceAssistant(language: Language = 'hi') {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const abortRef = useRef(false);

  // ── STT (still simulated) ─────────────────────────────────────────────────

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

  // ── TTS (real Sarvam AI) ──────────────────────────────────────────────────

  const speak = useCallback(
    async (text: string) => {
      setSpokenText(text);
      setVoiceState('speaking');
      abortRef.current = false;

      try {
        const audioBlob = await textToSpeech(text, language);

        // Check if speak was cancelled during the API call
        if (abortRef.current) {
          setVoiceState('idle');
          setSpokenText('');
          return;
        }

        if (audioBlob) {
          await playAudioBlob(audioBlob);
        } else {
          // Fallback: if Sarvam TTS fails, use browser built-in speech synthesis
          await fallbackSpeak(text, language);
        }
      } catch (err) {
        console.warn('[VoiceAssistant] TTS playback failed, using fallback:', err);
        try {
          await fallbackSpeak(text, language);
        } catch {
          // Silent fail — at least reset state
        }
      } finally {
        if (!abortRef.current) {
          setVoiceState('idle');
          setSpokenText('');
        }
      }
    },
    [language]
  );

  // ── Reset ─────────────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    abortRef.current = true;
    setVoiceState('idle');
    setTranscript('');
    setSpokenText('');
    // Stop any ongoing browser speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
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

// ── Browser fallback TTS ──────────────────────────────────────────────────────

const BROWSER_LANG_MAP: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  ml: 'ml-IN',
  kn: 'kn-IN',
  pa: 'pa-IN',
  tulu: 'kn-IN',
};

function fallbackSpeak(text: string, language: Language): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = BROWSER_LANG_MAP[language] || 'hi-IN';
    utterance.rate = 0.9;
    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    window.speechSynthesis.speak(utterance);
  });
}
