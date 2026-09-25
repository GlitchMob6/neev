import { Sparkles, TrendingUp } from 'lucide-react';
import { Card, C } from '../ui';
import { useLocalization } from '../../i18n';
import { getTeaserInsight } from '../../data/teaserTemplates';

export function BusinessTeaser({
  category,
}: {
  category: string;
  brainDumpText?: string;
  onContinue?: () => void;
}) {
  const { language, t } = useLocalization();
  const insight = getTeaserInsight(category, language);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* AI Punchline Hero Banner */}
      <Card
        variant="custom"
        className="p-5 rounded-3xl border shadow-sm relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #EBF7F3 0%, #FAF7F0 100%)',
          borderColor: '#B8DFD4',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-teal/20 text-xs font-bold text-teal">
            <Sparkles size={14} className="text-gold" />
            <span>{t('teaser.badge') || 'AI Business Teaser'}</span>
          </div>

          <span className="text-xs font-semibold text-muted px-2 py-0.5 rounded-full bg-sand/60">
            {category}
          </span>
        </div>

        {/* Motivational Punchline */}
        <blockquote className="my-2">
          <p
            className="font-display font-bold text-lg text-charcoal leading-snug tracking-tight"
            style={{
              fontFamily:
                language === 'en' ? 'var(--font-display)' : 'var(--font-display-deva)',
            }}
          >
            "{insight.punchline}"
          </p>
        </blockquote>

        <p className="text-xs text-muted leading-relaxed mt-2.5 pt-2.5 border-t border-border/50">
          {insight.subQuote}
        </p>
      </Card>

      {/* 3 Key Pillars / Highlights */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5 px-1">
          <TrendingUp size={16} className="text-primary" />
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-charcoal">
            {t('teaser.pillarsTitle') || 'Growth Opportunity Pillars'}
          </h4>
        </div>

        {insight.highlights.map((h, i) => (
          <div
            key={i}
            className="rounded-2xl p-3 flex items-start gap-3 bg-white border transition-all"
            style={{ borderColor: C.border }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-sand/60 text-lg flex-shrink-0">
              {h.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-charcoal leading-tight">
                {h.title}
              </p>
              <p className="text-xs text-muted mt-0.5 leading-snug">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
