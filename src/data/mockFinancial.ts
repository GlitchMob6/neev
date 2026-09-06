import type { FinancialInputs } from '../types';

export const mockFinancialInputs: FinancialInputs = {
  totalProjectCost: 1000000,      // ₹10,00,000 (Chilling unit, testing gear, working capital)
  ownContribution: 120000,         // ₹1,20,000 (Owner's capital)
  loanAmount: 880000,              // ₹8,80,000 (Bank loan)
  interestRate: 11.5,              // 11.5% annual
  loanTenureMonths: 84,            // 7 years (84 months)
  moratoriumMonths: 6,             // 6 months grace
  monthlyRent: 5000,               // ₹5,000 / month
  rawMaterialCost: 45000,          // Monthly raw milk procurement
  laborCost: 12000,                // 1 helper
  transportCost: 4000,             // Distribution & cans transport
  otherOperatingCosts: 3000,       // Power & utilities
  dailyOutputUnits: 80,            // 80 litres / day
  pricePerUnit: 65,                // ₹65 / litre
  workingDaysPerMonth: 26,         // 26 working days => ₹1,35,200 revenue
};

