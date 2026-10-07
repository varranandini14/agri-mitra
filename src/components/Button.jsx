/* ============================================================
   Button — Uiverse-inspired with 3D press effect.
   variant: 'primary' | 'secondary' | 'danger' | 'ghost'
   size: 'normal' | 'sm'
   type: HTML button type (button/submit/reset)
   ============================================================ */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'normal',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
  style,
}) {
  const cls = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={cls}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </button>
  );
}
