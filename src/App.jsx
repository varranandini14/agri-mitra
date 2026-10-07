import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
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
 * ScrollToTop — resets page scroll to the top on every route change.
 * Skips when the URL has a ?tab= query param so in-page tab
 * navigation (e.g. /crops?tab=timeline) is not disrupted.
 */
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (!search.includes('tab=')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppDataProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Root and /welcome both render the Welcome/Landing page — no Layout */}
              <Route path="/" element={<Welcome />} />
              <Route path="/welcome" element={<Welcome />} />

              {/* Main app shell with sidebar, header, bottom nav */}
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/crops" element={<CropGuide />} />
                <Route path="/market" element={<MarketCalculator />} />
                <Route path="/schemes" element={<SchemesInsurance />} />
                <Route path="/planner" element={<FarmPlanner />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AppDataProvider>
    </ErrorBoundary>
  );
}
