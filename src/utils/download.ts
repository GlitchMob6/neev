import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import type { FinancialInputs, FinancialOutputs, Business, User, ScorecardData } from '../types';
import { formatCurrency } from './formatters';
import { getApplicableScheme } from './financialCalculations';
import { getFeasibilityReportContent, calculateBankRatios } from '../data/reportData';

/**
 * Download the Financial Engine as an Excel file matching Neev_Sample_Financial_Model.xlsx
 * Contains:
 * - ReadMe / How to read this workbook
 * - Inputs
 * - Financial Structuring
 * - EMI Schedule (quarterly amortization with capitalized moratorium interest)
 * - Operating Estimates (cash flow & break-even)
 * - Projected vs Actual (Phase 2 bank-linked variance template)
 */
export function downloadFinancialEngine(
  inputs: FinancialInputs,
  outputs: FinancialOutputs,
  business: Business | string,
  user?: User
): void {
  const wb = XLSX.utils.book_new();

  const actualBusiness: Business = typeof business === 'string'
    ? {
        name: business,
        category: 'Business Enterprise',
        location: typeof user === 'object' && user?.location ? user.location : 'Local Area',
        state: typeof user === 'object' && user?.state ? user.state : 'State',
        availableCapital: inputs.ownContribution,
        potentialBusiness: business,
        brainDumpText: '',
      }
    : business;

  const ownerName = typeof user === 'object' && user?.firstName
    ? `${user.firstName} ${user.lastName}`.trim()
    : typeof user === 'string' && user
    ? user
    : 'Entrepreneur';

  const scheme = getApplicableScheme(inputs.totalProjectCost);
  const tenureYears = scheme?.tenureYears || Math.max(1, Math.round(inputs.loanTenureMonths / 12));
  const totalQuarters = Math.max(4, Math.round(inputs.loanTenureMonths / 3));
  const moratoriumQuarters = Math.max(0, Math.round((scheme?.moratoriumMonths || inputs.moratoriumMonths) / 3));
  const repaymentQuarters = Math.max(1, totalQuarters - moratoriumQuarters);
  const annualRate = scheme?.interestRate || inputs.interestRate || 8.0;
  const quarterlyRate = annualRate / 100 / 4;

  // Calculate quarterly capitalized moratorium amortization
  let balance = inputs.loanAmount;
  for (let q = 1; q <= moratoriumQuarters; q++) {
    balance += balance * quarterlyRate;
  }
  const principalAtRepayment = balance;
  const factor = Math.pow(1 + quarterlyRate, repaymentQuarters);
  const quarterlyEMI = repaymentQuarters > 0 && factor > 1
    ? (principalAtRepayment * quarterlyRate * factor) / (factor - 1)
    : 0;

  // ─────────────────────────────────────────────────────────────────────────────
  // SHEET 1: ReadMe
  // ─────────────────────────────────────────────────────────────────────────────
  const readMeData = [
    ['Neev — Financial Engine'],
    [`${actualBusiness.name || actualBusiness.category} · ${scheme?.name || 'Term Loan'} scenario`],
    [''],
    ['How to read this workbook'],
    ['Blue text', 'Hardcoded input — change these to model a different business'],
    ['Black text', 'Formula — recalculates automatically from inputs'],
    ['Green text', 'Link pulling a value from another sheet'],
    ['Yellow fill', 'A scheme/policy assumption (loan slab limits, rates) — edit only if scheme rules change'],
    ['Grey row (EMI Schedule)', 'Moratorium period — interest accrues, no EMI is due'],
    [''],
    ['Sheet guide'],
    ['Inputs', 'Everything collected from the user in the Brain Dump and Planning'],
    ['Financial Structuring', 'Project cost, loan eligibility, and scheme auto-selection'],
    ['EMI Schedule', 'Full quarter-by-quarter repayment table, moratorium handled'],
    ['Operating Estimates', 'Monthly revenue, costs, cash flow, and break-even — Projected only'],
    ['Projected vs Actual', 'Reserved structure for Phase 2 bank-linked variance tracking (Actuals column left blank)'],
  ];
  const wsReadMe = XLSX.utils.aoa_to_sheet(readMeData);
  XLSX.utils.book_append_sheet(wb, wsReadMe, 'ReadMe');

  // ─────────────────────────────────────────────────────────────────────────────
  // SHEET 2: Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const directCosts = inputs.rawMaterialCost + inputs.transportCost;
  const totalVolume = Math.max(1, inputs.dailyOutputUnits * inputs.workingDaysPerMonth);
  const variableCostPerUnit = Math.round(directCosts / totalVolume);

  const inputsData = [
    ['Inputs'],
    ['Collected from Brain Dump (Phase 1) and Planning Wizard'],
    [''],
    ['Owner Name', ownerName],
    ['Village / Town', actualBusiness.location || 'Nashik'],
    ['Taluka / Block', 'Local Block'],
    ['District', actualBusiness.location || 'Nashik'],
    ['State', actualBusiness.state || 'Maharashtra'],
    ['Business Category', actualBusiness.category || 'Dairy — Milk Collection & Retail'],
    ['Available Margin Capital (₹)', inputs.ownContribution],
    ['Monthly Rent / Space Cost (₹)', inputs.monthlyRent],
    ['Nearby Similar Businesses (self-reported)', 4],
    ['Existing Customer Base (Y/N)', 'N'],
    ['Local Price Benchmark (₹ per unit)', inputs.pricePerUnit],
    ['Expected Daily Sales Volume (units)', inputs.dailyOutputUnits],
    ['Variable Cost per Unit — procurement + transport (₹)', variableCostPerUnit],
    [''],
    [`Note: all figures above are dynamic planning values for ${ownerName} — edit to model a different scenario.`],
  ];
  const wsInputs = XLSX.utils.aoa_to_sheet(inputsData);
  XLSX.utils.book_append_sheet(wb, wsInputs, 'Inputs');

  // ─────────────────────────────────────────────────────────────────────────────
  // SHEET 3: Financial Structuring
  // ─────────────────────────────────────────────────────────────────────────────
  const structuringData = [
    ['Financial Structuring'],
    ['Project cost, loan eligibility, and scheme auto-selection'],
    [''],
    ['Available Margin Capital (₹)', inputs.ownContribution],
    ['Project Cost = Margin Capital ÷ 10% (₹)', inputs.totalProjectCost],
    ['Maximum Loan Amount = 90% of Project Cost (₹)', inputs.loanAmount],
    [''],
    ['Scheme slab assumptions (edit only if government scheme rules change)'],
    ['Micro Finance Scheme — upper Project Cost limit (₹)', 140000],
    ['Term Loan Scheme — upper Project Cost limit (₹)', 5000000],
    [''],
    ['Selected Scheme', scheme?.name || 'Term Loan Scheme'],
    ['Interest Rate (p.a.)', `${annualRate}%`],
    ['Tenure (Years, incl. moratorium)', tenureYears],
    ['Moratorium (Months)', scheme?.moratoriumMonths || inputs.moratoriumMonths],
    ['Tenure in Quarters', totalQuarters],
    ['Moratorium in Quarters', moratoriumQuarters],
  ];
  const wsStructuring = XLSX.utils.aoa_to_sheet(structuringData);
  XLSX.utils.book_append_sheet(wb, wsStructuring, 'Financial Structuring');

  // ─────────────────────────────────────────────────────────────────────────────
  // SHEET 4: EMI Schedule
  // ─────────────────────────────────────────────────────────────────────────────
  const emiSummaryData = [
    ['EMI Schedule'],
    ['Quarterly amortization — moratorium interest is capitalized, not paid'],
    [''],
    ['Loan Amount (₹)', inputs.loanAmount],
    ['Annual Interest Rate', `${annualRate}%`],
    ['Quarterly Interest Rate', `${(quarterlyRate * 100).toFixed(2)}%`],
    ['Total Tenure (Quarters)', totalQuarters],
    ['Moratorium (Quarters)', moratoriumQuarters],
    ['Repayment Quarters (after moratorium)', repaymentQuarters],
    ['Principal at Start of Repayment — moratorium interest capitalized (₹)', Math.round(principalAtRepayment)],
    ['Quarterly EMI once repayment begins (₹)', Math.round(quarterlyEMI)],
    [''],
    ['Quarter', 'Period Type', 'Opening Balance (₹)', 'Interest Accrued (₹)', 'Principal Repaid (₹)', 'EMI Paid (₹)', 'Closing Balance (₹)'],
  ];

  let currentBal = inputs.loanAmount;
  for (let q = 1; q <= totalQuarters; q++) {
    const isMoratorium = q <= moratoriumQuarters;
    const interest = Math.round(currentBal * quarterlyRate);
    if (isMoratorium) {
      const closing = currentBal + interest;
      emiSummaryData.push([
        q,
        'Moratorium',
        Math.round(currentBal),
        interest,
        0,
        0,
        Math.round(closing),
      ]);
      currentBal = closing;
    } else {
      const principalRepaid = Math.min(currentBal, Math.round(quarterlyEMI - interest));
      const emiPaid = principalRepaid + interest;
      const closing = Math.max(0, currentBal - principalRepaid);
      emiSummaryData.push([
        q,
        'Repayment',
        Math.round(currentBal),
        interest,
        principalRepaid,
        emiPaid,
        Math.round(closing),
      ]);
      currentBal = closing;
    }
  }

  emiSummaryData.push(['']);
  emiSummaryData.push(['Note: Moratorium rows reflect interest capitalized to principal; no EMI is due until repayment begins.']);
  const wsEMI = XLSX.utils.aoa_to_sheet(emiSummaryData);
  XLSX.utils.book_append_sheet(wb, wsEMI, 'EMI Schedule');

  // ─────────────────────────────────────────────────────────────────────────────
  // SHEET 5: Operating Estimates
  // ─────────────────────────────────────────────────────────────────────────────
  const monthlyRevenue = outputs.monthlyRevenue;
  const monthlyCOGS = inputs.rawMaterialCost + inputs.transportCost;
  const monthlyGrossMargin = monthlyRevenue - monthlyCOGS;
  const fixedOpEx = inputs.monthlyRent + inputs.laborCost + inputs.otherOperatingCosts;
  const monthlyEMIEquivalent = Math.round(quarterlyEMI / 3);
  const totalMonthlyOutflow = fixedOpEx + monthlyEMIEquivalent;
  const netMonthlyCashFlow = monthlyGrossMargin - totalMonthlyOutflow;
  const contributionMargin = Math.max(1, inputs.pricePerUnit - variableCostPerUnit);
  const dailyLitresNeeded = ((fixedOpEx + monthlyEMIEquivalent) / (contributionMargin * inputs.workingDaysPerMonth)).toFixed(1);
  const status = Number(dailyLitresNeeded) <= inputs.dailyOutputUnits
    ? 'Go — planned sales clear break-even'
    : 'Caution — tight break-even';

  const operatingData = [
    ['Operating Estimates'],
    ['Monthly cash flow and break-even — Projected figures only'],
    [''],
    ['Monthly Revenue (₹)', Math.round(monthlyRevenue)],
    ['Monthly Variable Cost / COGS (₹)', Math.round(monthlyCOGS)],
    ['Monthly Gross Margin (₹)', Math.round(monthlyGrossMargin)],
    [''],
    ['Fixed Operating Costs'],
    ['Monthly Rent / Space Cost (₹)', inputs.monthlyRent],
    ['Utilities, Labor & Misc (₹) — operating expenses', inputs.laborCost + inputs.otherOperatingCosts],
    ['Total Monthly Fixed OpEx (₹)', fixedOpEx],
    [''],
    ['Loan Repayment'],
    ['Quarterly EMI (₹)', Math.round(quarterlyEMI)],
    ['Monthly EMI Equivalent (₹)', monthlyEMIEquivalent],
    [''],
    ['Net Position'],
    ['Total Monthly Cash Outflow — OpEx + EMI (₹)', totalMonthlyOutflow],
    ['Net Monthly Cash Flow (₹)', netMonthlyCashFlow],
    [''],
    ['Break-even'],
    ['Contribution Margin per Unit (₹)', contributionMargin],
    ['Daily Units Needed to Break Even', Number(dailyLitresNeeded)],
    ['Actual Planned Daily Sales (units)', inputs.dailyOutputUnits],
    ['Status', status],
  ];
  const wsOperating = XLSX.utils.aoa_to_sheet(operatingData);
  XLSX.utils.book_append_sheet(wb, wsOperating, 'Operating Estimates');

  // ─────────────────────────────────────────────────────────────────────────────
  // SHEET 6: Projected vs Actual
  // ─────────────────────────────────────────────────────────────────────────────
  const projectedVsActualData = [
    ['Projected vs Actual'],
    ['Reserved structure for Phase 2 — bank-linked variance tracking. Actual column intentionally left blank.'],
    [''],
    ['Line Item', 'Projected (₹/month)', 'Actual (₹/month)', 'Variance (₹)', 'Variance (%)'],
    ['Revenue', Math.round(monthlyRevenue), '', '', ''],
    ['Variable Cost / COGS', Math.round(monthlyCOGS), '', '', ''],
    ['Rent', inputs.monthlyRent, '', '', ''],
    ['Utilities & Misc', inputs.laborCost + inputs.otherOperatingCosts, '', '', ''],
    ['EMI (monthly equivalent)', monthlyEMIEquivalent, '', '', ''],
    ['Net Cash Flow', netMonthlyCashFlow, '', '', ''],
    [''],
    ['Actual column populates once bank statement / open banking connection ships (Phase 2). Formulas are already live — no redesign needed then.'],
  ];
  const wsProjected = XLSX.utils.aoa_to_sheet(projectedVsActualData);
  XLSX.utils.book_append_sheet(wb, wsProjected, 'Projected vs Actual');

  const safeName = (actualBusiness.name || 'Neev_Financial_Model').replace(/[^a-zA-Z0-9_-]/g, '_');
  XLSX.writeFile(wb, `${safeName}_Financial_Model.xlsx`);
}

/**
 * Download the Business Feasibility Analysis as a PDF matching the 4-page reference structure:
 * - Page 1: Header, Verdict, 3 Core Stats, SWOT Analysis
 * - Page 2: Financial Health in Plain Terms (4 cards)
 * - Page 3: The Numbers a Bank Will Ask For (6 Bank indicators) & The One Change That Matters Most
 * - Page 4: Opportunity Spotlight, Watch This Closely, Milestones, Action Checklist, Disclaimer
 */
export function downloadReportPDF(
  business: Business | FinancialInputs,
  financialInputs: FinancialInputs | FinancialOutputs,
  outputs?: FinancialOutputs,
  user?: User | string,
  _scorecardData?: ScorecardData
): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  // Resolve business, user, inputs, and outputs
  const actualBusiness: Business = 'category' in business
    ? (business as Business)
    : {
        category: 'Business Enterprise',
        name: 'Local Enterprise',
        location: typeof user === 'object' && user?.location ? user.location : 'Local Area',
        state: typeof user === 'object' && user?.state ? user.state : 'State',
        availableCapital: 100000,
        potentialBusiness: 'Local Enterprise',
        brainDumpText: '',
      };

  const actualUser: User = typeof user === 'object' && user !== null && 'firstName' in user
    ? (user as User)
    : {
        firstName: typeof user === 'string' && user ? user : 'Entrepreneur',
        lastName: '',
        phone: '9876543210',
        location: actualBusiness.location,
        state: actualBusiness.state,
        age: 32,
        gender: 'male',
        language: 'en',
        mode: 'assisted',
      };

  const actualInputs: FinancialInputs = 'totalProjectCost' in business
    ? (business as FinancialInputs)
    : 'totalProjectCost' in financialInputs
    ? (financialInputs as FinancialInputs)
    : {
        totalProjectCost: 1000000,
        ownContribution: 100000,
        loanAmount: 900000,
        interestRate: 8.0,
        loanTenureMonths: 84,
        moratoriumMonths: 6,
        monthlyRent: 3000,
        rawMaterialCost: 80000,
        laborCost: 8000,
        transportCost: 3200,
        otherOperatingCosts: 1500,
        dailyOutputUnits: 80,
        pricePerUnit: 55,
        workingDaysPerMonth: 30,
      };

  const scheme = getApplicableScheme(actualInputs.totalProjectCost);
  const computedOutputs: FinancialOutputs = outputs
    ? outputs
    : 'monthlyRevenue' in financialInputs
    ? (financialInputs as FinancialOutputs)
    : {
        monthlyRevenue: 132000,
        monthlyOperatingCost: 92700,
        monthlyEMI: 15512,
        monthlyProfit: 23788,
        dailyBreakEven: 39,
        breakEvenMonths: 3,
        cashFlow: [23788, 23788, 23788, 23788, 23788, 23788, 23788, 23788, 23788, 23788, 23788, 23788],
        totalInterestPaid: 320000,
      };

  const reportContent = getFeasibilityReportContent(
    actualBusiness.category,
    actualUser,
    actualBusiness,
    actualInputs,
    computedOutputs,
    scheme
  );
  const bankRatios = calculateBankRatios(actualInputs, computedOutputs, scheme);
  const userName = `${actualUser.firstName} ${actualUser.lastName}`.trim() || 'Entrepreneur';

  // Helper colors
  const C_DARK = [26, 37, 33];
  const C_PRIMARY = [23, 107, 82];
  const C_MUTED = [107, 123, 116];
  const C_BORDER = [221, 213, 196];

  // ═══════════════════════════════════════════════════════════════════════════════
  // PAGE 1: COVER, CORE STATS & SWOT
  // ═══════════════════════════════════════════════════════════════════════════════
  let y = margin;

  // Dark Hero Card
  doc.setFillColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.roundedRect(margin, y, contentWidth, 140, 8, 8, 'F');

  // Brand Badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(217, 164, 65);
  doc.text('▲ NEEV  ·  BUSINESS FEASIBILITY ANALYSIS', margin + 18, y + 26);

  // Business Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(250, 247, 240);
  const businessTitle = actualBusiness.name || actualBusiness.category;
  doc.text(businessTitle.substring(0, 48), margin + 18, y + 54);

  // Prepared for line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(200, 210, 205);
  doc.text(`Prepared for ${userName} · ${actualBusiness.location}, ${actualBusiness.state}`, margin + 18, y + 74);

  // Verdict pill inside hero
  doc.setFillColor(35, 52, 46);
  doc.roundedRect(margin + 18, y + 88, contentWidth - 36, 40, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(44, 156, 120);
  doc.text(`✓  ${reportContent.verdictTitle}`, margin + 30, y + 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(230, 235, 232);
  doc.text(reportContent.verdictSubtitle, margin + 30, y + 120);

  y += 152;

  // 3 Stats Bar
  const colW = (contentWidth - 16) / 3;
  const stats = [
    { label: 'TOTAL PROJECT COST', val: formatCurrency(actualInputs.totalProjectCost) },
    { label: 'GOVERNMENT SCHEME', val: scheme?.name || 'Term Loan Scheme' },
    { label: 'BREATHING ROOM BEFORE EMI', val: `${scheme?.moratoriumMonths || 6} months` },
  ];

  stats.forEach((st, i) => {
    const bx = margin + i * (colW + 8);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(C_BORDER[0], C_BORDER[1], C_BORDER[2]);
    doc.roundedRect(bx, y, colW, 48, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(C_MUTED[0], C_MUTED[1], C_MUTED[2]);
    doc.text(st.label, bx + 10, y + 16);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
    doc.text(st.val, bx + 10, y + 36);
  });

  y += 62;

  // SWOT Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.text('SWOT Analysis', margin, y + 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(C_MUTED[0], C_MUTED[1], C_MUTED[2]);
  doc.text("A quick look at what's working in this plan's favour, and what needs attention.", margin, y + 24);

  y += 34;

  // 4 SWOT Quadrants
  const swotW = (contentWidth - 12) / 2;
  const swotH = 155;
  const swotBoxes = [
    { title: 'Strengths', bg: [235, 247, 243], bdr: [184, 223, 212], txt: [23, 107, 82], icon: '✓', items: reportContent.swot.strengths },
    { title: 'Weaknesses', bg: [254, 243, 237], bdr: [245, 196, 176], txt: [201, 103, 75], icon: '!', items: reportContent.swot.weaknesses },
    { title: 'Opportunities', bg: [255, 248, 236], bdr: [245, 216, 138], txt: [143, 106, 28], icon: '✦', items: reportContent.swot.opportunities },
    { title: 'Threats', bg: [240, 244, 248], bdr: [208, 220, 229], txt: [74, 90, 105], icon: '⬡', items: reportContent.swot.threats },
  ];

  swotBoxes.forEach((bx, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const px = margin + col * (swotW + 12);
    const py = y + row * (swotH + 12);

    doc.setFillColor(bx.bg[0], bx.bg[1], bx.bg[2]);
    doc.setDrawColor(bx.bdr[0], bx.bdr[1], bx.bdr[2]);
    doc.roundedRect(px, py, swotW, swotH, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(bx.txt[0], bx.txt[1], bx.txt[2]);
    doc.text(`${bx.icon}  ${bx.title}`, px + 12, py + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(38, 51, 46);
    let itemY = py + 40;
    bx.items.slice(0, 3).forEach((item) => {
      const wrapped = doc.splitTextToSize(`• ${item}`, swotW - 24);
      doc.text(wrapped, px + 12, itemY);
      itemY += wrapped.length * 11 + 5;
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // PAGE 2: FINANCIAL HEALTH, IN PLAIN TERMS
  // ═══════════════════════════════════════════════════════════════════════════════
  doc.addPage();
  y = margin;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.text('Financial Health, in Plain Terms', margin, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(C_MUTED[0], C_MUTED[1], C_MUTED[2]);
  doc.text('Every indicator here backs up one plain-language conclusion — the numbers are real, just translated.', margin, y + 32);

  y += 48;

  const plainCards = [
    {
      title: reportContent.plainTerms.rampUpTitle,
      desc: reportContent.plainTerms.rampUpDesc,
      badge: reportContent.plainTerms.rampUpDetail,
      badgeColor: [217, 164, 65],
    },
    {
      title: reportContent.plainTerms.cashTitle,
      desc: reportContent.plainTerms.cashDesc,
      badge: reportContent.plainTerms.cashDetail,
      badgeColor: [23, 107, 82],
    },
    {
      title: reportContent.plainTerms.marginTitle,
      desc: reportContent.plainTerms.marginDesc,
      badge: reportContent.plainTerms.marginDetail,
      badgeColor: [44, 156, 120],
    },
    {
      title: reportContent.plainTerms.costTitle,
      desc: reportContent.plainTerms.costDesc,
      badge: reportContent.plainTerms.costDetail,
      badgeColor: [201, 103, 75],
    },
  ];

  plainCards.forEach((c) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(C_BORDER[0], C_BORDER[1], C_BORDER[2]);
    doc.roundedRect(margin, y, contentWidth, 110, 8, 8, 'FD');

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
    doc.text(c.title, margin + 18, y + 28);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(70, 80, 75);
    const lines = doc.splitTextToSize(c.desc, contentWidth - 160);
    doc.text(lines, margin + 18, y + 46);

    // Right Badge Box
    const pillW = 120;
    const pillX = margin + contentWidth - pillW - 14;
    doc.setFillColor(245, 247, 246);
    doc.setDrawColor(c.badgeColor[0], c.badgeColor[1], c.badgeColor[2]);
    doc.roundedRect(pillX, y + 30, pillW, 46, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(c.badgeColor[0], c.badgeColor[1], c.badgeColor[2]);
    const bLines = doc.splitTextToSize(c.badge, pillW - 10);
    doc.text(bLines, pillX + pillW / 2, y + 54, { align: 'center' });

    y += 122;
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // PAGE 3: THE NUMBERS A BANK WILL ASK FOR & THE ONE CHANGE
  // ═══════════════════════════════════════════════════════════════════════════════
  doc.addPage();
  y = margin;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.text('The Numbers a Bank Will Ask For', margin, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(C_MUTED[0], C_MUTED[1], C_MUTED[2]);
  doc.text('The plain-language version above is backed by these standard ratios — the ones a loan officer or CA will check.', margin, y + 32);

  y += 48;

  // 6 Ratio Cards (3 cols x 2 rows)
  const ratioColW = (contentWidth - 16) / 3;
  const ratioH = 88;

  bankRatios.forEach((r, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const rx = margin + col * (ratioColW + 8);
    const ry = y + row * (ratioH + 8);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(C_BORDER[0], C_BORDER[1], C_BORDER[2]);
    doc.roundedRect(rx, ry, ratioColW, ratioH, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
    doc.text(r.value, rx + 12, ry + 28);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
    doc.text(r.label, rx + 12, ry + 46);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(C_MUTED[0], C_MUTED[1], C_MUTED[2]);
    const subLines = doc.splitTextToSize(r.subtext, ratioColW - 20);
    doc.text(subLines, rx + 12, ry + 60);
  });

  y += 2 * (ratioH + 8) + 24;

  // The One Change That Matters Most (Strategic Box)
  doc.setFillColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.roundedRect(margin, y, contentWidth, 190, 8, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(217, 164, 65);
  doc.text(reportContent.recommendation.title, margin + 18, y + 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(245, 247, 245);
  const recLines = doc.splitTextToSize(reportContent.recommendation.explanation, contentWidth - 36);
  doc.text(recLines, margin + 18, y + 46);

  // Comparison Bars inside Recommendation
  const compY = y + 104;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(190, 200, 195);
  doc.text(reportContent.recommendation.originalPlan, margin + 18, compY);
  doc.setFillColor(180, 80, 60);
  doc.roundedRect(margin + 18, compY + 6, contentWidth * 0.55, 12, 3, 3, 'F');

  doc.setTextColor(245, 247, 245);
  doc.text(reportContent.recommendation.recommendedPlan, margin + 18, compY + 36);
  doc.setFillColor(44, 156, 120);
  doc.roundedRect(margin + 18, compY + 42, contentWidth * 0.72, 12, 3, 3, 'F');

  // Earnings boost badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(44, 156, 120);
  doc.text(reportContent.recommendation.earningsBoost, margin + contentWidth - 110, compY + 32, { align: 'right' });
  doc.setFontSize(8.5);
  doc.setTextColor(200, 210, 205);
  doc.text('projected earnings gain', margin + contentWidth - 110, compY + 46, { align: 'right' });

  // ═══════════════════════════════════════════════════════════════════════════════
  // PAGE 4: OPPORTUNITY SPOTLIGHT, MILESTONES & ACTION CHECKLIST
  // ═══════════════════════════════════════════════════════════════════════════════
  doc.addPage();
  y = margin;

  // Two columns: Opportunity Spotlight + Watch This Closely
  const halfW = (contentWidth - 12) / 2;
  const spotH = 135;

  // Opportunity Spotlight
  doc.setFillColor(255, 248, 236);
  doc.setDrawColor(245, 216, 138);
  doc.roundedRect(margin, y, halfW, spotH, 6, 6, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(143, 106, 28);
  doc.text(`✦  Opportunity Spotlight`, margin + 12, y + 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.text(reportContent.opportunitySpotlight.title, margin + 12, y + 40);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 70, 65);
  const oppLines = doc.splitTextToSize(reportContent.opportunitySpotlight.desc, halfW - 24);
  doc.text(oppLines, margin + 12, y + 56);

  // Watch This Closely
  const rightX = margin + halfW + 12;
  doc.setFillColor(254, 243, 237);
  doc.setDrawColor(245, 196, 176);
  doc.roundedRect(rightX, y, halfW, spotH, 6, 6, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(201, 103, 75);
  doc.text(`⬡  Watch This Closely`, rightX + 12, y + 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 70, 65);
  let watchY = y + 42;
  reportContent.watchClosely.points.slice(0, 3).forEach((p) => {
    const pLines = doc.splitTextToSize(`• ${p}`, halfW - 24);
    doc.text(pLines, rightX + 12, watchY);
    watchY += pLines.length * 11 + 4;
  });

  y += spotH + 24;

  // What Happens Next, in Order
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.text('What Happens Next, in Order', margin, y + 10);

  y += 24;

  const msColW = (contentWidth - 16) / 5;
  reportContent.milestones.forEach((ms, i) => {
    const mx = margin + i * (msColW + 4);
    doc.setFillColor(23, 107, 82);
    doc.circle(mx + 14, y + 10, 9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(String(ms.step), mx + 14, y + 13, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
    doc.text(ms.label, mx + 14, y + 30, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(C_MUTED[0], C_MUTED[1], C_MUTED[2]);
    const dLines = doc.splitTextToSize(ms.desc, msColW + 4);
    doc.text(dLines, mx + 14, y + 42, { align: 'center' });
  });

  y += 86;

  // Action Checklist: Before Starting
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.text(`Before ${userName} Starts`, margin, y + 10);

  y += 24;

  reportContent.beforeStartingChecklist.slice(0, 5).forEach((item) => {
    doc.setDrawColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
    doc.roundedRect(margin, y, 11, 11, 2, 2, 'D');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(38, 51, 46);
    doc.text(item, margin + 20, y + 9);
    y += 18;
  });

  // Footer Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(C_MUTED[0], C_MUTED[1], C_MUTED[2]);
  const disc =
    'This analysis is based on inputs provided and reasonable local benchmarks — it is a planning guide, not a guarantee of results or formal financial advice. Carry this report along with the detailed financial Excel sheet when consulting banks or lenders.';
  const dLines = doc.splitTextToSize(disc, contentWidth);
  doc.text(dLines, margin, pageHeight - 38);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('Generated by Neev · Hyperlocal Business Feasibility & Financial Planning', margin, pageHeight - 18);

  const safeName = (actualBusiness.name || 'Neev_Feasibility_Report').replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${safeName}_Feasibility_Report.pdf`);
}
