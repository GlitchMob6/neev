import { Card, SourceBadge, C } from '../ui';
import type { SourceBadgeType } from '../../types';

export function StatCard({
  title,
  value,
  subtext,
  source,
  icon,
  highlight = false,
  className = '',
}: {
  title: string;
  value: string | number;
  subtext?: string;
  source?: SourceBadgeType;
  icon?: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <Card
      variant={highlight ? 'white' : 'sand'}
      className={`relative flex flex-col justify-between ${highlight ? 'border-primary/40 shadow-sm' : ''} ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">{title}</span>
        </div>
        {source && <SourceBadge type={source} />}
      </div>
      <div>
        <div
          className="text-2xl font-extrabold text-charcoal font-display tracking-tight"
          style={{ color: highlight ? C.primary : C.charcoal }}
        >
          {value}
        </div>
        {subtext && <p className="text-xs text-muted mt-1 font-medium">{subtext}</p>}
      </div>
    </Card>
  );
}
