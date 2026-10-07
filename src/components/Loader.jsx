export default function Loader({ label = 'Loading' }) {
  return (
    <div className="row" role="status" aria-live="polite">
      <div className="loader" />
      <span>{label}…</span>
    </div>
  );
}
