import { C } from '../ui';

export function SwotCard({
  title,
  icon,
  color,
  bg,
  border,
  items,
}: {
  title: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  items: string[];
}) {
  return (
    <div
      className="rounded-3xl px-4 py-4 flex flex-col gap-3 shadow-xs"
      style={{ background: bg, border: `1.5px solid ${border}` }}
    >
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 18, color, fontWeight: 700 }}>{icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{title}</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, j) => (
          <div key={j} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-none mt-1.5" style={{ background: color }} />
            <p style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.45 }}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
