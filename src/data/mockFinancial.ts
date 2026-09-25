import type { FinancialInputs } from '../types';

export const mockFinancialInputs: FinancialInputs = {
  totalProjectCost: 140000,          // ₹1,40,000 (Microfinance threshold)
  ownContribution: 14000,            // ₹14,000 (10% margin)
  loanAmount: 126000,                // ₹1,26,000 (90% loan)
  interestRate: 6,                   // 6% annual (Microfinance)
  loanTenureMonths: 36,              // 3 years (36 months)
  moratoriumMonths: 3,               // 3 months grace
  monthlyRent: 5000,                 // ₹5,000 / month
  rawMaterialCost: 45000,            // Monthly raw milk procurement
  laborCost: 12000,                  // 1 helper
  transportCost: 4000,               // Distribution & cans transport
  otherOperatingCosts: 3000,         // Power & utilities
  dailyOutputUnits: 80,              // 80 litres / day
  pricePerUnit: 65,                  // ₹65 / litre
  workingDaysPerMonth: 26,           // 26 working days => ₹1,35,200 revenue
};
