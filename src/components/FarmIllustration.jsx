/* ============================================================
   Farm SVG Illustration — animated CSS farm scene.
   Used in the Home hero. Toggle via `animate` prop.
   No third-party library. All SVG paths handwritten.
   ThreeUI route: We chose the SVG/CSS route because a
   lightweight 3D scene would require a WebGL context which
   is heavy and not guaranteed in all browsers. The SVG
   gives the same visual delight and is instant.
   ============================================================ */

export default function FarmIllustration({ animate = true }) {
  return (
    <svg
      viewBox="0 0 280 200"
      className="farm-svg"
      aria-label="Animated farm scene illustration"
      role="img"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bde0f0" />
          <stop offset="100%" stopColor="#e8f7e4" />
        </linearGradient>
        <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a9e5c" />
          <stop offset="100%" stopColor="#2a6b3a" />
        </linearGradient>
        <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6bbf74" />
          <stop offset="100%" stopColor="#3d8c4a" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="280" height="200" fill="url(#skyGrad)" />

      {/* Sun */}
      <circle
        cx="230"
        cy="36"
        r="22"
        fill="#f4d03f"
        className={animate ? 'sun-glow' : ''}
      />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={230 + 25 * Math.cos(rad)}
            y1={36 + 25 * Math.sin(rad)}
            x2={230 + 32 * Math.cos(rad)}
            y2={36 + 32 * Math.sin(rad)}
            stroke="#f4d03f"
            strokeWidth="2"
            strokeLinecap="round"
            className={animate ? 'sun-glow' : ''}
          />
        );
      })}

      {/* Cloud 1 */}
      <g className={animate ? 'cloud-drift' : ''}>
        <ellipse cx="48" cy="28" rx="22" ry="11" fill="white" opacity="0.88" />
        <ellipse cx="64" cy="24" rx="16" ry="10" fill="white" opacity="0.88" />
        <ellipse cx="30" cy="32" rx="14" ry="8" fill="white" opacity="0.88" />
      </g>

      {/* Cloud 2 */}
      <g className={animate ? 'cloud-drift' : ''} style={{ animationDelay: '-7s' }}>
        <ellipse cx="160" cy="22" rx="18" ry="9" fill="white" opacity="0.7" />
        <ellipse cx="174" cy="18" rx="12" ry="8" fill="white" opacity="0.7" />
      </g>

      {/* Distant hills */}
      <path d="M0 110 Q40 70 80 95 Q120 70 160 95 Q200 70 240 90 Q260 80 280 85 L280 140 L0 140z" fill="url(#hillGrad)" opacity="0.7" />

      {/* Ground / field */}
      <rect x="0" y="138" width="280" height="62" fill="url(#fieldGrad)" />

      {/* Furrow rows on field */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="0"
          y1={145 + i * 12}
          x2="280"
          y2={148 + i * 12}
          stroke="rgba(27,94,50,0.3)"
          strokeWidth="2"
        />
      ))}

      {/* Crop plants in a row */}
      {[20, 50, 80, 110, 140, 170, 200].map((x, i) => (
        <g
          key={x}
          className={animate ? 'crop-sway' : ''}
          style={{ animationDelay: `${i * 0.3}s`, transformOrigin: `${x}px 155px` }}
        >
          <line x1={x} y1="138" x2={x} y2="162" stroke="#1b5e32" strokeWidth="2.5" />
          <ellipse cx={x - 7} cy="146" rx="8" ry="5" fill="#3d8c4a" />
          <ellipse cx={x + 7} cy="143" rx="8" ry="5" fill="#3d8c4a" />
          <ellipse cx={x} cy="138" rx="7" ry="4" fill="#5fb86c" />
        </g>
      ))}

      {/* Farmhouse */}
      {/* House body */}
      <rect x="188" y="108" width="54" height="36" rx="2" fill="#e8c99a" stroke="#c9a870" strokeWidth="1.2" />
      {/* Roof */}
      <polygon points="182,112 215,90 248,112" fill="#c0392b" />
      {/* Door */}
      <rect x="207" y="126" width="16" height="18" rx="2" fill="#a0522d" />
      {/* Door handle */}
      <circle cx="220" cy="135" r="1.5" fill="#c9a870" />
      {/* Window */}
      <rect x="192" y="114" width="10" height="10" rx="1" fill="#aed6f1" stroke="#85c1e9" strokeWidth="0.8" />
      <line x1="192" y1="119" x2="202" y2="119" stroke="#85c1e9" strokeWidth="0.5" />
      <line x1="197" y1="114" x2="197" y2="124" stroke="#85c1e9" strokeWidth="0.5" />
      {/* Chimney */}
      <rect x="228" y="94" width="8" height="14" fill="#8b6914" />
      {/* Smoke puffs */}
      {animate && (
        <>
          <circle cx="232" cy="92" r="4" fill="rgba(200,200,200,0.6)" className="sun-glow" />
          <circle cx="234" cy="86" r="3" fill="rgba(200,200,200,0.4)" className="sun-glow" style={{ animationDelay: '1s' }} />
        </>
      )}

      {/* Windmill */}
      {/* Tower */}
      <polygon points="62,138 68,138 66,88 64,88" fill="#c9a870" />
      {/* Hub */}
      <circle cx="65" cy="88" r="4" fill="#8b6914" />
      {/* Blades */}
      <g
        className={animate ? 'windmill' : ''}
        style={{ transformOrigin: '65px 88px' }}
      >
        <ellipse cx="65" cy="72" rx="4" ry="12" fill="#e8c99a" stroke="#c9a870" strokeWidth="0.8" />
        <ellipse cx="81" cy="88" rx="12" ry="4" fill="#e8c99a" stroke="#c9a870" strokeWidth="0.8" />
        <ellipse cx="65" cy="104" rx="4" ry="12" fill="#e8c99a" stroke="#c9a870" strokeWidth="0.8" />
        <ellipse cx="49" cy="88" rx="12" ry="4" fill="#e8c99a" stroke="#c9a870" strokeWidth="0.8" />
      </g>

      {/* Tree */}
      <rect x="140" y="115" width="6" height="24" rx="2" fill="#a0522d" />
      <circle cx="143" cy="108" r="16" fill="#27ae60" />
      <circle cx="133" cy="112" r="12" fill="#2ecc71" />
      <circle cx="153" cy="112" r="12" fill="#2ecc71" />

      {/* Birds */}
      <g fill="none" stroke="#243126" strokeWidth="1.2" strokeLinecap="round">
        <path d="M100 55 Q103 52 106 55" />
        <path d="M110 48 Q113 45 116 48" />
        <path d="M118 57 Q121 54 124 57" />
      </g>
    </svg>
  );
}
