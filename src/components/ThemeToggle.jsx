/* ============================================================
   ThemeToggle — Uiverse-inspired animated pill switch.
   Shows sun/moon icon inside the knob.
   theme: 'light' | 'dark'   onToggle: callback
   ============================================================ */
import { Icon } from './Icons.jsx';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="knob">
        <span className="knob-icon">
          {/* Sun in light mode, moon in dark mode */}
          {isDark
            ? <Icon name="moon" size={13} />
            : <Icon name="sun" size={13} />
          }
        </span>
      </span>
    </button>
  );
}
