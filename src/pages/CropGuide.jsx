import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CropCard from '../components/CropCard.jsx';
import FormField from '../components/FormField.jsx';
import Modal from '../components/Modal.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Badge from '../components/Badge.jsx';
import EasyModeBanner from '../components/EasyModeBanner.jsx';
import CropGrowthTimeline from '../components/CropGrowthTimeline.jsx';
import CheckMyCrop from '../components/CheckMyCrop.jsx';
import {
  CROPS,
  CROP_CATEGORIES,
  CROP_SEASONS,
  CATEGORY_LABELS,
  SEASON_LABELS,
  getCropById,
  getCropName,
  getCropText,
  getCropImageAlt,
  getCropGrowthStages,
  getCropSymptoms,
} from '../data/crops.js';
import { useAppData } from '../context/AppDataContext.jsx';
import { useToast } from '../components/Toast.jsx';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant.js';
import DataStatusBadge from '../components/DataStatusBadge.jsx';
import { uid } from '../utils/format.js';

export default function CropGuide() {
  const {
    selectedCropId,
    setSelectedCropId,
    setProfile,
    logActivity,
    growthStage,
    setGrowthStage,
    cropJourney,
    setCropJourney,
    photoJournal,
    addPhotoJournalEntry,
    setTasks,
    language,
    easyMode,
    t,
  } = useAppData();

  const toast = useToast();
  const [searchParams] = useSearchParams();
  const initialTab = ['timeline', 'check', 'library'].includes(searchParams.get('tab'))
    ? searchParams.get('tab')
    : 'library';
  const [tab, setTab] = useState(initialTab); // 'library' | 'timeline' | 'check'
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [season, setSeason] = useState('All');
  const [openId, setOpenId] = useState(null);

  const { speak, isSpeaking, stopSpeaking } = useVoiceAssistant({ language });

  useEffect(() => {
    document.title =
      language === 'te'
        ? 'పంటల ఆరోగ్యం మరియు సాగు మార్గదర్శి — అగ్రిమిత్ర'
        : language === 'hi'
        ? 'फसल स्वास्थ्य और कृषि गाइड — एग्रीमित्र'
        : 'Crop Health & Farming Guide — AgriMitra';
  }, [language]);

  const list = useMemo(() => {
    return CROPS.filter((c) => {
      const nameEn = c.names?.en || '';
      const nameTe = c.names?.te || '';
      const nameHi = c.names?.hi || '';
      const shortText = typeof c.short === 'object' ? (c.short[language] || c.short.en || '') : (c.short || '');
      const catLabel = CATEGORY_LABELS[language]?.[c.category] || c.category;
      const text = `${nameEn} ${nameTe} ${nameHi} ${shortText} ${c.category} ${catLabel}`.toLowerCase();
      const matchQ = text.includes(q.trim().toLowerCase());
      const matchCat = category === 'All' || c.category === category;
      const matchSeason = season === 'All' || c.seasons.includes(season);
      return matchQ && matchCat && matchSeason;
    });
  }, [q, category, season, language]);

  const detail = getCropById(openId);

  // Localized detail values
  const detailName = detail ? getCropName(detail, language) : '';
  const detailNameAlt = detail
    ? language === 'te' ? (detail.names?.hi || '') : (detail.names?.te || '')
    : '';
  const detailDescription = detail ? getCropText(detail, 'description', language) : '';
  const detailSeedTips = detail ? getCropText(detail, 'seedTips', language) : '';
  const detailCultivation = detail ? getCropText(detail, 'cultivation', language) : '';
  const detailIrrigation = detail ? getCropText(detail, 'irrigation', language) : '';
  const detailFertilizer = detail ? getCropText(detail, 'fertilizer', language) : '';
  const detailPreventive = detail ? getCropText(detail, 'preventive', language) : '';
  const detailGrowthStages = detail ? getCropGrowthStages(detail, language) : [];
  const detailSymptoms = detail ? getCropSymptoms(detail, language) : [];

  function saveCrop(crop) {
    const name = getCropName(crop, language);
    setSelectedCropId(crop.id);
    setProfile((prev) => ({ ...prev, mainCropId: crop.id }));
    setCropJourney((prev) => ({
      ...prev,
      cropId: crop.id,
    }));
    logActivity(`Saved ${getCropName(crop, 'en')} as my crop`);
    const successMsg =
      language === 'te'
        ? `${name} మీ ప్రధాన పంటగా భద్రపరచబడింది.`
        : language === 'hi'
        ? `${name} आपकी मुख्य फसल के रूप में सुरक्षित की गई।`
        : `${name} saved as your primary farm crop.`;
    toast(successMsg, 'success');
  }

  function handlePrintCropSheet() {
    window.print();
  }

  function speakCropDetail(crop) {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const name = getCropName(crop, language);
    const desc = getCropText(crop, 'description', language);
    const seed = getCropText(crop, 'seedTips', language);
    const irri = getCropText(crop, 'irrigation', language);
    const text = `${name}. ${desc}. ${language === 'te' ? 'విత్తన సలహా' : language === 'hi' ? 'बीज सलाह' : 'Seed guidance'}: ${seed}. ${language === 'te' ? 'నీటి సలహా' : language === 'hi' ? 'సిंचाई सलाह' : 'Water tip'}: ${irri}.`;
    speak(text);
  }

  // Switch to timeline tab with a specific crop
  function handleSwitchToTimeline(targetCropId) {
    setCropJourney((prev) => ({
      ...prev,
      cropId: targetCropId,
    }));
    setOpenId(null);
    setTab('timeline');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Schedule rule-based reminder into Farm Planner
  function handleAddPlannerReminder(reminder) {
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + 7);
    const dateStr = reminderDate.toISOString().slice(0, 10);

    const newTask = {
      id: uid('task'),
      name: reminder.name,
      crop: reminder.crop,
      dueDate: dateStr,
      priority: 'Medium',
      notes: `${reminder.notes} · [${language === 'te' ? 'నియమ ఆధారిత రిమైండర్' : language === 'hi' ? 'नियम-आधारित रिमाइंडर' : 'Rule-based reminder'}]`,
      status: 'pending',
    };

    setTasks((prev) => [newTask, ...prev]);
    logActivity(`Added rule-based stage reminder for ${reminder.crop}`);
    toast(
      language === 'te'
        ? 'క్యాలెండర్‌లో స్టేజ్ రిమైండర్ జోడించబడింది!'
        : language === 'hi'
        ? 'प्लानर में रिमाइंडर जोड़ा गया!'
        : 'Rule-based reminder added to Farm Planner!',
      'success'
    );
  }

  const easySteps = [
    {
      icon: '🌾',
      label: language === 'te' ? '1. పంటను ఎంచుకోండి' : language === 'hi' ? '1. अपनी फसल चुनें' : '1. Select Your Crop',
      desc: language === 'te' ? 'వరి, పత్తి, మిరప, మొక్కజొన్న' : language === 'hi' ? 'धान, कपास, मिर्च, मक्का' : 'Rice, Cotton, Chilli, Maize',
    },
    {
      icon: '🌱',
      label: language === 'te' ? '2. ఎదుగుదల దశలు' : language === 'hi' ? '2. विकास चरण' : '2. Growth Stages',
      desc: language === 'te' ? 'విత్తనం నుండి కోత వరకు' : language === 'hi' ? 'बुवाई से कटाई तक' : 'Sowing to Harvest Roadmap',
    },
    {
      icon: '🛡️',
      label: language === 'te' ? '3. తెగుళ్ల నివారణ' : language === 'hi' ? '3. कीट व रोग रोकथाम' : '3. Pest Management',
      desc: language === 'te' ? 'తెగుళ్ల లక్షణాలు & మందులు' : language === 'hi' ? 'लक्षण और उपचार' : 'Symptoms and remedies',
    },
  ];

  return (
    <div className="crop-guide-page">
      {/* Easy Mode Banner */}
      <EasyModeBanner
        title={t('easyModeView.badge')}
        speakText={
          language === 'te'
            ? 'పంటల గైడ్ పేజీకి స్వాగతం. ఇక్కడ ప్రధాన భారతీయ పంటల సమగ్ర సాగు పద్ధతులు, ఎరువులు, నీటి యాజమాన్యం మరియు తెగుళ్ల నివారణ వివరాలు ఉన్నాయి.'
            : language === 'hi'
            ? 'फसल गाइड में आपका स्वागत है। यहां प्रमुख फसलों की बुवाई, खाद, सिंचाई और कीट प्रबंधन की पूरी जानकारी है।'
            : 'Welcome to the Crop Guide. Browse agronomic guidance for major Indian crops. Tap any card to listen to details.'
        }
        steps={easySteps}
      />

      <div className="section-title">
        <div>
          <h1>{t('cropGuide.title')}</h1>
          <p className="muted">{t('cropGuide.subtitle')}</p>
        </div>
        <Badge tone="info">{list.length} {language === 'te' ? 'పంటలు' : language === 'hi' ? 'फसलें' : 'crops'}</Badge>
      </div>

      {/* Navigation tabs for Crop Guide */}
      <div className="tabs" role="tablist" aria-label="Crop sections" style={{ marginBottom: '1.25rem' }}>
        <button
          type="button"
          role="tab"
          className="tab"
          aria-selected={tab === 'library'}
          onClick={() => setTab('library')}
        >
          🌾 {language === 'te' ? 'పంటల లైబ్రరీ' : language === 'hi' ? 'फसल लाइब्रेरी' : 'Crop Library'} ({CROPS.length})
        </button>
        <button
          type="button"
          role="tab"
          className="tab"
          aria-selected={tab === 'timeline'}
          onClick={() => setTab('timeline')}
        >
          🌱 {language === 'te' ? 'ఎదుగుదల కాలక్రమం (Timeline)' : language === 'hi' ? 'विकास समयरेखा (Timeline)' : 'Growth Timeline'}
        </button>
        <button
          type="button"
          role="tab"
          className="tab"
          aria-selected={tab === 'check'}
          onClick={() => setTab('check')}
        >
          🔍 {language === 'te' ? 'పంట తనిఖీ (Check My Crop)' : language === 'hi' ? 'फसल जांच (Check My Crop)' : 'Check My Crop'}
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB 1: CROPS LIBRARY                                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {tab === 'library' && (
        <div>
          <div className="notice warning" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <strong>{t('common.disclaimer')}</strong>
              <DataStatusBadge status="estimate" language={language} compact />
            </div>
            <span>{t('cropGuide.warning')}</span>
          </div>

          {/* Filter and search bar */}
          <div className="filters" style={{ marginTop: '1.25rem' }}>
            <FormField
              id="crop-search"
              label={t('cropGuide.searchLabel')}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <FormField
              id="crop-cat"
              label={t('cropGuide.category')}
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">{t('cropGuide.allCategories')} ({CROPS.length})</option>
              {CROP_CATEGORIES.map((c) => {
                const count = CROPS.filter((crop) => crop.category === c).length;
                const label = CATEGORY_LABELS[language]?.[c] || CATEGORY_LABELS.en[c] || c;
                return <option key={c} value={c}>{label} ({count})</option>;
              })}
            </FormField>
            <FormField
              id="crop-season"
              label={t('cropGuide.season')}
              as="select"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option value="All">{t('cropGuide.allSeasons')}</option>
              {CROP_SEASONS.map((s) => {
                const label = SEASON_LABELS[language]?.[s] || SEASON_LABELS.en[s] || s;
                return <option key={s} value={s}>{label}</option>;
              })}
            </FormField>
          </div>

          {/* Quick category filter tags */}
          <div className="row no-print" style={{ gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn btn-sm ${category === 'All' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCategory('All')}
            >
              {t('common.all')}
            </button>
            {CROP_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`btn btn-sm ${category === c ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCategory(c)}
              >
                {CATEGORY_LABELS[language]?.[c] || c}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <EmptyState
              title={t('cropGuide.noCropsFound')}
              text={t('cropGuide.noCropsDesc')}
              actionLabel={t('cropGuide.clearFilters')}
              onAction={() => {
                setQ('');
                setCategory('All');
                setSeason('All');
              }}
            />
          ) : (
            <div className="grid-3">
              {list.map((crop) => (
                <CropCard
                  key={crop.id}
                  crop={crop}
                  language={language}
                  saved={selectedCropId === crop.id}
                  onSave={saveCrop}
                  onOpen={(c) => setOpenId(c.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB 2: CROP GROWTH TIMELINE (SOWING TO HARVEST ROADMAP)            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {tab === 'timeline' && (
        <div>
          {/* Active Crop Setup & Plot Bar */}
          <div
            className="card"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '1.25rem',
              marginBottom: '1.25rem',
            }}
          >
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.15rem' }}>
              ⚙️ {language === 'te' ? 'మీ పంట వివరాలు నమోదు చేయండి:' : language === 'hi' ? 'अपनी फसल के विवरण चुनें:' : 'Track Your Field Crop:'}
            </h3>
            <div className="grid-4" style={{ gap: '0.75rem' }}>
              <FormField
                id="journey-crop"
                label={language === 'te' ? 'పంట ఎంపిక' : language === 'hi' ? 'फसल चुनें' : 'Select Crop'}
                as="select"
                value={cropJourney?.cropId || selectedCropId || 'rice'}
                onChange={(e) =>
                  setCropJourney((prev) => ({
                    ...prev,
                    cropId: e.target.value,
                    farmerCurrentStageId: null, // reset override when switching crop
                  }))
                }
              >
                {CROPS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {getCropName(c, language)} ({c.names?.en})
                  </option>
                ))}
              </FormField>

              <FormField
                id="journey-date"
                label={language === 'te' ? 'విత్తిన / నాటిన తేదీ' : language === 'hi' ? 'बुवाई / रोपाई की तारीख' : 'Planting Date'}
                type="date"
                value={cropJourney?.plantingDate || ''}
                onChange={(e) =>
                  setCropJourney((prev) => ({
                    ...prev,
                    plantingDate: e.target.value,
                  }))
                }
              />

              <FormField
                id="journey-plot"
                label={language === 'te' ? 'పొలం / మడి పేరు' : language === 'hi' ? 'खेत / प्लॉट का नाम' : 'Plot / Field Name'}
                value={cropJourney?.plotName || ''}
                onChange={(e) =>
                  setCropJourney((prev) => ({
                    ...prev,
                    plotName: e.target.value,
                  }))
                }
                placeholder="e.g. North Plot"
              />

              <FormField
                id="journey-variety"
                label={language === 'te' ? 'రకం (ఐచ్ఛికం)' : language === 'hi' ? 'किस्म (वैकल्पिक)' : 'Variety (optional)'}
                value={cropJourney?.variety || ''}
                onChange={(e) =>
                  setCropJourney((prev) => ({
                    ...prev,
                    variety: e.target.value,
                  }))
                }
                placeholder="e.g. BPT-5204"
              />
            </div>
          </div>

          <CropGrowthTimeline
            journeyData={cropJourney}
            onUpdateJourney={setCropJourney}
            onAddPlannerReminder={handleAddPlannerReminder}
            language={language}
            speak={speak}
            isSpeaking={isSpeaking}
            stopSpeaking={stopSpeaking}
            toast={toast}
            t={t}
          />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB 3: CHECK MY CROP (PHOTO GUIDED HEALTH CHECKER)                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {tab === 'check' && (
        <CheckMyCrop
          initialCropId={selectedCropId || cropJourney?.cropId || 'rice'}
          language={language}
          onSaveToJournal={addPhotoJournalEntry}
          toast={toast}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Crop detail modal (Library tab)                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {detail ? (
        <Modal
          title={`${detailName}${detailNameAlt ? ` (${detailNameAlt})` : ''}`}
          onClose={() => setOpenId(null)}
        >
          <div className="crop-detail-content">
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div className="row" style={{ gap: '0.4rem', flexWrap: 'wrap' }}>
                {detail.seasons.map((s) => {
                  const sLabel = SEASON_LABELS[language]?.[s] || s;
                  return <Badge key={s} tone="high">{sLabel}</Badge>;
                })}
                <Badge tone="info">{CATEGORY_LABELS[language]?.[detail.category] || detail.category}</Badge>
              </div>
              <div className="row" style={{ gap: '0.5rem' }}>
                <Button
                  size="sm"
                  variant={isSpeaking ? 'danger' : 'secondary'}
                  onClick={() => speakCropDetail(detail)}
                >
                  {isSpeaking ? '⏹ ' + t('common.stopReading') : '🔊 ' + t('common.readAloud')}
                </Button>
                {selectedCropId === detail.id ? (
                  <Badge tone="low">{t('cropGuide.myCrop')}</Badge>
                ) : null}
              </div>
            </div>

            {detail.image && (
              <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', margin: '1rem 0 0.5rem', background: 'var(--surface-2)' }}>
                <img
                  src={detail.image}
                  alt={getCropImageAlt(detail, language)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {detailDescription}
            </p>

            {/* Growth stage roadmap banner in modal with link to full interactive timeline */}
            <div className="card" style={{ background: 'var(--surface-2)', margin: '1rem 0' }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{t('cropGuide.growthStagesTitle')}</h3>
                  <p className="muted" style={{ margin: '2px 0 0', fontSize: '0.85rem' }}>
                    {t('cropGuide.growthStagesSub')}
                  </p>
                </div>
                <Button size="sm" variant="primary" onClick={() => handleSwitchToTimeline(detail.id)}>
                  🌱 {language === 'te' ? 'పూర్తి టైమ్‌లైన్ చూడు' : language === 'hi' ? 'पूरी समयरेखा देखें' : 'View Full Roadmap'}
                </Button>
              </div>

              <div className="stage-timeline" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                {detailGrowthStages.map((st, idx) => {
                  const isCurrent = growthStage === st;
                  return (
                    <div
                      key={`${st}-${idx}`}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius)',
                        background: isCurrent ? 'var(--primary)' : 'var(--surface)',
                        color: isCurrent ? '#fff' : 'inherit',
                        border: '1px solid var(--border)',
                        fontSize: '0.9rem',
                        fontWeight: isCurrent ? 700 : 500,
                      }}
                    >
                      {idx + 1}. {st}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Agronomic guide cards */}
            <div className="grid-2" style={{ gap: '0.75rem', margin: '1rem 0' }}>
              <div className="card" style={{ border: '1px solid var(--border)', padding: '0.85rem' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: 'var(--primary)' }}>{t('cropGuide.seedSelection')}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{detailSeedTips}</p>
              </div>

              <div className="card" style={{ border: '1px solid var(--border)', padding: '0.85rem' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: 'var(--primary)' }}>{t('cropGuide.fieldPrep')}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{detailCultivation}</p>
              </div>

              <div className="card" style={{ border: '1px solid var(--border)', padding: '0.85rem' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: 'var(--primary)' }}>{t('cropGuide.irrigationMgmt')}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{detailIrrigation}</p>
              </div>

              <div className="card" style={{ border: '1px solid var(--border)', padding: '0.85rem' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: 'var(--primary)' }}>{t('cropGuide.nutrientAdvice')}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{detailFertilizer}</p>
                <p className="muted" style={{ margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                  {t('cropGuide.soilHealthNote')}
                </p>
              </div>
            </div>

            {/* Symptoms and preventive care */}
            <div className="card" style={{ margin: '1rem 0', border: '1px solid var(--border)' }}>
              <h4 style={{ marginTop: 0 }}>{t('cropGuide.symptomsTitle')}</h4>
              <ul style={{ paddingLeft: '1.25rem', margin: '0.5rem 0', lineHeight: 1.5 }}>
                {detailSymptoms.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem' }}>
                    <strong style={{ color: 'var(--text)' }}>{s.sign}:</strong> {s.possible}
                  </li>
                ))}
              </ul>

              <h4 style={{ margin: '1rem 0 0.4rem' }}>{t('cropGuide.preventiveTitle')}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{detailPreventive}</p>
            </div>

            {/* Modal actions */}
            <div className="row" style={{ justifyContent: 'space-between', marginTop: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button onClick={() => saveCrop(detail)}>
                  {selectedCropId === detail.id ? t('cropGuide.savedCrop') : t('cropGuide.saveCrop')}
                </Button>
                <Button variant="secondary" onClick={handlePrintCropSheet}>
                  {t('cropGuide.printDossier')}
                </Button>
              </div>
              <Button variant="ghost" onClick={() => setOpenId(null)}>
                {t('common.close')}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
