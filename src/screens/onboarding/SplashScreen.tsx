import { useState, useEffect } from 'react';
import { NeevLogo } from '../../components/layout/NeevLogo';
import { C } from '../../components/ui';

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden select-none"
      style={{ background: C.primary }}
    >
      {/* Background illustration */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-10 pointer-events-none"
        height="300"
        viewBox="0 0 390 300"
        preserveAspectRatio="xMidYMax meet"
      >
        <rect x="50" y="260" width="290" height="20" rx="4" fill="white" />
        <rect x="80" y="240" width="230" height="22" rx="4" fill="white" />
        <rect x="110" y="220" width="170" height="22" rx="4" fill="white" />
        <rect x="155" y="100" width="80" height="120" rx="4" fill="white" />
        <rect x="170" y="115" width="20" height="25" rx="2" fill={C.primary} />
        <rect x="200" y="115" width="20" height="25" rx="2" fill={C.primary} />
        <rect x="170" y="155" width="50" height="65" rx="2" fill={C.primary} />
        <rect x="290" y="150" width="6" height="90" rx="3" fill="white" />
        <ellipse cx="293" cy="130" rx="20" ry="25" fill="white" opacity="0.7" />
        <ellipse cx="275" cy="155" rx="15" ry="18" fill="white" opacity="0.5" />
        <ellipse cx="310" cy="160" rx="15" ry="18" fill="white" opacity="0.5" />
      </svg>

      <div className="relative flex flex-col items-center gap-8 z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-3xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <NeevLogo size={72} white />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-display tracking-tight text-4xl font-extrabold"
              style={{ color: '#FAF7F0', letterSpacing: '-1px' }}
            >
              NEEV
            </span>
            <span
              style={{
                fontSize: 14,
                color: 'rgba(250,247,240,0.85)',
                letterSpacing: '4px',
                fontWeight: 600,
                fontFamily: 'var(--font-display-deva)',
              }}
            >
              नींव · नीव
            </span>
          </div>
        </div>

        <p
          className="font-display font-medium text-lg text-center leading-relaxed"
          style={{ color: 'rgba(250,247,240,0.95)' }}
        >
          Build your idea.
          <br />
          Build your future.
        </p>

        {/* Loading bar */}
        <div className="w-48 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{ width: `${progress}%`, background: C.gold }}
          />
        </div>
      </div>
    </div>
  );
}
