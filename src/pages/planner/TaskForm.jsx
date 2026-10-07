import FormField from '../../components/FormField.jsx';
import Button from '../../components/Button.jsx';
import { CROPS, getCropName } from '../../data/crops.js';
import { todayISO } from '../../utils/format.js';
import { useAppData } from '../../context/AppDataContext.jsx';

export default function TaskForm({ form, errors, onChange, onSubmit, onCancel, isEdit }) {
  const { language = 'en', t } = useAppData();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <FormField
        id="t-name"
        label={t('planner.taskName')}
        value={form.name}
        error={errors.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <FormField
        id="t-crop"
        label={t('planner.cropName')}
        as="select"
        value={form.crop}
        onChange={(e) => onChange('crop', e.target.value)}
      >
        <option value="">{language === 'te' ? '-- సాధారణ పని / పంట లేదు --' : language === 'hi' ? '-- सामान्य कार्य / फसल नहीं --' : 'Any / not set'}</option>
        {CROPS.map((c) => (
          <option key={c.id} value={getCropName(c, 'en')}>
            {getCropName(c, language)}
          </option>
        ))}
      </FormField>
      <FormField
        id="t-date"
        label={t('planner.dueDate')}
        type="date"
        value={form.dueDate || todayISO()}
        error={errors.dueDate}
        onChange={(e) => onChange('dueDate', e.target.value)}
      />
      <FormField
        id="t-pri"
        label={t('planner.priority')}
        as="select"
        value={form.priority}
        onChange={(e) => onChange('priority', e.target.value)}
      >
        <option value="High">{t('common.high')}</option>
        <option value="Medium">{t('common.medium')}</option>
        <option value="Low">{t('common.low')}</option>
      </FormField>
      <FormField
        id="t-notes"
        label={t('planner.notes')}
        as="textarea"
        value={form.notes}
        onChange={(e) => onChange('notes', e.target.value)}
      />
      <div className="row">
        <Button type="submit">
          {isEdit ? t('planner.updateTaskBtn') : t('planner.addTaskBtn')}
        </Button>
        {onCancel ? (
          <Button variant="secondary" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
