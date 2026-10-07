import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import BottomNavigation from './BottomNavigation.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import ProfileModal from './ProfileModal.jsx';
import VoiceAssistant from './VoiceAssistant.jsx';
import { useTheme } from '../hooks/useTheme.js';
import { useAppData } from '../context/AppDataContext.jsx';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { clearAll, easyMode, t, language } = useAppData();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  return (
    <div className={`app-shell ${easyMode ? 'easy-mode' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Sidebar />
      <div className="main-column">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          onEditProfile={() => setProfileOpen(true)}
          onClearData={() => setClearOpen(true)}
        />
        <main id="main" className="page page-enter" key={location.pathname}>
          <Outlet context={{ openProfile: () => setProfileOpen(true) }} />
        </main>
      </div>
      <BottomNavigation />
      <VoiceAssistant />

      {profileOpen ? <ProfileModal onClose={() => setProfileOpen(false)} /> : null}
      {clearOpen ? (
        <ConfirmDialog
          title={language === 'te' ? 'అన్ని డేటాను తొలగించాలా?' : language === 'hi' ? 'सारा डेटा हटाएं?' : 'Clear all saved data?'}
          message={
            language === 'te'
              ? 'ఇది మీ ప్రొఫైల్, పనులు, లెక్కలు, నేల మరియు పథకాల రికార్డులను ఈ బ్రౌజర్ నుండి తొలగిస్తుంది.'
              : language === 'hi'
              ? 'यह आपकी प्रोफ़ाइल, कार्य, गणना और रिकॉर्ड को इस ब्राउज़र से हटा देगा।'
              : 'This removes profile, tasks, calculations, soil, irrigation and saved schemes from this browser only.'
          }
          confirmLabel={language === 'te' ? 'అన్నీ తొలగించు' : language === 'hi' ? 'सब हटाएं' : 'Clear everything'}
          cancelLabel={t('common.cancel')}
          onClose={() => setClearOpen(false)}
          onConfirm={() => {
            clearAll();
          }}
        />
      ) : null}
    </div>
  );
}
