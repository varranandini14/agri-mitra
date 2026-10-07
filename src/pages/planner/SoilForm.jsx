import FormField from '../../components/FormField.jsx';
import Button from '../../components/Button.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import DataStatusBadge from '../../components/DataStatusBadge.jsx';
import { CROPS, getCropName } from '../../data/crops.js';
import { formatDate, todayISO, uid } from '../../utils/format.js';
import { validateSoil } from '../../utils/validation.js';
import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext.jsx';

const EMPTY = {
  ph: '',
  testDate: todayISO(),
  soilType: 'Loam',
  n: '',
  p: '',
  k: '',
  crop: '',
  notes: '',
};

const SOIL_TYPES = [
  { id: 'Loam', en: 'Loam', te: 'ఎర్ర నేల / లోమ్ (Loam)', hi: 'दोमट मिट्टी (Loam)' },
  { id: 'Clay', en: 'Clay', te: 'బంకమట్టి నేల (Clay)', hi: 'चिकनी मिट्टी (Clay)' },
  { id: 'Sandy', en: 'Sandy', te: 'ఇసుక నేల (Sandy)', hi: 'बलुई मिट्टी (Sandy)' },
  { id: 'Silt', en: 'Silt', te: 'ఒండ్రు నేల (Silt)', hi: 'गाद / जलोढ़ मिट्टी (Silt)' },
  { id: 'Black cotton', en: 'Black cotton', te: 'నల్లరేగడి నేల (Black Cotton)', hi: 'काली कपास मिट्टी (Black cotton)' },
  { id: 'Laterite', en: 'Laterite', te: 'లేటరైట్ నేల (Laterite)', hi: 'लैटेराइट मिट्टी (Laterite)' },
];

export default function SoilForm({ records, setRecords, logActivity, toast }) {
  const { language = 'en', t } = useAppData();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  function change(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submit() {
    const next = validateSoil(form);
    setErrors(next);
    if (Object.keys(next).length) {
      toast(language === 'te' ? 'దయచేసి భూసార ఫారమ్‌ను సరిగ్గా నింపండి.' : language === 'hi' ? 'कृपया मिट्टी फॉर्म सही भरें।' : 'Please fix the soil form.', 'error');
      return;
    }
    if (editId) {
      setRecords((prev) => prev.map((r) => (r.id === editId ? { ...r, ...form } : r)));
      toast(language === 'te' ? 'భూసార రికార్డు సవరించబడింది.' : language === 'hi' ? 'मिट्टी रिकॉर्ड अपडेट किया गया।' : 'Soil record updated.', 'success');
      setEditId(null);
    } else {
      setRecords((prev) => [{ id: uid('soil'), ...form }, ...prev]);
      logActivity('Added a soil notebook entry');
      toast(language === 'te' ? 'భూసార రికార్డు భద్రపరచబడింది.' : language === 'hi' ? 'मिट्टी रिकॉर्ड सुरक्षित किया गया।' : 'Soil record saved.', 'success');
    }
    setForm({ ...EMPTY, testDate: todayISO() });
  }

  function getLocalizedSoilTypeName(typeId) {
    const st = SOIL_TYPES.find((s) => s.id === typeId || s.en === typeId);
    return st ? (st[language] || st.en) : typeId;
  }

  return (
    <div className="grid-2">
      <article className="card paper-card">
        <p className="hand-label">
          {language === 'te' ? 'భూసార పరీక్ష డైరీ' : language === 'hi' ? 'मिट्टी स्वास्थ्य डायरी' : 'Soil notebook'}
        </p>
        <div className="notice info" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DataStatusBadge type="estimate" />
            <strong>{t('common.disclaimer')}</strong>
          </div>
          <div>
            {language === 'te'
              ? 'గమనిక: ఇది మీ అవగాహన కోసం మాత్రమే. పూర్తి మోతాదుల కోసం అధికారిక ల్యాబ్ భూసార పరీక్ష కార్డు (Soil Health Card) పాటించండి.'
              : language === 'hi'
              ? 'शैक्षिक मार्गदर्शन मात्र। सटीक मात्रा के लिए सरकारी मृदा स्वास्थ्य कार्ड (Soil Health Card) का पालन करें।'
              : 'Educational notes only. Never decide a crop is suitable from pH alone. Get a professional soil test.'}
          </div>
        </div>
        <FormField
          id="ph"
          label={language === 'te' ? 'నేల pH విలువ (0–14)' : language === 'hi' ? 'मिट्टी का pH (0–14)' : 'pH (0–14)'}
          type="number"
          min="0"
          max="14"
          step="0.1"
          value={form.ph}
          error={errors.ph}
          onChange={(e) => change('ph', e.target.value)}
        />
        <FormField
          id="testDate"
          label={language === 'te' ? 'పరీక్షించిన తేదీ' : language === 'hi' ? 'जांच की तारीख' : 'Test date'}
          type="date"
          value={form.testDate}
          error={errors.testDate}
          onChange={(e) => change('testDate', e.target.value)}
        />
        <FormField
          id="soilType"
          label={language === 'te' ? 'నేల రకం' : language === 'hi' ? 'मिट्टी का प्रकार' : 'Soil type'}
          as="select"
          value={form.soilType}
          error={errors.soilType}
          onChange={(e) => change('soilType', e.target.value)}
        >
          {SOIL_TYPES.map((s) => (
            <option key={s.id} value={s.id}>
              {s[language] || s.en}
            </option>
          ))}
        </FormField>
        <div className="grid-3">
          <FormField
            id="n"
            label={language === 'te' ? 'నత్రజని N (ఐచ్ఛికం)' : language === 'hi' ? 'नाइट्रोजन N (वैकल्पिक)' : 'N (optional note)'}
            value={form.n}
            onChange={(e) => change('n', e.target.value)}
          />
          <FormField
            id="p"
            label={language === 'te' ? 'భాస్వరం P (ఐచ్ఛికం)' : language === 'hi' ? 'फास्फोरस P (वैकल्पिक)' : 'P (optional)'}
            value={form.p}
            onChange={(e) => change('p', e.target.value)}
          />
          <FormField
            id="k"
            label={language === 'te' ? 'పొటాష్ K (ఐచ్ఛికం)' : language === 'hi' ? 'पोटाश K (वैकल्पिक)' : 'K (optional)'}
            value={form.k}
            onChange={(e) => change('k', e.target.value)}
          />
        </div>
        <FormField
          id="soil-crop"
          label={language === 'te' ? 'సంబంధిత పంట' : language === 'hi' ? 'संबंधित फसल' : 'Related crop'}
          as="select"
          value={form.crop}
          onChange={(e) => change('crop', e.target.value)}
        >
          <option value="">{language === 'te' ? '-- ఎంచుకోలేదు --' : language === 'hi' ? '-- नहीं चुना --' : 'Not set'}</option>
          {CROPS.map((c) => (
            <option key={c.id} value={getCropName(c, 'en')}>
              {getCropName(c, language)}
            </option>
          ))}
        </FormField>
        <FormField
          id="soil-notes"
          label={language === 'te' ? 'గమనికలు / సలహాలు' : language === 'hi' ? 'नोट्स / सुझाव' : 'Notes'}
          as="textarea"
          value={form.notes}
          onChange={(e) => change('notes', e.target.value)}
        />
        <Button onClick={submit}>
          {editId
            ? (language === 'te' ? 'రికార్డును సవరించు' : language === 'hi' ? 'रिकॉर्ड अपडेट करें' : 'Update record')
            : (language === 'te' ? 'భూసార రికార్డును భద్రపరచు' : language === 'hi' ? 'मिट्टी रिकॉर्ड सुरक्षित करें' : 'Save soil record')}
        </Button>
      </article>
      <div>
        {records.length === 0 ? (
          <EmptyState
            title={language === 'te' ? 'భూసార రికార్డులు లేవు' : language === 'hi' ? 'कोई मिट्टी रिकॉर्ड नहीं' : 'No soil records'}
            text={language === 'te' ? 'మీ భూసార పరీక్ష రిపోర్టు వివరాలు ఇక్కడ నమోదు చేసుకోండి.' : language === 'hi' ? 'अपनी मृदा जांच पर्ची से pH और मिट्टी का प्रकार दर्ज करें।' : 'Save a pH and soil type from your lab slip.'}
          />
        ) : (
          records.map((r) => (
            <article key={r.id} className="card" style={{ marginBottom: 10 }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h3 style={{ margin: 0 }}>
                  pH {r.ph} · {getLocalizedSoilTypeName(r.soilType)}
                </h3>
                <DataStatusBadge type="farmer-entered" size="sm" />
              </div>
              <p className="muted">
                {formatDate(r.testDate)} · {r.crop || (language === 'te' ? 'పంటను పేర్కొనలేదు' : language === 'hi' ? 'फसल नहीं चुनी' : 'No crop tagged')}
              </p>
              <p>N: {r.n || '—'} · P: {r.p || '—'} · K: {r.k || '—'}</p>
              {r.notes && <p>{r.notes}</p>}
              <div className="row">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditId(r.id);
                    setForm(r);
                  }}
                >
                  {t('common.edit')}
                </Button>
                <Button variant="danger" size="sm" onClick={() => setDeleteId(r.id)}>
                  {t('common.delete')}
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
      {deleteId ? (
        <ConfirmDialog
          title={language === 'te' ? 'భూసార రికార్డును తొలగించు' : language === 'hi' ? 'मिट्टी रिकॉर्ड हटाएं' : 'Delete Soil Record'}
          message={language === 'te' ? 'మీరు ఖచ్చితంగా ఈ భూసార రికార్డును తొలగించాలనుకుంటున్నారా?' : language === 'hi' ? 'क्या आप वाकई इस मिट्टी रिकॉर्ड को हटाना चाहते हैं?' : 'Delete this soil record?'}
          confirmLabel={t('common.delete')}
          cancelLabel={t('common.cancel')}
          danger
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            setRecords((prev) => prev.filter((r) => r.id !== deleteId));
            setDeleteId(null);
            toast(language === 'te' ? 'భూసార రికార్డు తొలగించబడింది.' : language === 'hi' ? 'मिट्टी रिकॉर्ड हटाया गया।' : 'Soil record deleted.', 'success');
          }}
        />
      ) : null}
    </div>
  );
}
