/* ============================================================
   Sidebar — desktop left navigation.
   Shows brand logo, nav links with icons, and a footer note.
   Multilingual support with language context.
   ============================================================ */
import { Link, NavLink } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { useAppData } from '../context/AppDataContext.jsx';

export default function Sidebar() {
  const { t, language } = useAppData();

  const NAV_ITEMS = [
    { to: '/home', label: t('nav.home'), icon: 'home' },
    { to: '/crops', label: t('nav.crops'), icon: 'leaf' },
    { to: '/market', label: t('nav.market'), icon: 'market' },
    { to: '/schemes', label: t('nav.schemes'), icon: 'shield' },
    { to: '/planner', label: t('nav.planner'), icon: 'calendar' },
  ];

  const howToUseLabel =
    language === 'te'
      ? 'అగ్రిమిత్ర ఎలా వాడాలో'
      : language === 'hi'
      ? 'एग्रीमित्र कैसे उपयोग करें'
      : 'How to use AgriMitra';

  return (
    <aside className="sidebar" aria-label="Main navigation">
      {/* Brand logo */}
      <Link className="brand" to="/home" aria-label="AgriMitra home">
        <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden>
          {/* Updated to exact brand Forest Green #1B5E3B and Golden Yellow #F4C430 */}
          <rect width="64" height="64" rx="14" fill="#1B5E3B" />
          <path d="M16 46c10-20 22-26 32-28-4 14-10 26-24 32-3-4-8-4-8-4z" fill="#F4C430" />
          <path d="M20 44c6-12 14-18 22-22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <circle cx="44" cy="22" r="6" fill="#F4C430" opacity="0.9" />
        </svg>
        <span>
          <div className="brand-name">AgriMitra</div>
          <div className="brand-tag">
            {language === 'te'
              ? 'రైతు మిత్రా · ఆధునిక సహాయకుడు'
              : language === 'hi'
              ? 'किसान मित्र · कृषि सहायक'
              : 'Kisan Mitra · किसान मित्र'}
          </div>
        </span>
      </Link>

      {/* Main navigation links */}
      <nav className="side-nav" aria-label="Pages">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/home'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0' }} />

      {/* "How to use AgriMitra" link — returns to welcome page */}
      <Link
        to="/welcome"
        className="nav-link"
        style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}
        aria-label={howToUseLabel}
      >
        <span style={{ fontSize: '1.1rem' }}>❓</span>
        <span>{howToUseLabel}</span>
      </Link>

      {/* Footer message */}
      <footer className="sidebar-footer" aria-label="Data privacy note">
        <Icon name="save" size={14} />
        <span style={{ marginLeft: 6, fontSize: '0.8rem' }}>
          {language === 'te'
            ? 'సమాచారం మీ బ్రౌజర్‌లో మాత్రమే భద్రం'
            : language === 'hi'
            ? 'डेटा केवल इसी ब्राउज़र में सुरक्षित है'
            : 'All data stays in this browser only'}
        </span>
      </footer>
    </aside>
  );
}
