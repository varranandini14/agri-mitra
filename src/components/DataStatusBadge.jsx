/**
 * DataStatusBadge — Honest data labelling component.
 * States: 'sample' | 'example' | 'estimate' | 'hypothetical' |
 *         'verified' | 'farmer-entered' | 'saved-device' | 'live'
 *
 * RULE: Sample data must NEVER look identical to verified live data.
 * Every external data point must be labelled.
 */

const BADGE_CONFIG = {
  sample: {
    en: 'Sample Data',
    te: 'నమూనా డేటా',
    hi: 'नमूना डेटा',
    color: '#8A6200',
    bg: '#FEF3CC',
    darkColor: '#F4C430',
    darkBg: '#38300E',
    icon: '📊',
  },
  example: {
    en: 'Example',
    te: 'ఉదాహరణ',
    hi: 'उदाहरण',
    color: '#8A6200',
    bg: '#FEF3CC',
    darkColor: '#F4C430',
    darkBg: '#38300E',
    icon: '📝',
  },
  estimate: {
    en: 'Estimate',
    te: 'అంచనా',
    hi: 'अनुमान',
    color: '#1A6B6F',
    bg: '#D4ECEE',
    darkColor: '#72C0C4',
    darkBg: '#183A3C',
    icon: '≈',
  },
  hypothetical: {
    en: 'Hypothetical',
    te: 'కాల్పనిక',
    hi: 'काल्पनिक',
    color: '#8A6200',
    bg: '#FEF3CC',
    darkColor: '#F4C430',
    darkBg: '#38300E',
    icon: '💡',
  },
  educational: {
    en: 'Educational Guidance',
    te: 'అవగాహన మార్గదర్శకం',
    hi: 'शैक्षिक मार्गदर्शन',
    color: '#1A6B6F',
    bg: '#D4ECEE',
    darkColor: '#72C0C4',
    darkBg: '#183A3C',
    icon: '📚',
  },
  verified: {
    en: 'Verified Source',
    te: 'ధృవీకరించిన మూలం',
    hi: 'सत्यापित स्रोत',
    color: '#1B5E3B',
    bg: '#DCF0E2',
    darkColor: '#78CC8A',
    darkBg: '#1A3824',
    icon: '✓',
  },
  'farmer-entered': {
    en: 'Farmer Entered',
    te: 'రైతు నమోదు',
    hi: 'किसान द्वारा दर्ज',
    color: '#1B5E3B',
    bg: '#DCF0E2',
    darkColor: '#78CC8A',
    darkBg: '#1A3824',
    icon: '✏️',
  },
  'saved-device': {
    en: 'Saved on this device',
    te: 'పరికరంలో సేవ్ చేయబడింది',
    hi: 'इस डिवाइस पर सेव',
    color: '#1A6B6F',
    bg: '#D4ECEE',
    darkColor: '#72C0C4',
    darkBg: '#183A3C',
    icon: '💾',
  },
  live: {
    en: 'Live Data',
    te: 'తాజా డేటా',
    hi: 'लाइव डेटा',
    color: '#1B5E3B',
    bg: '#DCF0E2',
    darkColor: '#78CC8A',
    darkBg: '#1A3824',
    icon: '🔴',
  },
};

export default function DataStatusBadge({
  status,
  type,
  language = 'en',
  sourceName = '',
  lastReviewed = '',
  compact = false,
  size,
  style,
}) {
  const isCompact = compact || size === 'sm';
  const effectiveStatus = status || type || 'sample';
  const config = BADGE_CONFIG[effectiveStatus] || BADGE_CONFIG.sample;
  const label = config[language] || config.en;

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: isCompact ? '2px 8px' : '3px 10px',
    borderRadius: '999px',
    fontSize: isCompact ? '0.72rem' : '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
    color: config.color,
    background: config.bg,
    border: `1px solid ${config.color}30`,
    // Dark theme override via CSS custom properties
    '--ds-color': config.darkColor,
    '--ds-bg': config.darkBg,
    ...style,
  };

  return (
    <span
      className="data-status-badge"
      style={badgeStyle}
      title={
        sourceName
          ? `Source: ${sourceName}${lastReviewed ? ` · Last reviewed: ${lastReviewed}` : ''}`
          : label
      }
      aria-label={`Data status: ${label}${sourceName ? `, source: ${sourceName}` : ''}`}
    >
      <span aria-hidden="true" style={{ fontSize: isCompact ? '0.7em' : '0.85em' }}>
        {config.icon}
      </span>
      {label}
      {sourceName && !isCompact && (
        <span style={{ opacity: 0.85, fontWeight: 400, marginLeft: '3px' }}>
          — {sourceName}{lastReviewed ? ` (${lastReviewed})` : ''}
        </span>
      )}
    </span>
  );
}
