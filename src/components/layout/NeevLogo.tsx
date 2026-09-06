import { C } from '../ui';

export function NeevLogo({ size = 48, white = false }: { size?: number; white?: boolean }) {
  const color = white ? '#FAF7F0' : C.primary;
  const accent = white ? '#D9A441' : C.gold;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Ground/foundation blocks */}
      <rect x="6" y="38" width="36" height="5" rx="2" fill={color} opacity="0.25" />
      <rect x="10" y="33" width="28" height="6" rx="2" fill={color} opacity="0.45" />
      {/* Growing stem */}
      <rect x="22" y="14" width="4" height="20" rx="2" fill={color} />
      {/* Upward arrow / leaf */}
      <path d="M24 6 L31 16 H26 V20 H22 V16 H17 Z" fill={accent} />
      {/* Small side leaves */}
      <path d="M22 22 C18 20 14 22 14 26 C18 24 20 23 22 22Z" fill={color} opacity="0.6" />
      <path d="M26 25 C30 23 34 25 34 29 C30 27 28 26 26 25Z" fill={color} opacity="0.6" />
    </svg>
  );
}
