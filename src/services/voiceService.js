/**
 * AgriMitra — Voice Service
 * ─────────────────────────────────────────────────────────────
 * Central abstraction for all text-to-speech in the app.
 * Components call voiceService methods — they never talk directly
 * to a TTS provider.
 *
 * Architecture:
 *   Component → voiceService.js → [browserProvider (active)]
 *                               → [cloudProvider (future — needs secure proxy)]
 *
 * SECURITY: No secret API keys in this file or anywhere in the frontend.
 * Cloud TTS requires a server-side proxy. The cloud provider slot is a
 * documented future boundary only.
 *
 * Usage:
 *   import { createVoiceService } from '../services/voiceService.js';
 *   const voice = createVoiceService({ language: 'te', onError, toast });
 *   voice.speak("మీ పంటను ఎంచుకోండి.");
 *   voice.stop();
 *   voice.replay();
 */

// ─── Speech formatting utility ────────────────────────────────
/**
 * Format numbers, currency, units and dates into natural spoken text
 * for the specified language. The original numeric value in the UI is
 * never altered — this is only for what is spoken aloud.
 */
export function formatForSpeech(text, language = 'en') {
  if (!text) return '';
  let out = String(text);

  if (language === 'te') {
    out = out
      // Currency: ₹ 2,450 → "రెండు వేల నాలుగువందల యాభై రూపాయలు" (simplified: number + రూపాయలు)
      .replace(/₹\s*([\d,]+(?:\.\d+)?)/g, (_, n) => `${n.replace(/,/g, '')} రూపాయలు`)
      // Quintal
      .replace(/(\d+(?:\.\d+)?)\s*quintal/gi, (_, n) => `${n} క్వింటాళ్ళు`)
      .replace(/(\d+(?:\.\d+)?)\s*క్వింటాళ్ళు?/g, (_, n) => `${n} క్వింటాళ్ళు`)
      // Kg
      .replace(/(\d+(?:\.\d+)?)\s*kg/gi, (_, n) => `${n} కిలోలు`)
      // Acre
      .replace(/(\d+(?:\.\d+)?)\s*acres?/gi, (_, n) => `${n} ఎకరాలు`)
      // Hectare
      .replace(/(\d+(?:\.\d+)?)\s*hectares?/gi, (_, n) => `${n} హెక్టార్లు`)
      // Litre
      .replace(/(\d+(?:\.\d+)?)\s*li?te?rs?/gi, (_, n) => `${n} లీటర్లు`)
      // Percentage
      .replace(/(\d+(?:\.\d+)?)%/g, (_, n) => `${n} శాతం`)
      // Rate per quintal
      .replace(/₹\s*([\d,]+)\s*\/\s*quintal/gi, (_, n) => `క్వింటాలుకు ${n.replace(/,/g, '')} రూపాయలు`)
      // Remove leftover ₹ symbol
      .replace(/₹/g, ' రూపాయలు ')
      // Normalize spaces
      .replace(/\s{2,}/g, ' ')
      .trim();
  } else if (language === 'hi') {
    out = out
      .replace(/₹\s*([\d,]+(?:\.\d+)?)/g, (_, n) => `${n.replace(/,/g, '')} रुपये`)
      .replace(/(\d+(?:\.\d+)?)\s*quintal/gi, (_, n) => `${n} क्विंटल`)
      .replace(/(\d+(?:\.\d+)?)\s*kg/gi, (_, n) => `${n} किलो`)
      .replace(/(\d+(?:\.\d+)?)\s*acres?/gi, (_, n) => `${n} एकड़`)
      .replace(/(\d+(?:\.\d+)?)\s*hectares?/gi, (_, n) => `${n} हेक्टेयर`)
      .replace(/(\d+(?:\.\d+)?)\s*li?te?rs?/gi, (_, n) => `${n} लीटर`)
      .replace(/(\d+(?:\.\d+)?)%/g, (_, n) => `${n} प्रतिशत`)
      .replace(/₹\s*([\d,]+)\s*\/\s*quintal/gi, (_, n) => `प्रति क्विंटल ${n.replace(/,/g, '')} रुपये`)
      .replace(/₹/g, ' रुपये ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  } else {
    // English
    out = out
      .replace(/₹\s*([\d,]+(?:\.\d+)?)/g, (_, n) => `${n.replace(/,/g, '')} rupees`)
      .replace(/(\d+(?:\.\d+)?)\s*quintal/gi, (_, n) => `${n} quintal`)
      .replace(/(\d+(?:\.\d+)?)\s*kg/gi, (_, n) => `${n} kilograms`)
      .replace(/(\d+(?:\.\d+)?)\s*acres?/gi, (_, n) => `${n} acres`)
      .replace(/(\d+(?:\.\d+)?)\s*hectares?/gi, (_, n) => `${n} hectares`)
      .replace(/(\d+(?:\.\d+)?)\s*li?te?rs?/gi, (_, n) => `${n} litres`)
      .replace(/(\d+(?:\.\d+)?)%/g, (_, n) => `${n} percent`)
      .replace(/₹\s*([\d,]+)\s*\/\s*quintal/gi, (_, n) => `${n.replace(/,/g, '')} rupees per quintal`)
      .replace(/₹/g, ' rupees ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  return out;
}

// ─── Voice text dictionaries (separate from UI text) ──────────
/**
 * Natural, conversational voice text per language.
 * These are NOT direct translations of UI text — they are spoken
 * in natural farmer-friendly language with pauses and context.
 *
 * A native speaker must review these before claiming voice support is complete.
 */
export const VOICE_TEXT = {
  en: {
    // Home
    welcome: 'Welcome to AgriMitra. Your farm companion. Select a section to begin.',
    selectCrop: 'Select your crop from the list. Tap the picture of your crop.',
    cropSaved: 'Your crop details have been saved on this device.',
    // Crop Guide
    cropGuideIntro: 'Browse our crop guide. Search by crop name or use the category filters.',
    cropDetailIntro: 'Here are the farming details for this crop. Scroll down to see all sections.',
    stageSelected: 'You have selected the current growth stage. This has been saved.',
    // Market
    marketIntro: 'Compare sample mandi prices and calculate your estimated profit or loss.',
    calculatorIntro: 'Enter your farming costs and expected harvest quantity to estimate profit.',
    calculationResult: 'Your estimated farm profit has been calculated. Review the numbers carefully before making a selling decision.',
    // Schemes
    schemesIntro: 'Browse government schemes and crop insurance options. Tick the documents you already have.',
    schemeDocCheck: 'Tick each document you already have ready. This helps you prepare your application.',
    // Planner
    plannerIntro: 'Add your farm tasks and set due dates. We will remind you of upcoming activities.',
    taskSaved: 'Your task has been saved. You can view it in your task list.',
    taskDone: 'Task marked as complete. Good work.',
    // Common
    dataSaved: 'Your information has been saved on this device.',
    dataNotSaved: 'Your record could not be saved. Please try again.',
    voiceUnavailable: 'Voice is not available on this device. You can read the instructions on screen.',
    noInternet: 'Internet is not available. You can still use saved information on this device.',
    photoQuality: 'This photo looks too dark or blurry. Please take another photo in good daylight.',
    photoNotPlant: 'We could not clearly see the plant in this photo. Please show the leaf or crop area clearly.',
    cropNameFirst: 'Please select the crop name first before uploading a photo.',
    confirmPhoto: 'Is this a photo of the crop you selected? Please confirm before saving.',
    photoSaved: 'Your photo has been saved on this device.',
    noCropYet: 'No crops added yet. Tap the button to add your first crop.',
  },

  te: {
    // Home
    welcome: 'అగ్రిమిత్రకు స్వాగతం. మీ పొలానికి స్నేహితుడు. ఒక విభాగాన్ని ఎంచుకోండి.',
    selectCrop: 'జాబితా నుండి మీ పంటను ఎంచుకోండి. మీ పంట చిత్రాన్ని నొక్కండి.',
    cropSaved: 'మీ పంట వివరాలు మీ పరికరంలో సేవ్ అయ్యాయి.',
    // Crop Guide
    cropGuideIntro: 'పంట మార్గదర్శినిని చూడండి. పంట పేరుతో వెతకండి లేదా వర్గాల ద్వారా వడపోయండి.',
    cropDetailIntro: 'ఈ పంటకు సంబంధించిన సాగు వివరాలు ఇక్కడ ఉన్నాయి. అన్ని విభాగాలు చూడటానికి క్రిందికి స్క్రోల్ చేయండి.',
    stageSelected: 'మీరు ప్రస్తుత పెరుగుదల దశను ఎంచుకున్నారు. ఇది సేవ్ అయింది.',
    // Market
    marketIntro: 'నమూనా మండి ధరలను పోల్చండి మరియు మీ అంచనా లాభ నష్టాలను లెక్కించండి.',
    calculatorIntro: 'మీ సాగు ఖర్చులు మరియు అంచనా దిగుబడిని నమోదు చేయండి. మేము మీ లాభాన్ని లెక్కిస్తాము.',
    calculationResult: 'మీ పొలం అంచనా లాభం లెక్కించబడింది. అమ్మకం నిర్ణయం తీసుకోవడానికి ముందు సంఖ్యలను జాగ్రత్తగా సమీక్షించండి.',
    // Schemes
    schemesIntro: 'ప్రభుత్వ పథకాలు మరియు పంట బీమా వివరాలు చూడండి. మీ దగ్గర ఉన్న పత్రాలకు టిక్ చేయండి.',
    schemeDocCheck: 'మీ దగ్గర ఉన్న ప్రతి పత్రానికి టిక్ చేయండి. దరఖాస్తు సిద్ధం చేయడానికి ఇది సహాయపడుతుంది.',
    // Planner
    plannerIntro: 'మీ పొలం పనులను జోడించండి మరియు గడువు తేదీలు నిర్ణయించండి. మేము మీకు రాబోయే కార్యకలాపాలు గుర్తు చేస్తాము.',
    taskSaved: 'మీ పని సేవ్ అయింది. మీ పని జాబితాలో చూడవచ్చు.',
    taskDone: 'పని పూర్తయినట్లు గుర్తించబడింది. బాగు చేశారు.',
    // Common
    dataSaved: 'మీ సమాచారం మీ పరికరంలో సేవ్ అయింది.',
    dataNotSaved: 'మీ రికార్డు సేవ్ కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.',
    voiceUnavailable: 'వాయిస్ ప్రస్తుతం అందుబాటులో లేదు. స్క్రీన్‌పై సూచనలను చదువుకోవచ్చు.',
    noInternet: 'ఇంటర్నెట్ కనెక్షన్ లేదు. మీ పరికరంలో సేవ్ చేసిన సమాచారం అందుబాటులో ఉంది.',
    photoQuality: 'ఈ ఫోటో చాలా చీకటిగా లేదా మందంగా ఉంది. దయచేసి పగటి వెలుతురులో మరో ఫోటో తీయండి.',
    photoNotPlant: 'ఈ ఫోటోలో మొక్క స్పష్టంగా కనిపించలేదు. దయచేసి ఆకు లేదా పంట భాగాన్ని స్పష్టంగా చూపించండి.',
    cropNameFirst: 'ఫోటో అప్‌లోడ్ చేయడానికి ముందు దయచేసి పంట పేరును ఎంచుకోండి.',
    confirmPhoto: 'ఇది మీరు ఎంచుకున్న పంట ఫోటోనా? సేవ్ చేయడానికి ముందు నిర్ధారించండి.',
    photoSaved: 'మీ ఫోటో మీ పరికరంలో సేవ్ అయింది.',
    noCropYet: 'ఇంకా పంటలు జోడించలేదు. మీ మొదటి పంటను జోడించడానికి బటన్‌ను నొక్కండి.',
  },

  hi: {
    // Home
    welcome: 'एग्रीमित्र में आपका स्वागत है। आपके खेत का साथी। शुरू करने के लिए एक विभाग चुनें।',
    selectCrop: 'सूची से अपनी फसल चुनें। अपनी फसल की तस्वीर पर टैप करें।',
    cropSaved: 'आपके फसल के विवरण इस डिवाइस पर सेव हो गए हैं।',
    // Crop Guide
    cropGuideIntro: 'हमारी फसल गाइड देखें। फसल के नाम से खोजें या श्रेणी फ़िल्टर का उपयोग करें।',
    cropDetailIntro: 'यहाँ इस फसल की खेती के विवरण हैं। सभी भाग देखने के लिए नीचे स्क्रॉल करें।',
    stageSelected: 'आपने वर्तमान विकास चरण चुना है। यह सेव हो गया है।',
    // Market
    marketIntro: 'नमूना मंडी भाव की तुलना करें और अपने अनुमानित लाभ या हानि की गणना करें।',
    calculatorIntro: 'अपनी खेती की लागत और अपेक्षित उपज दर्ज करें। हम आपका मुनाफा कैलकुलेट करेंगे।',
    calculationResult: 'आपके खेत का अनुमानित मुनाफा कैलकुलेट हो गया है। बेचने का निर्णय लेने से पहले संख्याओं की सावधानी से समीक्षा करें।',
    // Schemes
    schemesIntro: 'सरकारी योजनाएं और फसल बीमा के विकल्प देखें। जो दस्तावेज़ आपके पास हैं उन पर टिक करें।',
    schemeDocCheck: 'जो दस्तावेज़ आपके पास तैयार हैं, उन पर टिक करें। आवेदन तैयार करने में यह मदद करेगा।',
    // Planner
    plannerIntro: 'अपने खेत के काम जोड़ें और समय सीमाएं तय करें। हम आने वाली गतिविधियों की याद दिलाएंगे।',
    taskSaved: 'आपका काम सेव हो गया। आप इसे अपनी कार्य सूची में देख सकते हैं।',
    taskDone: 'काम पूरा के रूप में चिन्हित किया गया। बढ़िया काम।',
    // Common
    dataSaved: 'आपकी जानकारी इस डिवाइस पर सेव हो गई है।',
    dataNotSaved: 'आपका रिकॉर्ड सेव नहीं हो सका। कृपया फिर से प्रयास करें।',
    voiceUnavailable: 'इस डिवाइस पर आवाज़ उपलब्ध नहीं है। आप स्क्रीन पर दिए निर्देश पढ़ सकते हैं।',
    noInternet: 'इंटरनेट कनेक्शन नहीं है। आप इस डिवाइस पर सेव जानकारी का उपयोग कर सकते हैं।',
    photoQuality: 'यह फोटो बहुत अंधेरी या धुंधली लग रही है। कृपया अच्छी रोशनी में दूसरी फोटो लें।',
    photoNotPlant: 'इस फोटो में पौधा स्पष्ट नहीं दिख रहा। कृपया पत्ती या फसल का हिस्सा साफ़ दिखाएं।',
    cropNameFirst: 'फोटो अपलोड करने से पहले कृपया फसल का नाम चुनें।',
    confirmPhoto: 'क्या यह आपकी चुनी हुई फसल की फोटो है? सेव करने से पहले पुष्टि करें।',
    photoSaved: 'आपकी फोटो इस डिवाइस पर सेव हो गई है।',
    noCropYet: 'अभी तक कोई फसल नहीं जोड़ी। पहली फसल जोड़ने के लिए बटन दबाएं।',
  },
};

/**
 * Get a voice text string by key and language.
 * Falls back to English if key is missing in the requested language.
 */
export function getVoiceText(key, language = 'en') {
  const langDict = VOICE_TEXT[language] || VOICE_TEXT.en;
  return langDict[key] || VOICE_TEXT.en[key] || '';
}

// ─── Provider detection ────────────────────────────────────────
/**
 * Detect which TTS providers are available.
 * Currently only browser speechSynthesis is active.
 * Cloud TTS (Sarvam Bulbul V3, Google Cloud TTS) requires a secure
 * server-side proxy and is NOT connected in this version.
 */
export function detectProviders() {
  return {
    browser: typeof window !== 'undefined' && 'speechSynthesis' in window,
    cloud: false, // NOT connected — requires secure proxy
    pregenerated: false, // NOT implemented — future enhancement
  };
}

/**
 * Returns a human-readable status of current voice capabilities.
 */
export function getVoiceStatus(language = 'en') {
  const providers = detectProviders();

  if (!providers.browser) {
    return {
      available: false,
      quality: 'none',
      message: {
        en: 'Voice is not supported in this browser.',
        te: 'ఈ బ్రౌజర్‌లో వాయిస్ అందుబాటులో లేదు.',
        hi: 'इस ब्राउज़र में आवाज़ उपलब्ध नहीं है।',
      }[language] || 'Voice is not supported in this browser.',
    };
  }

  return {
    available: true,
    quality: 'browser-fallback',
    message: {
      en: 'Using browser voice (basic quality). Natural Telugu voice requires server integration.',
      te: 'బ్రౌజర్ వాయిస్ వాడుతున్నాము (ప్రాథమిక నాణ్యత). సహజ తెలుగు వాయిస్‌కు సర్వర్ అనుసంధానం అవసరం.',
      hi: 'ब्राउज़र आवाज़ उपयोग हो रही है (बुनियादी गुणवत्ता)। प्राकृतिक हिंदी आवाज़ के लिए सर्वर एकीकरण आवश्यक है।',
    }[language] || 'Using browser voice (basic quality).',
  };
}

// ─── Future cloud provider boundary ───────────────────────────
/**
 * FUTURE: Cloud TTS integration boundary.
 * This function documents the interface for a future server-side proxy.
 *
 * When implemented:
 *   1. Developer creates a server-side function (Vercel/AWS Lambda)
 *   2. That function receives text, calls Sarvam Bulbul V3 with a SECRET key
 *   3. Returns audio blob or stream
 *   4. This function calls that proxy endpoint
 *
 * SECURITY: The API key MUST stay on the server.
 * CONSENT: Before calling this function, show the farmer what text will be sent
 *          and which service will receive it. Obtain explicit consent.
 *
 * @param {string} text - Text to synthesize
 * @param {string} language - 'te' | 'hi' | 'en'
 * @returns {Promise<null>} - Always returns null (not connected)
 */
export async function cloudSpeak(text, language) {
  // NOT CONNECTED
  // To connect: implement a secure server proxy and call it here.
  console.info(
    '[voiceService] Cloud TTS not connected. Text that would be sent:',
    text?.slice(0, 50),
    '| language:', language
  );
  return null;
}
