import type { ReactNode } from 'react';
import { TopBar } from '../navigation/TopBar';
import { BottomNav } from '../navigation/BottomNav';
import { FloatingAssistant } from '../assistant/FloatingAssistant';
import { AssistantBanner } from '../assistant/AssistantBanner';
import type { Screen, Mode } from '../../types';
import { C } from '../ui';

export function ScreenWrap({
  children,
  onBack,
  title,
  step,
  progress,
  totalSteps,
  mode,
  showNav = false,
  navScreen = 'dashboard',
  setScreen,
  assistantMessage,
  bannerMessage,
  onSpeakBanner,
  isSpeakingBanner = false,
  className = '',
}: {
  children: ReactNode;
  onBack?: () => void;
  title?: string;
  step?: number;
  progress?: number;
  totalSteps?: number;
  mode?: Mode;
  showNav?: boolean;
  navScreen?: Screen;
  setScreen?: (s: Screen) => void;
  assistantMessage?: string;
  bannerMessage?: string;
  onSpeakBanner?: () => void;
  isSpeakingBanner?: boolean;
  className?: string;
}) {
  const currentStep = step !== undefined ? step : progress;
  const showTopBar = Boolean(onBack || title || (currentStep !== undefined && totalSteps !== undefined) || mode);

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden" style={{ background: C.cream }}>
      {/* Top Bar */}
      {showTopBar && (
        <TopBar
          onBack={onBack}
          title={title}
          step={currentStep}
          totalSteps={totalSteps}
          mode={mode}
          onModeClick={setScreen ? () => setScreen('mode') : undefined}
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto no-scroll px-5 py-4 ${className}`}>
        {bannerMessage && mode === 'assisted' && (
          <AssistantBanner
            message={bannerMessage}
            onSpeak={onSpeakBanner}
            isSpeaking={isSpeakingBanner}
          />
        )}
        {children}
      </main>

      {/* Floating Assistant FAB */}
      {assistantMessage && (
        <FloatingAssistant
          message={assistantMessage}
          mode={mode}
          onSpeak={onSpeakBanner}
        />
      )}

      {/* Bottom Nav */}
      {showNav && setScreen && (
        <BottomNav
          currentScreen={navScreen}
          onNavigate={setScreen}
        />
      )}
    </div>
  );
}
