export type Lang = 'ru';

const STORAGE_KEY = 'uchetgram_lang';

export function getStoredLang(): Lang {
  if (typeof window === 'undefined') return 'ru';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ru') return stored;
  return 'ru';
}

export function setStoredLang(lang: Lang): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, lang);
}
