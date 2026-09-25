export interface QuestionOption {
  value: string;
  labelKey: string;
  defaultLabel: string;
  icon?: string;
  subtext?: string;
}

export interface QuestionnaireQuestion {
  id: string;
  qKey: string;
  defaultQ: string;
  subKey: string;
  defaultSub: string;
  options: QuestionOption[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXACTLY 5 COMMON QUESTIONS (UNIVERSAL TO ALL ENTREPRENEURS)
// ═══════════════════════════════════════════════════════════════════════════════
export const COMMON_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'capital',
    qKey: 'q.common.capital.q',
    defaultQ: 'How much capital/savings do you currently have for this business?',
    subKey: 'q.common.capital.sub',
    defaultSub: 'Include your personal savings and contributions from family.',
    options: [
      {
        value: '35000',
        labelKey: 'q.common.capital.o1',
        defaultLabel: 'Under ₹50,000',
        icon: '💵',
        subtext: 'Small starting reserve',
      },
      {
        value: '100000',
        labelKey: 'q.common.capital.o2',
        defaultLabel: '₹50,000 to ₹1.5 Lakhs',
        icon: '💰',
        subtext: 'Moderate starting capital',
      },
      {
        value: '250000',
        labelKey: 'q.common.capital.o3',
        defaultLabel: '₹1.5 Lakhs to ₹5 Lakhs',
        icon: '🏦',
        subtext: 'Solid financial footing',
      },
      {
        value: '600000',
        labelKey: 'q.common.capital.o4',
        defaultLabel: 'More than ₹5 Lakhs',
        icon: '🌟',
        subtext: 'Substantial investment ready',
      },
    ],
  },
  {
    id: 'stage',
    qKey: 'q.common.stage.q',
    defaultQ: 'What is the current stage of your business?',
    subKey: 'q.common.stage.sub',
    defaultSub: 'Helps determine whether you need seed capital or growth financing.',
    options: [
      {
        value: 'idea',
        labelKey: 'q.common.stage.o1',
        defaultLabel: 'Just an idea / Starting completely fresh',
        icon: '🌱',
      },
      {
        value: 'early',
        labelKey: 'q.common.stage.o2',
        defaultLabel: 'Operating for under 1 year',
        icon: '🌿',
      },
      {
        value: 'established',
        labelKey: 'q.common.stage.o3',
        defaultLabel: 'Established for 1 to 3 years',
        icon: '🌳',
      },
      {
        value: 'expanding',
        labelKey: 'q.common.stage.o4',
        defaultLabel: 'Growing business looking to expand',
        icon: '🚀',
      },
    ],
  },
  {
    id: 'location',
    qKey: 'q.common.location.q',
    defaultQ: 'Where will your business operate from?',
    subKey: 'q.common.location.sub',
    defaultSub: 'Work space affects your fixed monthly rent and operational setup.',
    options: [
      {
        value: 'home',
        labelKey: 'q.common.location.o1',
        defaultLabel: 'From home or family farm (₹0 rent)',
        icon: '🏡',
      },
      {
        value: 'rented_small',
        labelKey: 'q.common.location.o2',
        defaultLabel: 'Rented shop/space (around ₹3,000–₹5,000/mo)',
        icon: '🏪',
      },
      {
        value: 'rented_medium',
        labelKey: 'q.common.location.o3',
        defaultLabel: 'Commercial roadside space (₹8,000–₹12,000/mo)',
        icon: '🏬',
      },
      {
        value: 'market_stall',
        labelKey: 'q.common.location.o4',
        defaultLabel: 'Weekly village haat or mobile delivery',
        icon: '🛺',
      },
    ],
  },
  {
    id: 'resources',
    qKey: 'q.common.resources.q',
    defaultQ: 'What existing tools or physical resources do you already own?',
    subKey: 'q.common.resources.sub',
    defaultSub: 'Any equipment or assets you currently have reduces your loan requirement.',
    options: [
      {
        value: 'basic_tools',
        labelKey: 'q.common.resources.o1',
        defaultLabel: 'Basic household tools only',
        icon: '🔨',
      },
      {
        value: 'shed_land',
        labelKey: 'q.common.resources.o2',
        defaultLabel: 'Own shed / land / basic building space',
        icon: '🧱',
      },
      {
        value: 'vehicle_machine',
        labelKey: 'q.common.resources.o3',
        defaultLabel: 'Two-wheeler / transport vehicle or machinery',
        icon: '🛵',
      },
      {
        value: 'scratch',
        labelKey: 'q.common.resources.o4',
        defaultLabel: 'Starting from scratch, need all equipment',
        icon: '📦',
      },
    ],
  },
  {
    id: 'fundingNeed',
    qKey: 'q.common.funding.q',
    defaultQ: 'What is your primary funding or business support requirement?',
    subKey: 'q.common.funding.sub',
    defaultSub: 'We match you with government subsidies and bank loans based on this.',
    options: [
      {
        value: 'equipment',
        labelKey: 'q.common.funding.o1',
        defaultLabel: 'Purchase machinery / animals / equipment',
        icon: '⚙️',
      },
      {
        value: 'working_capital',
        labelKey: 'q.common.funding.o2',
        defaultLabel: 'Daily working capital & stock inventory',
        icon: '📦',
      },
      {
        value: 'renovation',
        labelKey: 'q.common.funding.o3',
        defaultLabel: 'Shop setup, counter & storage facility',
        icon: '🏗️',
      },
      {
        value: 'expansion_loan',
        labelKey: 'q.common.funding.o4',
        defaultLabel: 'Comprehensive term loan with subsidy',
        icon: '📑',
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// EXACTLY 5 ADAPTIVE QUESTIONS (BUSINESS-SPECIFIC)
// ═══════════════════════════════════════════════════════════════════════════════
export const ADAPTIVE_QUESTION_SETS: Record<string, QuestionnaireQuestion[]> = {
  dairy: [
    {
      id: 'dairy_animals',
      qKey: 'q.dairy.animals.q',
      defaultQ: 'How many cows or buffaloes do you plan to handle or collect from?',
      subKey: 'q.dairy.animals.sub',
      defaultSub: 'Directly dictates your daily milk volume and chilling requirement.',
      options: [
        { value: '2-4', labelKey: 'q.dairy.animals.o1', defaultLabel: '2 to 4 milch animals', icon: '🐄' },
        { value: '5-10', labelKey: 'q.dairy.animals.o2', defaultLabel: '5 to 10 milch animals', icon: '🐄' },
        { value: '11-20', labelKey: 'q.dairy.animals.o3', defaultLabel: '11 to 20 animals', icon: '🥛' },
        { value: 'collector', labelKey: 'q.dairy.animals.o4', defaultLabel: 'Collecting from 15+ local farmers', icon: '👥' },
      ],
    },
    {
      id: 'dairy_production',
      qKey: 'q.dairy.production.q',
      defaultQ: 'What is your target daily milk collection or production volume?',
      subKey: 'q.dairy.production.sub',
      defaultSub: 'Used to calculate daily revenue and break-even litres.',
      options: [
        { value: '30', labelKey: 'q.dairy.production.o1', defaultLabel: '20 to 40 litres / day', icon: '🥛' },
        { value: '80', labelKey: 'q.dairy.production.o2', defaultLabel: '50 to 100 litres / day', icon: '🥛' },
        { value: '150', labelKey: 'q.dairy.production.o3', defaultLabel: '100 to 200 litres / day', icon: '🛢️' },
        { value: '300', labelKey: 'q.dairy.production.o4', defaultLabel: 'More than 200 litres / day', icon: '🚛' },
      ],
    },
    {
      id: 'dairy_fodder',
      qKey: 'q.dairy.fodder.q',
      defaultQ: 'How do you arrange green fodder and cattle feed?',
      subKey: 'q.dairy.fodder.sub',
      defaultSub: 'Feed makes up 60% of recurring dairy operating costs.',
      options: [
        { value: 'own_farm', labelKey: 'q.dairy.fodder.o1', defaultLabel: 'Own farm cultivated green fodder', icon: '🌾' },
        { value: 'mixed', labelKey: 'q.dairy.fodder.o2', defaultLabel: 'Own fodder + purchased cattle feed concentrate', icon: '📦' },
        { value: 'purchased', labelKey: 'q.dairy.fodder.o3', defaultLabel: 'Buying dry & green fodder from market', icon: '🛒' },
        { value: 'collection_only', labelKey: 'q.dairy.fodder.o4', defaultLabel: 'Collection centre only (no animal rearing)', icon: '🏪' },
      ],
    },
    {
      id: 'dairy_channel',
      qKey: 'q.dairy.channel.q',
      defaultQ: 'Where will you primarily sell your milk?',
      subKey: 'q.dairy.channel.sub',
      defaultSub: 'Direct customer retail gives higher realization than cooperative bulk.',
      options: [
        { value: 'home_delivery', labelKey: 'q.dairy.channel.o1', defaultLabel: 'Direct home delivery to regular households', icon: '🚴' },
        { value: 'tea_hotel', labelKey: 'q.dairy.channel.o2', defaultLabel: 'Bulk supply to tea stalls, hotels & sweet shops', icon: '☕' },
        { value: 'retail_counter', labelKey: 'q.dairy.channel.o3', defaultLabel: 'Local milk booth / retail counter', icon: '🏪' },
        { value: 'dairy_coop', labelKey: 'q.dairy.channel.o4', defaultLabel: 'District dairy cooperative federation', icon: '🏛️' },
      ],
    },
    {
      id: 'dairy_expansion',
      qKey: 'q.dairy.expansion.q',
      defaultQ: 'What is your most urgent equipment or expansion requirement?',
      subKey: 'q.dairy.expansion.sub',
      defaultSub: 'Matches with subsidy categories under AHIDF and MUDRA.',
      options: [
        { value: 'chiller', labelKey: 'q.dairy.expansion.o1', defaultLabel: 'Bulk milk cooling tank / aluminium cans', icon: '❄️' },
        { value: 'cows', labelKey: 'q.dairy.expansion.o2', defaultLabel: 'Purchasing high-yield milch cows/buffaloes', icon: '🐄' },
        { value: 'fat_tester', labelKey: 'q.dairy.expansion.o3', defaultLabel: 'Electronic fat testing machine & billing unit', icon: '🔬' },
        { value: 'value_add', labelKey: 'q.dairy.expansion.o4', defaultLabel: 'Equipment for Paneer, Curd & Ghee making', icon: '🧈' },
      ],
    },
  ],

  flower: [
    {
      id: 'flower_type',
      qKey: 'q.flower.type.q',
      defaultQ: 'What types of flowers do you cultivate or trade in?',
      subKey: 'q.flower.type.sub',
      defaultSub: 'Different flowers have different harvest cycles and price points.',
      options: [
        { value: 'marigold', labelKey: 'q.flower.type.o1', defaultLabel: 'Marigold (Zendu / गेंदा)', icon: '🌼' },
        { value: 'rose', labelKey: 'q.flower.type.o2', defaultLabel: 'Dutch & Desi Roses (गुलाब)', icon: '🌹' },
        { value: 'jasmine', labelKey: 'q.flower.type.o3', defaultLabel: 'Jasmine / Mogra (मोगरा / मल्लिका)', icon: '🌸' },
        { value: 'mixed', labelKey: 'q.flower.type.o4', defaultLabel: 'Mixed seasonal flowers & garland leaves', icon: '💐' },
      ],
    },
    {
      id: 'flower_area',
      qKey: 'q.flower.area.q',
      defaultQ: 'What is your cultivation area or sales retail footprint?',
      subKey: 'q.flower.area.sub',
      defaultSub: 'Determines expected yield and inventory scale.',
      options: [
        { value: 'half_acre', labelKey: 'q.flower.area.o1', defaultLabel: 'Half to 1 Acre farm land', icon: '🌱' },
        { value: 'two_acres', labelKey: 'q.flower.area.o2', defaultLabel: '1 to 3 Acres farm land', icon: '🌾' },
        { value: 'market_stall', labelKey: 'q.flower.area.o3', defaultLabel: 'Temple road / bazaar garland stall', icon: '🏪' },
        { value: 'polyhouse', labelKey: 'q.flower.area.o4', defaultLabel: 'Polyhouse / Shade-net protected structure', icon: '🏡' },
      ],
    },
    {
      id: 'flower_seasonality',
      qKey: 'q.flower.season.q',
      defaultQ: 'How is your production or sales scheduled through the year?',
      subKey: 'q.flower.season.sub',
      defaultSub: 'Helps calculate cash-flow cushions during off-peak months.',
      options: [
        { value: 'year_round', labelKey: 'q.flower.season.o1', defaultLabel: 'Year-round daily temple & regular supply', icon: '📅' },
        { value: 'festival_peaks', labelKey: 'q.flower.season.o2', defaultLabel: 'Ganesh, Diwali, Navratri festival peaks', icon: '🪔' },
        { value: 'wedding_events', labelKey: 'q.flower.season.o3', defaultLabel: 'Wedding decorator contracts & bulk events', icon: '🎉' },
        { value: 'seasonal', labelKey: 'q.flower.season.o4', defaultLabel: 'Winter & monsoon seasonal cultivation only', icon: '🌦️' },
      ],
    },
    {
      id: 'flower_resources',
      qKey: 'q.flower.resources.q',
      defaultQ: 'What water and post-harvest resources do you have available?',
      subKey: 'q.flower.resources.sub',
      defaultSub: 'Flower freshness is critical for securing premium market rates.',
      options: [
        { value: 'drip_well', labelKey: 'q.flower.resources.o1', defaultLabel: 'Borewell / Open well with drip irrigation', icon: '💧' },
        { value: 'shed_storage', labelKey: 'q.flower.resources.o2', defaultLabel: 'Basic shaded sorting and packing shed', icon: '🛖' },
        { value: 'cold_crate', labelKey: 'q.flower.resources.o3', defaultLabel: 'Ventilated transport crates & water sprayers', icon: '📦' },
        { value: 'need_irrigation', labelKey: 'q.flower.resources.o4', defaultLabel: 'Need to set up drip system & shade net', icon: '🛠️' },
      ],
    },
    {
      id: 'flower_channel',
      qKey: 'q.flower.channel.q',
      defaultQ: 'What is your primary sales and marketing channel?',
      subKey: 'q.flower.channel.sub',
      defaultSub: 'Direct customer sales yield up to 2x higher returns than commission agents.',
      options: [
        { value: 'mandi_wholesale', labelKey: 'q.flower.channel.o1', defaultLabel: 'District flower mandi / APMC auction', icon: '🏛️' },
        { value: 'direct_temple', labelKey: 'q.flower.channel.o2', defaultLabel: 'Direct daily contract with local temples', icon: '🛕' },
        { value: 'garland_stall', labelKey: 'q.flower.channel.o3', defaultLabel: 'Own roadside garland and bouquet stall', icon: '🌺' },
        { value: 'event_decorators', labelKey: 'q.flower.channel.o4', defaultLabel: 'Tie-ups with wedding & stage decorators', icon: '🎊' },
      ],
    },
  ],

  food: [
    {
      id: 'food_type',
      qKey: 'q.food.type.q',
      defaultQ: 'What category of food products will you specialize in?',
      subKey: 'q.food.type.sub',
      defaultSub: 'Focusing on a signature product reduces wastage and boosts word-of-mouth.',
      options: [
        { value: 'snacks', labelKey: 'q.food.type.o1', defaultLabel: 'Breakfast, Tea & Hot Snacks (Vada, Poha, Samosa)', icon: '🥟' },
        { value: 'tiffin_mess', labelKey: 'q.food.type.o2', defaultLabel: 'Daily Home-Style Meals & Tiffin Mess', icon: '🍱' },
        { value: 'sweets_bakery', labelKey: 'q.food.type.o3', defaultLabel: 'Sweets, Farsan & Bakery products', icon: '🍪' },
        { value: 'packaged_spices', labelKey: 'q.food.type.o4', defaultLabel: 'Pickles, Masalas & Traditional packaged snacks', icon: '🥫' },
      ],
    },
    {
      id: 'food_capacity',
      qKey: 'q.food.capacity.q',
      defaultQ: 'What is your planned daily customer serving capacity?',
      subKey: 'q.food.capacity.sub',
      defaultSub: 'Used to model raw ingredient purchase and daily gas/labor costs.',
      options: [
        { value: '30-50', labelKey: 'q.food.capacity.o1', defaultLabel: '30 to 50 customers / day', icon: '👥' },
        { value: '50-100', labelKey: 'q.food.capacity.o2', defaultLabel: '50 to 100 customers / day', icon: '👨‍👩‍👧‍👦' },
        { value: '100-250', labelKey: 'q.food.capacity.o3', defaultLabel: '100 to 250 customers / day', icon: '🏪' },
        { value: 'catering', labelKey: 'q.food.capacity.o4', defaultLabel: 'Bulk institutional & event catering', icon: '🍲' },
      ],
    },
    {
      id: 'food_equipment',
      qKey: 'q.food.equipment.q',
      defaultQ: 'What kitchen equipment do you currently have?',
      subKey: 'q.food.equipment.sub',
      defaultSub: 'Commercial burners and mixers significantly increase throughput.',
      options: [
        { value: 'home_kitchen', labelKey: 'q.food.equipment.o1', defaultLabel: 'Standard domestic stove and utensils', icon: '🍳' },
        { value: 'commercial_stove', labelKey: 'q.food.equipment.o2', defaultLabel: 'Commercial LPG burner & heavy kadai/pots', icon: '🔥' },
        { value: 'heavy_mixer', labelKey: 'q.food.equipment.o3', defaultLabel: 'Commercial grinder / dough kneader / oven', icon: '⚙️' },
        { value: 'need_all', labelKey: 'q.food.equipment.o4', defaultLabel: 'Need full commercial setup from scratch', icon: '🛒' },
      ],
    },
    {
      id: 'food_channel',
      qKey: 'q.food.channel.q',
      defaultQ: 'How will customers order and receive your food?',
      subKey: 'q.food.channel.sub',
      defaultSub: 'Delivery subscriptions guarantee upfront monthly revenue.',
      options: [
        { value: 'dine_in', labelKey: 'q.food.channel.o1', defaultLabel: 'Direct walk-in counter & quick seating', icon: '🪑' },
        { value: 'monthly_tiffin', labelKey: 'q.food.channel.o2', defaultLabel: 'Monthly advance tiffin subscriptions', icon: '📅' },
        { value: 'local_kirana', labelKey: 'q.food.channel.o3', defaultLabel: 'Wholesale packets to village kirana stores', icon: '🏬' },
        { value: 'market_stall', labelKey: 'q.food.channel.o4', defaultLabel: 'Mobile food van or bus stand kiosk', icon: '🚐' },
      ],
    },
    {
      id: 'food_expansion',
      qKey: 'q.food.expansion.q',
      defaultQ: 'What is your primary investment priority for this food venture?',
      subKey: 'q.food.expansion.sub',
      defaultSub: 'Matches with subsidy categories under PMFME and PMEGP.',
      options: [
        { value: 'kitchen_setup', labelKey: 'q.food.expansion.o1', defaultLabel: 'Commercial kitchen renovation & exhaust', icon: '🏗️' },
        { value: 'packaging_machine', labelKey: 'q.food.expansion.o2', defaultLabel: 'Pouch sealing machine & branded packaging', icon: '📦' },
        { value: 'fssai_cert', labelKey: 'q.food.expansion.o3', defaultLabel: 'FSSAI hygiene license & testing certification', icon: '📋' },
        { value: 'delivery_vehicle', labelKey: 'q.food.expansion.o4', defaultLabel: 'Two-wheeler with insulated delivery box', icon: '🛵' },
      ],
    },
  ],

  retail: [
    {
      id: 'retail_focus',
      qKey: 'q.retail.focus.q',
      defaultQ: 'What is the main specialty or product focus of your store?',
      subKey: 'q.retail.focus.sub',
      defaultSub: 'Determines initial wholesale distributor agreements.',
      options: [
        { value: 'grocery_staples', labelKey: 'q.retail.focus.o1', defaultLabel: 'Daily Kirana, Grains & Edible Oils', icon: '🌾' },
        { value: 'fmcg_packaged', labelKey: 'q.retail.focus.o2', defaultLabel: 'Packaged Snacks, Soaps & Cold drinks', icon: '🥤' },
        { value: 'cloth_garments', labelKey: 'q.retail.focus.o3', defaultLabel: 'Apparel, Footwear or Hardware items', icon: '👕' },
        { value: 'general_allied', labelKey: 'q.retail.focus.o4', defaultLabel: 'General store with stationeries & mobile recharge', icon: '📱' },
      ],
    },
    {
      id: 'retail_footfall',
      qKey: 'q.retail.footfall.q',
      defaultQ: 'What is the estimated daily customer footfall in your location?',
      subKey: 'q.retail.footfall.sub',
      defaultSub: 'Corner shops near temples or schools enjoy higher conversion.',
      options: [
        { value: '25', labelKey: 'q.retail.footfall.o1', defaultLabel: '20 to 50 visitors / day', icon: '🚶' },
        { value: '75', labelKey: 'q.retail.footfall.o2', defaultLabel: '50 to 100 visitors / day', icon: '👥' },
        { value: '150', labelKey: 'q.retail.footfall.o3', defaultLabel: '100 to 200 visitors / day', icon: '👨‍👩‍👧‍👦' },
        { value: 'busy_bazaar', labelKey: 'q.retail.footfall.o4', defaultLabel: 'Main junction bazaar (200+ daily)', icon: '🏬' },
      ],
    },
    {
      id: 'retail_sourcing',
      qKey: 'q.retail.sourcing.q',
      defaultQ: 'Where do you source your inventory goods from?',
      subKey: 'q.retail.sourcing.sub',
      defaultSub: 'Bulk wholesale purchases secure 5-12% higher profit margins.',
      options: [
        { value: 'town_wholesale', labelKey: 'q.retail.sourcing.o1', defaultLabel: 'Weekly visit to nearest city wholesale mandi', icon: '🚚' },
        { value: 'distributor_drop', labelKey: 'q.retail.sourcing.o2', defaultLabel: 'Company distributors delivery at shop door', icon: '📦' },
        { value: 'direct_farmers', labelKey: 'q.retail.sourcing.o3', defaultLabel: 'Buying grains directly from local farmers', icon: '🌾' },
        { value: 'credit_stockist', labelKey: 'q.retail.sourcing.o4', defaultLabel: 'Taking goods on 15-day supplier credit', icon: '📝' },
      ],
    },
    {
      id: 'retail_infrastructure',
      qKey: 'q.retail.infra.q',
      defaultQ: 'What store infrastructure is currently in place?',
      subKey: 'q.retail.infra.sub',
      defaultSub: 'Good lighting and display racks increase impulse sales.',
      options: [
        { value: 'basic_counter', labelKey: 'q.retail.infra.o1', defaultLabel: 'Basic wooden counter and wall shelves', icon: '🪵' },
        { value: 'refrigerator', labelKey: 'q.retail.infra.o2', defaultLabel: 'Commercial display cooler / deep freezer', icon: '🧊' },
        { value: 'pos_digital', labelKey: 'q.retail.infra.o3', defaultLabel: 'Digital weighing scale & UPI barcode stand', icon: '⚖️' },
        { value: 'need_fitout', labelKey: 'q.retail.infra.o4', defaultLabel: 'Empty room, need complete racks and shutter', icon: '🔨' },
      ],
    },
    {
      id: 'retail_expansion',
      qKey: 'q.retail.expansion.q',
      defaultQ: 'What is your single biggest business expansion need?',
      subKey: 'q.retail.expansion.sub',
      defaultSub: 'Working capital is the most common driver of retail growth.',
      options: [
        { value: 'bulk_stock', labelKey: 'q.retail.expansion.o1', defaultLabel: 'Capital to buy fast-moving items in bulk', icon: '💰' },
        { value: 'modern_racks', labelKey: 'q.retail.expansion.o2', defaultLabel: 'Modern steel display racks and lighting', icon: '🏪' },
        { value: 'extra_room', labelKey: 'q.retail.expansion.o3', defaultLabel: 'Expanding shop floor area or back storage', icon: '🚪' },
        { value: 'digital_billing', labelKey: 'q.retail.expansion.o4', defaultLabel: 'Computer billing & inventory barcode system', icon: '💻' },
      ],
    },
  ],

  farming: [
    {
      id: 'farming_crop',
      qKey: 'q.farm.crop.q',
      defaultQ: 'What is the primary agricultural produce you focus on?',
      subKey: 'q.farm.crop.sub',
      defaultSub: 'Horticulture and allied activities create regular income between grain seasons.',
      options: [
        { value: 'vegetables', labelKey: 'q.farm.crop.o1', defaultLabel: 'Vegetables (Tomato, Onion, Chilli, Brinjal)', icon: '🥦' },
        { value: 'cash_crops', labelKey: 'q.farm.crop.o2', defaultLabel: 'Cash Crops (Cotton, Sugarcane, Soybean)', icon: '🌾' },
        { value: 'allied_livestock', labelKey: 'q.farm.crop.o3', defaultLabel: 'Goat / Poultry farming & Agro-processing', icon: '🐔' },
        { value: 'fruit_orchard', labelKey: 'q.farm.crop.o4', defaultLabel: 'Fruit Orchard (Pomegranate, Guava, Grapes)', icon: '🍎' },
      ],
    },
    {
      id: 'farming_land',
      qKey: 'q.farm.land.q',
      defaultQ: 'What is your landholding and water availability situation?',
      subKey: 'q.farm.land.sub',
      defaultSub: 'Ensures eligibility for PM-KUSUM solar and micro-irrigation subsidies.',
      options: [
        { value: 'under_2acres', labelKey: 'q.farm.land.o1', defaultLabel: '1 to 2 Acres with dependable borewell/well', icon: '💧' },
        { value: '2-5acres', labelKey: 'q.farm.land.o2', defaultLabel: '2 to 5 Acres irrigated farm land', icon: '🌱' },
        { value: 'dryland', labelKey: 'q.farm.land.o3', defaultLabel: 'Rainfed / seasonal water availability', icon: '🌦️' },
        { value: 'leased_land', labelKey: 'q.farm.land.o4', defaultLabel: 'Cultivating on annual lease / partnership', icon: '🤝' },
      ],
    },
    {
      id: 'farming_machinery',
      qKey: 'q.farm.machinery.q',
      defaultQ: 'What farm equipment and machinery do you currently own?',
      subKey: 'q.farm.machinery.sub',
      defaultSub: 'Custom hiring centers or equipment subsidies can reduce manual strain.',
      options: [
        { value: 'tractor_owned', labelKey: 'q.farm.machinery.o1', defaultLabel: 'Tractor / Power tiller owned', icon: '🚜' },
        { value: 'power_sprayer', labelKey: 'q.farm.machinery.o2', defaultLabel: 'Motorized sprayer and small implements', icon: '🎒' },
        { value: 'hiring_rent', labelKey: 'q.farm.machinery.o3', defaultLabel: 'Rent tractors & machines on hourly basis', icon: '⏱️' },
        { value: 'bullock_manual', labelKey: 'q.farm.machinery.o4', defaultLabel: 'Manual implements & bullock farming', icon: '🐂' },
      ],
    },
    {
      id: 'farming_channel',
      qKey: 'q.farm.channel.q',
      defaultQ: 'Where do you currently sell your agricultural produce?',
      subKey: 'q.farm.channel.sub',
      defaultSub: 'Farmer Producer Companies (FPOs) and direct buyers increase price realization.',
      options: [
        { value: 'apmc_mandi', labelKey: 'q.farm.channel.o1', defaultLabel: 'Nearest APMC market yard via commission agent', icon: '🏛️' },
        { value: 'village_trader', labelKey: 'q.farm.channel.o2', defaultLabel: 'Farm gate sale to visiting village traders', icon: '🚛' },
        { value: 'fpo_group', labelKey: 'q.farm.channel.o3', defaultLabel: 'Farmer Producer Company (FPO) collective sale', icon: '👥' },
        { value: 'direct_consumer', labelKey: 'q.farm.channel.o4', defaultLabel: 'Direct weekly haats and city housing societies', icon: '🧺' },
      ],
    },
    {
      id: 'farming_expansion',
      qKey: 'q.farm.expansion.q',
      defaultQ: 'What is your primary technological or financial requirement?',
      subKey: 'q.farm.expansion.sub',
      defaultSub: 'Qualifies for state agriculture department subsidy schemes.',
      options: [
        { value: 'solar_pump', labelKey: 'q.farm.expansion.o1', defaultLabel: 'Solar water pump (PM-KUSUM subsidy)', icon: '☀️' },
        { value: 'drip_irrigation', labelKey: 'q.farm.expansion.o2', defaultLabel: 'Drip micro-irrigation system installation', icon: '💧' },
        { value: 'shade_polyhouse', labelKey: 'q.farm.expansion.o3', defaultLabel: 'Shade net house or protective fencing', icon: '🏡' },
        { value: 'storage_grading', labelKey: 'q.farm.expansion.o4', defaultLabel: 'On-farm onion/crop storage shed and grading', icon: '🛖' },
      ],
    },
  ],

  generic: [
    {
      id: 'gen_focus',
      qKey: 'q.gen.focus.q',
      defaultQ: 'What is the core product or service you offer?',
      subKey: 'q.gen.focus.sub',
      defaultSub: 'Clarifying your offering helps define your operational requirements.',
      options: [
        { value: 'custom_goods', labelKey: 'q.gen.focus.o1', defaultLabel: 'Physical goods / custom fabricated items', icon: '🔨' },
        { value: 'skilled_service', labelKey: 'q.gen.focus.o2', defaultLabel: 'Skilled technical or repair services', icon: '🔧' },
        { value: 'trading_supply', labelKey: 'q.gen.focus.o3', defaultLabel: 'Local distribution and product trading', icon: '📦' },
        { value: 'artisan_craft', labelKey: 'q.gen.focus.o4', defaultLabel: 'Traditional artisan or handicraft work', icon: '🎨' },
      ],
    },
    {
      id: 'gen_volume',
      qKey: 'q.gen.volume.q',
      defaultQ: 'What is your expected monthly order or customer volume?',
      subKey: 'q.gen.volume.sub',
      defaultSub: 'Used to calculate working capital and cash cycle length.',
      options: [
        { value: 'up_to_30', labelKey: 'q.gen.volume.o1', defaultLabel: 'Up to 30 jobs / orders per month', icon: '📋' },
        { value: '30-100', labelKey: 'q.gen.volume.o2', defaultLabel: '30 to 100 orders per month', icon: '📑' },
        { value: '100-300', labelKey: 'q.gen.volume.o3', defaultLabel: '100 to 300 orders per month', icon: '📦' },
        { value: 'high_volume', labelKey: 'q.gen.volume.o4', defaultLabel: 'Continuous ongoing contract volume', icon: '🏭' },
      ],
    },
    {
      id: 'gen_tools',
      qKey: 'q.gen.tools.q',
      defaultQ: 'What equipment and workspace are currently ready?',
      subKey: 'q.gen.tools.sub',
      defaultSub: 'Existing infrastructure lowers the upfront bank loan needed.',
      options: [
        { value: 'basic_handtools', labelKey: 'q.gen.tools.o1', defaultLabel: 'Basic manual tools and small home space', icon: '🧰' },
        { value: 'workshop_shed', labelKey: 'q.gen.tools.o2', defaultLabel: 'Dedicated workshop or rented work floor', icon: '🏗️' },
        { value: 'powered_machines', labelKey: 'q.gen.tools.o3', defaultLabel: 'Powered machinery and electrical connection', icon: '⚡' },
        { value: 'need_all', labelKey: 'q.gen.tools.o4', defaultLabel: 'Need full machinery and workspace setup', icon: '🛒' },
      ],
    },
    {
      id: 'gen_marketing',
      qKey: 'q.gen.marketing.q',
      defaultQ: 'How do you plan to acquire your primary customers?',
      subKey: 'q.gen.marketing.sub',
      defaultSub: 'Strong local recommendations generate the highest conversion.',
      options: [
        { value: 'word_of_mouth', labelKey: 'q.gen.marketing.o1', defaultLabel: 'Personal relationships and village word-of-mouth', icon: '🗣️' },
        { value: 'roadside_board', labelKey: 'q.gen.marketing.o2', defaultLabel: 'Prominent roadside shop board and bazaar footfall', icon: '🪧' },
        { value: 'subcontract_b2b', labelKey: 'q.gen.marketing.o3', defaultLabel: 'Sub-contracts from larger town enterprises', icon: '🤝' },
        { value: 'digital_whatsapp', labelKey: 'q.gen.marketing.o4', defaultLabel: 'WhatsApp groups and local mobile marketing', icon: '📱' },
      ],
    },
    {
      id: 'gen_expansion',
      qKey: 'q.gen.expansion.q',
      defaultQ: 'What is the most critical hurdle currently holding your business back?',
      subKey: 'q.gen.expansion.sub',
      defaultSub: 'This guides our financial packaging and scheme recommendation.',
      options: [
        { value: 'raw_material_fund', labelKey: 'q.gen.expansion.o1', defaultLabel: 'Upfront cash to purchase raw materials', icon: '💰' },
        { value: 'advanced_machine', labelKey: 'q.gen.expansion.o2', defaultLabel: 'Faster, higher-precision modern machine', icon: '⚙️' },
        { value: 'transport_logistics', labelKey: 'q.gen.expansion.o3', defaultLabel: 'Transport vehicle or larger working space', icon: '🚚' },
        { value: 'skill_compliance', labelKey: 'q.gen.expansion.o4', defaultLabel: 'Formal registration, training & certification', icon: '📜' },
      ],
    },
  ],
};

export function getAdaptiveQuestionsForCategory(category: string): QuestionnaireQuestion[] {
  const norm = category.toLowerCase();
  if (norm.includes('dairy') || norm.includes('दुग्ध') || norm.includes('डेअरी') || norm.includes('दूध')) {
    return ADAPTIVE_QUESTION_SETS.dairy;
  }
  if (norm.includes('flower') || norm.includes('फुल') || norm.includes('पुष्प') || norm.includes('हार')) {
    return ADAPTIVE_QUESTION_SETS.flower;
  }
  if (norm.includes('food') || norm.includes('खाद्य') || norm.includes('नाश्ता') || norm.includes('मेस') || norm.includes('टिफिन')) {
    return ADAPTIVE_QUESTION_SETS.food;
  }
  if (norm.includes('retail') || norm.includes('किराणा') || norm.includes('दुकान') || norm.includes('store')) {
    return ADAPTIVE_QUESTION_SETS.retail;
  }
  if (norm.includes('farm') || norm.includes('शेती') || norm.includes('कृषी') || norm.includes('agri')) {
    return ADAPTIVE_QUESTION_SETS.farming;
  }
  return ADAPTIVE_QUESTION_SETS.generic;
}
