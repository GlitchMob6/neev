import { Card, SourceBadge, C } from '../ui';
import type { Competitor } from '../../types';
import { MapPin } from 'lucide-react';

export function CompetitorCard({ competitor }: { competitor: Competitor }) {
  return (
    <Card variant="white" className="flex items-center justify-between gap-3 py-3.5">
      <div className="flex items-start gap-3 min-w-0">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: '#F0E8D8', color: C.primary }}
        >
          <MapPin size={20} />
        </div>
        <div className="min-w-0">
          <h4 className="font-display font-bold text-sm text-charcoal truncate">{competitor.name}</h4>
          <p className="text-xs text-muted font-medium flex items-center gap-1 mt-0.5">
            <span>{competitor.type}</span>
            <span>•</span>
            <span>{competitor.distance}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-md"
          style={{ background: '#FAF7F0', color: C.charcoal, border: `1px solid ${C.border}` }}
        >
          {competitor.status}
        </span>
        <SourceBadge type={competitor.source} />
      </div>
    </Card>
  );
}
