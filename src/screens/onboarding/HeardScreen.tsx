import { useState, useEffect } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { getMockBusiness } from '../../data/mockBusiness';
import type { Mode, Business } from '../../types';
import { Plus, Edit2, Check } from 'lucide-react';

export function HeardScreen({
  business,
  onNext,
  onBack,
  mode = 'assisted',
}: {
  business: Business;
  onNext: (updated?: Partial<Business>) => void;
  onBack: () => void;
  mode?: Mode;
}) {
  const { language, t } = useLocalization();
  const localizedMock = getMockBusiness(language);

  const [items, setItems] = useState([
    {
      key: 'category',
      label: t('heard.category') || 'Business category',
      value: business.category || localizedMock.category,
      icon: '🥛',
    },
    {
      key: 'location',
      label: t('heard.location') || 'Location',
      value: `${business.location || localizedMock.location}, ${business.state || localizedMock.state}`,
      icon: '📍',
    },
    {
      key: 'capital',
      label: t('heard.capital') || 'Available capital',
      value: `₹${(business.availableCapital || 120000).toLocaleString('en-IN')}`,
      icon: '💰',
    },
    {
      key: 'potential',
      label: t('heard.potential') || 'Potential business',
      value: business.potentialBusiness || localizedMock.potentialBusiness,
      icon: '🏪',
    },
  ]);

  useEffect(() => {
    setItems([
      {
        key: 'category',
        label: t('heard.category') || 'Business category',
        value: business.category || localizedMock.category,
        icon: '🥛',
      },
      {
        key: 'location',
        label: t('heard.location') || 'Location',
        value: `${business.location || localizedMock.location}, ${business.state || localizedMock.state}`,
        icon: '📍',
      },
      {
        key: 'capital',
        label: t('heard.capital') || 'Available capital',
        value: `₹${(business.availableCapital || 120000).toLocaleString('en-IN')}`,
        icon: '💰',
      },
      {
        key: 'potential',
        label: t('heard.potential') || 'Potential business',
        value: business.potentialBusiness || localizedMock.potentialBusiness,
        icon: '🏪',
      },
    ]);
  }, [language]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(items[index].value);
  };

  const handleSaveEdit = (index: number) => {
    const updated = [...items];
    updated[index].value = editValue;
    setItems(updated);
    setEditingIndex(null);
  };

  return (
    <ScreenWrap
      onBack={onBack}
      mode={mode}
      assistantMessage={t('assistant.heard')}
    >
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('heard.title') || "Here's what we heard"}
          </h1>
          <p className="mt-1 text-sm text-muted leading-relaxed">
            {t('heard.subtitle') || 'Check these details. You can change anything before we begin.'}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((d, i) => (
            <div
              key={d.key}
              className="rounded-3xl p-4 flex items-center gap-3.5 transition-all bg-white border"
              style={{ borderColor: C.border }}
            >
              <span className="text-2xl flex-shrink-0">{d.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  {d.label}
                </p>
                {editingIndex === i ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded-lg text-sm text-charcoal font-semibold outline-none"
                      style={{ borderColor: C.primary }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(i)}
                      className="p-1.5 rounded-lg text-white"
                      style={{ background: C.primary }}
                    >
                      <Check size={16} />
                    </button>
                  </div>
                ) : (
                  <p className="text-base font-bold font-display text-charcoal truncate mt-0.5">
                    {d.value}
                  </p>
                )}
              </div>
              {editingIndex !== i && (
                <button
                  type="button"
                  onClick={() => handleStartEdit(i)}
                  className="p-2 text-xs font-bold transition-colors cursor-pointer"
                  style={{ color: C.teal }}
                >
                  <Edit2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setItems([
              ...items,
              {
                key: `custom_${Date.now()}`,
                label: language === 'mr' ? 'अतिरिक्त नोंद' : language === 'hi' ? 'अतिरिक्त नोट' : 'Additional Note',
                value:
                  language === 'mr'
                    ? 'स्थानिक कॉलनी आणि चहा टपरींना प्राधान्य'
                    : language === 'hi'
                    ? 'स्थानीय कॉलोनी व चाय दुकानों को प्राथमिकता'
                    : 'Targeting local colony consumers & tea stalls',
                icon: '📝',
              },
            ]);
          }}
          className="flex items-center justify-center gap-2 rounded-3xl py-3.5 px-4 transition-all active:scale-98 cursor-pointer border-2 border-dashed"
          style={{ borderColor: C.border, color: C.primary }}
        >
          <Plus size={18} />
          <span className="font-bold text-sm">{t('heard.addDetail') || '+ Add detail'}</span>
        </button>

        <div className="flex flex-col gap-2.5 pt-2">
          <Button
            label={t('heard.confirm') || 'This looks right'}
            onClick={() => onNext()}
          />
          <Button
            label={t('heard.editDetails') || 'Edit details'}
            variant="secondary"
            onClick={() => handleStartEdit(0)}
          />
        </div>
      </div>
    </ScreenWrap>
  );
}
