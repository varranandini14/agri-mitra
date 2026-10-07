/* ============================================================
   CountUp — React Bits-inspired animated number counter.
   Eases from 0 to `value` over `duration` ms on mount.
   Respects prefers-reduced-motion.
   ============================================================ */
import { useEffect, useRef, useState } from 'react';

export default function CountUp({ value, prefix = '', suffix = '', duration = 800 }) {
  const [shown, setShown] = useState(0);
  const numeric = Number(value) || 0;
  /* Track previous value to re-animate on change */
  const prevRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setShown(numeric);
      return;
    }

    const from = prevRef.current;
    prevRef.current = numeric;

    let frame;
    const start = performance.now();

    function tick(now) {
      /* Ease-out curve: t^(1/2) */
      const raw = Math.min(1, (now - start) / duration);
      const t = 1 - Math.pow(1 - raw, 2); // ease-out-quad
      setShown(Math.round(from + (numeric - from) * t));
      if (raw < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [numeric, duration]);

  /* Format with Indian number system if large */
  const formatted =
    Math.abs(shown) >= 1000
      ? shown.toLocaleString('en-IN')
      : shown.toString();

  return (
    <span className="stat-value">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
