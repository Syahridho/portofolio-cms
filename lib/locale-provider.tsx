"use client";

import { useState, useEffect } from "react";
import { LocaleContext, translations, Locale } from "./i18n-simple";
import { getCookie } from "./utils";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Determine initial locale from cookie, then localStorage, default "en"
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Client-side only
    if (typeof document !== "undefined") {
      // 1. Check cookie (set by middleware)
      const cookieLocale = getCookie("locale") as Locale;
      if (cookieLocale && (cookieLocale === "en" || cookieLocale === "id")) {
        // Sync with localStorage for backward compatibility
        localStorage.setItem("locale", cookieLocale);
        return cookieLocale;
      }
      // 2. Fallback to localStorage
      const savedLocale = localStorage.getItem("locale") as Locale;
      if (savedLocale && (savedLocale === "en" || savedLocale === "id")) {
        return savedLocale;
      }
    }
    return "en";
  });

  const [mounted, setMounted] = useState(false);

  // Sync locale to localStorage whenever it changes (including initial)
  useEffect(() => {
    setMounted(true);
    localStorage.setItem("locale", locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    // Also update cookie for consistency (optional)
    document.cookie = `locale=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; sameSite=lax`;
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <LocaleContext.Provider
        value={{
          locale: "en",
          setLocale: () => {},
          t: translations["en"],
        }}
      >
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        t: translations[locale],
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
