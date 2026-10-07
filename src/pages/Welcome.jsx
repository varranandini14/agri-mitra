/**
 * AgriMitra — Welcome / Landing Page (Vibrant & Farmer-First)
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose:
 *   - Immediate, trustworthy first impression of modern Indian agriculture
 *   - Highlights authentic Indian farmer + paddy visual hero
 *   - Explains the 4 core pillars: Crop Guide, Market Prices, Schemes, Farm Planner
 *   - Outlines the 5-step Farm Journey: Understand → Plan → Record → Compare → Review
 *   - Provides farmer trust pillars (Simple, Farmer Friendly, 100% Private)
 *   - Multilingual voice narration and language switcher (en, te, hi)
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext.jsx';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant.js';
import { useTheme } from '../hooks/useTheme.js';
import ThemeToggle from '../components/ThemeToggle.jsx';
import farmerHeroImg from '../assets/farmer-hero-paddy.jpg';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

const FEATURES = {
  en: [
    {
      icon: '🌱',
      title: 'Crop Guide',
      desc: 'Step-by-step guidance for Indian crops from seed selection to harvesting.',
      tag: 'Stage-by-Stage',
    },
    {
      icon: '💰',
      title: 'Market Prices',
      desc: 'Compare nearby mandi rates and calculate your expected crop profits.',
      tag: 'Real Mandis',
    },
    {
      icon: '📋',
      title: 'Government Schemes',
      desc: 'Discover agricultural subsidies, eligibility rules, and required paperwork.',
      tag: 'Subsidies',
    },
    {
      icon: '📅',
      title: 'Farm Planner',
      desc: 'Track farm tasks, soil records, water schedules, and your photo journal.',
      tag: 'Smart Diary',
    },
  ],
  te: [
    {
      icon: '🌱',
      title: 'పంట మార్గదర్శిని',
      desc: 'విత్తనం నాటినప్పటి నుండి కోత వరకు తెలుగు పంటలకు దశలవారీ వ్యవసాయ సలహాలు.',
      tag: 'దశలవారీ సాగు',
    },
    {
      icon: '💰',
      title: 'మార్కెట్ ధరలు',
      desc: 'సమీప మండి ధరలను పోల్చి మీ పంట లాభాలను ఖచ్చితంగా లెక్కించండి.',
      tag: 'మండి ధరలు',
    },
    {
      icon: '📋',
      title: 'ప్రభుత్వ పథకాలు',
      desc: 'రైతు సంక్షేమ పథకాలు, సబ్సిడీల అర్హతలు మరియు అవసరమైన దరఖాస్తు పత్రాలు.',
      tag: 'సబ్సిడీలు',
    },
    {
      icon: '📅',
      title: 'పొలం ప్లానర్',
      desc: 'రోజువారీ వ్యవసాయ పనులు, నేల పరీక్ష, నీటి యాజమాన్యం మరియు ఫోటో డైరీ.',
      tag: 'స్మార్ట్ డైరీ',
    },
  ],
  hi: [
    {
      icon: '🌱',
      title: 'फसल गाइड',
      desc: 'बीज बोने से लेकर कटाई तक भारतीय फसलों के लिए चरण-दर-चरण कृषि मार्गदर्शन।',
      tag: 'चरण-दर-चरण',
    },
    {
      icon: '💰',
      title: 'मंडी भाव',
      desc: 'निकटतम मंडियों के भाव की तुलना करें और अपने संभावित मुनाफे का हिसाब लगाएं।',
      tag: 'मंडी दरें',
    },
    {
      icon: '📋',
      title: 'सरकारी योजनाएं',
      desc: 'कृषि सब्सिडी, सरकारी योजनाएं, पात्रता नियम और आवश्यक दस्तावेज़ों की सूची।',
      tag: 'सब्सिडी',
    },
    {
      icon: '📅',
      title: 'खेत प्लानर',
      desc: 'खेत के काम, मिट्टी परीक्षण, सिंचाई प्रबंधन और फोटो डायरी व्यवस्थित रखें।',
      tag: 'स्मार्ट डायरी',
    },
  ],
};

const TRUST_POINTS = {
  en: [
    {
      icon: '🌱',
      title: 'Simple & Clear',
      desc: 'Plain language farming advice designed specifically for real field conditions.',
    },
    {
      icon: '📱',
      title: 'Farmer Friendly',
      desc: 'High-contrast large touch targets with optional voice narration.',
    },
    {
      icon: '🔒',
      title: '100% Private',
      desc: 'All farm calculations, notes, and crop photos remain safely on your device.',
    },
  ],
  te: [
    {
      icon: '🌱',
      title: 'సులభం & స్పష్టం',
      desc: 'క్షేత్ర స్థాయి పరిస్థితులకు తగిన సరళమైన భాషలో వ్యవసాయ సూచనలు.',
    },
    {
      icon: '📱',
      title: 'రైతు అనుకూలం',
      desc: 'పెద్ద బటన్లు, స్పష్టమైన రంగులు మరియు వాయిస్ సహాయం.',
    },
    {
      icon: '🔒',
      title: '100% ప్రైవేట్',
      desc: 'మీ పొలం లెక్కలు, గమనికలు మరియు ఫోటోలు మీ ఫోన్‌లోనే సురక్షితం.',
    },
  ],
  hi: [
    {
      icon: '🌱',
      title: 'सरल और स्पष्ट',
      desc: 'वास्तविक कृषि परिस्थितियों के अनुकूल व्यावहारिक एवं सरल मार्गदर्शन।',
    },
    {
      icon: '📱',
      title: 'किसान अनुकूल',
      desc: 'बड़े बटन, उच्च कंट्रास्ट और सहज आवाज सहायता।',
    },
    {
      icon: '🔒',
      title: '100% निजी',
      desc: 'आपके खेत के रिकॉर्ड, फोटो और हिसाब केवल आपके फोन में सुरक्षित हैं।',
    },
  ],
};

const JOURNEY_STEPS = {
  en: [
    { step: '01', icon: '🌱', label: 'Understand', desc: 'Explore crop cycles & agronomy' },
    { step: '02', icon: '📋', label: 'Plan', desc: 'Schedule sowing & inputs' },
    { step: '03', icon: '📝', label: 'Record', desc: 'Track costs & crop symptoms' },
    { step: '04', icon: '📊', label: 'Compare', desc: 'Check mandi rates & profit' },
    { step: '05', icon: '🌾', label: 'Review', desc: 'Analyze yield & next season' },
  ],
  te: [
    { step: '01', icon: '🌱', label: 'అర్థం చేసుకోండి', desc: 'పంట దశలు & సాగు పద్ధతులు' },
    { step: '02', icon: '📋', label: 'ప్రణాళిక చేయండి', desc: 'విత్తనం & కాలానుగుణ పనులు' },
    { step: '03', icon: '📝', label: 'నమోదు చేయండి', desc: 'ఖర్చులు & పంట లక్షణాలు' },
    { step: '04', icon: '📊', label: 'పోల్చండి', desc: 'మండి ధరలు & మార్కెట్ లాభాలు' },
    { step: '05', icon: '🌾', label: 'సమీక్షించండి', desc: 'దిగుబడి & అనుభవాల సమీక్ష' },
  ],
  hi: [
    { step: '01', icon: '🌱', label: 'समझें', desc: 'फसल चक्र और आधुनिक तकनीक' },
    { step: '02', icon: '📋', label: 'योजना बनाएं', desc: 'बुआई और मौसमी कार्य' },
    { step: '03', icon: '📝', label: 'रिकॉर्ड करें', desc: 'लागत और फसल स्वास्थ्य' },
    { step: '04', icon: '📊', label: 'तुलना करें', desc: 'मंडी भाव और शुद्ध मुनाफा' },
    { step: '05', icon: '🌾', label: 'समीक्षा करें', desc: 'उपज और अगले सीजन की तैयारी' },
  ],
};

const INTRO_VOICE = {
  en: 'Welcome to AgriMitra. Your Farm. Your Records. Your Decisions. AgriMitra is your digital farming companion. Use it to understand crop cultivation, track your farm activities, compare market prices, and explore government schemes. Tap Explore AgriMitra to begin.',
  te: 'అగ్రిమిత్రకు స్వాగతం. మీ పొలం. మీ రికార్డులు. మీ నిర్ణయాలు. అగ్రిమిత్ర మీ డిజిటల్ వ్యవసాయ సహాయకుడు. పంట సాగు అర్థం చేసుకోవడానికి, మీ పొలం కార్యకలాపాలను నమోదు చేయడానికి, మార్కెట్ ధరలను పోల్చడానికి, మరియు ప్రభుత్వ పథకాలను అన్వేషించడానికి దీన్ని ఉపయోగించండి. ప్రారంభించడానికి అగ్రిమిత్రను చూడండి అని నొక్కండి.',
  hi: 'एग्रीमित्र में आपका स्वागत है। आपका खेत। आपके रिकॉर्ड। आपके निर्णय। एग्रीमित्र आपका डिजिटल कृषि साथी है। फसल की खेती समझने, अपनी खेती की गतिविधियों को ट्रैक करने, मंडी भाव की तुलना करने और सरकारी योजनाओं को जानने के लिए इसका उपयोग करें। शुरू करने के लिए एग्रीमित्र देखें पर टैप करें।',
};

export default function Welcome() {
  const navigate = useNavigate();
  const { language, setLanguage } = useAppData();
  const { theme, toggleTheme } = useTheme();
  const { speak, stopSpeaking, isSpeaking } = useVoiceAssistant({ language });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title =
      language === 'te'
        ? 'అగ్రిమిత్రకు స్వాగతం — రైతు స్మార్ట్ వ్యవసాయ సహాయకుడు'
        : language === 'hi'
        ? 'एग्रीमित्र में स्वागत — किसान स्मार्ट कृषि सहायक'
        : 'Welcome to AgriMitra — Smart Farming Assistant for Indian Farmers';
  }, [language]);

  function handleExplore() {
    try {
      localStorage.setItem('agrimitra:welcomeSeen', 'true');
    } catch {
      /* ignore quota issues */
    }
    navigate('/home');
  }

  function handleListenIntro() {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(INTRO_VOICE[language] || INTRO_VOICE.en);
    }
  }

  const features = FEATURES[language] || FEATURES.en;
  const trustPoints = TRUST_POINTS[language] || TRUST_POINTS.en;
  const journeySteps = JOURNEY_STEPS[language] || JOURNEY_STEPS.en;

  const headingText =
    language === 'te'
      ? 'మీ పొలం. మీ రికార్డులు. మీ నిర్ణయాలు.'
      : language === 'hi'
      ? 'आपका खेत। आपके रिकॉर्ड। आपके निर्णय।'
      : 'Your Farm. Your Records. Your Decisions.';

  const subLeadText =
    language === 'te'
      ? 'పంట సాగు నుండి మార్కెట్ ధరలు మరియు ప్రభుత్వ పథకాల వరకు — ప్రతి రైతుకు నమ్మకమైన, సులభమైన డిజిటల్ వ్యవసాయ సహాయకుడు.'
      : language === 'hi'
      ? 'फसल की खेती से लेकर मंडी भाव और सरकारी योजनाओं तक — हर किसान का भरोसेमंद, सरल डिजिटल कृषि साथी।'
      : 'From crop stages to mandi prices and government welfare schemes — your trusted, farmer-first assistant for informed decisions.';

  const exploreLabel =
    language === 'te'
      ? '🌱 అగ్రిమిత్రను అన్వేషించండి'
      : language === 'hi'
      ? '🌱 एग्रीमित्र देखें'
      : '🌱 Explore AgriMitra';

  const listenLabel = isSpeaking
    ? language === 'te' ? '⏹ ఆపు' : language === 'hi' ? '⏹ रुकें' : '⏹ Stop'
    : language === 'te' ? '🔊 వినండి' : language === 'hi' ? '🔊 सुनें' : '🔊 Listen';

  return (
    <div className="welcome-container">
      {/* ─── Top Bar: Logo, Language, Theme ─── */}
      <header className="welcome-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#1B5E3B" />
            <path d="M16 46c10-20 22-26 32-28-4 14-10 26-24 32-3-4-8-4-8-4z" fill="#F4C430" />
            <path d="M20 44c6-12 14-18 22-22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <circle cx="44" cy="22" r="6" fill="#F4C430" opacity="0.9" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            AgriMitra
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Language Selector */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              background: 'var(--surface-2)',
              borderRadius: '999px',
              padding: '3px',
              border: '1px solid var(--border)',
            }}
            role="group"
            aria-label="Select language"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: language === l.code ? 700 : 500,
                  fontSize: '0.86rem',
                  background: language === l.code ? 'var(--primary)' : 'transparent',
                  color: language === l.code ? 'var(--text-on-primary)' : 'var(--text)',
                  transition: 'all var(--transition)',
                  minHeight: '34px',
                }}
                aria-pressed={language === l.code}
              >
                {l.native}
              </button>
            ))}
          </div>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main
        id="main"
        className="welcome-main"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* ─── 1. Hero Section: 2 Columns on Desktop ─── */}
        <section className="welcome-hero">
          {/* Left: Text & Actions */}
          <div>
            <div className="welcome-badge">
              🌾 {language === 'te' ? 'స్మార్ట్ వ్యవసాయ సహాయకుడు' : language === 'hi' ? 'स्मार्ट कृषि सहायक' : 'Smart Farming Assistant'}
            </div>

            <h1 className="welcome-title">{headingText}</h1>

            <p className="welcome-lead">{subLeadText}</p>

            <div className="welcome-cta-group">
              <button
                type="button"
                onClick={handleExplore}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: '#1B5E3B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  cursor: 'pointer',
                  minHeight: '48px',
                  boxShadow: '0 4px 14px rgba(27, 94, 59, 0.35)',
                  transition: 'background var(--transition), transform 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#155130';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1B5E3B';
                  e.currentTarget.style.transform = '';
                }}
              >
                {exploreLabel}
              </button>

              <button
                type="button"
                onClick={handleListenIntro}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 22px',
                  background: isSpeaking ? 'var(--danger-subtle, #ffebee)' : 'var(--surface)',
                  color: isSpeaking ? 'var(--danger, #c62828)' : 'var(--text)',
                  border: isSpeaking ? '2px solid var(--danger, #c62828)' : '2px solid var(--border)',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  minHeight: '48px',
                  transition: 'all var(--transition)',
                }}
                onMouseEnter={(e) => {
                  if (!isSpeaking) e.currentTarget.style.borderColor = '#1B5E3B';
                }}
                onMouseLeave={(e) => {
                  if (!isSpeaking) e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {listenLabel}
              </button>
            </div>

            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🔒 {language === 'te' ? 'పూర్తిగా ప్రైవేట్ · మీ ఫోన్‌లోనే రికార్డులు భద్రం' : language === 'hi' ? '100% निजी · आपका डेटा आपके फोन में सुरक्षित' : 'Device-First Privacy · Records stay on your phone'}
            </p>
          </div>

          {/* Right: High-Quality Realistic Farmer + Paddy Image */}
          <div className="welcome-hero-image-card">
            <img
              src={farmerHeroImg}
              alt={
                language === 'te'
                  ? 'పచ్చని వరి చేనులో ధాన్యపు వెన్నులు చేతబట్టిన భారతీయ రైతు'
                  : language === 'hi'
                  ? 'हरे-भरे धान के खेत में नई फसल की बालियां पकड़े हुए भारतीय किसान'
                  : 'Indian farmer standing in a healthy paddy field holding fresh rice stalks'
              }
              className="welcome-hero-img"
              loading="eager"
              width="800"
              height="550"
            />
            <div className="welcome-image-tag">
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#6AA84F',
                  display: 'inline-block',
                }}
                aria-hidden
              />
              <span>
                🌾 {language === 'te' ? 'రైతు నేస్తం · వరి పంట' : language === 'hi' ? 'अन्नदाता · धान की फसल' : 'Real Indian Farmer · Kharif Paddy'}
              </span>
            </div>
          </div>
        </section>

        {/* ─── 2. Feature Cards Grid ─── */}
        <section style={{ marginBottom: '56px' }}>
          <div className="welcome-section-header">
            <h2 className="welcome-section-title">
              {language === 'te' ? 'రైతుకు అవసరమైన సమగ్ర సేవలు' : language === 'hi' ? 'किसानों के लिए आवश्यक प्रमुख सुविधाएं' : 'Everything You Need for Profitable Farming'}
            </h2>
            <p className="welcome-section-sub">
              {language === 'te'
                ? 'పంట సాగు సమాచారం, మార్కెట్ ధరలు, సబ్సిడీలు మరియు పొలం ప్రణాళిక — అన్నీ ఒకే చోట.'
                : language === 'hi'
                ? 'फसल की सलाह, मंडी भाव, सरकारी सब्सिडी और खेत की डायरी — सब कुछ एक ही स्थान पर।'
                : 'Agronomic guidance, real mandi prices, welfare subsidies, and farm management.'}
            </p>
          </div>

          <div className="welcome-features-grid">
            {features.map((f, i) => (
              <div key={i} className="welcome-feature-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div className="welcome-feature-icon">{f.icon}</div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                      padding: '3px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="welcome-feature-title">{f.title}</h3>
                <p className="welcome-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 3. Farmer Trust Section ─── */}
        <section className="welcome-trust-section">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--text)' }}>
              {language === 'te'
                ? 'రైతుల పని విధానానికి అనుగుణంగా రూపొందించబడింది'
                : language === 'hi'
                ? 'किसानों की कार्यशैली के अनुरूप निर्मित'
                : 'Built for the Way Indian Farmers Work'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              {language === 'te'
                ? 'క్లిష్టమైన నమోదులు లేదా ఇంటర్నెట్ ఆధారిత ఇబ్బందులు లేకుండా సులభంగా వాడవచ్చు.'
                : language === 'hi'
                ? 'बिना जटिल फॉर्म या इंटरनेट की बाध्यता के, सहज एवं सुरक्षित उपयोग।'
                : 'No mandatory logins or complex setup. Simple, resilient, and built for the field.'}
            </p>
          </div>

          <div className="welcome-trust-grid">
            {trustPoints.map((tp, idx) => (
              <div key={idx} className="welcome-trust-item">
                <div className="welcome-trust-icon">{tp.icon}</div>
                <div>
                  <h3 className="welcome-trust-heading">{tp.title}</h3>
                  <p className="welcome-trust-desc">{tp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. Farm Journey Visual (Workflow) ─── */}
        <section className="welcome-journey-section">
          <div className="welcome-section-header">
            <h2 className="welcome-section-title">
              {language === 'te' ? 'అగ్రిమిత్ర వ్యవసాయ ప్రయాణం' : language === 'hi' ? 'एग्रीमित्र कृषि यात्रा' : 'The AgriMitra Farming Workflow'}
            </h2>
            <p className="welcome-section-sub">
              {language === 'te'
                ? 'సాగు మొదలు నుండి మార్కెట్ అమ్మకాల వరకు 5 స్పష్టమైన దశలలో మీ ప్రయాణం.'
                : language === 'hi'
                ? 'बुआई से लेकर बाजार में बिक्री तक — 5 स्पष्ट चरणों में आपकी कृषि यात्रा।'
                : 'A simple 5-step cycle to guide your season from planning to successful harvest.'}
            </p>
          </div>

          <div className="welcome-journey-track">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="welcome-journey-card">
                <span className="welcome-journey-num">STEP {step.step}</span>
                <div className="welcome-journey-icon">{step.icon}</div>
                <div className="welcome-journey-label">{step.label}</div>
                <p className="welcome-journey-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Final Bottom Action ─── */}
        <div style={{ textAlign: 'center', marginTop: '24px', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={handleExplore}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              background: '#1B5E3B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '14px',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.15rem',
              cursor: 'pointer',
              minHeight: '52px',
              boxShadow: '0 6px 18px rgba(27, 94, 59, 0.35)',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#155130';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1B5E3B';
              e.currentTarget.style.transform = '';
            }}
          >
            {exploreLabel} →
          </button>
        </div>
      </main>

      {/* ─── Gentle Agricultural Footer Accent ─── */}
      <footer
        style={{
          padding: '20px 24px',
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}
      >
        🌾 AgriMitra · {language === 'te' ? 'భారతీయ రైతుల కోసం రూపొందించబడిన డిజిటల్ సహాయకుడు' : language === 'hi' ? 'भारतीय किसानों के लिए समर्पित डिजिटल कृषि साथी' : 'Empowering Indian Farmers with Smart, Private Agriculture'}
      </footer>
    </div>
  );
}
