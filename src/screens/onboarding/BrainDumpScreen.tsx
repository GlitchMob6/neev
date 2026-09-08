import { useState, useEffect } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { getMockBusiness } from '../../data/mockBusiness';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Mic } from 'lucide-react';
import type { Mode } from '../../types';

export function BrainDumpScreen({
  initialText = '',
  onNext,
  onBack,
  mode = 'assisted',
}: {
  initialText?: string;
  onNext: (text: string) => void;
  onBack: () => void;
  mode?: Mode;
}) {
  const { language, t } = useLocalization();
  const localizedMock = getMockBusiness(language);

  const [text, setText] = useState(initialText || localizedMock.brainDumpText);

  useEffect(() => {
    if (!initialText) {
      setText(localizedMock.brainDumpText);
    }
  }, [language]);

  const { state: voiceState, startListening, stopListening } = useVoiceAssistant(language);
  const isListening = voiceState === 'listening';

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      if (!text) {
        setTimeout(() => {
          setText(localizedMock.brainDumpText);
        }, 2000);
      }
    }
  };

  if (mode === 'voice') {
    return (
      <div
        className="h-full w-full flex flex-col justify-between p-6 relative overflow-hidden select-none"
        style={{ background: C.primary }}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          {/* Waveform */}
          <div className="flex items-center justify-center gap-1.5 h-20">
            {Array.from({ length: 18 }).map((_, i) => {
              const heights = [20, 35, 55, 40, 65, 30, 50, 70, 45, 60, 35, 50, 70, 40, 55, 30, 45, 25];
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isListening ? 'animate-wave' : ''
                  }`}
                  style={{
                    height: isListening ? heights[i] : 12,
                    background: 'rgba(250,247,240,0.85)',
                    animationDelay: `${i * 0.07}s`,
                  }}
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold font-display text-cream">
              {isListening
                ? t('braindump.listening') || 'Neev is listening...'
                : t('braindump.speakPrompt') || 'Tell me about your idea'}
            </h2>
            <p className="text-sm text-cream/80">
              {isListening
                ? t('braindump.listeningHint') || 'Speak naturally. Take your time.'
                : t('braindump.tapMic') || 'Tap the microphone to start speaking.'}
            </p>
          </div>

          {/* Large Voice Orb */}
          <button
            type="button"
            onClick={toggleListening}
            className={`w-28 h-28 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${
              isListening ? 'animate-listening scale-105' : 'active:scale-95'
            }`}
            style={{
              background: isListening ? C.terracotta : '#FAF7F0',
              boxShadow: isListening
                ? '0 0 0 12px rgba(201,103,75,0.25)'
                : '0 8px 30px rgba(0,0,0,0.2)',
            }}
          >
            <Mic size={48} color={isListening ? '#ffffff' : C.primary} />
          </button>

          {/* Transcribed bubble */}
          {text && (
            <div
              className="rounded-3xl p-4 text-center max-w-xs animate-fadeInUp"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <p className="text-cream text-sm leading-relaxed italic">"{text}"</p>
            </div>
          )}

          <div className="flex gap-3 w-full max-w-xs pt-2">
            <button
              type="button"
              onClick={() => setText('')}
              className="flex-1 py-3.5 rounded-2xl text-cream font-semibold text-sm cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              {t('braindump.tryAgain') || 'Try again'}
            </button>
            <button
              type="button"
              onClick={() => onNext(text)}
              className="flex-1 py-3.5 rounded-2xl font-bold text-sm cursor-pointer shadow-md"
              style={{ background: '#FAF7F0', color: C.primary }}
            >
              {t('braindump.continue') || 'Continue'}
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-cream/60">
            {language === 'mr'
              ? 'आवाज पद्धत · बोलण्यासाठी माईकवर टॅप करा'
              : language === 'hi'
              ? 'आवाज़ मोड · बोलने के लिए माइक पर टैप करें'
              : 'Voice mode · Tap mic to speak'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      assistantMessage={t('assistant.braindump')}
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('braindump.title') || 'Tell us about your idea'}
          </h1>
          <p className="mt-1 text-sm text-muted leading-relaxed">
            {t('braindump.subtitle') ||
              "Don't worry about getting it perfect. Just describe what business you want to start."}
          </p>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              t('braindump.placeholder') ||
              'Tell me about your business idea, your location, and your available capital...'
            }
            className="w-full rounded-3xl p-4.5 outline-none resize-none transition-all"
            style={{
              height: 180,
              fontSize: 15,
              color: C.charcoal,
              background: 'white',
              border: `2px solid ${text ? C.primary : C.border}`,
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Voice Trigger Option */}
        <div className="flex flex-col items-center gap-2 py-2">
          <button
            type="button"
            onClick={toggleListening}
            className={`w-18 h-18 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isListening ? 'animate-listening scale-105' : 'active:scale-95'
            }`}
            style={{
              background: isListening ? C.terracotta : C.primary,
              boxShadow: '0 4px 20px rgba(23,107,82,0.25)',
            }}
          >
            <Mic size={30} color="#ffffff" />
          </button>
          <p className="text-xs font-semibold text-muted">
            {isListening
              ? t('braindump.listening') || 'Listening... tap to stop'
              : t('braindump.speakInstead') || 'Tap to speak instead'}
          </p>
        </div>

        <div className="pt-2">
          <Button
            label={t('common.continue') || 'Continue'}
            onClick={() => onNext(text)}
            icon="→"
            disabled={!text.trim()}
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
