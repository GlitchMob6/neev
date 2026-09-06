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
      <span style={{ fontSize: size * 0.5, lineHeight: 1 }} className={active ? 'animate-pulse' : ''}>
        🌱
      </span>
    </div>
  );
}
