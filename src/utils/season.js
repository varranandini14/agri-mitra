/**
 * Indian Crop Seasons (Kharif, Rabi, Zaid)
 * Localized calendar months, notes, and season detection for Telugu, Hindi, and English.
 */

export const SEASONS_DATA = [
  {
    id: 'Kharif',
    names: {
      en: 'Kharif',
      te: 'ఖరీఫ్ (వానాకాలం)',
      hi: 'खरीफ (मानसून)',
    },
    months: {
      en: 'June – October',
      te: 'జూన్ – అక్టోబర్ (వానాకాలం)',
      hi: 'जून – अक्टूबर (मानसून)',
    },
    note: {
      en: 'Monsoon crops such as rice, maize, cotton, chilli, groundnut and soybean.',
      te: 'వరి, మొక్కజొన్న, పత్తి, మిరప, వేరుశనగ మరియు సోయాబీన్ వంటి వానాకాలపు ప్రధాన పంటలు.',
      hi: 'धान, मक्का, कपास, मिर्च, मूंगफली और सोयाबीन जैसी प्रमुख मानसूनी फसलें।',
    },
  },
  {
    id: 'Rabi',
    names: {
      en: 'Rabi',
      te: 'రబీ (శీతాకాలం / యాసంగి)',
      hi: 'रबी (सर्दियां / रबी)',
    },
    months: {
      en: 'October – March',
      te: 'అక్టోబర్ – మార్చి (శీతాకాలం)',
      hi: 'अक्टूबर – मार्च (सर्दियां)',
    },
    note: {
      en: 'Winter crops such as wheat, mustard, chickpea, black gram, sunflower and potato.',
      te: 'గోధుమ, ఆవాలు, శనగలు, మినుములు, పొద్దుతిరుగుడు మరియు బంగాళాదుంప వంటి శీతాకాల పంటలు.',
      hi: 'गेहूं, सरसों, चना, उड़द, सूरजमुखी और आलू जैसी प्रमुख शीतकालीन फसलें।',
    },
  },
  {
    id: 'Zaid',
    names: {
      en: 'Zaid',
      te: 'జైద్ (వేసవి పంటలు)',
      hi: 'जायद (गर्मी / जायद)',
    },
    months: {
      en: 'March – June',
      te: 'మార్చి – జూన్ (వేసవి కాలం)',
      hi: 'मार्च – जून (गर्मी)',
    },
    note: {
      en: 'Short summer crops such as watermelon, cucumber, leafy vegetables, and fodder.',
      te: 'పుచ్చకాయ, దోసకాయ, ఆకుకూరలు, వేసవి కూరగాయలు మరియు పశుగ్రాసం వంటి స్వల్పకాలిక పంటలు.',
      hi: 'तरबूज, खीरा, ककड़ी, पत्तेदार सब्जियां और चारा जैसी कम अवधि की फसलें।',
    },
  },
];

export const SEASONS = SEASONS_DATA.map((s) => ({
  id: s.id,
  months: s.months.en,
  note: s.note.en,
}));

export function getLocalizedSeasons(lang = 'en') {
  return SEASONS_DATA.map((s) => ({
    id: s.id,
    name: s.names[lang] || s.names.en,
    months: s.months[lang] || s.months.en,
    note: s.note[lang] || s.note.en,
  }));
}

export function getCurrentSeason(date = new Date()) {
  const month = date.getMonth(); // 0 = January
  const day = date.getDate();

  // Late October onwards is treated as Rabi sowing time.
  if ((month === 9 && day >= 16) || month === 10 || month === 11 || month === 0 || month === 1 || (month === 2 && day <= 15)) {
    return 'Rabi';
  }
  if ((month === 2 && day >= 16) || month === 3 || month === 4) {
    return 'Zaid';
  }
  return 'Kharif';
}

export function getLocalizedSeasonName(seasonId, lang = 'en') {
  const found = SEASONS_DATA.find((s) => s.id === seasonId);
  if (!found) return seasonId;
  return found.names[lang] || found.names.en || seasonId;
}

export function getSeasonTintClass(season) {
  if (season === 'Rabi') return 'season-rabi';
  if (season === 'Zaid') return 'season-zaid';
  return 'season-kharif';
}
