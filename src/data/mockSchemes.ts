import type { Scheme, User, Business } from '../types';

export const mockSchemes: Scheme[] = [
  {
    id: 'pm-mudra',
    nameKey: 'scheme.mudra.name',
    shortDescKey: 'scheme.mudra.desc',
    intendedForKey: 'scheme.mudra.target',
    loanRangeKey: 'scheme.mudra.range',
    primaryBenefitKey: 'scheme.mudra.benefit',
    tags: ['loan', 'micro', 'startup', 'general'],
    documentsKey: 'scheme.mudra.docs',
    processKey: 'scheme.mudra.process',
    considerationsKey: 'scheme.mudra.considerations',
  },
  {
    id: 'pmegp',
    nameKey: 'scheme.pmegp.name',
    shortDescKey: 'scheme.pmegp.desc',
    intendedForKey: 'scheme.pmegp.target',
    loanRangeKey: 'scheme.pmegp.range',
    primaryBenefitKey: 'scheme.pmegp.benefit',
    tags: ['manufacturing', 'subsidy', 'expansion', 'food', 'dairy'],
    documentsKey: 'scheme.pmegp.docs',
    processKey: 'scheme.pmegp.process',
    considerationsKey: 'scheme.pmegp.considerations',
  },
  {
    id: 'standup-india',
    nameKey: 'scheme.standup.name',
    shortDescKey: 'scheme.standup.desc',
    intendedForKey: 'scheme.standup.target',
    loanRangeKey: 'scheme.standup.range',
    primaryBenefitKey: 'scheme.standup.benefit',
    tags: ['women', 'sc_st', 'greenfield'],
    documentsKey: 'scheme.standup.docs',
    processKey: 'scheme.standup.process',
    considerationsKey: 'scheme.standup.considerations',
  },
  {
    id: 'mudra-mahila',
    nameKey: 'scheme.mudramahila.name',
    shortDescKey: 'scheme.mudramahila.desc',
    intendedForKey: 'scheme.mudramahila.target',
    loanRangeKey: 'scheme.mudramahila.range',
    primaryBenefitKey: 'scheme.mudramahila.benefit',
    tags: ['women', 'interest_rebate', 'micro'],
    documentsKey: 'scheme.mudra.docs',
    processKey: 'scheme.mudra.process',
    considerationsKey: 'scheme.mudra.considerations',
  },
  {
    id: 'shg-mahila-livelihood',
    nameKey: 'scheme.shgmahila.name',
    shortDescKey: 'scheme.shgmahila.desc',
    intendedForKey: 'scheme.shgmahila.target',
    loanRangeKey: 'scheme.shgmahila.range',
    primaryBenefitKey: 'scheme.shgmahila.benefit',
    tags: ['women', 'shg', 'subsidy', 'microfinance'],
    documentsKey: 'scheme.mudra.docs',
    processKey: 'scheme.mudra.process',
    considerationsKey: 'scheme.mudra.considerations',
  },
  {
    id: 'cgtmse',
    nameKey: 'scheme.cgtmse.name',
    shortDescKey: 'scheme.cgtmse.desc',
    intendedForKey: 'scheme.cgtmse.target',
    loanRangeKey: 'scheme.cgtmse.range',
    primaryBenefitKey: 'scheme.cgtmse.benefit',
    tags: ['collateral_free', 'sme', 'credit_guarantee', 'general'],
    documentsKey: 'scheme.cgtmse.docs',
    processKey: 'scheme.cgtmse.process',
    considerationsKey: 'scheme.cgtmse.considerations',
  },
  {
    id: 'pm-vishwakarma',
    nameKey: 'scheme.vishwakarma.name',
    shortDescKey: 'scheme.vishwakarma.desc',
    intendedForKey: 'scheme.vishwakarma.target',
    loanRangeKey: 'scheme.vishwakarma.range',
    primaryBenefitKey: 'scheme.vishwakarma.benefit',
    tags: ['artisan', 'craft', 'skill', 'manufacturing'],
    documentsKey: 'scheme.vishwakarma.docs',
    processKey: 'scheme.vishwakarma.process',
    considerationsKey: 'scheme.vishwakarma.considerations',
  },
];

export interface RecommendedSchemesResult {
  generalSchemes: Scheme[];
  womenSchemes: Scheme[];
  reason: string;
}

export function getRecommendedSchemes(
  user: User,
  business: Business,
  commonAnswers: Record<string, string> = {},
  _adaptiveAnswers: Record<string, string> = {}
): RecommendedSchemesResult {
  const isFemale = user.gender === 'female';
  const capital = business.availableCapital || 120000;
  const categoryNorm = (business.category || '').toLowerCase();

  // General schemes matching profile
  const general: Scheme[] = [];

  // PMMY Mudra fits almost all micro businesses
  const mudra = mockSchemes.find((s) => s.id === 'pm-mudra');
  if (mudra) general.push(mudra);

  // PMEGP fits manufacturing, food, dairy processing, and higher capital requirements
  const pmegp = mockSchemes.find((s) => s.id === 'pmegp');
  if (pmegp && (categoryNorm.includes('food') || categoryNorm.includes('dairy') || categoryNorm.includes('manufacturing') || capital >= 100000)) {
    general.push(pmegp);
  }

  // CGTMSE fits SME / collateral-free requirement
  const cgtmse = mockSchemes.find((s) => s.id === 'cgtmse');
  if (cgtmse && (capital >= 150000 || commonAnswers.fundingNeed === 'expansion_loan')) {
    general.push(cgtmse);
  }

  // Vishwakarma fits manufacturing / artisan / craft / service
  const vishwakarma = mockSchemes.find((s) => s.id === 'pm-vishwakarma');
  if (vishwakarma && (categoryNorm.includes('manufacturing') || categoryNorm.includes('service') || categoryNorm.includes('flower'))) {
    general.push(vishwakarma);
  }

  // If general has fewer than 2, ensure at least PMMY + CGTMSE
  if (general.length < 2 && cgtmse && !general.includes(cgtmse)) {
    general.push(cgtmse);
  }

  // Women-specific schemes (ONLY included if user.gender === 'female')
  const women: Scheme[] = [];
  if (isFemale) {
    const standup = mockSchemes.find((s) => s.id === 'standup-india');
    const mudraMahila = mockSchemes.find((s) => s.id === 'mudra-mahila');
    const shgMahila = mockSchemes.find((s) => s.id === 'shg-mahila-livelihood');

    if (mudraMahila) women.push(mudraMahila);
    if (shgMahila) women.push(shgMahila);
    if (standup && capital >= 100000) women.push(standup);
  }

  let reason = 'Based on your business profile, capital inputs, and location, these schemes provide maximum subsidy and collateral-free assistance.';
  if (isFemale) {
    reason = 'Based on your profile, you are eligible for standard business support as well as dedicated Women Entrepreneurship subsidies.';
  }

  return {
    generalSchemes: general,
    womenSchemes: women,
    reason,
  };
}
