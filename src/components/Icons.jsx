/* ============================================================
   Icons — Inline SVG icon set. No icon library needed.
   All paths drawn by hand to match the AgriMitra aesthetic.
   Add new icons here if needed.
   ============================================================ */
export function Icon({ name, size = 20, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    className,
    style: { flexShrink: 0 },
  };

  const paths = {
    /* Navigation */
    home: <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />,
    leaf: (
      <>
        <path d="M5 19c8-3 11-9 14-16-7 1-14 6-14 16z" />
        <path d="M7 17c3-4 6-7 10-10" />
      </>
    ),
    market: (
      <>
        <path d="M4 10h16v9H4z" />
        <path d="M7 10V7a5 5 0 0 1 10 0v3" />
      </>
    ),
    shield: <path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6z" />,
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),

    /* Weather / nature */
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </>
    ),
    moon: <path d="M16 13a6 6 0 1 1-7-8 7 7 0 0 0 8 8z" />,
    rain: (
      <>
        <path d="M20 17.7A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.3" />
        <path d="M8 19v1M8 23v1M12 21v1M12 25v1M16 19v1M16 23v1" />
      </>
    ),
    cloud: (
      <>
        <path d="M18 10a5 5 0 0 0-9.9-1A4 4 0 0 0 4 13h16a4 4 0 0 0-2-3z" />
      </>
    ),
    drop: <path d="M12 3s7 8 7 12a7 7 0 1 1-14 0c0-4 7-12 7-12z" />,
    thermometer: (
      <>
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </>
    ),

    /* Status / feedback */
    check: <path d="M5 12.5 9.5 17 19 7" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    alert: (
      <>
        <path d="M12 4 3 19h18z" />
        <path d="M12 9v5M12 16.5v.5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v1M12 12v4" />
      </>
    ),

    /* Actions */
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l4 4" />
      </>
    ),
    edit: <path d="M3 18 15 6l3 3L6 21zm12-12 3 3" />,
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
      </>
    ),
    save: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M17 21v-8H7v8M7 3v5h8" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5M12 15V3" />
      </>
    ),
    print: (
      <>
        <path d="M6 9V2h12v7" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 14h12v8H6z" />
      </>
    ),
    chevronDown: <path d="M6 9l6 6 6-6" />,
    chevronRight: <path d="M9 18l6-6-6-6" />,
    star: <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7L3 9l7-1z" />,
    starFilled: (
      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7L3 9l7-1z" fill="currentColor" stroke="none" />
    ),

    /* Farming specific */
    soil: (
      <>
        <path d="M4 18c2-4 5-6 8-6s6 2 8 6" />
        <path d="M4 21h16" />
        <path d="M10 9a2 2 0 0 1 4 0" />
        <path d="M8 12c1-2 2-3 4-3s3 1 4 3" />
      </>
    ),
    sprout: (
      <>
        <path d="M12 20V10" />
        <path d="M12 10c0-5 5-8 8-5-1 3-4 5-8 5z" />
        <path d="M12 10c0-5-5-8-8-5 1 3 4 5 8 5z" />
      </>
    ),
    task: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 9h10M7 13h10M7 17h6" />
      </>
    ),
    wheat: (
      <>
        <path d="M12 19V5" />
        <path d="M8 14c0-3 2-5 4-5s4 2 4 5" />
        <path d="M8 10c0-2 2-4 4-4s4 2 4 4" />
        <path d="M8 6c0-1 2-2 4-2s4 1 4 2" />
      </>
    ),
    rupee: (
      <>
        <path d="M6 4h8a4 4 0 0 1 0 8H6l6 8" />
        <path d="M6 12h8" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19c1.5-3.5 4-5.5 7-5.5s5.5 2 7 5.5" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    location: (
      <>
        <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    tractor: (
      <>
        <ellipse cx="7" cy="17" rx="3" ry="3" />
        <ellipse cx="17" cy="17" rx="4" ry="4" />
        <path d="M4 17V8h12l3 4v5" />
        <path d="M4 11h8" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.leaf}</svg>;
}
