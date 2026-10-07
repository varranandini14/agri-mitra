/* ============================================================
   EmptyState — friendly placeholder when no data exists.
   Renders an SVG illustration, title, description and optional action.
   ============================================================ */
export default function EmptyState({ title, text, actionLabel, onAction, icon = '🌱' }) {
  return (
    <div className="empty" role="status" aria-live="polite">
      <div className="empty-icon" aria-hidden>{icon}</div>
      <strong style={{ display: 'block', marginBottom: 6, color: 'var(--text)' }}>
        {title}
      </strong>
      {text && <p style={{ margin: '0 0 14px', fontSize: '0.92rem' }}>{text}</p>}
      {actionLabel && onAction && (
        <button className="btn btn-secondary" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
