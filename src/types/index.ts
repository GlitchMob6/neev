// ─── Screen types ─────────────────────────────────────────────────────────────
export type OnboardingScreen =
  | 'splash' | 'login' | 'otp' | 'idCreation' | 'location' | 'language' | 'mode';

export type CoreScreen =
  | 'brainDump' | 'heard' | 'score' | 'wizard-loading' | 'wizard' | 'processing' | 'scorecard';

export type MainScreen =
  | 'dashboard' | 'reports' | 'settings' | 'profile';

export type ReportScreen =
  | 'financialReport' | 'roadmap' | 'market' | 'swot' | 'pricing' | 'insight';

export type SchemeScreen =
  | 'schemeDiscovery' | 'schemeDetail' | 'schemes';

export type PlaceholderScreen =
  | 'agenticAI' | 'network' | 'invoice';

export type Screen = OnboardingScreen | CoreScreen | MainScreen | ReportScreen | PlaceholderScreen | SchemeScreen;

// ─── Interaction mode ─────────────────────────────────────────────────────────
export type Mode = 'voice' | 'assisted' | 'normal';

// ─── Language ─────────────────────────────────────────────────────────────────
export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'ta' | 'te' | 'ml' | 'kn' | 'tulu' | 'pa';

// ─── Scorecard Data ──────────────────────────────────────────────────────────
export interface ScorecardData {
  understandingScore: number;       // out of 500
  usp: string;
  viabilityScore: number;           // out of 100
  viabilityDimensions: ViabilityDimension[];
  loanIntent: 'yes' | 'no' | null;
}

export interface ViabilityDimension {
  labelKey: string;
  label: string;
  percentage: number;
}

// ─── Scheme Types ────────────────────────────────────────────────────────────
export type NeevSchemeType = 'microfinance' | 'term_loan' | 'none';

export interface NeevScheme {
  type: NeevSchemeType;
  name: string;
  maxAmount: number;
  marginPercent: number;
  loanPercent: number;
  interestRate: number;
  tenureYears: number;
  tenureMonths: number;
  moratoriumMonths: number;
}

// ─── Voice assistant state ────────────────────────────────────────────────────
export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

// ─── Source badge type ────────────────────────────────────────────────────────
export type SourceBadgeType = 'self' | 'model' | 'local' | 'govt';

// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  phone: string;
  location: string;
  state: string;
  language: Language;
  mode: Mode;
}

// ─── Business ─────────────────────────────────────────────────────────────────
export interface Business {
  category: string;
  name: string;
  location: string;
  state: string;
  availableCapital: number;
  potentialBusiness: string;
  brainDumpText: string;
}

// ─── Financial Inputs ─────────────────────────────────────────────────────────
export interface FinancialInputs {
  totalProjectCost: number;
  ownContribution: number;
  loanAmount: number;
  interestRate: number;        // annual %
  loanTenureMonths: number;
  moratoriumMonths: number;
  monthlyRent: number;
  rawMaterialCost: number;
  laborCost: number;
  transportCost: number;
  otherOperatingCosts: number;
  dailyOutputUnits: number;    // e.g., litres per day
  pricePerUnit: number;        // e.g., ₹ per litre
  workingDaysPerMonth: number;
}

// ─── Financial Outputs ────────────────────────────────────────────────────────
export interface FinancialOutputs {
  monthlyRevenue: number;
  monthlyOperatingCost: number;
  monthlyEMI: number;
  monthlyProfit: number;
  dailyBreakEven: number;
  breakEvenMonths: number;
  cashFlow: number[];          // monthly cash flow for 12 months
  totalInterestPaid: number;
}

// ─── Market Data ──────────────────────────────────────────────────────────────
export interface Competitor {
  name: string;
  distance: string;
  type: string;
  status: string;
  source: SourceBadgeType;
}

export interface MarketData {
  localDemand: string;
  competitorDensity: string;
  customerOpportunity: string;
  priceRange: { min: number; max: number };
  competitors: Competitor[];
  revenueBreakdown: { label: string; percentage: number; color: string }[];
}

// ─── SWOT ─────────────────────────────────────────────────────────────────────
export interface SwotItem {
  title: string;
  items: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

// ─── Wizard ───────────────────────────────────────────────────────────────────
export interface WizardQuestion {
  id: string;
  questionKey: string;    // i18n key
  subtextKey: string;     // i18n key
  options: { labelKey: string; value: string }[];
}

export interface WizardAnswers {
  [questionId: string]: string;
}

// ─── Quick Action ─────────────────────────────────────────────────────────────
export interface QuickAction {
  id: string;
  labelKey: string;
  icon: string;
  action: 'download-engine' | 'download-report' | 'coming-soon' | 'navigate-schemes';
  comingSoon?: boolean;
}

// ─── Schemes ──────────────────────────────────────────────────────────────────
export interface Scheme {
  id: string;
  nameKey: string;
  shortDescKey: string;
  intendedForKey: string;
  loanRangeKey: string;
  primaryBenefitKey: string;
  tags: string[];
  documentsKey?: string;
  processKey?: string;
  considerationsKey?: string;
}

export type SchemeFit = 'highly_relevant' | 'relevant' | 'more_info_needed';

export interface SchemeDiscoveryAnswers {
  fundingReason?: string;
  amount?: string;
  businessPhase?: string;
}
