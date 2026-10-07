import FormField from '../../components/FormField.jsx';
import Badge from '../../components/Badge.jsx';
import DataStatusBadge from '../../components/DataStatusBadge.jsx';
import { SAMPLE_DISTRICTS, getLocalizedWeather } from '../../data/weather.js';

export default function WeatherTab({ district, setDistrict, language = 'en' }) {
  // getLocalizedWeather returns plain strings — safe to render directly
  const weather = getLocalizedWeather(district, language);

  return (
    <div>
      <div className="notice info" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <DataStatusBadge type="sample" />
        <span>
          {language === 'te'
            ? 'ఇది నమూనా వాతావరణ డేటా మాత్రమే. నిజమైన లైవ్ డేటా కాదు.'
            : language === 'hi'
            ? 'यह केवल नमूना डेटा है। यह लाइव मौसम जानकारी नहीं है।'
            : 'Sample demonstration data. This is not live weather.'}
        </span>
      </div>

      <FormField
        id="district"
        label={language === 'te' ? 'జిల్లా ఎంచుకోండి' : language === 'hi' ? 'जिला चुनें' : 'District (sample set)'}
        as="select"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      >
        {SAMPLE_DISTRICTS.map((d) => (
          <option key={d.id} value={d.en}>
            {d[language] || d.en}
          </option>
        ))}
      </FormField>

      <div className="grid-4">
        <article className="card">
          <h3>{language === 'te' ? 'ఉష్ణోగ్రత' : language === 'hi' ? 'तापमान' : 'Temperature'}</h3>
          <p className="stat-value">{weather.temperature}°C</p>
        </article>
        <article className="card">
          <h3>{language === 'te' ? 'వర్షపాతం' : language === 'hi' ? 'वर्षा' : 'Rainfall'}</h3>
          <p className="stat-value">{weather.rainfall} mm</p>
        </article>
        <article className="card">
          <h3>{language === 'te' ? 'తేమ శాతం' : language === 'hi' ? 'नमी' : 'Humidity'}</h3>
          <p className="stat-value">{weather.humidity}%</p>
        </article>
        <article className="card">
          <h3>{language === 'te' ? 'స్థితి' : language === 'hi' ? 'स्थिति' : 'Condition'}</h3>
          <p>{weather.condition}</p>
        </article>
      </div>

      <h3>{language === 'te' ? 'వ్యవసాయ సలహా' : language === 'hi' ? 'कृषि सुझाव' : 'Farming tip (sample)'}</h3>
      <p>{weather.tips}</p>

      <h3>{language === 'te' ? 'వాతావరణ అప్రమత్తత సందేశాలు' : language === 'hi' ? 'मौसम चेतावनियां' : 'Weather Alerts'}</h3>
      {weather.alerts.map((a, idx) => {
        const typeLabel =
          language === 'te'
            ? (a.type === 'heat' ? 'ఎండ తీవ్రత' : a.type === 'rain' ? 'వర్షం' : a.type === 'wind' ? 'ఈదురు గాలులు' : 'హెచ్చరిక')
            : language === 'hi'
            ? (a.type === 'heat' ? 'गर्मी' : a.type === 'rain' ? 'बारिश' : a.type === 'wind' ? 'तेज हवा' : 'चेतावनी')
            : a.type;
        return (
          <p key={`${a.title}-${idx}`} className={`notice ${a.type === 'heat' ? 'warning' : 'info'}`}>
            <Badge tone={a.type === 'heat' ? 'high' : 'medium'}>{typeLabel}</Badge>{' '}
            <strong>{a.title}:</strong> {a.text}
          </p>
        );
      })}
    </div>
  );
}
