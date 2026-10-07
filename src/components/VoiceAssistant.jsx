import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext.jsx';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant.js';
import { useToast } from './Toast.jsx';
import Button from './Button.jsx';
import Modal from './Modal.jsx';
import Badge from './Badge.jsx';

export default function VoiceAssistant({ onReadPageSummary }) {
  const { language, setLanguage, easyMode, setEasyMode, t } = useAppData();
  const [open, setOpen] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  // ─── Localised lang label shown in the modal ──────────────────────────────
  function getLangLabel(lang) {
    if (lang === 'te') return 'తెలుగు (te-IN)';
    if (lang === 'hi') return 'हिन्दी (hi-IN)';
    return 'English (en-IN)';
  }

  // ─── Voice command handler ────────────────────────────────────────────────
  function handleVoiceCommand(spokenText) {
    setTranscriptText(spokenText);
    const lower = spokenText.toLowerCase();

    // 1. Crop Guide
    if (
      lower.includes('crop') ||
      lower.includes('crops') ||
      lower.includes('పంట') ||
      lower.includes('వరి') ||
      lower.includes('విత్తనం') ||
      lower.includes('फसल') ||
      lower.includes('खेती')
    ) {
      const msg =
        language === 'te'
          ? 'పంటల గైడ్ తెరుస్తున్నాము.'
          : language === 'hi'
          ? 'फसल गाइड खोल रहे हैं।'
          : 'Opening Crop Guide.';
      speak(msg);
      toast(msg, 'success');
      navigate('/crops');
      setOpen(false);
      return;
    }

    // 2. Market & Calculator
    if (
      lower.includes('market') ||
      lower.includes('price') ||
      lower.includes('mandi') ||
      lower.includes('profit') ||
      lower.includes('మార్కెట్') ||
      lower.includes('మండి') ||
      lower.includes('ధర') ||
      lower.includes('లాభం') ||
      lower.includes('मंडी') ||
      lower.includes('भाव') ||
      lower.includes('मुनाफा')
    ) {
      const msg =
        language === 'te'
          ? 'మార్కెట్ ధరలు మరియు లాభం కాలిక్యులేటర్ తెరుస్తున్నాము.'
          : language === 'hi'
          ? 'मंडी भाव और मुनाफा कैलकुलेटर खोल रहे हैं।'
          : 'Opening Market Prices and Calculator.';
      speak(msg);
      toast(msg, 'success');
      navigate('/market');
      setOpen(false);
      return;
    }

    // 3. Farm Planner
    if (
      lower.includes('planner') ||
      lower.includes('task') ||
      lower.includes('calendar') ||
      lower.includes('weather') ||
      lower.includes('soil') ||
      lower.includes('క్యాలెండర్') ||
      lower.includes('పనులు') ||
      lower.includes('వాతావరణం') ||
      lower.includes('నేల') ||
      lower.includes('प्लानर') ||
      lower.includes('काम') ||
      lower.includes('मौसम') ||
      lower.includes('मिट्टी')
    ) {
      const msg =
        language === 'te'
          ? 'రైతు క్యాలెండర్ తెరుస్తున్నాము.'
          : language === 'hi'
          ? 'खेत प्लानर खोल रहे हैं।'
          : 'Opening Farm Planner.';
      speak(msg);
      toast(msg, 'success');
      navigate('/planner');
      setOpen(false);
      return;
    }

    // 4. Schemes & Insurance
    if (
      lower.includes('scheme') ||
      lower.includes('schemes') ||
      lower.includes('insurance') ||
      lower.includes('subsidy') ||
      lower.includes('పథకాలు') ||
      lower.includes('బీమా') ||
      lower.includes('సబ్సిడీ') ||
      lower.includes('यoजना') ||
      lower.includes('बीमा')
    ) {
      const msg =
        language === 'te'
          ? 'ప్రభుత్వ పథకాలు మరియు బీమా పేజీ తెరుస్తున్నాము.'
          : language === 'hi'
          ? 'सरकारी योजनाएं खोल रहे हैं।'
          : 'Opening Government Schemes.';
      speak(msg);
      toast(msg, 'success');
      navigate('/schemes');
      setOpen(false);
      return;
    }

    // 5. Home Dashboard
    if (
      lower.includes('home') ||
      lower.includes('dashboard') ||
      lower.includes('హోమ్') ||
      lower.includes('డాష్') ||
      lower.includes('होम') ||
      lower.includes('शुरुआत')
    ) {
      const msg =
        language === 'te'
          ? 'హోమ్ పేజీకి వెళ్తున్నాము.'
          : language === 'hi'
          ? 'होम पेज खोल रहे हैं।'
          : 'Going to the Home page.';
      speak(msg);
      toast(msg, 'success');
      navigate('/');
      setOpen(false);
      return;
    }

    // 6. Easy Mode toggle
    if (
      lower.includes('easy') ||
      lower.includes('simple') ||
      lower.includes('సులభ') ||
      lower.includes('సరళ') ||
      lower.includes('आसान')
    ) {
      const nextMode = !easyMode;
      setEasyMode(nextMode);
      const msg = nextMode
        ? language === 'te'
          ? 'రైతు సులభ మోడ్ ఆన్ చేయబడింది.'
          : language === 'hi'
          ? 'किसान सरल मोड चालू किया गया।'
          : 'Farmer Easy Mode is now on.'
        : language === 'te'
        ? 'సాధారణ మోడ్‌కు మార్చబడింది.'
        : language === 'hi'
        ? 'सामान्य मोड चालू किया गया।'
        : 'Standard mode is now active.';
      speak(msg);
      toast(msg, 'info');
      setOpen(false);
      return;
    }

    // 7. Read page summary aloud
    if (
      lower.includes('read') ||
      lower.includes('speak') ||
      lower.includes('చదువు') ||
      lower.includes('వినండి') ||
      lower.includes('सुनाओ') ||
      lower.includes('पढ़ो')
    ) {
      if (onReadPageSummary) {
        onReadPageSummary();
      } else {
        const msg =
          language === 'te'
            ? 'అగ్రిమిత్ర రైతు స్నేహితుడు. మీరు పంటల గైడ్, మార్కెట్ ధరలు, మరియు పథకాల వివరాలు చదవగలరు.'
            : language === 'hi'
            ? 'एग्रीमित्र किसानों का मित्र है। आप फसल गाइड, मंडी भाव और योजनाओं की जानकारी पा सकते हैं।'
            : 'AgriMitra is your farming assistant. You can explore Crop Guide, Market Prices, and Government Schemes.';
        speak(msg);
      }
      setOpen(false);
      return;
    }

    // Unrecognised command
    const fallbackMsg =
      language === 'te'
        ? `మీరు "${spokenText}" అన్నారు. దయచేసి పంటలు, మార్కెట్, లేదా పథకాలు అని చెప్పండి.`
        : language === 'hi'
        ? `आपने कहा: "${spokenText}". कृपया फसल, मंडी या योजना बोलें।`
        : `Heard: "${spokenText}". Try saying Crop Guide, Market, or Schemes.`;
    speak(fallbackMsg);
    toast(fallbackMsg, 'info');
  }

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    startListening,
    isListening,
    supported,
    currentVoiceName,
    lastSpokenText,
  } = useVoiceAssistant({
    language,
    onCommand: handleVoiceCommand,
    toast,
  });

  function handleReadSummary() {
    if (onReadPageSummary) {
      onReadPageSummary();
    } else {
      const msg =
        language === 'te'
          ? 'అగ్రిమిత్రకు స్వాగతం. మీరు పంటల గైడ్ తెరవడానికి పంటలు అని, మార్కెట్ ధరలు తెలుసుకోవడానికి మార్కెట్ అని, మరియు ప్రభుత్వ పథకాలకు పథకాలు అని చెప్పవచ్చు.'
          : language === 'hi'
          ? 'एग्रीमित्र में आपका स्वागत है। फसल गाइड के लिए फसल बोलें, मंडी भाव के लिए मंडी बोलें, और योजनाओं के लिए योजना बोलें।'
          : 'Welcome to AgriMitra. Say Crops for the Crop Guide, Market for prices, or Schemes for government schemes.';
      speak(msg);
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating Action Button */}
      <div className="voice-floating-container no-print">
        <button
          type="button"
          className={`voice-fab ${isListening ? 'listening-pulse' : ''} ${isSpeaking ? 'speaking-pulse' : ''}`}
          onClick={() => setOpen(true)}
          aria-label={t('voiceAssistant.title')}
          title={t('voiceAssistant.title')}
        >
          <span style={{ fontSize: '1.4rem' }}>
            {isSpeaking ? '🔊' : isListening ? '🎙️' : '🗣️'}
          </span>
          <span className="voice-fab-label">
            {language === 'te' ? 'వాయిస్' : language === 'hi' ? 'बोलें' : 'Voice'}
          </span>
        </button>
      </div>

      {/* Voice Assistant Modal */}
      {open && (
        <Modal title={t('voiceAssistant.title')} onClose={() => setOpen(false)}>
          <div className="voice-modal-content" style={{ textAlign: 'center', padding: '0.5rem 0' }}>

            {/* Status indicator circle */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: isListening ? '#ffebee' : isSpeaking ? '#e8f5e9' : 'var(--surface-2)',
                border: `3px solid ${isListening ? 'var(--accent-orange)' : isSpeaking ? 'var(--primary)' : 'var(--border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2rem',
                animation: isListening || isSpeaking ? 'pulse 1.5s infinite' : 'none',
                transition: 'border-color 0.3s, background 0.3s',
              }}
              aria-live="polite"
              aria-label={isSpeaking ? 'Speaking' : isListening ? 'Listening' : 'Idle'}
            >
              {isListening ? '🎙️' : isSpeaking ? '🔊' : '🌾'}
            </div>

            {/* Status heading */}
            <h3 style={{ margin: '0 0 0.3rem' }}>
              {isListening
                ? t('voiceAssistant.listeningText')
                : isSpeaking
                ? t('voiceAssistant.speaking')
                : language === 'te'
                ? 'రైతు వాయిస్ సహాయకుడు'
                : language === 'hi'
                ? 'किसान आवाज सहायक'
                : 'Kisan Voice Assistant'}
            </h3>

            {/* Active language badge */}
            <div style={{ marginBottom: '0.75rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--primary)',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '3px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
                aria-label="Active speech language"
              >
                🌐 {getLangLabel(language)}
                {currentVoiceName ? ` · ${currentVoiceName}` : ''}
              </span>
            </div>

            <p className="muted" style={{ fontSize: '0.88rem', maxWidth: '380px', margin: '0 auto 1.25rem' }}>
              {t('voiceAssistant.instructions')}
            </p>

            {/* Transcript — what the farmer said */}
            {transcriptText && (
              <div
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.65rem 1rem',
                  marginBottom: '0.75rem',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                }}
                aria-live="polite"
              >
                <span className="muted">
                  {language === 'te' ? 'మీరు అన్నారు: ' : language === 'hi' ? 'आपने कहा: ' : 'You said: '}
                </span>
                <strong>"{transcriptText}"</strong>
              </div>
            )}

            {/* Last spoken text — what the assistant said */}
            {lastSpokenText && (
              <div
                style={{
                  background: isSpeaking ? 'rgba(27,94,50,0.07)' : 'var(--surface-2)',
                  border: `1px solid ${isSpeaking ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  padding: '0.65rem 1rem',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                aria-live="polite"
                aria-label="What the voice assistant is saying"
              >
                <span className="muted" style={{ fontSize: '0.78rem', display: 'block', marginBottom: '0.2rem' }}>
                  {isSpeaking
                    ? language === 'te' ? '🔊 వివరిస్తున్నాము:' : language === 'hi' ? '🔊 बोल रहे हैं:' : '🔊 Speaking:'
                    : language === 'te' ? '💬 చివరగా చెప్పింది:' : language === 'hi' ? '💬 अंतिम संदेश:' : '💬 Last message:'}
                </span>
                <span>{lastSpokenText}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="row" style={{ justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {supported.stt ? (
                <Button
                  id="voice-listen-btn"
                  size="normal"
                  variant={isListening ? 'danger' : 'primary'}
                  onClick={isListening ? () => {} : startListening}
                  aria-label={
                    isListening
                      ? language === 'te' ? 'వింటున్నాము' : language === 'hi' ? 'सुन रहे हैं' : 'Listening'
                      : language === 'te' ? 'మాట్లాడండి' : language === 'hi' ? 'बोलें' : 'Speak command'
                  }
                >
                  {isListening
                    ? language === 'te' ? '🎙️ వింటున్నాము...' : language === 'hi' ? '🎙️ सुन रहे हैं...' : '🎙️ Listening...'
                    : '🎙️ ' + t('common.voiceListen')}
                </Button>
              ) : null}

              {isSpeaking ? (
                <Button
                  id="voice-stop-btn"
                  variant="danger"
                  onClick={stopSpeaking}
                  aria-label={language === 'te' ? 'ఆపండి' : language === 'hi' ? 'रोकें' : 'Stop speaking'}
                >
                  ⏹ {t('common.stopReading')}
                </Button>
              ) : (
                <Button
                  id="voice-speak-btn"
                  variant="secondary"
                  onClick={handleReadSummary}
                  aria-label={language === 'te' ? 'వినండి' : language === 'hi' ? 'सुनें' : 'Read aloud'}
                >
                  🔊 {t('common.readAloud')}
                </Button>
              )}
            </div>

            {/* No STT warning */}
            {!supported.stt && (
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  background: 'var(--surface-2)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                }}
              >
                ℹ️ {t('voiceAssistant.notSupported')}
              </p>
            )}

            {/* Quick command badges */}
            <div
              style={{
                marginTop: '1.5rem',
                textAlign: 'left',
                borderTop: '1px solid var(--border)',
                paddingTop: '1rem',
              }}
            >
              <strong style={{ fontSize: '0.85rem' }}>
                {language === 'te'
                  ? 'త్వరిత ఆదేశాలు (నొక్కండి లేదా చెప్పండి):'
                  : language === 'hi'
                  ? 'त्वरित निर्देश (दबाएं या बोलें):'
                  : 'Quick Voice Commands (tap or say):'}
              </strong>
              <div className="row" style={{ gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <Badge
                  id="vc-crops"
                  onClick={() => handleVoiceCommand('crops')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'te' ? 'పంటల గైడ్' : language === 'hi' ? 'फसल गाइड' : 'Crop Guide'}
                >
                  🌾 {language === 'te' ? 'పంటల గైడ్' : language === 'hi' ? 'फसल गाइड' : 'Crop Guide'}
                </Badge>
                <Badge
                  id="vc-market"
                  onClick={() => handleVoiceCommand('market')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'te' ? 'మార్కెట్ ధరలు' : language === 'hi' ? 'मंडी भाव' : 'Mandi Prices'}
                >
                  💰 {language === 'te' ? 'మార్కెట్ ధరలు' : language === 'hi' ? 'मंडी भाव' : 'Mandi Prices'}
                </Badge>
                <Badge
                  id="vc-planner"
                  onClick={() => handleVoiceCommand('planner')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                >
                  📋 {language === 'te' ? 'రైతు క్యాలెండర్' : language === 'hi' ? 'खेत प्लानर' : 'Farm Planner'}
                </Badge>
                <Badge
                  id="vc-schemes"
                  onClick={() => handleVoiceCommand('schemes')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                >
                  🏛 {language === 'te' ? 'ప్రభుత్వ పథకాలు' : language === 'hi' ? 'सरकारी योजनाएं' : 'Schemes'}
                </Badge>
                <Badge
                  id="vc-easymode"
                  onClick={() => handleVoiceCommand('easy mode')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                >
                  ✨{' '}
                  {easyMode
                    ? language === 'te' ? 'సులభ మోడ్ ఆఫ్' : language === 'hi' ? 'सरल मोड बंद' : 'Disable Easy Mode'
                    : language === 'te' ? 'సులభ మోడ్ ఆన్' : language === 'hi' ? 'सरल मोड चालू' : 'Enable Easy Mode'}
                </Badge>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
