import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import type { FinancialInputs, FinancialOutputs, Business } from '../types';
import { formatCurrency } from './formatters';

/**
 * Download the Financial Engine as an Excel file
 * Contains all inputs, assumptions, calculations, and outputs
 */
export function downloadFinancialEngine(
  inputs: FinancialInputs,
  outputs: FinancialOutputs,
  business: Business | string
): void {
  const wb = XLSX.utils.book_new();
  const businessName = typeof business === 'string' ? business : business.name;
  const businessCategory = typeof business === 'string' ? 'Dairy / Milk' : business.category;
  const businessLoc = typeof business === 'string' ? 'Nashik, Maharashtra' : `${business.location}, ${business.state}`;

  // Sheet 1: Business Info
  const businessData = [
    ['NEEV Financial Engine'],
    [''],
    ['Business Information'],
    ['Category', businessCategory],
    ['Name', businessName],
    ['Location', businessLoc],
    ['Available Capital', inputs.ownContribution],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(businessData);
  XLSX.utils.book_append_sheet(wb, ws1, 'Business Info');

  // Sheet 2: Financial Inputs
  const inputData = [
    ['Financial Inputs', '', 'Source'],
    ['Total Project Cost', inputs.totalProjectCost, 'Model estimate'],
    ['Own Contribution', inputs.ownContribution, 'Self-reported'],
    ['Loan Amount', inputs.loanAmount, 'Model estimate'],
    ['Interest Rate (%)', inputs.interestRate, 'Model estimate'],
    ['Loan Tenure (months)', inputs.loanTenureMonths, 'Model estimate'],
    ['Moratorium (months)', inputs.moratoriumMonths, 'Model estimate'],
    [''],
    ['Operating Costs (Monthly)', '', 'Source'],
    ['Rent', inputs.monthlyRent, 'Self-reported'],
    ['Raw Material', inputs.rawMaterialCost, 'Model estimate'],
    ['Labor', inputs.laborCost, 'Model estimate'],
    ['Transport', inputs.transportCost, 'Model estimate'],
    ['Other', inputs.otherOperatingCosts, 'Model estimate'],
    [''],
    ['Revenue Assumptions', '', 'Source'],
    ['Daily Output (units)', inputs.dailyOutputUnits, 'Self-reported'],
    ['Price per Unit', inputs.pricePerUnit, 'Local estimate'],
    ['Working Days/Month', inputs.workingDaysPerMonth, 'Model estimate'],
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(inputData);
  XLSX.utils.book_append_sheet(wb, ws2, 'Inputs');

  // Sheet 3: Calculated Outputs
  const outputData = [
    ['Calculated Financial Outputs'],
    [''],
    ['Monthly Revenue', outputs.monthlyRevenue],
    ['Monthly Operating Cost', outputs.monthlyOperatingCost],
    ['Monthly EMI', Math.round(outputs.monthlyEMI)],
    ['Monthly Profit', Math.round(outputs.monthlyProfit)],
    ['Daily Break-Even', Math.round(outputs.dailyBreakEven)],
    ['Break-Even (months)', outputs.breakEvenMonths],
    ['Total Interest Paid', Math.round(outputs.totalInterestPaid)],
    [''],
    ['12-Month Cash Flow'],
    ['Month', 'Net Cash Flow'],
    ...outputs.cashFlow.map((cf, i) => [`Month ${i + 1}`, Math.round(cf)]),
  ];
  const ws3 = XLSX.utils.aoa_to_sheet(outputData);
  XLSX.utils.book_append_sheet(wb, ws3, 'Outputs');

  XLSX.writeFile(wb, 'NEEV_Financial_Engine.xlsx');
}

/**
 * Download the Report as a PDF
 * Human-readable business story
 */
export function downloadReportPDF(
  business: Business | FinancialInputs,
  financialInputs: FinancialInputs | FinancialOutputs,
  outputs?: FinancialOutputs,
  userName: string = 'Entrepreneur',
  score: number = 79
): void {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  const actualBusiness: Business =
    'category' in business
      ? (business as Business)
      : {
          category: 'Dairy',
          name: 'Milk Collection Centre',
          location: 'Nashik',
          state: 'Maharashtra',
          availableCapital: 120000,
          potentialBusiness: 'Dairy / Retail',
          brainDumpText: '',
        };

  const actualInputs: FinancialInputs =
    'totalProjectCost' in business
      ? (business as FinancialInputs)
      : 'totalProjectCost' in financialInputs
      ? (financialInputs as FinancialInputs)
      : {
          totalProjectCost: 1000000,
          ownContribution: 120000,
          loanAmount: 880000,
          interestRate: 8.5,
          loanTenureMonths: 84,
          moratoriumMonths: 6,
          monthlyRent: 8000,
          rawMaterialCost: 40000,
          laborCost: 10000,
          transportCost: 3000,
          otherOperatingCosts: 2000,
          dailyOutputUnits: 80,
          pricePerUnit: 56,
          workingDaysPerMonth: 30,
        };

  const actualOutputs: FinancialOutputs = outputs
    ? outputs
    : 'monthlyRevenue' in financialInputs
    ? (financialInputs as FinancialOutputs)
    : {
        monthlyRevenue: 134400,
        monthlyOperatingCost: 63000,
        monthlyEMI: 13950,
        monthlyProfit: 57450,
        dailyBreakEven: 39,
        breakEvenMonths: 7,
        cashFlow: [57450, 57450, 57450, 57450, 57450, 57450, 57450, 57450, 57450, 57450, 57450, 57450],
        totalInterestPaid: 291800,
      };

  // Header
  doc.setFontSize(24);
  doc.setTextColor(23, 107, 82);
  doc.text('NEEV', margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(107, 123, 116);
  doc.text('Entrepreneurship Guidance Report', margin, y);
  y += 15;

  // Line separator
  doc.setDrawColor(221, 213, 196);
  doc.line(margin, y, 190, y);
  y += 10;

  // Business Summary
  doc.setFontSize(14);
  doc.setTextColor(38, 51, 46);
  doc.text('Business Summary', margin, y);
  y += 8;

  doc.setFontSize(11);
  doc.text(`Entrepreneur: ${userName}`, margin, y);
  y += 6;
  doc.text(`Business: ${actualBusiness.name}`, margin, y);
  y += 6;
  doc.text(`Category: ${actualBusiness.category}`, margin, y);
  y += 6;
  doc.text(`Location: ${actualBusiness.location}, ${actualBusiness.state}`, margin, y);
  y += 6;
  doc.text(`Available Capital: ${formatCurrency(actualInputs.ownContribution)}`, margin, y);
  y += 12;

  // Feasibility Score
  doc.setFontSize(14);
  doc.text('Feasibility Score', margin, y);
  y += 8;
  doc.setFontSize(28);
  doc.setTextColor(23, 107, 82);
  doc.text(`${score}/100`, margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(107, 123, 116);
  doc.text('Early estimate — not a guarantee', margin, y);
  y += 12;

  // Financial Snapshot
  doc.setFontSize(14);
  doc.setTextColor(38, 51, 46);
  doc.text('Financial Snapshot', margin, y);
  y += 8;

  const financials = [
    ['Total Project Cost', formatCurrency(actualInputs.totalProjectCost), 'Model estimate'],
    ['Loan Amount', formatCurrency(actualInputs.loanAmount), 'Model estimate'],
    ['Monthly Revenue', formatCurrency(actualOutputs.monthlyRevenue), 'Local estimate'],
    ['Monthly Operating Cost', formatCurrency(actualOutputs.monthlyOperatingCost), 'Model estimate'],
    ['Monthly EMI', formatCurrency(Math.round(actualOutputs.monthlyEMI)), 'Model estimate'],
    ['Monthly Profit', formatCurrency(Math.round(actualOutputs.monthlyProfit)), 'Model estimate'],
    ['Break-Even', `${actualOutputs.breakEvenMonths} months`, 'Model estimate'],
  ];

  doc.setFontSize(10);
  financials.forEach(([label, value, source]) => {
    doc.setTextColor(38, 51, 46);
    doc.text(label, margin, y);
    doc.text(value, 100, y);
    doc.setTextColor(107, 123, 116);
    doc.text(`[${source}]`, 150, y);
    y += 6;
  });
  y += 6;

  // Market Overview
  doc.setFontSize(14);
  doc.setTextColor(38, 51, 46);
  doc.text('Market Overview', margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.text('Local Demand: Strong', margin, y);
  y += 6;
  doc.text('Competition: Moderate', margin, y);
  y += 6;
  doc.text(
    `Price Range: ${formatCurrency(actualInputs.pricePerUnit - 9)} – ${formatCurrency(actualInputs.pricePerUnit + 15)} per litre`,
    margin,
    y
  );
  y += 12;

  // Disclaimer
  doc.setFontSize(9);
  doc.setTextColor(107, 123, 116);
  const disclaimer =
    'Disclaimer: This report is an early feasibility estimate generated by NEEV. Numbers are based on category-level averages and self-reported inputs. This is not financial advice.';
  const lines = doc.splitTextToSize(disclaimer, 170);
  doc.text(lines, margin, y);

  doc.save('NEEV_Business_Report.pdf');
}
