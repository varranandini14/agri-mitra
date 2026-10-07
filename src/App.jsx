import { BrowserRouter, Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppDataProvider } from './context/AppDataContext.jsx';
import { ToastProvider } from './components/Toast.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CropGuide from './pages/CropGuide.jsx';
import MarketCalculator from './pages/MarketCalculator.jsx';
import SchemesInsurance from './pages/SchemesInsurance.jsx';
import FarmPlanner from './pages/FarmPlanner.jsx';
import Welcome from './pages/Welcome.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

/**
 * WelcomeGuard — checks if the welcome page has been seen.
 * If not, redirects to /welcome first.
 * Once the user clicks Explore, agrimitra:welcomeSeen is set to 'true'
 * and they proceed to the main app.
 */
function WelcomeGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/welcome') return; // already on welcome page
    try {
      const seen = localStorage.getItem('agrimitra:welcomeSeen');
      if (!seen) {
        navigate('/welcome', { replace: true });
      }
    } catch {
      // localStorage unavailable — allow through
    }
  }, [navigate, location.pathname]);

  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppDataProvider>
        <ToastProvider>
          <BrowserRouter>
            <WelcomeGuard>
              <Routes>
                {/* Welcome / onboarding page — standalone, no Layout */}
                <Route path="/welcome" element={<Welcome />} />

                {/* Main app shell with sidebar, header, bottom nav */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/crops" element={<CropGuide />} />
                  <Route path="/market" element={<MarketCalculator />} />
                  <Route path="/schemes" element={<SchemesInsurance />} />
                  <Route path="/planner" element={<FarmPlanner />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </WelcomeGuard>
          </BrowserRouter>
        </ToastProvider>
      </AppDataProvider>
    </ErrorBoundary>
  );
}
