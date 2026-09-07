/**
 * Bhashini page/section explanation content
 * Used by the floating assistant to explain the current context
 */

export interface PageExplanation {
  page: string;
  overview: string;
  sections?: { id: string; explanation: string }[];
}

export const bhashiniExplanations: Record<string, PageExplanation> = {
  scorecard: {
    page: 'scorecard',
    overview: 'Is page mein aap apne business ki poori assessment dekh sakte hain — aapki samajh, USP, aur business viability.',
    sections: [
      { id: 'understanding', explanation: 'Yeh score batata hai ki aap apne market aur business ko kitna achha samajhte hain.' },
      { id: 'usp', explanation: 'Yeh aapke business ka sabse khaas feature hai — jo aapko doosron se alag banata hai.' },
      { id: 'viability', explanation: 'Yeh indicators batate hain ki aapka business kitna viable hai — demand, competition, aur profit potential.' },
      { id: 'loanIntent', explanation: 'Yahan aap decide kar sakte hain ki loan lena chahte hain ya nahi.' },
      { id: 'scheme', explanation: 'Aapke total requirement ke hisaab se yeh scheme suggest ki gayi hai.' },
      { id: 'capitalMargin', explanation: 'Yeh dikhata hai ki aapko kitna invest karna hoga aur kitna loan milega.' },
      { id: 'emi', explanation: 'Yeh aapki estimated monthly EMI hai jo loan tenure ke dauran deni hogi.' },
      { id: 'repayment', explanation: 'Yeh plan batata hai ki aapka loan kaise repay hoga — month by month.' },
    ],
  },
  dashboard: {
    page: 'dashboard',
    overview: 'Yeh aapka business dashboard hai. Yahan se aap quick actions le sakte hain aur tools access kar sakte hain.',
    sections: [],
  },
  reports: {
    page: 'reports',
    overview: 'Is section mein aap apne business ki financial health, market position aur repayment situation ko samajh sakte hain.',
    sections: [
      { id: 'businessSnapshot', explanation: 'Aapke business ki basic jaankari — naam, location, category.' },
      { id: 'marketUnderstanding', explanation: 'Aapke area mein demand, competition aur opportunity ka overview.' },
      { id: 'reportViability', explanation: 'Aapke business ki viability ka score aur breakdown.' },
      { id: 'financialPicture', explanation: 'Project cost, revenue, EMI aur profit ka snapshot.' },
      { id: 'financingRec', explanation: 'Agar aapne loan liya hai, toh yahan financing ki details hain.' },
      { id: 'reportUsp', explanation: 'Aapke business ka unique selling point.' },
      { id: 'yourCorner', explanation: 'Yahan se aap apni report PDF ya Excel mein download kar sakte hain.' },
    ],
  },
  processing: {
    page: 'processing',
    overview: 'Neev aapke jawaabon ko samajh raha hai aur aapka scorecard taiyaar kar raha hai.',
    sections: [],
  },
  wizard: {
    page: 'wizard',
    overview: 'In sawaalon ke jawab dein — yeh aapke business ko samajhne mein madad karenge.',
    sections: [],
  },
  heard: {
    page: 'heard',
    overview: 'Neev ne aapki baat suni hai. Yeh jaankari sahi hai ya kuch badalna hai?',
    sections: [],
  },
};
