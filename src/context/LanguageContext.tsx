import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations, Lang } from '../data/translations';

type LanguageValue = {
  lang: Lang;
  t: typeof translations.en;
  isRtl: boolean;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageValue | undefined>(undefined);

const STORAGE_KEY = 'portfolio-lang';

function readInitialLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') {
      return stored;
    }
  } catch {
    /* storage can be unavailable in private mode — fall through to default */
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang);

  const isRtl = lang === 'ar';

  // Keep the document in sync so native form controls, scrollbars and
  // text selection follow the active language.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore write failures */
    }
  }, [lang, isRtl]);

  const value = useMemo<LanguageValue>(() => ({
    lang,
    t: translations[lang],
    isRtl,
    toggleLang: () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }), [lang, isRtl]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return ctx;
}
