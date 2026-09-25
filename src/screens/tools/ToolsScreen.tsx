import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { ToolsGrid } from '../../components/tools/ToolsGrid';
import { useLocalization } from '../../i18n';
import type { Screen, Mode } from '../../types';
import { Wrench } from 'lucide-react';

export function ToolsScreen({
  mode = 'assisted',
  setScreen,
}: {
  mode?: Mode;
  setScreen: (s: Screen) => void;
}) {
  const { t } = useLocalization();

  return (
    <ScreenWrap
      mode={mode}
      showNav={true}
      navScreen="tools"
      setScreen={setScreen}
      assistantMessage={
        t('assistant.tools') ||
        'Explore powerful business tools to manage and grow your enterprise.'
      }
    >
      <div className="flex flex-col gap-4 pt-1 pb-6">
        <div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sand/60 text-xs font-bold text-teal w-fit mb-1">
            <Wrench size={13} />
            <span>{t('tools.badge') || 'Toolkit'}</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('tools.title') || 'Business Tools'}
          </h1>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            {t('tools.subtitle') ||
              'Access financial analysis, market insights, schemes, and more.'}
          </p>
        </div>

        {/* 3-Column Tools Grid */}
        <ToolsGrid setScreen={setScreen} />
      </div>
    </ScreenWrap>
  );
}
