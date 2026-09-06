import { ChevronLeft } from 'lucide-react';
import { ModeBadge } from '../badges/ModeBadge';
import { ProgressBar } from '../ui';
import type { Mode } from '../../types';

export function TopBar({
  onBack,
  title,
  step,
  totalSteps,
  mode,
  onModeClick,
  rightAction,
}: {
  onBack?: () => void;
  title?: string;
  step?: number;
  totalSteps?: number;
  mode?: Mode;
  onModeClick?: () => void;
  rightAction?: React.ReactNode;
}) {
  return (
    <header className="flex-none px-5 pt-9 pb-2.5 flex flex-col gap-2 z-20 bg-cream/95 backdrop-blur-xs border-b border-border/40">
      <div className="flex items-center justify-between min-h-[40px]">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-sand/60 transition-colors text-charcoal cursor-pointer"
              aria-label="Go back"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {title && (
            <h2 className="font-display font-bold text-lg text-charcoal truncate">{title}</h2>
          )}
        </div>

        <div className="flex items-center gap-2">
          {mode && <ModeBadge mode={mode} onClick={onModeClick} />}
          {rightAction}
        </div>
      </div>

      {step !== undefined && totalSteps !== undefined && (
        <div className="w-full pt-1">
          <ProgressBar current={step} total={totalSteps} />
        </div>
      )}
    </header>
  );
}
