/* ============================================================
   BottomNavigation — mobile fixed bottom nav bar.
   Shows 5 main nav items with icon + multilingual label.
   ============================================================ */
import { NavLink } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { useAppData } from '../context/AppDataContext.jsx';

export default function BottomNavigation() {
  const { t, language } = useAppData();

  const NAV_ITEMS = [
    { to: '/home', label: t('nav.home'), short: language === 'te' ? 'హోమ్' : language === 'hi' ? 'होम' : 'Home', icon: 'home' },
    { to: '/crops', label: t('nav.crops'), short: language === 'te' ? 'పంటలు' : language === 'hi' ? 'फसल' : 'Crops', icon: 'leaf' },
    { to: '/market', label: t('nav.market'), short: language === 'te' ? 'మార్కెట్' : language === 'hi' ? 'मंडी' : 'Market', icon: 'market' },
    { to: '/schemes', label: t('nav.schemes'), short: language === 'te' ? 'పథకాలు' : language === 'hi' ? 'योजना' : 'Schemes', icon: 'shield' },
    { to: '/planner', label: t('nav.planner'), short: language === 'te' ? 'క్యాలెండర్' : language === 'hi' ? 'प्लानर' : 'Planner', icon: 'calendar' },
  ];

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/home'}
          className={({ isActive }) => (isActive ? 'active' : '')}
          aria-label={item.label}
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="bn-dot" aria-hidden />}
              <Icon name={item.icon} size={22} />
              <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 700 : 500 }}>
                {item.short}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
