import { useEffect, useMemo, useState } from 'react';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';
import Badge from '../components/Badge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EasyModeBanner from '../components/EasyModeBanner.jsx';
import {
  SCHEMES,
  SCHEME_CATEGORIES,
  getLocalizedCategory,
  getLocalizedDocument,
  getLocalizedScheme,
} from '../data/schemes.js';
import { useAppData } from '../context/AppDataContext.jsx';
import { useToast } from '../components/Toast.jsx';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant.js';
import DataStatusBadge from '../components/DataStatusBadge.jsx';
import { uid } from '../utils/format.js';

export default function SchemesInsurance() {
  const { savedSchemes, setSavedSchemes, schemeChecks, setSchemeChecks, logActivity, setTasks, language, easyMode, t } = useAppData();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');

  const { speak, isSpeaking, stopSpeaking } = useVoiceAssistant({ language });

  useEffect(() => {
    document.title =
      language === 'te'
        ? 'ప్రభుత్వ పథకాలు, రాయితీలు & పంట బీమా — అగ్రిమిత్ర'
        : language === 'hi'
        ? 'सरकारी योजनाएं, सब्सिडी और फसल बीमा — एग्रीमित्र'
        : 'Government Schemes & Crop Insurance — AgriMitra';
  }, [language]);

  const list = useMemo(() => {
    return SCHEMES.filter((raw) => {
      const s = getLocalizedScheme(raw, language);
      const searchSource = `${raw.names?.en || ''} ${raw.names?.te || ''} ${raw.names?.hi || ''} ${s.purpose} ${s.categoryLabel} ${s.category}`.toLowerCase();
      const matchQ = searchSource.includes(q.trim().toLowerCase());
      const matchCat = category === 'All' || raw.category === category;
      return matchQ && matchCat;
    }).map((raw) => getLocalizedScheme(raw, language));
  }, [q, category, language]);

  function toggleSave(id, name) {
    setSavedSchemes((prev) => {
      if (prev.includes(id)) {
        toast(language === 'te' ? 'బుక్‌మార్క్ నుండి తొలగించబడింది.' : language === 'hi' ? 'बुकमार्क से हटाया गया।' : 'Removed from bookmarks.', 'info');
        return prev.filter((x) => x !== id);
      }
      logActivity(`Bookmarked scheme: ${name}`);
      toast(language === 'te' ? 'పథకం విజయవంతంగా బుక్‌మార్క్ చేయబడింది.' : language === 'hi' ? 'योजना बुकमार्क की गई।' : 'Scheme bookmarked.', 'success');
      return [...prev, id];
    });
  }

  function toggleDoc(schemeId, docId) {
    setSchemeChecks((prev) => {
      const current = prev[schemeId] || [];
      const next = current.includes(docId) ? current.filter((d) => d !== docId) : [...current, docId];
      return { ...prev, [schemeId]: next };
    });
  }

  function progress(scheme) {
    const done = (schemeChecks[scheme.id] || []).filter((id) => scheme.documents.includes(id)).length;
    return Math.round((done / scheme.documents.length) * 100);
  }

  function addSchemeReminderToPlanner(scheme) {
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + 7);
    const dateStr = reminderDate.toISOString().slice(0, 10);

    const newTask = {
      id: uid('task'),
      name: `${language === 'te' ? 'దరఖాస్తు గడువు & పత్రాలు' : language === 'hi' ? 'आवेदन व दस्तावेज जांच' : 'Follow up'}: ${scheme.name.split('(')[0].trim()}`,
      crop: '',
      dueDate: dateStr,
      priority: 'High',
      notes: `${language === 'te' ? 'అధికారిక వెబ్‌సైట్' : language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official website'}: ${scheme.websiteLabel}. ${language === 'te' ? 'అర్హతలు మరియు అవసరమైన పత్రాలను పరిశీలించండి.' : language === 'hi' ? 'पात्रता व जरूरी कागजात की जांच करें।' : 'Review eligibility and required documents.'}`,
      status: 'pending',
    };

    setTasks((prev) => [newTask, ...prev]);
    logActivity(`Added task to planner for scheme ${scheme.name}`);
    toast(language === 'te' ? 'క్యాలెండర్‌లో రిమైండర్ జోడించబడింది!' : language === 'hi' ? 'प्लानर में रिमाइंडर जोड़ा गया!' : `Scheduled reminder in Farm Planner!`, 'success');
  }

  function speakScheme(scheme) {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const text =
      language === 'te'
        ? `${scheme.name}. ప్రయోజనం: ${scheme.purpose}. ప్రధాన అర్హతలు: ${scheme.eligibility.slice(0, 2).join('. ')}. అధికారిక పోర్టల్: ${scheme.websiteLabel}.`
        : language === 'hi'
        ? `${scheme.name}। उद्देश्य: ${scheme.purpose}। मुख्य पात्रता: ${scheme.eligibility.slice(0, 2).join('. ')}। आधिकारिक पोर्टल: ${scheme.websiteLabel}।`
        : `${scheme.name}. Purpose: ${scheme.purpose}. Eligibility: ${scheme.eligibility.slice(0, 2).join('. ')}. Official portal: ${scheme.websiteLabel}.`;
    speak(text);
  }

  const saved = SCHEMES.filter((s) => savedSchemes.includes(s.id)).map((raw) => getLocalizedScheme(raw, language));

  const easySteps = [
    {
      icon: '🏛',
      label: language === 'te' ? '1. పథకం ఎంచుకోండి' : language === 'hi' ? '1. योजना चुनें' : '1. Select Scheme',
      desc: language === 'te' ? 'PM-కిసాన్, బీమా, సౌర పంపులు' : language === 'hi' ? 'पीएम-किसान, बीमा, सोलर पंप' : 'PM-Kisan, Insurance, Solar',
    },
    {
      icon: '📋',
      label: language === 'te' ? '2. పత్రాలు సిద్ధం చేయండి' : language === 'hi' ? '2. दस्तावेज तैयार करें' : '2. Check Documents',
      desc: language === 'te' ? 'ఆధార్, పట్టాదారు పాస్ బుక్' : language === 'hi' ? 'आधार कार्ड, बैंक पासबुक' : 'Aadhaar, Land records',
    },
    {
      icon: '🔔',
      label: language === 'te' ? '3. క్యాలెండర్‌లో గుర్తుంచుకోండి' : language === 'hi' ? '3. प्लानर में जोड़ें' : '3. Add to Planner',
      desc: language === 'te' ? 'గడువు తేదీని ట్రాక్ చేయండి' : language === 'hi' ? 'तारीख याद रखें' : 'Never miss deadline',
    },
  ];

  return (
    <div className="schemes-page">
      {/* Easy Mode Banner */}
      <EasyModeBanner
        title={t('easyModeView.badge')}
        speakText={
          language === 'te'
            ? 'ప్రభుత్వ పథకాలు మరియు రాయితీల పేజీ. ఇక్కడ ప్రధాన కేంద్ర, రాష్ట్ర పథకాలు మరియు కావాల్సిన పత్రాల వివరాలు ఉన్నాయి.'
            : language === 'hi'
            ? 'सरकारी योजनाएं और सब्सिडी। यहां प्रमुख केंद्रीय व राज्य योजनाओं की पात्रता और जरूरी कागजात की जानकारी है।'
            : 'Government Schemes & Crop Insurance page. Browse verified eligibility checkpoints and document preparation steps.'
        }
        steps={easySteps}
      />

      <div className="section-title">
        <div>
          <h1>{t('schemes.title')}</h1>
          <p className="muted">{t('schemes.subtitle')}</p>
        </div>
        <Badge tone="info">{list.length} {language === 'te' ? 'పథకాలు' : language === 'hi' ? 'योजनाएं' : 'schemes'}</Badge>
      </div>

      <div className="notice warning" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <DataStatusBadge status="educational" language={language} />
          <strong>{t('common.disclaimer')}</strong>
        </div>
        <div>{t('schemes.disclaimer')}</div>
      </div>

      {/* Search & Category Filter */}
      <div className="filters" style={{ marginTop: '1.25rem' }}>
        <FormField
          id="s-q"
          label={t('schemes.searchLabel')}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <FormField
          id="s-cat"
          label={t('schemes.categoryLabel')}
          as="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">{t('schemes.allCategories')} ({SCHEMES.length})</option>
          {SCHEME_CATEGORIES.map((c) => {
            const count = SCHEMES.filter((s) => s.category === c).length;
            const localizedCat = getLocalizedCategory(c, language);
            return <option key={c} value={c}>{localizedCat} ({count})</option>;
          })}
        </FormField>
      </div>

      {/* Quick category filter buttons */}
      <div className="row no-print" style={{ gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn btn-sm ${category === 'All' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCategory('All')}
        >
          {t('common.all')}
        </button>
        {SCHEME_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`btn btn-sm ${category === c ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCategory(c)}
          >
            {getLocalizedCategory(c, language)}
          </button>
        ))}
      </div>

      {/* Saved schemes section */}
      {saved.length > 0 && (
        <div className="card paper-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{t('schemes.myBookmarks')} ({saved.length})</h3>
            <span className="muted" style={{ fontSize: '0.85rem' }}>{t('schemes.pinnedForQuick')}</span>
          </div>
          <div className="row" style={{ gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            {saved.map((s) => (
              <span
                key={s.id}
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <strong>{s.name}</strong>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-orange)' }}
                  onClick={() => toggleSave(s.id, s.name)}
                  title="Remove bookmark"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <EmptyState
          title={t('schemes.noSchemesFound')}
          text={t('schemes.noSchemesDesc')}
          actionLabel={t('cropGuide.clearFilters')}
          onAction={() => {
            setQ('');
            setCategory('All');
          }}
        />
      ) : (
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          {list.map((scheme) => {
            const isSaved = savedSchemes.includes(scheme.id);
            const pct = progress(scheme);
            return (
              <article
                key={scheme.id}
                className="card"
                style={{
                  borderLeft: isSaved ? '4px solid var(--primary)' : '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{scheme.name}</h3>
                    <div className="row" style={{ gap: '0.35rem', flexShrink: 0 }}>
                      <Badge tone="info">{scheme.categoryLabel}</Badge>
                      <Button size="sm" variant="ghost" onClick={() => speakScheme(scheme)} title="Listen to scheme summary">
                        🔊
                      </Button>
                    </div>
                  </div>

                  <p style={{ margin: '0.75rem 0', lineHeight: 1.5 }}>{scheme.purpose}</p>

                  <h4 style={{ margin: '1rem 0 0.4rem', color: 'var(--text)' }}>{t('schemes.typicalEligibility')}</h4>
                  <ul style={{ paddingLeft: '1.25rem', margin: '0.25rem 0 0.75rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {scheme.eligibility.map((e, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{e}</li>
                    ))}
                  </ul>

                  {/* Documents preparation checklist */}
                  <div style={{ background: 'var(--surface-2)', padding: '0.85rem', borderRadius: 'var(--radius)', margin: '0.75rem 0' }}>
                    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.9rem' }}>{t('schemes.requiredDocs')}</strong>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: pct === 100 ? 'var(--primary)' : 'inherit' }}>
                        {pct}% {t('schemes.pctReady')}
                      </span>
                    </div>

                    <div className="progress" style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: pct === 100 ? 'var(--primary)' : 'var(--chart-2)',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {scheme.documents.map((docId) => {
                        const docLabel = getLocalizedDocument(docId, language);
                        const checked = (schemeChecks[scheme.id] || []).includes(docId);
                        return (
                          <label key={docId} className="checkbox" style={{ fontSize: '0.85rem', cursor: 'pointer', margin: 0 }}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleDoc(scheme.id, docId)}
                            />
                            <span>{docLabel}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <h4 style={{ margin: '0.75rem 0 0.35rem' }}>{t('schemes.prepSteps')}</h4>
                  <ol style={{ paddingLeft: '1.25rem', margin: '0.25rem 0 1rem', fontSize: '0.85rem', lineHeight: 1.4 }}>
                    {scheme.steps.map((st, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{st}</li>
                    ))}
                  </ol>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.85rem', marginTop: '0.75rem' }}>
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <a
                        href={scheme.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                        style={{ fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        {t('schemes.officialSite')}: {scheme.websiteLabel} ↗
                      </a>
                      <DataStatusBadge
                        status="verified"
                        sourceName={scheme.websiteLabel}
                        lastReviewed="2025-06-15"
                        language={language}
                        compact
                      />
                    </div>

                    <div className="row" style={{ gap: '0.4rem' }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => addSchemeReminderToPlanner(scheme)}
                        title="Add task in Farm Planner"
                      >
                        {t('schemes.addToPlanner')}
                      </Button>
                      <Button
                        size="sm"
                        variant={isSaved ? 'secondary' : 'primary'}
                        onClick={() => toggleSave(scheme.id, scheme.name)}
                      >
                        {isSaved ? t('schemes.unbookmark') : t('schemes.bookmark')}
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
