import { C } from '../ui';

export interface DonutSegment {
  label: string;
  percentage: number;
  color: string;
  amount?: string;
}

export function DonutChart({
  segments,
  size = 150,
  centerLabel = 'Total',
  centerValue,
}: {
  segments: DonutSegment[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const innerR = size * 0.22;

  let cumulative = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 justify-between">
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, i) => {
            const start = cumulative;
            cumulative += seg.percentage;
            const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
            const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);
            const large = seg.percentage > 50 ? 1 : 0;
            return (
              <path
                key={i}
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
                fill={seg.color}
                opacity="0.9"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          {/* Inner donut hole */}
          <circle cx={cx} cy={cy} r={innerR} fill={C.cream} />
          <text
            x={cx}
            y={centerValue ? cy - 3 : cy + 3}
            textAnchor="middle"
            style={{ fontSize: 10, fill: C.muted, fontWeight: 600 }}
          >
            {centerLabel}
          </text>
          {centerValue && (
            <text
              x={cx}
              y={cy + 12}
              textAnchor="middle"
              style={{ fontSize: 11, fill: C.charcoal, fontWeight: 700 }}
            >
              {centerValue}
            </text>
          )}
        </svg>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
              <span className="text-charcoal truncate font-medium">{seg.label}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold flex-shrink-0">
              <span className="text-charcoal">{seg.percentage}%</span>
              {seg.amount && <span className="text-muted font-normal">({seg.amount})</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
