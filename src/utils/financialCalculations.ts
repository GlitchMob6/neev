import type { FinancialInputs, FinancialOutputs, NeevScheme } from '../types';

// ─── Scheme Definitions ──────────────────────────────────────────────────────

export const MICROFINANCE_SCHEME: NeevScheme = {
  type: 'microfinance',
  name: 'Microfinance',
  maxAmount: 140000,
  marginPercent: 10,
  loanPercent: 90,
  interestRate: 6,
  tenureYears: 3,
  tenureMonths: 36,
  moratoriumMonths: 3,
};

export const TERM_LOAN_SCHEME: NeevScheme = {
  type: 'term_loan',
  name: 'Term Loan',
  maxAmount: 5000000,
  marginPercent: 10,
  loanPercent: 90,
  interestRate: 8,
  tenureYears: 7,
  tenureMonths: 84,
  moratoriumMonths: 6,
};

/**
 * Determine the applicable scheme based on total requirement
 * ≤ ₹1.4L → Microfinance
 * > ₹1.4L and ≤ ₹50L → Term Loan
 * > ₹50L → none
 */
export function getApplicableScheme(totalRequirement: number): NeevScheme | null {
  if (totalRequirement <= 140000) return MICROFINANCE_SCHEME;
  if (totalRequirement <= 5000000) return TERM_LOAN_SCHEME;
  return null;
}

/**
 * Calculate margin and loan from total requirement
 */
export function calculateMarginAndLoan(totalRequirement: number): {
  margin: number;
  loanAmount: number;
} {
  return {
    margin: Math.round(totalRequirement * 0.10),
    loanAmount: Math.round(totalRequirement * 0.90),
  };
}

/**
 * Generate a month-by-month repayment schedule
 */
export interface RepaymentEntry {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
  isMoratorium: boolean;
}

export function generateRepaymentSchedule(
  loanAmount: number,
  annualRate: number,
  tenureMonths: number,
  moratoriumMonths: number
): RepaymentEntry[] {
  const schedule: RepaymentEntry[] = [];
  const monthlyRate = annualRate / 100 / 12;
  
  // During moratorium, interest accrues but no payment
  let balance = loanAmount;
  
  // Moratorium months — interest accrues
  for (let i = 1; i <= moratoriumMonths; i++) {
    const interest = balance * monthlyRate;
    balance += interest; // Interest capitalizes during moratorium
    schedule.push({
      month: i,
      emi: 0,
      principal: 0,
      interest: Math.round(interest),
      balance: Math.round(balance),
      isMoratorium: true,
    });
  }
  
  // Repayment months
  const repaymentMonths = tenureMonths - moratoriumMonths;
  const emi = calculateEMI(balance, annualRate, repaymentMonths);
  
  for (let i = 1; i <= repaymentMonths; i++) {
    const interest = balance * monthlyRate;
    const principal = emi - interest;
    balance -= principal;
    if (balance < 0) balance = 0;
    
    schedule.push({
      month: moratoriumMonths + i,
      emi: Math.round(emi),
      principal: Math.round(principal),
      interest: Math.round(interest),
      balance: Math.round(balance),
      isMoratorium: false,
    });
  }
  
  return schedule;
}


/**
 * Calculate EMI using the standard loan amortization formula:
 * EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 * where P = principal, r = monthly interest rate, n = number of months
 */
export function calculateEMI(principal: number, annualRate: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRate <= 0) return principal / tenureMonths;

  const monthlyRate = annualRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

/**
 * Calculate monthly revenue from daily output × price × working days
 */
export function calculateRevenue(
  dailyOutputUnits: number,
  pricePerUnit: number,
  workingDaysPerMonth: number
): number {
  return dailyOutputUnits * pricePerUnit * workingDaysPerMonth;
}

/**
 * Calculate total monthly operating cost
 */
export function calculateOperatingCost(
  rent: number,
  rawMaterial: number,
  labor: number,
  transport: number,
  other: number
): number {
  return rent + rawMaterial + labor + transport + other;
}

/**
 * Calculate monthly profit after all costs and EMI
 */
export function calculateProfit(revenue: number, operatingCost: number, emi: number): number {
  return revenue - operatingCost - emi;
}

/**
 * Calculate daily break-even point (revenue needed per day to cover all monthly costs)
 */
export function calculateDailyBreakEven(
  monthlyOperatingCost: number,
  monthlyEMI: number,
  workingDaysPerMonth: number
): number {
  if (workingDaysPerMonth <= 0) return 0;
  return (monthlyOperatingCost + monthlyEMI) / workingDaysPerMonth;
}

/**
 * Calculate break-even in months (when cumulative profit covers initial investment)
 */
export function calculateBreakEvenMonths(
  totalProjectCost: number,
  monthlyProfit: number
): number {
  if (monthlyProfit <= 0) return Infinity;
  return Math.ceil(totalProjectCost / monthlyProfit);
}

/**
 * Calculate 12-month cash flow projection
 */
export function calculateCashFlow(
  monthlyRevenue: number,
  monthlyOperatingCost: number,
  monthlyEMI: number,
  moratoriumMonths: number,
  months: number = 12
): number[] {
  const cashFlow: number[] = [];
  for (let i = 0; i < months; i++) {
    const emi = i < moratoriumMonths ? 0 : monthlyEMI;
    cashFlow.push(monthlyRevenue - monthlyOperatingCost - emi);
  }
  return cashFlow;
}

/**
 * Calculate total interest paid over the loan tenure
 */
export function calculateTotalInterest(
  emi: number,
  tenureMonths: number,
  principal: number
): number {
  return emi * tenureMonths - principal;
}

/**
 * Master function: compute all financial outputs from inputs
 */
export function computeFinancials(inputs: FinancialInputs): FinancialOutputs {
  const monthlyRevenue = calculateRevenue(
    inputs.dailyOutputUnits,
    inputs.pricePerUnit,
    inputs.workingDaysPerMonth
  );

  const monthlyOperatingCost = calculateOperatingCost(
    inputs.monthlyRent,
    inputs.rawMaterialCost,
    inputs.laborCost,
    inputs.transportCost,
    inputs.otherOperatingCosts
  );

  const monthlyEMI = calculateEMI(
    inputs.loanAmount,
    inputs.interestRate,
    inputs.loanTenureMonths
  );

  const monthlyProfit = calculateProfit(monthlyRevenue, monthlyOperatingCost, monthlyEMI);

  const dailyBreakEven = calculateDailyBreakEven(
    monthlyOperatingCost,
    monthlyEMI,
    inputs.workingDaysPerMonth
  );

  const breakEvenMonths = calculateBreakEvenMonths(inputs.totalProjectCost, monthlyProfit);

  const cashFlow = calculateCashFlow(
    monthlyRevenue,
    monthlyOperatingCost,
    monthlyEMI,
    inputs.moratoriumMonths
  );

  const totalInterestPaid = calculateTotalInterest(
    monthlyEMI,
    inputs.loanTenureMonths,
    inputs.loanAmount
  );

  return {
    monthlyRevenue,
    monthlyOperatingCost,
    monthlyEMI,
    monthlyProfit,
    dailyBreakEven,
    breakEvenMonths,
    cashFlow,
    totalInterestPaid,
  };
}
