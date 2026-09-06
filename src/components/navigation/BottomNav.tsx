import { LayoutDashboard, FileText, Settings as SettingsIcon } from 'lucide-react';
import { useLocalization } from '../../i18n';
import type { Screen } from '../../types';
import { C } from '../ui';

export function BottomNav({
  currentScreen,
  onNavigate,
}: {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}) {
  const { t } = useLocalization();

  // Determine active tab
  const isDashboard = currentScreen === 'dashboard';
  const isReports = [
    'reports',
    'financialReport',
    'roadmap',
    'market',
    'swot',
    'pricing',
    'insight',
  ].includes(currentScreen);
  const isSettings = currentScreen === 'settings';

  const tabs = [
    {
      id: 'dashboard' as Screen,
      label: t('nav.home') || 'Dashboard',
      icon: LayoutDashboard,
      active: isDashboard,
    },
    {
      id: 'reports' as Screen,
      label: t('nav.reports') || 'Reports',
      icon: FileText,
      active: isReports,
    },
    {
      id: 'settings' as Screen,
      label: t('nav.settings') || 'Settings',
      icon: SettingsIcon,
      active: isSettings,
    },
  ];

  return (
    <nav
      className="flex-none px-4 py-2 border-t flex items-center justify-around z-30 shadow-lg"
      style={{
        background: '#FAF7F0',
        borderColor: C.border,
        minHeight: 64,
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center justify-center flex-1 py-1 gap-1 transition-transform active:scale-95 cursor-pointer"
            style={{
              color: tab.active ? C.primary : C.muted,
              minHeight: 48,
            }}
          >
            <div
              className={`p-1.5 rounded-2xl transition-all ${
                tab.active ? 'bg-primary/15' : 'hover:bg-sand/40'
              }`}
            >
              <Icon size={22} strokeWidth={tab.active ? 2.5 : 2} />
            </div>
            <span
              className="font-display font-semibold transition-all"
              style={{
                fontSize: 11,
                color: tab.active ? C.primary : C.muted,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
