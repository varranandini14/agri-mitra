/* ============================================================
   Badge — status / category chip.
   tone: 'high' | 'medium' | 'low' | 'info' | undefined (default)
   ============================================================ */
export default function Badge({ children, tone = '', ...props }) {
  let content = children;
  if (content && typeof content === 'object' && !Array.isArray(content) && !('$$typeof' in content)) {
    content = content.en || content.te || content.hi || '';
  }
  return (
    <span className={`badge${tone ? ` ${tone}` : ''}`} {...props}>
      {content}
    </span>
  );
}
