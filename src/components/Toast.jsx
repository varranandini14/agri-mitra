/* ============================================================
   Toast — lightweight notification system.
   Provides a ToastProvider (wrap at top level) and
   a useToast() hook in any child component.
   Auto-dismisses after 3.5 s.
   ============================================================ */
import { createContext, useCallback, useContext, useState } from 'react';
import { Icon } from './Icons.jsx';

const ToastCtx = createContext(null);

const ICONS = {
  success: <Icon name="check" size={16} />,
  error:   <Icon name="close" size={16} />,
  warning: <Icon name="alert" size={16} />,
  info:    <Icon name="info" size={16} />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'info', ms = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, ms);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="false">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`} role="status">
            <div className="row" style={{ gap: 8, justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {ICONS[t.type]}
                {t.message}
              </span>
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                style={{ padding: '2px 6px', minWidth: 0 }}
              >
                <Icon name="close" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
