/* ============================================================
   SplitText — React Bits-inspired word-by-word reveal.
   Each word fades+slides in with a staggered delay.
   Respects prefers-reduced-motion via CSS animation disable.
   ============================================================ */
export default function SplitText({ text, as: Tag = 'h1', className = '' }) {
  const words = String(text).split(' ');

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        /* Each word is wrapped so it can animate independently */
        <span
          key={i}
          className="split-word"
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          {word}
          {i < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </Tag>
  );
}
