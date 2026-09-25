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
import { BrainDumpScreen } from './screens/onboarding/BrainDumpScreen';
import { BusinessTeaserScreen } from './screens/teaser/BusinessTeaserScreen';
import { HeardScreen } from './screens/onboarding/HeardScreen';
import { ScoreScreen } from './screens/onboarding/ScoreScreen';
import { CommonQuestionnaireScreen } from './screens/questionnaire/CommonQuestionnaireScreen';
import { AdaptiveQuestionnaireScreen } from './screens/questionnaire/AdaptiveQuestionnaireScreen';
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
import { NetworkScreen } from './screens/network/NetworkScreen';
import { SchemesScreen } from './screens/schemes/SchemesScreen';
import { SchemeDetailScreen } from './screens/schemes/SchemeDetailScreen';
import { ToolsScreen } from './screens/tools/ToolsScreen';

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
        return <SplashScreen onDone={() => setScreen('login')} />;


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
            onNext={() => setScreen('brainDump')}
            onBack={goBack}
          />
        );

      // ── Core Interaction & AI Punchline ──
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
              setScreen('teaserProcessing');
            }}
            onBack={goBack}
          />
        );

      case 'teaserProcessing':
        return (
          <ProcessingScreen
            customSteps={[
              'Analyzing constraints',
              'Assessing feasibility',
              'Generating business opportunity'
            ]}
            onComplete={() => setScreen('teaser')}
          />
        );

      case 'teaser':
        return (
          <BusinessTeaserScreen
            business={business}
            mode={mode}
            onNext={() => setScreen('commonQuestions')}
            onBack={goBack}
          />
        );

      case 'commonQuestions':
        return (
          <CommonQuestionnaireScreen
            business={business}
            mode={mode}
            onNext={() => setScreen('adaptiveQuestions')}
            onBack={goBack}
          />
        );

      case 'adaptiveQuestions':
        return (
          <AdaptiveQuestionnaireScreen
            category={business.category || 'dairy'}
            mode={mode}
            onNext={() => setScreen('score')}
            onBack={goBack}
          />
        );

      case 'score':
        return (
          <ScoreScreen
            mode={mode}
            setScreen={setScreen}
            onNext={() => setScreen('processing')}
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
          />
        );

      // ── Main Dashboard (now accessible via "Tools" tab) ──
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

      // ── Reports Tab (now accessible via "Dashboard" tab) ──
      case 'reports':
        return (
          <ReportsScreen
            business={business}
            financialInputs={financialInputs}
            scorecardData={scorecardData}
            mode={mode}
            setScreen={setScreen}
            loanSelected={Boolean(financialInputs.loanAmount && financialInputs.loanAmount > 0)}
            onBack={goBack}
          />
        );

      case 'financialReport':
        return (
          <FinancialReportScreen
            financialInputs={financialInputs}
            setFinancialInputs={setFinancialInputs}
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

      // ── Schemes ──
      case 'schemes':
        return (
          <SchemesScreen
            business={business}
            financialInputs={financialInputs}
            mode={mode}
            setScreen={setScreen}
            onSchemeSelect={setSelectedScheme}
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

      // ── Tools & Placeholders ──
      case 'tools':
        return (
          <ToolsScreen
            mode={mode}
            setScreen={setScreen}
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
