import { C } from '../ui';

export function Waveform({
  active = false,
  color = C.teal,
}: {
  active?: boolean;
  color?: string;
}) {
  const heights = [10, 22, 34, 16, 26, 12, 20];
  const delays = ['0s', '0.15s', '0.3s', '0.45s', '0.2s', '0.35s', '0.1s'];

  return (
    <div className="flex items-center gap-1.5 h-9 justify-center my-3">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-1 rounded-full transition-all duration-300 ${active ? 'animate-wave' : ''}`}
          style={{
            height: active ? `${h}px` : '6px',
            background: color,
            animationDelay: delays[i],
          }}
        />
      ))}
    </div>
  );
}
