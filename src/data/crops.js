/**
 * AgriMitra Crop Database
 * Comprehensive localized crop information for Telugu, Hindi, and English.
 * Farmer-friendly, practical agricultural guidance with verified real crop photographs.
 */

export const CROP_CATEGORIES = [
  'Cereals',
  'Pulses',
  'Oilseeds',
  'Cash crops',
  'Vegetables',
  'Spices',
];

export const CATEGORY_LABELS = {
  en: {
    Cereals: 'Cereals & Grains',
    Pulses: 'Pulses & Dals',
    Oilseeds: 'Oilseeds',
    'Cash crops': 'Cash Crops',
    Vegetables: 'Vegetables',
    Spices: 'Spices',
  },
  te: {
    Cereals: 'ధాన్యాలు (వరి, మొక్కజొన్న, గోధుమ)',
    Pulses: 'పప్పుధాన్యాలు (కందులు, శనగలు)',
    Oilseeds: 'నూనెగింజలు (వేరుశనగ, సోయాబీన్)',
    'Cash crops': 'వాణిజ్య పంటలు (పత్తి, చెరకు)',
    Vegetables: 'కూరగాయలు (టమోటా, ఉల్లి, మిరప)',
    Spices: 'సుగంధ ద్రవ్యాలు (పసుపు)',
  },
  hi: {
    Cereals: 'अनाज (धान, मक्का, गेहूँ)',
    Pulses: 'दलहन (अरहर, चना)',
    Oilseeds: 'तिलहन (मूंगफली, सरसों, सोयाबीन)',
    'Cash crops': 'नकदी फसलें (कपास, गन्ना)',
    Vegetables: 'सब्जियां (टमाटर, प्याज, मिर्च)',
    Spices: 'मसाले (हल्दी)',
  },
};

export const CROP_SEASONS = ['Kharif', 'Rabi', 'Zaid'];

export const SEASON_LABELS = {
  en: {
    Kharif: 'Kharif (Monsoon Crop)',
    Rabi: 'Rabi (Winter Crop)',
    Zaid: 'Zaid (Summer Crop)',
  },
  te: {
    Kharif: 'ఖరీఫ్ (వానాకాలపు పంటలు)',
    Rabi: 'రబీ (చలికాలపు పంటలు)',
    Zaid: 'జైద్ (వేసవి పంటలు)',
  },
  hi: {
    Kharif: 'खरीफ (मानसून फसल)',
    Rabi: 'रबी (सर्दियों की फसल)',
    Zaid: 'जायद (गर्मी की फसल)',
  },
};

export const INDIAN_STATES = [
  { id: 'ap', en: 'Andhra Pradesh', te: 'ఆంధ్రప్రదేశ్', hi: 'आंध्र प्रदेश' },
  { id: 'ts', en: 'Telangana', te: 'తెలంగాణ', hi: 'तेलंगाना' },
  { id: 'ka', en: 'Karnataka', te: 'కర్ణాటక', hi: 'कर्नाटक' },
  { id: 'tn', en: 'Tamil Nadu', te: 'తమిళనాడు', hi: 'तमिलनाडु' },
  { id: 'mh', en: 'Maharashtra', te: 'మహారాష్ట్ర', hi: 'महाराष्ट्र' },
  { id: 'mp', en: 'Madhya Pradesh', te: 'మధ్యప్రదేశ్', hi: 'मध्य प्रदेश' },
  { id: 'up', en: 'Uttar Pradesh', te: 'ఉత్తరప్రదేశ్', hi: 'उत्तर प्रदेश' },
  { id: 'pb', en: 'Punjab', te: 'పంజాబ్', hi: 'पंजाब' },
  { id: 'hr', en: 'Haryana', te: 'హర్యానా', hi: 'हरियाणा' },
  { id: 'gj', en: 'Gujarat', te: 'గుజరాత్', hi: 'गुजरात' },
  { id: 'rj', en: 'Rajasthan', te: 'రాజస్థాన్', hi: 'राजस्थान' },
  { id: 'or', en: 'Odisha', te: 'ఒడిశా', hi: 'ओडिशा' },
  { id: 'wb', en: 'West Bengal', te: 'పశ్చిమ బెంగాల్', hi: 'पश्चिम बंगाल' },
  { id: 'other', en: 'Other State', te: 'ఇతర రాష్ట్రం', hi: 'अन्य राज्य' },
];

export const CROPS = [
  {
    id: 'rice',
    names: { en: 'Rice / Paddy', te: 'వరి', hi: 'धान / चावल' },
    category: 'Cereals',
    seasons: ['Kharif', 'Rabi'],
    image: '/images/crops/rice.jpg',
    imageAlt: {
      en: 'Lush green rice paddy field in India with healthy growing rice stalks and water canal',
      te: 'వరి పొలంలో పచ్చగా ఏపుగా పెరుగుతున్న వరి పైరు మరియు కాలువ నీరు',
      hi: 'खेत में लहलहाती हरी धान की फसल और सिंचाई का पानी',
    },
    icon: '🌾',
    short: {
      en: 'Major food grain grown with assured water or good monsoon rains.',
      te: 'నీటి వసతి లేదా సమృద్ధిగా వర్షాలు ఉన్నప్పుడు సాగు చేసే ముఖ్యమైన ఆహార పంట.',
      hi: 'पानी की अच्छी सुविधा या मानसून में उगाई जाने वाली प्रमुख खाद्यान्न फसल।',
    },
    description: {
      en: 'Rice is grown across wetlands and canal irrigated areas. Careful water management, transplanting healthy seedlings on time, and monitoring early weeds are key to getting high yields.',
      te: 'వరి మన తెలుగు నేలలో అత్యంత ముఖ్యమైన ప్రధాన ఆహార పంట. నారుమడి పోసిన 25-30 రోజుల్లో నాట్లు వేయడం, పిలకలు తొడిగే దశలో మరియు ఈనె దశలో పొలంలో తగినంత నీరు నిలకడగా ఉంచడం వల్ల మంచి దిగుబడి వస్తుంది.',
      hi: 'धान हमारे देश की प्रमुख फसल है। स्वस्थ नर्सरी तैयार कर सही समय पर रोपाई करना, कल्ले फूटते समय और बालियां निकलते समय खेत में पर्याप्त पानी बनाए रखना अच्छी पैदावार के लिए जरूरी है।',
    },
    growthStages: {
      en: ['Nursery Sowing', 'Transplanting', 'Tillering', 'Panicle Initiation', 'Flowering', 'Grain Filling', 'Harvest'],
      te: ['నారుమడి పోయుట', 'నాట్లు వేయుట', 'పిలకలు పెట్టే దశ', 'ఈనె కట్టే దశ', 'పూత దశ', 'గింజ పాలుపోసుకునే దశ', 'కోత కోయుట'],
      hi: ['नर्सरी बुवाई', 'रोपाई', 'कल्ले फूटना', 'बाली बनना', 'फूल आना', 'दाना भरना', 'कटाई'],
    },
    seedTips: {
      en: 'Use certified seed recommended for your district (e.g., BPT-5204 / Samba Mahsuri, MTU-1010, Nellore Mahsuri). Treat seeds with carbendazim or bio-fungicide before sowing.',
      te: 'మీ ప్రాంతానికి అనువైన గుర్తింపు పొందిన విత్తనాలు (ఉదా: బి.పి.టి-5204 సాంబ మసూరి, ఎం.టి.యు-1010, నెల్లూరు మసూరి) వాడండి. విత్తన శుద్ధి తప్పక చేయండి.',
      hi: 'अपने क्षेत्र के लिए प्रमाणित बीज (जैसे सांबा मंसूरी BPT-5204, MTU-1010) ही खरीदें। बुवाई से पहले बीज उपचार अवश्य करें।',
    },
    cultivation: {
      en: 'Level the field well. Transplant 2-3 healthy seedlings per hill with 15x15 cm or 20x15 cm spacing for uniform sunlight.',
      te: 'దమ్ము చక్కగా చేసి పొలాన్ని సమాంతరంగా చదును చేయండి. చదరపు మీటరుకు 33 నుండి 44 కుదుళ్లు ఉండేలా చూసుకోండి. కుదురుకు 2-3 ఆరోగ్యకరమైన మొక్కలు నాటండి.',
      hi: 'खेत की जुताई और लेवहा (पडलिंग) अच्छी तरह करें। 2-3 स्वस्थ पौधे प्रति स्थान पर लगाएं।',
    },
    irrigation: {
      en: 'Maintain 2-3 cm shallow standing water during early tillering. Drain water 10 days before harvest.',
      te: 'నాటిన వారం రోజుల వరకు పలుచగా నీరు ఉంచండి. పిలకలు తొడిగే దశలో మరియు పొట్ట దశలో 2-3 సెం.మీ నీరు ఉండాలి. కోతకు 10-12 రోజుల ముందు నీటిని పూర్తిగా తీసివేయాలి.',
      hi: 'रोपाई के शुरुआती दिनों में 2-3 सेमी हल्का पानी रखें। कटाई से 10 दिन पहले पानी निकाल दें।',
    },
    fertilizer: {
      en: 'Apply nitrogen in 3 split doses: basal, active tillering, and panicle initiation. Apply phosphorus fully as basal dose.',
      te: 'భూసార పరీక్ష ఆధారంగా ఎరువులు వేయండి. భాస్వరం, పొటాష్ ఎరువులను ఆఖరి దమ్ములో వేయాలి. నత్రజని (యూరియా) ఎరువును మూడు దఫాలుగా వేయడం శ్రేయస్కరం.',
      hi: 'यूरिया को 3 भागों में बांटकर डालें: रोपाई के समय, कल्ले फूटते समय और बाली निकलते समय।',
    },
    symptoms: {
      en: [
        { sign: 'Yellowing of older leaves', possible: 'Nitrogen deficiency or prolonged standing water. Drain water and inspect roots.' },
        { sign: 'Dead hearts / white ears', possible: 'Stem borer attack. Look for bore holes in stem and install pheromone traps.' },
        { sign: 'Spindle-shaped brown leaf spots', possible: 'Blast fungal disease. Avoid excessive urea application.' },
      ],
      te: [
        { sign: 'క్రింది ఆకులు పసుపు రంగులోకి మారడం', possible: 'నత్రజని (యూరియా) లోపం లేదా వేరుకు గాలి అందకపోవడం. పొలంలో నీటిని మార్చి తడి-ఆరడి పద్ధతి పాటించండి.' },
        { sign: 'ఎండిపోయిన సుడులు / తెల్ల కంకులు', possible: 'కాండం తొలిచే పురుగు (మొవ్వు పురుగు). లింగాకర్షక బుట్టలు అమర్చండి.' },
        { sign: 'ఆకులపై కంటి ఆకారపు గోధుమ మచ్చలు', possible: 'అగ్గితెగులు (బ్లాస్ట్). అధికంగా యూరియా వాడకాన్ని తగ్గించండి.' },
      ],
      hi: [
        { sign: 'निचली पत्तियों का पीला पड़ना', possible: 'नाइट्रोजन की कमी या ज्यादा पानी भरा रहना।' },
        { sign: 'सूखे कल्ले या सफेद बालियां', possible: 'तना छेदक कीट का प्रकोप। फेरोमोन ट्रैप लगाएं।' },
        { sign: 'पत्तियों पर नाव के आकार के भूरे धब्बे', possible: 'झुलसा (ब्लास्ट) रोग। यूरिया का अधिक उपयोग न करें।' },
      ],
    },
    preventive: {
      en: 'Follow alternate wetting and drying (AWD) to save water. Walk the field once a week to detect pests early.',
      te: 'తడి-ఆరడి పద్ధతి పాటించడం ద్వారా నీరు ఆదా అవుతుంది, వేర్లు బలంగా ఎదుగుతాయి. వారానికి ఒకసారి పొలంలో తిరిగి చీడపీడలను ప్రారంభంలోనే గుర్తించండి.',
      hi: 'खेत में हमेशा पानी भरने के बजाय हल्का सुखाकर पानी दें।',
    },
  },

  {
    id: 'cotton',
    names: { en: 'Cotton', te: 'పత్తి', hi: 'कपास' },
    category: 'Cash crops',
    seasons: ['Kharif'],
    image: '/images/crops/cotton.jpg',
    imageAlt: {
      en: 'Real cotton plant with fluffy open white cotton bolls ready for harvest in Indian field',
      te: 'పత్తి చేనులో వికసించిన తెల్లటి దూది కాయలు (పత్తి దూది)',
      hi: 'खेत में खिली हुई सफेद कपास और टिंडे',
    },
    icon: '☁️',
    short: {
      en: 'Valuable commercial fibre crop suited for black and well-drained soils.',
      te: 'నల్లరేగడి మరియు ఎర్ర నేలల్లో సాగు చేసే అతి ముఖ్యమైన వాణిజ్య పంట.',
      hi: 'काली और अच्छी जल निकासी वाली मिट्टी में उगाई जाने वाली प्रमुख नकदी फसल।',
    },
    description: {
      en: 'Cotton is a high-value commercial crop. It requires well-drained soils and careful scouting for sucking pests and bollworms.',
      te: 'పత్తి మన రైతులకు ప్రధాన వాణిజ్య పంట. అధిక వర్షాలు లేదా నీరు నిలబడితే పంట దెబ్బతింటుంది. రసం పీల్చే పురుగుల నివారణ మరియు సకాలంలో పిందె రాలకుండా చూడడం చాలా ముఖ్యం.',
      hi: 'कपास एक महत्वपूर्ण नकदी फसल है। खेत में पानी रुकना नहीं चाहिए। रस चूसक कीटों और गुलाबी सुंडी से बचाव समय पर करना जरूरी है।',
    },
    growthStages: {
      en: ['Sowing', 'Vegetative', 'Square Formation', 'Flowering', 'Boll Formation', 'Boll Bursting & Picking'],
      te: ['విత్తనం నాటుట', 'మొక్క ఎదిగే దశ', 'మొగ్గ దశ (కాయ పిందెలు)', 'పూత దశ', 'కాయలు ముదిరే దశ', 'దూది తీయుట (పత్తి తీత)'],
      hi: ['बुवाई', 'वनस्पतिक वृद्धि', 'कलियां बनना', 'फूल आना', 'टिंडे बनना', 'कपास चुनाई'],
    },
    seedTips: {
      en: 'Use recommended hybrid BG-II seeds with non-Bt refuge seeds planted on borders.',
      te: 'ప్రభుత్వ గుర్తింపు పొందిన నాణ్యమైన హైబ్రిడ్ విత్తనాలు ఎంచుకోండి. పొలం చుట్టూ రక్షణగా నాన్-బిటి విత్తనాలు తప్పక నాటండి.',
      hi: 'प्रमाणित बीटी कपास बीज ही खरीदें। खेत की मेड़ों पर नॉन-बीटी बीज अवश्य लगाएं।',
    },
    cultivation: {
      en: 'Sow on ridges or broad beds with 90x60 cm or 120x60 cm spacing depending on soil fertility.',
      te: 'బోదెలు, సాళ్ళ పద్ధతిలో 3 అడుగుల లేదా 4 అడుగుల ఎడంగా సాళ్ళు చేసి విత్తుకోండి. నేలలో నీరు నిల్వ ఉండకుండా కాలువలు తీయండి.',
      hi: 'मेड़ बनाकर 3 से 4 फीट की दूरी पर कतारों में बुवाई करें।',
    },
    irrigation: {
      en: 'Sensitive to waterlogging. Provide furrow irrigation during dry spells, especially during flowering and boll development.',
      te: 'పత్తికి నీరు ఎక్కువైతే ఎదుగుదల ఆగిపోతుంది. పూత, కాయ తయారయ్యే సమయంలో వర్షాభావ పరిస్థితుల్లో సాళ్లలో తేలికపాటి తడులు ఇవ్వండి.',
      hi: 'कपास में ज्यादा पानी बिल्कुल न भरें। फूल और टिंडे बनते समय आवश्यकतानुसार हल्की सिंचाई करें।',
    },
    fertilizer: {
      en: 'Avoid excess urea which promotes vegetative growth and attracts sucking pests. Spray 2% DAP or Potassium Nitrate at boll stage.',
      te: 'యూరియా ఎరువును మితంగా వేయండి. అధిక యూరియా వాడితే మొక్క ఏపుగా పెరిగి పురుగులు ఎక్కువవుతాయి. పూత రాలకుండా 13-0-45 స్ప్రే చేయండి.',
      hi: 'यूरिया सीमित मात्रा में दें। टिंडे बनते समय पोटाश का छिड़काव लाभकारी है।',
    },
    symptoms: {
      en: [
        { sign: 'Leaves curling upward / sticky dew', possible: 'Jassids and whiteflies. Spray neem oil (5ml/L) or recommended bio-pesticide.' },
        { sign: 'Flower buds (squares) dropping', possible: 'Moisture stress, boron deficiency, or mirid bugs.' },
        { sign: 'Damaged bolls with bore holes', possible: 'Bollworm activity. Install yellow sticky traps and pheromone traps.' },
      ],
      te: [
        { sign: 'ఆకులు పైకి ముడుచుకోవడం / బంక కారడం', possible: 'తామర పురుగులు, తెల్లదోమ. వేప నూనె (5 మి.లీ/లీటర్) పిచికారీ చేయండి.' },
        { sign: 'పూత మరియు మొగ్గలు రాలిపోవడం', possible: 'నేలలో తేమ ఎక్కువ లేదా తక్కువ కావడం. ప్లానోఫిక్స్ లేదా బోరాన్ పిచికారీ చేయండి.' },
        { sign: 'కాయలకు రంధ్రాలు పడి దూది పాడవడం', possible: 'గులాబీ రంగు కాయతొలుచు పురుగు. లింగాకర్షక బుట్టలు ఎకరాకు 4-5 అమర్చండి.' },
      ],
      hi: [
        { sign: 'पत्तियों का मुड़ना और चिपचिपापन', possible: 'सफेद मक्खी या हरा तेला का हमला। neem oil छिड़कें।' },
        { sign: 'फूल और कलियों का गिरना', possible: 'पानी का असंतुलन या बोरॉन की कमी।' },
        { sign: 'टिंडों में छेद होना', possible: 'गुलाबी सुंडी का प्रकोप। फेरोमोन ट्रैप लगाएं।' },
      ],
    },
    preventive: {
      en: 'Install yellow sticky traps (10 per acre) and maintain border crops like maize to harbour natural predators.',
      te: 'ఎకరాకు 10 పసుపు, నీలి రంగు జిగురు అట్టలు పెట్టండి. పొలం గట్ల వెంబడి మొక్కజొన్న, జొన్న రక్షక పంటలుగా వేస్తే మిత్రపురుగులు వృద్ధి చెందుతాయి.',
      hi: 'खेत में पीले चिपचिपे कार्ड लगाएं और मेड़ों पर मक्का या बाजरा लगाएं।',
    },
  },

  {
    id: 'chilli',
    names: { en: 'Chilli', te: 'మిరప', hi: 'मिर्च' },
    category: 'Vegetables',
    seasons: ['Kharif', 'Rabi'],
    image: '/images/crops/chilli.jpg',
    imageAlt: {
      en: 'Real chilli plant loaded with bright red and green chillies in an Indian farm field',
      te: 'తోటలో ఎర్రటి, పచ్చటి మిరపకాయలతో నిండిన మిరప మొక్క',
      hi: 'खेत में हरी और लाल मिर्च से लदा मिर्च का पौधा',
    },
    icon: '🌶️',
    short: {
      en: 'High-value spice and vegetable crop, known for Andhra special Guntur varieties.',
      te: 'మంచి లాభాలను ఇచ్చే వాణిజ్య పంట. ఆంధ్రప్రదేశ్ గుంటూరు మిరప ఎంతో ప్రసిద్ధి.',
      hi: 'अधिक लाभ देने वाली नकदी फसल। आंध्र प्रदेश की गुंटूर मिर्च पूरे देश में प्रसिद्ध है।',
    },
    description: {
      en: 'Chilli is a demanding commercial crop. Controlling thrips, mites, and viral leaf curls early in the season is critical for profitability.',
      te: 'మిరప మన ప్రాంతంలో అత్యంత విలువైన పంట. నారుమడి నుండి నాట్లు వేసిన 45 రోజుల వరకు నల్ల తామర పురుగులు, వైరస్ తెగుళ్లు రాకుండా కాపాడుకోవడం చాలా కీలకం.',
      hi: 'मिर्च एक लाभदायक फसल है। थ्रिप्स कीट और मरोड़िया (लीफ़ कर्ल) वायरस से शुरुआती दिनों में बचाव करना सबसे आवश्यक है।',
    },
    growthStages: {
      en: ['Nursery', 'Transplanting', 'Branching', 'Flowering', 'Green Chilli Harvest', 'Red Ripe Harvest & Drying'],
      te: ['నారుమడి పోయుట', 'నాట్లు వేయుట', 'కొమ్మలు తొడిగే దశ', 'పూత దశ', 'పచ్చిమిర్చి కోత', 'పండుమిర్చి కోత & ఎండబెట్టుట'],
      hi: ['नर्सरी', 'रोपाई', 'शाखाएं निकलना', 'फूल आना', 'हरी मिर्च तुड़ाई', 'लाल मिर्च सुखाई'],
    },
    seedTips: {
      en: 'Choose pest-tolerant hybrids (e.g., Teja, Armoor, Byadagi). Treat nursery with Trichoderma viride.',
      te: 'నల్ల తామర పురుగులను తట్టుకునే రకాలు (ఉదా: తేజ, అర్మూర్, బ్యాడగి) ఎంచుకోండి. నారుమడిలో ట్రైకోడెర్మా విరిడే కలిపిన పశువుల ఎరువు వాడండి.',
      hi: 'रोगरोधी उन्नत किस्में (जैसे तेजा, ब्याडगी) चुनें। नर्सरी में ट्राइकोडर्मा का उपयोग करें।',
    },
    cultivation: {
      en: 'Plant on raised beds with silver-black mulch paper and drip irrigation to suppress weeds and soil-borne pests.',
      te: 'ఎత్తు మడులు (రైజ్డ్ బెడ్స్) వేసి మల్చింగ్ షీట్, డ్రిప్ పద్ధతి వాడితే కలుపు, పురుగుల బెడద చాలా వరకు తగ్గుతుంది.',
      hi: 'उठी हुई क्यारियों (बेड) पर मल्चिंग शीट और ड्रिप सिंचाई का प्रयोग करें।',
    },
    irrigation: {
      en: 'Drip irrigation gives highest yields. Never flood beds; excess standing water invites collar rot and wilt.',
      te: 'డ్రిప్ ద్వారా క్రమపద్ధతిలో నీరు ఇవ్వండి. పొలంలో నీరు ముంపునకు గురికాకుండా చూసుకోండి. అధిక నీరు ఉంటే మొదలుకుళ్లు తెగులు వస్తుంది.',
      hi: 'ड्रिप से हल्का और नियमित पानी दें। खेत में पानी रुकने न दें।',
    },
    fertilizer: {
      en: 'Provide balanced NPK with fertigation. Apply micronutrients like Zinc, Boron, and Magnesium via foliar sprays.',
      te: 'డ్రిప్ ద్వారా ఎరువులను దఫదఫాలుగా అందించండి. పూత నిలవడానికి బోరాన్ మరియు మెగ్నీషియం పిచికారీ చేయండి.',
      hi: 'ड्रिप के जरिए खाद दें। फूल झड़ने से रोकने के लिए बोरॉन का छिड़काव करें।',
    },
    symptoms: {
      en: [
        { sign: 'Leaves curling upward with blackened flowers', possible: 'Black thrips. Install blue sticky traps (25/acre).' },
        { sign: 'Down-curled brittle leaves', possible: 'Mites infestation. Spray wettable sulphur.' },
        { sign: 'Wilting and yellowing from roots', possible: 'Bacterial wilt or collar rot. Drench with copper oxychloride.' },
      ],
      te: [
        { sign: 'ఆకులు పైకి ముడుచుకోవడం, పూలు నల్లబడటం', possible: 'నల్ల తామర పురుగు (బ్లాక్ త్రిప్స్). ఎకరాకు 25-30 నీలి రంగు జిగురు అట్టలు పెట్టండి.' },
        { sign: 'ఆకులు క్రిందికి ముడుచుకుపోయి ముదురు ఆకుపచ్చగా మారడం', possible: 'నల్లి (మైట్స్) పురుగు. సల్ఫర్ మందును పిచికారీ చేయండి.' },
        { sign: 'మొక్కలు ఉన్నట్టుండి వడలిపోయి చనిపోవడం', possible: 'మొదలుకుళ్లు లేదా ఎండు తెగులు. కాపర్ ఆక్సిక్లోరైడ్ తో మొక్క మొదలును తడపండి.' },
      ],
      hi: [
        { sign: 'पत्तियां ऊपर मुड़ना और फूल काले पड़ना', possible: 'ब्लैक थ्रिप्स का हमला। नीले चिपचिपे कार्ड लगाएं।' },
        { sign: 'पत्तियों का नीचे की ओर मुड़ना', possible: 'माइट्स (मकड़ी)। घुलनशील गंधक का छिड़काव करें।' },
        { sign: 'अचानक पौधे का सूखना', possible: 'उकठा या जड़ सड़न।', },
      ],
    },
    preventive: {
      en: 'Maintain barrier crops like maize around the field and use intercrops like marigold to deter nematodes.',
      te: 'పొలం చుట్టూ 4 వరుసల మొక్కజొన్న సరిహద్దు పంటగా వేయండి. అక్కడక్కడా బంతి పూల మొక్కలు నాటితే పురుగులు మిరపపై దాడి చేయవు.',
      hi: 'खेत के चारों ओर मक्का लगाएं और बीच-बीच में गेंदा फूल लगाएं।',
    },
  },

  {
    id: 'maize',
    names: { en: 'Maize / Corn', te: 'మొక్కజొన్న', hi: 'मक्का' },
    category: 'Cereals',
    seasons: ['Kharif', 'Rabi'],
    image: '/images/crops/maize.jpg',
    imageAlt: {
      en: 'Healthy maize plant with large golden yellow corn cobs in an Indian field',
      te: 'పొలంలో బంగారు రంగు గింజలతో నిండిన మొక్కజొన్న కండెలు',
      hi: 'खेत में पके हुए सुनहरे भुट्टों के साथ मक्के की फसल',
    },
    icon: '🌽',
    short: {
      en: 'Versatile food and fodder grain, well suited for Kharif and Rabi seasons.',
      te: 'తక్కువ శ్రమతో త్వరితగతిన దిగుబడినిచ్చే ఆహార మరియు పశుగ్రాస పంట.',
      hi: 'कम समय और कम लागत में अच्छा मुनाफा देने वाली खाद्यान्न व चारा फसल।',
    },
    description: {
      en: 'Maize grows rapidly and yields well in well-drained loamy soils. Monitoring Fall Armyworm in early whorl stage is critical.',
      te: 'మొక్కజొన్న వర్షాకాలం మరియు శీతాకాలం రెండింటిలోనూ సాగు చేసుకోవచ్చు. మొలక దశ నుండి కత్తెర పురుగు రాకుండా చూసుకుంటే ఎకరాకు 30-35 క్వింటాళ్ల దిగుబడి సాధించవచ్చు.',
      hi: 'मक्का खरीफ और रबी दोनों मौसमों में अच्छी पैदावार देती है। फॉल आर्मीवर्म (सैनिक कीट) से शुरुआत में ही फसल को बचाना जरूरी है।',
    },
    growthStages: {
      en: ['Sowing', 'Seedling', 'Knee-High', 'Tasseling', 'Silking', 'Grain Filling', 'Cob Harvest'],
      te: ['విత్తుట', 'మొలక దశ', 'మోకాలి ఎత్తు దశ', 'వెన్ను (పూత) దశ', 'కండెపై పీచు వచ్చే దశ', 'గింజ పాలుపోసుకునే దశ', 'కండెల కోత'],
      hi: ['बुवाई', 'अंकुरण', 'घुटने की ऊंचाई', 'मंजरी निकलना', 'सिल्क निकलना', 'दाना भरना', 'भुट्टा कटाई'],
    },
    seedTips: {
      en: 'Use high-yielding single cross hybrids. Ensure seed is treated against soil pests.',
      te: 'సింగిల్ క్రాస్ హైబ్రిడ్ రకాలు వాడండి. విత్తన శుద్ధి చేసిన విత్తనాలను మాత్రమే నాటండి.',
      hi: 'उच्च उपज देने वाली संकर किस्मों के प्रमाणित बीज ही बोएं।',
    },
    cultivation: {
      en: 'Sow at 60 cm row-to-row and 20 cm plant-to-plant distance. Do not sow in low-lying waterlogged fields.',
      te: 'సాళ్ళ మధ్య 60 సెం.మీ, మొక్కల మధ్య 20 సెం.మీ దూరం ఉండేలా నాటండి. నీరు నిల్వ ఉండే పల్లపు భూముల్లో వేయవద్దు.',
      hi: 'कतार से कतार 60 सेमी और पौधे से पौधा 20 सेमी की दूरी रखें।',
    },
    irrigation: {
      en: 'Critical moisture stages are knee-high, tasseling, and silking. Avoid water shortages during flowering.',
      te: 'మోకాలి ఎత్తు దశ, వెన్ను వచ్చే దశ, కండె గింజ కట్టే దశలో తప్పనిసరిగా తడి అందించాలి.',
      hi: 'फूल आते समय और दाना भरते समय खेत में नमी की कमी न होने दें।',
    },
    fertilizer: {
      en: 'Top-dress nitrogen in three equal splits: knee-high, tasseling, and grain formation.',
      te: 'యూరియాను మూడు దఫాలుగా వేయాలి. మోకాలి ఎత్తు దశలో మరియు కండెలు పడే సమయంలో యూరియాతో పాటు పొటాష్ వేయండి.',
      hi: 'यूरिया को तीन बार में दें: घुटने की ऊंचाई पर, मंजरी आने पर और दाना बनते समय।',
    },
    symptoms: {
      en: [
        { sign: 'Ragged leaves with sawdust-like frass in whorl', possible: 'Fall Armyworm. Apply sand + lime or neem cake in whorls.' },
        { sign: 'Poor cob grain setting', possible: 'Water deficit or high temperature during silking.' },
      ],
      te: [
        { sign: 'ఆకులకు రంధ్రాలు, సుడిలో రంపపు పొట్టు లాంటి పదార్థం', possible: 'కత్తెర పురుగు (ఫాల్ ఆర్మీవార్మ్). సుడిలో ఇసుక లేదా వేప పిండి వేయండి.' },
        { sign: 'కండెకు గింజలు సరిగ్గా నిండకపోవడం', possible: 'పూత సమయంలో నీటి ఎద్దడి లేదా విపరీతమైన ఎండ.' },
      ],
      hi: [
        { sign: 'पत्तियों पर छेद और तने के पास बुरादा', possible: 'फॉल आर्मीवर्म कीट। तने में नीम पाउडर डालें।' },
        { sign: 'भुट्टे में दाने कम भरना', possible: 'फूल आते समय पानी की कमी।' },
      ],
    },
    preventive: {
      en: 'Pheromone traps (4/acre) help detect moths early. Avoid staggered planting in adjacent plots.',
      te: 'ఎకరాకు 4 లింగాకర్షక బుట్టలు పెట్టి కత్తెర పురుగు ఉనికిని గమనించండి. సకాలంలో సామూహికంగా విత్తుకోవాలి.',
      hi: 'खेत में फेरोमोन ट्रैप लगाएं और समय पर बुवाई करें।',
    },
  },

  {
    id: 'groundnut',
    names: { en: 'Groundnut / Peanut', te: 'వేరుశనగ', hi: 'मूंगफली' },
    category: 'Oilseeds',
    seasons: ['Kharif', 'Rabi'],
    image: '/images/crops/groundnut.jpg',
    imageAlt: {
      en: 'Real groundnut plant with freshly harvested peanut pods attached to root cluster on farm soil',
      te: 'వేరుశనగ చేనులో వేర్లకు గుత్తులుగా కాసిన వేరుశనగ కాయలు',
      hi: 'जड़ों में गुच्छों के साथ ताजी मूंगफली की खुदाई',
    },
    icon: '🥜',
    short: {
      en: 'Valuable oilseed crop that enriches soil and produces oil-rich pods below ground.',
      te: 'భూమిలో కాయలు కాసే ముఖ్యమైన నూనెగింజ పంట. నేలకు బలాన్ని ఇస్తుంది.',
      hi: 'जमीन के अंदर फली देने वाली प्रमुख तिलहनी फसल जो मिट्टी को उपजाऊ बनाती है।',
    },
    description: {
      en: 'Groundnut thrives in sandy loam and red soils. Pegging and pod formation require loose soil and adequate gypsum/calcium application.',
      te: 'వేరుశనగ మన రాయలసీమ మరియు కోస్తా తీర ప్రాంతాల్లో విస్తారంగా సాగవుతుంది. పూత పూసి ఊడలు నేలలోకి దిగే సమయంలో నేల గుల్లగా ఉండడం మరియు జిప్సం వేయడం చాలా అవసరం.',
      hi: 'मूंगफली हल्की और भुरभुरी मिट्टी में बहुत अच्छी होती है। खूंटी (पेग) बनते समय और फली भरते समय मिट्टी में नमी और जिप्सम जरूरी है।',
    },
    growthStages: {
      en: ['Sowing', 'Vegetative', 'Flowering', 'Peg Penetration', 'Pod Development', 'Maturity & Pulling'],
      te: ['విత్తుట', 'మొక్క ఎదుగుదల', 'పూత దశ', 'ఊడలు దిగే దశ (Pegging)', 'కాయ ఊరే దశ', 'ముదిరిన కాయల తవ్వకం'],
      hi: ['बुवाई', 'वृद्धि', 'फूल आना', 'खूंटी बनना (पेगिंग)', 'फली भरना', 'परिपक्वता व खुदाई'],
    },
    seedTips: {
      en: 'Use bold, undamaged kernels. Treat with Trichoderma and Rhizobium bio-fertilizers (e.g., Kadiri-6, TAG-24, K-9).',
      te: 'పుచ్చులు లేని మంచి విత్తన కాయల పప్పును వాడండి (ఉదా: కదిరి-6, కదిరి-9, టిఎజి-24, ధరణి). విత్తన శుద్ధికి రైజోబియం కల్చర్ కలపండి.',
      hi: 'स्वस्थ दाने ही बोएं (कदिरी-6, टीएजी-24)। राइजोबियम कल्चर से बीज उपचार जरूर करें।',
    },
    cultivation: {
      en: 'Plough field to a fine tilth so pegs can easily penetrate the soil. Avoid hard clods.',
      te: 'నేలను మెత్తగా దున్ని చదును చేయండి. ఊడలు దిగే సమయంలో నేల గట్టిపడకుండా ఉండడానికి మట్టిని ఎగదోయండి.',
      hi: 'मिट्टी को भुरभुरा बनाएं ताकि खूंटी आसानी से जमीन में प्रवेश कर सके।',
    },
    irrigation: {
      en: 'Critical watering stages are flowering, pegging, and pod development. Stop irrigation 10 days before harvest.',
      te: 'పూత దశ, ఊడలు దిగే దశ, కాయ తయారయ్యే దశలో నీరు అత్యవసరం. తవ్వకానికి 7-10 రోజుల ముందు తేలికపాటి తడి ఇస్తే కాయలు తెగకుండా ఊడి వస్తాయి.',
      hi: 'फूल आते समय और फली बनते समय सिंचाई जरूर करें।',
    },
    fertilizer: {
      en: 'Apply Gypsum (200 kg/acre) at 40-45 days after sowing around the root zone for solid pod filling.',
      te: 'విత్తిన 40-45 రోజుల వద్ద ఎకరాకు 200 కిలోల జిప్సం వేయండి. జిప్సం వేయడం వల్ల కాయలు డొల్లపోకుండా గట్టిగా, నూనెతో నిండుతాయి.',
      hi: 'बुवाई के 40 दिन बाद 200 किग्रा प्रति एकड़ जिप्सम जरूर डालें।',
    },
    symptoms: {
      en: [
        { sign: 'Empty hollow pods (pop pods)', possible: 'Calcium deficiency or moisture deficit during pod formation. Apply gypsum.' },
        { sign: 'Circular dark brown leaf spots (Tikka)', possible: 'Tikka disease. Spray mancozeb or hexaconazole.' },
      ],
      te: [
        { sign: 'కాయలు డొల్లలుగా ఉండటం / పప్పు లేకపోవడం', possible: 'కాల్షియం లోపం లేదా ఊడలు దిగేటప్పుడు తడి లేకపోవడం. జిప్సం తప్పక వాడండి.' },
        { sign: 'ఆకులపై గుండ్రటి నల్లటి మచ్చలు (తిక్కా తెగులు)', possible: 'తిక్కా ఆకుమచ్చ తెగులు. మాంకోజెబ్ మందును పిచికారీ చేయండి.' },
      ],
      hi: [
        { sign: 'फलियों का खाली रहना', possible: 'कैल्शियम की कमी। जिप्सम का प्रयोग करें।' },
        { sign: 'पत्तियों पर गोल काले धब्बे (टिक्का रोग)', possible: 'टिक्का फफूंद रोग। उपयुक्त फफूंदनाशक छिड़कें।' },
      ],
    },
    preventive: {
      en: 'Crop rotation with cereals breaks disease cycles. Harvest when inner shell turns dark brown.',
      te: 'వరి లేదా జొన్న పంటల తర్వాత వేరుశనగ వేస్తే తెగుళ్లు తగ్గుతాయి. కాయ లోపలి పొర నల్లబడినప్పుడు కోతకు సిద్ధమని గుర్తించండి.',
      hi: 'अनाज वाली फसलों के साथ फसल चक्र अपनाएं।',
    },
  },

  {
    id: 'turmeric',
    names: { en: 'Turmeric', te: 'పసుపు', hi: 'हल्दी' },
    category: 'Spices',
    seasons: ['Kharif'],
    image: '/images/crops/turmeric.jpg',
    imageAlt: {
      en: 'Real green turmeric plant field in India with golden turmeric rhizomes displayed on soil',
      te: 'పసుపు తోటలో పచ్చటి పసుపు ఆకులు మరియు పండిన బంగారు పసుపు కొమ్ములు',
      hi: 'हल्दी के खेत में हरी पत्तियां और ताजा सुनहरी हल्दी की गांठें',
    },
    icon: '🟡',
    short: {
      en: 'High-value medicinal rhizome crop, widely cultivated in Telangana and Andhra Pradesh.',
      te: 'ఆంధ్రప్రదేశ్ మరియు తెలంగాణలో అధిక విస్తీర్ణంలో సాగయ్యే ప్రధాన సుగంధ ద్రవ్య పంట.',
      hi: 'औषधीय गुणों से भरपूर प्रमुख मसाला फसल।',
    },
    description: {
      en: 'Turmeric requires organic-rich, well-drained soil and organic mulching. Rhizomes take 8-9 months to reach maturity.',
      te: 'పసుపు మన ప్రాంతంలో 9 నెలల దీర్ఘకాలిక పంట. విత్తిన వెంటనే పచ్చిరొట్ట లేదా ఆకులతో కప్పడం (మల్చింగ్) వల్ల మొలక బాగా వస్తుంది మరియు వేసవి ఎండల నుండి దుంపలు రక్షించబడతాయి.',
      hi: 'हल्दी 8-9 महीने की फसल है। बुवाई के बाद हरी पत्तियों से मल्चिंग करने से जमाव अच्छा होता है।',
    },
    growthStages: {
      en: ['Rhizome Planting', 'Sprouting', 'Vegetative Growth', 'Rhizome Multiplication', 'Maturity (Leaves Drying)', 'Digging & Curing'],
      te: ['కొమ్ముల నాటుట', 'మొలకలు వచ్చుట', 'మొక్క ఏపుగా పెరిగే దశ', 'పిల్ల కొమ్ములు ఊరే దశ', 'ఆకులు పసుపుబారి ఎండే దశ', 'దుంపల తవ్వకం & ఉడకబెట్టుట'],
      hi: ['कंद बुवाई', 'अंकुरण', 'वनस्पतिक वृद्धि', 'कंद का विकास', 'पत्तियां सूखना', 'खुदाई व पकाना'],
    },
    seedTips: {
      en: 'Select healthy, bold mother or finger rhizomes (e.g., Duggirala, Salem, Prathibha). Treat with mancozeb before planting.',
      te: 'కుళ్లు లేని నాణ్యమైన తల్లి కొమ్ములు లేదా పిల్ల కొమ్ములను ఎంచుకోండి (దుగ్గిరాల, సేలం, ప్రతిభ). విత్తే ముందు మాంకోజెబ్ ద్రావణంలో నానబెట్టి శుద్ధి చేయండి.',
      hi: 'स्वस्थ और मोटे कंद ही लगाएं। बुवाई से पहले फफूंदनाशक घोल में डुबोएं।',
    },
    cultivation: {
      en: 'Plant on raised beds of 1-1.2 m width. Apply green leaf mulch (5 tonnes/acre) immediately after planting.',
      te: 'ఎత్తు మడులపై 30x15 సెం.మీ దూరంలో నాటండి. నాటిన వెంటనే ఎకరాకు 4-5 టన్నుల పచ్చి ఆకులతో మల్చింగ్ చేయండి.',
      hi: 'उठी क्यारियों पर लगाएं और बुवाई के तुरंत बाद हरी पत्तियों की मल्चिंग करें।',
    },
    irrigation: {
      en: 'Requires frequent light irrigations. Ensure zero water stagnation to prevent rhizome rot.',
      te: 'నేలలో తేమ ఉండేలా తేలికపాటి తడులు ఇవ్వండి. పొలంలో నీరు నిలిస్తే దుంపకుళ్లు వచ్చి పంట నాశనమవుతుంది.',
      hi: 'हल्की सिंचाई करते रहें। खेत में पानी रुकने न दें।',
    },
    fertilizer: {
      en: 'Heavy feeder of organic manure. Apply FYM (10-15 tonnes/acre) during land preparation and split nitrogen doses.',
      te: 'పశువుల ఎరువు ఎకరాకు 10-12 టన్నులు దుక్కిలో వేయాలి. వేప పిండి వాడటం వల్ల కొమ్ముకుళ్లు మరియు నులిపురుగులు తగ్గుతాయి.',
      hi: 'गोबर की सड़ी खाद अच्छी मात्रा में डालें। नीम की खली का प्रयोग करें।',
    },
    symptoms: {
      en: [
        { sign: 'Soft, water-soaked brown rot at soil base', possible: 'Rhizome rot (damping off). Drench with Ridomil MZ or Copper Oxychloride.' },
        { sign: 'Brown spots with grey centers on leaves', possible: 'Leaf blotch / leaf spot. Spray Carbendazim.' },
      ],
      te: [
        { sign: 'మొక్క మొదలు మెత్తబడి దుంప కుళ్లిపోవడం, దుర్వాసన', possible: 'దుంపకుళ్లు తెగులు (రైజోమ్ రాట్). మెటలాక్సిల్ లేదా కాపర్ మందును మొదళ్లలో తడపండి.' },
        { sign: 'ఆకులపై గోధుమ రంగు మచ్చలు ఏర్పడి ఎండిపోవడం', possible: 'ఆకుమచ్చ తెగులు. కార్బండిజమ్ పిచికారీ చేయండి.' },
      ],
      hi: [
        { sign: 'कंद का गलना और बदबू आना', possible: 'कंद सड़न रोग। कॉपर कवकनाशी का घोल जड़ों में डालें।' },
        { sign: 'पत्तियों पर भूरे-काले धब्बे', possible: 'पत्ती धब्बा रोग। कार्बेन्डाजिम छिड़कें।' },
      ],
    },
    preventive: {
      en: 'Ensure good field drainage. Practice 3-year crop rotation and avoid planting turmeric on the same plot consecutively.',
      te: 'కాలువలు తీసి మురుగునీటిని ఎప్పటికప్పుడు బయటకు పంపండి. ఒకే పొలంలో ఏటా పసుపు వేయకుండా పంట మార్పిడి చేయండి.',
      hi: 'जल निकासी बहुत अच्छी रखें।',
    },
  },

  {
    id: 'sugarcane',
    names: { en: 'Sugarcane', te: 'చెరకు', hi: 'गन्ना' },
    category: 'Cash crops',
    seasons: ['Kharif', 'Rabi'],
    image: '/images/crops/sugarcane.jpg',
    imageAlt: {
      en: 'Real tall mature sugarcane stalks growing in an agricultural farm field in India',
      te: 'తోటలో ఏపుగా పెరిగిన ఎత్తైన తీపి చెరకు గడలు',
      hi: 'खेत में खड़े गन्ने की लंबी और घनी फसल',
    },
    icon: '🎋',
    short: {
      en: 'Perennial cash crop cultivated for sugar mills and jaggery production.',
      te: 'పంచదార మరియు బెల్లం తయారీకి సాగు చేసే ముఖ్యమైన వాణిజ్య పంట.',
      hi: 'चीनी मिलों और गुड़ उत्पादन के लिए उगाई जाने वाली प्रमुख नकदी फसल।',
    },
    description: {
      en: 'Sugarcane stays in the field for 10-12 months. Deep soil preparation, healthy sets, and trench planting ensure high sucrose content and tonnage.',
      te: 'చెరకు సుమారు 10-12 నెలల కాలపరిమితి కలిగిన పంట. నాణ్యమైన మూడు కళ్ళ చెరకు ముక్కలను ఎంపిక చేసుకోవడం, అంతరకృషి చేయడం వల్ల ఎకరాకు 40-50 టన్నుల దిగుబడి వస్తుంది.',
      hi: 'गन्ना 10 से 12 महीने की फसल है। स्वस्थ बीज टुकड़ों (सेट्स) का चयन और समय पर मिट्टी चढ़ाना अच्छी पैदावार देता है।',
    },
    growthStages: {
      en: ['Sett Planting', 'Germination', 'Tillering', 'Grand Growth', 'Maturity', 'Harvesting'],
      te: ['చెరకు ముక్కలు నాటుట', 'మొలక దశ', 'పిలకల దశ', 'తీవ్ర ఎదుగుదల దశ', 'ముదిరి చక్కెర చేరే దశ', 'చెరకు నరకుట'],
      hi: ['टुकड़े बोना', 'जमाव', 'कल्ले निकलना', 'तीव्र वृद्धि', 'पकाव', 'कटाई'],
    },
    seedTips: {
      en: 'Use top one-third portion of healthy 8-10 month cane. Treat setts with carbendazim.',
      te: '8-10 నెలల వయసున్న పై మూడో వంతు చెరకు కాండం నుండి విత్తన ముక్కలు వాడండి. విత్తే ముందు శిలీంద్రనాశినితో శుద్ధి చేయండి.',
      hi: '8-10 माह पुरानी गन्ने की ऊपरी एक-तिहाई फसल से बीज लें।',
    },
    cultivation: {
      en: 'Plant in furrows at 4-5 feet row spacing for ease of intercultural operations and mechanical harvesting.',
      te: 'బోదెల మధ్య 4 నుండి 5 అడుగుల ఎడం ఉంచి సాళ్ళ పద్ధతిలో నాటండి. ఎండ్రగాలి నుండి చెరకు పడిపోకుండా మట్టిని ఎగదోయండి.',
      hi: '4 से 5 फीट की दूरी पर कतारें बनाएं ताकि मिट्टी चढ़ाने में आसानी हो।',
    },
    irrigation: {
      en: 'High water requirement. Drip irrigation saves 40% water and enhances cane diameter.',
      te: 'ఎదుగుదల దశలో క్రమం తప్పకుండా నీరు ఇవ్వాలి. డ్రిప్ పద్ధతి వాడితే 40% నీరు ఆదా అవుతుంది, చెరకు లావుగా పెరుగుతుంది.',
      hi: 'ड्रिप सिंचाई से पानी की भारी बचत होती है और पैदावार बढ़ती है।',
    },
    fertilizer: {
      en: 'Apply recommended NPK in 3 splits. Complete nitrogen before 90-100 days to prevent late vegetative growth.',
      te: 'నత్రజని ఎరువులను 90 రోజుల లోపే పూర్తి చేయాలి. ఆలస్యంగా యూరియా వేస్తే చెరకులో చక్కెర శాతం తగ్గుతుంది.',
      hi: 'यूरिया की पूरी मात्रा 90 दिनों के भीतर दे दें ताकि मिठास अच्छी आए।',
    },
    symptoms: {
      en: [
        { sign: 'Red discoloration inside split stalk with sour alcohol smell', possible: 'Red rot disease. Rogue out diseased clumps immediately.' },
        { sign: 'Dead hearts in shoots during early growth', possible: 'Early shoot borer. Release Trichogramma parasitoids.' },
      ],
      te: [
        { sign: 'చెరకు కాండం లోపల ఎర్రటి చారలు, పుల్లటి వాసన', possible: 'ఎర్ర కుళ్లు తెగులు (రెడ్ రాట్). ఆ దుబ్బులను వెంటనే పీకి తగలబెట్టండి.' },
        { sign: 'మొలక దశలో మధ్య మొవ్వు ఎండిపోవడం', possible: 'మొవ్వు తొలిచే పురుగు. ట్రైకోగ్రామా పరాన్నజీవులను విడుదల చేయండి.' },
      ],
      hi: [
        { sign: 'गन्ने के अंदर लाल रंग और सिरके जैसी गंध', possible: 'लाल सड़न (रेड रॉट) रोग। रोगी पौधे नष्ट करें।' },
        { sign: 'शुरुआत में बीच की गोफ सूखना', possible: 'कंसुआ (प्रारंभिक तना छेदक)।' },
      ],
    },
    preventive: {
      en: 'Trash mulching (3 tonnes/acre) conserves soil moisture and controls weeds. Earth-up cane stalks at 90 days.',
      te: 'చెరకు చెత్తను సాళ్ళ మధ్య పరచడం (ట్రాష్ మల్చింగ్) వల్ల కలుపు అణచివేయబడుతుంది మరియు తేమ నిలుస్తుంది.',
      hi: 'गन्ने की सूखी पत्तियों को कतारों के बीच बिछाएं।',
    },
  },

  {
    id: 'wheat',
    names: { en: 'Wheat', te: 'గోధుమ', hi: 'गेहूँ' },
    category: 'Cereals',
    seasons: ['Rabi'],
    image: '/images/crops/wheat.jpg',
    imageAlt: {
      en: 'Real golden ripe wheat field with wheat ears in sunlight in India',
      te: 'చలికాలపు పొలంలో బంగారు రంగులో పండిన గోధుమ కంకులు',
      hi: 'खेत में पकी हुई सुनहरी गेहूं की बालियां',
    },
    icon: '🌾',
    short: {
      en: 'Premier winter cereal crop grown under cool conditions with timely irrigations.',
      te: 'శీతాకాలంలో చల్లని వాతావరణంలో సాగు చేసే ప్రధాన ఆహార ధాన్యపు పంట.',
      hi: 'रबी मौसम की प्रमुख खाद्यान्न फसल जो ठंडे मौसम में उगाई जाती है।',
    },
    description: {
      en: 'Wheat is the premier Rabi cereal. Critical crown root initiation (CRI) irrigation at 21 days after sowing determines root establishment and tillering.',
      te: 'గోధుమ శీతాకాలంలో సాగు చేసే ముఖ్యమైన పంట. విత్తిన 21 రోజులకు మొదటి తడి (కిరీటం వేర్లు వచ్చే దశ) ఇవ్వడం చాలా ముఖ్యం. ఇది పిలకల సంఖ్యను పెంచుతుంది.',
      hi: 'गेहूं रबी की प्रमुख फसल है। बुवाई के 21 दिन बाद पहली सिंचाई (सीआरआई अवस्था) सबसे महत्वपूर्ण होती है।',
    },
    growthStages: {
      en: ['Sowing', 'Crown Root Initiation (CRI)', 'Tillering', 'Jointing', 'Heading / Flowering', 'Milking & Dough', 'Maturity & Harvest'],
      te: ['విత్తుట', 'కిరీటం వేర్లు వచ్చే దశ (CRI)', 'పిలకలు తొడిగే దశ', 'కాండం కణుపుల దశ', 'కంకి బయటకు వచ్చే దశ', 'గింజ పాలుపోసుకునే దశ', 'కోత'],
      hi: ['बुवाई', 'सीआरआई (ताज जड़)', 'कल्ले फूटना', 'गांठें बनना', 'बाली निकलना', 'दूधिया अवस्था', 'कटाई'],
    },
    seedTips: {
      en: 'Use certified rust-resistant high yielding varieties (e.g., HD-2967, PBW-550, Lok-1). Treat seed with Carboxin + Thiram.',
      te: 'తుప్పు తెగులును తట్టుకునే రకాలను వాడండి (హెచ్.డి-2967, లోక్-1). విత్తన శుద్ధి తప్పక చేయండి.',
      hi: 'उन्नत किस्में (जैसे HD-2967, PBW-550, लोक-1) चुनें और थीरम से बीज उपचार करें।',
    },
    cultivation: {
      en: 'Prepare fine seedbed. Drill seed at 20-22 cm row spacing at 4-5 cm depth into moist soil.',
      te: 'నేలను మెత్తగా చేసి 20-22 సెం.మీ ఎడంగా సాళ్ళలో 4-5 సెం.మీ లోతులో విత్తుకోండి.',
      hi: '20 से 22 सेमी की दूरी पर कतारों में 4-5 सेमी गहरा बोएं।',
    },
    irrigation: {
      en: 'Requires 4-6 irrigations. Most critical stages are CRI (21 days), tillering, flowering, and grain filling.',
      te: 'మొత్తం 4 నుండి 6 తడులు అవసరం. విత్తిన 21వ రోజు, పూత దశ, గింజ పాలుపోసుకునే దశలో తప్పనిసరిగా నీరు ఇవ్వాలి.',
      hi: 'बुवाई के 21 दिन बाद (CRI), फूल आते समय और दाना भरते समय सिंचाई जरूरी है।',
    },
    fertilizer: {
      en: 'Apply full dose of Phosphorus, Potash and half Nitrogen at sowing. Top-dress remaining Nitrogen in two equal splits before first and second irrigation.',
      te: 'భాస్వరం, పొటాష్ ఎరువులను ఆఖరి దుక్కిలో వేయాలి. యూరియాను మొదటి, రెండవ తడులకు ముందు రెండు దఫాలుగా వేయండి.',
      hi: 'डीएपी और पोटाश बुवाई के समय डालें। यूरिया पहली और दूसरी सिंचाई पर दें।',
    },
    symptoms: {
      en: [
        { sign: 'Yellow or brown powdery pustules on leaves', possible: 'Rust fungal disease (yellow/brown rust). Spray Propiconazole.' },
        { sign: 'Loose black powdery heads replacing grain', possible: 'Loose smut. Rogue out smutted heads and destroy them.' },
      ],
      te: [
        { sign: 'ఆకులపై పసుపు లేదా గోధుమ రంగు పొడి లాంటి మచ్చలు', possible: 'తుప్పు తెగులు (రస్ట్). ప్రాపికోనాజోల్ పిచికారీ చేయండి.' },
        { sign: 'కంకిలో గింజల స్థానంలో నల్లటి బొగ్గు పొడి ఏర్పడటం', possible: 'కాటుక తెగులు. ఆ కంకులను కోసి కాల్చివేయండి.' },
      ],
      hi: [
        { sign: 'पत्तियों पर पीला या भूरा पाउडर (रतुआ)', possible: 'रतुआ (रस्ट) रोग। प्रोपिकोनाजोल का छिड़काव करें।' },
        { sign: 'बाली में काले चूर्ण जैसी गांठें', possible: 'कंडुआ रोग। रोगग्रस्त बालियां नष्ट करें।' },
      ],
    },
    preventive: {
      en: 'Sow between November 1st and 20th for optimal yield. Avoid late sowing to escape terminal heat stress.',
      te: 'నవంబర్ మొదటి పక్షం రోజుల్లో విత్తుకుంటే వేసవి వేడికి ముందే పంట కోతకు వస్తుంది.',
      hi: 'नवंबर के पहले पखवाड़े में बुवाई पूरी कर लें ताकि गर्मी से नुकसान न हो।',
    },
  },

  {
    id: 'chickpea',
    names: { en: 'Chickpea / Bengal Gram', te: 'శనగ', hi: 'चना / बंगाल ग्राम' },
    category: 'Pulses',
    seasons: ['Rabi'],
    image: '/images/crops/chickpea.jpg',
    imageAlt: {
      en: 'Real green chickpea plants with healthy pods growing in an Indian farm field',
      te: 'శనగ చేనులో పచ్చటి శనగ కాయలు (బెంగుళూరు శనగలు)',
      hi: 'खेत में हरी फलियों से लदा चने का पौधा',
    },
    icon: '🌱',
    short: {
      en: 'High-protein pulse crop that fixes nitrogen and enriches soil fertility.',
      te: 'భూమిలో నత్రజనిని స్థిరీకరించి నేల సారాన్ని పెంచే ముఖ్యమైన పప్పుధాన్య పంట.',
      hi: 'मिट्टी की उर्वरता बढ़ाने वाली प्रमुख दलहनी फसल।',
    },
    description: {
      en: 'Chickpea (Bengal Gram / Chana) is widely cultivated on residual moisture in black soils across Andhra Pradesh and Telangana. Pod borer control at flowering is key.',
      te: 'శనగ మన కర్నూలు, అనంతపురం మరియు తెలంగాణ నల్లరేగడి నేలల్లో రబీలో సాగయ్యే ప్రధాన పప్పు పంట. పూత మరియు కాయ దశలో శనగపచ్చ పురుగు నివారణ అధిక దిగుబడికి ముఖ్యం.',
      hi: 'चना रबी की प्रमुख दलहनी फसल है। फूल और फली बनते समय फली छेदक (इल्ली) से फसल को बचाना सबसे महत्वपूर्ण है।',
    },
    growthStages: {
      en: ['Sowing', 'Seedling', 'Branching & Nipping', 'Flowering', 'Pod Development', 'Maturity & Harvest'],
      te: ['విత్తుట', 'మొలక దశ', 'కొమ్మలు తొడిగే దశ (తుంచడం)', 'పూత దశ', 'కాయ ఊరే దశ', 'ముదిరిన శనగల కోత'],
      hi: ['बुवाई', 'अंकुरण', 'शाखाएं निकलना व खूंटाई', 'फूल आना', 'फली बनना', 'कटाई'],
    },
    seedTips: {
      en: 'Use wilt-resistant bold varieties (e.g., JG-11, KAK-2, JAKI-9218). Treat with Rhizobium and Trichoderma.',
      te: 'ఎండు తెగులును తట్టుకునే నాణ్యమైన రకాలు ఎంచుకోండి (జె.జి-11, కె.ఎ.కె-2, జాకీ-9218). రైజోబియంతో విత్తన శుద్ధి చేయండి.',
      hi: 'उकठा रोधी किस्में (जैसे JG-11, JAKI-9218) चुनें। राइजोबियम से बीज उपचार करें।',
    },
    cultivation: {
      en: 'Sow at 30x10 cm spacing. Nip terminal shoots at 30-35 days to encourage profusely branched bushy growth.',
      te: '30x10 సెం.మీ దూరంలో విత్తుకోండి. 30-35 రోజులప్పుడు పై చిగుళ్లను తుంచితే ఎక్కువ కొమ్మలు వచ్చి కాయలు బాగా కాస్తాయి.',
      hi: '30x10 सेमी की दूरी पर बोएं। 30-35 दिन पर ऊपर की टहनियां तोड़ें (खूंटाई करें)।',
    },
    irrigation: {
      en: 'Grown mostly on residual moisture. One light irrigation at branching and one at pod formation boost yield by 40%.',
      te: 'తేలికపాటి నేలల్లో పూతకు ముందు ఒక తడి, కాయ ఊరే సమయంలో మరో తడి ఇస్తే 40% అదనపు దిగుబడి వస్తుంది.',
      hi: 'फूल आने से पहले और फली बनते समय हल्की सिंचाई से 40% तक पैदावार बढ़ती है।',
    },
    fertilizer: {
      en: 'Apply 10 kg N and 20 kg P2O5 per acre as basal dose. Spray 2% Urea at flowering to enhance pod setting.',
      te: 'ఎకరాకు 10 కిలోల నత్రజని, 20 కిలోల భాస్వరం ఆఖరి దుక్కిలో వేయండి. పూత సమయంలో 2% యూరియా పిచికారీ చేయండి.',
      hi: 'बुवाई के समय डीएपी दें। फूल आते समय 2% यूरिया का छिड़काव लाभकारी है।',
    },
    symptoms: {
      en: [
        { sign: 'Bored holes in pods with larvae feeding inside', possible: 'Gram pod borer (Helicoverpa). Install ' + 'pheromone traps (5/acre).' },
        { sign: 'Sudden wilting and drying of plants in patches', possible: 'Fusarium wilt disease. Rogue infected plants.' },
      ],
      te: [
        { sign: 'కాయలకు రంధ్రాలు పడి లోపల గింజలు తినేయడం', possible: 'శనగపచ్చ పురుగు (హెలికోనెర్పా). ఎకరాకు 5 లింగాకర్షక బుట్టలు పెట్టండి.' },
        { sign: 'మొక్కలు ఉన్నట్టుండి పచ్చదనం కోల్పోయి ఎండిపోవడం', possible: 'ఎండు తెగులు (ఫ్యుసేరియం విల్ట్). ట్రైకోడెర్మా వాడండి.' },
      ],
      hi: [
        { sign: 'फलियों में छेद और अंदर इल्ली का दाना खाना', possible: 'फली छेदक कीट। फेरोमोन ट्रैप लगाएं।' },
        { sign: 'अचानक पौधे का सूखना', possible: 'उकठा (विल्ट) रोग।', },
      ],
    },
    preventive: {
      en: 'Install T-shaped bird perches (20/acre) to attract insect-eating birds naturally.',
      te: 'పొలంలో ఎకరాకు 20 పక్షి స్థావరాలు (T-ఆకారపు కర్రలు) ఏర్పాటు చేస్తే పక్షులు వాలి పురుగులను తింటాయి.',
      hi: 'खेत में ' + 'T आकार की खूंटियां लगाएं ताकि पक्षी बैठकर कीटों को खा सकें।',
    },
  },

  {
    id: 'soybean',
    names: { en: 'Soybean', te: 'సోయాబీన్', hi: 'सोयाबीन' },
    category: 'Oilseeds',
    seasons: ['Kharif'],
    image: '/images/crops/soybean.jpg',
    imageAlt: {
      en: 'Healthy soybean crop with clusters of green pods in an agricultural field',
      te: 'సోయాబీన్ పొలంలో కాయల గుత్తులతో నిండిన సోయా మొక్కలు',
      hi: 'खेत में हरी फलियों के गुच्छों के साथ सोयाबीन की फसल',
    },
    icon: '🌱',
    short: {
      en: 'Protein and oil-rich legume crop ideal for rainfed black soils in Kharif.',
      te: 'అధిక మాంసకృత్తులు, నూనెనిచ్చే వర్షాధార ఖరీఫ్ పప్పు-నూనెగింజ పంట.',
      hi: 'प्रोटीन और तेल से भरपूर खरीफ की प्रमुख तिलहनी फसल।',
    },
    description: {
      en: 'Soybean performs best in fertile, well-drained black clay soils. Controlling stem fly and girdle beetle during vegetative stage protects the plant.',
      te: 'సోయాబీన్ మన తెలంగాణ, ఉత్తర ఆంధ్రప్రదేశ్ నల్లరేగడి నేలల్లో ఖరీఫ్‌లో సాగవుతుంది. మొలక దశ నుండి కాండం ఈగ, గిర్డిల్ బీటిల్ రాకుండా చూసుకోవాలి.',
      hi: 'सोयाबीन खरीफ की प्रमुख फसल है। तना मक्खी और चक्र भृंग (गर्डल बीटल) से शुरुआती 30 दिनों में फसल को बचाएं।',
    },
    growthStages: {
      en: ['Sowing', 'Emergence', 'Vegetative (V-stages)', 'Flowering (R1-R2)', 'Pod Formation (R3-R4)', 'Seed Filling', 'Harvest'],
      te: ['విత్తుట', 'మొలకెత్తుట', 'మొక్క ఎదిగే దశ', 'పూత దశ', 'కాయలు ఏర్పడే దశ', 'గింజ ఊరే దశ', 'కోత'],
      hi: ['बुवाई', 'अंकुरण', 'वनस्पतिक वृद्धि', 'फूल आना', 'फली बनना', 'दाना भरना', 'कटाई'],
    },
    seedTips: {
      en: 'Use certified seed (e.g., JS-335, JS-9305, JS-9560). Inoculate with Bradyrhizobium culture.',
      te: 'గుర్తింపు పొందిన నాణ్యమైన విత్తనాలు వాడండి (జె.ఎస్-335, జె.ఎస్-9305, బాసర). బ్రాడీరైజోబియంతో విత్తన శుద్ధి చేయండి.',
      hi: 'प्रमाणित बीज (JS-335, JS-9560) बोएं। राइजोबियम से उपचारित करें।',
    },
    cultivation: {
      en: 'Sow with seed-cum-fertilizer drill at 45x5 cm spacing when soil has received at least 75 mm rain.',
      te: 'మంచి వర్షం కురిసిన తర్వాత 45x5 సెం.మీ దూరంలో సాళ్ళలో విత్తుకోవాలి.',
      hi: '45x5 सेमी की दूरी पर कतारों में बोएं।',
    },
    irrigation: {
      en: 'Grown as rainfed crop. Provide protective irrigation during dry spells at flowering and pod filling.',
      te: 'వర్షాధార పంటగా వేస్తారు. వర్షాభావ పరిస్థితుల్లో పూత, కాయ తయారయ్యే సమయంలో రక్షక తడి ఇవ్వాలి.',
      hi: 'सूखे की स्थिति में फूल और फली बनते समय जीवनरक्षक सिंचाई दें।',
    },
    fertilizer: {
      en: 'Apply 12 kg N, 24 kg P2O5, 16 kg K2O, and 10 kg Sulphur per acre at sowing time.',
      te: 'ఎకరాకు 12 కిలోల నత్రజని, 24 కిలోల భాస్వరం, 10 కిలోల సల్ఫర్ వేయండి.',
      hi: 'बुवाई के समय फास्फोरस, पोटाश और सल्फर अवश्य दें।',
    },
    symptoms: {
      en: [
        { sign: 'Ring-like cut on stem with wilting top shoot', possible: 'Girdle beetle attack. Spray Chlorantraniliprole or Thiamethoxam.' },
        { sign: 'Yellow mosaic patches on leaves', possible: 'Yellow Mosaic Virus (spread by whiteflies). Control vector.' },
      ],
      te: [
        { sign: 'కాండంపై ఉంగరం లాంటి గాటు పడి పై భాగం ఎండిపోవడం', possible: 'గిర్డిల్ బీటిల్ (కాండం పురుగు). సిఫార్సు చేసిన మందును పిచికారీ చేయండి.' },
        { sign: 'ఆకులపై పసుపు పచ్చటి చారలు ఏర్పడటం', possible: 'పసుపు పచ్చ తెగులు (వైరస్). తెల్లదోమ నివారణకు జిగురు అట్టలు పెట్టండి.' },
      ],
      hi: [
        { sign: 'तने पर छल्लेदार कट और ऊपरी भाग सूखना', possible: 'गर्डल बीटल कीट।' },
        { sign: 'पत्तियों पर पीला मोजेक धब्बा', possible: 'येलो मोजेक वायरस।' },
      ],
    },
    preventive: {
      en: 'Harvest when leaves turn yellow and drop and pods turn golden brown. Avoid shattering losses by harvesting on time.',
      te: 'ఆకులు పసుపుబారి రాలిపోయి కాయలు గోధుమ రంగులోకి మారిన వెంటనే కోత కోయండి. ఆలస్యమైతే కాయలు పగిలి గింజలు రాలుతాయి.',
      hi: 'पत्तियां सूखकर झड़ने पर समय पर कटाई करें।',
    },
  },

  {
    id: 'redgram',
    names: { en: 'Pigeon Pea / Red Gram', te: 'కందులు', hi: 'अरहर / तुअर' },
    category: 'Pulses',
    seasons: ['Kharif'],
    image: '/images/crops/redgram.jpg',
    imageAlt: {
      en: 'Pigeon pea red gram crop field with yellow flowers and green pods in India',
      te: 'కంది చేనులో పసుపు పూలు మరియు కాయలతో నిండిన కంది మొక్కలు',
      hi: 'खेत में पीले फूलों और फलियों से लदा अरहर का पौधा',
    },
    icon: '🌱',
    short: {
      en: 'Long-duration pulse crop ideal for intercropping with cotton, maize, and groundnut.',
      te: 'పత్తి, మొక్కజొన్న, వేరుశనగతో అంతర పంటగా సాగు చేయగల ముఖ్యమైన పప్పు పంట.',
      hi: 'कपास, मक्का व मूंगफली के साथ उगाई जाने वाली प्रमुख दलहनी फसल।',
    },
    description: {
      en: 'Pigeon Pea (Red Gram / Arhar) is deep-rooted, drought-tolerant, and revitalizes soil nitrogen. Intercropping maintains farm income stability.',
      te: 'కంది లోతైన వేరు వ్యవస్థ కలిగిన వర్షాధార పంట. వర్షాభావ పరిస్థితులను కూడా బాగా తట్టుకుంటుంది. వేరుశనగలో 7:1 లేదా పత్తిలో అంతరపంటగా వేస్తే మంచి లాభం.',
      hi: 'अरहर सूखे को सहन करने वाली गहरी जड़ों वाली फसल है। यह मिट्टी में नाइट्रोजन बढ़ाती है।',
    },
    growthStages: {
      en: ['Sowing', 'Vegetative', 'Branching & Canopy', 'Flowering', 'Pod Setting', 'Maturity & Harvest'],
      te: ['విత్తుట', 'ఎదుగుదల దశ', 'కొమ్మలు విస్తరించే దశ', 'పూత దశ', 'కాయలు తయారయ్యే దశ', 'కంది కోత'],
      hi: ['बुवाई', 'वनस्पतिक वृद्धि', 'शाखाएं फैलना', 'फूल आना', 'फली बनना', 'कटाई'],
    },
    seedTips: {
      en: 'Use wilt-resistant hybrids (e.g., LRG-41, LRG-52, Asha / ICPL-87119, PRG-176). Treat with Rhizobium.',
      te: 'ఎండు తెగులు తట్టుకునే నాణ్యమైన రకాలు (ఎల్.ఆర్.జి-41 అమరావతి, ఆశా, పి.ఆర్.జి-176) వాడండి. విత్తన శుద్ధి తప్పనిసరి.',
      hi: 'उकठा रोधी किस्में (आशा ICPL-87119, LRG-41) चुनें और राइजोबियम से उपचार करें।',
    },
    cultivation: {
      en: 'Maintain 120-150 cm row spacing for sole crop or 1:7 with groundnut/soybean. Deep soil aeration improves root penetration.',
      te: 'ప్రత్యేక పంటగా వేస్తే సాళ్ళ మధ్య 4-5 అడుగుల దూరం ఉంచండి. అంతరపంటగా వేస్తే 7 సాళ్ళ వేరుశనగకు 1 సాలు కంది వేయండి.',
      hi: 'एकल फसल में कतारों की दूरी 4 से 5 फीट रखें।',
    },
    irrigation: {
      en: 'Primarily rainfed. One protective irrigation at flowering and one at pod development prevent massive flower drops.',
      te: 'వర్షాధారంగా పండిస్తారు. తీవ్ర వర్షాభావం ఉంటే పూత మరియు కాయ దశలో ఒక్క తడి ఇస్తే పూత రాలకుండా కాయలు బాగా పడతాయి.',
      hi: 'फूल आते समय और फली बनते समय आवश्यकतानुसार हल्की सिंचाई दें।',
    },
    fertilizer: {
      en: 'Apply 8 kg N, 20 kg P2O5, and 10 kg Sulphur per acre as basal dose during last ploughing.',
      te: 'ఆఖరి దుక్కిలో ఎకరాకు సిఫార్సు చేసిన ఎరువులు వేయండి.',
      hi: 'बुवाई के समय डीएपी और सल्फर का उपयोग करें।',
    },
    symptoms: {
      en: [
        { sign: 'Holes in pods and chewed flower buds', possible: 'Helicoverpa pod borer and Maruca webber. Spray Emamectin benzoate.' },
        { sign: 'Sterility with bushy pale green leaves without flowers', possible: 'Sterility Mosaic Disease (spread by eriophyid mites).' },
      ],
      te: [
        { sign: 'కాయలకు రంధ్రాలు, పూత గూడు కట్టుకోవడం', possible: 'మరుక మచ్చల పురుగు, శనగపచ్చ పురుగు. సిఫార్సు చేసిన మందును పిచికారీ చేయండి.' },
        { sign: 'మొక్క గిడసబారి పూత రాకపోవడం (గొడ్రాలితనం)', possible: 'స్టెరిలిటీ మొజాయిక్ తెగులు (నల్లి పురుగు ద్వారా). రోగగ్రస్థ మొక్కలను పీకివేయండి.' },
      ],
      hi: [
        { sign: 'फलियों में छेद और फूल पर जाला', possible: 'मारुका व फली छेदक कीट।' },
        { sign: 'पौधे पर फूल न आना (बांझपन रोग)', possible: 'स्टेरिलिटी मोजेक रोग।' },
      ],
    },
    preventive: {
      en: 'Shake plants vigorously in morning to dislodge pod borer caterpillars onto plastic sheets and destroy them.',
      te: 'ఉదయం పూట మొక్కలను గట్టిగా ఊపితే పురుగులు నేలపై పడతాయి, వాటిని ఏరి నాశనం చేయవచ్చు.',
      hi: 'सुबह के समय पौधों को हिलाकर नीचे गिरी इल्लियों को नष्ट करें।',
    },
  },

  {
    id: 'tomato',
    names: { en: 'Tomato', te: 'టమోటా', hi: 'टमाटर' },
    category: 'Vegetables',
    seasons: ['Rabi', 'Kharif', 'Zaid'],
    image: '/images/crops/tomato.jpg',
    imageAlt: {
      en: 'Real healthy tomato plants loaded with ripe red and green tomatoes on vine in Indian farm',
      te: 'టమోటా తోటలో తీగలకు గుత్తులుగా కాసిన ఎర్రటి, దోర టమోటా కాయలు',
      hi: 'खेत में पौधों पर लदे हुए ताजे लाल और हरे टमाटर के गुच्छे',
    },
    icon: '🍅',
    short: {
      en: 'Popular vegetable fruit cultivated year-round with high market demand.',
      te: 'ఏడాది పొడవునా సాగు చేయగల అత్యంత ప్రజాదరణ పొందిన కూరగాయ పంట.',
      hi: 'साल भर उगाई जाने वाली सबसे लोकप्रिय और नकदी सब्जी फसल।',
    },
    description: {
      en: 'Tomato is a high-yielding, quick vegetable. Staking plants and installing drip irrigation prevent soil-contact rots and improve fruit grade.',
      te: 'టమోటా 90-100 రోజుల్లో దిగుబడినిచ్చే పంట. తాళ్ల పద్ధతి (స్టేకింగ్) లో సాగు చేస్తే కాయలు నేలకు తగలకుండా నాణ్యంగా, రోగరహితంగా ఉంటాయి.',
      hi: 'टमाटर 3 महीने में पैदावार देने वाली सब्जी है। पौधों को बांस-तार के सहारे बांधने से फल जमीन पर नहीं लगते और रोग कम होते हैं।',
    },
    growthStages: {
      en: ['Nursery', 'Transplanting', 'Vegetative & Staking', 'Flowering', 'Fruit Setting', 'Harvesting'],
      te: ['నారుమడి', 'నాట్లు వేయుట', 'ఎదుగుదల & స్టేకింగ్ (తాళ్ళు కట్టుట)', 'పూత దశ', 'కాయలు కాసే దశ', 'టమోటా కోత'],
      hi: ['नर्सरी', 'रोपाई', 'तार-बांस से सहारा', 'फूल आना', 'फल लगना', 'तुड़ाई'],
    },
    seedTips: {
      en: 'Use high-yielding indeterminate hybrids resistant to Tomato Leaf Curl Virus (ToLCV) (e.g., Arka Rakshak, Saaho, US-440).',
      te: 'ఆకుముడత వైరస్ ను తట్టుకునే హైబ్రిడ్ రకాలను ఎంచుకోండి (అర్క రక్షక్, సాహో, యుఎస్-440).',
      hi: 'मरोड़िया (लीफ कर्ल) वायरस रोधी संकर बीज (जैसे अर्का रक्षक, साहो) ही चुनें।',
    },
    cultivation: {
      en: 'Raise on beds with mulch. Tie vines to trellis wires for clean, uniform harvest.',
      te: 'ఎత్తు మడులపై మల్చింగ్ షీట్ వేసి నాటండి. తీగలను కర్రలకు కట్టి పైకి ఎక్కించండి.',
      hi: 'मेड़ बनाकर मल्चिंग शीट पर लगाएं और बांस से सहारा दें।',
    },
    irrigation: {
      en: 'Even moisture prevents fruit cracking and blossom-end rot. Avoid sprinkler irrigation which wets foliage.',
      te: 'నీటిని సమతుల్యంగా ఇవ్వండి. ఎక్కువ ఎండ తర్వాత ఒక్కసారిగా ఎక్కువ నీరిస్తే కాయలు పగులుతాయి.',
      hi: 'नियमित रूप से हल्का पानी दें। पानी में उतार-चढ़ाव से फल फटने लगते हैं।',
    },
    fertilizer: {
      en: 'Spray Calcium Nitrate and Boron at flowering to strengthen fruit skin and prevent blossom-end rot.',
      te: 'పూత మరియు పిందె దశలో కాల్షియం నైట్రేట్ మరియు బోరాన్ పిచికారీ చేస్తే కాయ తొడిమ కుళ్లు రాదు, కాయ నిగనిగలాడుతుంది.',
      hi: 'फूल आते समय कैल्शियम नाइट्रेट और बोरॉन का छिड़काव करें ताकि फल चमकदार बनें।',
    },
    symptoms: {
      en: [
        { sign: 'Stunted plant with upward cupped small leaves', possible: 'Tomato leaf curl virus (spread by whiteflies). Control vector.' },
        { sign: 'Black sunken rot at bottom of fruit', possible: 'Blossom-end rot due to calcium deficiency. Spray Calcium Nitrate.' },
      ],
      te: [
        { sign: 'ఆకులు చిన్నవిగా మారి పైకి ముడుచుకుపోవడం', possible: 'జెమిని వైరస్ (తెల్లదోమ ద్వారా వ్యాప్తి). తెల్లదోమ నివారణకు జిగురు అట్టలు వాడండి.' },
        { sign: 'కాయ క్రింది భాగం నల్లగా కుళ్లిపోవడం', possible: 'కాల్షియం లోపం. కాల్షియం నైట్రేట్ పిచికారీ చేయండి.' },
      ],
      hi: [
        { sign: 'पत्तियों का मुड़ना और छोटा रह जाना', possible: 'लीफ कर्ल वायरस। मक्खी का नियंत्रण करें।' },
        { sign: 'फल के निचले हिस्से का काला पड़ना', possible: 'कैल्शियम की कमी। कैल्शियम छिड़कें।' },
      ],
    },
    preventive: {
      en: 'Prune side shoots to improve aeration. Pick mature green or pink fruits for transport to distant mandis.',
      te: 'గాలి వెలుతురు బాగా తగిలేలా అనవసర కొమ్మలను తొలగించండి. దూర మార్కెట్లకు పంపేటప్పుడు దోర కాయలను కోయండి.',
      hi: 'दूर की मंडी के लिए हल्के पके फल ही तोड़ें।',
    },
  },

  {
    id: 'onion',
    names: { en: 'Onion', te: 'ఉల్లిపాయ', hi: 'प्याज' },
    category: 'Vegetables',
    seasons: ['Rabi', 'Kharif'],
    image: '/images/crops/onion.jpg',
    imageAlt: {
      en: 'Real freshly harvested red onions with green tops on agricultural farm soil in India',
      te: 'పొలంలో తవ్విన తాజా ఎర్ర ఉల్లిపాయ గడ్డలు మరియు పచ్చటి ఆకులు',
      hi: 'खेत में मिट्टी पर ताजी लाल प्याज की खुदाई',
    },
    icon: '🧅',
    short: {
      en: 'Essential culinary bulb vegetable with steady local market demand.',
      te: 'నిత్యావసర కూరగాయ పంట. మార్కెట్ ధరలు సరిగ్గా ఉంటే మంచి లాభాలు పొందవచ్చు.',
      hi: 'दैनिक उपयोग की प्रमुख कंद फसल जिसकी बाजार में हमेशा मांग रहती है।',
    },
    description: {
      en: 'Onion requires fine tilth, shallow transplanting, and weed-free beds during the first 60 days. Stop irrigation 15 days before harvest to allow neck curing.',
      te: 'ఉల్లి పంటకు మొదటి 45-60 రోజులు కలుపు లేకుండా చూసుకోవడం అత్యంత ముఖ్యం. ఊట నిలిచే సమయంలో సల్ఫర్ మరియు పొటాష్ అందిస్తే ఉల్లి గడ్డలు గట్టిగా, రంగుతో తయారవుతాయి.',
      hi: 'प्याज की रोपाई उथली करनी चाहिए। पहले 2 महीने खेत को खरपतवार मुक्त रखें। खुदाई से 15 दिन पहले पानी बंद कर दें ताकि प्याज टिकाऊ बने।',
    },
    growthStages: {
      en: ['Nursery', 'Transplanting', 'Vegetative', 'Bulb Formation', 'Neck Fall (Maturity)', 'Curing & Storage'],
      te: ['నారుమడి', 'నాట్లు వేయుట', 'ఎదుగుదల దశ', 'గడ్డ ఊరే దశ', 'మెడ వంగి ఆకులు పడే దశ (పరిపక్వత)', 'ఆరబెట్టుట & నిల్వ'],
      hi: ['नर्सरी', 'रोपाई', 'शाखा वृद्धि', 'कंद बनना', 'गर्दन गिरना (पकाव)', 'सुखाना व भंडारण'],
    },
    seedTips: {
      en: 'Use varieties matched to the season (e.g., Bhima Super for Kharif; Bhima Shakti / N-53 / Arka Kalyan for Rabi).',
      te: 'మీ సాగు కాలానికి తగిన రకాలు ఎంచుకోండి (ఖరీఫ్‌కు భీమా సూపర్, రబీకి భీమా శక్తి, అర్క కళ్యాణ్).',
      hi: 'मौसम के अनुसार सही बीज चुनें (खरीफ के लिए भीमा सुपर; रबी के लिए भीमा शक्ति, अर्का कल्याण)।',
    },
    cultivation: {
      en: 'Transplant 6-7 week old sturdy seedlings at 15x10 cm spacing. Do not plant seedlings too deep.',
      te: '40-45 రోజుల ఆరోగ్యకరమైన నారును 15x10 సెం.మీ దూరంలో నాటండి. నారును మరీ లోతుగా నాటవద్దు.',
      hi: '45 दिन की स्वस्थ पौध 15x10 सेमी की दूरी पर लगाएं। पौधे को ज्यादा गहरा न दबाएं।',
    },
    irrigation: {
      en: 'Frequent light waterings. Withhold water when 50% tops fall over to ensure thick outer skin for storage.',
      te: 'గడ్డ ఊరే దశలో నేల ఆరిపోకుండా తడులు ఇవ్వండి. పొలంలో 50% మొక్కల పైభాగం వాలిపోయినప్పుడు నీరు ఆపేయండి.',
      hi: 'हल्की सिंचाई करते रहें। 50% पौधों की पत्तियां झुकने पर सिंचाई पूरी तरह बंद कर दें।',
    },
    fertilizer: {
      en: 'Apply Sulphur (15-20 kg/acre) along with Potash for rich pungency, uniform bulb color, and long shelf life.',
      te: 'ఎకరాకు 15 కిలోల సల్ఫర్ మరియు తగినంత పొటాష్ వేయండి. సల్ఫర్ వేయడం వల్ల ఉల్లి గడ్డకు మంచి రంగు, నిల్వ సామర్థ్యం వస్తాయి.',
      hi: 'पोटाश के साथ 15-20 किलो सल्फर प्रति एकड़ डालें। इससे प्याज का रंग गहरा और भंडारण क्षमता बढ़ती है।',
    },
    symptoms: {
      en: [
        { sign: 'Silvery white streaks on leaves with twisted tips', possible: 'Thrips infestation. Spray neem formulation or spinosad.' },
        { sign: 'Purple blotches on foliage with yellowing', possible: 'Purple blotch fungal infection. Spray Mancozeb.' },
      ],
      te: [
        { sign: 'ఆకులపై తెల్లటి వెండి లాంటి చారలు, కొనలు ఎండిపోవడం', possible: 'ఉల్లి తామర పురుగు (త్రిప్స్). వేప నూనె లేదా ఫిప్రోనిల్ పిచికారీ చేయండి.' },
        { sign: 'ఆకులపై ఊదా రంగు మచ్చలు', possible: 'పర్పుల్ బ్లాచ్ (ఊదా మచ్చ తెగులు). మాంకోజెబ్ పిచికారీ చేయండి.' },
      ],
      hi: [
        { sign: 'पत्तियों पर सफेद धारियां और मुड़े सिरे', possible: 'थ्रिप्स का प्रकोप। नीम तेल का छिड़काव करें।' },
        { sign: 'पत्तियों पर बैंगनी रंग के धब्बे', possible: 'पर्पल ब्लॉच (बैंगनी धब्बा)। मैंकोजेब छिड़कें।' },
      ],
    },
    preventive: {
      en: 'Cure bulbs in shade with foliage for 3-4 days after harvest before cutting the neck. Store on raised slotted racks.',
      te: 'కోత తర్వాత ఉల్లిపాయలను ఆకులతో సహా 3-4 రోజులు నీడలో ఆరబెట్టాలి. గాలి ఆడే షెడ్డులలో నిల్వ చేయండి.',
      hi: 'खुदाई के बाद 3-4 दिन छाया में सुखाएं। हवादार चबूतरे पर ही प्याज का भंडारण करें।',
    },
  },
];

/**
 * Helper to get localized crop name
 */
export function getCropName(crop, lang = 'en') {
  if (!crop) return '';
  if (crop.names && crop.names[lang]) return crop.names[lang];
  if (lang === 'te' && crop.names?.te) return crop.names.te;
  if (lang === 'hi' && crop.names?.hi) return crop.names.hi;
  return crop.name || crop.names?.en || '';
}

/**
 * Helper to get localized crop field (short, description, seedTips, etc.)
 */
export function getCropText(crop, field, lang = 'en') {
  if (!crop) return '';
  const val = crop[field];
  if (!val) return '';
  if (typeof val === 'object') {
    return val[lang] || val.en || '';
  }
  return val;
}

/**
 * Helper to get localized image alt text
 */
export function getCropImageAlt(crop, lang = 'en') {
  if (!crop) return '';
  if (crop.imageAlt && typeof crop.imageAlt === 'object') {
    return crop.imageAlt[lang] || crop.imageAlt.en || '';
  }
  const name = getCropName(crop, lang);
  return `${name} - AgriMitra`;
}

/**
 * Helper to get localized growth stages array
 */
export function getCropGrowthStages(crop, lang = 'en') {
  if (!crop) return [];
  if (crop.growthStages && typeof crop.growthStages === 'object' && !Array.isArray(crop.growthStages)) {
    return crop.growthStages[lang] || crop.growthStages.en || [];
  }
  return Array.isArray(crop.growthStages) ? crop.growthStages : [];
}

/**
 * Helper to get localized symptoms array
 */
export function getCropSymptoms(crop, lang = 'en') {
  if (!crop) return [];
  if (crop.symptoms && typeof crop.symptoms === 'object' && !Array.isArray(crop.symptoms)) {
    return crop.symptoms[lang] || crop.symptoms.en || [];
  }
  return Array.isArray(crop.symptoms) ? crop.symptoms : [];
}

export function getCropById(id) {
  return CROPS.find((crop) => crop.id === id) || null;
}
