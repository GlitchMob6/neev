/**
 * Sarvam AI TTS Service
 *
 * Uses the bulbul:v2 model (cost-efficient legacy model) for text-to-speech.
 * API docs: https://docs.sarvam.ai/api-reference-docs/endpoints/text-to-speech
 */

import type { Language } from '../types';

// ─── Sarvam BCP-47 language code mapping ──────────────────────────────────────

const SARVAM_LANG_MAP: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  ml: 'ml-IN',
  kn: 'kn-IN',
  pa: 'pa-IN',
  tulu: 'kn-IN', // Tulu unsupported — fallback to Kannada
};

export function getSarvamLanguageCode(lang: Language): string {
  return SARVAM_LANG_MAP[lang] || 'hi-IN';
}

// ─── TTS ──────────────────────────────────────────────────────────────────────

interface SarvamTTSRequest {
  inputs: string[];
  target_language_code: string;
  speaker: string;
  model: string;
  pitch?: number;
  pace?: number;
  loudness?: number;
  enable_preprocessing?: boolean;
}

interface SarvamTTSResponse {
  audios: string[]; // base64 encoded WAV audio
}

const SARVAM_API_BASE = 'https://api.sarvam.ai';

function getApiKey(): string {
  const key = import.meta.env.VITE_SARVAM_API_KEY;
  if (!key || key === 'your_api_key_here') {
    console.warn('[Sarvam] API key not configured. Set VITE_SARVAM_API_KEY in .env');
    return '';
  }
  return key;
}

/**
 * Convert text to speech using Sarvam AI's bulbul:v2 model.
 * Returns a playable audio Blob (WAV), or null on failure.
 *
 * Uses bulbul:v2 (legacy) for lower credit consumption.
 * Speaker "meera" is a balanced female voice available across all languages.
 */
export async function textToSpeech(
  text: string,
  language: Language,
  speaker = 'meera',
): Promise<Blob | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  // Sarvam TTS has a 500-char limit per input. Split if needed.
  const chunks = splitText(text, 500);

  const body: SarvamTTSRequest = {
    inputs: chunks,
    target_language_code: getSarvamLanguageCode(language),
    speaker,
    model: 'bulbul:v2',
    enable_preprocessing: true,
  };

  try {
    const response = await fetch(`${SARVAM_API_BASE}/text-to-speech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Sarvam TTS] HTTP ${response.status}: ${errorText}`);
      return null;
    }

    const data: SarvamTTSResponse = await response.json();

    if (!data.audios || data.audios.length === 0) {
      console.error('[Sarvam TTS] No audio returned');
      return null;
    }

    // Combine all base64 audio chunks into a single blob
    const audioBlobs = data.audios.map(base64ToBlob);
    return new Blob(audioBlobs, { type: 'audio/wav' });
  } catch (err) {
    console.error('[Sarvam TTS] Request failed:', err);
    return null;
  }
}

/**
 * Play a TTS audio blob through the browser's Audio API.
 * Returns a promise that resolves when playback completes.
 */
export function playAudioBlob(blob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    audio.onended = () => {
      URL.revokeObjectURL(url);
      resolve();
    };

    audio.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };

    audio.play().catch((e) => {
      URL.revokeObjectURL(url);
      reject(e);
    });
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function base64ToBlob(base64: string): Blob {
  const byteChars = atob(base64);
  const byteNumbers = new Uint8Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  return new Blob([byteNumbers], { type: 'audio/wav' });
}

function splitText(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }

    // Try to split at sentence boundary
    let splitIdx = remaining.lastIndexOf('. ', maxLen);
    if (splitIdx === -1 || splitIdx < maxLen * 0.3) {
      // Fallback: split at last space
      splitIdx = remaining.lastIndexOf(' ', maxLen);
    }
    if (splitIdx === -1) {
      // Hard split
      splitIdx = maxLen;
    }

    chunks.push(remaining.slice(0, splitIdx + 1).trim());
    remaining = remaining.slice(splitIdx + 1).trim();
  }

  return chunks;
}
