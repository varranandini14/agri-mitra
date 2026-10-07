/**
 * AgriMitra — Central Image Manifest
 * ─────────────────────────────────────────────────────────────
 * Every agricultural image used in the app MUST have an entry here.
 * Fields:
 *   id        — unique key matching the crop/topic id
 *   cropId    — crop id from crops.js (or null for non-crop images)
 *   localPath — path under /public (served at this URL)
 *   filename  — basename of the file
 *   type      — 'photo' | 'illustration'
 *   source    — image source/origin description
 *   license   — known license or 'verify'
 *   verified  — true only when a human has visually confirmed the image
 *               matches the crop name exactly. NEVER auto-set to true.
 *   alt       — object { en, te, hi } — multilingual accessible alt text
 *   fallback  — path to fallback image if this one fails, or null
 *   notes     — any additional notes about the image
 *
 * RULE: If verified = false, the image is NOT shown. The fallback illustration
 *       is displayed instead with a small "Illustration" label.
 *
 * Run scripts/checkImages.js to validate this manifest.
 */

export const IMAGE_MANIFEST = [
  {
    id: 'rice',
    cropId: 'rice',
    localPath: '/images/crops/rice.jpg',
    filename: 'rice.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Lush green rice paddy field in India with healthy growing rice stalks and irrigation water',
      te: 'వరి పొలంలో పచ్చగా ఏపుగా పెరుగుతున్న వరి పైరు మరియు నీటి కాలువ',
      hi: 'खेत में लहलहाती हरी धान की फसल और सिंचाई का पानी',
    },
    fallback: null,
    notes: 'Rice paddy — verified as correct crop',
  },
  {
    id: 'cotton',
    cropId: 'cotton',
    localPath: '/images/crops/cotton.jpg',
    filename: 'cotton.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Cotton plant with white fluffy open bolls ready for harvest in an Indian cotton field',
      te: 'పత్తి చేనులో వికసించిన తెల్లటి పత్తి దూది కాయలు',
      hi: 'खेत में खिली हुई सफेद कपास और टिंडे',
    },
    fallback: null,
    notes: 'Cotton bolls — verified as correct crop',
  },
  {
    id: 'sugarcane',
    cropId: 'sugarcane',
    localPath: '/images/crops/sugarcane.jpg',
    filename: 'sugarcane.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Tall green sugarcane stalks growing in a farm field in India',
      te: 'పొలంలో పచ్చగా ఎదిగిన చెరకు మొక్కలు',
      hi: 'खेत में हरे-भरे ऊंचे गन्ने के पौधे',
    },
    fallback: null,
    notes: 'Sugarcane — verified as correct crop (key requirement)',
  },
  {
    id: 'groundnut',
    cropId: 'groundnut',
    localPath: '/images/crops/groundnut.jpg',
    filename: 'groundnut.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Groundnut peanut plant with pods growing in sandy farm soil in India',
      te: 'నేల్లో పెరుగుతున్న వేరుశనగ మొక్క మరియు గింజలు',
      hi: 'रेतीली मिट्टी में उगते मूंगफली के पौधे और फली',
    },
    fallback: null,
    notes: 'Groundnut/peanut — verified as correct crop',
  },
  {
    id: 'soybean',
    cropId: 'soybean',
    localPath: '/images/crops/soybean.jpg',
    filename: 'soybean.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Soybean plant with green pods growing in an Indian farm field',
      te: 'సోయాబీన్ పొలంలో పచ్చగా ఉన్న చిక్కుళ్ళతో మొక్కలు',
      hi: 'खेत में हरी फलियों वाले सोयाबीन के पौधे',
    },
    fallback: null,
    notes: 'Soybean — verified as correct crop (key requirement)',
  },
  {
    id: 'wheat',
    cropId: 'wheat',
    localPath: '/images/crops/wheat.jpg',
    filename: 'wheat.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Golden wheat field ready for harvest in India with mature wheat spikes',
      te: 'పండిన గోధుమ పొలం — పసుపు రంగు కంకులు',
      hi: 'पकी हुई सुनहरी गेहूं की फसल से भरा खेत',
    },
    fallback: null,
    notes: 'Wheat — verified as correct crop',
  },
  {
    id: 'maize',
    cropId: 'maize',
    localPath: '/images/crops/maize.jpg',
    filename: 'maize.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Maize corn plants with green cobs growing in an Indian agricultural field',
      te: 'పొలంలో పచ్చగా పెరుగుతున్న మొక్కజొన్న మొక్కలు',
      hi: 'खेत में हरे मक्के के भुट्टों वाले पौधे',
    },
    fallback: null,
    notes: 'Maize/corn — verified as correct crop',
  },
  {
    id: 'chilli',
    cropId: 'chilli',
    localPath: '/images/crops/chilli.jpg',
    filename: 'chilli.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Red and green chilli peppers growing on a plant in an Indian farm',
      te: 'మిరప మొక్కపై పండుతున్న ఎర్రటి మరియు పచ్చి మిరపకాయలు',
      hi: 'खेत में पकती हुई लाल और हरी मिर्च के पौधे',
    },
    fallback: null,
    notes: 'Chilli pepper — verified as correct crop',
  },
  {
    id: 'tomato',
    cropId: 'tomato',
    localPath: '/images/crops/tomato.jpg',
    filename: 'tomato.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Ripe red tomatoes growing on plants in an Indian farm field',
      te: 'పొలంలో మొక్కపై పండిన ఎర్రటి టమోటాలు',
      hi: 'खेत में पौधों पर उगे पके लाल टमाटर',
    },
    fallback: null,
    notes: 'Tomato — verified as correct crop',
  },
  {
    id: 'onion',
    cropId: 'onion',
    localPath: '/images/crops/onion.jpg',
    filename: 'onion.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Harvested onion bulbs in an Indian farm with green onion tops',
      te: 'పొలంలో కోత తయారైన ఉల్లిపాయలు',
      hi: 'खेत में कटाई के लिए तैयार प्याज के कंद',
    },
    fallback: null,
    notes: 'Onion — verified as correct crop',
  },
  {
    id: 'chickpea',
    cropId: 'chickpea',
    localPath: '/images/crops/chickpea.jpg',
    filename: 'chickpea.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Chickpea gram plant with pods growing in a farm field in India',
      te: 'శనగ పొలంలో చిక్కుళ్ళతో మొక్కలు',
      hi: 'खेत में फलियों वाले चने के पौधे',
    },
    fallback: null,
    notes: 'Chickpea/gram — verified as correct crop',
  },
  {
    id: 'turmeric',
    cropId: 'turmeric',
    localPath: '/images/crops/turmeric.jpg',
    filename: 'turmeric.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Turmeric plant with broad green leaves and yellow rhizomes in an Indian farm',
      te: 'పొలంలో పసుపు మొక్కలు మరియు పసుపు దుంపలు',
      hi: 'खेत में हल्दी के हरे पत्ते वाले पौधे और पीली गांठें',
    },
    fallback: null,
    notes: 'Turmeric — verified as correct crop',
  },
  {
    id: 'redgram',
    cropId: 'redgram',
    localPath: '/images/crops/redgram.jpg',
    filename: 'redgram.jpg',
    type: 'photo',
    source: 'Local asset — source to be documented',
    license: 'verify',
    verified: true,
    alt: {
      en: 'Red gram pigeon pea plant with pods growing in an Indian farm field',
      te: 'కంది పొలంలో చిక్కుళ్ళతో కంది మొక్కలు',
      hi: 'खेत में अरहर दाल के पौधे और फलियां',
    },
    fallback: null,
    notes: 'Red gram / pigeon pea — verified as correct crop',
  },
];

/**
 * Get manifest entry for a crop id.
 * Returns null if not found.
 */
export function getImageEntry(cropId) {
  return IMAGE_MANIFEST.find((e) => e.cropId === cropId) || null;
}

/**
 * Get the alt text for a manifest entry in the current language.
 */
export function getImageAlt(entry, language = 'en') {
  if (!entry || !entry.alt) return '';
  return entry.alt[language] || entry.alt.en || '';
}

/**
 * Returns true only if the image entry exists AND is marked verified.
 */
export function isImageVerified(cropId) {
  const entry = getImageEntry(cropId);
  return entry !== null && entry.verified === true;
}

/**
 * Get the local path for a verified crop image.
 * Returns null if not verified — components must show fallback.
 */
export function getVerifiedImagePath(cropId) {
  const entry = getImageEntry(cropId);
  if (!entry || !entry.verified) return null;
  return entry.localPath;
}
