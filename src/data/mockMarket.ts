import type { MarketData, SwotItem, Language } from '../types';

export const mockMarketDataByLang: Record<Language, MarketData> = {
  en: {
    localDemand: 'Strong',
    competitorDensity: 'Moderate',
    customerOpportunity: 'Promising',
    priceRange: { min: 56, max: 80 },
    competitors: [
      { name: 'Nashik Dairy Centre', distance: '0.3 km', type: 'Milk retail', status: 'Established', source: 'local' },
      { name: 'Patil Milk Shop', distance: '0.7 km', type: 'Milk + curd', status: 'Medium', source: 'local' },
      { name: 'Fresh Farm Dairy', distance: '1.2 km', type: 'Milk + ghee', status: 'Large', source: 'govt' },
    ],
    revenueBreakdown: [
      { label: 'Home deliveries', percentage: 35, color: '#176B52' },
      { label: 'Local retail counter', percentage: 30, color: '#2C9C78' },
      { label: 'Tea stalls & hotels', percentage: 25, color: '#D9A441' },
      { label: 'Value-add (Curd/Paneer)', percentage: 10, color: '#C9674B' },
    ],
  },
  hi: {
    localDemand: 'मजबूत',
    competitorDensity: 'मध्यम',
    customerOpportunity: 'आशाजनक',
    priceRange: { min: 56, max: 80 },
    competitors: [
      { name: 'नाशिक डेयरी केंद्र', distance: '0.3 किमी', type: 'दूध खुदरा', status: 'स्थापित', source: 'local' },
      { name: 'पाटिल मिल्क शॉप', distance: '0.7 किमी', type: 'दूध + दही', status: 'मध्यम', source: 'local' },
      { name: 'ताज़ा फार्म डेयरी', distance: '1.2 किमी', type: 'दूध + घी', status: 'बड़ा', source: 'govt' },
    ],
    revenueBreakdown: [
      { label: 'घरपोच डिलीवरी', percentage: 35, color: '#176B52' },
      { label: 'स्थानीय काउंटर बिक्री', percentage: 30, color: '#2C9C78' },
      { label: 'चाय की दुकानें व होटल', percentage: 25, color: '#D9A441' },
      { label: 'अन्य उत्पाद (दही/पनीर)', percentage: 10, color: '#C9674B' },
    ],
  },
  mr: {
    localDemand: 'उत्कृष्ट',
    competitorDensity: 'मध्यम',
    customerOpportunity: 'आशादायी',
    priceRange: { min: 56, max: 80 },
    competitors: [
      { name: 'नाशिक डेअरी सेंटर', distance: '0.3 किमी', type: 'दूध विक्री', status: 'जुने / स्थापित', source: 'local' },
      { name: 'पाटील मिल्क शॉप', distance: '0.7 किमी', type: 'दूध + दही', status: 'मध्यम', source: 'local' },
      { name: 'फ्रेश फार्म डेअरी', distance: '1.2 किमी', type: 'दूध + तूप', status: 'मोठे केंद्र', source: 'govt' },
    ],
    revenueBreakdown: [
      { label: 'घरपोच वितरण', percentage: 35, color: '#176B52' },
      { label: 'दुकान विक्री', percentage: 30, color: '#2C9C78' },
      { label: 'हॉटेल व चहा दुकाने', percentage: 25, color: '#D9A441' },
      { label: 'मूल्यवर्धित (दही/पनीर)', percentage: 10, color: '#C9674B' },
    ],
  },
};

export const mockSwotDataByLang: Record<Language, SwotItem[]> = {
  en: [
    {
      title: 'Strengths',
      items: ['Local demand is strong', 'You have existing regular buyers', 'Low machinery entry cost'],
      color: '#2C9C78',
      bgColor: '#EBF7F3',
      borderColor: '#B8DFD4',
      icon: '◆',
    },
    {
      title: 'Watch closely',
      items: ['Competition is moderate', 'Milk price seasonal changes', 'Cold chain consistency'],
      color: '#D9A441',
      bgColor: '#FFF8EC',
      borderColor: '#F5D88A',
      icon: '◎',
    },
    {
      title: 'Opportunities',
      items: ['Morning home delivery subscription', 'Bulk supply to tea stalls & hotels', 'Value-add: curd, paneer & ghee'],
      color: '#176B52',
      bgColor: '#EBF7F3',
      borderColor: '#B8DFD4',
      icon: '↗',
    },
    {
      title: 'Local threats',
      items: ['Price undercutting by middlemen', 'Summer milk production dips', 'New neighborhood entrants'],
      color: '#C9674B',
      bgColor: '#FEF3ED',
      borderColor: '#F5C4B0',
      icon: '◌',
    },
  ],
  hi: [
    {
      title: 'मजबूत पक्ष (Strengths)',
      items: ['स्थानीय मांग बहुत अच्छी है', 'आपके पास पहले से नियमित ग्राहक हैं', 'शुरुआती मशीनरी लागत कम है'],
      color: '#2C9C78',
      bgColor: '#EBF7F3',
      borderColor: '#B8DFD4',
      icon: '◆',
    },
    {
      title: 'ध्यान देने योग्य (Watch closely)',
      items: ['प्रतिस्पर्धा मध्यम स्तर पर है', 'दूध की कीमतों में मौसमी बदलाव', 'गुणवत्ता और शीतलन बनाए रखना'],
      color: '#D9A441',
      bgColor: '#FFF8EC',
      borderColor: '#F5D88A',
      icon: '◎',
    },
    {
      title: 'अवसर (Opportunities)',
      items: ['सुबह की होम डिलीवरी सेवा', 'होटल और चाय की दुकानों को थोक आपूर्ति', 'दही, पनीर और घी उत्पाद बनाना'],
      color: '#176B52',
      bgColor: '#EBF7F3',
      borderColor: '#B8DFD4',
      icon: '↗',
    },
    {
      title: 'संभावित जोखिम (Local threats)',
      items: ['दलालों द्वारा कीमतों में कटौती', 'गर्मियों में दूध उत्पादन में कमी', 'नए प्रतिस्पर्धियों का प्रवेश'],
      color: '#C9674B',
      bgColor: '#FEF3ED',
      borderColor: '#F5C4B0',
      icon: '◌',
    },
  ],
  mr: [
    {
      title: 'सकारात्मक बाजू (Strengths)',
      items: ['परिसरात दूधाला मोठी मागणी आहे', 'तुमच्याकडे आधीच नियमित ग्राहक आहेत', 'सुरुवातीचा यंत्रसामग्री खर्च कमी आहे'],
      color: '#2C9C78',
      bgColor: '#EBF7F3',
      borderColor: '#B8DFD4',
      icon: '◆',
    },
    {
      title: 'लक्ष ठेवा (Watch closely)',
      items: ['स्पर्धा मध्यम स्वरूपाची आहे', 'दूध दरातील हंगामी बदल', 'दूध साठवण व दर्जा सातत्य'],
      color: '#D9A441',
      bgColor: '#FFF8EC',
      borderColor: '#F5D88A',
      icon: '◎',
    },
    {
      title: 'संधी (Opportunities)',
      items: ['सकाळचे घरपोच दूध वाटप वर्गणी', 'हॉटेल व चहा टपरींना घाऊक पुरवठा', 'दही, पनीर व तूप निर्मिती विस्तार'],
      color: '#176B52',
      bgColor: '#EBF7F3',
      borderColor: '#B8DFD4',
      icon: '↗',
    },
    {
      title: 'धोके (Local threats)',
      items: ['मध्यस्थांकडून दरांवर दबाव', 'उन्हाळ्यात दूध उत्पादनातील घट', 'नवीन स्पर्धकांचे आगमन'],
      color: '#C9674B',
      bgColor: '#FEF3ED',
      borderColor: '#F5C4B0',
      icon: '◌',
    },
  ],
};

export const mockMarketData = mockMarketDataByLang.en;
export const mockSwotData = mockSwotDataByLang.en;

export function getMockMarketData(lang: Language): MarketData {
  return mockMarketDataByLang[lang] || mockMarketDataByLang.en;
}

export function getMockSwotData(lang: Language): SwotItem[] {
  return mockSwotDataByLang[lang] || mockSwotDataByLang.en;
}
