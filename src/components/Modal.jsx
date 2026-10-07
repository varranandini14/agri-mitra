/* ============================================================
   Modal — accessible dialog with focus trap + Esc close.
   Renders as a portal-like fixed overlay.
   title: string heading shown in the modal header
   onClose: callback when backdrop or Esc is pressed
   ============================================================ */
import { useEffect, useRef } from 'react';
import { Icon } from './Icons.jsx';

export default function Modal({ title, onClose, children }) {
  const firstFocusable = useRef(null);
  const lastFocusable = useRef(null);
  const wrapRef = useRef(null);

  /* Close on Escape; trap focus inside modal */
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      /* Tab key focus trapping */
      if (e.key === 'Tab') {
        const focusable = wrapRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKey);
    /* Move focus into modal on open */
    const firstBtn = wrapRef.current?.querySelector('button, [href], input, select, textarea');
    firstBtn?.focus();

    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function onBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal" ref={wrapRef}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="btn btn-ghost btn-sm"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
