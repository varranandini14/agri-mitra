/**
 * AgriMitra Central & State Schemes Database
 * Comprehensive localized information for Telugu, Hindi, and English.
 * Educational reference — confirm rules, deadlines and application processes on official portals.
 */

export const SCHEME_CATEGORIES = [
  'Income support',
  'Crop insurance',
  'Credit',
  'Irrigation & Solar',
  'Soil health',
  'Market access',
  'Equipment subsidy',
  'Organic farming',
];

export const SCHEME_CATEGORY_LABELS = {
  en: {
    'Income support': 'Income Support',
    'Crop insurance': 'Crop Insurance',
    Credit: 'Credit & Kisan Loans',
    'Irrigation & Solar': 'Irrigation & Solar Pumps',
    'Soil health': 'Soil Health & Testing',
    'Market access': 'Market Access & e-NAM',
    'Equipment subsidy': 'Machinery & Equipment Subsidy',
    'Organic farming': 'Organic & Natural Farming',
  },
  te: {
    'Income support': 'ఆదాయ సహాయం (PM-కిసాన్)',
    'Crop insurance': 'పంట బీమా (PMFBY)',
    Credit: 'రుణ సదుపాయం & KCC కార్డ్',
    'Irrigation & Solar': 'నీటిపారుదల & సోలార్ పంపులు',
    'Soil health': 'భూసార పరీక్ష (మట్టి కార్డు)',
    'Market access': 'మార్కెట్ సదుపాయం & ఈ-నామ్',
    'Equipment subsidy': 'వ్యవసాయ యంత్రాల రాయితీ',
    'Organic farming': 'సేంద్రీయ & ప్రకృతి వ్యవసాయం',
  },
  hi: {
    'Income support': 'आय सहायता (पीएम-किसान)',
    'Crop insurance': 'फसल बीमा (पीएमएफबीवाई)',
    Credit: 'ऋण सुविधा व केसीसी (KCC)',
    'Irrigation & Solar': 'सिंचाई व सोलर पंप (कुसुम)',
    'Soil health': 'मृदा स्वास्थ्य व जांच',
    'Market access': 'मंडी पहुंच व ई-नाम (e-NAM)',
    'Equipment subsidy': 'कृषि यंत्र व सब्सिडी',
    'Organic farming': 'जैविक व प्राकृतिक खेती',
  },
};

export const DOCUMENT_LIBRARY = [
  {
    id: 'aadhaar',
    labels: {
      en: 'Aadhaar card (linked to mobile & bank)',
      te: 'ఆధార్ కార్డు (మొబైల్ మరియు బ్యాంకుతో లింక్ అయినది)',
      hi: 'आधार कार्ड (मोबाइल और बैंक से लिंक)',
    },
  },
  {
    id: 'bank',
    labels: {
      en: 'Bank passbook / cancelled cheque',
      te: 'బ్యాంకు పాస్ బుక్ జిరాక్స్ / రద్దు చేసిన చెక్కు',
      hi: 'बैंक पासबुक / रद्द किया गया चेक',
    },
  },
  {
    id: 'land',
    labels: {
      en: 'Land title record (Pattadar Passbook / 1-B / Adangal / RoR)',
      te: 'భూమి రికార్డు (పట్టాదారు పాస్ బుక్ / 1-B / అడంగల్ / పహణీ)',
      hi: 'भूमि दस्तावेज (खतौनी / पट्टा / जमाबंदी / 7/12)',
    },
  },
  {
    id: 'photo',
    labels: {
      en: 'Passport-size photographs',
      te: 'పాస్‌పోర్ట్ సైజు ఫోటోలు',
      hi: 'पासपोर्ट साइज फोटो',
    },
  },
  {
    id: 'mobile',
    labels: {
      en: 'Active registered mobile number (for OTP)',
      te: 'ఓటీపీ (OTP) కోసం ఆధార్‌తో లింక్ అయిన మొబైల్ నంబర్',
      hi: 'ओटीपी (OTP) के लिए आधार से जुड़ा मोबाइल नंबर',
    },
  },
  {
    id: 'kcc',
    labels: {
      en: 'Existing Kisan Credit Card / Loan details (if applicable)',
      te: 'కిసాన్ క్రెడిట్ కార్డ్ (KCC) లేదా బ్యాంకు రుణ వివరాలు',
      hi: 'किसान क्रेडिट कार्ड (KCC) या बैंक ऋण विवरण',
    },
  },
  {
    id: 'sowing',
    labels: {
      en: 'Crop sowing certificate / VRO e-Crop declaration',
      te: 'ఈ-క్రాప్ బుకింగ్ రసీదు / గ్రామ రెవెన్యూ అధికారి పంట ధృవీకరణ పత్రం',
      hi: 'फसल बुवाई प्रमाण पत्र / गिरदावरी रिपोर्ट',
    },
  },
  {
    id: 'soil',
    labels: {
      en: 'Soil Health Card copy (if issued)',
      te: 'భూసార పరీక్ష కార్డు (Soil Health Card) నకలు',
      hi: 'मृदा स्वास्थ्य कार्ड (Soil Health Card) की प्रति',
    },
  },
  {
    id: 'electricity',
    labels: {
      en: 'Agricultural electricity connection / Borewell depth certificate',
      te: 'బోరుబావి సర్టిఫికెట్ / వ్యవసాయ విద్యుత్ కనెక్షన్ రసీదు',
      hi: 'कृषि बिजली कनेक्शन / बोरवेल गहराई प्रमाण पत्र',
    },
  },
  {
    id: 'quotation',
    labels: {
      en: 'Authorized dealer quotation / machinery proforma invoice',
      te: 'గుర్తింపు పొందిన డీలర్ నుండి పరికరాల కొటేషన్ / బిల్లు రసీదు',
      hi: 'अधिकृत डीलर से यंत्र का कोटेशन / इनवॉइस',
    },
  },
];

export const SCHEMES = [
  {
    id: 'pm-kisan',
    category: 'Income support',
    names: {
      en: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      te: 'పీఎం కిసాన్ (ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి - ₹6,000 వార్షిక సహాయం)',
      hi: 'पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि - ₹6,000 वार्षिक)',
    },
    purposes: {
      en: 'Central income-support scheme providing ₹6,000 per year in 3 equal instalments of ₹2,000 to eligible landholding farmer families direct into bank accounts.',
      te: 'అర్హులైన రైతు కుటుంబాలకు పెట్టుబడి సహాయంగా ఏడాదికి ₹6,000 రూపాయలను మూడు విడతలలో (విడతకు ₹2,000 చొప్పున) నేరుగా బ్యాంకు ఖాతాల్లో జమ చేసే కేంద్ర ప్రభుత్వ పథకం.',
      hi: 'योग्य भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता 3 समान किस्तों (₹2,000 प्रत्येक) में सीधे बैंक खाते में दी जाती है।',
    },
    eligibilities: {
      en: [
        'All landholding cultivable farmer families across India.',
        'Mandatory e-KYC and Aadhaar-seeded bank account (DBT enabled).',
        'Land record linkage (Land Seeding) must be completed on portal.',
        'Income tax payers, institutional owners, and government pensioners (>₹10,000) are excluded.',
      ],
      te: [
        'వ్యవసాయ భూమి పట్టాదారు పాస్ బుక్ కలిగిన అర్హులైన రైతు కుటుంబాలు.',
        'ఆధార్ ఇ-కేవైసీ (e-KYC) మరియు బ్యాంకు ఖాతాకు ఆధార్ లింక్ (DBT) తప్పనిసరి.',
        'పోర్టల్‌లో భూమి రికార్డు సీడింగ్ (Land Seeding) పూర్తయి ఉండాలి.',
        'ఆదాయపు పన్ను చెల్లించేవారు, ప్రభుత్వ ఉద్యోగులు/పెన్షనర్లకు వర్తించదు.',
      ],
      hi: [
        'कृषि योग्य भूमि वाले सभी पात्र किसान परिवार।',
        'आधार ई-केवाईसी (e-KYC) और बैंक खाते से आधार सीडिंग (DBT) अनिवार्य है।',
        'पोर्टल पर भूमि रिकॉर्ड सीडिंग (Land Seeding) होना जरूरी है।',
        'आयकर दाता और सरकारी कर्मचारी/पेंशनभोगी इसके पात्र नहीं हैं।',
      ],
    },
    documents: ['aadhaar', 'bank', 'land', 'mobile'],
    steps: {
      en: [
        'Visit the official portal (pmkisan.gov.in) or your local CSC / Rythu Bharosa Kendram.',
        'Complete OTP-based e-KYC or biometric verification.',
        'Check approval status under "Know Your Status" with registration number.',
        'Ensure bank account is active with NPCI mapping to receive Direct Benefit Transfer.',
      ],
      te: [
        'అధికారిక వెబ్‌సైట్ (pmkisan.gov.in) లేదా గ్రామ సచివాలయం / రైతు సేవా కేంద్రాన్ని సంప్రదించండి.',
        'మొబైల్ ఓటీపీ లేదా వేలిముద్ర ద్వారా ఆధార్ e-KYC పూర్తి చేయండి.',
        'పోర్టల్‌లో "Know Your Status" ద్వారా మీ దరఖాస్తు మరియు వాయిదాల స్థితిని చూసుకోండి.',
        'డబ్బులు జమ కావడానికి మీ బ్యాంకు ఖాతాకు NPCI మ్యాపింగ్ పూర్తయిందో లేదో సరిచూసుకోండి.',
      ],
      hi: [
        'आधिकारिक पोर्टल (pmkisan.gov.in) या सीएससी केंद्र पर जाएं।',
        'ओटीपी या बायोमेट्रिक द्वारा आधार ई-केवाईसी (e-KYC) पूरा करें।',
        'पोर्टल पर "Know Your Status" में जाकर अपने आवेदन व किस्त की स्थिति जांचें।',
        'सुनिश्चित करें कि बैंक खाते में डीबीटी (NPCI) सक्रिय है।',
      ],
    },
    website: 'https://pmkisan.gov.in/',
    websiteLabel: 'pmkisan.gov.in',
  },

  {
    id: 'pmfby',
    category: 'Crop insurance',
    names: {
      en: 'PM Fasal Bima Yojana (PMFBY)',
      te: 'పీఎం ఫసల్ బీమా యోజన (PMFBY - సమగ్ర పంటల బీమా)',
      hi: 'पीएम फसल बीमा योजना (PMFBY - व्यापक फसल सुरक्षा)',
    },
    purposes: {
      en: 'Comprehensive crop insurance covering non-preventable natural risks (drought, flood, cyclone, pests). Farmer premium share is capped at 2% for Kharif, 1.5% for Rabi food grains, and 5% for commercial/horticulture crops.',
      te: 'కరువు, వరదలు, తుఫానులు మరియు తెగుళ్ల వల్ల జరిగే పంట నష్టానికి పూర్తి ఆర్థిక రక్షణ. రైతులు చెల్లించాల్సిన ప్రీమియం: ఖరీఫ్ ఆహార పంటలకు 2%, రబీ పంటలకు 1.5%, వాణిజ్య/కూరగాయల పంటలకు 5% మాత్రమే.',
      hi: 'सूखा, बाढ़, ओलावृष्टि और कीटों से फसल नुकसान की व्यापक भरपाई। किसान का प्रीमियम हिस्सा खरीफ में 2%, रबी में 1.5% और नकदी/बागवानी फसलों में 5% तक सीमित है।',
    },
    eligibilities: {
      en: [
        'All farmers cultivating notified crops in notified insurance areas (villages/mandals).',
        'Both loan-taking farmers (via bank) and non-loanee farmers (via CSC/portal) are eligible.',
        'Sowing must be declared within the seasonal enrolment cut-off date.',
        'Crop damage must be reported within 72 hours of localized calamity.',
      ],
      te: [
        'నోటిఫై చేయబడిన గ్రామాల్లో నిర్దేశిత పంటలను సాగు చేసే రైతులందరూ అర్హులు.',
        'బ్యాంకు రుణం తీసుకున్న మరియు తీసుకోని రైతులు కూడా నమోదు చేసుకోవచ్చు.',
        'ప్రతి సీజన్‌లో నిర్దేశిత ఆఖరి గడువు తేదీ లోపు ప్రీమియం చెల్లించి నమోదు చేయాలి.',
        'ప్రకృతి విపత్తు సంభవించిన 72 గంటల్లోగా టోల్ ఫ్రీ నంబర్ లేదా యాప్ ద్వారా సమాచారం ఇవ్వాలి.',
      ],
      hi: [
        'अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान।',
        'ऋणी और गैर-ऋणी दोनों प्रकार के किसान योजना में शामिल हो सकते हैं।',
        'निर्धारित अंतिम तिथि से पहले फसल का बीमा कराना जरूरी है।',
        'आपदा आने के 72 घंटे के भीतर नुकसान की सूचना देना अनिवार्य है।',
      ],
    },
    documents: ['aadhaar', 'bank', 'land', 'sowing', 'mobile'],
    steps: {
      en: [
        'Check if your crop and village are notified for the current season on pmfby.gov.in.',
        'Get sowing confirmation certificate or e-Crop record from local village agriculture assistant.',
        'Submit application at bank or CSC center before season deadline and obtain policy receipt.',
        'In case of harvest loss or inundation, call toll-free helpline 14447 within 72 hours.',
      ],
      te: [
        'మీ గ్రామంలో ప్రస్తుత సీజన్‌కు ఏయే పంటలకు బీమా వర్తిస్తుందో తెలుసుకోండి.',
        'గ్రామ వ్యవసాయ సహాయకుని ద్వారా ఈ-క్రాప్ బుకింగ్ రసీదు తీసుకోండి.',
        'బ్యాంకు లేదా రైతు సేవా కేంద్రంలో నిర్ణీత గడువు లోపు స్వల్ప ప్రీమియం చెల్లించి రసీదు పొందండి.',
        'పంట నష్టపోయినప్పుడు 14447 టోల్ ఫ్రీ నంబర్‌కు 72 గంటల్లోగా కాల్ చేసి ఫిర్యాదు నమోదు చేయండి.',
      ],
      hi: [
        'pmfby.gov.in पर जांचें कि आपके गांव में कौन सी फसलें अधिसूचित हैं।',
        'कृषि अधिकारी या पटवारी से फसल बुवाई प्रमाण पत्र लें।',
        'बैंक या सीएससी में अंतिम तिथि से पहले प्रीमियम भरकर रसीद प्राप्त करें।',
        'फसल नुकसान होने पर 72 घंटे के भीतर टोल-फ्री 14447 पर तुरंत सूचना दें।',
      ],
    },
    website: 'https://pmfby.gov.in/',
    websiteLabel: 'pmfby.gov.in',
  },

  {
    id: 'kcc',
    category: 'Credit',
    names: {
      en: 'Kisan Credit Card (KCC)',
      te: 'కిసాన్ క్రెడిట్ కార్డ్ (KCC - తక్కువ వడ్డీతో పంట పెట్టుబడి రుణం)',
      hi: 'किसान क्रेडिट कार्ड (KCC - 4% ब्याज पर रियायती कृषि ऋण)',
    },
    purposes: {
      en: 'Affordable short-term institutional credit for seeds, fertilizers, farm machinery operations, and allied dairy/poultry with prompt repayment effective interest rate of just 4% per annum (up to ₹3 Lakh).',
      te: 'విత్తనాలు, ఎరువులు, కూలీ ఖర్చులు మరియు పాడి పరిశ్రమ కోసం బ్యాంకు ద్వారా తక్కువ వడ్డీకి లభించే స్వల్పకాలిక రుణం. సకాలంలో చెల్లిస్తే వడ్డీ రాయితీతో కేవలం 4% వార్షిక వడ్డీ మాత్రమే పడుతుంది.',
      hi: 'बीज, खाद, जुताई और पशुपालन के लिए समय पर सस्ता बैंक ऋण। समय पर ऋण चुकाने पर ब्याज छूट के साथ केवल 4% वार्षिक ब्याज दर (₹3 लाख तक)।',
    },
    eligibilities: {
      en: [
        'Owner cultivators, joint cultivators, and registered tenant farmers / SHG groups.',
        'Dairy, poultry, and fish farmers are also eligible for working capital KCC up to ₹2 Lakh.',
        'Clear credit history without active default in cooperative/commercial banks.',
        'Aadhaar KYC and land ownership / lease document validation.',
      ],
      te: [
        'భూమి కలిగిన రైతులు, కౌలు రైతులు, స్వయం సహాయక సంఘాల సభ్యులు అర్హులు.',
        'పాడి పశువులు, గొర్రెలు, మేకలు, చేపల పెంపకం చేసే రైతులకు కూడా KCC వర్తిస్తుంది.',
        'గతంలో ఎలాంటి బ్యాంకు డిఫాల్ట్ లేని మంచి క్రెడిట్ హిస్టరీ ఉండాలి.',
        'ఆధార్ మరియు భూమి పట్టాదారు పాస్ బుక్ లేదా కౌలు ఒప్పంద పత్రం సమర్పించాలి.',
      ],
      hi: [
        'भूमि स्वामी किसान, बटाईदार और स्वयं सहायता समूह के सदस्य।',
        'डेयरी, पोल्ट्री और मछली पालकों को भी KCC सुविधा उपलब्ध है।',
        'बैंक में पिछला कोई डिफ़ॉल्ट या बकाया नहीं होना चाहिए।',
        'आधार और भूमि दस्तावेज अनिवार्य हैं।',
      ],
    },
    documents: ['aadhaar', 'bank', 'land', 'photo', 'mobile'],
    steps: {
      en: [
        'Obtain single-page simplified KCC form from your nearest bank branch or CSC.',
        'Submit land record documents, crop planning sheet, and Aadhaar card.',
        'Bank evaluates scale of finance per acre and issues Rupay KCC debit card.',
        'Draw funds through ATM, PoS, or cheque as needed during the cultivation season.',
      ],
      te: [
        'సమీపంలోని బ్యాంకు శాఖ లేదా రైతు భరోసా కేంద్రం నుండి సరళీకృత KCC ఫారమ్ తీసుకోండి.',
        'పట్టాదారు పాస్ బుక్ జిరాక్స్, ఆధార్ కార్డు మరియు ఫోటోలను జతచేసి బ్యాంకులో ఇవ్వండి.',
        'ఎకరాకు నిర్ణయించిన ఫైనాన్స్ స్కేల్ ఆధారంగా బ్యాంకు మీకు Rupay KCC కార్డును మంజూరు చేస్తుంది.',
        'విత్తనాలు, ఎరువుల కొనుగోలుకు ఏటీఎం లేదా బ్యాంక్ ద్వారా అవసరమైనప్పుడు డబ్బులు వాడుకోవచ్చు.',
      ],
      hi: [
        'नजदीकी बैंक शाखा से सरल एक-पेज का KCC फॉर्म प्राप्त करें।',
        'भूमि खतौनी, आधार और फोटो लगाकर बैंक में जमा करें।',
        'बैंक एकड़ के आधार पर ऋण सीमा तय कर RuPay डेबिट कार्ड जारी करेगा।',
        'बुवाई के समय एटीएम या चेक द्वारा जरूरत के अनुसार पैसे निकालें।',
      ],
    },
    website: 'https://www.myscheme.gov.in/schemes/kcc',
    websiteLabel: 'myscheme.gov.in (KCC)',
  },

  {
    id: 'pm-kusum',
    category: 'Irrigation & Solar',
    names: {
      en: 'PM-KUSUM (Solar Agricultural Pumps)',
      te: 'పీఎం కుసుమ్ (PM-KUSUM - 60% వరకు రాయితీతో సోలార్ వ్యవసాయ పంపులు)',
      hi: 'पीएम-कुसुम (PM-KUSUM - 60% तक सब्सिडी पर सोलर कृषि पंप)',
    },
    purposes: {
      en: 'Provides up to 60% capital subsidy (Central + State combined) for installing standalone solar irrigation pumps (3 HP to 7.5 HP) and solarising existing tube wells, eliminating recurring diesel and grid power costs.',
      te: 'వ్యవసాయ బోరుబావులకు 60% వరకు భారీ ప్రభుత్వ రాయితీతో సోలార్ పంపుల ఏర్పాటు. డీజిల్ మరియు కరెంట్ బిల్లుల భారం లేకుండా పగటిపూట ఉచితంగా సమృద్ధిగా నీటిపారుదల సౌకర్యం.',
      hi: 'खेतों में 3 HP से 7.5 HP तक के स्टैंडअलोन सोलर पंप लगाने पर 60% तक सब्सिडी। दिन के समय मुफ्त सौर ऊर्जा से निश्चिंत सिंचाई।',
    },
    eligibilities: {
      en: [
        'Individual farmers, farmer groups, water user associations with cultivable land.',
        'Must have assured water source (borewell, dug well, or farm pond).',
        'Beneficiary contribution is typically only 10% to 40% based on state policies.',
        'Priority for areas without regular grid power connection.',
      ],
      te: [
        'సాగు భూమి మరియు బోరుబావి / బావి నీటి వసతి కలిగిన రైతులందరూ అర్హులు.',
        'రైతు వాటాగా కేవలం 10% నుండి 40% మాత్రమే చెల్లించాలి, మిగతాది ప్రభుత్వం భరిస్తుంది.',
        'కరెంట్ సౌకర్యం లేని మారుమూల వ్యవసాయ క్షేత్రాలకు అత్యధిక ప్రాధాన్యత.',
        'రాష్ట్ర పునరుత్పాదక ఇంధన అభివృద్ధి సంస్థ (NREDCAP/REDA) ద్వారా కేటాయింపు.',
      ],
      hi: [
        'भूमि और बोरवेल/कुएं का जल स्रोत रखने वाले सभी किसान।',
        'किसान को केवल 10% से 40% हिस्सा जमा करना होता है, बाकी सरकारी सब्सिडी।',
        'बिजली कनेक्शन रहित दूरदराज खेतों को प्राथमिकता दी जाती है।',
      ],
    },
    documents: ['aadhaar', 'bank', 'land', 'mobile', 'electricity'],
    steps: {
      en: [
        'Check state renewable energy portal (e.g. NREDCAP in AP, REDA) for open application window.',
        'Upload land document and borewell depth confirmation certificate.',
        'Deposit farmer share in designated state treasury/bank account upon sanction.',
        'Authorized vendors install solar panels, controller, and submersible pump on your field.',
      ],
      te: [
        'రాష్ట్ర సోలార్ పోర్టల్ (ఉదా: NREDCAP) లో దరఖాస్తు చేసుకోండి.',
        'పట్టాదారు పాస్ బుక్ మరియు బోరుబావి నీటి లభ్యత ధృవీకరణ పత్రం సమర్పించండి.',
        'మంజూరు ఆర్డర్ వచ్చిన తర్వాత రైతు వాటా మొత్తాన్ని నిర్ణీత ఖాతాలో జమ చేయండి.',
        'అధికారిక కంపెనీ ప్రతినిధులు మీ పొలంలో సోలార్ ప్యానెల్స్ మరియు పంపును ఉచితంగా బిగిస్తారు.',
      ],
      hi: [
        'राज्य अक्षय ऊर्जा निगम के पोर्टल पर ऑनलाइन पंजीकरण करें।',
        'जमीन की खतौनी और बोरवेल प्रमाण पत्र अपलोड करें।',
        'मंजूरी मिलने पर किसान अंश राशि बैंक में जमा करें।',
        'कंपनी के इंजीनियर आपके खेत पर आकर सोलर पंप स्थापित करेंगे।',
      ],
    },
    website: 'https://pmkusum.mnre.gov.in/',
    websiteLabel: 'pmkusum.mnre.gov.in',
  },

  {
    id: 'soil-health',
    category: 'Soil health',
    names: {
      en: 'Soil Health Card Scheme',
      te: 'సాయిల్ హెల్త్ కార్డ్ (భూసార పరీక్ష కార్డు & ఎరువుల సిఫార్సులు)',
      hi: 'मृदा स्वास्थ्य कार्ड (Soil Health Card - संतुलित खाद सलाह)',
    },
    purposes: {
      en: 'Free or subsidized testing of 12 critical soil nutrient parameters (N, P, K, Zinc, Iron, Boron, pH, Organic Carbon) providing customized fertilizer recommendations to boost yields and save fertilizer costs.',
      te: 'మీ పొలం మట్టిలోని 12 రకాల పోషకాల స్థాయిలను (నత్రజని, భాస్వరం, పొటాష్, జింక్, ఐరన్, పీహెచ్ మొదలైనవి) పరీక్షించి, మీ పంటకు ఏ ఎరువు ఎంత మోతాదులో వేయాలో ఖచ్చితంగా తెలిపే కార్డు.',
      hi: 'खेत की मिट्टी में 12 आवश्यक पोषक तत्वों की जांच। जरूरत के अनुसार संतुलित उर्वरक डालने की सलाह से खाद की बचत और अधिक पैदावार।',
    },
    eligibilities: {
      en: [
        'All farmers cultivating agricultural land.',
        'Sample collection is conducted cluster-wise every 3 years by agriculture department.',
        'Individual farmers can also request testing at block soil laboratories.',
      ],
      te: [
        'వ్యవసాయం చేసే రైతులందరికీ ఈ పరీక్ష అందుబాటులో ఉంటుంది.',
        'గ్రామ వ్యవసాయ సహాయకుడు మీ పొలానికి వచ్చి శాస్త్రీయ పద్ధతిలో మట్టి నమూనా సేకరిస్తారు.',
        'పరీక్ష రిపోర్టు ఆధారంగా అనవసరంగా యూరియా, డీఏపీ వాడకం తగ్గించి ఖర్చు ఆదా చేసుకోవచ్చు.',
      ],
      hi: [
        'सभी कृषि भूमि धारक किसान।',
        'कृषि विभाग द्वारा खेत से मिट्टी के नमूने एकत्र किए जाते हैं।',
        'जांच के आधार पर अनावश्यक यूरिया व डीएपी की बचत होती है।',
      ],
    },
    documents: ['aadhaar', 'land', 'mobile'],
    steps: {
      en: [
        'Contact your local Village Agriculture Assistant / Rythu Bharosa Kendram.',
        'Soil samples are collected following standard zigzag field pattern.',
        'Receive printed card with nutrient ratings and specific crop dosage charts.',
        'Apply recommended bio-fertilizers and micronutrients (Zinc/Boron) accordingly.',
      ],
      te: [
        'మీ గ్రామ రైతు సేవా కేంద్రం (RBK) లేదా మండల వ్యవసాయ అధికారిని కలవండి.',
        'పొలంలో వివిధ మూలల నుండి V-ఆకారంలో మట్టి నమూనాలను సేకరించి ల్యాబ్‌కు పంపుతారు.',
        'పరీక్ష పూర్తయిన తర్వాత మీ ఫోన్‌కు లేదా ప్రింటెడ్ కార్డు రూపంలో భూసార రిపోర్ట్ అందుతుంది.',
        'రిపోర్ట్ ప్రకారం జింక్, జిప్సం, సేంద్రీయ ఎరువులను తగిన మోతాదులో వాడండి.',
      ],
      hi: [
        'स्थानीय कृषि कार्यालय या ग्राम सेवक से संपर्क करें।',
        'खेत से सही तरीके से मिट्टी का नमूना लेकर लैब में भेजा जाता है।',
        'जांच रिपोर्ट आने पर डिजिटल या प्रिंटेड सॉइल हेल्थ कार्ड प्राप्त करें।',
        'कार्ड में दी गई सलाह के अनुसार ही यूरिया, डीएपी और सूक्ष्म पोषक तत्व डालें।',
      ],
    },
    website: 'https://www.myscheme.gov.in/schemes/shc',
    websiteLabel: 'myscheme.gov.in (Soil Health)',
  },

  {
    id: 'pmksy',
    category: 'Irrigation & Solar',
    names: {
      en: 'PM Krishi Sinchayee Yojana (Micro Irrigation / Drip)',
      te: 'పీఎం కేఎస్‌వై (డ్రిప్ & స్ప్రింక్లర్ సూక్ష్మ సేద్యం - 55% వరకు రాయితీ)',
      hi: 'पीएम कृषि सिंचाई योजना (ड्रिप व फव्वारा सिंचाई - 55% सब्सिडी)',
    },
    purposes: {
      en: 'Per Drop More Crop scheme promoting drip and sprinkler irrigation with 45% to 55% subsidy (even up to 70-90% in specific state schemes like APMIP) to conserve 40% water and enhance crop yields.',
      te: 'బిందు మరియు తుంపర సేద్యం (డ్రిప్, స్ప్రింక్లర్) పరికరాల కొనుగోలుకు 55% నుండి 90% వరకు భారీ రాయితీ. తక్కువ నీటితో ఎక్కువ విస్తీర్ణంలో సమర్థవంతంగా సాగు చేయడానికి ఉత్తమ పథకం.',
      hi: 'ड्रिप (टपक) और स्प्रिंकलर (फव्वारा) सिंचाई प्रणालियों पर 55% तक की सब्सिडी। 40% तक पानी की बचत और 30% अधिक पैदावार।',
    },
    eligibilities: {
      en: [
        'Farmers having cultivable land with perennial water source (borewell/well).',
        'Higher subsidy percentage for small/marginal, women, and SC/ST farmers.',
        'Land must be mapped with Aadhaar and surveyed by horticulture/APMIP officer.',
      ],
      te: [
        'వ్యవసాయ భూమి మరియు నీటి వనరు కలిగిన రైతులందరూ అర్హులు.',
        'చిన్న, సన్నకారు రైతులకు, మహిళా రైతులకు గరిష్ట రాయితీ లభిస్తుంది.',
        'ఆంధ్రప్రదేశ్/తెలంగాణలో APMIP / ఉద్యానవన శాఖ ద్వారా అమలు చేయబడుతుంది.',
      ],
      hi: [
        'सिंचाई जल स्रोत रखने वाले सभी किसान।',
        'छोटे और सीमांत किसानों को अधिक सब्सिडी दी जाती है।',
      ],
    },
    documents: ['aadhaar', 'bank', 'land', 'photo', 'mobile', 'quotation'],
    steps: {
      en: [
        'Apply on state micro-irrigation portal (e.g. APMIP / TSMIP).',
        'Department engineer visits plot for GPS survey and layout design.',
        'Pay farmer contribution to authorized empanelled drip manufacturer.',
        'Installation and field verification completed with warranty support.',
      ],
      te: [
        'రాష్ట్ర సూక్ష్మ సేద్య పోర్టల్ (APMIP/TSMIP) లేదా రైతు సేవా కేంద్రంలో దరఖాస్తు చేయండి.',
        'ఉద్యాన శాఖ అధికారి మీ పొలాన్ని పరిశీలించి డ్రిప్ పైపుల లేఅవుట్ మ్యాప్ తయారు చేస్తారు.',
        'రైతు వాటా డిపాజిట్ చేసిన తర్వాత కంపెనీ ప్రతినిధులు పొలంలో డ్రిప్ పైపులను అమర్చుతారు.',
        'వ్యవసాయ అధికారుల తనిఖీ పూర్తయిన తర్వాత ట్రయల్ రన్ చేసి రికార్డు నమోదు చేస్తారు.',
      ],
      hi: [
        'राज्य के सूक्ष्म सिंचाई पोर्टल पर ऑनलाइन आवेदन करें।',
        'अधिकारी खेत का सर्वे कर ड्रिप पाइप का नक्शा तैयार करेंगे।',
        'किसान अंश जमा करने पर कंपनी द्वारा खेत में ड्रिप प्रणाली लगाई जाएगी।',
      ],
    },
    website: 'https://pmksy.gov.in/',
    websiteLabel: 'pmksy.gov.in',
  },

  {
    id: 'smam',
    category: 'Equipment subsidy',
    names: {
      en: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      te: 'వ్యవసాయ యాంత్రీకరణ సబ్-మిషన్ (ట్రాక్టర్లు, రోటవేటర్లు, డ్రోన్లకు 40-50% రాయితీ)',
      hi: 'कृषि यंत्रीकरण योजना (SMAM - ट्रैक्टर व कृषि यंत्रों पर 50% सब्सिडी)',
    },
    purposes: {
      en: 'Provides 40% to 50% financial assistance for purchasing tractors, power tillers, rotavators, sprayers, harvesters, and kisan drones, reducing labour costs and time.',
      te: 'ట్రాక్టర్లు, పవర్ టిల్లర్లు, రోటవేటర్లు, తైవాన్ స్ప్రేయర్లు, కలుపు తీసే యంత్రాలు మరియు కిసాన్ డ్రోన్ల కొనుగోలుకు 40% నుండి 50% వరకు సబ్సిడీ అందజేసే పథకం.',
      hi: 'ट्रैक्टर, रोटावेटर, पावर टिलर, स्प्रेयर और रीपर जैसे आधुनिक कृषि यंत्रों की खरीद पर 40% से 50% तक सरकारी सब्सिडी।',
    },
    eligibilities: {
      en: [
        'Individual farmers, custom hiring centers, and FPOs.',
        'Applicant should not have received subsidy for the same implement in the past 5 years.',
        'Priority given to small, marginal, and women farmers.',
      ],
      te: [
        'రైతులు, రైతు ఉత్పత్తిదారుల సంఘాలు (FPOలు) మరియు కస్టమ్ హైరింగ్ కేంద్రాలు అర్హులు.',
        'గడచిన 5 సంవత్సరాలలో అదే యంత్రానికి ఎలాంటి రాయితీ పొంది ఉండకూడదు.',
        'చిన్న, సన్నకారు రైతులకు మరియు మహిళలకు ప్రత్యేక ప్రాధాన్యత.',
      ],
      hi: [
        'व्यक्तिगत किसान, कस्टम हायरिंग केंद्र और किसान उत्पादक संगठन (FPO)।',
        'पिछले 5 वर्षों में उसी यंत्र पर सब्सिडी न ली गई हो।',
      ],
    },
    documents: ['aadhaar', 'bank', 'land', 'photo', 'mobile', 'quotation'],
    steps: {
      en: [
        'Register on the national agricultural machinery portal (agrimachinery.nic.in).',
        'Select required implement, approved manufacturer, and nearby dealer.',
        'Upload Pattadar passbook, Aadhaar, and proforma invoice quotation.',
        'Purchase machinery only after receiving the official departmental sanction order.',
      ],
      te: [
        'వ్యవసాయ యంత్రాల పోర్టల్ (agrimachinery.nic.in) లో ఆధార్‌తో నమోదు చేసుకోండి.',
        'మీకు కావలసిన యంత్రం, కంపెనీ మోడల్ మరియు డీలర్ కొటేషన్‌ను ఎంచుకోండి.',
        'పట్టాదారు పాస్ బుక్, బ్యాంకు వివరాలు అప్‌లోడ్ చేయండి.',
        'శాఖ నుండి మంజూరు పత్రం (Sanction Order) వచ్చిన తర్వాత మాత్రమే యంత్రాన్ని కొనుగోలు చేయండి.',
      ],
      hi: [
        'पोर्टल (agrimachinery.nic.in) पर किसान पंजीकरण करें।',
        'पसंदीदा यंत्र, कंपनी और डीलर का कोटेशन चुनें।',
        'स्वीकृति आदेश (Sanction Letter) मिलने के बाद ही यंत्र खरीदें और सब्सिडी पाएं।',
      ],
    },
    website: 'https://agrimachinery.nic.in/',
    websiteLabel: 'agrimachinery.nic.in',
  },

  {
    id: 'enam',
    category: 'Market access',
    names: {
      en: 'e-NAM (National Agriculture Market)',
      te: 'ఈ-నామ్ (e-NAM - దేశవ్యాప్త ఆన్‌లైన్ వ్యవసాయ మార్కెట్ & పారదర్శక వేలం)',
      hi: 'ई-नाम (e-NAM - देशव्यापी ऑनलाइन कृषि मंडी व पारदर्शी नीलामी)',
    },
    purposes: {
      en: 'A pan-India electronic trading network connecting APMC mandis, enabling farmers to showcase produce nationally, participate in online competitive bidding, and receive immediate payments directly into bank accounts.',
      te: 'రైతులు పండించిన పంటను దేశవ్యాప్తంగా ఉన్న వేలాది మంది వ్యాపారులకు ఆన్‌లైన్ వేలం ద్వారా అమ్ముకునే సదుపాయం. దళారుల ప్రమేయం లేకుండా నాణ్యత ఆధారంగా పోటీ ధర మరియు నేరుగా బ్యాంకులో నగదు చెల్లింపు.',
      hi: 'देश की प्रमुख मंडियों को जोड़ने वाला ऑनलाइन व्यापार मंच। देश भर के खरीदारों से प्रतिस्पर्धी बोली और सीधा बैंक खाते में भुगतान।',
    },
    eligibilities: {
      en: [
        'All farmers bringing agricultural produce to e-NAM integrated APMC mandis.',
        'Requires standard quality assaying at the mandi lab.',
        'Valid Aadhaar and bank account for automated instant settlement.',
      ],
      te: [
        'ఈ-నామ్ అనుసంధానించబడిన మార్కెట్ యార్డుకు పంట తీసుకొచ్చే రైతులందరూ అర్హులు.',
        'మండిలోని ల్యాబ్‌లో పంట తేమ, నాణ్యత పరీక్ష చేసి ఆన్‌లైన్‌లో లాట్ నమోదు చేస్తారు.',
        'ఆధార్ లింక్ అయిన బ్యాంకు ఖాతా ద్వారా వేలం ముగియగానే డబ్బులు జమ అవుతాయి.',
      ],
      hi: [
        'ई-नाम से जुड़ी मंडियों में उपज लाने वाले सभी किसान।',
        'मंडी लैब में गुणवत्ता जांच के बाद खुली ऑनलाइन बोली लगाई जाती है।',
      ],
    },
    documents: ['aadhaar', 'bank', 'mobile', 'photo'],
    steps: {
      en: [
        'Bring harvest lot to e-NAM connected market yard and get entry gate slip.',
        'Mandi quality lab conducts testing and uploads assaying certificate.',
        'Traders across India place bids in transparent digital auction.',
        'Review the highest bid on your mobile; if satisfied, approve sale and receive DBT payment.',
      ],
      te: [
        'మీ పంటను సమీపంలోని ఈ-నామ్ వ్యవసాయ మార్కెట్ యార్డుకు తీసుకువచ్చి ఎంట్రీ స్లిప్ తీసుకోండి.',
        'ల్యాబ్ టెక్నీషియన్ మీ పంట నాణ్యతను పరీక్షించి పోర్టల్‌లో నమోదు చేస్తారు.',
        'దేశవ్యాప్తంగా ఉన్న వ్యాపారులు ఆన్‌లైన్‌లో పోటీపడి ధరలను వేలం వేస్తారు.',
        'మీ మొబైల్‌లో అత్యధిక వేలం ధరను చూసి, మీకు ఇష్టమైతే అమ్మకాన్ని నిర్ధారించి వెంటనే ఖాతాలో డబ్బులు పొందండి.',
      ],
      hi: [
        'उपज को ई-नाम मंडी में ले जाकर प्रवेश पर्ची प्राप्त करें।',
        'गुणवत्ता जांच के बाद डिजिटल प्लेटफॉर्म पर राष्ट्रीय स्तर की नीलामी होगी।',
        'सर्वोत्तम बोली पसंद आने पर स्वीकृति दें और बैंक में सीधा भुगतान पाएं।',
      ],
    },
    website: 'https://enam.gov.in/',
    websiteLabel: 'enam.gov.in',
  },

  {
    id: 'pkvy',
    category: 'Organic farming',
    names: {
      en: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      te: 'పరంపరాగత్ కృషి వికాస్ యోజన (PKVY - సేంద్రీయ వ్యవసాయానికి హెక్టారుకు ₹50,000 సహాయం)',
      hi: 'परंपरागत कृषि विकास योजना (PKVY - जैविक खेती हेतु ₹50,000 प्रति हेक्टेयर)',
    },
    purposes: {
      en: 'Promotes certified organic farming through farmer cluster models, providing ₹50,000 per hectare financial support over 3 years for organic inputs, PGS certification, packaging, and direct marketing.',
      te: 'రసాయన రహిత సేంద్రీయ, ప్రకృతి వ్యవసాయాన్ని ప్రోత్సహించే పథకం. జీవామృతం, ఘనజీవామృతం, సేంద్రీయ సర్టిఫికేషన్ మరియు మార్కెటింగ్ కోసం 3 సంవత్సరాలలో హెక్టారుకు ₹50,000 రూపాయల ఆర్థిక సహాయం.',
      hi: 'क्लस्टर बनाकर जैविक खेती को बढ़ावा। जैविक खाद, प्रमाणीकरण और पैकेजिंग के लिए 3 वर्षों में ₹50,000 प्रति हेक्टेयर की सहायता।',
    },
    eligibilities: {
      en: [
        'Farmers willing to form organic clusters of 20 or more farmers covering minimum 50 acres.',
        'Commitment to stop chemical fertilizers and pesticides completely.',
        'Willingness to adopt Participatory Guarantee System (PGS-India) certification.',
      ],
      te: [
        'కనీసం 20 మంది రైతులతో కలిసి 50 ఎకరాల విస్తీర్ణంలో సేంద్రీయ గ్రూపు (క్లస్టర్) గా ఏర్పడాలి.',
        'రసాయన ఎరువులు, పురుగుమందుల వాడకాన్ని పూర్తిగా నిలిపివేయాలి.',
        'ప్రభుత్వ గుర్తింపు పొందిన PGS సేంద్రీయ ధృవీకరణ విధానాన్ని పాటించాలి.',
      ],
      hi: [
        '20 या अधिक किसानों का 50 एकड़ का जैविक क्लस्टर समूह।',
        'रासायनिक खादों और कीटनाशकों का उपयोग पूरी तरह बंद करना आवश्यक।',
      ],
    },
    documents: ['aadhaar', 'bank', 'land', 'mobile'],
    steps: {
      en: [
        'Form a farmer group with neighboring cultivators and contact district ATMA / organic farming officer.',
        'Register the cluster on the Jaivik Kheti portal (jaivikkheti.in).',
        'Maintain farm diary and follow peer inspection guidelines for organic PGS certification.',
        'Avail premium prices by selling organic produce directly to consumers on the national portal.',
      ],
      te: [
        'పొరుగు రైతులతో కలిసి గ్రూపుగా ఏర్పడి జిల్లా వ్యవసాయ అధికారి లేదా ఆత్మ (ATMA) సిబ్బందిని సంప్రదించండి.',
        'జైవిక్ ఖేతి పోర్టల్ (jaivikkheti.in) లో మీ గ్రూపును నమోదు చేయండి.',
        'సేంద్రీయ ఎరువుల తయారీ, వాడకం వివరాలను డైరీలో రాసుకుంటూ పీజీఎస్ సర్టిఫికేట్ పొందండి.',
        'పండించిన సేంద్రీయ పంటను ప్రత్యేక బ్రాండింగ్‌తో అధిక ధరకు నేరుగా వినియోగదారులకు అమ్ముకోండి.',
      ],
      hi: [
        'ग्राम स्तर पर समूह बनाकर जिला आत्मा (ATMA) कार्यालय से संपर्क करें।',
        'jaivikkheti.in पोर्टल पर समूह का पंजीकरण कराएं।',
        'जैविक प्रमाणीकरण प्राप्त कर अपनी फसल अच्छे प्रीमियम दामों पर बेचें।',
      ],
    },
    website: 'https://pgsindia-ncof.gov.in/',
    websiteLabel: 'jaivikkheti.in / pgsindia',
  },

  {
    id: 'myscheme',
    category: 'Income support',
    names: {
      en: 'Central & State myScheme Portal Directory',
      te: 'కేంద్ర & రాష్ట్ర రైతు సంక్షేమ పథకాల పోర్టల్ (myScheme)',
      hi: 'माई-स्कीम पोर्टल (myScheme - सभी केंद्रीय व राज्य योजनाएं)',
    },
    purposes: {
      en: 'Government of India single-window discovery platform to check eligibility across 1,000+ central and state government schemes (e.g. Rythu Bharosa, Rythu Bandhu, Kisan Kalyan) based on land and crop details.',
      te: 'భారత ప్రభుత్వ అధికారిక సింగిల్ విండో పోర్టల్. మీ రాష్ట్రం, భూమి విస్తీర్ణం మరియు పండించే పంట వివరాలు నమోదు చేసి రైతులకు వర్తించే 1000 కి పైగా ప్రభుత్వ పథకాలను సులభంగా తెలుసుకోవచ్చు.',
      hi: 'भारत सरकार का एकीकृत पोर्टल। अपनी उम्र, राज्य, जमीन और फसल के अनुसार 1000 से अधिक सरकारी योजनाओं की जानकारी और आवेदन लिंक प्राप्त करें।',
    },
    eligibilities: {
      en: [
        'All Indian farmers, agricultural laborers, tenant cultivators, and rural households.',
        'Free discovery engine with direct application links to verified department portals.',
      ],
      te: [
        'రైతులు, కౌలుదారులు, వ్యవసాయ కూలీలు మరియు గ్రామీణ పౌరులందరికీ అందుబాటులో ఉంటుంది.',
        'రాష్ట్ర ప్రభుత్వం అందించే ప్రత్యేక రాయితీలు మరియు పథకాల పూర్తి వివరాలు ఇక్కడ లభిస్తాయి.',
      ],
      hi: [
        'सभी किसान, बटाईदार और ग्रामीण नागरिक।',
        'सभी केंद्रीय और राज्य योजनाओं की पात्रता जांचने का आधिकारिक माध्यम।',
      ],
    },
    documents: ['aadhaar', 'mobile'],
    steps: {
      en: [
        'Visit myscheme.gov.in on your phone or computer.',
        'Select Category > "Agriculture, Rural & Environment".',
        'Filter by State (e.g. Andhra Pradesh / Telangana) to discover state-specific welfare benefits.',
      ],
      te: [
        'మీ ఫోన్‌లో myscheme.gov.in వెబ్‌సైట్ తెరవండి.',
        '"వ్యవసాయం & గ్రామీణాభివృద్ధి" కేటగిరీని ఎంచుకోండి.',
        'మీ రాష్ట్రం మరియు భూమి వివరాలు ఎంటర్ చేసి మీకు వర్తించే పథకాలను చూసి దరఖాస్తు చేసుకోండి.',
      ],
      hi: [
        'अपने फोन पर myscheme.gov.in खोलें।',
        'श्रेणी में "कृषि, ग्रामीण और पर्यावरण" चुनें।',
        'अपने राज्य के अनुसार सभी विशेष किसान योजनाओं का विवरण देखें।',
      ],
    },
    website: 'https://www.myscheme.gov.in/',
    websiteLabel: 'myscheme.gov.in',
  },
];

export function getLocalizedCategory(cat, lang = 'en') {
  return SCHEME_CATEGORY_LABELS[lang]?.[cat] || SCHEME_CATEGORY_LABELS.en[cat] || cat;
}

export function getLocalizedDocument(docId, lang = 'en') {
  const doc = DOCUMENT_LIBRARY.find((d) => d.id === docId);
  if (!doc) return docId;
  return doc.labels[lang] || doc.labels.en || docId;
}

export function getLocalizedScheme(scheme, lang = 'en') {
  if (!scheme) return null;
  return {
    id: scheme.id,
    category: scheme.category,
    categoryLabel: getLocalizedCategory(scheme.category, lang),
    name: scheme.names?.[lang] || scheme.names?.en || scheme.name || '',
    purpose: scheme.purposes?.[lang] || scheme.purposes?.en || scheme.purpose || '',
    eligibility: scheme.eligibilities?.[lang] || scheme.eligibilities?.en || scheme.eligibility || [],
    steps: scheme.steps?.[lang] || scheme.steps?.en || scheme.steps || [],
    documents: scheme.documents || [],
    website: scheme.website,
    websiteLabel: scheme.websiteLabel,
  };
}

export function getSchemeById(id) {
  return SCHEMES.find((s) => s.id === id) || null;
}
