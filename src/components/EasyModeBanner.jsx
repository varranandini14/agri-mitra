import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext.jsx';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant.js';
import Button from './Button.jsx';
import Badge from './Badge.jsx';

export default function EasyModeBanner({ title, speakText, steps = [] }) {
  const { easyMode, setEasyMode, language, t } = useAppData();
  const { speak, isSpeaking, stopSpeaking } = useVoiceAssistant({ language });

  if (!easyMode) return null;

  function handleSpeak() {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const defaultText =
        language === 'te'
          ? 'రైతు సులభ మోడ్ ఆన్‌లో ఉంది. మీకు ఏ సహాయం కావాలో క్రింది బటన్లలో ఎంచుకోండి.'
          : language === 'hi'
          ? 'किसान सरल मोड चालू है। आपको जो जानकारी चाहिए, नीचे दिए गए विकल्पों में से चुनें।'
          : 'Farmer Easy Mode is active. Select any option below to get started.';
      speak(speakText || defaultText);
    }
  }

  return (
    <aside className="easy-mode-banner card no-print" aria-label="Farmer Easy Mode">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div className="row" style={{ alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>🌾</span>
          <div>
            <div className="row" style={{ alignItems: 'center', gap: '0.5rem' }}>
              <strong style={{ fontSize: '1.15rem', color: 'var(--primary)' }}>
                {t('easyModeView.badge')}
              </strong>
              <Badge tone="low">ON</Badge>
            </div>
            <p className="muted" style={{ margin: '0.15rem 0 0', fontSize: '0.85rem' }}>
              {t('header.easyModeDesc')}
            </p>
          </div>
        </div>

        <div className="row" style={{ gap: '0.5rem' }}>
          <Button
            size="sm"
            variant={isSpeaking ? 'danger' : 'primary'}
            onClick={handleSpeak}
            style={{ fontWeight: 700 }}
          >
            {isSpeaking ? '⏹ ' + t('common.stopReading') : '🔊 ' + t('common.readAloud')}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEasyMode(false)}
            title="Switch back to Standard Mode"
          >
            {t('header.easyModeOff')}
          </Button>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="easy-mode-steps" style={{ marginTop: '1rem', borderTop: '1px dashed var(--border)', paddingTop: '0.75rem' }}>
          <div className="grid-3" style={{ gap: '0.75rem' }}>
            {steps.map((st, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface-2)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>{st.icon}</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', display: 'block' }}>{st.label}</strong>
                  <span className="muted" style={{ fontSize: '0.8rem' }}>{st.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
