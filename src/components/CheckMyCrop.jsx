import { useState, useRef } from 'react';
import { CROPS, getCropById, getCropName, getCropSymptoms, getCropText } from '../data/crops.js';
import Button from './Button.jsx';
import Badge from './Badge.jsx';
import FormField from './FormField.jsx';
import DataStatusBadge from './DataStatusBadge.jsx';
import CameraCapture from './CameraCapture.jsx';
import { todayISO, uid } from '../utils/format.js';

/**
 * CheckMyCrop — Crop Health Checker & Symptom Guide
 * ─────────────────────────────────────────────────────────────────────────────
 * Transparent, honest photo-guided agricultural health assistant:
 *   1. Select Crop from verified library
 *   2. Take / Upload photo (with camera or file upload)
 *   3. Preview & image quality check
 *   4. Explicit local privacy consent
 *   5. Honest model boundary: Declares that automated AI disease diagnosis is not
 *      currently available client-side without an external server model; provides
 *      curated agronomic symptom guidance matching the crop.
 *   6. Photo Journal entry option with local storage.
 *   7. Clear educational disclaimer on every result.
 */
export default function CheckMyCrop({
  initialCropId,
  language = 'en',
  onSaveToJournal,
  toast,
  t,
}) {
  const [selectedCrop, setSelectedCrop] = useState(initialCropId || 'rice');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [savedToJournal, setSavedToJournal] = useState(false);
  const [journalNote, setJournalNote] = useState('');

  const galleryInputRef = useRef(null);

  const crop = getCropById(selectedCrop) || CROPS[0];
  const cropDisplayName = crop ? getCropName(crop, language) : '';
  const symptoms = crop ? getCropSymptoms(crop, language) : [];
  const preventiveText = crop ? getCropText(crop, 'preventive', language) : '';

  // Handle image selection
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError('');
    setChecked(false);
    setSelectedSymptom(null);
    setSavedToJournal(false);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setImageError(
        language === 'te'
          ? 'దయచేసి సరైన ఫోటో ఫైల్ (JPG లేదా PNG) ఎంచుకోండి.'
          : language === 'hi'
          ? 'कृपया वैध फोटो फाइल (JPG या PNG) चुनें।'
          : 'Please select a valid image file (JPG or PNG).'
      );
      return;
    }

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setImageError(
        language === 'te'
          ? 'ఫోటో పరిమాణం 8MB కంటే తక్కువగా ఉండాలి.'
          : language === 'hi'
          ? 'फोटो 8MB से छोटी होनी चाहिए।'
          : 'Photo size must be under 8MB.'
      );
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result);
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  }

  // Handle capture from live camera stream
  function handleCameraCapture(file, dataUrl) {
    setIsCameraOpen(false);
    setImageError('');
    setChecked(false);
    setSelectedSymptom(null);
    setSavedToJournal(false);
    setImageFile(
      file || {
        name: `crop-camera-${Date.now()}.jpg`,
        size: Math.round(dataUrl.length * 0.75),
      }
    );
    setImagePreview(dataUrl);
  }

  // Remove / replace image
  function handleClearImage() {
    setImageFile(null);
    setImagePreview(null);
    setImageError('');
    setIsCameraOpen(false);
    setChecked(false);
    setSelectedSymptom(null);
    setSavedToJournal(false);
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  }

  // Reopen real camera on retake
  function handleRetake() {
    handleClearImage();
    setIsCameraOpen(true);
  }

  // Execute check
  function handlePerformCheck() {
    if (!imagePreview) {
      setImageError(
        language === 'te'
          ? 'ముందుగా పంట ఆకు లేదా మొక్క భాగాన్ని ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.'
          : language === 'hi'
          ? 'कृपया पहले फसल की पत्ती या पौधे की फोटो लें या अपलोड करें।'
          : 'Please capture or upload a clear photo of the leaf or plant part first.'
      );
      return;
    }
    setImageError('');
    setChecked(true);
  }

  // Save to local Photo Journal
  function handleAddToJournal() {
    if (!imagePreview) return;
    const entry = {
      id: uid('photo'),
      cropId: selectedCrop,
      cropName: cropDisplayName,
      date: todayISO(),
      imageData: imagePreview,
      note: journalNote.trim() || `${cropDisplayName} health check observation`,
      matchedSymptom: selectedSymptom?.sign || null,
    };

    onSaveToJournal?.(entry);
    setSavedToJournal(true);
    if (toast) {
      toast(
        language === 'te'
          ? 'ఫోటో మీ పరికరంలోని ఫోటో డైరీలో భద్రపరచబడింది!'
          : language === 'hi'
          ? 'फोटो डायरी में सुरक्षित की गई!'
          : 'Photo saved to your local Farm Journal!',
        'success'
      );
    }
  }

  return (
    <div className="check-my-crop card" style={{ maxWidth: '850px', margin: '0 auto', padding: '1.25rem' }}>
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0, fontSize: '1.35rem' }}>
            🔍 {language === 'te' ? 'నా పంట ఆరోగ్యం తనిఖీ (Check My Crop)' : language === 'hi' ? 'मेरी फसल की जांच (Check My Crop)' : 'Check My Crop Health'}
          </h2>
          <DataStatusBadge status="educational" language={language} compact />
        </div>
        <p className="muted" style={{ margin: '6px 0 0', fontSize: '0.9rem', lineHeight: 1.5 }}>
          {language === 'te'
            ? 'మీ పంట ఆకు లేదా కాండం ఫోటోను పరిశీలించి, విశ్వసనీయ వ్యవసాయ శాస్త్ర లక్షణాలతో సరిపోల్చండి. ఫోటో మీ ఫోన్‌లోనే సురక్షితంగా ఉంటుంది.'
            : language === 'hi'
            ? 'अपनी फसल की पत्ती या पौधे की फोटो लेकर प्रामाणिक लक्षणों से मिलान करें। आपकी फोटो आपके फोन में सुरक्षित रहती है।'
            : 'Capture a photo of affected leaves or stems to compare against verified agronomic symptoms. All photos stay private on your device.'}
        </p>
      </div>

      {/* ─── Step 1: Select Crop ─────────────────────────────────────── */}
      <div style={{ marginBottom: '1.25rem' }}>
        <FormField
          id="cmc-crop-select"
          label={language === 'te' ? '1. పంటను ఎంచుకోండి:' : language === 'hi' ? '1. फसल चुनें:' : '1. Select Crop:'}
          as="select"
          value={selectedCrop}
          onChange={(e) => {
            setSelectedCrop(e.target.value);
            setChecked(false);
            setSelectedSymptom(null);
          }}
        >
          {CROPS.map((c) => (
            <option key={c.id} value={c.id}>
              {getCropName(c, language)} ({c.names?.en})
            </option>
          ))}
        </FormField>
      </div>

      {/* ─── Step 2: Capture / Upload Photo ─────────────────────────── */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.4rem' }}>
          {language === 'te' ? '2. స్పష్టమైన ఫోటోను తీయండి లేదా అప్‌లోడ్ చేయండి:' : language === 'hi' ? '2. साफ फोटो खींचें या अपलोड करें:' : '2. Capture or Upload a Clear Photo:'}
        </label>

        {/* Quality guidance pill banner */}
        <div
          style={{
            background: 'var(--surface-2)',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '0.75rem',
            lineHeight: 1.5,
          }}
        >
          💡 <strong>{language === 'te' ? 'మంచి ఫోటో కోసం సలహా:' : language === 'hi' ? 'अच्छी फोटो के लिए सुझाव:' : 'Photo quality tips:'}</strong>{' '}
          {language === 'te'
            ? 'పగటి వెలుతురులో, ఆకుపై మచ్చలు లేదా తెగులు లక్షణాలు స్పష్టంగా కనిపించేలా దగ్గరగా ఫోటో తీయండి. నీడలు లేదా బ్లర్ లేకుండా చూడండి.'
            : language === 'hi'
            ? 'अच्छी रोशनी में पत्तियों पर लगे धब्बे या कीड़े के पास से फोटो लें। फोटो धुंधली नहीं होनी चाहिए।'
            : 'Take close-up photos in natural daylight. Ensure disease spots, leaf curl, or pests are sharp and in focus.'}
        </div>

        {/* Dedicated gallery / file picker input (standard file picker, NO capture attribute) */}
        <input
          id="cmc-gallery-input"
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Live getUserMedia camera interface */}
        {isCameraOpen && (
          <CameraCapture
            language={language}
            onCapture={handleCameraCapture}
            onCancel={() => setIsCameraOpen(false)}
            onOpenGallery={() => galleryInputRef.current?.click()}
          />
        )}

        {/* Action buttons if no image yet and camera not open */}
        {!imagePreview && !isCameraOpen ? (
          <div className="row" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button
              id="cmc-take-photo-btn"
              type="button"
              variant="primary"
              onClick={() => {
                setImageError('');
                setIsCameraOpen(true);
              }}
            >
              📷 {language === 'te' ? 'కెమెరాతో ఫోటో తీయి' : language === 'hi' ? 'कैमरा से फोटो लें' : 'Take Photo (Camera)'}
            </Button>
            <Button
              id="cmc-upload-gallery-btn"
              type="button"
              variant="secondary"
              onClick={() => galleryInputRef.current?.click()}
            >
              📁 {language === 'te' ? 'గ్యాలరీ నుండి ఎంచుకో' : language === 'hi' ? 'गैलरी से चुनें' : 'Upload from Gallery'}
            </Button>
          </div>
        ) : null}

        {imagePreview && !isCameraOpen && (
          /* Image Preview Card */
          <div
            style={{
              border: '2px dashed var(--border)',
              borderRadius: '14px',
              padding: '1rem',
              background: 'var(--surface-2)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '180px',
                  height: '140px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#000',
                  flexShrink: 0,
                }}
              >
                <img
                  src={imagePreview}
                  alt="Crop preview"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ flex: '1 1 200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Badge tone="low">✓ {language === 'te' ? 'ఫోటో లోడ్ అయింది' : language === 'hi' ? 'फोटो तैयार' : 'Photo Loaded'}</Badge>
                  <DataStatusBadge status="saved-device" language={language} compact />
                </div>
                <p className="muted" style={{ margin: '0 0 0.75rem', fontSize: '0.85rem' }}>
                  {imageFile?.name || 'crop-photo.jpg'} ({Math.round((imageFile?.size || 0) / 1024)} KB)
                </p>

                <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Button size="sm" variant="secondary" onClick={handleRetake}>
                    🔄 {language === 'te' ? 'మరో ఫోటో తీయి' : language === 'hi' ? 'दूसरी फोटो लें' : 'Retake'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleClearImage}>
                    ✕ {language === 'te' ? 'తొలగించు' : language === 'hi' ? 'हटाएं' : 'Remove'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {imageError && (
          <p className="notice error" style={{ marginTop: '0.75rem' }}>
            {imageError}
          </p>
        )}
      </div>

      {/* ─── Step 3: Privacy & Check Button ─────────────────────────── */}
      <div
        style={{
          background: 'var(--surface-2)',
          padding: '0.85rem 1rem',
          borderRadius: '12px',
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🔒</span>
          <div style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
            <strong>{language === 'te' ? 'గోప్యతా హామీ:' : language === 'hi' ? 'गोपनीयता सुरक्षा:' : 'Privacy Protection:'}</strong>{' '}
            {language === 'te'
              ? 'ఈ ఫోటో మీ బ్రౌజర్/పరికరంలో మాత్రమే ఉంటుంది. మీ అనుమతి లేకుండా బయటి సర్వర్‌కు వెళ్లదు.'
              : language === 'hi'
              ? 'यह फोटो केवल आपके फोन में सुरक्षित है। बिना अनुमति किसी सर्वर पर नहीं भेजी जाती।'
              : 'This photo stays strictly on your local device. It is never uploaded without explicit consent.'}
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={handlePerformCheck}
          disabled={!imagePreview}
        >
          🔍 {language === 'te' ? 'లక్షణాలు సరిపోల్చు' : language === 'hi' ? 'लक्षण जांचें' : 'Compare Symptoms'}
        </Button>
      </div>

      {/* ─── Step 4: Results & Honest Model Guidance ─────────────────── */}
      {checked && (
        <div
          className="check-result-box"
          style={{
            border: '2px solid var(--primary)',
            borderRadius: '14px',
            padding: '1.25rem',
            background: 'var(--surface)',
            marginTop: '1.25rem',
          }}
        >
          {/* Honest AI Boundary Notice */}
          <div
            className="notice info"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <DataStatusBadge status="educational" language={language} compact />
              <strong>
                {language === 'te'
                  ? 'శాస్త్రీయ పరిశీలన సమాచారం'
                  : language === 'hi'
                  ? 'वैज्ञानिक मार्गदर्शन जानकारी'
                  : 'Diagnostic Notice & Model Boundary'}
              </strong>
            </div>
            <div style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>
              {language === 'te'
                ? 'గమనిక: ఈ వెబ్ యాప్‌లో స్వయంచాలక కృత్రిమ మేధ (AI) రోగ నిర్ధారణ అందుబాటులో లేదు. మీ ఫోటోను నిపుణులు ధృవీకరించిన కింది లక్షణాల జాబితాతో సరిపోల్చుకుని సలహాలను పాటించండి.'
                : language === 'hi'
                ? 'सूचना: इस डिवाइस पर स्वचालित एआई रोग निदान उपलब्ध नहीं है। अपनी फोटो को नीचे दिए गए प्रमाणित कृषि लक्षणों से मिलाकर सही उपाय चुनें।'
                : 'Note: Automated on-device AI disease prediction is not active. Compare your photo against the verified agronomic symptoms below for guided advice.'}
            </div>
          </div>

          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem' }}>
            📋 {cropDisplayName} — {language === 'te' ? 'సాధారణ తెగుళ్లు మరియు నివారణా పద్ధతులు:' : language === 'hi' ? 'प्रमुख रोग व लक्षण:' : 'Known Symptoms & Management:'}
          </h3>

          {/* Interactive Symptoms Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '1rem 0' }}>
            {symptoms.map((sym, idx) => {
              const isMatch = selectedSymptom?.sign === sym.sign;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSymptom(sym)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: isMatch ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: isMatch ? 'var(--surface-2)' : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: 'var(--text)' }}>
                      🔴 {sym.sign}
                    </strong>
                    {isMatch && <Badge tone="high">{language === 'te' ? 'ఎంపికైంది' : language === 'hi' ? 'चुना हुआ' : 'Selected'}</Badge>}
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <strong>{language === 'te' ? 'కారణం / నివారణ:' : language === 'hi' ? 'कारण व उपचार:' : 'Possible Cause & Remedy:'}</strong>{' '}
                    {sym.possible}
                  </p>
                </div>
              );
            })}
          </div>

          {/* General Preventive Advice */}
          {preventiveText && (
            <div style={{ background: 'var(--surface-2)', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
              <h4 style={{ margin: '0 0 6px', color: 'var(--primary)', fontSize: '0.95rem' }}>
                🛡️ {language === 'te' ? 'సాధారణ నివారణ చర్యలు:' : language === 'hi' ? 'सामान्य बचाव के उपाय:' : 'General Preventive Measures:'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{preventiveText}</p>
            </div>
          )}

          {/* Disclaimer Banner */}
          <div className="notice warning" style={{ fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            ⚠️ <strong>{t?.('common.disclaimer') || 'Disclaimer:'}</strong>{' '}
            {language === 'te'
              ? 'ఇది కేవలం ప్రాథమిక అవగాహన కోసం మాత్రమే. రసాయనిక మందులు వాడే ముందు స్థానిక రైతు భరోసా కేంద్రం లేదా వ్యవసాయ విస్తరణ అధికారి సలహా తీసుకోండి.'
              : language === 'hi'
              ? 'यह केवल शैक्षिक मार्गदर्शन है, पेशेवर निदान नहीं। रासायनिक छिड़काव से पहले कृषि अधिकारी से सलाह लें।'
              : 'This is educational guidance, not a professional agricultural diagnosis. Consult your local agriculture extension officer or KVK before purchasing chemical treatments.'}
          </div>

          {/* Save to Farm Photo Journal */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <h4 style={{ margin: 0 }}>
              📸 {language === 'te' ? 'ఈ ఫోటోను మీ ఫోటో డైరీలో భద్రపరచండి:' : language === 'hi' ? 'इस फोटो को फोटो डायरी में जोड़ें:' : 'Save Photo to Your Farm Journal:'}
            </h4>

            <FormField
              id="cmc-note"
              label={language === 'te' ? 'గమనిక (ఐచ్ఛికం)' : language === 'hi' ? 'टिप्पणी (वैकल्पिक)' : 'Observation Note (optional)'}
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder={language === 'te' ? 'ఉదా: ఉత్తరం వైపు చేనులో ఆకులపై కనిపించిన మచ్చలు...' : 'e.g. Leaf spot noticed on row 4 after heavy rain...'}
            />

            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Button
                type="button"
                variant={savedToJournal ? 'secondary' : 'primary'}
                onClick={handleAddToJournal}
                disabled={savedToJournal}
              >
                {savedToJournal
                  ? (language === 'te' ? '✓ డైరీలో భద్రపరచబడింది' : language === 'hi' ? '✓ डायरी में सुरक्षित' : '✓ Saved to Farm Journal')
                  : (language === 'te' ? '💾 డైరీలో భద్రపరచు' : language === 'hi' ? '💾 फोटो डायरी में सेव करें' : '💾 Save to Photo Journal')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
