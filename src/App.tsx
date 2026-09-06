import { useState, useEffect } from 'react';
import { LocalizationProvider, useLocalization } from './i18n';
import { HighlightProvider } from './hooks/useHighlight';
import { PhoneFrame } from './components/layout/PhoneFrame';
import type { Screen, Mode, User, Business, FinancialInputs } from './types';
import { mockUser } from './data/mockUser';
import { getMockBusiness } from './data/mockBusiness';
import { mockFinancialInputs } from './data/mockFinancial';

// Screen imports
import { SplashScreen } from './screens/onboarding/SplashScreen';
import { LoginScreen } from './screens/onboarding/LoginScreen';
import { OtpScreen } from './screens/onboarding/OtpScreen';
import { IdCreationScreen } from './screens/onboarding/IdCreationScreen';
import { LocationScreen } from './screens/onboarding/LocationScreen';
import { LanguageScreen } from './screens/onboarding/LanguageScreen';
import { ModeScreen } from './screens/onboarding/ModeScreen';
import { BrainDumpScreen } from './screens/onboarding/BrainDumpScreen';
import { HeardScreen } from './screens/onboarding/HeardScreen';
import { ScoreScreen } from './screens/onboarding/ScoreScreen';
import { WizardScreen } from './screens/wizard/WizardScreen';
import { DashboardScreen } from './screens/dashboard/DashboardScreen';
import { ReportsScreen } from './screens/reports/ReportsScreen';
import { FinancialReportScreen } from './screens/financial/FinancialReportScreen';
import { RoadmapScreen } from './screens/financial/RoadmapScreen';
import { MarketScreen } from './screens/reports/MarketScreen';
import { SwotScreen } from './screens/reports/SwotScreen';
import { PricingScreen } from './screens/reports/PricingScreen';
import { InsightScreen } from './screens/reports/InsightScreen';
import { SettingsScreen } from './screens/settings/SettingsScreen';
import { AgenticAIScreen } from './screens/agentic-ai/AgenticAIScreen';
import { NetworkScreen } from './screens/network/NetworkScreen';

function AppContent() {
  const { language } = useLocalization();
  const [screen, setScreen] = useState<Screen>('splash');
  const [mode, setMode] = useState<Mode>('assisted');
  const [user, setUser] = useState<User>(mockUser);
  const [business, setBusiness] = useState<Business>(() => getMockBusiness(language));
  const [financialInputs, setFinancialInputs] = useState<FinancialInputs>(mockFinancialInputs);
  const [userEditedBusiness, setUserEditedBusiness] = useState(false);

  useEffect(() => {
    if (!userEditedBusiness) {
      setBusiness(getMockBusiness(language));
    }
  }, [language, userEditedBusiness]);

  const resetToStart = () => {
    setScreen('splash');
  };

  const renderScreen = () => {
    switch (screen) {
      // ── Onboarding ──
      case 'splash':
        return <SplashScreen onDone={() => setScreen('login')} />;

      case 'login':
        return (
          <LoginScreen
            onNext={(phone) => {
              setUser((prev) => ({ ...prev, phone }));
              setScreen('otp');
            }}
          />
        );

      case 'otp':
        return (
          <OtpScreen
            phone={user.phone}
            onNext={() => setScreen('idCreation')}
            onBack={() => setScreen('login')}
          />
        );

      case 'idCreation':
        return (
          <IdCreationScreen
            user={user}
            onNext={(updatedUser) => {
              setUser((prev) => ({ ...prev, ...updatedUser }));
              setScreen('location');
            }}
            onBack={() => setScreen('otp')}
          />
        );

      case 'location':
        return (
          <LocationScreen
            location={`${user.location}, ${user.state}`}
            onNext={() => setScreen('language')}
            onBack={() => setScreen('idCreation')}
          />
        );

      case 'language':
        return (
          <LanguageScreen
            onNext={() => setScreen('mode')}
            onBack={() => setScreen('location')}
          />
        );

      case 'mode':
        return (
          <ModeScreen
            currentMode={mode}
            setMode={setMode}
            onNext={() => setScreen('brainDump')}
            onBack={() => setScreen('language')}
          />
        );

      // ── Core Interaction ──
      case 'brainDump':
        return (
          <BrainDumpScreen
            initialText={business.brainDumpText}
            mode={mode}
            onNext={(text) => {
              setUserEditedBusiness(true);
              setBusiness((prev) => ({ ...prev, brainDumpText: text }));
              setScreen('heard');
            }}
            onBack={() => setScreen('mode')}
          />
        );

      case 'heard':
        return (
          <HeardScreen
            business={business}
            mode={mode}
            onNext={(updated) => {
              if (updated) {
                setUserEditedBusiness(true);
                setBusiness((prev) => ({ ...prev, ...updated }));
              }
              setScreen('score');
            }}
            onBack={() => setScreen('brainDump')}
          />
        );

      case 'score':
        return (
          <ScoreScreen
            mode={mode}
            onNext={() => setScreen('wizard')}
            onBack={() => setScreen('heard')}
          />
        );

      case 'wizard':
        return (
          <WizardScreen
            mode={mode}
            onNext={(answers) => {
              if (answers.rent) {
                const rentNum = parseInt(answers.rent, 10);
                if (!isNaN(rentNum)) {
                  setFinancialInputs((prev) => ({ ...prev, monthlyRent: rentNum }));
                }
              }
              if (answers.pricing && answers.pricing !== 'unknown') {
                const priceNum = parseInt(answers.pricing, 10);
                if (!isNaN(priceNum)) {
                  setFinancialInputs((prev) => ({ ...prev, pricePerUnit: priceNum }));
                }
              }
              setScreen('dashboard');
            }}
            onBack={() => setScreen('score')}
          />
        );

      // ── Main Dashboard ──
      case 'dashboard':
        return (
          <DashboardScreen
            user={user}
            business={business}
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
          />
        );

      // ── Reports Tab ──
      case 'reports':
        return (
          <ReportsScreen
            business={business}
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
          />
        );

      case 'financialReport':
        return (
          <FinancialReportScreen
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
            onBack={() => setScreen('reports')}
          />
        );

      case 'roadmap':
        return (
          <RoadmapScreen
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
            onBack={() => setScreen('financialReport')}
          />
        );

      case 'market':
        return (
          <MarketScreen
            mode={mode}
            setScreen={setScreen}
            onBack={() => setScreen('roadmap')}
          />
        );

      case 'swot':
        return (
          <SwotScreen
            mode={mode}
            setScreen={setScreen}
            onBack={() => setScreen('market')}
          />
        );

      case 'pricing':
        return (
          <PricingScreen
            mode={mode}
            setScreen={setScreen}
            onBack={() => setScreen('swot')}
          />
        );

      case 'insight':
        return (
          <InsightScreen
            mode={mode}
            setScreen={setScreen}
            onBack={() => setScreen('pricing')}
          />
        );

      // ── Settings ──
      case 'settings':
        return (
          <SettingsScreen
            user={user}
            mode={mode}
            setMode={setMode}
            setScreen={setScreen}
            onReset={resetToStart}
          />
        );

      // ── Placeholders ──
      case 'agenticAI':
        return (
          <AgenticAIScreen
            mode={mode}
            setScreen={setScreen}
            onBack={() => setScreen('dashboard')}
          />
        );

      case 'network':
        return (
          <NetworkScreen
            mode={mode}
            setScreen={setScreen}
            onBack={() => setScreen('dashboard')}
          />
        );

      default:
        return (
          <DashboardScreen
            user={user}
            business={business}
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
          />
        );
    }
  };

  return <PhoneFrame>{renderScreen()}</PhoneFrame>;
}

export function App() {
  return (
    <LocalizationProvider initialLanguage="mr">
      <HighlightProvider>
        <AppContent />
      </HighlightProvider>
    </LocalizationProvider>
  );
}

export default App;
