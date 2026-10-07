/* StatCard — animated counter stat with icon */
import CountUp from './CountUp.jsx';
import { Icon } from './Icons.jsx';

export default function StatCard({ label, value, prefix = '', suffix = '', note, icon, tone }) {
  /* tone: 'success' | 'warning' | 'error' | undefined */
  const accent =
    tone === 'success'
      ? 'var(--success)'
      : tone === 'warning'
      ? 'var(--warning)'
      : tone === 'error'
      ? 'var(--error)'
      : 'var(--primary)';

  return (
    <article className="card stat-card">
      {/* Icon strip at top */}
      {icon && (
        <span className="stat-icon" style={{ color: accent }}>
          <Icon name={icon} size={20} />
        </span>
      )}
      <h3>{label}</h3>
      {/* CountUp from React Bits — animates the number on mount */}
      <CountUp value={value} prefix={prefix} suffix={suffix} />
      {note && <p className="stat-note">{note}</p>}
    </article>
  );
}
