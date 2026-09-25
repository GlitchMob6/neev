import { C } from '../ui';

export function BarChart({
  data,
  height = 120,
}: {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}) {
  const maxValue = Math.max(...data.map((d) => Math.abs(d.value)), 1);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between gap-1.5 pt-4" style={{ height }}>
        {data.map((d, i) => {
          const barHeight = (Math.abs(d.value) / maxValue) * (height - 24);
          const isNegative = d.value < 0;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
              <div
                className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80"
                style={{
                  height: Math.max(barHeight, 4),
                  background: d.color || (isNegative ? C.terracotta : C.teal),
                }}
              />
              <span className="text-[10px] text-muted font-medium truncate w-full text-center">
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
