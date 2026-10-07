/**
 * Sample demonstration weather — localized for Telugu, Hindi, and English.
 * Educational demonstration only.
 */

export const SAMPLE_DISTRICTS = [
  { id: 'guntur', en: 'Guntur, Andhra Pradesh', te: 'గుంటూరు, ఆంధ్రప్రదేశ్', hi: 'गुंटूर, आंध्र प्रदेश' },
  { id: 'warangal', en: 'Warangal, Telangana', te: 'వరంగల్, తెలంగాణ', hi: 'वारंगल, तेलंगाना' },
  { id: 'kurnool', en: 'Kurnool, Andhra Pradesh', te: 'కర్నూలు, ఆంధ్రప్రదేశ్', hi: 'कुरनूल, आंध्र प्रदेश' },
  { id: 'nashik', en: 'Nashik, Maharashtra', te: 'నాసిక్, మహారాష్ట్ర', hi: 'नासिक, महाराष्ट्र' },
  { id: 'ludhiana', en: 'Ludhiana, Punjab', te: 'లూధియానా, పంజాబ్', hi: 'लुधियाना, पंजाब' },
  { id: 'indore', en: 'Indore, Madhya Pradesh', te: 'ఇండోర్, మధ్యప్రదేశ్', hi: 'इंदौर, मध्य प्रदेश' },
];

export const SAMPLE_WEATHER = {
  'Guntur, Andhra Pradesh': {
    temperature: 31,
    rainfall: 12,
    humidity: 68,
    condition: {
      en: 'Humid with a chance of short showers',
      te: 'తేమతో కూడిన వాతావరణం, చిరుజల్లులు పడే అవకాశం ఉంది',
      hi: 'हल्की नमी और बूंदाबांदी की संभावना',
    },
    alerts: {
      en: [
        { type: 'rain', title: 'Advisory rain note', text: 'Light showers expected. Pause scheduled irrigation if field soil is already moist.' },
      ],
      te: [
        { type: 'rain', title: 'వర్షపు సూచన', text: 'చిరుజల్లులు పడే అవకాశం ఉంది. నేలలో తగినంత తేమ ఉంటే ప్రస్తుతానికి నీరు పెట్టవద్దు.' },
      ],
      hi: [
        { type: 'rain', title: 'बारिश की चेतावनी', text: 'हल्की बारिश की संभावना है। यदि खेत में पहले से नमी है तो सिंचाई रोकें।' },
      ],
    },
    tips: {
      en: 'Keep harvested chilli or turmeric covered under tarpaulins during this humid spell.',
      te: 'కోసిన మిరప లేదా పసుపు పంటను టార్పాలిన్లతో కప్పి తడవకుండా కాపాడుకోండి.',
      hi: 'काटी गई मिर्च या हल्दी को तिरपाल से ढककर रखें ताकि नमी से नुकसान न हो।',
    },
  },

  'Warangal, Telangana': {
    temperature: 33,
    rainfall: 2,
    humidity: 52,
    condition: {
      en: 'Warm afternoon with mild breeze',
      te: 'మధ్యాహ్నం వేడిగా ఉంటుంది, తేలికపాటి గాలి',
      hi: 'दोपहर में धूप और हल्की हवा',
    },
    alerts: {
      en: [
        { type: 'heat', title: 'Mid-day heat alert', text: 'High afternoon temperature. Irrigate during early morning or evening hours.' },
      ],
      te: [
        { type: 'heat', title: 'ఎండ తీవ్రత హెచ్చరిక', text: 'మధ్యాహ్నం వేడి ఎక్కువ. ఉదయం లేదా సాయంత్రం వేళల్లోనే పంటకు నీరు పెట్టండి.' },
      ],
      hi: [
        { type: 'heat', title: 'दोपहर की धूप', text: 'दोपहर में तेज तापमान। सिंचाई सुबह या शाम के समय ही करें।' },
      ],
    },
    tips: {
      en: 'Cotton and chilli fields benefit from irrigation in early morning to avoid flower drop.',
      te: 'పత్తి, మిరప చేలకు ఉదయం వేళల్లో నీరిస్తే పూత రాలకుండా ఆరోగ్యంగా ఉంటుంది.',
      hi: 'कपास और मिर्च में सुबह के समय पानी देने से फूल नहीं झड़ते।',
    },
  },

  'Kurnool, Andhra Pradesh': {
    temperature: 34,
    rainfall: 0,
    humidity: 46,
    condition: {
      en: 'Dry and sunny weather',
      te: 'పొడి వాతావరణం, ప్రకాశవంతమైన ఎండ',
      hi: 'शुष्क और धूप भरा मौसम',
    },
    alerts: {
      en: [
        { type: 'heat', title: 'Dry spell advisory', text: 'Zero rainfall recorded. Inspect groundnut pegging plots for moisture stress.' },
      ],
      te: [
        { type: 'heat', title: 'పొడి వాతావరణ సలహా', text: 'వర్షం లేదు. వేరుశనగ ఊడలు దిగే దశలో ఉంటే నేల గట్టిపడకుండా తేలికపాటి తడి ఇవ్వండి.' },
      ],
      hi: [
        { type: 'heat', title: 'सूखा मौसम', text: 'बारिश नहीं है। मूंगफली में खूंटी बनते समय नमी की कमी न होने दें।' },
      ],
    },
    tips: {
      en: 'Provide light furrow irrigation for groundnut and onion plots.',
      te: 'వేరుశనగ మరియు ఉల్లి సాళ్ళలో పలుచగా నీరు పారించండి.',
      hi: 'मूंगफली और प्याज की क्यारियों में हल्की सिंचाई करें।',
    },
  },

  'Nashik, Maharashtra': {
    temperature: 28,
    rainfall: 4,
    humidity: 55,
    condition: {
      en: 'Partly cloudy and pleasant',
      te: 'పాక్షికంగా మేఘావృతం, ఆహ్లాదకరమైన వాతావరణం',
      hi: 'आंशिक रूप से बादल, सुहावना मौसम',
    },
    alerts: {
      en: [
        { type: 'info', title: 'Onion belt advice', text: 'Mild weather. Inspect onion nurseries for thrips before watering.' },
      ],
      te: [
        { type: 'info', title: 'ఉల్లి పంట సలహా', text: 'మితమైన వాతావరణం. ఉల్లి చేలలో తామర పురుగు ఉందేమో చూసి నీరు ఇవ్వండి.' },
      ],
      hi: [
        { type: 'info', title: 'प्याज फसल सलाह', text: 'मौसम अनुकूल है। प्याज में थ्रिप्स कीट की जांच करें।' },
      ],
    },
    tips: {
      en: 'Hold off irrigation if soil root zone retains adequate residual moisture.',
      te: 'నేలలో తగినంత తేమ ఉంటే ప్రస్తుతానికి తడి ఇవ్వడం వాయిదా వేయండి.',
      hi: 'यदि मिट्टी में नमी बनी हुई है तो सिंचाई एक-दो दिन टाल सकते हैं।',
    },
  },

  'Ludhiana, Punjab': {
    temperature: 24,
    rainfall: 0,
    humidity: 48,
    condition: {
      en: 'Clear and dry skies',
      te: 'నిర్మలమైన ఆకాశం, చల్లటి పొడి వాతావరణం',
      hi: 'साफ और ठंडा मौसम',
    },
    alerts: {
      en: [
        { type: 'info', title: 'Rabi crop advice', text: 'Clear conditions. Schedule crown root irrigation for wheat as per extension calendar.' },
      ],
      te: [
        { type: 'info', title: 'రబీ పంట సలహా', text: 'ఆకాశం నిర్మలంగా ఉంది. గోధుమ పంటకు మొదటి తడి ప్లాన్ చేసుకోండి.' },
      ],
      hi: [
        { type: 'info', title: 'रबी फसल सलाह', text: 'मौसम साफ है। गेहूं में पहली सिंचाई (सीआरआई अवस्था) समय पर करें।' },
      ],
    },
    tips: {
      en: 'Ideal weather for field weeding and secondary intercultural operations.',
      te: 'పొలంలో కలుపు తీయడానికి మరియు అంతరకృషి చేయడానికి అనుకూలమైన సమయం.',
      hi: 'निराई-गुड़ाई और खरपतवार निकालने के लिए बहुत अच्छा समय है।',
    },
  },

  'Indore, Madhya Pradesh': {
    temperature: 29,
    rainfall: 8,
    humidity: 60,
    condition: {
      en: 'Cloudy with scattered drizzle',
      te: 'మేఘావృతం, అక్కడక్కడ జల్లులు',
      hi: 'बादल छाए रहेंगे, हल्की फुहारें',
    },
    alerts: {
      en: [
        { type: 'rain', title: 'Drainage reminder', text: 'Drizzle indicated. Ensure furrow ends are open to prevent standing water in soybean plots.' },
      ],
      te: [
        { type: 'rain', title: 'మురుగునీటి కాలువల తనిఖీ', text: 'జల్లులు పడే అవకాశం ఉంది. సోయాబీన్ చేలల్లో నీరు నిలవకుండా చూడండి.' },
      ],
      hi: [
        { type: 'rain', title: 'जल निकासी जांचें', text: 'सोयाबीन के खेत में पानी न भरे, जलनिकासी खुली रखें।' },
      ],
    },
    tips: {
      en: 'Walk low patches of the field to clear blocked drainage furrows.',
      te: 'పల్లపు ప్రాంతాల్లో నీరు నిలవకుండా కాలువలను సరిచేయండి.',
      hi: 'खेत के निचले हिस्सों में जाकर देखें कि पानी रुका तो नहीं है।',
    },
  },
};

export function getLocalizedWeather(districtName, lang = 'en') {
  const w = SAMPLE_WEATHER[districtName] || SAMPLE_WEATHER['Guntur, Andhra Pradesh'];
  return {
    temperature: w.temperature,
    rainfall: w.rainfall,
    humidity: w.humidity,
    condition: typeof w.condition === 'object' ? (w.condition[lang] || w.condition.en) : w.condition,
    alerts: typeof w.alerts === 'object' && !Array.isArray(w.alerts) ? (w.alerts[lang] || w.alerts.en) : (w.alerts || []),
    tips: typeof w.tips === 'object' ? (w.tips[lang] || w.tips.en) : w.tips,
  };
}
