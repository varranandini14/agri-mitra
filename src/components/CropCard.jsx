import { useState, useRef } from 'react';
import Badge from './Badge.jsx';
import Button from './Button.jsx';
import { getCropName, getCropText, getCropImageAlt, CATEGORY_LABELS, SEASON_LABELS } from '../data/crops.js';

export default function CropCard({ crop, saved, onSave, onOpen, language = 'en' }) {
  const ref = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const displayName = getCropName(crop, language);
  const localName = language !== 'te' && crop.names?.te ? crop.names.te : (crop.names?.hi || '');
  const shortText = getCropText(crop, 'short', language);
  const categoryLabel = CATEGORY_LABELS[language]?.[crop.category] || CATEGORY_LABELS.en[crop.category] || crop.category;
  const imageAlt = getCropImageAlt(crop, language);

  function onMove(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = '';
  }

  return (
    <article
      className="card crop-card"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {/* Real Crop Photograph with fallback */}
      <div className="crop-photo-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', marginBottom: '12px', background: 'var(--surface-2)', height: '180px' }}>
        {!imgError && crop.image ? (
          <img
            src={crop.image}
            alt={imageAlt}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease',
              opacity: imgLoaded ? 1 : 0.7,
              transform: 'scale(1)',
            }}
            className="crop-main-img"
          />
        ) : (
          <div
            className="crop-fallback"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.15) 0%, rgba(27, 94, 50, 0.28) 100%)',
              color: 'var(--primary)',
            }}
          >
            <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
              {crop.icon || '🌾'}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '4px', color: 'var(--text)' }}>
              {displayName}
            </span>
          </div>
        )}

        {/* Season Overlay Badge */}
        <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {crop.seasons.map((s) => {
            const sLabel = SEASON_LABELS[language]?.[s] || SEASON_LABELS.en[s] || s;
            return (
              <span
                key={s}
                style={{
                  background: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                {sLabel}
              </span>
            );
          })}
        </div>

        {saved && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'var(--primary)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            ✓ {language === 'te' ? 'నా పంట' : language === 'hi' ? 'मेरी फसल' : 'My Crop'}
          </div>
        )}
      </div>

      {localName && <p className="hand-label" style={{ margin: '0 0 2px' }}>{localName}</p>}
      <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: 'var(--text)' }}>{displayName}</h3>
      
      <div className="row" style={{ flexWrap: 'wrap', gap: '0.35rem', marginBottom: '8px' }}>
        <Badge tone="info">{categoryLabel}</Badge>
      </div>

      <p className="muted" style={{ margin: '0.5rem 0 1rem', lineHeight: 1.5, fontSize: '0.9rem', minHeight: '2.7em' }}>
        {shortText}
      </p>

      <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
        <Button onClick={() => onOpen(crop)}>
          {language === 'te' ? 'పూర్తి వివరాలు' : language === 'hi' ? 'पूरा विवरण' : 'Full Details'}
        </Button>
        <Button variant={saved ? 'secondary' : 'primary'} onClick={() => onSave(crop)}>
          {saved
            ? (language === 'te' ? 'నా పంట ✓' : language === 'hi' ? 'मेरी फसल ✓' : 'My crop ✓')
            : (language === 'te' ? 'నా పంటగా ఎంచుకో' : language === 'hi' ? 'मेरी फसल चुनें' : 'Save as my crop')}
        </Button>
      </div>
    </article>
  );
}
