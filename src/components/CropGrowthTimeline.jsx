import { useState, useMemo } from 'react';
import { CROP_STAGES, calculateCropTimeline, formatHarvestWindowText, getCropStages } from '../data/cropStages.js';
import { CROPS, getCropById, getCropName } from '../data/crops.js';
import { IMAGE_MANIFEST } from '../data/imageManifest.js';
import { formatForSpeech } from '../services/voiceService.js';
import { uid, todayISO, formatDate } from '../utils/format.js';
import Button from './Button.jsx';
import Badge from './Badge.jsx';
import FormField from './FormField.jsx';
import Modal from './Modal.jsx';
import DataStatusBadge from './DataStatusBadge.jsx';

/**
 * CropGrowthTimeline — Sowing to Harvest Growth Roadmap & Farmer Crop Tracker
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides:
 *   - Visual picture-first timeline (vertical on mobile, responsive)
 *   - Done / Current / Upcoming status with color + icon + text
 *   - Golden Yellow accent with Charcoal text (#1F2937) for Current stage
 *   - Overall progress bar ("Stage X of Y")
 *   - Labelled buttons: "Show Me How", "Listen", "Mark Stage Complete", "Add Observation"
 *   - Honest calculation: farmer override ALWAYS beats estimation
 *   - Estimated harvest window (e.g. "Around 15 Nov to 30 Nov") with disclaimer
 *   - Date validation for future / past-harvest dates with friendly prompts
 *   - Link to Farm Planner rule-based reminders
 */
export default function CropGrowthTimeline({
  journeyData,
  onUpdateJourney,
  onAddPlannerReminder,
  language = 'en',
  speak,
  isSpeaking,
  stopSpeaking,
  toast,
  t,
}) {
  // Modal states
  const [detailStage, setDetailStage] = useState(null); // "Show Me How"
  const [observeStage, setObserveStage] = useState(null); // "Add Observation"
  const [observeNote, setObserveNote] = useState('');
  const [observePhoto, setObservePhoto] = useState(null);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [harvestDateInput, setHarvestDateInput] = useState(todayISO());
  const [harvestYieldInput, setHarvestYieldInput] = useState('');

  // Active crop and planting date
  const cropId = journeyData?.cropId || 'rice';
  const plantingDate = journeyData?.plantingDate || '';
  const plotName = journeyData?.plotName || '';
  const variety = journeyData?.variety || '';
  const completedStages = journeyData?.completedStages || [];
  const farmerCurrentStageId = journeyData?.farmerCurrentStageId || null;
  const observations = journeyData?.stageObservations || {};
  const actualHarvestDate = journeyData?.actualHarvestDate || '';
  const actualYield = journeyData?.actualYield || '';

  const crop = getCropById(cropId);
  const cropDisplayName = crop ? getCropName(crop, language) : cropId;

  // Timeline computation
  const timelineResult = useMemo(() => {
    return calculateCropTimeline(cropId, plantingDate);
  }, [cropId, plantingDate]);

  const stages = timelineResult?.stages || getCropStages(cropId);

  // Active / current stage: farmer override wins, otherwise algorithm estimate
  const currentStageIndex = useMemo(() => {
    if (!stages || stages.length === 0) return 0;
    if (farmerCurrentStageId) {
      const idx = stages.findIndex((s) => s.id === farmerCurrentStageId);
      if (idx !== -1) return idx;
    }
    return timelineResult?.estimatedStageIndex ?? 0;
  }, [stages, farmerCurrentStageId, timelineResult]);

  const currentStage = stages[currentStageIndex] || stages[0];

  // Helper to get image path from manifest
  function getStageImage(imageKey) {
    const entry = IMAGE_MANIFEST.find((m) => m.id === imageKey || m.cropId === imageKey);
    return entry?.localPath || `/images/crops/${imageKey || 'rice'}.jpg`;
  }

  // Handle stage completion toggle
  function toggleStageComplete(stageId) {
    const isDone = completedStages.includes(stageId);
    let nextCompleted;
    if (isDone) {
      nextCompleted = completedStages.filter((id) => id !== stageId);
      if (toast) {
        toast(
          language === 'te'
            ? 'దశ పూర్తి రద్దు చేయబడింది.'
            : language === 'hi'
            ? 'चरण पूरा रद्द किया गया।'
            : 'Stage marked as incomplete.',
          'info'
        );
      }
    } else {
      nextCompleted = [...completedStages, stageId];
      if (toast) {
        toast(
          language === 'te'
            ? 'దశ పూర్తయినట్లు నమోదు చేయబడింది!'
            : language === 'hi'
            ? 'चरण पूरा दर्ज किया गया!'
            : 'Stage marked complete!',
          'success'
        );
      }
    }

    onUpdateJourney?.({
      ...journeyData,
      completedStages: nextCompleted,
    });
  }

  // Handle farmer override of current stage
  function handleSelectOverrideStage(stageId) {
    onUpdateJourney?.({
      ...journeyData,
      farmerCurrentStageId: stageId,
    });
    setShowOverrideModal(false);
    if (toast) {
      toast(
        language === 'te'
          ? 'మీరు ఎంచుకున్న ప్రస్తుత దశ నవీకరించబడింది.'
          : language === 'hi'
          ? 'वर्तमान चरण अपडेट किया गया।'
          : 'Current stage updated by your selection.',
        'success'
      );
    }
  }

  // Reset override to automatic calculation
  function handleResetOverride() {
    onUpdateJourney?.({
      ...journeyData,
      farmerCurrentStageId: null,
    });
    setShowOverrideModal(false);
    if (toast) {
      toast(
        language === 'te'
          ? 'స్వయంచాలక అంచనా దశకు మార్చబడింది.'
          : language === 'hi'
          ? 'स्वचालित अनुमान चरण पर सेट किया गया।'
          : 'Reset to estimated stage based on planting date.',
        'info'
      );
    }
  }

  // Handle saving an observation
  function handleSaveObservation() {
    if (!observeStage) return;
    const stageId = observeStage.id;
    const nextObs = {
      ...observations,
      [stageId]: {
        note: observeNote.trim(),
        date: todayISO(),
        photo: observePhoto,
      },
    };

    onUpdateJourney?.({
      ...journeyData,
      stageObservations: nextObs,
    });

    setObserveStage(null);
    setObserveNote('');
    setObservePhoto(null);
    if (toast) {
      toast(
        language === 'te'
          ? 'గమనిక భద్రపరచబడింది.'
          : language === 'hi'
          ? 'टिप्पणी सुरक्षित की गई।'
          : 'Observation recorded on your device.',
        'success'
      );
    }
  }

  // Handle recording actual harvest
  function handleSaveHarvest() {
    onUpdateJourney?.({
      ...journeyData,
      actualHarvestDate: harvestDateInput,
      actualYield: harvestYieldInput.trim(),
    });
    setShowHarvestModal(false);
    if (toast) {
      toast(
        language === 'te'
          ? 'కోత మరియు దిగుబడి వివరాలు భద్రపరచబడ్డాయి!'
          : language === 'hi'
          ? 'कटाई व उपज रिकॉर्ड सुरक्षित किए गए!'
          : 'Harvest date and yield recorded!',
        'success'
      );
    }
  }

  // Speak voice guidance for a stage
  function speakStage(stage) {
    if (isSpeaking) {
      stopSpeaking?.();
      return;
    }
    const rawVoice = stage.voiceText?.[language] || stage.voiceText?.en || '';
    const spoken = formatForSpeech(rawVoice, language);
    speak?.(spoken);
  }

  // Schedule Planner rule-based reminder
  function handleAddReminder(stage) {
    if (!onAddPlannerReminder) return;
    const stageName = stage.names?.[language] || stage.names?.en;
    const taskName = `${cropDisplayName} — ${stageName} (${language === 'te' ? 'రాబోయే దశ పరిశీలన' : language === 'hi' ? 'आगामी चरण जांच' : 'Upcoming stage check'})`;
    const notes = `${language === 'te' ? 'రైతు మార్గదర్శకం' : language === 'hi' ? 'मार्गदर्शन' : 'Activities'}: ${stage.activities?.[language] || stage.activities?.en}. ${language === 'te' ? 'పరిశీలించాల్సినవి' : language === 'hi' ? 'ध्यान दें' : 'Watch for'}: ${stage.watchFor?.[language] || stage.watchFor?.en}`;

    onAddPlannerReminder({
      name: taskName,
      crop: cropDisplayName,
      notes,
      source: 'rule-based reminder',
    });
  }

  // Calculate completed count
  const completedCount = completedStages.length;
  const totalStages = stages.length;
  const progressPct = Math.round((completedCount / totalStages) * 100);

  return (
    <div className="crop-growth-timeline" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      {/* ─── Top Header Card ────────────────────────────────────────── */}
      <div
        className="card"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem' }}>
                🌾 {cropDisplayName} {language === 'te' ? 'సాగు ప్రయాణం' : language === 'hi' ? 'फसल विकास यात्रा' : 'Growth Timeline'}
              </h2>
              <DataStatusBadge status="estimate" language={language} compact />
            </div>
            <p className="muted" style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>
              {language === 'te'
                ? 'విత్తనం నుండి కోత వరకు సమగ్ర దశలు. మీ పొలంలో ప్రస్తుతం ఏ దశలో ఉందో సరిచూసుకోండి.'
                : language === 'hi'
                ? 'बुवाई से कटाई तक सभी महत्वपूर्ण चरण। अपनी फसल के वर्तमान चरण को ट्रैक करें।'
                : 'Follow your crop from sowing to harvest. Estimates adapt to your planting date.'}
            </p>
          </div>

          <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
            {plantingDate && (
              <Button size="sm" variant="secondary" onClick={() => setShowOverrideModal(true)}>
                ✏️ {language === 'te' ? 'దశను మార్చండి' : language === 'hi' ? 'चरण बदलें' : 'Override Stage'}
              </Button>
            )}
            <Button
              size="sm"
              variant={actualHarvestDate ? 'secondary' : 'primary'}
              onClick={() => setShowHarvestModal(true)}
            >
              🏁 {actualHarvestDate
                ? (language === 'te' ? 'కోత వివరాలు చూడు' : language === 'hi' ? 'कटाई विवरण' : 'Harvest Details')
                : (language === 'te' ? 'కోత నమోదు' : language === 'hi' ? 'कटाई दर्ज करें' : 'Record Harvest')}
            </Button>
          </div>
        </div>

        {/* Plot and Planting Date Meta Banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
            background: 'var(--surface-2)',
            padding: '0.85rem 1rem',
            borderRadius: '12px',
            marginTop: '1rem',
          }}
        >
          <div>
            <span className="muted" style={{ fontSize: '0.78rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'te' ? 'విత్తిన తేదీ' : language === 'hi' ? 'बुवाई की तारीख' : 'Planting Date'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <strong>{plantingDate ? formatDate(plantingDate) : (language === 'te' ? 'నమోదు చేయలేదు' : language === 'hi' ? 'दर्ज नहीं' : 'Not set')}</strong>
              {plantingDate && <DataStatusBadge status="farmer-entered" size="sm" language={language} compact />}
            </div>
          </div>

          <div>
            <span className="muted" style={{ fontSize: '0.78rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'te' ? 'పొలం / మడి' : language === 'hi' ? 'खेत का नाम' : 'Plot / Field'}
            </span>
            <strong style={{ display: 'block', marginTop: '2px' }}>
              {plotName || (language === 'te' ? 'ప్రధాన పొలం' : language === 'hi' ? 'मुख्य खेत' : 'Main Plot')}
              {variety ? ` · ${variety}` : ''}
            </strong>
          </div>

          <div>
            <span className="muted" style={{ fontSize: '0.78rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'te' ? 'అంచనా కోత సమయం (విండో)' : language === 'hi' ? 'अनुमानित कटाई अवधि' : 'Estimated Harvest Window'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <strong>{timelineResult?.harvestWindow ? formatHarvestWindowText(timelineResult.harvestWindow, language) : '—'}</strong>
              <DataStatusBadge status="estimate" size="sm" language={language} compact />
            </div>
          </div>
        </div>

        {/* Date Anomaly Warnings */}
        {timelineResult?.status === 'future' && (
          <div className="notice info" style={{ marginTop: '0.85rem' }}>
            📅 <strong>{language === 'te' ? 'రాబోయే తేదీ:' : language === 'hi' ? 'भविष्य की तारीख:' : 'Future Date:'}</strong>{' '}
            {language === 'te'
              ? `మీరు నమోదు చేసిన విత్తిన తేదీ భవిష్యత్తులో ఉంది (ఇంకా ${timelineResult.daysUntil} రోజులు ఉంది). పంట విత్తిన తర్వాత దశల లెక్కింపు మొదలవుతుంది.`
              : language === 'hi'
              ? `आपने भविष्य की बुवाई तारीख चुनी है (${timelineResult.daysUntil} दिन शेष)। बुवाई के दिन से चरण सक्रिय होंगे।`
              : `Your planting date is set in the future (${timelineResult.daysUntil} days ahead). Timeline will track once sown.`}
          </div>
        )}

        {timelineResult?.status === 'past_harvest' && !actualHarvestDate && (
          <div className="notice warning" style={{ marginTop: '0.85rem' }}>
            ⚠️ <strong>{language === 'te' ? 'కోత సమయం దాటింది:' : language === 'hi' ? 'कटाई का समय पूरा:' : 'Past Harvest Window:'}</strong>{' '}
            {language === 'te'
              ? 'ఈ పంట సాధారణ కోత కాలాన్ని దాటింది. పంటను ఇప్పటికే కోశారా? పైన ఉన్న "కోత నమోదు" బటన్ నొక్కి వాస్తవ దిగుబడి వివరాలు నమోదు చేయండి.'
              : language === 'hi'
              ? 'यह फसल सामान्य कटाई अवधि पार कर चुकी है। क्या आपने कटाई कर ली है? कृपया "कटाई दर्ज करें" पर टैप करें।'
              : 'This crop is past its typical harvest window. Tap "Record Harvest" to document actual harvest and yield.'}
          </div>
        )}

        {/* Overall Progress Bar */}
        <div style={{ marginTop: '1.25rem' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
              {language === 'te'
                ? `దశ ${currentStageIndex + 1} / ${totalStages}: ${currentStage?.names?.[language] || currentStage?.names?.en}`
                : language === 'hi'
                ? `चरण ${currentStageIndex + 1} / ${totalStages}: ${currentStage?.names?.[language] || currentStage?.names?.en}`
                : `Stage ${currentStageIndex + 1} of ${totalStages}: ${currentStage?.names?.[language] || currentStage?.names?.en}`}
              {farmerCurrentStageId && (
                <span style={{ marginLeft: '6px', fontSize: '0.8em', color: 'var(--primary)', fontWeight: 500 }}>
                  ({language === 'te' ? 'రైతు ఎంపిక' : language === 'hi' ? 'किसान की पसंद' : 'Farmer Chosen'})
                </span>
              )}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>
              {completedCount} / {totalStages} {language === 'te' ? 'పూర్తయ్యాయి' : language === 'hi' ? 'पूरे' : 'Done'} ({progressPct}%)
            </span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              height: '10px',
              background: 'var(--border)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPct}%`,
                height: '100%',
                background: progressPct === 100 ? 'var(--primary)' : 'var(--chart-2)',
                borderRadius: '6px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Disclaimer footer */}
        <p className="muted" style={{ fontSize: '0.78rem', margin: '0.75rem 0 0', lineHeight: 1.4 }}>
          ℹ️ {language === 'te'
            ? 'గమనిక: పంట కాలవ్యవధులు రకం, వాతావరణం, నేల స్వభావాన్ని బట్టి మారుతాయి. ఖచ్చితమైన వివరాల కోసం మీ మండల వ్యవసాయ అధికారి లేదా కేవీకేను సంప్రదించండి.'
            : language === 'hi'
            ? 'सूचना: फसल की अवधि किस्म, मिट्टी और मौसम पर निर्भर करती है। अंतिम सलाह के लिए स्थानीय कृषि विज्ञान केंद्र (KVK) से संपर्क करें।'
            : 'Estimate disclaimer: Actual timing varies by variety, soil and weather. Confirm with your local agriculture officer or KVK.'}
        </p>
      </div>

      {/* ─── Timeline Cards Stack ───────────────────────────────────── */}
      <div className="timeline-stages" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {stages.map((stage, idx) => {
          const isDone = completedStages.includes(stage.id);
          const isCurrent = idx === currentStageIndex;
          const isUpcoming = !isDone && !isCurrent;

          const stageName = stage.names?.[language] || stage.names?.en;
          const stageDesc = stage.shortDesc?.[language] || stage.shortDesc?.en;
          const stageDays = `${stage.duration.minDays}-${stage.duration.maxDays} ${language === 'te' ? 'రోజులు' : language === 'hi' ? 'दिन' : 'days'}`;
          const cumulativeDaysStr = `${language === 'te' ? 'రోజు' : language === 'hi' ? 'दिन' : 'Day'} ${stage.cumulativeDays.minDays} – ${stage.cumulativeDays.maxDays}`;
          const observation = observations[stage.id];

          // Strict design rule: Current stage highlighted with Golden Yellow accent & Charcoal text (#1F2937)
          const cardBg = isCurrent
            ? '#FEF3CC' // Golden Yellow light tint
            : isDone
            ? 'var(--surface)'
            : 'var(--surface)';

          const cardBorder = isCurrent
            ? '2px solid #D97706' // Golden yellow border
            : isDone
            ? '2px solid var(--primary)'
            : '1px solid var(--border)';

          const titleColor = isCurrent ? '#1F2937' : 'inherit'; // Charcoal text, NEVER yellow text on cream
          const textColor = isCurrent ? '#374151' : 'var(--text-muted)';

          return (
            <article
              key={stage.id}
              className={`timeline-card stage-card ${isCurrent ? 'stage-card-current' : ''}`}
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: isCurrent ? '0 6px 16px rgba(217, 119, 6, 0.15)' : 'var(--shadow)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
              aria-label={`Stage ${idx + 1} of ${totalStages}: ${stageName}, ${isCurrent ? 'current stage' : isDone ? 'completed' : 'upcoming'}`}
            >
              {/* Card Header: Stage Number + Status Badge + Days range */}
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isCurrent ? '#D97706' : isDone ? 'var(--primary)' : 'var(--surface-2)',
                      color: isCurrent || isDone ? '#FFFFFF' : 'var(--text)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                    }}
                  >
                    {isDone ? '✓' : idx + 1}
                  </span>

                  {/* Status indicator: color + icon + text (never color alone) */}
                  {isCurrent && (
                    <span
                      style={{
                        background: '#D97706',
                        color: '#FFFFFF',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      ▶ {language === 'te' ? 'ప్రస్తుత దశ' : language === 'hi' ? 'वर्तमान चरण' : 'Current Stage'}
                    </span>
                  )}
                  {isDone && (
                    <span
                      style={{
                        background: 'var(--primary)',
                        color: '#FFFFFF',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      ✓ {language === 'te' ? 'పూర్తయింది' : language === 'hi' ? 'पूरा हुआ' : 'Done'}
                    </span>
                  )}
                  {isUpcoming && (
                    <span
                      style={{
                        background: 'var(--surface-2)',
                        color: 'var(--text-muted)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      ⏳ {language === 'te' ? 'రాబోయే దశ' : language === 'hi' ? 'आगामी' : 'Upcoming'}
                    </span>
                  )}
                </div>

                {/* Day Range Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      background: isCurrent ? 'rgba(217, 119, 6, 0.15)' : 'var(--surface-2)',
                      color: isCurrent ? '#92400E' : 'inherit',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    📅 {cumulativeDaysStr} ({stageDays})
                  </span>
                  <DataStatusBadge
                    status={stage.isEstimate ? 'estimate' : 'verified'}
                    sourceName={stage.source}
                    lastReviewed={stage.lastReviewed}
                    language={language}
                    compact
                  />
                </div>
              </div>

              {/* Main Content: Thumbnail + Stage Name + Explanation */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {/* Stage Crop Image */}
                <div
                  style={{
                    width: '100px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <img
                    src={getStageImage(stage.imageKey)}
                    alt={`${cropDisplayName} ${stageName}`}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Title & Description */}
                <div style={{ flex: '1 1 240px' }}>
                  <h3
                    style={{
                      margin: '0 0 6px',
                      fontSize: '1.2rem',
                      color: titleColor,
                      fontWeight: 700,
                    }}
                  >
                    {stageName}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.92rem',
                      lineHeight: 1.5,
                      color: textColor,
                    }}
                  >
                    {stageDesc}
                  </p>
                </div>
              </div>

              {/* Saved Observations Note (if any) */}
              {observation && (
                <div
                  style={{
                    background: isCurrent ? 'rgba(255, 255, 255, 0.8)' : 'var(--surface-2)',
                    borderLeft: '4px solid var(--primary)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                  }}
                >
                  <div className="row" style={{ justifyContent: 'space-between', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                      📝 {language === 'te' ? 'రైతు గమనిక' : language === 'hi' ? 'किसान की टिप्पणी' : 'Your Field Note'} ({formatDate(observation.date)})
                    </strong>
                    <DataStatusBadge status="farmer-entered" size="sm" language={language} compact />
                  </div>
                  <div>{observation.note}</div>
                </div>
              )}

              {/* Action Buttons: Labelled controls with large touch targets (no icon-only) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  paddingTop: '0.75rem',
                  borderTop: isCurrent ? '1px solid rgba(217, 119, 6, 0.2)' : '1px solid var(--border)',
                }}
              >
                <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                  {/* Show Me How */}
                  <Button
                    size="sm"
                    variant={isCurrent ? 'primary' : 'secondary'}
                    onClick={() => setDetailStage(stage)}
                    aria-label={`Show detailed guidance for ${stageName}`}
                  >
                    📖 {language === 'te' ? 'ఎలా చేయాలో చూపించు' : language === 'hi' ? 'कैसे करें' : 'Show Me How'}
                  </Button>

                  {/* Listen Voice */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakStage(stage)}
                    aria-label={`Listen to voice instructions for ${stageName}`}
                  >
                    🔊 {isSpeaking ? (language === 'te' ? 'ఆపండి' : language === 'hi' ? 'रोकें' : 'Stop') : (language === 'te' ? 'వినండి' : language === 'hi' ? 'सुनें' : 'Listen')}
                  </Button>

                  {/* Add Reminder to Farm Planner */}
                  {onAddPlannerReminder && isUpcoming && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAddReminder(stage)}
                      title="Add rule-based check reminder to Farm Planner"
                    >
                      🔔 {language === 'te' ? 'ప్లానర్‌లో గుర్తుచేయి' : language === 'hi' ? 'रिमाइंडर जोड़ें' : 'Remind Me'}
                    </Button>
                  )}
                </div>

                <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                  {/* Add Observation */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setObserveStage(stage);
                      setObserveNote(observation?.note || '');
                    }}
                  >
                    ✏️ {language === 'te' ? 'గమనిక జోడించు' : language === 'hi' ? 'नोट जोड़ें' : 'Add Note'}
                  </Button>

                  {/* Mark Complete / Undo */}
                  <Button
                    size="sm"
                    variant={isDone ? 'secondary' : 'primary'}
                    onClick={() => toggleStageComplete(stage.id)}
                    aria-label={isDone ? `Mark stage ${stageName} as incomplete` : `Mark stage ${stageName} as complete`}
                  >
                    {isDone
                      ? (language === 'te' ? 'పూర్తి రద్దు చేయి' : language === 'hi' ? 'अपूर्ण करें' : 'Undo Done')
                      : (language === 'te' ? 'పూర్తయింది' : language === 'hi' ? 'पूरा हुआ' : 'Mark Complete')}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ─── MODAL 1: "Show Me How" (Deep Agronomic Guidance) ────────── */}
      {detailStage && (
        <Modal
          title={`📖 ${detailStage.names?.[language] || detailStage.names?.en} — ${cropDisplayName}`}
          onClose={() => setDetailStage(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', lineHeight: 1.6 }}>
            <div>
              <DataStatusBadge
                status={detailStage.isEstimate ? 'estimate' : 'verified'}
                sourceName={detailStage.source}
                lastReviewed={detailStage.lastReviewed}
                language={language}
              />
            </div>

            {/* Explanation */}
            <div>
              <h4 style={{ margin: '0 0 4px', color: 'var(--primary)' }}>
                {language === 'te' ? 'ఈ దశలో ఏమి జరుగుతుంది?' : language === 'hi' ? 'इस चरण में क्या होता है?' : 'What happens in this stage?'}
              </h4>
              <p style={{ margin: 0 }}>
                {detailStage.shortDesc?.[language] || detailStage.shortDesc?.en}
              </p>
            </div>

            {/* Activities: Irrigation, Weeding, Fertilizer */}
            <div style={{ background: 'var(--surface-2)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 6px', color: 'var(--primary)' }}>
                🛠️ {language === 'te' ? 'రైతు చేయాల్సిన ముఖ్యమైన పనులు:' : language === 'hi' ? 'किसान क्या काम करें?' : 'Key Field Operations (What to do):'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                {detailStage.activities?.[language] || detailStage.activities?.en}
              </p>
            </div>

            {/* Watch for: Symptoms and Pests */}
            <div style={{ background: 'var(--surface-2)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-orange)' }}>
              <h4 style={{ margin: '0 0 6px', color: '#D97706' }}>
                ⚠️ {language === 'te' ? 'గమనించాల్సిన తెగుళ్లు & లక్షణాలు:' : language === 'hi' ? 'कीट व रोग के लक्षण (सावधानियां):' : 'What to Watch For (Symptoms & Risks):'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                {detailStage.watchFor?.[language] || detailStage.watchFor?.en}
              </p>
            </div>

            {/* Voice player inside modal */}
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => speakStage(detailStage)}
              >
                🔊 {isSpeaking ? (language === 'te' ? 'ఆపండి' : language === 'hi' ? 'रोकें' : 'Stop Reading') : (language === 'te' ? 'వినండి' : language === 'hi' ? 'सुनें' : 'Read Aloud')}
              </Button>
              <Button onClick={() => setDetailStage(null)}>
                {language === 'te' ? 'సరే, అర్థమైంది' : language === 'hi' ? 'समझ गए' : 'Got It'}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ─── MODAL 2: "Add Observation / Note" ───────────────────────── */}
      {observeStage && (
        <Modal
          title={`✏️ ${language === 'te' ? 'క్షేత్ర గమనిక నమోదు:' : language === 'hi' ? 'खेत की टिप्पणी दर्ज करें:' : 'Record Field Observation:'} ${observeStage.names?.[language] || observeStage.names?.en}`}
          onClose={() => setObserveStage(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
              {language === 'te'
                ? 'ఈ దశలో మీ పొలంలో గమనించిన విషయాలు (ఉదా: నీరు పెట్టిన తేదీ, పిలకల సంఖ్య, తెగులు దాడి) ఇక్కడ రాసుకోండి.'
                : language === 'hi'
                ? 'इस चरण में खेत में देखे गए लक्षण या किए गए काम यहां सुरक्षित करें।'
                : 'Write your notes or observations for this crop stage. Stored safely on this device.'}
            </p>

            <FormField
              id="obs-note"
              label={language === 'te' ? 'మీ గమనికలు' : language === 'hi' ? 'आपकी टिप्पणी' : 'Your Field Notes'}
              as="textarea"
              value={observeNote}
              onChange={(e) => setObserveNote(e.target.value)}
              placeholder={language === 'te' ? 'ఉదా: పిలకలు బాగా వచ్చాయి, మొదటి దఫా యూరియా వేశాను...' : 'e.g. Good tillering seen, applied first split urea...'}
            />

            <div className="row" style={{ justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button variant="ghost" onClick={() => setObserveStage(null)}>
                {language === 'te' ? 'రద్దు' : language === 'hi' ? 'रद्द' : 'Cancel'}
              </Button>
              <Button onClick={handleSaveObservation}>
                💾 {language === 'te' ? 'భద్రపరచు' : language === 'hi' ? 'सुरक्षित करें' : 'Save Note'}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ─── MODAL 3: Override Current Stage ─────────────────────────── */}
      {showOverrideModal && (
        <Modal
          title={`✏️ ${language === 'te' ? 'ప్రస్తుత పంట దశను ఎంచుకోండి' : language === 'hi' ? 'वर्तमान फसल चरण चुनें' : 'Choose Your Real Crop Stage'}`}
          onClose={() => setShowOverrideModal(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
              {language === 'te'
                ? 'తేదీ ఆధారంగా లెక్కించిన అంచనా కంటే మీ పొలంలో ప్రత్యక్షంగా కనిపించే స్థితి వేరుగా ఉంటే, ఇక్కడ మీ నిజమైన దశను ఎంచుకోండి. మీ ఎంపికే ప్రాధాన్యతను పొందుతుంది.'
                : language === 'hi'
                ? 'यदि आपकी फसल की वास्तविक स्थिति अनुमान से अलग है, तो सही चरण चुनें। आपका चुनाव मान्य होगा।'
                : 'If your field condition differs from the estimated stage, pick the actual stage. Your choice overrides the estimate.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {stages.map((st, idx) => {
                const isSelected = st.id === (farmerCurrentStageId || currentStage.id);
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectOverrideStage(st.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--surface-2)' : 'var(--surface)',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <strong>
                        {idx + 1}. {st.names?.[language] || st.names?.en}
                      </strong>
                      <span className="muted" style={{ display: 'block', fontSize: '0.8rem' }}>
                        {st.duration.minDays}-{st.duration.maxDays} {language === 'te' ? 'రోజులు' : language === 'hi' ? 'दिन' : 'days'}
                      </span>
                    </div>
                    {isSelected && <Badge tone="high">{language === 'te' ? 'ప్రస్తుతం' : language === 'hi' ? 'सक्रिय' : 'Selected'}</Badge>}
                  </button>
                );
              })}
            </div>

            <div className="row" style={{ justifyContent: 'space-between', marginTop: '0.5rem' }}>
              {farmerCurrentStageId && (
                <Button variant="ghost" size="sm" onClick={handleResetOverride}>
                  🔄 {language === 'te' ? 'అంచనా దశకు రీసెట్ చేయి' : language === 'hi' ? 'अनुमान पर रीसेट करें' : 'Reset to Date Estimate'}
                </Button>
              )}
              <Button variant="secondary" onClick={() => setShowOverrideModal(false)}>
                {language === 'te' ? 'మూసివేయి' : language === 'hi' ? 'बंद करें' : 'Close'}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ─── MODAL 4: Record Actual Harvest & Yield ───────────────────── */}
      {showHarvestModal && (
        <Modal
          title={`🏁 ${language === 'te' ? 'పంట కోత & దిగుబడి నమోదు' : language === 'hi' ? 'फसल कटाई व उपज रिकॉर्ड' : 'Record Actual Harvest & Yield'}`}
          onClose={() => setShowHarvestModal(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
              {language === 'te'
                ? 'వాస్తవంగా కోత పూర్తయిన తేదీ మరియు వచ్చిన దిగుబడిని ఇక్కడ నమోదు చేయండి. అంచనా మరియు వాస్తవ వివరాల పోలిక చరిత్రలో కనిపిస్తుంది.'
                : language === 'hi'
                ? 'वास्तविक कटाई की तारीख और प्राप्त उपज यहां दर्ज करें। अनुमान और वास्तविक का अंतर सुरक्षित रहेगा।'
                : 'Enter your real harvest completion date and yield. Compares estimated vs actual performance.'}
            </p>

            <FormField
              id="harvest-date"
              label={language === 'te' ? 'వాస్తవ కోత తేదీ' : language === 'hi' ? 'वास्तविक कटाई की तारीख' : 'Actual Harvest Date'}
              type="date"
              value={harvestDateInput}
              onChange={(e) => setHarvestDateInput(e.target.value)}
            />

            <FormField
              id="harvest-yield"
              label={language === 'te' ? 'పొందిన దిగుబడి (ఉదా: 24 క్వింటాళ్లు / ఎకరా)' : language === 'hi' ? 'प्राप्त उपज (उदा: 22 क्विंटल/एकड़)' : 'Actual Yield (e.g. 25 quintals/acre)'}
              value={harvestYieldInput}
              onChange={(e) => setHarvestYieldInput(e.target.value)}
              placeholder="e.g. 24 quintals per acre"
            />

            <div className="row" style={{ justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Button variant="ghost" onClick={() => setShowHarvestModal(false)}>
                {language === 'te' ? 'రద్దు' : language === 'hi' ? 'रद्द' : 'Cancel'}
              </Button>
              <Button onClick={handleSaveHarvest}>
                💾 {language === 'te' ? 'కోత వివరాలు భద్రపరచు' : language === 'hi' ? 'कटाई सुरक्षित करें' : 'Save Harvest Record'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
