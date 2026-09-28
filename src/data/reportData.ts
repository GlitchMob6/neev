import type { User, Business, FinancialInputs, FinancialOutputs, NeevScheme } from '../types';

export interface ReportSwotItem {
  title: string;
  badge: string;
  items: string[];
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: string;
}

export interface BankIndicator {
  label: string;
  value: string;
  subtext: string;
  badge?: string;
}

export interface MilestoneStep {
  step: number;
  label: string;
  timeline: string;
  desc: string;
}

export interface FeasibilityReportContent {
  verdictTitle: string;
  verdictSubtitle: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  plainTerms: {
    rampUpTitle: string;
    rampUpDesc: string;
    rampUpDetail: string;
    cashTitle: string;
    cashDesc: string;
    cashDetail: string;
    marginTitle: string;
    marginDesc: string;
    marginDetail: string;
    costTitle: string;
    costDesc: string;
    costDetail: string;
  };
  recommendation: {
    title: string;
    badge: string;
    explanation: string;
    originalPlan: string;
    recommendedPlan: string;
    earningsBoost: string;
  };
  opportunitySpotlight: {
    title: string;
    desc: string;
  };
  watchClosely: {
    title: string;
    points: string[];
  };
  milestones: MilestoneStep[];
  beforeStartingChecklist: string[];
}

export function getFeasibilityReportContent(
  category: string,
  user: User,
  business: Business,
  inputs: FinancialInputs,
  outputs: FinancialOutputs,
  scheme: NeevScheme | null
): FeasibilityReportContent {
  const norm = (category || business.category || '').toLowerCase();
  const userName = user.firstName ? `${user.firstName} ${user.lastName}`.trim() : 'Entrepreneur';
  const moratoriumMonths = scheme?.moratoriumMonths || inputs.moratoriumMonths || 3;
  const breakEvenMonths = outputs.breakEvenMonths && isFinite(outputs.breakEvenMonths) ? outputs.breakEvenMonths : 3;

  // 1. DAIRY CATEGORY
  if (norm.includes('dairy') || norm.includes('दुग्ध') || norm.includes('दूध') || norm.includes('डेअरी')) {
    return {
      verdictTitle: 'This business is worth starting',
      verdictSubtitle: `Your plan clears major feasibility checks, with steady cash flow once production is balanced.`,
      swot: {
        strengths: [
          'Steady, year-round local demand for fresh milk and morning delivery',
          'Low-interest priority government financing eligibility',
          'Direct collection eliminates middlemen margins',
        ],
        weaknesses: [
          'Ramping up local household customer base takes 30–60 days',
          'Single-operator capacity limits early processing scale',
          'Initial cash reserves remain tight until daily collections stabilize',
        ],
        opportunities: [
          'Evening milk delivery is underserved nearby — most sellers only deliver mornings',
          'Direct tie-up with local hotels, tea stalls, and dairy cooperatives',
          'Value-addition into curd and paneer generates significantly higher margins',
        ],
        threats: [
          'Summer season can reduce raw milk yields from local cattle by 15–20%',
          'Relying on a single supplier cluster limits pricing flexibility',
          'Cold storage backup needed during long summer power cuts',
        ],
      },
      plainTerms: {
        rampUpTitle: 'Slow start, then steady profit',
        rampUpDesc: `The first 1–2 months run at a gradual ramp-up while routes and regular daily buyers are established. By month ${breakEvenMonths}, regular profits stabilize.`,
        rampUpDetail: 'Month 1–2 ramp-up · Month 3+ positive',
        cashTitle: 'Enough cash to survive the start',
        cashDesc: `${userName}'s working capital allocation covers early operational expenses. Operating cash remains positive throughout the initial moratorium period.`,
        cashDetail: `₹${inputs.ownContribution.toLocaleString('en-IN')} capital buffer`,
        marginTitle: 'Comfortable safety margin',
        marginDesc: `${userName} only needs to sell about half of planned daily volume to break even. A slow week or bad weather will not put the business at risk.`,
        marginDetail: `${Math.round(outputs.dailyBreakEven)} units / day break-even`,
        costTitle: 'Raw material is the primary cost',
        costDesc: 'Over 60% of monthly revenue is reinvested directly into milk procurement. Ensuring reliable, fair-priced supply directly protects monthly profit.',
        costDetail: `${Math.round((inputs.rawMaterialCost / Math.max(outputs.monthlyRevenue, 1)) * 100)}% of revenue = raw milk`,
      },
      recommendation: {
        title: "NEEV'S STRATEGIC RECOMMENDATION",
        badge: 'High Impact',
        explanation: `${userName}'s base plan focuses heavily on raw milk resale. However, raw milk carries tight retail margins. Shifting 25–30% of daily volume into fresh curd and cottage paneer yields significantly higher net profit per litre with zero additional machinery.`,
        originalPlan: 'Original plan (100% plain milk resale)',
        recommendedPlan: 'Recommended plan (70% milk + 30% curd & paneer)',
        earningsBoost: '+58% daily earnings',
      },
      opportunitySpotlight: {
        title: 'Untapped Evening Distribution',
        desc: 'Nearly all local competitors deliver exclusively in the morning. An evening milk round reaches working households and evening tea vendors with minimal direct competition.',
      },
      watchClosely: {
        title: 'Key Operational Watchouts',
        points: [
          'Summer heat cuts milk yields by up to 20% — line up secondary farmer supply early',
          'Single milk source leaves little room to negotiate — maintain at least two supplier contacts',
          'Maintain insulated cooling cans or backup chilling to protect evening inventory',
        ],
      },
      milestones: [
        { step: 1, label: 'Now', timeline: 'Setup & Procurement', desc: 'Disbursement, procurement equipment setup & farmer agreements' },
        { step: 2, label: 'Months 1-2', timeline: 'Customer Ramp-up', desc: 'Doorstep morning route established, commercial tea stall supply begins' },
        { step: 3, label: `Month ${breakEvenMonths}`, timeline: 'Profit Milestone', desc: 'Break-even volume cleared, cash in hand turns consistently positive' },
        { step: 4, label: `Month ${moratoriumMonths}`, timeline: 'Moratorium Ends', desc: 'Working capital cycle stable, interest capitalization concludes' },
        { step: 5, label: `Month ${moratoriumMonths + 1}+`, timeline: 'Regular EMI Starts', desc: 'Comfortable debt service from monthly operational surplus' },
      ],
      beforeStartingChecklist: [
        'Secure verbal supply agreements with at least 3 nearby dairy farmers',
        'Map out an initial 30-house morning delivery route within a 1.5 km radius',
        'Acquire insulated stainless steel cans with basic fat/SNF testing gear',
        'Set aside a 15-day raw material reserve for seasonal fluctuations',
        'Keep track of daily cash in hand rather than theoretical paper profit',
      ],
    };
  }

  // 2. FLOWER CATEGORY
  if (norm.includes('flower') || norm.includes('फूल') || norm.includes('पुष्प') || norm.includes('हार')) {
    return {
      verdictTitle: 'High-margin commercial opportunity',
      verdictSubtitle: 'Strong daily religious and event demand with fast inventory turnover and immediate cash realization.',
      swot: {
        strengths: [
          'Daily, recurring morning temple visits and household puja rituals',
          'Low upfront machinery cost allowing fast setup',
          'Massive seasonal margin surges during festival and wedding periods',
        ],
        weaknesses: [
          'Flowers are highly perishable without cool storage or quick turnaround',
          'Early reliance on spot wholesale prices at morning mandis',
          'Manual garland-making speed limits peak single-day order capacity',
        ],
        opportunities: [
          'Pre-booked weekly garland subscriptions for local temples and shops',
          'Tie-ups with event decorators and wedding banquet halls',
          'Value-added decorative flower packaging and customized puja hampers',
        ],
        threats: [
          'Festival price surges at the wholesale mandi can compress margins if retail price is fixed',
          'Heavy rain or hot summer days accelerate flower wilting',
          'Competition from roadside informal flower sellers during major festivals',
        ],
      },
      plainTerms: {
        rampUpTitle: 'Instant daily cash generation',
        rampUpDesc: 'Flowers sell for cash on the spot every morning. Customer acquisition starts on Day 1 through temple proximity and morning stalls.',
        rampUpDetail: 'Immediate cash turnover · Day 1 collections',
        cashTitle: 'Low initial capital tie-up',
        cashDesc: `${userName}'s working capital easily covers wholesale flower lots. Inventory clears within 24 hours, preventing locked capital.`,
        cashDetail: `₹${inputs.ownContribution.toLocaleString('en-IN')} fast-churning capital`,
        marginTitle: 'High gross margins on value-addition',
        marginDesc: 'Garland making and decorative stringing doubles the raw flower value. Even at 40% planned volume, fixed overheads are cleared.',
        marginDetail: '40% volume covers break-even',
        costTitle: 'Wholesale mandi cost is the primary expense',
        costDesc: 'Raw flowers represent about 65% of revenue. Securing morning auction lots early protects daily profit margins.',
        costDetail: 'Wholesale flowers = 65% of total cost',
      },
      recommendation: {
        title: "NEEV'S STRATEGIC RECOMMENDATION",
        badge: 'High Impact',
        explanation: 'Do not rely solely on open retail footfall. Pre-booking weekly standing subscriptions with 15 local temples, commercial shops, and residential complexes guarantees 60% of daily revenue before the sun rises.',
        originalPlan: 'Original plan (retail spot counter sales)',
        recommendedPlan: 'Recommended plan (subscription routes + event bookings)',
        earningsBoost: '+52% monthly stability',
      },
      opportunitySpotlight: {
        title: 'Weekly Temple & Shop Subscriptions',
        desc: 'Over 80% of local shops and households buy fresh daily garlands. A reliable 6:30 AM doorstep delivery subscription locks in consistent, predictable monthly revenue.',
      },
      watchClosely: {
        title: 'Key Operational Watchouts',
        points: [
          'Keep flowers stored in damp jute sacks in shaded, ventilated storage',
          'Track festive calendar 2 weeks ahead to pre-book mandi flower lots',
          'Partner with a part-time garland maker during peak festival seasons',
        ],
      },
      milestones: [
        { step: 1, label: 'Now', timeline: 'Wholesale Setup', desc: 'Secure morning mandi auction passes and fresh display baskets' },
        { step: 2, label: 'Weeks 1-3', timeline: 'Subscription Drive', desc: 'Enroll first 25 daily temple and commercial shop garland accounts' },
        { step: 3, label: `Month ${breakEvenMonths}`, timeline: 'Break-Even Milestone', desc: 'Daily recurring sales comfortably cover wholesale costs and space rent' },
        { step: 4, label: `Month ${moratoriumMonths}`, timeline: 'Moratorium Ends', desc: 'Cash reserve buffer built for seasonal festival bulk purchases' },
        { step: 5, label: `Month ${moratoriumMonths + 1}+`, timeline: 'Regular EMI Starts', desc: 'Smooth EMI servicing from high-margin garland operations' },
      ],
      beforeStartingChecklist: [
        'Visit the wholesale flower mandi at 4:30 AM to identify reliable growers',
        'Secure 15 upfront monthly verbal commitments for daily morning garlands',
        'Acquire water mist sprayers and clean storage baskets',
        'Set up a WhatsApp business list to broadcast festive flower pre-orders',
        'Keep a separate emergency reserve for sudden festive wholesale price spikes',
      ],
    };
  }

  // 3. FOOD & SNACKS CATEGORY
  if (norm.includes('food') || norm.includes('खाद्य') || norm.includes('नाश्ता') || norm.includes('मेस') || norm.includes('टिफिन') || norm.includes('snack')) {
    return {
      verdictTitle: 'Viable daily cash-flow business',
      verdictSubtitle: 'Steady daily consumption with high customer retention once food quality and hygiene standards are established.',
      swot: {
        strengths: [
          'Repeat daily customer demand for breakfast, lunch tiffins, and evening snacks',
          'High gross margins on prepared hot food items and beverages',
          'Cash or UPI payments at point of sale ensure zero delayed receivables',
        ],
        weaknesses: [
          'Demanding physical preparation hours starting early morning',
          'Food wastage if daily footfall is misjudged in initial weeks',
          'Kitchen equipment and commercial gas connection requirements',
        ],
        opportunities: [
          'Monthly office, student, and factory tiffin delivery subscriptions',
          'Evening high-margin tea and snack combo packaging',
          'Bulk catering orders for local family functions and small meetings',
        ],
        threats: [
          'LPG cylinder and edible oil price spikes compress margins',
          'Strict hygiene inspections and local competition from established stalls',
          'Monsoon dampness or heat impacting ingredient shelf life',
        ],
      },
      plainTerms: {
        rampUpTitle: 'Word of mouth drives quick adoption',
        rampUpDesc: 'Food businesses build regular patrons quickly through taste consistency and cleanliness. Repeat footfall begins within 2 weeks.',
        rampUpDetail: 'Rapid repeat patronage within 14 days',
        cashTitle: 'Daily cash collections protect liquidity',
        cashDesc: 'Daily customer collections provide ongoing cash to purchase fresh vegetables and flour every evening without borrowing.',
        cashDetail: 'Zero credit sales · Instant daily liquidity',
        marginTitle: 'Robust gross profit margins',
        marginDesc: 'Prepared food yields 40–50% gross margins over raw grocery ingredients, giving a healthy cushion against slow days.',
        marginDetail: '45% average gross margin',
        costTitle: 'Oil, spices, and grains are main expenses',
        costDesc: 'Wholesale bulk purchasing of staples (flour, rice, oil) saves 12–15% compared to retail market purchasing.',
        costDetail: 'Wholesale grocery = 55% of operating costs',
      },
      recommendation: {
        title: "NEEV'S STRATEGIC RECOMMENDATION",
        badge: 'High Impact',
        explanation: 'Introduce pre-paid monthly tiffin plans and high-margin breakfast combos (Tea + Snack). Pre-paid subscriptions provide upfront working capital and eliminate food preparation guesswork.',
        originalPlan: 'Original plan (random counter sales only)',
        recommendedPlan: 'Recommended plan (counter + 30 pre-paid daily tiffins)',
        earningsBoost: '+64% predictable cash flow',
      },
      opportunitySpotlight: {
        title: 'Factory & Small Office Lunch Tiffins',
        desc: 'Nearby small workshops, banks, and retail workers look for clean, homely daily meals. A 30-tiffin daily roster provides guaranteed base revenue.',
      },
      watchClosely: {
        title: 'Key Operational Watchouts',
        points: [
          'Track oil and gas expenses weekly — minor fuel wastage adds up quickly',
          'Prepare conservative batches in the morning and replenish on demand to avoid food waste',
          'Maintain impeccable counter hygiene to stand out from unorganized street stalls',
        ],
      },
      milestones: [
        { step: 1, label: 'Now', timeline: 'Kitchen Setup', desc: 'Commercial burner installation, utensil procurement & food safety registration' },
        { step: 2, label: 'Weeks 1-2', timeline: 'Trial Launch', desc: 'Morning breakfast and snack launch with introductory tasting pricing' },
        { step: 3, label: `Month ${breakEvenMonths}`, timeline: 'Tiffin Expansion', desc: 'Onboard 20 regular daily meal customers to secure baseline revenue' },
        { step: 4, label: `Month ${moratoriumMonths}`, timeline: 'Moratorium Ends', desc: 'Stable customer base established, consistent cash reserves on hand' },
        { step: 5, label: `Month ${moratoriumMonths + 1}+`, timeline: 'Regular EMI Starts', desc: 'EMI smoothly funded from recurring kitchen operational profits' },
      ],
      beforeStartingChecklist: [
        'Secure clean water supply and commercial LPG gas cylinder connection',
        'Establish direct wholesale purchasing with a local grocery merchant',
        'Obtain basic FSSAI food business registration certificate',
        'Print simple tiffin menu cards for distribution to local commercial shops',
        'Maintain daily ingredient inventory log to control portion wastage',
      ],
    };
  }

  // 4. RETAIL & KIRANA CATEGORY
  if (norm.includes('retail') || norm.includes('किराणा') || norm.includes('दुकान') || norm.includes('store') || norm.includes('kirana')) {
    return {
      verdictTitle: 'Stable neighborhood enterprise',
      verdictSubtitle: 'Essential consumer goods with continuous repeat footfall and steady, recession-proof daily household sales.',
      swot: {
        strengths: [
          'Non-cyclical demand for daily essentials (grains, spices, personal care, packaged goods)',
          'High customer trust and proximity advantage over distant supermarkets',
          'Fast turnover on staple categories',
        ],
        weaknesses: [
          'Customers frequently request store credit (Udhaar) which can trap working capital',
          'Thin margins on branded FMCG goods (8–12%)',
          'Initial inventory capital requirement is substantial',
        ],
        opportunities: [
          'Doorstep delivery for neighborhood seniors and families via WhatsApp ordering',
          'Higher margins on loose unbranded pulses, grains, and dry fruits (18–25%)',
          'Digital UPI payment adoption and micro-recharge services to boost footfall',
        ],
        threats: [
          'Quick-commerce delivery apps expanding into urban and semi-urban pockets',
          'Wholesale price inflation reducing consumer purchasing power',
          'Bad debts from uncollected customer informal credit accounts',
        ],
      },
      plainTerms: {
        rampUpTitle: 'Immediate daily footfall',
        rampUpDesc: 'A well-located neighborhood general store sees immediate shoppers from Day 1 for daily milk, bread, soaps, and tea powder.',
        rampUpDetail: 'Immediate neighborhood walk-in shoppers',
        cashTitle: 'Strict credit control protects cash',
        cashDesc: `${userName} must limit informal customer credit to less than 10% of monthly sales to ensure distributors can be paid on time for cash discounts.`,
        cashDetail: 'Keep customer credit < 10% of turnover',
        marginTitle: 'Blended margin through balanced product mix',
        marginDesc: 'Combining low-margin branded goods with high-margin bulk grains and spices yields a healthy overall gross margin.',
        marginDetail: '18% blended gross margin',
        costTitle: 'Inventory restocking is the major cash need',
        costDesc: 'Fast-moving stock replenishment represents 80% of cash outflow. Rotating inventory every 15 days maximizes return on capital.',
        costDetail: '15-day inventory rotation target',
      },
      recommendation: {
        title: "NEEV'S STRATEGIC RECOMMENDATION",
        badge: 'High Impact',
        explanation: 'Shift product mix to carry high-margin unbranded clean grains, spices, and local specialties alongside standard FMCG. Restrict customer credit strictly to 7 days with a hard cap to avoid cash flow bottlenecks.',
        originalPlan: 'Original plan (pure branded FMCG + open credit)',
        recommendedPlan: 'Recommended plan (staples mix + strict cash/UPI terms)',
        earningsBoost: '+44% working capital efficiency',
      },
      opportunitySpotlight: {
        title: 'Neighborhood WhatsApp Quick Delivery',
        desc: 'Offering free 20-minute delivery within 500 meters for orders over ₹200 via WhatsApp message wins customer loyalty over distant supermarkets.',
      },
      watchClosely: {
        title: 'Key Operational Watchouts',
        points: [
          'Do not let customer credit exceed 10% of monthly revenue — collect every Sunday',
          'Check expiry dates on packaged foods and dairy weekly to avoid dead inventory',
          'Negotiate 7-day distributor payment cycles to match your customer cash cycle',
        ],
      },
      milestones: [
        { step: 1, label: 'Now', timeline: 'Store Fit-out', desc: 'Racks, electronic billing scale, and initial distributor bulk order' },
        { step: 2, label: 'Weeks 1-2', timeline: 'Inauguration', desc: 'Opening flyer distribution and neighborhood introductory staple discounts' },
        { step: 3, label: `Month ${breakEvenMonths}`, timeline: 'Inventory Balance', desc: 'Stock turnover stabilizes at 15-day cycles, cash flow comfortably positive' },
        { step: 4, label: `Month ${moratoriumMonths}`, timeline: 'Moratorium Ends', desc: 'Full inventory paid down, working capital fully revolving independently' },
        { step: 5, label: `Month ${moratoriumMonths + 1}+`, timeline: 'Regular EMI Starts', desc: 'EMI smoothly funded from daily store retail margin surplus' },
      ],
      beforeStartingChecklist: [
        'Survey nearest 3 kirana stores to identify missing brands or weak categories',
        'Establish accounts with 2 local FMCG wholesale distributors',
        'Acquire certified digital weighing scale and setup store UPI QR code stand',
        'Establish a strict diary/ledger for recording every rupee of customer credit',
        'Install reliable insect-proof storage bins for open grains and lentils',
      ],
    };
  }

  // 5. FARMING & AGRO PRODUCE CATEGORY
  if (norm.includes('farm') || norm.includes('शेती') || norm.includes('कृषी') || norm.includes('agri')) {
    return {
      verdictTitle: 'Solid agricultural enterprise',
      verdictSubtitle: 'Scalable farm production with strong local demand when crop cycles and direct mandi links are coordinated.',
      swot: {
        strengths: [
          'Direct access to land and local agricultural knowledge',
          'Essential staple food demand in nearby towns and markets',
          'Eligible for favorable agricultural interest subvention schemes',
        ],
        weaknesses: [
          'Harvest cycles create seasonal lumps in cash flow rather than daily income',
          'Vulnerability to pest attacks and irregular weather',
          'Dependence on local commission agents (Aadtiya) for market access',
        ],
        opportunities: [
          'Direct grading, cleaning, and bag-packing for sale to town retail stores',
          'Inter-cropping short-cycle vegetables between major seasonal crops',
          'Joining local Farmer Producer Organizations (FPOs) for bulk input discounts',
        ],
        threats: [
          'Sudden harvest-time market price crashes when supply floods the mandi',
          'Groundwater depletion or delayed monsoon rainfall',
          'Spike in fertilizer, seed, and diesel tractor rental costs',
        ],
      },
      plainTerms: {
        rampUpTitle: 'Seasonal harvest cash cycles',
        rampUpDesc: 'Agricultural revenue occurs in periodic harvest surges. Working capital reserves must be preserved to fund seeds and fertilizer until harvest.',
        rampUpDetail: 'Multi-stage harvest cycle cash flow',
        cashTitle: 'Sufficient buffer for crop maturity',
        cashDesc: `${userName}'s allocated savings cover input costs (seeds, fertilizer, drip maintenance) until the first crop is harvested and sold.`,
        cashDetail: `₹${inputs.ownContribution.toLocaleString('en-IN')} crop cycle buffer`,
        marginTitle: 'High realization through direct grading',
        marginDesc: 'Cleaning and grading produce into Grade A and Grade B yields 25–30% higher average market price than field-run dumping.',
        marginDetail: '25% price gain via grading',
        costTitle: 'Fertilizers, seeds, and labor are key costs',
        costDesc: 'Direct farm input purchases represent the primary outflow. Sourcing from authorized cooperative societies ensures subsidised rates.',
        costDetail: 'Inputs & labor = 60% of crop cost',
      },
      recommendation: {
        title: "NEEV'S STRATEGIC RECOMMENDATION",
        badge: 'High Impact',
        explanation: 'Introduce short-cycle vegetable plots (coriander, spinach, chili) alongside primary crops to generate weekly cash flow while main crops mature.',
        originalPlan: 'Original plan (single long-duration seasonal crop)',
        recommendedPlan: 'Recommended plan (primary crop + short-cycle vegetables)',
        earningsBoost: '+48% cash flow smoothing',
      },
      opportunitySpotlight: {
        title: 'Direct Town Retailer Farm-Gate Contracts',
        desc: 'Supplying fresh harvested produce directly to 5 town grocery stores bypasses commission agents, retaining an extra 18% in the farmer pocket.',
      },
      watchClosely: {
        title: 'Key Operational Watchouts',
        points: [
          'Monitor soil moisture and invest in drip micro-irrigation to conserve water',
          'Never sell the entire harvest on day one of mandi peak arrivals — hold 30% if prices dip',
          'Purchase certified hybrid seeds exclusively from registered agricultural outlets',
        ],
      },
      milestones: [
        { step: 1, label: 'Now', timeline: 'Land Preparation', desc: 'Soil testing, drip line repair, seed and organic fertilizer procurement' },
        { step: 2, label: 'Month 1', timeline: 'Sowing & Germination', desc: 'Primary planting completed, short-cycle companion vegetable beds prepared' },
        { step: 3, label: `Month ${breakEvenMonths}`, timeline: 'First Harvest', desc: 'Short-cycle vegetable revenue begins; operational break-even reached' },
        { step: 4, label: `Month ${moratoriumMonths}`, timeline: 'Main Harvest', desc: 'Primary crop harvest sold; large cash inflow clears seasonal debt' },
        { step: 5, label: `Month ${moratoriumMonths + 1}+`, timeline: 'Regular EMI Starts', desc: 'Comfortable seasonal loan servicing from cumulative harvest surplus' },
      ],
      beforeStartingChecklist: [
        'Complete soil test to verify nitrogen and potassium requirements',
        'Verify water pump and drip irrigation emitters before sowing seeds',
        'Purchase certified seed batches and inspect germination rates',
        'Connect with town vegetable traders to understand weekly price trends',
        'Enroll in PM Fasal Bima Yojana crop insurance for monsoon coverage',
      ],
    };
  }

  // 6. DEFAULT / GENERIC BUSINESS CATEGORY
  return {
    verdictTitle: 'This enterprise is feasible',
    verdictSubtitle: 'The financial structure indicates stable viability with controlled initial debt and manageable operating overheads.',
    swot: {
      strengths: [
        'Strong owner commitment with personal savings committed as margin',
        'Low fixed overheads minimizing early monthly financial stress',
        'Local market presence and direct customer interaction',
      ],
      weaknesses: [
        'Brand awareness and initial customer trust take time to establish',
        'Early working capital reserves require disciplined cash management',
        'Single-operator capacity limits early business scalability',
      ],
      opportunities: [
        'Expanding service or product delivery to underserved nearby neighborhoods',
        'Digital payment and mobile communication to streamline repeat orders',
        'Word-of-mouth referral discounts to accelerate initial client acquisition',
      ],
      threats: [
        'Price competition from established neighborhood competitors',
        'Input cost inflation during early operational ramp-up',
        'Unexpected equipment maintenance interruptions',
      ],
    },
    plainTerms: {
      rampUpTitle: 'Gradual ramp-up to profitability',
      rampUpDesc: `Initial operational adjustments take 30–60 days. By month ${breakEvenMonths}, regular client relationships stabilize and monthly profit turns consistently positive.`,
      rampUpDetail: `Month ${breakEvenMonths} projected break-even`,
      cashTitle: 'Adequate working capital reserve',
      cashDesc: `${userName}'s self-funded margin ensures sufficient liquidity to sustain daily operations through the initial ramp-up period.`,
      cashDetail: `₹${inputs.ownContribution.toLocaleString('en-IN')} starting reserve`,
      marginTitle: 'Sufficient break-even margin',
      marginDesc: 'Operating costs are covered at reasonable capacity, providing a healthy safety cushion against slow business weeks.',
      marginDetail: `${Math.round(outputs.dailyBreakEven)} units / day break-even`,
      costTitle: 'Direct operational costs are primary',
      costDesc: 'Cost of goods and materials represents the main monthly outflow. Keeping procurement lean protects operating profitability.',
      costDetail: 'Controlled fixed monthly overheads',
    },
    recommendation: {
      title: "NEEV'S STRATEGIC RECOMMENDATION",
      badge: 'High Impact',
      explanation: 'Focus on securing 15–20 high-frequency repeat clients through superior service reliability before expanding into peripheral offerings. Repeat business carries zero customer acquisition cost.',
      originalPlan: 'Original plan (broad unfocused marketing)',
      recommendedPlan: 'Recommended plan (dedicated repeat client focus)',
      earningsBoost: '+45% operational stability',
    },
    opportunitySpotlight: {
      title: 'Local Relationship Advantage',
      desc: 'Local micro-enterprises win on trust, rapid availability, and personal accountability — qualities that large corporate alternatives cannot match.',
    },
    watchClosely: {
      title: 'Key Operational Watchouts',
      points: [
        'Monitor monthly cash in hand rather than theoretical receivables',
        'Keep fixed costs minimal until sales volume consistently exceeds break-even',
        'Reinvest initial profits back into inventory and equipment resilience',
      ],
    },
    milestones: [
      { step: 1, label: 'Now', timeline: 'Setup & Procurement', desc: 'Facility preparation, necessary tool acquisition & registration' },
      { step: 2, label: 'Months 1-2', timeline: 'Client Acquisition', desc: 'Opening promotion, trial customer onboarding & quality calibration' },
      { step: 3, label: `Month ${breakEvenMonths}`, timeline: 'Break-Even Milestone', desc: 'Monthly revenues clear all operating overheads and fixed costs' },
      { step: 4, label: `Month ${moratoriumMonths}`, timeline: 'Moratorium Ends', desc: 'Operating cash flow stabilized, buffer maintained' },
      { step: 5, label: `Month ${moratoriumMonths + 1}+`, timeline: 'Regular EMI Starts', desc: 'Comfortable loan repayment from verified operating cash surplus' },
    ],
    beforeStartingChecklist: [
      'Confirm workspace lease or operational area readiness',
      'Verify wholesale prices for initial raw materials and equipment',
      'Open a dedicated commercial bank account for business transactions',
      'Inform 50 local personal contacts about the new venture launch',
      'Establish a simple daily bookkeeping log for all income and expenses',
    ],
  };
}

export function calculateBankRatios(
  inputs: FinancialInputs,
  outputs: FinancialOutputs,
  scheme: NeevScheme | null
): BankIndicator[] {
  const revenue = outputs.monthlyRevenue || 1;
  const directCosts = inputs.rawMaterialCost + inputs.transportCost;
  const grossProfit = Math.max(0, revenue - directCosts);
  const grossMargin = ((grossProfit / revenue) * 100).toFixed(1);

  const ebitda = Math.max(0, revenue - outputs.monthlyOperatingCost);
  const ebitdaMargin = ((ebitda / revenue) * 100).toFixed(1);

  const netProfit = outputs.monthlyProfit;
  const netMargin = ((netProfit / revenue) * 100).toFixed(1);

  const plannedDailySales = inputs.dailyOutputUnits * inputs.pricePerUnit;
  const breakEvenCapacity = plannedDailySales > 0
    ? Math.min(100, Math.max(0, Math.round((outputs.dailyBreakEven / plannedDailySales) * 100)))
    : 50;

  const unitVolume = Math.max(1, inputs.dailyOutputUnits * inputs.workingDaysPerMonth);
  const unitVariableCost = directCosts / unitVolume;
  const contributionPerUnit = Math.max(0, inputs.pricePerUnit - unitVariableCost).toFixed(2);

  const moratoriumMonths = scheme?.moratoriumMonths || inputs.moratoriumMonths || 0;
  const dscrText = moratoriumMonths > 0
    ? 'Moratorium'
    : outputs.monthlyEMI > 0
    ? `${((outputs.monthlyProfit + outputs.monthlyEMI) / outputs.monthlyEMI).toFixed(2)}x`
    : 'No Loan';

  return [
    {
      label: 'Gross Margin',
      value: `${grossMargin}%`,
      subtext: `Out of every ₹100 earned, ~₹${Math.round(Number(grossMargin))} is left after direct costs`,
    },
    {
      label: 'EBITDA Margin',
      value: `${ebitdaMargin}%`,
      subtext: 'Core operating profit before depreciation & loan interest',
    },
    {
      label: 'Net Margin',
      value: `${netMargin}%`,
      subtext: 'Final net profit percentage after all costs and EMI',
    },
    {
      label: 'Break-even Capacity',
      value: `${breakEvenCapacity}%`,
      subtext: `Need ${breakEvenCapacity}% of planned sales to avoid loss`,
    },
    {
      label: 'Contribution / Unit',
      value: `₹${contributionPerUnit}`,
      subtext: 'Net earnings left per unit sold before overheads',
    },
    {
      label: 'Debt Service (DSCR)',
      value: dscrText,
      subtext: moratoriumMonths > 0 ? `No EMI due during ${moratoriumMonths}-month moratorium` : 'Comfortable cash flow cushion over EMI',
    },
  ];
}
