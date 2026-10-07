/**
 * PriceComparisonChart
 * ─────────────────────────────────────────────────────────────────────
 * Area-wise / mandi-wise price comparison horizontal bar chart.
 * - Pure CSS bars — no external chart library
 * - AgriMitra palette: Forest Green, Leaf Green, Golden Yellow
 * - Fully multilingual: English, Telugu, Hindi
 * - Accessible: role="list", aria-label, screen-reader text
 * - Mobile-first: horizontal bars never overflow on small screens
 * - Data honesty: clearly labelled as sample data
 */
export default function PriceComparisonChart({ rows, language, cropName, formatINR, easyMode }) {
  if (!rows || rows.length === 0) return null;

  const maxPrice = Math.max(...rows.map((r) => r.price));
  const minPrice = Math.min(...rows.map((r) => r.price));
  const avgPrice = Math.round(rows.reduce((s, r) => s + r.price, 0) / rows.length);

  const L = {
    title: {
      en: '📊 Area-wise Price Comparison',
      te: '📊 మండీ-వారీ ధర పోలిక',
      hi: '📊 मंडी-वार भाव तुलना',
    },
    subtitle: {
      en: 'Compare sample prices across nearby markets',
      te: 'సమీప మండీలలో నమూనా ధరలు పోల్చండి',
      hi: 'नजदीकी मंडियों में नमूना भाव की तुलना करें',
    },
    sampleNote: {
      en: 'Sample market data — for demonstration only. Not live prices.',
      te: 'నమూనా మార్కెట్ సమాచారం — ప్రదర్శన కోసం మాత్రమే. నిజ-సమయ ధరలు కాదు.',
      hi: 'नमूना मंडी डेटा — केवल प्रदर्शन के लिए। यह लाइव भाव नहीं हैं।',
    },
    highest: {
      en: 'Highest',
      te: 'అత్యధిక',
      hi: 'उच्चतम',
    },
    lowest: {
      en: 'Lowest',
      te: 'అత్యల్ప',
      hi: 'न्यूनतम',
    },
    avg: {
      en: 'Avg',
      te: 'సగటు',
      hi: 'औसत',
    },
    perQuintal: {
      en: '/quintal',
      te: '/క్వింటాలు',
      hi: '/क्विंटल',
    },
  };

  const lang = ['en', 'te', 'hi'].includes(language) ? language : 'en';
  const t = (key) => L[key]?.[lang] || L[key]?.en || key;

  return (
    <div
      style={{
        background: 'var(--surface-2)',
        borderRadius: 'var(--radius)',
        padding: easyMode ? '1.25rem' : '1rem',
        marginTop: '1.5rem',
      }}
      aria-label={t('title')}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: easyMode ? '1.15rem' : '1rem', fontWeight: 700 }}>
            {t('title')}
            {cropName ? ` — ${cropName}` : ''}
          </h4>
          <p style={{ margin: '2px 0 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            {t('subtitle')}
          </p>
        </div>
        {/* Average callout */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '4px 12px',
            textAlign: 'center',
            fontSize: '0.82rem',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary)' }}>
            {formatINR(avgPrice)}
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            {t('avg')}{t('perQuintal')}
          </div>
        </div>
      </div>

      {/* Sample data disclaimer */}
      <div
        style={{
          background: 'rgba(244, 196, 48, 0.15)',
          border: '1px solid rgba(244, 196, 48, 0.5)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        role="note"
      >
        {'\u2139\uFE0F'} {t('sampleNote')}
      </div>

      {/* Horizontal Bars */}
      <div role="list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {rows.map((row) => {
          const isMax = row.price === maxPrice;
          const isMin = row.price === minPrice;
          const barPct = Math.max(12, Math.round((row.price / maxPrice) * 100));

          const barColor = isMax
            ? '#1B5E3B'
            : isMin
            ? '#C05621'
            : '#D4A017';

          const labelBg = isMax
            ? '#E8F5E2'
            : isMin
            ? '#FEF0E7'
            : 'var(--surface)';

          const labelColor = isMax
            ? '#1B5E3B'
            : isMin
            ? '#C05621'
            : 'var(--text-muted)';

          return (
            <div
              key={row.id}
              role="listitem"
              aria-label={`${row.market}: ${formatINR(row.price)}${t('perQuintal')}${isMax ? ' — ' + t('highest') : isMin ? ' — ' + t('lowest') : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              {/* Market name */}
              <div
                style={{
                  width: easyMode ? '130px' : '110px',
                  flexShrink: 0,
                  fontSize: easyMode ? '0.9rem' : '0.82rem',
                  fontWeight: 600,
                  textAlign: 'right',
                  lineHeight: 1.3,
                  color: 'var(--text)',
                }}
              >
                {row.marketLabel || row.market}
              </div>

              {/* Bar track */}
              <div
                style={{
                  flex: 1,
                  background: 'var(--surface)',
                  borderRadius: '6px',
                  height: easyMode ? '32px' : '26px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    width: `${barPct}%`,
                    height: '100%',
                    background: barColor,
                    borderRadius: '6px',
                    transition: 'width 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '8px',
                    boxSizing: 'border-box',
                  }}
                  aria-hidden="true"
                >
                  {barPct > 40 && (
                    <span
                      style={{
                        color: '#FFFFFF',
                        fontSize: easyMode ? '0.88rem' : '0.8rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatINR(row.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Price + badge */}
              <div
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '2px',
                  minWidth: '64px',
                }}
              >
                {barPct <= 40 && (
                  <span style={{ fontWeight: 700, fontSize: easyMode ? '0.95rem' : '0.85rem' }}>
                    {formatINR(row.price)}
                  </span>
                )}
                {(isMax || isMin) && (
                  <span
                    style={{
                      background: labelBg,
                      color: labelColor,
                      border: `1px solid ${barColor}`,
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '1px 7px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isMax ? `\u2191 ${t('highest')}` : `\u2193 ${t('lowest')}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}
        aria-hidden="true"
      >
        {[
          { color: '#1B5E3B', label: t('highest') },
          { color: '#C05621', label: t('lowest') },
          { color: '#D4A017', label: language === 'te' ? 'ఇతరాలు' : language === 'hi' ? 'अन्य' : 'Others' },
        ].map(({ color, label }) => (
          <span key={label} style={{ display: 'inline-flex', gap: '5px', alignItems: 'center' }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: color, display: 'inline-block', flexShrink: 0 }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
