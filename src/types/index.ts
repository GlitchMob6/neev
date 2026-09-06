// ─── Screen types ─────────────────────────────────────────────────────────────
export type OnboardingScreen =
  | 'splash' | 'login' | 'otp' | 'idCreation' | 'location' | 'language' | 'mode';

export type CoreScreen =
  | 'brainDump' | 'heard' | 'score' | 'wizard';

export type MainScreen =
  | 'dashboard' | 'reports' | 'settings';

export type ReportScreen =
  | 'financialReport' | 'roadmap' | 'market' | 'swot' | 'pricing' | 'insight';

export type PlaceholderScreen =
  | 'agenticAI' | 'network';

export type Screen = OnboardingScreen | CoreScreen | MainScreen | ReportScreen | PlaceholderScreen;

// ─── Interaction mode ─────────────────────────────────────────────────────────
export type Mode = 'voice' | 'assisted' | 'normal';

// ─── Language ─────────────────────────────────────────────────────────────────
export type Language = 'en' | 'hi' | 'mr';

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
  action: 'download-engine' | 'download-report' | 'coming-soon';
  comingSoon?: boolean;
}
