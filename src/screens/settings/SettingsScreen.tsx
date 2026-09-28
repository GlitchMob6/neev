import { useState } from 'react';
import { ScreenWrap } from '../../components/layout/ScreenWrap';
import { Card, Button, C } from '../../components/ui';
import { useLocalization } from '../../i18n';
import { BUSINESS_CATEGORIES } from '../../data/businessCategories';
import { formatCurrency } from '../../utils/formatters';
import type { Screen, Mode, Language, User, Business, FinancialInputs } from '../../types';
import {
  User as UserIcon,
  Store,
  Globe,
  MapPin,
  Bell,
  Volume2,
  Shield,
  HelpCircle,
  Info,
  ChevronRight,
  Check,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';

export function SettingsScreen({
  user,
  setUser,
  business,
  setBusiness,
  setUserEditedBusiness,
  setFinancialInputs,
  mode,
  setMode,
  setScreen,
  onReset,
}: {
  user: User;
  setUser?: (u: User | ((prev: User) => User)) => void;
  business?: Business;
  setBusiness?: (b: Business | ((prev: Business) => Business)) => void;
  setUserEditedBusiness?: (b: boolean) => void;
  setFinancialInputs?: (fn: (prev: FinancialInputs) => FinancialInputs) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  setScreen: (s: Screen) => void;
  onReset: () => void;
}) {
  const { language, setLanguage, t } = useLocalization();

  const [activeView, setActiveView] = useState<
    'business' | 'language' | 'location' | 'notifications' | 'voice' | 'privacy' | 'help' | 'about' | null
  >(null);

  // Business state inside settings
  const [selectedCatId, setSelectedCatId] = useState<string>(() => {
    const found = BUSINESS_CATEGORIES.find(
      (c) =>
        c.id === (business?.category || '').toLowerCase() ||
        c.defaultTitle.toLowerCase().includes((business?.category || '').toLowerCase())
    );
    return found ? found.id : 'dairy';
  });

  // Location state inside settings
  const [locTown, setLocTown] = useState(business?.location || user?.location || 'Nashik');
  const [locState, setLocState] = useState(business?.state || user?.state || 'Maharashtra');

  // Notifications toggles
  const [notifSchemes, setNotifSchemes] = useState(true);
  const [notifSales, setNotifSales] = useState(true);
  const [notifVoiceTips, setNotifVoiceTips] = useState(true);

  // Supported languages list
  const supportedLanguages: {
    id: Language;
    native: string;
    sub: string;
    flag: string;
  }[] = [
    { id: 'en', native: 'English', sub: 'English', flag: '🇬🇧' },
    { id: 'hi', native: 'हिन्दी', sub: 'Hindi', flag: '🇮🇳' },
    { id: 'mr', native: 'मराठी', sub: 'Marathi', flag: '🇮🇳' },
    { id: 'gu', native: 'ગુજરાતી', sub: 'Gujarati', flag: '🇮🇳' },
    { id: 'ta', native: 'தமிழ்', sub: 'Tamil', flag: '🇮🇳' },
    { id: 'te', native: 'తెలుగు', sub: 'Telugu', flag: '🇮🇳' },
    { id: 'ml', native: 'മലയാളം', sub: 'Malayalam', flag: '🇮🇳' },
    { id: 'kn', native: 'ಕನ್ನಡ', sub: 'Kannada', flag: '🇮🇳' },
    { id: 'tulu', native: 'ತುಳು', sub: 'Tulu', flag: '🇮🇳' },
    { id: 'pa', native: 'ਪੰਜਾਬੀ', sub: 'Punjabi', flag: '🇮🇳' },
  ];

  const currentLangObj = supportedLanguages.find((l) => l.id === language) || supportedLanguages[0];

  const modes: { id: Mode; label: string; desc: string }[] = [
    {
      id: 'voice',
      label: t('mode.voice.title') || 'Talk to Neev',
      desc: 'Two-way voice conversation',
    },
    {
      id: 'assisted',
      label: t('mode.assisted.title') || 'Let Neev guide me',
      desc: 'Voice tips & assisted guidance',
    },
    {
      id: 'normal',
      label: t('mode.normal.title') || "I'll use the app",
      desc: 'Standard manual interaction',
    },
  ];

  const currentModeInfo = modes.find((m) => m.id === mode) || modes[1];

  // Handler to apply selected business
  const handleSaveBusiness = () => {
    const selectedCat = BUSINESS_CATEGORIES.find((c) => c.id === selectedCatId) || BUSINESS_CATEGORIES[0];
    if (setBusiness) {
      setBusiness((prev) => ({
        ...prev,
        category: selectedCat.defaultTitle,
        name: selectedCat.defaultName,
        availableCapital: selectedCat.defaultCapital,
        potentialBusiness: selectedCat.defaultName,
        brainDumpText: selectedCat.sampleBrainDump[language] || selectedCat.sampleBrainDump.en,
      }));
    }
    if (setUserEditedBusiness) {
      setUserEditedBusiness(true);
    }
    if (setFinancialInputs) {
      setFinancialInputs((prev) => ({
        ...prev,
        ownContribution: selectedCat.defaultCapital,
      }));
    }
    setActiveView(null);
  };

  // Handler to apply updated location
  const handleSaveLocation = (town: string, state: string) => {
    const finalTown = town.trim() || 'Nashik';
    const finalState = state.trim() || 'Maharashtra';
    if (setBusiness) {
      setBusiness((prev) => ({
        ...prev,
        location: finalTown,
        state: finalState,
      }));
    }
    if (setUser) {
      setUser((prev) => ({
        ...prev,
        location: finalTown,
        state: finalState,
      }));
    }
    setActiveView(null);
  };

  // Preset location shortcuts
  const presetLocations = [
    { town: 'Nashik', state: 'Maharashtra' },
    { town: 'Pune', state: 'Maharashtra' },
    { town: 'Nagpur', state: 'Maharashtra' },
    { town: 'Mumbai', state: 'Maharashtra' },
    { town: 'Kolhapur', state: 'Maharashtra' },
    { town: 'Ahmedabad', state: 'Gujarat' },
    { town: 'Chennai', state: 'Tamil Nadu' },
  ];

  // 9 Settings Options
  const settingOptions = [
    {
      id: 'profile',
      label: t('settings.profile') || 'My Profile',
      subtitle: `${user.firstName || 'Entrepreneur'} ${user.lastName || ''} · +91 ${user.phone || '98765 43210'}`,
      icon: <UserIcon size={18} />,
      iconBg: '#EBF7F3',
      iconColor: C.primary,
      onClick: () => setScreen('profile'),
    },
    {
      id: 'business',
      label: t('settings.business') || 'My Business',
      subtitle: business?.name || business?.category || 'Milk Collection & Retail Centre',
      icon: <Store size={18} />,
      iconBg: '#EBF7F3',
      iconColor: C.primary,
      onClick: () => {
        const found = BUSINESS_CATEGORIES.find(
          (c) =>
            c.id === (business?.category || '').toLowerCase() ||
            c.defaultTitle.toLowerCase().includes((business?.category || '').toLowerCase())
        );
        if (found) setSelectedCatId(found.id);
        setActiveView('business');
      },
    },
    {
      id: 'language',
      label: t('settings.language') || 'Language / भाषा',
      subtitle: currentLangObj.native,
      icon: <Globe size={18} />,
      iconBg: '#E8F5F0',
      iconColor: C.teal,
      onClick: () => setActiveView('language'),
    },
    {
      id: 'location',
      label: t('settings.location') || 'Business Location',
      subtitle: `${business?.location || user.location || 'Nashik'}, ${business?.state || user.state || 'Maharashtra'}`,
      icon: <MapPin size={18} />,
      iconBg: '#FFF8EC',
      iconColor: C.gold,
      onClick: () => {
        setLocTown(business?.location || user.location || 'Nashik');
        setLocState(business?.state || user.state || 'Maharashtra');
        setActiveView('location');
      },
    },
    {
      id: 'notifications',
      label: t('settings.notifications') || 'Notifications',
      subtitle: notifSchemes ? 'Active (Scheme alerts & reminders)' : 'Muted',
      icon: <Bell size={18} />,
      iconBg: '#FEF3ED',
      iconColor: C.terracotta,
      onClick: () => setActiveView('notifications'),
    },
    {
      id: 'voice',
      label: t('settings.voice') || 'Voice & Audio',
      subtitle: currentModeInfo.label,
      icon: <Volume2 size={18} />,
      iconBg: '#FFF8EC',
      iconColor: C.gold,
      onClick: () => setActiveView('voice'),
    },
    {
      id: 'privacy',
      label: t('settings.privacy') || 'Privacy & Data',
      subtitle: 'On-device storage & encryption',
      icon: <Shield size={18} />,
      iconBg: '#EBF7F3',
      iconColor: C.primary,
      onClick: () => setActiveView('privacy'),
    },
    {
      id: 'help',
      label: t('settings.help') || 'Help & Support',
      subtitle: 'Toll-free helpline & WhatsApp',
      icon: <HelpCircle size={18} />,
      iconBg: '#F3E8FF',
      iconColor: '#8B6BB5',
      onClick: () => setActiveView('help'),
    },
    {
      id: 'about',
      label: t('settings.about') || 'About Neev',
      subtitle: 'v1.0.0 · SIH 2026 Edition',
      icon: <Info size={18} />,
      iconBg: '#E8F5F0',
      iconColor: C.teal,
      onClick: () => setActiveView('about'),
    },
  ];

  return (
    <ScreenWrap
      mode={mode}
      showNav={true}
      navScreen="settings"
      setScreen={setScreen}
      assistantMessage={t('assistant.settings') || 'Adjust your language, voice mode, and profile preferences here.'}
    >
      <div className="flex flex-col gap-4.5 pt-1 pb-6">
        {/* Top Header */}
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal leading-tight">
            {t('settings.title') || 'Settings'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t('settings.subtitle') || 'Preferences and app configuration'}
          </p>
        </div>

        {/* ═══ SUBVIEWS ═══ */}

        {/* 1. MY BUSINESS SUBVIEW */}
        {activeView === 'business' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setActiveView(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal cursor-pointer hover:underline w-fit"
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </button>

            <div>
              <h2 className="font-display font-bold text-lg text-charcoal">
                My Business
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Select your business trade to dynamically customize schemes, feasibility, and questions.
              </p>
            </div>

            {/* Current Active Card */}
            <Card variant="custom" className="p-3.5 border" style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl flex-shrink-0">
                  {BUSINESS_CATEGORIES.find((c) => c.id === selectedCatId)?.icon || '🏪'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-teal uppercase tracking-wider">Active Business Selection</p>
                  <p className="font-display font-bold text-sm text-charcoal truncate">
                    {BUSINESS_CATEGORIES.find((c) => c.id === selectedCatId)?.defaultName || business?.name}
                  </p>
                  <p className="text-xs text-muted">
                    Estimated Capital: {formatCurrency(BUSINESS_CATEGORIES.find((c) => c.id === selectedCatId)?.defaultCapital || 100000)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {BUSINESS_CATEGORIES.map((cat) => {
                const isSelected = selectedCatId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCatId(cat.id)}
                    className="rounded-2xl p-3 flex flex-col items-start text-left transition-all active:scale-98 cursor-pointer border relative"
                    style={{
                      background: isSelected ? '#EBF7F3' : 'white',
                      borderColor: isSelected ? C.primary : C.border,
                      boxShadow: isSelected ? '0 4px 14px rgba(23,107,82,0.12)' : 'none',
                      minHeight: 96,
                    }}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-2xl">{cat.icon}</span>
                      {isSelected && (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                          style={{ background: C.primary }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <p
                      className="font-display font-bold text-xs leading-snug"
                      style={{ color: isSelected ? C.primary : C.charcoal }}
                    >
                      {cat.defaultTitle}
                    </p>
                    <p className="text-[10px] text-muted line-clamp-1 mt-0.5">{cat.defaultDesc}</p>
                  </button>
                );
              })}
            </div>

            <Button label="Save & Apply Business" onClick={handleSaveBusiness} />
          </div>
        )}

        {/* 2. LANGUAGE SUBVIEW */}
        {activeView === 'language' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setActiveView(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal cursor-pointer hover:underline w-fit"
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </button>

            <div>
              <h2 className="font-display font-bold text-lg text-charcoal">
                Language / भाषा
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Choose your preferred language across the entire application.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {supportedLanguages.map((lang) => {
                const isSelected = language === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLanguage(lang.id)}
                    className="rounded-2xl p-3 flex items-center justify-between text-left transition-all cursor-pointer border"
                    style={{
                      background: isSelected ? '#EBF7F3' : 'white',
                      borderColor: isSelected ? C.primary : C.border,
                    }}
                  >
                    <div>
                      <p
                        className="font-display font-bold text-sm"
                        style={{ color: isSelected ? C.primary : C.charcoal }}
                      >
                        {lang.native}
                      </p>
                      <p className="text-xs text-muted">{lang.sub}</p>
                    </div>
                    {isSelected && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                        style={{ background: C.primary }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <Button label="Done" onClick={() => setActiveView(null)} />
          </div>
        )}

        {/* 3. BUSINESS LOCATION SUBVIEW */}
        {activeView === 'location' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setActiveView(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal cursor-pointer hover:underline w-fit"
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </button>

            <div>
              <h2 className="font-display font-bold text-lg text-charcoal">
                Business Location
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Neev uses your location to evaluate local demand, competition, and state schemes.
              </p>
            </div>

            {/* Current Location Card */}
            <Card variant="custom" className="p-3.5 border" style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: C.primary }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Current Saved Location</p>
                  <p className="font-display font-bold text-base text-charcoal">
                    {locTown}, {locState}
                  </p>
                  <p className="text-xs text-teal font-medium flex items-center gap-1 mt-0.5">
                    <CheckCircle2 size={12} />
                    <span>Active in market & scheme calculations</span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Editable Fields */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-charcoal block mb-1">
                  City / Town / Taluka
                </label>
                <input
                  type="text"
                  value={locTown}
                  onChange={(e) => setLocTown(e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm bg-white border outline-none font-medium text-charcoal"
                  style={{ borderColor: C.border }}
                  placeholder="e.g., Nashik, Niphad"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal block mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={locState}
                  onChange={(e) => setLocState(e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm bg-white border outline-none font-medium text-charcoal"
                  style={{ borderColor: C.border }}
                  placeholder="e.g., Maharashtra"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                Quick Select Popular Locations
              </p>
              <div className="flex flex-wrap gap-1.5">
                {presetLocations.map((p) => {
                  const isCurrent = locTown.toLowerCase() === p.town.toLowerCase();
                  return (
                    <button
                      key={p.town}
                      type="button"
                      onClick={() => {
                        setLocTown(p.town);
                        setLocState(p.state);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer"
                      style={{
                        background: isCurrent ? '#EBF7F3' : 'white',
                        borderColor: isCurrent ? C.primary : C.border,
                        color: isCurrent ? C.primary : C.charcoal,
                      }}
                    >
                      {p.town}, {p.state}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              label="Save & Update Location"
              onClick={() => handleSaveLocation(locTown, locState)}
            />
          </div>
        )}

        {/* 4. NOTIFICATIONS SUBVIEW */}
        {activeView === 'notifications' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setActiveView(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal cursor-pointer hover:underline w-fit"
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </button>

            <div>
              <h2 className="font-display font-bold text-lg text-charcoal">
                Notifications
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Manage alerts, scheme deadlines, and business reminders.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                {
                  title: 'Government Loan & Subsidy Alerts',
                  desc: 'Notifications when eligible central and state schemes announce application windows.',
                  enabled: notifSchemes,
                  toggle: () => setNotifSchemes(!notifSchemes),
                },
                {
                  title: 'Daily Sales & EMI Tracker',
                  desc: 'Friendly evening prompt to record daily cash flow and monitor break-even targets.',
                  enabled: notifSales,
                  toggle: () => setNotifSales(!notifSales),
                },
                {
                  title: 'AI Assistant Insights',
                  desc: 'Timely recommendations on procurement prices and neighborhood market dynamics.',
                  enabled: notifVoiceTips,
                  toggle: () => setNotifVoiceTips(!notifVoiceTips),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-3.5 bg-white border flex items-center justify-between gap-3 shadow-2xs"
                  style={{ borderColor: C.border }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold text-sm text-charcoal">{item.title}</p>
                    <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={item.toggle}
                    className="w-12 h-6.5 rounded-full transition-colors relative cursor-pointer flex-shrink-0 p-0.5"
                    style={{ background: item.enabled ? C.primary : '#D1D5DB' }}
                  >
                    <div
                      className={`w-5.5 h-5.5 rounded-full bg-white transition-transform shadow-xs ${
                        item.enabled ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <Button label="Save Preferences" onClick={() => setActiveView(null)} />
          </div>
        )}

        {/* 5. VOICE & AUDIO SUBVIEW */}
        {activeView === 'voice' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setActiveView(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal cursor-pointer hover:underline w-fit"
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </button>

            <div>
              <h2 className="font-display font-bold text-lg text-charcoal">
                Voice & Audio
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Configure your preferred interaction style with Neev.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {modes.map((m) => {
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className="rounded-2xl p-3.5 flex items-center justify-between transition-all cursor-pointer border text-left"
                    style={{
                      background: isSelected ? '#EBF7F3' : 'white',
                      borderColor: isSelected ? C.primary : C.border,
                    }}
                  >
                    <div>
                      <p
                        className="font-display font-bold text-sm"
                        style={{ color: isSelected ? C.primary : C.charcoal }}
                      >
                        {m.label}
                      </p>
                      <p className="text-xs text-muted mt-0.5">{m.desc}</p>
                    </div>
                    {isSelected && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                        style={{ background: C.primary }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <Button label="Done" onClick={() => setActiveView(null)} />
          </div>
        )}

        {/* 6. PRIVACY & DATA SUBVIEW */}
        {activeView === 'privacy' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setActiveView(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal cursor-pointer hover:underline w-fit"
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </button>

            <div>
              <h2 className="font-display font-bold text-lg text-charcoal">
                Privacy & Data
              </h2>
              <p className="text-xs text-muted mt-0.5">
                How Neev protects your enterprise information.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <Card variant="white" className="p-3.5 border shadow-2xs" style={{ borderColor: C.border }}>
                <p className="font-display font-bold text-sm text-charcoal">🔒 Local Storage Architecture</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Your business inputs, revenue assumptions, and financial figures remain stored on your local device.
                </p>
              </Card>

              <Card variant="white" className="p-3.5 border shadow-2xs" style={{ borderColor: C.border }}>
                <p className="font-display font-bold text-sm text-charcoal">🛡️ Zero Credit Score Impact</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Scheme matching and eligibility screening use anonymous parameter evaluation without formal CIBIL credit inquiries.
                </p>
              </Card>

              <Card variant="white" className="p-3.5 border shadow-2xs" style={{ borderColor: C.border }}>
                <p className="font-display font-bold text-sm text-charcoal">📄 Data Portability</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  You can export your complete feasibility model anytime as a standard Excel (.xlsx) workbook or PDF dossier.
                </p>
              </Card>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onReset}
                className="w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-terracotta border transition-all hover:bg-white cursor-pointer active:scale-98 text-xs font-bold"
                style={{ borderColor: 'rgba(201,103,75,0.4)', background: '#FEF3ED' }}
              >
                <RotateCcw size={15} />
                <span>Reset All Local Data & Start Over</span>
              </button>
            </div>
          </div>
        )}

        {/* 7. HELP & SUPPORT SUBVIEW */}
        {activeView === 'help' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setActiveView(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal cursor-pointer hover:underline w-fit"
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </button>

            <div>
              <h2 className="font-display font-bold text-lg text-charcoal">
                Help & Support
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Support channels for Indian micro-entrepreneurs.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <Card variant="custom" className="p-3.5 border" style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ background: C.primary }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-charcoal">Toll-Free Helpline</p>
                    <p className="text-xs text-teal font-bold mt-0.5">1800-889-NEEV (6338)</p>
                    <p className="text-[10px] text-muted">9:00 AM – 6:00 PM IST · Mon to Sat</p>
                  </div>
                </div>
              </Card>

              <Card variant="custom" className="p-3.5 border" style={{ background: '#FFF8EC', borderColor: '#F5D88A' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ background: '#25D366' }}
                  >
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-charcoal">WhatsApp Assistant</p>
                    <p className="text-xs text-charcoal font-bold mt-0.5">+91 98765 43210</p>
                    <p className="text-[10px] text-muted">Instant queries on loan eligibility & schemes</p>
                  </div>
                </div>
              </Card>

              <Card variant="white" className="p-3.5 border shadow-2xs" style={{ borderColor: C.border }}>
                <p className="font-display font-bold text-sm text-charcoal mb-2">Frequently Asked Questions</p>
                <div className="flex flex-col gap-2 text-xs">
                  <div>
                    <p className="font-bold text-charcoal">How are loan schemes matched?</p>
                    <p className="text-muted text-[11px] mt-0.5">
                      Matched using project cost, available margin capital, and trade category.
                    </p>
                  </div>
                  <div className="pt-1.5 border-t border-border">
                    <p className="font-bold text-charcoal">Can I change my business category?</p>
                    <p className="text-muted text-[11px] mt-0.5">
                      Yes! Go to Settings $\rightarrow$ My Business to switch anytime.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Button label="Done" onClick={() => setActiveView(null)} />
          </div>
        )}

        {/* 8. ABOUT NEEV SUBVIEW */}
        {activeView === 'about' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setActiveView(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal cursor-pointer hover:underline w-fit"
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </button>

            <div>
              <h2 className="font-display font-bold text-lg text-charcoal">
                About Neev
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Foundation for Indian Micro-Enterprises
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <Card variant="custom" className="p-4 border text-center" style={{ background: '#EBF7F3', borderColor: '#B8DFD4' }}>
                <span className="text-3xl">🏛️</span>
                <h3 className="font-display font-bold text-base text-charcoal mt-1">NEEV Platform</h3>
                <p className="text-xs text-teal font-bold">Version 1.0.0 (Smart India Hackathon 2026)</p>
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  Hyperlocal Business Feasibility Engine bridging informal trade with formal credit, unit economics, and government schemes.
                </p>
              </Card>

              <Card variant="white" className="p-3.5 border shadow-2xs" style={{ borderColor: C.border }}>
                <p className="font-display font-bold text-sm text-charcoal">Platform Highlights</p>
                <div className="mt-2 space-y-1.5 text-xs text-muted">
                  <p>• 10 Indian Regional Languages supported</p>
                  <p>• Dynamic 6-sheet financial engine generation</p>
                  <p>• Automatic Mudra & MSME Term Loan qualification</p>
                  <p>• Complete 4-page Feasibility Analysis PDF dossier</p>
                </div>
              </Card>
            </div>

            <Button label="Done" onClick={() => setActiveView(null)} />
          </div>
        )}

        {/* ═══ MAIN SETTINGS LIST ═══ */}
        {activeView === null && (
          <>
            {/* Profile Quick-Card */}
            <button
              type="button"
              onClick={() => setScreen('profile')}
              className="w-full rounded-3xl p-4 flex items-center justify-between cursor-pointer hover:border-primary transition-all active:scale-98 shadow-2xs text-left bg-white border"
              style={{ borderColor: C.border }}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: C.primary }}
                >
                  {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-base text-charcoal truncate">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-xs text-muted truncate mt-0.5">
                    +91 {user.phone || '98765 43210'} · {business?.location || user.location || 'Nashik'}, {business?.state || user.state || 'Maharashtra'}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted flex-shrink-0" />
            </button>

            {/* The 9 Settings Options */}
            <div className="flex flex-col gap-2">
              {settingOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={opt.onClick}
                  className="w-full rounded-2xl p-3.5 flex items-center justify-between transition-all cursor-pointer border text-left bg-white active:scale-98 shadow-2xs hover:shadow-xs"
                  style={{ borderColor: C.border }}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: opt.iconBg, color: opt.iconColor }}
                    >
                      {opt.icon}
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-display font-bold text-sm text-charcoal truncate">
                        {opt.label}
                      </p>
                      <p className="text-xs text-muted truncate mt-0.5">
                        {opt.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-muted flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Restart Onboarding CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onReset}
                className="w-full py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-terracotta border transition-all hover:bg-white cursor-pointer active:scale-98 text-sm font-bold"
                style={{ borderColor: 'rgba(201,103,75,0.4)', background: '#FEF3ED' }}
              >
                <RotateCcw size={16} />
                <span>{t('settings.restartOnboarding') || 'Restart Business Onboarding'}</span>
              </button>
            </div>

            {/* App Info Footer */}
            <div className="text-center pt-2">
              <p className="text-xs text-muted flex items-center justify-center gap-1">
                <Shield size={12} />
                <span>NEEV v1.0.0 · Foundation for Indian Entrepreneurs</span>
              </p>
            </div>
          </>
        )}
      </div>
    </ScreenWrap>
  );
}
