import type { ReactNode } from 'react';
import { C } from '../ui';
import { useLocalization } from '../../i18n';

export function QuickActionCard({
  title,
  subtitle,
  icon,
  onClick,
  comingSoon = false,
  badgeText,
  variant = 'primary',
}: {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  onClick?: () => void;
  comingSoon?: boolean;
  badgeText?: string;
  variant?: 'primary' | 'sand' | 'white';
}) {
  const { t } = useLocalization();

  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={comingSoon ? undefined : onClick}
      disabled={comingSoon}
      className={`w-full text-left rounded-3xl p-4.5 relative overflow-hidden transition-all flex flex-col justify-between ${
        comingSoon
          ? 'opacity-85 cursor-not-allowed'
          : 'cursor-pointer active:scale-98 hover:shadow-md'
      }`}
      style={{
        background: isPrimary ? C.primary : variant === 'sand' ? C.sand : '#ffffff',
        border: `1px solid ${isPrimary ? 'transparent' : C.border}`,
        minHeight: 110,
        boxShadow: isPrimary ? '0 4px 16px rgba(23,107,82,0.2)' : undefined,
      }}
    >
      <div className="flex items-start justify-between w-full mb-2">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{
            background: isPrimary ? 'rgba(250,247,240,0.15)' : '#EBF7F3',
            color: isPrimary ? '#FAF7F0' : C.primary,
          }}
        >
          {icon}
        </div>
        {comingSoon ? (
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border"
            style={{
              background: isPrimary ? 'rgba(217,164,65,0.25)' : 'rgba(217,164,65,0.18)',
              color: isPrimary ? '#FAF7F0' : '#8F6A1C',
              borderColor: isPrimary ? '#D9A441' : 'rgba(217,164,65,0.4)',
            }}
          >
            {badgeText || t('common.comingSoon')}
          </span>
        ) : badgeText ? (
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
            style={{
              background: isPrimary ? 'rgba(250,247,240,0.2)' : '#FAF7F0',
              color: isPrimary ? '#FAF7F0' : C.primary,
            }}
          >
            {badgeText}
          </span>
        ) : null}
      </div>

      <div>
        <h4
          className="font-display font-bold text-base leading-tight"
          style={{ color: isPrimary ? '#FAF7F0' : C.charcoal }}
        >
          {title}
        </h4>
        {subtitle && (
          <p
            className="text-xs mt-0.5 line-clamp-1 font-medium"
            style={{ color: isPrimary ? 'rgba(250,247,240,0.8)' : C.muted }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </button>
  );
}
