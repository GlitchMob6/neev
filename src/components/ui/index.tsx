import { type ReactNode } from 'react';
import { useLocalization } from '../../i18n';

// ─── Colors ────────────────────────────────────────────────────────────
const C = {
  primary: '#176B52',
  teal: '#2C9C78',
  cream: '#FAF7F0',
  sand: '#F0E8D8',
  terracotta: '#C9674B',
  gold: '#D9A441',
  charcoal: '#26332E',
  muted: '#6B7B74',
  border: '#DDD5C4',
};

export { C };

// ─── Primary Button ────────────────────────────────────────────────────
export function Button({
  label,
  onClick,
  icon,
  variant = 'primary',
  disabled = false,
  className = '',
}: {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'terracotta';
  disabled?: boolean;
  className?: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: C.primary,
      color: C.cream,
      boxShadow: '0 4px 20px rgba(23,107,82,0.3)',
    },
    secondary: {
      background: 'transparent',
      color: C.primary,
      border: `2px solid ${C.border}`,
    },
    ghost: {
      background: 'transparent',
      color: C.muted,
      textDecoration: 'underline',
      minHeight: 'auto',
      padding: '8px',
    },
    terracotta: {
      background: C.terracotta,
      color: '#fff',
      boxShadow: '0 4px 20px rgba(201,103,75,0.3)',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        minHeight: 56,
        fontSize: 17,
        fontFamily: 'var(--font-display)',
        ...styles[variant],
      }}
    >
      {label}
      {icon && <span>{icon}</span>}
    </button>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────
export function Card({
  children,
  className = '',
  style = {},
  variant = 'sand',
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'sand' | 'white' | 'green' | 'custom';
}) {
  const bg = variant === 'sand' ? C.sand : variant === 'white' ? '#fff' : variant === 'green' ? '#EBF7F3' : undefined;
  return (
    <div
      className={`rounded-3xl px-5 py-4 ${className}`}
      style={{ background: bg, border: `1px solid ${C.border}`, ...style }}
    >
      {children}
    </div>
  );
}

// ─── Source Badge ──────────────────────────────────────────────────────
export function SourceBadge({
  type,
  label,
  className = '',
}: {
  type?: 'self' | 'model' | 'local' | 'govt';
  label?: string;
  className?: string;
}) {
  const { t } = useLocalization();
  const configs = {
    self: { bg: 'rgba(44,156,120,0.14)', color: C.teal, text: label || t('badge.self') || 'Self-reported' },
    model: { bg: 'rgba(217,164,65,0.18)', color: '#8f6a1c', text: label || t('badge.model') || 'Model estimate' },
    local: { bg: 'rgba(201,103,75,0.14)', color: C.terracotta, text: label || t('badge.local') || 'Local estimate' },
    govt: { bg: 'rgba(23,107,82,0.12)', color: C.primary, text: label || t('badge.govt') || 'Govt. dataset' },
  };
  const config = type ? configs[type] : { bg: '#EBF7F3', color: C.primary, text: label || '' };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap flex-shrink-0 text-[10.5px] leading-3.5 tracking-tight select-none ${className}`}
      style={{ background: config.bg, color: config.color }}
    >
      {config.text}
    </span>
  );
}


// ─── Progress Bar ──────────────────────────────────────────────────────
export function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1.5 rounded-full transition-all duration-300"
          style={{ background: i < current ? C.primary : C.border }}
        />
      ))}
    </div>
  );
}

// ─── Chip ──────────────────────────────────────────────────────────────
export function Chip({
  label,
  value,
  onEdit,
  icon,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
  icon?: ReactNode;
}) {
  const { t } = useLocalization();
  return (
    <div
      className="rounded-2xl px-4 py-3 flex items-center justify-between gap-3"
      style={{ background: '#fff', border: `1.5px solid ${C.border}` }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {icon && <span className="text-2xl flex-shrink-0">{icon}</span>}
        <div className="min-w-0">
          <p className="font-semibold uppercase tracking-wide" style={{ fontSize: 12, color: C.muted }}>
            {label}
          </p>
          <p className="font-display font-semibold truncate" style={{ fontSize: 16, color: C.charcoal }}>
            {value}
          </p>
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex-shrink-0"
          style={{ color: C.teal, fontWeight: 700, fontSize: 14, minWidth: 44, minHeight: 44 }}
        >
          {t('common.edit')}
        </button>
      )}
    </div>
  );
}

// ─── Answer Card ───────────────────────────────────────────────────────
export function AnswerCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-3xl px-5 flex items-center gap-4 text-left transition-all active:scale-98 w-full"
      style={{
        minHeight: 64,
        background: selected ? '#EBF7F3' : 'white',
        border: `2px solid ${selected ? C.primary : C.border}`,
      }}
    >
      <span style={{ fontSize: 16, color: C.charcoal, fontWeight: selected ? 600 : 400, flex: 1 }}>
        {label}
      </span>
      {selected && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.primary }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6 L5 9 L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
}

// ─── Score Ring ─────────────────────────────────────────────────────────
export function ScoreRing({
  score,
  size = 200,
  strokeWidth = 12,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const center = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={r} fill="none" stroke={C.border} strokeWidth={strokeWidth} />
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={C.teal}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          className="animate-scoreRing"
          style={{
            transformOrigin: `${center}px ${center}px`,
            transform: 'rotate(-90deg)',
            ['--ring-circumference' as string]: circ,
            ['--ring-offset' as string]: circ - dash,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="font-display"
          style={{ fontSize: size * 0.27, fontWeight: 800, color: C.primary, lineHeight: 1 }}
        >
          {score}
        </span>
        <span style={{ fontSize: size * 0.07, color: C.muted, fontWeight: 500 }}>
          out of 100
        </span>
      </div>
    </div>
  );
}

// ─── Input Field ───────────────────────────────────────────────────────
export function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-semibold" style={{ fontSize: 14, color: C.charcoal }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-2xl px-4 outline-none transition-all"
        style={{
          height: 52,
          fontSize: 16,
          color: C.charcoal,
          background: 'white',
          border: `2px solid ${error ? C.terracotta : C.border}`,
        }}
      />
      {error && (
        <p style={{ fontSize: 13, color: C.terracotta }}>{error}</p>
      )}
    </div>
  );
}
