import { useState, useEffect } from 'react';
import { C } from '../../components/ui';
import { NeevLogo } from '../../components/layout/NeevLogo';


interface ProcessingStep {
  label: string;
  done: boolean;
  active: boolean;
}

export function ProcessingScreen({
  onComplete,
  customSteps,
}: {
  onComplete: () => void;
  customSteps?: string[];
}) {
  const defaultSteps = [
    'Understanding your responses',
    'Analysing your business',
    'Assessing feasibility',
    'Preparing your scorecard',
  ];
  const stepLabels = customSteps || defaultSteps;

  const [steps, setSteps] = useState<ProcessingStep[]>(
    stepLabels.map((label, i) => ({
      label,
      done: false,
      active: i === 0,
    }))
  );

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1 completes at 800ms
    timers.push(setTimeout(() => {
      setSteps(prev => prev.map((s, i) => ({
        ...s,
        done: i === 0 ? true : s.done,
        active: i === 1 ? true : i === 0 ? false : s.active,
      })));
    }, 800));

    // Step 2 completes at 1600ms
    timers.push(setTimeout(() => {
      setSteps(prev => prev.map((s, i) => ({
        ...s,
        done: i <= 1 ? true : s.done,
        active: i === 2 ? true : i <= 1 ? false : s.active,
      })));
    }, 1600));

    // Step 3 completes at 2400ms
    timers.push(setTimeout(() => {
      setSteps(prev => prev.map((s, i) => ({
        ...s,
        done: i <= 2 ? true : s.done,
        active: i === 3 ? true : i <= 2 ? false : s.active,
      })));
    }, 2400));

    // Step 4 completes at 3200ms, then navigate
    timers.push(setTimeout(() => {
      setSteps(prev => prev.map(s => ({ ...s, done: true, active: false })));
    }, 3200));

    timers.push(setTimeout(() => {
      onComplete();
    }, 3800));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden select-none"
      style={{ background: C.cream }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-12">
        <div className="p-3 rounded-2xl" style={{ background: `${C.primary}15` }}>
          <NeevLogo size={48} />
        </div>
        <span
          className="font-display tracking-tight text-2xl font-extrabold"
          style={{ color: C.primary }}
        >
          NEEV
        </span>
      </div>

      {/* Processing label */}
      <p className="text-sm font-semibold text-muted mb-8 tracking-wide">
        Processing...
      </p>

      {/* Steps */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 transition-all duration-500"
            style={{
              opacity: step.done || step.active ? 1 : 0.35,
            }}
          >
            {/* Status icon */}
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              {step.done ? (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center animate-fadeIn"
                  style={{ background: C.primary }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L6 10L11 4"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : step.active ? (
                <div
                  className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: `${C.primary} transparent ${C.primary} ${C.primary}` }}
                />
              ) : (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: C.border }}
                />
              )}
            </div>

            {/* Label */}
            <span
              className="font-display font-semibold text-sm transition-colors duration-300"
              style={{
                color: step.done ? C.primary : step.active ? C.charcoal : C.muted,
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex gap-1.5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: step.done ? 32 : 12,
                background: step.done ? C.primary : step.active ? C.teal : C.border,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
