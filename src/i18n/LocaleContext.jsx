/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { messages } from "./messages";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  isLocale,
  localeFromPath,
  localizedPath,
  replaceLocaleInPath,
} from "./config";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const locale = localeFromPath(location.pathname);
  const meta = LOCALE_META[locale] || LOCALE_META[DEFAULT_LOCALE];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
    document.body.dataset.locale = locale;
  }, [locale, meta.dir]);

  const path = useCallback(
    (page = "home", hash = "") => localizedPath(locale, page, hash),
    [locale],
  );

  const switchLocale = useCallback(
    (nextLocale) => {
      if (!isLocale(nextLocale) || nextLocale === locale) return;

      try {
        window.localStorage.setItem("eiad_locale", nextLocale);
      } catch {
        // Private browsing or strict storage policies must not block navigation.
      }
      document.cookie = `eiad_locale=${nextLocale}; Max-Age=31536000; Path=/; SameSite=Lax`;

      const nextMeta = LOCALE_META[nextLocale];
      document.documentElement.lang = nextLocale;
      document.documentElement.dir = nextMeta.dir;
      document.body.dataset.locale = nextLocale;

      const nextPath = replaceLocaleInPath(location.pathname, nextLocale);
      navigate(`${nextPath}${location.search}${location.hash}`);
    },
    [locale, location.hash, location.pathname, location.search, navigate],
  );

  const value = useMemo(
    () => ({
      locale,
      localeMeta: meta,
      copy: messages[locale] || messages[DEFAULT_LOCALE],
      path,
      switchLocale,
    }),
    [locale, meta, path, switchLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
