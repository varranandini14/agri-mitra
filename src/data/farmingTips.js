import { getCurrentSeason } from '../utils/season.js';

export const SEASONAL_TIPS = {
  Kharif: {
    en: [
      'Walk fields after heavy rain and drain puddles where crops dislike waterlogging (e.g., maize, pulses, cotton).',
      'Keep a simple weed and pest scouting note once a week on the underside of leaves.',
      'Store seed and fertiliser bags off damp floors on wooden pallets or dry tarpaulins.',
      'Avoid top-dressing nitrogen fertilizers immediately before a forecasted downpour to prevent leaching.',
      'Inspect field bunds and drainage outlets to prevent soil erosion during heavy monsoon showers.',
    ],
    te: [
      'భారీ వర్షాల తర్వాత పొలంలో నీరు నిలవకుండా చూడండి; పత్తి, మొక్కజొన్న చేలల్లో వెంటనే మురుగునీటిని తీసివేయండి.',
      'వారానికి ఒకసారి ఆకుల అడుగు భాగాన్ని పరిశీలించి తెల్లదోమ, తామర పురుగుల ఉధృతిని గమనించండి.',
      'విత్తనాలు, ఎరువుల బస్తాలు నేలపై తడవకుండా చెక్క బల్లలు లేదా టార్పాలిన్లపై భద్రపరచండి.',
      'భారీ వర్షం సూచన ఉన్నప్పుడు యూరియా వంటి నత్రజని ఎరువులను చల్లవద్దు.',
      'పొలం గట్లు తెగిపోకుండా, సారవంతమైన పైమట్టి కొట్టుకుపోకుండా గట్లను బలోపేతం చేయండి.',
    ],
    hi: [
      'भारी बारिश के बाद खेत में पानी न रुकने दें; मक्का, कपास और दलहन के खेतों से तुरंत जल निकासी करें।',
      'सप्ताह में एक बार पत्तियों की निचली सतह देखकर रस चूसक कीटों की जांच करें।',
      'बीज और खाद की बोरियों को सीलन से बचाने के लिए लकड़ी के तख्तों या तिरपाल पर रखें।',
      'बारिश की संभावना होने पर यूरिया का छिड़काव न करें ताकि खाद बह न जाए।',
      'मिट्टी का कटाव रोकने के लिए खेत की मेड़ों को मजबूत बनाएं।',
    ],
  },
  Rabi: {
    en: [
      'Plan sowing using residual soil moisture and regional recommended sowing date windows.',
      'Schedule irrigations around critical crop stages (crown root initiation, flowering, pod development).',
      'Watch for sudden temperature drops; light evening irrigation can mitigate frost and cold injury.',
      'Check for zinc and micronutrient deficiencies in winter wheat, mustard, and pulses.',
      'Inspect crops in early morning for powdery mildew and aphid colonies on tender shoots.',
    ],
    te: [
      'నేలలోని తేమను బట్టి రబీ విత్తనాలను సకాలంలో విత్తుకోండి; ఆలస్యమైతే దిగుబడి తగ్గుతుంది.',
      'గోధుమ, శనగ, మినుము పంటలలో పూత మరియు కాయ దశలలో తప్పనిసరిగా తడులు ఇవ్వండి.',
      'చలి తీవ్రత ఎక్కువగా ఉన్నప్పుడు సాయంత్రం వేళల్లో తేలికపాటి తడి ఇస్తే పంట చలికి దెబ్బతినదు.',
      'శీతాకాల పంటల్లో జింక్, బోరాన్ వంటి సూక్ష్మపోషక లోపాలను సకాలంలో గుర్తించి స్ప్రే చేయండి.',
      'ఉదయం వేళల్లో బూడిద తెగులు మరియు పేనుబంక (ఆఫిడ్స్) ఆశించాయేమో గమనించండి.',
    ],
    hi: [
      'खेत में बची हुई नमी का उपयोग कर सही समय पर रबी फसलों की बुवाई करें।',
      'गेहूं में पहली सिंचाई (CRI अवस्था) और अन्य फसलों में फूल/फली बनते समय पानी अवश्य दें।',
      'शीतलहर या पाले की संभावना होने पर शाम को हल्की सिंचाई करने से फसल सुरक्षित रहती है।',
      'गेहूं और सरसों में जिंक तथा सल्फर की कमी की जांच करें और समय पर पूर्ति करें।',
      'सुबह के समय पत्तियों पर पाउडरी मिल्ड्यू (सफेद चूर्ण) और चेपा कीट की निगरानी करें।',
    ],
  },
  Zaid: {
    en: [
      'Mulching with crop residue and morning irrigation help summer vegetables withstand scorching afternoon heat.',
      'Young seedling nurseries need green shade netting during high-temperature peak hours.',
      'Do not transplant seedlings into a crusted dry seedbed without prior irrigation.',
      'Use micro-irrigation (drip / sprinkler) to conserve 40% water during peak evaporation.',
      'Harvest produce in early morning or late evening to preserve moisture and freshness.',
    ],
    te: [
      'ఎండాకాలంలో ఆకుకూరలు, కూరగాయలకు మల్చింగ్ (ఎండుగడ్డి కప్పడం) చేస్తే నేలలో తేమ ఆరదు.',
      'కూరగాయల నారుమడులపై తీవ్రమైన ఎండ తగలకుండా పచ్చి రంగు షేడ్ నెట్లను వాడండి.',
      'ఎండిన గట్టి నేలలో కాకుండా తడి చేసిన తర్వాత మాత్రమే నారు నాటండి.',
      'ఎండల సమయంలో నీటి ఆవిరిని అరికట్టడానికి డ్రిప్ లేదా స్ప్రింక్లర్ పద్ధతిని పాటించండి.',
      'కూరగాయలు, పుచ్చకాయలను ఉదయం లేదా సాయంత్రం వేళల్లో కోస్తే నాణ్యత, తాజాదనం దెబ్బతినదు.',
    ],
    hi: [
      'मल्चिंग (पुआल बिछाने) और सुबह के समय सिंचाई से गर्मियों में तेज धूप से पौधों का बचाव होता है।',
      'नर्सरी में छोटे पौधों को तेज धूप से बचाने के लिए ग्रीन शेड नेट का प्रयोग करें।',
      'सूखी मिट्टी में सीधे रोपाई न करें, पहले हल्की सिंचाई अवश्य करें।',
      'पानी की बचत के लिए ड्रिप या फव्वारा सिंचाई का उपयोग करें।',
      'सब्जियों और फलों की तुड़ाई सुबह या शाम के ठंडे समय में ही करें।',
    ],
  },
};

export function getSeasonalTips(date = new Date(), lang = 'en') {
  const season = getCurrentSeason(date);
  const data = SEASONAL_TIPS[season] || SEASONAL_TIPS.Kharif;
  return data[lang] || data.en;
}

export const GENERAL_TIPS = {
  en: [
    'Data in AgriMitra is saved locally in this browser on your device — nothing is sent to external servers.',
    'For acute pest attack or crop disease, consult your local Krishi Vigyan Kendra (KVK) or Block Agricultural Officer.',
    'Apply fertilizers based on a recent Soil Health Card rather than guesswork.',
    'Always check government subsidy portals (e.g. pmkisan.gov.in, pmfby.gov.in) directly before relying on secondary news.',
  ],
  te: [
    'అగ్రిమిత్ర లోని మీ సమాచారం మీ ఫోన్/కంప్యూటర్ బ్రౌజర్‌లో మాత్రమే సురక్షితంగా ఉంటుంది.',
    'తీవ్రమైన చీడపీడలు లేదా తెగుళ్లు వచ్చినప్పుడు సమీపంలోని కృషి విజ్ఞాన కేంద్రం (KVK) లేదా మండల వ్యవసాయ అధికారిని సంప్రదించండి.',
    'అంచనాలతో కాకుండా మీ పొలం భూసార పరీక్ష కార్డు ఆధారంగా మాత్రమే ఎరువులను వాడండి.',
    'ప్రభుత్వ పథకాల వివరాలను అధికారిక పోర్టల్స్ (pmkisan.gov.in, pmfby.gov.in) లో మాత్రమే సరిచూసుకోండి.',
  ],
  hi: [
    'एग्रीमित्र में आपका डेटा आपके फोन/कंप्यूटर पर ही सुरक्षित रहता है।',
    'गंभीर कीट या रोग की स्थिति में नजदीकी कृषि विज्ञान केंद्र (KVK) या कृषि अधिकारी से सलाह लें।',
    'अंदाजे के बजाय सॉइल हेल्थ कार्ड की जांच रिपोर्ट के अनुसार ही खाद डालें।',
    'सरकारी योजनाओं की पुष्टि आधिकारिक वेबसाइटों (pmkisan.gov.in) से ही करें।',
  ],
};
