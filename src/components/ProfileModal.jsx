import { useState } from 'react';
import Modal from './Modal.jsx';
import FormField from './FormField.jsx';
import Button from './Button.jsx';
import { INDIAN_STATES, CROPS, getCropName } from '../data/crops.js';
import { validateProfile } from '../utils/validation.js';
import { useAppData } from '../context/AppDataContext.jsx';
import { useToast } from './Toast.jsx';

export default function ProfileModal({ onClose }) {
  const { profile, setProfile, setSelectedCropId, logActivity, language = 'en', t } = useAppData();
  const toast = useToast();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function save(e) {
    e.preventDefault();
    const nextErrors = validateProfile(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast(
        language === 'te'
          ? 'దయచేసి హైలైట్ చేసిన ఖాళీలను సరిగ్గా నింపండి.'
          : language === 'hi'
          ? 'कृपया हाइलाइट किए गए फ़ील्ड सही भरें।'
          : 'Please fix the highlighted fields.',
        'error'
      );
      return;
    }
    setProfile(form);
    if (form.mainCropId) setSelectedCropId(form.mainCropId);
    logActivity(`Profile updated for ${form.name}`);
    toast(
      language === 'te'
        ? 'ప్రొఫైల్ ఈ పరికరంలో భద్రపరచబడింది.'
        : language === 'hi'
        ? 'प्रोफाइल इस डिवाइस पर सुरक्षित की गई।'
        : 'Profile saved on this device.',
      'success'
    );
    onClose();
  }

  return (
    <Modal
      title={language === 'te' ? 'రైతు ప్రొఫైల్' : language === 'hi' ? 'किसान प्रोफाइल' : 'Farmer profile'}
      onClose={onClose}
    >
      <p className="muted">
        {language === 'te'
          ? 'నమస్తే! మీ వివరాలు కేవలం మీ ఫోన్/కంప్యూటర్‌లో మాత్రమే భద్రంగా ఉంటాయి.'
          : language === 'hi'
          ? 'नमस्ते! आपकी जानकारी केवल इस ब्राउज़र में रहती है।'
          : 'Namaste, Kisan Mitra — this stays only in your browser.'}
      </p>
      <form onSubmit={save}>
        <FormField
          id="name"
          label={language === 'te' ? 'మీ పేరు' : language === 'hi' ? 'आपका नाम' : 'Your name'}
          value={form.name}
          error={errors.name}
          onChange={(e) => update('name', e.target.value)}
        />
        <FormField
          id="village"
          label={language === 'te' ? 'గ్రామం / పట్టణం' : language === 'hi' ? 'गांव / कस्बा' : 'Village / district town'}
          value={form.village}
          onChange={(e) => update('village', e.target.value)}
        />
        <FormField
          id="district"
          label={language === 'te' ? 'జిల్లా' : language === 'hi' ? 'जिला' : 'District'}
          value={form.district}
          onChange={(e) => update('district', e.target.value)}
        />
        <FormField
          id="state"
          label={language === 'te' ? 'రాష్ట్రం' : language === 'hi' ? 'राज्य' : 'State'}
          as="select"
          value={form.state}
          error={errors.state}
          required
          onChange={(e) => update('state', e.target.value)}
        >
          <option value="">
            {language === 'te' ? '-- రాష్ట్రాన్ని ఎంచుకోండి --' : language === 'hi' ? '-- राज्य चुनें --' : 'Select state'}
          </option>
          {INDIAN_STATES.map((s) => (
            <option key={s.id} value={s.en}>
              {s[language] || s.en}
            </option>
          ))}
        </FormField>
        <div className="grid-2">
          <FormField
            id="farmArea"
            label={language === 'te' ? 'సాగు విస్తీర్ణం' : language === 'hi' ? 'खेती का रकबा' : 'Farm area'}
            type="number"
            min="0"
            step="0.01"
            value={form.farmArea}
            error={errors.farmArea}
            onChange={(e) => update('farmArea', e.target.value)}
          />
          <FormField
            id="areaUnit"
            label={language === 'te' ? 'కొలత యూనిట్' : language === 'hi' ? 'इकाई' : 'Unit'}
            as="select"
            value={form.areaUnit}
            onChange={(e) => update('areaUnit', e.target.value)}
          >
            <option value="acres">{t('common.acres')}</option>
            <option value="hectares">{t('common.hectares')}</option>
          </FormField>
        </div>
        <FormField
          id="mainCropId"
          label={language === 'te' ? 'ప్రధాన పంట' : language === 'hi' ? 'मुख्य फसल' : 'Main crop'}
          as="select"
          value={form.mainCropId}
          onChange={(e) => update('mainCropId', e.target.value)}
        >
          <option value="">
            {language === 'te' ? '-- ఇంకా ఎంచుకోలేదు --' : language === 'hi' ? '-- अभी नहीं चुना --' : 'Not selected yet'}
          </option>
          {CROPS.map((c) => (
            <option key={c.id} value={c.id}>
              {getCropName(c, language)}
            </option>
          ))}
        </FormField>
        <div className="row">
          <Button type="submit">
            {language === 'te' ? 'ప్రొఫైల్ భద్రపరచు' : language === 'hi' ? 'प्रोफाइल सुरक्षित करें' : 'Save profile'}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
