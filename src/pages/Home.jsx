import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import SplitText from '../components/SplitText.jsx';
import farmerHeroImg from '../assets/farmer-hero-paddy.jpg';
import Button from '../components/Button.jsx';
import StatCard from '../components/StatCard.jsx';
import Badge from '../components/Badge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EasyModeBanner from '../components/EasyModeBanner.jsx';
import { useAppData } from '../context/AppDataContext.jsx';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant.js';
import { CROPS, getCropById, getCropName } from '../data/crops.js';
import { getLocalizedWeather } from '../data/weather.js';
import { getSeasonalTips } from '../data/farmingTips.js';
import { getLocalizedSeasons, getCurrentSeason, getLocalizedSeasonName, getSeasonTintClass } from '../utils/season.js';
import { formatINR, formatDate } from '../utils/format.js';
import { buildRecommendations } from '../utils/recommendations.js';

export default function Home() {
  const { openProfile } = useOutletContext();
  const data = useAppData();
  const {
    profile,
    selectedCropId,
    setSelectedCropId,
    tasks,
    calculations,
    soilRecords,
    irrigationRecords,
    savedSchemes,
    activity,
    heroMotion,
    setHeroMotion,
    district,
    setProfile,
    logActivity,
    language,
    easyMode,
    t,
    importRecords,
  } = data;

  const { speak, isSpeaking, stopSpeaking } = useVoiceAssistant({ language });

  useEffect(() => {
    document.title =
      language === 'te'
        ? 'అగ్రిమిత్ర — రైతు స్మార్ట్ వ్యవసాయ సహాయకుడు'
        : language === 'hi'
        ? 'एग्रीमित्र — किसान स्मार्ट कृषि सहायक'
        : 'AgriMitra — Smart Farming Assistant for Indian Farmers';
  }, [language]);

  const crop = getCropById(selectedCropId || profile.mainCropId);
  const cropName = crop ? getCropName(crop, language) : '';
  const season = getCurrentSeason();
  const localizedSeasonName = getLocalizedSeasonName(season, language);
  const seasonsList = getLocalizedSeasons(language);
  const weather = getLocalizedWeather(district, language);

  const pending = tasks.filter((t) => t.status !== 'completed');
  const completed = tasks.filter((t) => t.status === 'completed');
  const expenses = calculations.reduce((sum, c) => sum + (c.totalCost || 0), 0);
  const profit = calculations.reduce((sum, c) => sum + (c.profitLoss || 0), 0);
  const upcoming = [...pending].sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || '')).slice(0, 5);
  const recs = buildRecommendations({
    profile,
    selectedCropId: crop?.id,
    tasks,
    soilRecords,
    irrigationRecords,
    district,
    language,
  });

  function downloadJson() {
    const blob = new Blob([JSON.stringify(data.exportRecords(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agrimitra-records-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadCsv() {
    const lines = [
      'AgriMitra Farmer Records Summary',
      `Exported on: ${new Date().toLocaleString('en-IN')}`,
      '',
      '--- PROFILE ---',
      `Name,${profile.name || 'Not set'}`,
      `State,${profile.state || 'Not set'}`,
      `Village,${profile.village || 'Not set'}`,
      `Farm Area,${profile.farmArea || '0'} ${profile.areaUnit || 'acres'}`,
      `Current Crop,${cropName || 'Not selected'}`,
      '',
      '--- TASKS ---',
      'Task Name,Crop,Due Date,Priority,Status',
      ...tasks.map(
        (t) => `"${t.name || ''}","${t.crop || ''}","${t.dueDate || ''}","${t.priority || ''}","${t.status || ''}"`
      ),
      '',
      '--- SAVED CALCULATIONS ---',
      'Crop,Land Area,Total Cost (INR),Gross Revenue (INR),Net Profit/Loss (INR)',
      ...calculations.map(
        (c) => `"${c.cropName || ''}","${c.landArea || ''} ${c.areaUnit || ''}",${c.totalCost || 0},${c.grossRevenue || 0},${c.profitLoss || 0}`
      ),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agrimitra-summary-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function restoreBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target.result);
          const confirmMsg =
            language === 'te'
              ? 'ఈ బ్యాకప్ నుండి మీ డేటాను పునరుద్ధరించాలా? ప్రస్తుత డేటా పాక్షికంగా భర్తీ అవుతుంది.'
              : language === 'hi'
              ? 'इस बैकअप से आपका डेटा पुनर्स्थापित करें? मौजूदा डेटा आंशिक रूप से बदला जाएगा।'
              : 'Restore data from this backup file? Existing data will be partially replaced.';
          if (!window.confirm(confirmMsg)) return;
          const result = importRecords(json);
          if (result.ok) {
            logActivity('Restored data from backup file');
            toast(
              language === 'te'
                ? 'బ్యాకప్ నుండి డేటా విజయవంతంగా పునరుద్ధరించబడింది.'
                : language === 'hi'
                ? 'बैकअप से डेटा सफलतापूर्वक पुनर्स्थापित किया गया।'
                : 'Data restored from backup successfully.',
              'success'
            );
          } else {
            toast(
              language === 'te'
                ? `పునరుద్ధరణ విఫలమైంది: ${result.error}`
                : language === 'hi'
                ? `पुनर्स्थापना विफल: ${result.error}`
                : `Restore failed: ${result.error}`,
              'error'
            );
          }
        } catch {
          toast(
            language === 'te'
              ? 'జేఎస్‌ఓఎన్ ఫైల్ చదవలేకపోయాం. దయచేసి సరైన AgriMitra బ్యాకప్ ఫైల్‌ను ఎంచుకోండి.'
              : language === 'hi'
              ? 'JSON फ़ाइल पढ़ नहीं सका। कृपया सही AgriMitra बैकअप फ़ाइल चुनें।'
              : 'Could not read JSON file. Please select a valid AgriMitra backup file.',
            'error'
          );
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function handleQuickCropChange(cropId) {
    setSelectedCropId(cropId);
    setProfile((prev) => ({ ...prev, mainCropId: cropId }));
    const found = getCropById(cropId);
    if (found) {
      logActivity(`Changed active crop to ${getCropName(found, 'en')}`);
    }
  }

  function speakHomeSummary() {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const currentCropLabel = cropName || (language === 'te' ? 'పంట ఇంకా ఎంచుకోలేదు' : language === 'hi' ? 'फसल नहीं चुनी गई' : 'No crop selected');
    const msg =
      language === 'te'
        ? `నమస్తే ${profile.name || 'రైతు మిత్రా'}. మీ ప్రధాన పంట: ${currentCropLabel}. ఈ రోజు ${district} లో ఉష్ణోగ్రత ${weather.temperature} డిగ్రీలు మరియు ${weather.condition}. మీకు ${pending.length} పనులు మిగిలి ఉన్నాయి మరియు అంచనా నికర లాభం ${formatINR(Math.round(profit))}.`
        : language === 'hi'
        ? `नमस्ते ${profile.name || 'किसान साथी'}। आपकी मुख्य फसल: ${currentCropLabel} है। आज ${district} में तापमान ${weather.temperature} डिग्री और मौसम ${weather.condition} है। आपके पास ${pending.length} बाकी काम हैं और अनुमानित मुनाफा ${formatINR(Math.round(profit))} है।`
        : `Welcome ${profile.name || 'Kisan Mitra'}. Your active crop is ${currentCropLabel}. Today in ${district}, the temperature is ${weather.temperature} degrees Celsius with ${weather.condition}. You have ${pending.length} pending tasks and projected net profit of ${formatINR(Math.round(profit))}.`;
    speak(msg);
  }

  const easySteps = [
    {
      icon: '🌦️',
      label: language === 'te' ? '1. వాతావరణం & పనులు' : language === 'hi' ? '1. मौसम और काम' : '1. Weather & Tasks',
      desc: language === 'te' ? `${weather.temperature}°C · ${pending.length} పనులు మిగిలి ఉన్నాయి` : language === 'hi' ? `${weather.temperature}°C · ${pending.length} काम बाकी` : `${weather.temperature}°C · ${pending.length} tasks pending`,
    },
    {
      icon: '🌾',
      label: language === 'te' ? '2. పంటల గైడ్' : language === 'hi' ? '2. फसल सलाह' : '2. Crop Guide',
      desc: cropName || (language === 'te' ? 'పంటను ఎంచుకోండి' : language === 'hi' ? 'फसल चुनें' : 'Choose crop'),
    },
    {
      icon: '💰',
      label: language === 'te' ? '3. లాభం గణన' : language === 'hi' ? '3. मुनाफा हिसाब' : '3. Profit Check',
      desc: profit >= 0 ? `+${formatINR(Math.round(profit))}` : formatINR(Math.round(profit)),
    },
  ];

  return (
    <div className="home-dashboard">
      {/* Easy Mode Banner if active */}
      <EasyModeBanner
        title={t('easyModeView.badge')}
        speakText={
          language === 'te'
            ? `రైతు సులభ మోడ్ ఆన్‌లో ఉంది. మీకు సహాయంగా పెద్ద బటన్లు మరియు వాయిస్ సూచనలు ఉన్నాయి. మీ ప్రస్తుత పంట ${cropName || 'ఎంచుకోలేదు'}.`
            : language === 'hi'
            ? `किसान सरल मोड चालू है। बड़े बटन और आवाज की सहायता उपलब्ध है। आपकी मुख्य फसल ${cropName || 'नहीं चुनी गई'} है।`
            : `Farmer Easy Mode is active. Large buttons and voice narration are ready. Your active crop is ${cropName || 'not selected'}.`
        }
        steps={easySteps}
      />

      <section className={`hero ${getSeasonTintClass(season)}`}>
        <div className="hero-bg" aria-hidden />
        <div className="hero-grid">
          <div>
            <p className="hand-label">{t('home.greeting')} · {localizedSeasonName}</p>
            <SplitText
              text={
                profile.name
                  ? `${t('home.welcomeBack')}, ${profile.name}`
                  : t('home.welcome')
              }
            />
            <p className="hero-lead">{t('slogan')}</p>

            <div className="row" style={{ marginTop: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.65rem' }}>
              <Button onClick={openProfile}>{t('home.editProfile')}</Button>
              <Link className="btn btn-secondary" to="/crops">
                {t('home.browseCrops')}
              </Link>
              <Link className="btn btn-secondary" to="/crops?tab=timeline">
                🌱 {language === 'te' ? 'ఎదుగుదల కాలక్రమం' : language === 'hi' ? 'विकास रोडमैप' : 'Growth Timeline'}
              </Link>
              <Link className="btn btn-secondary" to="/market">
                {t('home.calcProfit')}
              </Link>
              <Button
                variant={isSpeaking ? 'danger' : 'secondary'}
                onClick={speakHomeSummary}
                title="Listen to farm voice summary"
              >
                {isSpeaking ? '⏹ ' + t('common.stopReading') : '🔊 ' + t('common.readAloud')}
              </Button>
            </div>

            <div className="hero-controls">
              <label className="checkbox" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={heroMotion}
                  onChange={(e) => setHeroMotion(e.target.checked)}
                />
                <span>{t('home.animateScenery')}</span>
              </label>
            </div>
          </div>
          <div className={`hero-visual-card ${heroMotion ? 'with-motion' : ''}`}>
            <div className="hero-image-container">
              <img
                src={farmerHeroImg}
                alt={
                  language === 'te'
                    ? 'వరి చేనులో ధాన్యపు వెన్నులు చేతబట్టిన భారతీయ రైతు'
                    : language === 'hi'
                    ? 'धान के खेत में नई फसल की बालियां पकड़े हुए भारतीय किसान'
                    : 'Indian farmer standing in a healthy paddy field holding freshly harvested rice stalks'
                }
                className="hero-farmer-image"
                loading="eager"
                fetchPriority="high"
                width="800"
                height="500"
              />
              <div className="hero-image-overlay" aria-hidden />
              <div className="hero-image-tag">
                <span className="hero-tag-dot" aria-hidden />
                <span className="hero-tag-text">
                  🌾 {language === 'te' ? 'రైతు నేస్తం · వరి సాగు' : language === 'hi' ? 'अन्नदाता · धान की फसल' : 'Real Farming · Kharif Paddy'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="furrow" aria-hidden />

      {/* Overview & Weather Grid */}
      <div className="grid-2">
        <article className="card paper-card">
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="hand-label">{language === 'te' ? 'రైతు డైరీ' : language === 'hi' ? 'किसान डायरी' : "Farmer's Notebook"}</p>
            <Badge tone="info">{language === 'te' ? 'ఆఫ్‌లైన్ రికార్డు' : language === 'hi' ? 'ऑफ़लाइन तैयार' : 'Offline ready'}</Badge>
          </div>
          <h2>{t('home.overviewTitle')}</h2>

          {profile.name ? (
            <div style={{ marginTop: '0.75rem' }}>
              <p>
                <strong>{profile.name}</strong> · {profile.village || t('home.notSet')} · {profile.state || t('home.notSet')}
              </p>
              <p>
                {t('home.landHolding')}{' '}
                <strong>
                  {profile.farmArea || '—'} {profile.areaUnit || t('common.acres')}
                </strong>
              </p>
              <div className="row" style={{ marginTop: '0.75rem', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <label htmlFor="quick-crop-select" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  {t('home.activeCropLabel')}
                </label>
                <select
                  id="quick-crop-select"
                  className="input"
                  style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.95rem', fontWeight: 600 }}
                  value={crop ? crop.id : ''}
                  onChange={(e) => handleQuickCropChange(e.target.value)}
                >
                  <option value="">{t('home.chooseCrop')}</option>
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {getCropName(c, language)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <EmptyState
              title={t('home.noProfileTitle')}
              text={t('home.noProfileDesc')}
              actionLabel={t('home.createProfile')}
              onAction={openProfile}
            />
          )}
        </article>

        <article className="card">
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{t('home.weatherTitle')}</h2>
            <Badge tone={weather.rainfall > 0 ? 'high' : 'medium'}>
              {weather.condition}
            </Badge>
          </div>
          <p className="notice info" style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>
            {district} — {t('home.weatherNote')}
          </p>
          <div className="row" style={{ alignItems: 'baseline', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              {weather.temperature}°C
            </span>
            <span className="muted" style={{ fontSize: '0.95rem' }}>
              {t('home.humidity')}: {weather.humidity}% · {t('home.rain')}: {weather.rainfall} mm
            </span>
          </div>
          <div className="row" style={{ marginTop: '1rem', gap: '0.5rem' }}>
            <Link className="btn btn-secondary btn-sm" to="/planner">
              {t('home.openWeather')}
            </Link>
          </div>
        </article>
      </div>

      {/* Season Calendar */}
      <div className="section-title">
        <div>
          <h2>{t('home.seasonCalendar')}</h2>
          <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            {t('home.seasonCalendarSub')}
          </p>
        </div>
        <Badge tone="high">{localizedSeasonName} {t('home.nowActive')}</Badge>
      </div>

      <div className="calendar-strip">
        {seasonsList.map((item) => {
          const isCurrent = item.id === season;
          return (
            <div key={item.id} className={`calendar-item ${isCurrent ? 'current' : ''}`}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.1rem' }}>{item.name}</strong>
                {isCurrent && <Badge tone="high">{language === 'te' ? 'ప్రస్తుతం' : language === 'hi' ? 'अब' : 'Now'}</Badge>}
              </div>
              <p className="muted" style={{ margin: '0.35rem 0', fontWeight: 600 }}>{item.months}</p>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{item.note}</p>
            </div>
          );
        })}
      </div>

      {/* Stat Highlights */}
      <div className="grid-4" style={{ marginTop: '1.5rem' }}>
        <StatCard
          label={t('home.activeCropStat')}
          value={crop ? 1 : 0}
          note={crop ? `${cropName}` : (language === 'te' ? 'గైడ్ నుండి ఎంచుకోండి' : language === 'hi' ? 'गाइड से चुनें' : 'Choose from guide')}
          tone="info"
        />
        <StatCard
          label={t('home.pendingTasksStat')}
          value={pending.length}
          note={`${completed.length} ${t('common.completed')}`}
          tone={pending.length > 3 ? 'warn' : 'default'}
        />
        <StatCard
          label={t('home.loggedExpensesStat')}
          value={Math.round(expenses)}
          prefix="₹"
          note={language === 'te' ? 'నమోదైన ఖర్చుల మొత్తం' : language === 'hi' ? 'दर्ज खर्च' : 'From saved calculations'}
          tone="default"
        />
        <StatCard
          label={t('home.estimatedProfitStat')}
          value={Math.round(profit)}
          prefix="₹"
          note={language === 'te' ? 'అంచనా నికర రాబడి' : language === 'hi' ? 'अनुमानित मुनाफा' : 'Sum of profit scenarios'}
          tone={profit >= 0 ? 'success' : 'warn'}
        />
      </div>

      {/* Seasonal Reminders with Read Aloud */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{t('home.seasonalReminders')} ({localizedSeasonName})</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const tips = getSeasonalTips(new Date(), language).join('. ');
              speak(tips);
            }}
          >
            🔊 {t('common.readAloud')}
          </Button>
        </div>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
          {getSeasonalTips(new Date(), language).map((tip, idx) => (
            <li key={idx} style={{ marginBottom: '0.4rem' }}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Upcoming Tasks & Recent Activity */}
      <div className="grid-2" style={{ marginTop: '1.5rem' }}>
        <article className="card">
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{t('home.upcomingActivities')}</h2>
            <Link to="/planner" className="muted" style={{ fontSize: '0.85rem' }}>
              {t('home.goToPlanner')}
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <EmptyState title={t('common.pending')} text={t('home.noPendingTasks')} />
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0' }}>
              {upcoming.map((tItem) => (
                <li
                  key={tItem.id}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <div>
                    <strong>{tItem.name}</strong>
                    <div className="muted" style={{ fontSize: '0.85rem' }}>
                      {tItem.crop ? `${tItem.crop} · ` : ''}{t('common.due')}: {formatDate(tItem.dueDate)}
                    </div>
                  </div>
                  <Badge tone={tItem.priority === 'High' || tItem.priority === 'అత్యవసరం' ? 'high' : tItem.priority === 'Low' || tItem.priority === 'తక్కువ' ? 'low' : 'medium'}>
                    {tItem.priority}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="card">
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{t('home.recentActivity')}</h2>
            <span className="muted" style={{ fontSize: '0.85rem' }}>{language === 'te' ? 'స్థానిక పరికర డైరీ' : language === 'hi' ? 'स्थानीय डायरी' : 'Local device log'}</span>
          </div>
          {activity.length === 0 ? (
            <EmptyState title={language === 'te' ? 'ఇంకా ఏమీ నమోదు కాలేదు' : language === 'hi' ? 'अभी कोई गतिविधि नहीं है' : 'Nothing logged yet'} text={t('home.noActivity')} />
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0' }}>
              {activity.slice(0, 6).map((a) => (
                <li
                  key={a.id}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  <span>{a.message}</span>
                  <span className="muted" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {formatDate(a.at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>

      <div className="furrow" />

      {/* Personalized Recommendations */}
      <article className="card">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="hand-label">{language === 'te' ? 'నియమ ఆధారిత రైతు సూచనలు' : language === 'hi' ? 'कृषि निर्णय सहायता' : 'Rule-based decision support'}</p>
            <h2>{t('home.recommendationsTitle')}</h2>
          </div>
          <Badge tone="info">{language === 'te' ? 'స్మార్ట్ సలహాలు' : language === 'hi' ? 'स्मार्ट सलाह' : 'Smart rules'}</Badge>
        </div>
        <p className="muted" style={{ margin: '0.25rem 0 1rem' }}>
          {t('home.recommendationsSub')}
        </p>
        <div className="grid-2">
          {recs.map((r) => (
            <div key={r.id} className="card" style={{ boxShadow: 'none', border: '1px solid var(--border)' }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{r.title}</h3>
                <Badge tone={r.priority.toLowerCase() === 'high' || r.priority === 'అత్యవసరం' ? 'high' : 'medium'}>{r.priority}</Badge>
              </div>
              <p style={{ margin: '0.75rem 0' }}>{r.explanation}</p>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Link className="btn btn-secondary btn-sm" to={r.to}>
                  {r.action} →
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => speak(`${r.title}. ${r.explanation}`)}
                >
                  🔊 {t('common.readAloud')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Records Summary */}
      <article className="card paper-card" style={{ marginTop: '1.5rem' }} id="records-summary">
        <p className="hand-label">{language === 'te' ? 'నా రికార్డుల సారాంశం' : language === 'hi' ? 'मेरे रिकॉर्ड' : 'My records summary'}</p>
        <h2>{t('home.recordsSummaryTitle')}</h2>
        <p className="notice info">
          {t('home.recordsSummaryNotice')}
        </p>

        <div className="grid-3" style={{ margin: '1rem 0' }}>
          <div className="card" style={{ padding: '0.75rem' }}>
            <strong>{t('home.profileAndLand')}</strong>
            <p className="muted" style={{ margin: '0.25rem 0 0' }}>
              {profile.name ? `${profile.name} (${profile.farmArea || 0} ${profile.areaUnit || t('common.acres')})` : t('home.notSet')}
            </p>
          </div>
          <div className="card" style={{ padding: '0.75rem' }}>
            <strong>{t('home.cropAndSeason')}</strong>
            <p className="muted" style={{ margin: '0.25rem 0 0' }}>
              {cropName || (language === 'te' ? 'పంట ఎంచుకోలేదు' : 'No active crop')} ({localizedSeasonName})
            </p>
          </div>
          <div className="card" style={{ padding: '0.75rem' }}>
            <strong>{t('home.taskManager')}</strong>
            <p className="muted" style={{ margin: '0.25rem 0 0' }}>
              {completed.length} {t('common.completed')} / {pending.length} {t('common.pending')}
            </p>
          </div>
          <div className="card" style={{ padding: '0.75rem' }}>
            <strong>{t('home.calculationsCard')}</strong>
            <p className="muted" style={{ margin: '0.25rem 0 0' }}>
              {calculations.length} {language === 'te' ? 'బడ్జెట్ లెక్కలు సేవ్ అయ్యాయి' : language === 'hi' ? 'बजट गणनाएं' : 'budget scenario(s) saved'}
            </p>
          </div>
          <div className="card" style={{ padding: '0.75rem' }}>
            <strong>{t('home.fieldLogsCard')}</strong>
            <p className="muted" style={{ margin: '0.25rem 0 0' }}>
              {soilRecords.length} {language === 'te' ? 'మట్టి పరీక్షలు' : 'soil tests'} · {irrigationRecords.length} {language === 'te' ? 'నీటి తడులు' : 'irrigation logs'}
            </p>
          </div>
          <div className="card" style={{ padding: '0.75rem' }}>
            <strong>{t('home.schemesCard')}</strong>
            <p className="muted" style={{ margin: '0.25rem 0 0' }}>
              {savedSchemes.length} {language === 'te' ? 'బుక్‌మార్క్ చేసిన పథకాలు' : 'saved bookmarks'}
            </p>
          </div>
        </div>

        <div className="row no-print" style={{ gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Button onClick={downloadJson}>{t('common.exportJson')}</Button>
          <Button variant="secondary" onClick={downloadCsv}>{t('common.exportCsv')}</Button>
          <Button variant="secondary" onClick={restoreBackup}>
            📂 {language === 'te' ? 'బ్యాకప్ పునరుద్ధరించండి' : language === 'hi' ? 'बैकअप पुनर्स्थापित करें' : 'Restore Backup'}
          </Button>
          <Button variant="secondary" onClick={() => window.print()}>
            {t('common.print')}
          </Button>
          <Button variant="ghost" onClick={speakHomeSummary}>
            🔊 {t('common.readAloud')}
          </Button>
        </div>
      </article>
    </div>
  );
}
