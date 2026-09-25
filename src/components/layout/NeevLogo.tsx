import { C } from '../ui';

export function NeevLogo({ size = 48, white = false }: { size?: number; white?: boolean }) {
  const color = white ? '#FAF7F0' : C.primary;
  const accent = white ? '#D9A441' : C.gold;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Foundation slab */}
      <rect x="6" y="36" width="36" height="6" rx="2" fill={color} />
      {/* Two rising bars */}
      <rect x="12" y="22" width="8" height="14" rx="2" fill={color} opacity="0.75" />
      <rect x="24" y="10" width="8" height="26" rx="2" fill={color} />
      {/* Upward arrow representing momentum */}
      <path d="M34 18 L42 10 L42 16 M42 10 L36 10" stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
