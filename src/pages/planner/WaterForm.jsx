import { useState } from 'react';
import FormField from '../../components/FormField.jsx';
import Button from '../../components/Button.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import DataStatusBadge from '../../components/DataStatusBadge.jsx';
import { CROPS, getCropById, getCropName, getCropText } from '../../data/crops.js';
import { formatDate, todayISO, uid } from '../../utils/format.js';
import { validateIrrigation } from '../../utils/validation.js';
import { useAppData } from '../../context/AppDataContext.jsx';

const EMPTY = {
  crop: '',
  fieldName: '',
  date: todayISO(),
  method: 'Drip',
  quantity: '',
  notes: '',
};

const IRRIGATION_METHODS = [
  { id: 'Drip', en: 'Drip', te: 'బిందు సేద్యం (Drip)', hi: 'ड्रिप सिंचाई (Drip)' },
  { id: 'Sprinkler', en: 'Sprinkler', te: 'తుంపర సేద్యం (Sprinkler)', hi: 'स्प्रिंकलर (Sprinkler)' },
  { id: 'Flood', en: 'Flood', te: 'కాలువ / ముంచే పద్ధతి (Flood)', hi: 'बहाव / खुला पानी (Flood)' },
  { id: 'Furrow', en: 'Furrow', te: 'సాలు పద్ధతి (Furrow)', hi: 'नाली विधि (Furrow)' },
  { id: 'Rainfed', en: 'Rainfed / no irrigation', te: 'వర్షాధారం (Rainfed)', hi: 'बारिश आधारित (Rainfed)' },
];

export default function WaterForm({ records, setRecords, logActivity, toast }) {
  const { selectedCropId, language = 'en', t } = useAppData();
  const [form, setForm] = useState({ ...EMPTY, crop: getCropName(getCropById(selectedCropId), 'en') || '' });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const cropObj = CROPS.find((c) => getCropName(c, 'en') === form.crop);

  function change(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submit() {
    const next = validateIrrigation(form);
    setErrors(next);
    if (Object.keys(next).length) {
      toast(language === 'te' ? 'దయచేసి నీటి తడుల ఫారమ్‌ను సరిగ్గా నింపండి.' : language === 'hi' ? 'कृपया सिंचाई फॉर्म सही भरें।' : 'Please complete the irrigation form.', 'error');
      return;
    }
    if (editId) {
      setRecords((prev) => prev.map((r) => (r.id === editId ? { ...r, ...form } : r)));
      toast(language === 'te' ? 'నీటి తడుల రికార్డు సవరించబడింది.' : language === 'hi' ? 'सिंचाई रिकॉर्ड अपडेट किया गया।' : 'Irrigation record updated.', 'success');
      setEditId(null);
    } else {
      setRecords((prev) => [{ id: uid('irr'), ...form }, ...prev]);
      logActivity(`Logged irrigation on ${form.fieldName}`);
      toast(language === 'te' ? 'నీటి తడి రికార్డు భద్రపరచబడింది.' : language === 'hi' ? 'सिंचाई रिकॉर्ड सुरक्षित किया गया।' : 'Irrigation record saved.', 'success');
    }
    setForm({ ...EMPTY, date: todayISO(), crop: form.crop });
  }

  function getLocalizedMethodName(methodId) {
    const m = IRRIGATION_METHODS.find((item) => item.id === methodId || item.en === methodId);
    return m ? (m[language] || m.en) : methodId;
  }

  return (
    <div className="grid-2">
      <article className="card paper-card">
        <p className="hand-label">
          {language === 'te' ? 'నీటి తడుల నిర్వహణ' : language === 'hi' ? 'सिंचाई डायरी' : 'Irrigation log'}
        </p>
        <FormField
          id="w-crop"
          label={language === 'te' ? 'పంట' : language === 'hi' ? 'फसल' : 'Crop'}
          as="select"
          value={form.crop}
          error={errors.crop}
          onChange={(e) => change('crop', e.target.value)}
        >
          <option value="">{language === 'te' ? '-- పంటను ఎంచుకోండి --' : language === 'hi' ? '-- फसल चुनें --' : 'Select crop'}</option>
          {CROPS.map((c) => (
            <option key={c.id} value={getCropName(c, 'en')}>
              {getCropName(c, language)}
            </option>
          ))}
        </FormField>
        <FormField
          id="w-field"
          label={language === 'te' ? 'పొలం / మడి పేరు' : language === 'hi' ? 'खेत का नाम / नंबर' : 'Field name'}
          value={form.fieldName}
          error={errors.fieldName}
          onChange={(e) => change('fieldName', e.target.value)}
        />
        <FormField
          id="w-date"
          label={language === 'te' ? 'తడి ఇచ్చిన తేదీ' : language === 'hi' ? 'सिंचाई की तारीख' : 'Date'}
          type="date"
          value={form.date}
          error={errors.date}
          onChange={(e) => change('date', e.target.value)}
        />
        <FormField
          id="w-method"
          label={language === 'te' ? 'సాగునీటి పద్ధతి' : language === 'hi' ? 'सिंचाई की विधि' : 'Method'}
          as="select"
          value={form.method}
          error={errors.method}
          onChange={(e) => change('method', e.target.value)}
        >
          {IRRIGATION_METHODS.map((m) => (
            <option key={m.id} value={m.id}>
              {m[language] || m.en}
            </option>
          ))}
        </FormField>
        <FormField
          id="w-qty"
          label={language === 'te' ? 'మోటార్ నడిపిన సమయం లేదా నీటి పరిమాణం' : language === 'hi' ? 'समय / पानी की मात्रा (वैकल्पिक)' : 'Duration or quantity (optional)'}
          value={form.quantity}
          onChange={(e) => change('quantity', e.target.value)}
        />
        <FormField
          id="w-notes"
          label={language === 'te' ? 'గమనికలు' : language === 'hi' ? 'नोट्स' : 'Notes'}
          as="textarea"
          value={form.notes}
          onChange={(e) => change('notes', e.target.value)}
        />
        {cropObj ? (
          <div className="notice info" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', margin: '0.75rem 0' }}>
            <DataStatusBadge status="educational" language={language} compact />
            <span>{getCropText(cropObj, 'irrigation', language)}</span>
          </div>
        ) : null}
        <Button onClick={submit}>
          {editId
            ? (language === 'te' ? 'రికార్డును సవరించు' : language === 'hi' ? 'रिकॉर्ड अपडेट करें' : 'Update record')
            : (language === 'te' ? 'నీటి రికార్డును భద్రపరచు' : language === 'hi' ? 'सिंचाई रिकॉर्ड सुरक्षित करें' : 'Save irrigation record')}
        </Button>
      </article>

      <div>
        {records.length === 0 ? (
          <EmptyState
            title={language === 'te' ? 'నీటి తడుల రికార్డులు లేవు' : language === 'hi' ? 'कोई सिंचाई रिकॉर्ड नहीं' : 'No irrigation records'}
            text={language === 'te' ? 'పొలానికి నీరు పెట్టిన తర్వాత ఇక్కడ సమయం మరియు తేదీని నమోదు చేయండి.' : language === 'hi' ? 'खेत में पानी देने के बाद यहां तारीख और समय दर्ज करें।' : 'Log a watering after you finish in the field.'}
          />
        ) : (
          records.map((r) => (
            <article key={r.id} className="card" style={{ marginBottom: 10 }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h3 style={{ margin: 0 }}>
                  {r.fieldName} · {getLocalizedMethodName(r.method)}
                </h3>
                <DataStatusBadge type="farmer-entered" size="sm" />
              </div>
              <p>
                {r.crop} · {formatDate(r.date)}
              </p>
              <p className="muted">
                {r.quantity || (language === 'te' ? 'సమయం నమోదు చేయలేదు' : language === 'hi' ? 'समय दर्ज नहीं' : 'No quantity noted')}
              </p>
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
          title={language === 'te' ? 'నీటి రికార్డును తొలగించు' : language === 'hi' ? 'सिंचाई रिकॉर्ड हटाएं' : 'Delete Irrigation Record'}
          message={language === 'te' ? 'మీరు ఖచ్చితంగా ఈ నీటి తడి రికార్డును తొలగించాలనుకుంటున్నారా?' : language === 'hi' ? 'क्या आप वाकई इस सिंचाई रिकॉर्ड को हटाना चाहते हैं?' : 'Delete this irrigation record?'}
          confirmLabel={t('common.delete')}
          cancelLabel={t('common.cancel')}
          danger
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            setRecords((prev) => prev.filter((r) => r.id !== deleteId));
            setDeleteId(null);
            toast(language === 'te' ? 'నీటి రికార్డు తొలగించబడింది.' : language === 'hi' ? 'सिंचाई रिकॉर्ड हटाया गया।' : 'Irrigation record deleted.', 'success');
          }}
        />
      ) : null}
    </div>
  );
}
