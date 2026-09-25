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
    availableCapital: 14000,
    potentialBusiness: 'डेअरी / दूध संकलन आणि घरपोच विक्री',
    brainDumpText:
      'मला नाशिकमध्ये दूध संकलन केंद्र सुरू करायचे आहे. माझ्याकडे सुमारे ₹1,20,000 बचत आहे. स्थानिक शेतकऱ्यांकडून दूध गोळा करून घरपोच आणि दुकानाद्वारे ग्राहकांना विकायची माझी योजना आहे.',
  },
  gu: {
    category: '[GU] Dairy',
    name: '[GU] Milk Collection & Retail Centre',
    location: 'Nashik',
    state: 'Maharashtra',
    availableCapital: 14000,
    potentialBusiness: '[GU] Dairy / Milk Collection & Retail',
    brainDumpText: '[GU] I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings and want to collect milk from local farmers and sell it to customers through home delivery and local shop.',
  },
  ta: {
    category: 'பால் பண்ணை',
    name: 'பால் சேகரிப்பு மற்றும் சில்லறை விற்பனை மையம்',
    location: 'Nashik',
    state: 'Maharashtra',
    availableCapital: 14000,
    potentialBusiness: 'பால் பண்ணை / பால் சேகரிப்பு மற்றும் விற்பனை',
    brainDumpText: 'நாசிக் நகரில் பால் சேகரிப்பு மையத்தைத் தொடங்க விரும்புகிறேன். என்னிடம் சுமார் ₹1,20,000 சேமிப்பு உள்ளது, மேலும் உள்ளூர் விவசாயிகளிடம் இருந்து பாலைச் சேகரித்து வீட்டு விநியோகம் மற்றும் உள்ளூர் கடை மூலம் வாடிக்கையாளர்களுக்கு விற்க விரும்புகிறேன்.',
  },
  te: {
    category: '[TE] Dairy',
    name: '[TE] Milk Collection & Retail Centre',
    location: 'Nashik',
    state: 'Maharashtra',
    availableCapital: 14000,
    potentialBusiness: '[TE] Dairy / Milk Collection & Retail',
    brainDumpText: '[TE] I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings and want to collect milk from local farmers and sell it to customers through home delivery and local shop.',
  },
  ml: {
    category: '[ML] Dairy',
    name: '[ML] Milk Collection & Retail Centre',
    location: 'Nashik',
    state: 'Maharashtra',
    availableCapital: 14000,
    potentialBusiness: '[ML] Dairy / Milk Collection & Retail',
    brainDumpText: '[ML] I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings and want to collect milk from local farmers and sell it to customers through home delivery and local shop.',
  },
  kn: {
    category: '[KN] Dairy',
    name: '[KN] Milk Collection & Retail Centre',
    location: 'Nashik',
    state: 'Maharashtra',
    availableCapital: 14000,
    potentialBusiness: '[KN] Dairy / Milk Collection & Retail',
    brainDumpText: '[KN] I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings and want to collect milk from local farmers and sell it to customers through home delivery and local shop.',
  },
  tulu: {
    category: '[TULU] Dairy',
    name: '[TULU] Milk Collection & Retail Centre',
    location: 'Nashik',
    state: 'Maharashtra',
    availableCapital: 14000,
    potentialBusiness: '[TULU] Dairy / Milk Collection & Retail',
    brainDumpText: '[TULU] I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings and want to collect milk from local farmers and sell it to customers through home delivery and local shop.',
  },
  pa: {
    category: '[PA] Dairy',
    name: '[PA] Milk Collection & Retail Centre',
    location: 'Nashik',
    state: 'Maharashtra',
    availableCapital: 14000,
    potentialBusiness: '[PA] Dairy / Milk Collection & Retail',
    brainDumpText: '[PA] I want to open a milk collection centre in Nashik. I have about ₹1,20,000 savings and want to collect milk from local farmers and sell it to customers through home delivery and local shop.',
  },
};

export const mockBusiness: Business = mockBusinessByLang.en;

export function getMockBusiness(lang: Language): Business {
  return mockBusinessByLang[lang] || mockBusinessByLang.en;
}
