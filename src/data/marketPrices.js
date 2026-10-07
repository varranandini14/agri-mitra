/**
 * Sample mandi-style prices in ₹ per quintal.
 * These are demonstration numbers only — not live market data.
 */
export const MARKETS = [
  'Azadpur (Delhi)',
  'Lasalgaon (Nashik)',
  'Guntur',
  'Indore',
  'Ludhiana',
  'Kurnool',
  'Ahmedabad',
  'Warangal',
  'Khanna (Punjab)',
  'Vashi (Mumbai)',
  'Rajkot',
  'Bhopal',
];

export const MARKET_PRICES = [
  // Wheat
  { id: 'p1', crop: 'Wheat', market: 'Ludhiana', price: 2280 },
  { id: 'p2', crop: 'Wheat', market: 'Khanna (Punjab)', price: 2295 },
  { id: 'p3', crop: 'Wheat', market: 'Indore', price: 2210 },
  { id: 'p4', crop: 'Wheat', market: 'Bhopal', price: 2230 },
  { id: 'p5', crop: 'Wheat', market: 'Ahmedabad', price: 2195 },
  { id: 'p6', crop: 'Wheat', market: 'Azadpur (Delhi)', price: 2310 },

  // Rice / Paddy
  { id: 'p7', crop: 'Rice (Paddy)', market: 'Kurnool', price: 2050 },
  { id: 'p8', crop: 'Rice (Paddy)', market: 'Guntur', price: 2125 },
  { id: 'p9', crop: 'Rice (Paddy)', market: 'Warangal', price: 2090 },
  { id: 'p10', crop: 'Rice (Paddy)', market: 'Azadpur (Delhi)', price: 2180 },
  { id: 'p11', crop: 'Rice (Paddy)', market: 'Ludhiana', price: 2160 },

  // Maize
  { id: 'p12', crop: 'Maize', market: 'Indore', price: 1850 },
  { id: 'p13', crop: 'Maize', market: 'Ahmedabad', price: 1790 },
  { id: 'p14', crop: 'Maize', market: 'Kurnool', price: 1825 },
  { id: 'p15', crop: 'Maize', market: 'Warangal', price: 1870 },
  { id: 'p16', crop: 'Maize', market: 'Bhopal', price: 1840 },

  // Cotton
  { id: 'p17', crop: 'Cotton', market: 'Rajkot', price: 6920 },
  { id: 'p18', crop: 'Cotton', market: 'Ahmedabad', price: 6800 },
  { id: 'p19', crop: 'Cotton', market: 'Guntur', price: 6650 },
  { id: 'p20', crop: 'Cotton', market: 'Warangal', price: 6710 },
  { id: 'p21', crop: 'Cotton', market: 'Indore', price: 6725 },

  // Soybean
  { id: 'p22', crop: 'Soybean', market: 'Indore', price: 4300 },
  { id: 'p23', crop: 'Soybean', market: 'Bhopal', price: 4280 },
  { id: 'p24', crop: 'Soybean', market: 'Ahmedabad', price: 4220 },
  { id: 'p25', crop: 'Soybean', market: 'Lasalgaon (Nashik)', price: 4350 },
  { id: 'p26', crop: 'Soybean', market: 'Ludhiana', price: 4180 },

  // Mustard
  { id: 'p27', crop: 'Mustard', market: 'Ludhiana', price: 5450 },
  { id: 'p28', crop: 'Mustard', market: 'Khanna (Punjab)', price: 5480 },
  { id: 'p29', crop: 'Mustard', market: 'Indore', price: 5380 },
  { id: 'p30', crop: 'Mustard', market: 'Azadpur (Delhi)', price: 5520 },
  { id: 'p31', crop: 'Mustard', market: 'Rajkot', price: 5410 },

  // Chickpea
  { id: 'p32', crop: 'Chickpea (Gram)', market: 'Indore', price: 5200 },
  { id: 'p33', crop: 'Chickpea (Gram)', market: 'Bhopal', price: 5240 },
  { id: 'p34', crop: 'Chickpea (Gram)', market: 'Ahmedabad', price: 5125 },
  { id: 'p35', crop: 'Chickpea (Gram)', market: 'Kurnool', price: 5180 },

  // Onion
  { id: 'p36', crop: 'Onion', market: 'Lasalgaon (Nashik)', price: 1650 },
  { id: 'p37', crop: 'Onion', market: 'Vashi (Mumbai)', price: 1780 },
  { id: 'p38', crop: 'Onion', market: 'Azadpur (Delhi)', price: 1820 },
  { id: 'p39', crop: 'Onion', market: 'Ahmedabad', price: 1710 },
  { id: 'p40', crop: 'Onion', market: 'Kurnool', price: 1590 },

  // Tomato
  { id: 'p41', crop: 'Tomato', market: 'Azadpur (Delhi)', price: 1400 },
  { id: 'p42', crop: 'Tomato', market: 'Guntur', price: 1250 },
  { id: 'p43', crop: 'Tomato', market: 'Kurnool', price: 1180 },
  { id: 'p44', crop: 'Tomato', market: 'Vashi (Mumbai)', price: 1380 },

  // Chilli
  { id: 'p45', crop: 'Chilli', market: 'Guntur', price: 9800 },
  { id: 'p46', crop: 'Chilli', market: 'Kurnool', price: 9450 },
  { id: 'p47', crop: 'Chilli', market: 'Warangal', price: 9600 },
  { id: 'p48', crop: 'Chilli', market: 'Azadpur (Delhi)', price: 10200 },

  // Potato
  { id: 'p49', crop: 'Potato', market: 'Azadpur (Delhi)', price: 980 },
  { id: 'p50', crop: 'Potato', market: 'Ludhiana', price: 920 },
  { id: 'p51', crop: 'Potato', market: 'Vashi (Mumbai)', price: 1040 },
  { id: 'p52', crop: 'Potato', market: 'Ahmedabad', price: 950 },

  // Groundnut
  { id: 'p53', crop: 'Groundnut', market: 'Rajkot', price: 5920 },
  { id: 'p54', crop: 'Groundnut', market: 'Ahmedabad', price: 5850 },
  { id: 'p55', crop: 'Groundnut', market: 'Kurnool', price: 5720 },

  // Turmeric
  { id: 'p56', crop: 'Turmeric', market: 'Guntur', price: 11200 },
  { id: 'p57', crop: 'Turmeric', market: 'Kurnool', price: 10950 },
  { id: 'p58', crop: 'Turmeric', market: 'Warangal', price: 11100 },

  // Pigeon Pea
  { id: 'p59', crop: 'Pigeon Pea (Arhar / Tur)', market: 'Indore', price: 6400 },
  { id: 'p60', crop: 'Pigeon Pea (Arhar / Tur)', market: 'Kurnool', price: 6550 },
  { id: 'p61', crop: 'Pigeon Pea (Arhar / Tur)', market: 'Warangal', price: 6600 },

  // Sugarcane
  { id: 'p62', crop: 'Sugarcane', market: 'Ludhiana', price: 380 },
  { id: 'p63', crop: 'Sugarcane', market: 'Khanna (Punjab)', price: 385 },
  { id: 'p64', crop: 'Sugarcane', market: 'Lasalgaon (Nashik)', price: 360 },
];

export const CROP_LOCALIZATION = {
  'Wheat': { te: 'గోధుమ (Wheat)', hi: 'गेहूं (Wheat)', en: 'Wheat' },
  'Rice (Paddy)': { te: 'వరి / ధాన్యం (Paddy)', hi: 'धान / चावल (Paddy)', en: 'Rice (Paddy)' },
  'Maize': { te: 'మొక్కజొన్న (Maize)', hi: 'मक्का (Maize)', en: 'Maize' },
  'Cotton': { te: 'పత్తి (Cotton)', hi: 'कपास (Cotton)', en: 'Cotton' },
  'Soybean': { te: 'సోయాబీన్ (Soybean)', hi: 'सोयाबीन (Soybean)', en: 'Soybean' },
  'Mustard': { te: 'ఆవాలు (Mustard)', hi: 'सरसों (Mustard)', en: 'Mustard' },
  'Chickpea (Gram)': { te: 'శనగలు (Gram)', hi: 'चना (Gram)', en: 'Chickpea (Gram)' },
  'Onion': { te: 'ఉల్లిపాయ (Onion)', hi: 'प्याज (Onion)', en: 'Onion' },
  'Tomato': { te: 'టమోటా (Tomato)', hi: 'टमाटर (Tomato)', en: 'Tomato' },
  'Chilli': { te: 'మిరపకాయలు (Chilli)', hi: 'मिर्च (Chilli)', en: 'Chilli' },
  'Potato': { te: 'బంగాళాదుంప (Potato)', hi: 'आलू (Potato)', en: 'Potato' },
  'Groundnut': { te: 'వేరుశనగ (Groundnut)', hi: 'मूंगफली (Groundnut)', en: 'Groundnut' },
  'Turmeric': { te: 'పసుపు (Turmeric)', hi: 'हल्दी (Turmeric)', en: 'Turmeric' },
  'Pigeon Pea (Arhar / Tur)': { te: 'కందులు (Arhar / Tur)', hi: 'अरहर / तूर (Arhar / Tur)', en: 'Pigeon Pea (Arhar / Tur)' },
  'Sugarcane': { te: 'చెరకు (Sugarcane)', hi: 'गन्ना (Sugarcane)', en: 'Sugarcane' },
};

export const MARKET_LOCALIZATION = {
  'Azadpur (Delhi)': { te: 'ఆజాద్‌పూర్ (ఢిల్లీ)', hi: 'आजादपुर (दिल्ली)', en: 'Azadpur (Delhi)' },
  'Lasalgaon (Nashik)': { te: 'లసల్‌గావ్ (నాసిక్)', hi: 'लासलगांव (नासिक)', en: 'Lasalgaon (Nashik)' },
  'Guntur': { te: 'గుంటూరు', hi: 'गुंटूर', en: 'Guntur' },
  'Indore': { te: 'ఇండోర్', hi: 'इंदौर', en: 'Indore' },
  'Ludhiana': { te: 'లూధియానా', hi: 'लुधियाना', en: 'Ludhiana' },
  'Kurnool': { te: 'కర్నూలు', hi: 'कर्नूल', en: 'Kurnool' },
  'Ahmedabad': { te: 'అహ్మదాబాద్', hi: 'अहमदाबाद', en: 'Ahmedabad' },
  'Warangal': { te: 'వరంగల్', hi: 'वारंगल', en: 'Warangal' },
  'Khanna (Punjab)': { te: 'ఖన్నా (పంజాబ్)', hi: 'खन्ना (पंजाब)', en: 'Khanna (Punjab)' },
  'Vashi (Mumbai)': { te: 'వాషి (ముంబై)', hi: 'वाशी (मुंबई)', en: 'Vashi (Mumbai)' },
  'Rajkot': { te: 'రాజ్‌కోట్', hi: 'राजकोट', en: 'Rajkot' },
  'Bhopal': { te: 'భోపాల్', hi: 'भोपाल', en: 'Bhopal' },
};

export function getLocalizedMarketCrop(cropName, lang = 'en') {
  if (!cropName) return '';
  return CROP_LOCALIZATION[cropName]?.[lang] || CROP_LOCALIZATION[cropName]?.en || cropName;
}

export function getLocalizedMarketName(marketName, lang = 'en') {
  if (!marketName) return '';
  return MARKET_LOCALIZATION[marketName]?.[lang] || MARKET_LOCALIZATION[marketName]?.en || marketName;
}

export function uniqueCropsFromPrices() {
  return [...new Set(MARKET_PRICES.map((row) => row.crop))].sort();
}

