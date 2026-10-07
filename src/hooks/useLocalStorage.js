import { useEffect, useState } from 'react';

/**
 * Saves JSON in localStorage under agrimitra:* keys.
 * If the saved text is missing or broken, the default value is used.
 */
export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      // If it was stored as a raw unquoted string (e.g. 'en', 'te', 'hi', 'light')
      if (raw === 'true') return true;
      if (raw === 'false') return false;
      return raw || fallback;
    }
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or private mode — keep the in-memory value anyway.
  }
}

export function useLocalStorage(key, defaultValue) {
  const namespaced = key.startsWith('agrimitra:') ? key : `agrimitra:${key}`;
  const [value, setValue] = useState(() => readStorage(namespaced, defaultValue));

  useEffect(() => {
    writeStorage(namespaced, value);
  }, [namespaced, value]);

  return [value, setValue];
}

export const STORAGE_KEYS = [
  'agrimitra:theme',
  'agrimitra:language',
  'agrimitra:easyMode',
  'agrimitra:profile',
  'agrimitra:selectedCropId',
  'agrimitra:growthStage',
  'agrimitra:tasks',
  'agrimitra:calculations',
  'agrimitra:soil',
  'agrimitra:irrigation',
  'agrimitra:savedSchemes',
  'agrimitra:schemeChecks',
  'agrimitra:activity',
  'agrimitra:heroMotion',
  'agrimitra:district',
];

export function clearAllAgriMitraData() {
  STORAGE_KEYS.forEach((key) => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  });
}
