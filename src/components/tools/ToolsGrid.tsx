import type { Screen } from '../../types';
import { useLocalization } from '../../i18n';
import { C } from '../ui';
import {
  FileSpreadsheet,
  FileText,
  MapPin,
  Bot,
  Users,
  Award,
  Tag,
  ShieldAlert,
  Receipt,
} from 'lucide-react';

export interface ToolItem {
  id: string;
  nameKey: string;
  defaultName: string;
  icon: React.ReactNode;
  iconBg: string;
  screen?: Screen;
  badge?: string;
  onClick?: () => void;
}

export function ToolsGrid({
  setScreen,
  onOpenInvoice,
}: {
  setScreen: (screen: Screen) => void;
  onOpenInvoice?: () => void;
}) {
  const { t } = useLocalization();

  const tools: ToolItem[] = [
    {
      id: 'financial',
      nameKey: 'tool.financial',
      defaultName: 'Financial',
      icon: <FileSpreadsheet size={24} className="text-white" />,
      iconBg: C.teal,
      screen: 'financialReport',
    },
    {
      id: 'reports',
      nameKey: 'tool.reports',
      defaultName: 'Reports',
      icon: <FileText size={24} className="text-white" />,
      iconBg: C.primary,
      screen: 'reports',
    },
    {
      id: 'market',
      nameKey: 'tool.market',
      defaultName: 'Market',
      icon: <MapPin size={24} className="text-white" />,
      iconBg: C.gold,
      screen: 'market',
    },
    {
      id: 'agenticAI',
      nameKey: 'tool.agenticAI',
      defaultName: 'Agentic AI',
      icon: <Bot size={24} className="text-white" />,
      iconBg: C.terracotta,
      screen: 'agenticAI',
      badge: 'AI',
    },
    {
      id: 'network',
      nameKey: 'tool.network',
      defaultName: 'Network',
      icon: <Users size={24} className="text-white" />,
      iconBg: '#8B6BB5',
      screen: 'network',
    },
    {
      id: 'schemes',
      nameKey: 'tool.schemes',
      defaultName: 'Schemes',
      icon: <Award size={24} className="text-white" />,
      iconBg: '#2E7D32',
      screen: 'schemes',
    },
    {
      id: 'pricing',
      nameKey: 'tool.pricing',
      defaultName: 'Pricing',
      icon: <Tag size={24} className="text-white" />,
      iconBg: '#E65100',
      screen: 'pricing',
    },
    {
      id: 'swot',
      nameKey: 'tool.swot',
      defaultName: 'SWOT',
      icon: <ShieldAlert size={24} className="text-white" />,
      iconBg: '#00838F',
      screen: 'swot',
    },
    {
      id: 'invoice',
      nameKey: 'tool.invoice',
      defaultName: 'Invoicing',
      icon: <Receipt size={24} className="text-white" />,
      iconBg: '#4A7B6B',
      onClick: onOpenInvoice ? onOpenInvoice : () => alert(t('common.comingSoon') || 'Invoicing coming soon'),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {tools.map((tool) => (
        <button
          key={tool.id}
          type="button"
          onClick={() => {
            if (tool.onClick) {
              tool.onClick();
            } else if (tool.screen) {
              setScreen(tool.screen);
            }
          }}
          className="rounded-2xl p-3 flex flex-col items-center justify-center text-center bg-white border transition-all active:scale-95 cursor-pointer shadow-2xs hover:shadow-xs relative"
          style={{ borderColor: C.border, minHeight: 96 }}
        >
          {tool.badge && (
            <span
              className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold text-white shadow-2xs"
              style={{ background: C.gold }}
            >
              {tool.badge}
            </span>
          )}

          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 shadow-2xs"
            style={{ background: tool.iconBg }}
          >
            {tool.icon}
          </div>

          <span className="font-display font-bold text-xs text-charcoal leading-tight truncate w-full">
            {t(tool.nameKey) || tool.defaultName}
          </span>
        </button>
      ))}
    </div>
  );
}
