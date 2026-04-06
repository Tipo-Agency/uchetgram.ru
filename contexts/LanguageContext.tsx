import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lang, getStoredLang, setStoredLang } from '../translations';
import { LocaleSkeleton } from '../components/LocaleSkeleton';

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function documentHtmlLang(l: Lang): string {
  return 'ru-RU';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getStoredLang());
  const [dict, setDict] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setDict(null);
      const ru = await import('../locales/ru.json');
      if (!cancelled) setDict(ru.default as Record<string, string>);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = documentHtmlLang(lang);
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setStoredLang(l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = documentHtmlLang(l);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      if (!dict) return key;
      return dict[key] ?? key;
    },
    [dict],
  );

  if (dict === null) {
    return <LocaleSkeleton />;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
