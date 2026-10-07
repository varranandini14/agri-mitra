import { getCropById, getCropName, getCropGrowthStages, getCropText } from '../data/crops.js';
import { SAMPLE_WEATHER } from '../data/weather.js';

/**
 * Rule-based decision support with full Telugu, Hindi, and English localization.
 */
export function buildRecommendations({
  profile,
  selectedCropId,
  tasks = [],
  soilRecords = [],
  irrigationRecords = [],
  district,
  language = 'en',
}) {
  const items = [];
  const crop = getCropById(selectedCropId);
  const cropName = crop ? getCropName(crop, language) : '';
  const weather = SAMPLE_WEATHER[district] || SAMPLE_WEATHER[profile?.district] || null;
  const today = new Date().toISOString().slice(0, 10);

  const overdue = tasks.filter((t) => t.status !== 'completed' && t.dueDate && t.dueDate < today);
  const pending = tasks.filter((t) => t.status !== 'completed');

  if (!profile?.name) {
    items.push({
      id: 'profile',
      priority: language === 'te' ? 'సాధారణ' : language === 'hi' ? 'मध्यम' : 'Medium',
      title:
        language === 'te'
          ? 'మీ రైతు ప్రొఫైల్ వివరాలు నమోదు చేయండి'
          : language === 'hi'
          ? 'अपनी किसान प्रोफ़ाइल विवरण जोड़ें'
          : 'Add your farmer profile',
      explanation:
        language === 'te'
          ? 'మీ పేరు, గ్రామం మరియు సాగు విస్తీర్ణం నమోదు చేసుకుంటే లెక్కలు, సలహాలు ఖచ్చితంగా వస్తాయి.'
          : language === 'hi'
          ? 'नाम, गांव और खेत का रकबा दर्ज करने से गणना और सलाह आपके खेत के अनुकूल बनेगी।'
          : 'A name, village and farm area help the dashboard summarise your own records.',
      to: '/',
      action: language === 'te' ? 'ప్రొఫైల్ నమోదు చేయండి' : language === 'hi' ? 'प्रोफ़ाइल भरें' : 'Open profile',
    });
  }

  if (!crop) {
    items.push({
      id: 'crop',
      priority: language === 'te' ? 'ముఖ్యమైనది' : language === 'hi' ? 'महत्वपूर्ण' : 'Medium',
      title:
        language === 'te'
          ? 'మీ ప్రధాన పంటను ఎంచుకోండి'
          : language === 'hi'
          ? 'अपनी मुख्य फसल चुनें'
          : 'Save a main crop',
      explanation:
        language === 'te'
          ? 'పంటల గైడ్ నుండి మీ పంటను ఎంచుకుంటే, దశలవారీ సలహాలు మరియు యాజమాన్య పద్ధతులు అందుతాయి.'
          : language === 'hi'
          ? 'फसल गाइड में जाकर फसल चुनें ताकि चरणबद्ध कृषि सलाह और सुझाव मिल सकें।'
          : 'Pick a crop in the Crop Guide so tips and summaries can follow that crop.',
      to: '/crops',
      action: language === 'te' ? 'పంటల గైడ్ చూడండి' : language === 'hi' ? 'फसल गाइड खोलें' : 'Open Crop Guide',
    });
  } else {
    const stages = getCropGrowthStages(crop, language);
    const stageExample = stages[2] || stages[0] || '';
    items.push({
      id: 'stage',
      priority: language === 'te' ? 'సాధారణ' : language === 'hi' ? 'सामान्य' : 'Low',
      title:
        language === 'te'
          ? `${cropName} ఎదుగుదల దశను గమనించండి`
          : language === 'hi'
          ? `${cropName} की वर्तमान विकास अवस्था देखें`
          : `Review ${cropName} growth stages`,
      explanation:
        language === 'te'
          ? `మీ పంట ఇప్పుడు ఏ దశలో ఉందో (${stageExample || 'పూత/కాయ దశ'}) పరిశీలించి తగిన ఎరువులు, నీటి తడులు ప్లాన్ చేసుకోండి.`
          : language === 'hi'
          ? `आपकी फसल वर्तमान में किस चरण (${stageExample || 'वृद्धि अवस्था'}) में है, उसी अनुसार खाद व पानी दें।`
          : `Open the crop card and mark where you are (e.g. ${stageExample || 'vegetative'}). This is a planning reminder.`,
      to: '/crops',
      action: language === 'te' ? 'పంట వివరాలు చూడండి' : language === 'hi' ? 'फसल देखें' : 'View crop',
    });
  }

  if (overdue.length > 0) {
    items.push({
      id: 'overdue',
      priority: language === 'te' ? 'అత్యవసరం' : language === 'hi' ? 'अति आवश्यक' : 'High',
      title:
        language === 'te'
          ? `మీకు ${overdue.length} గడువు దాటిన వ్యవసాయ పనులు ఉన్నాయి!`
          : language === 'hi'
          ? `आपके ${overdue.length} कार्य समय सीमा पार कर चुके हैं!`
          : `You have ${overdue.length} overdue task${overdue.length > 1 ? 's' : ''}`,
      explanation:
        language === 'te'
          ? 'రైతు క్యాలెండర్ తెరిచి, పూర్తయిన పనులను మార్క్ చేయండి లేదా కొత్త తేదీని కేటాయించండి.'
          : language === 'hi'
          ? 'खेत प्लानर खोलकर पूरे हो चुके काम पूरे करें या अगली तारीख तय करें।'
          : 'Open the Farm Planner, complete what is done, or move the date if the work changed.',
      to: '/planner',
      action: language === 'te' ? 'క్యాలెండర్ తెరవండి' : language === 'hi' ? 'प्लानर खोलें' : 'Open planner',
    });
  } else if (pending.length === 0) {
    items.push({
      id: 'tasks',
      priority: language === 'te' ? 'సహాయక' : language === 'hi' ? 'सहायक' : 'Low',
      title:
        language === 'te'
          ? 'రాబోయే పనులను క్యాలెండర్‌లో నమోదు చేయండి'
          : language === 'hi'
          ? 'खेत के आगामी काम प्लानर में जोड़ें'
          : 'No pending farming tasks',
      explanation:
        language === 'te'
          ? 'విత్తడం, ఎరువులు వేయడం, కలుపు తీయడం లేదా మార్కెట్ సందర్శన వంటి పనులను షెడ్యూల్ చేయండి.'
          : language === 'hi'
          ? 'बुवाई, खाद डालने, निराई या मंडी जाने के काम जोड़ें ताकि समय पर याद रहे।'
          : 'Add sowing, irrigation or market visits so the dashboard can show upcoming work.',
      to: '/planner',
      action: language === 'te' ? 'పనిని జోడించండి' : language === 'hi' ? 'काम जोड़ें' : 'Add a task',
    });
  }

  if (weather && weather.rainfall >= 8) {
    items.push({
      id: 'rain',
      priority: language === 'te' ? 'అత్యవసరం' : language === 'hi' ? 'सावधानी' : 'High',
      title:
        language === 'te'
          ? 'వాతావరణంలో వర్ష సూచన ఉంది'
          : language === 'hi'
          ? 'मौसम में बारिश की संभावना है'
          : 'Rain appears in the sample weather',
      explanation:
        language === 'te'
          ? 'వర్షం కురిసే అవకాశం ఉన్నందున ఎరువుల పిచికారీ మరియు నీటి తడులను తాత్కాలికంగా వాయిదా వేయండి.'
          : language === 'hi'
          ? 'बारिश के अनुमान को देखते हुए सिंचाई और खाद का छिड़काव कुछ समय के लिए टालें।'
          : 'Rain is forecast in the sample data, so review your irrigation plan before watering again.',
      to: '/planner',
      action: language === 'te' ? 'వాతావరణ ట్యాబ్ చూడండి' : language === 'hi' ? 'मौसम देखें' : 'Open weather tab',
    });
  } else if (weather && weather.temperature >= 32) {
    items.push({
      id: 'heat',
      priority: language === 'te' ? 'ముఖ్యమైనది' : language === 'hi' ? 'मध्यम' : 'Medium',
      title:
        language === 'te'
          ? 'పగటి ఉష్ణోగ్రత అధికంగా ఉంది'
          : language === 'hi'
          ? 'दोपहर में तेज धूप व तापमान'
          : 'Warm afternoon in sample weather',
      explanation:
        language === 'te'
          ? 'ఎండ తీవ్రత ఎక్కువగా ఉన్నందున మధ్యాహ్నం వేళల్లో కాకుండా ఉదయం లేదా సాయంత్రం వేళల్లో నీరు పెట్టండి.'
          : language === 'hi'
          ? 'तेज धूप में दोपहर की सिंचाई से बचें; सुबह या शाम के ठंडे समय में ही पानी दें।'
          : 'The sample district is hot. Check nurseries and avoid mid-day flood irrigation.',
      to: '/planner',
      action: language === 'te' ? 'వాతావరణం చూడండి' : language === 'hi' ? 'मौसम देखें' : 'Open weather',
    });
  }

  if (soilRecords.length === 0) {
    items.push({
      id: 'soil',
      priority: language === 'te' ? 'ముఖ్యమైనది' : language === 'hi' ? 'मध्यम' : 'Medium',
      title:
        language === 'te'
          ? 'భూసార పరీక్ష రికార్డు నమోదు కాలేదు'
          : language === 'hi'
          ? 'मिट्टी की जांच दर्ज नहीं है'
          : 'No soil test recorded',
      explanation:
        language === 'te'
          ? 'మీ భూసార కార్డు (Soil Health Card) ఫలితాలను నమోదు చేసి నేల పోషకాల స్థాయిని తెలుసుకోండి.'
          : language === 'hi'
          ? 'सॉइल हेल्थ कार्ड की जांच रिपोर्ट दर्ज कर सही मात्रा में संतुलित खाद का उपयोग करें।'
          : 'Consider getting your soil tested through the department / lab.',
      to: '/planner',
      action: language === 'te' ? 'నేల రికార్డులు చూడండి' : language === 'hi' ? 'मिट्टी टैब खोलें' : 'Open soil tab',
    });
  }

  if (irrigationRecords.length === 0 && crop) {
    const irriTip = getCropText(crop, 'irrigation', language);
    items.push({
      id: 'water',
      priority: language === 'te' ? 'సహాయక' : language === 'hi' ? 'सामान्य' : 'Low',
      title:
        language === 'te'
          ? 'నీటిపారుదల డైరీని ప్రారంభించండి'
          : language === 'hi'
          ? 'सिंचाई डायरी शुरू करें'
          : 'Start an irrigation notebook',
      explanation:
        language === 'te'
          ? `${cropName}: ${irriTip ? irriTip.slice(0, 80) + '...' : 'ప్రతి తడి వివరాలను నమోదు చేయండి.'}`
          : language === 'hi'
          ? `${cropName}: ${irriTip ? irriTip.slice(0, 80) + '...' : 'सिंचाई की तारीख और अंतराल दर्ज करें।'}`
          : `${cropName}: ${irriTip ? irriTip.slice(0, 100) + '...' : 'Plan water intervals.'}`,
      to: '/planner',
      action: language === 'te' ? 'నీటి రికార్డులు చూడండి' : language === 'hi' ? 'पानी टैब खोलें' : 'Open water tab',
    });
  }

  if (items.length === 0) {
    items.push({
      id: 'ok',
      priority: language === 'te' ? 'అన్నీ బాగున్నాయి' : language === 'hi' ? 'सब ठीक है' : 'Low',
      title:
        language === 'te'
          ? 'మీ వ్యవసాయ రికార్డులు తాజాగా ఉన్నాయి'
          : language === 'hi'
          ? 'आपके कृषि रिकॉर्ड अद्यतन हैं'
          : 'Records look up to date',
      explanation:
        language === 'te'
          ? 'పొలాన్ని క్రమం తప్పకుండా పరిశీలిస్తూ మంచి దిగుబడుల కోసం సరైన సమయానికి పనులు పూర్తి చేయండి.'
          : language === 'hi'
          ? 'नियमित रूप से खेत का निरीक्षण करते रहें और समय पर आवश्यक कार्य करें।'
          : 'Keep walking the field and confirm any spray or fertiliser decision with a local officer.',
      to: '/planner',
      action: language === 'te' ? 'క్యాలెండర్ తెరవండి' : language === 'hi' ? 'प्लानर खोलें' : 'Open planner',
    });
  }

  return items;
}
