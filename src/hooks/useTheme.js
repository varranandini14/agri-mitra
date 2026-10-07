import { useEffect, useState } from 'react';
import { readStorage, writeStorage } from './useLocalStorage.js';

function systemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = readStorage('agrimitra:theme', null);
    if (saved === 'light' || saved === 'dark') return saved;
    return systemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writeStorage('agrimitra:theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return { theme, setTheme, toggleTheme };
}
