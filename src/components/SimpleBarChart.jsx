export default function SimpleBarChart({ items, maxHint }) {
  const max = maxHint || Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="bar-chart" role="img" aria-label="Bar chart of sample prices">
      {items.map((item) => (
        <div className="bar-col" key={item.label}>
          <div
            className="bar"
            style={{
              height: `${Math.max(8, (item.value / max) * 150)}px`,
              background: item.highlight || 'var(--chart)',
            }}
            title={`${item.label}: ${item.value}`}
          />
          <small className="muted" style={{ textAlign: 'center' }}>
            {item.label}
          </small>
        </div>
      ))}
    </div>
  );
}
