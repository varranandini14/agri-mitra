/* ============================================================
   Header — sticky top bar with season badge, language switcher,
   prominent Easy Mode toggle, theme toggle, and profile dropdown.
   ============================================================ */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import { Icon } from './Icons.jsx';
import { getCurrentSeason } from '../utils/season.js';
import { useAppData } from '../context/AppDataContext.jsx';

export default function Header({ theme, onToggleTheme, onEditProfile, onClearData }) {
  const { profile, language, setLanguage, easyMode, setEasyMode, t } = useAppData();
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const profileRef = useRef(null);
  const langRef = useRef(null);
  const season = getCurrentSeason();
  const initial = (profile.name || 'K').slice(0, 1).toUpperCase();

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    function onDoc(e) {
      if (!profileRef.current?.contains(e.target)) setProfileOpen(false);
      if (!langRef.current?.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        setLangOpen(false);
      }
    }
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  /* Season emoji */
  const seasonEmoji = season === 'Kharif' ? '🌧️' : season === 'Rabi' ? '🌾' : '☀️';

  const LANGUAGES = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  return (
    <header className="header">
      {/* Left: mobile brand + season badge */}
      <div className="header-left">
        <span className="mobile-brand" aria-hidden>🌿 AgriMitra</span>
        <span className="season-badge" aria-label={`Current season: ${season}`}>
          <Icon name="leaf" size={14} />
          {seasonEmoji} {season} {t('header.seasonSuffix')}
        </span>
      </div>

      {/* Right controls */}
      <div className="row" style={{ alignItems: 'center', gap: '0.65rem' }}>
        {/* Prominent Easy Mode Button */}
        <button
          type="button"
          className={`easy-mode-toggle-btn ${easyMode ? 'active' : ''}`}
          onClick={() => setEasyMode(!easyMode)}
          aria-pressed={easyMode}
          title={t('header.easyModeDesc')}
        >
          <span className="icon" aria-hidden>🌾</span>
          <span className="label">
            {easyMode ? t('header.easyModeOn') : t('header.easyMode')}
          </span>
        </button>

        {/* Language Selector Pill */}
        <div className="lang-wrap" ref={langRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="lang-btn"
            onClick={() => setLangOpen((v) => !v)}
            aria-expanded={langOpen}
            aria-haspopup="menu"
            aria-label="Select language"
            title="Change language / భాష మార్చండి / भाषा बदलें"
          >
            <span style={{ fontSize: '1rem' }}>🌐</span>
            <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
              {language === 'te' ? 'తెలుగు' : language === 'hi' ? 'हिन्दी' : 'English'}
            </span>
            <Icon name="chevronDown" size={12} />
          </button>

          {langOpen && (
            <div className="menu lang-menu" role="menu" style={{ minWidth: '160px' }}>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  role="menuitem"
                  className={language === l.code ? 'selected' : ''}
                  onClick={() => {
                    setLanguage(l.code);
                    setLangOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: language === l.code ? 700 : 400,
                  }}
                >
                  <span>{l.native}</span>
                  {language === l.code && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        {/* Profile Menu */}
        <div className="profile-wrap" ref={profileRef}>
          <button
            type="button"
            className="profile-btn"
            onClick={() => setProfileOpen((v) => !v)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label="Open profile menu"
          >
            <span className="avatar" aria-hidden>{initial}</span>
            <span className="hide-on-mobile">{profile.name || 'Kisan Mitra'}</span>
            <Icon name="chevronDown" size={14} />
          </button>

          {profileOpen && (
            <div className="menu" role="menu" aria-label="Profile options">
              <div style={{ padding: '8px 12px 10px' }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>
                  {profile.name || 'Kisan Mitra'}
                </p>
                {profile.village && (
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    📍 {profile.village}, {profile.state}
                  </p>
                )}
              </div>
              <div className="menu-divider" />
              <button
                type="button"
                role="menuitem"
                onClick={() => { setProfileOpen(false); onEditProfile(); }}
              >
                <Icon name="user" size={16} />
                {t('home.editProfile')}
              </button>
              <Link to="/planner" role="menuitem" onClick={() => setProfileOpen(false)}>
                <Icon name="calendar" size={16} />
                {t('nav.planner')}
              </Link>
              <Link to="/schemes" role="menuitem" onClick={() => setProfileOpen(false)}>
                <Icon name="shield" size={16} />
                {t('nav.schemes')}
              </Link>
              <div className="menu-divider" />
              <button
                type="button"
                role="menuitem"
                onClick={() => { setProfileOpen(false); onClearData(); }}
                style={{ color: 'var(--error)' }}
              >
                <Icon name="trash" size={16} />
                {t('common.delete')} {language === 'te' ? 'అన్ని డేటా' : language === 'hi' ? 'सभी डेटा' : 'all data'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
