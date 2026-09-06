import { C } from '../ui';

/**
 * NEEV Root Voice Bot Symbol:
 * Represents the foundation of entrepreneurship:
 * - Earth foundation blocks & root lines
 * - Upward rising central shoot
 * - Golden sprout leaf
 */
export function AssistantAvatar({
  size = 44,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{ width: size, height: size, background: C.primary }}
    >
      <svg
        width={size * 0.72}
        height={size * 0.72}
        viewBox="0 0 48 48"
        fill="none"
        className={active ? 'animate-pulse' : ''}
      >
        {/* Base foundation roots / earth layers */}
        <rect x="8" y="38" width="32" height="4" rx="2" fill="#FAF7F0" opacity="0.3" />
        <rect x="12" y="32" width="24" height="4.5" rx="2" fill="#FAF7F0" opacity="0.55" />

        {/* Deep taproot lines */}
        <path
          d="M24 36 L24 44"
          stroke="#D9A441"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M20 36 L15 42"
          stroke="#FAF7F0"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M28 36 L33 42"
          stroke="#FAF7F0"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Central rising root stem */}
        <rect x="22" y="16" width="4" height="17" rx="2" fill="#FAF7F0" />

        {/* Golden upward leaf / sprout crown */}
        <path
          d="M24 6 L32 16 H26 V20 H22 V16 H16 Z"
          fill="#D9A441"
        />

        {/* Side sprout foliage */}
        <path
          d="M22 23 C17 21 13 23 13 27 C17 25 19 24 22 23Z"
          fill="#2C9C78"
        />
        <path
          d="M26 26 C31 24 35 26 35 30 C31 28 29 27 26 26Z"
          fill="#2C9C78"
        />
      </svg>
    </div>
  );
}
