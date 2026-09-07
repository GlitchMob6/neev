import { useState, useEffect, useCallback, useRef } from 'react';
import { LocalizationProvider, useLocalization } from './i18n';
import { HighlightProvider } from './hooks/useHighlight';
import { PhoneFrame } from './components/layout/PhoneFrame';
import type { Screen, Mode, User, Business, FinancialInputs, ScorecardData, Scheme, SchemeDiscoveryAnswers } from './types';
import { mockUser } from './data/mockUser';
import { getMockBusiness } from './data/mockBusiness';
import { mockFinancialInputs } from './data/mockFinancial';
import { getMockScorecardData } from './data/mockScorecard';

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
import { ProcessingScreen } from './screens/scorecard/ProcessingScreen';
import { ScorecardScreen } from './screens/scorecard/ScorecardScreen';
import { DashboardScreen } from './screens/dashboard/DashboardScreen';
import { ReportsScreen } from './screens/reports/ReportsScreen';
import { FinancialReportScreen } from './screens/financial/FinancialReportScreen';
import { RoadmapScreen } from './screens/financial/RoadmapScreen';
import { MarketScreen } from './screens/reports/MarketScreen';
import { SwotScreen } from './screens/reports/SwotScreen';
import { PricingScreen } from './screens/reports/PricingScreen';
import { InsightScreen } from './screens/reports/InsightScreen';
import { SettingsScreen } from './screens/settings/SettingsScreen';
import { ProfileScreen } from './screens/profile/ProfileScreen';
import { AgenticAIScreen } from './screens/agentic-ai/AgenticAIScreen';
import { NetworkScreen } from './screens/network/NetworkScreen';
import { SchemesScreen } from './screens/schemes/SchemesScreen';
import { SchemeDiscoveryScreen } from './screens/schemes/SchemeDiscoveryScreen';
import { SchemeDetailScreen } from './screens/schemes/SchemeDetailScreen';

function AppContent() {
  const { language } = useLocalization();
  const [screen, setScreenState] = useState<Screen>('splash');
  
  // Navigation history stack for proper back behavior
  const historyRef = useRef<Screen[]>([]);

  const setScreen = useCallback((newScreen: Screen) => {
    // Push current screen to history before navigating
    historyRef.current.push(screen);
    // Keep history manageable
    if (historyRef.current.length > 20) {
      historyRef.current = historyRef.current.slice(-15);
    }
    setScreenState(newScreen);
  }, [screen]);

  const goBack = useCallback(() => {
    const prev = historyRef.current.pop();
    if (prev) {
      setScreenState(prev);
    }
  }, []);

  const [mode, setMode] = useState<Mode>('assisted');
  const [user, setUser] = useState<User>(mockUser);
  const [business, setBusiness] = useState<Business>(() => getMockBusiness(language));
  const [financialInputs, setFinancialInputs] = useState<FinancialInputs>(mockFinancialInputs);
  const [userEditedBusiness, setUserEditedBusiness] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [schemeAnswers, setSchemeAnswers] = useState<SchemeDiscoveryAnswers>({});
  const [scorecardData, setScorecardData] = useState<ScorecardData>(() => getMockScorecardData(language));
  const [loanSelected, setLoanSelected] = useState(false);

  useEffect(() => {
    setScorecardData((prev) => ({
      ...getMockScorecardData(language),
      loanIntent: prev.loanIntent, // Preserve loan intent across language switches
    }));
    if (!userEditedBusiness) {
      setBusiness(getMockBusiness(language));
    }
  }, [language, userEditedBusiness]);

  const resetToStart = () => {
    historyRef.current = [];
    setScreenState('splash');
  };

  const renderScreen = () => {
    switch (screen) {
      // ── Onboarding ──
      case 'splash':
        return <SplashScreen onDone={() => setScreen('language')} />;

      case 'language':
        return (
          <LanguageScreen
            onNext={() => {
              setUser((prev) => ({ ...prev, language }));
              setScreen('login');
            }}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onNext={(phone) => {
              setUser((prev) => ({ ...prev, phone }));
              setScreen('otp');
            }}
            onBack={goBack}
          />
        );

      case 'otp':
        return (
          <OtpScreen
            phone={user.phone}
            onNext={() => setScreen('idCreation')}
            onBack={goBack}
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
            onBack={goBack}
          />
        );

      case 'location':
        return (
          <LocationScreen
            location={`${user.location}, ${user.state}`}
            onNext={() => setScreen('mode')}
            onBack={goBack}
          />
        );

      case 'mode':
        return (
          <ModeScreen
            currentMode={mode}
            setMode={setMode}
            onNext={() => setScreen('brainDump')}
            onBack={goBack}
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
            onBack={goBack}
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
            onBack={goBack}
          />
        );

      case 'score':
        return (
          <ScoreScreen
            mode={mode}
            onNext={() => setScreen('wizard-loading')}
            onBack={goBack}
          />
        );
      case 'wizard-loading':
        return (
          <ProcessingScreen
            onComplete={() => setScreen('wizard')}
            customSteps={[
              'Saving profile context',
              'Analyzing location dynamics',
              'Determining required inputs',
              'Preparing adaptive questions',
            ]}
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
              setScreen('processing');
            }}
            onBack={goBack}
          />
        );

      // ── Processing → Scorecard ──
      case 'processing':
        return (
          <ProcessingScreen
            onComplete={() => setScreen('scorecard')}
          />
        );

      case 'scorecard':
        return (
          <ScorecardScreen
            scorecardData={scorecardData}
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
            onLoanIntent={(intent) => {
              setScorecardData((prev) => ({ ...prev, loanIntent: intent }));
              setLoanSelected(intent === 'yes');
            }}
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
            scorecardData={scorecardData}
            mode={mode}
            setScreen={setScreen}
            loanSelected={loanSelected}
            onBack={goBack}
          />
        );

      case 'financialReport':
        return (
          <FinancialReportScreen
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
            onBack={goBack}
          />
        );

      case 'roadmap':
        return (
          <RoadmapScreen
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
            onBack={goBack}
          />
        );

      case 'market':
        return (
          <MarketScreen
            mode={mode}
            setScreen={setScreen}
            onBack={goBack}
          />
        );

      case 'swot':
        return (
          <SwotScreen
            mode={mode}
            setScreen={setScreen}
            onBack={goBack}
          />
        );

      case 'pricing':
        return (
          <PricingScreen
            mode={mode}
            setScreen={setScreen}
            onBack={goBack}
          />
        );

      case 'insight':
        return (
          <InsightScreen
            mode={mode}
            setScreen={setScreen}
            onBack={goBack}
          />
        );

      // ── Settings & Profile ──
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

      case 'profile':
        return (
          <ProfileScreen
            user={user}
            setUser={setUser}
            mode={mode}
            setMode={setMode}
            onBack={goBack}
          />
        );

      // ── Schemes (kept for back-compat but not in primary flow) ──
      case 'schemes':
        return (
          <SchemesScreen
            business={business}
            mode={mode}
            setScreen={setScreen}
            onSchemeSelect={setSelectedScheme}
          />
        );

      case 'schemeDiscovery':
        return (
          <SchemeDiscoveryScreen
            mode={mode}
            onComplete={(ans) => {
               setSchemeAnswers(ans);
               setScreen('schemes');
            }}
            onBack={goBack}
          />
        );

      case 'schemeDetail':
        return (
          <SchemeDetailScreen
            scheme={selectedScheme}
            fit={schemeAnswers.amount ? 'highly_relevant' : 'relevant'}
            mode={mode}
            onBack={goBack}
          />
        );

      // ── Placeholders ──
      case 'agenticAI':
        return (
          <AgenticAIScreen
            mode={mode}
            setScreen={setScreen}
            onBack={goBack}
          />
        );

      case 'network':
        return (
          <NetworkScreen
            mode={mode}
            setScreen={setScreen}
            onBack={goBack}
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
    <LocalizationProvider initialLanguage="en">
      <HighlightProvider>
        <AppContent />
      </HighlightProvider>
    </LocalizationProvider>
  );
}

export default App;
