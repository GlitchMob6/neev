import type { Business, Language } from '../types';

export const mockBusinessByLang: Record<Language, Business> = {
  en: {
    category: 'Dairy',
    name: 'Milk Collection & Retail Centre',
    location: 'Nashik',
    state: 'Maharashtra',
    availableCapital: 120000,
    potentialBusiness: 'Dairy / Milk Collection & Retail',
    brainDumpText:
      'I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings and want to collect milk from local farmers and sell it to customers through home delivery and local shop.',
  },
  hi: {
    category: 'डेयरी / दुग्ध व्यवसाय',
    name: 'दूध संकलन और खुदरा केंद्र',
    location: 'नाशिक',
    state: 'महाराष्ट्र',
    availableCapital: 120000,
    potentialBusiness: 'डेयरी / दूध संकलन और खुदरा बिक्री',
    brainDumpText:
      'मैं नाशिक में एक दूध संकलन केंद्र शुरू करना चाहता हूँ। मेरे पास लगभग ₹1,20,000 की बचत है और मैं स्थानीय किसानों से दूध एकत्र करके होम डिलीवरी और दुकान के माध्यम से बेचना चाहता हूँ।',
  },
  mr: {
    category: 'दुग्ध व्यवसाय / डेअरी',
    name: 'दूध संकलन व किरकोळ विक्री केंद्र',
    location: 'नाशिक',
    state: 'महाराष्ट्र',
    availableCapital: 120000,
    potentialBusiness: 'डेअरी / दूध संकलन आणि घरपोच विक्री',
    brainDumpText:
      'मला नाशिकमध्ये दूध संकलन केंद्र सुरू करायचे आहे. माझ्याकडे सुमारे ₹1,20,000 बचत आहे. स्थानिक शेतकऱ्यांकडून दूध गोळा करून घरपोच आणि दुकानाद्वारे ग्राहकांना विकायची माझी योजना आहे.',
  },
};

export const mockBusiness: Business = mockBusinessByLang.en;

export function getMockBusiness(lang: Language): Business {
  return mockBusinessByLang[lang] || mockBusinessByLang.en;
}
