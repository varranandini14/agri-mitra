/* ============================================================
   FormField — Floating label input / select / textarea.
   Styled with Uiverse-inspired floating label effect.
   id is required for the label's `htmlFor`.
   ============================================================ */
export default function FormField({
  id,
  label,
  as: As = 'input',
  type = 'text',
  value,
  onChange,
  error,
  children, // for select options
  min,
  max,
  step,
  placeholder = ' ', // a space keeps :placeholder-shown happy
  disabled = false,
  required = false,
}) {
  return (
    <div className="field">
      <As
        id={id}
        type={As === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        required={required}
        aria-describedby={error ? `${id}-err` : undefined}
        aria-invalid={error ? 'true' : undefined}
      >
        {children}
      </As>
      <label htmlFor={id}>{label}</label>
      {error && (
        <p id={`${id}-err`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
