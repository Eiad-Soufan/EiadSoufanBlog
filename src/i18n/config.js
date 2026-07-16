export const DEFAULT_LOCALE = "en";

export const LOCALES = ["en", "ar", "ms", "fr", "de"];

export const LOCALE_META = {
  en: { label: "English", shortLabel: "EN", dir: "ltr", intl: "en-US", og: "en_US" },
  ar: { label: "العربية", shortLabel: "AR", dir: "rtl", intl: "ar-u-nu-latn", og: "ar_SY" },
  ms: { label: "Bahasa Melayu", shortLabel: "MS", dir: "ltr", intl: "ms-MY", og: "ms_MY" },
  fr: { label: "Français", shortLabel: "FR", dir: "ltr", intl: "fr-FR", og: "fr_FR" },
  de: { label: "Deutsch", shortLabel: "DE", dir: "ltr", intl: "de-DE", og: "de_DE" },
};

export const PAGE_PATHS = {
  home: "",
  about: "about",
  approach: "approach",
  contact: "contact",
};

export const LEGACY_PAGE_PATHS = {
  about: "about",
  "about-us": "about",
  approach: "approach",
  "why-us": "approach",
  whyus: "approach",
  contact: "contact",
};

export function isLocale(value) {
  return LOCALES.includes(value);
}

export function localeFromLanguageTag(languageTag) {
  const base = String(languageTag || "").toLowerCase().split("-")[0];
  return isLocale(base) ? base : null;
}

export function localeFromPath(pathname) {
  const firstSegment = String(pathname || "")
    .split("/")
    .filter(Boolean)[0];
  return isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}

export function localizedPath(locale, page = "home", hash = "") {
  const safeLocale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const pagePath = PAGE_PATHS[page] ?? "";
  const pathname = pagePath
    ? `/${safeLocale}/${pagePath}/`
    : `/${safeLocale}/`;
  return `${pathname}${hash || ""}`;
}

export function getPageFromPath(pathname) {
  const parts = String(pathname || "").split("/").filter(Boolean);
  if (parts.length === 0) return "home";

  if (isLocale(parts[0])) {
    if (parts.length === 1) return "home";
    if (parts.length !== 2) return "notFound";
  } else if (parts.length !== 1) {
    return "notFound";
  } else {
    return LEGACY_PAGE_PATHS[parts[0]] || "notFound";
  }

  const pageSegment = parts[1];
  const match = Object.entries(PAGE_PATHS).find(([, segment]) => segment === (pageSegment || ""));
  return match?.[0] || "notFound";
}

export function replaceLocaleInPath(pathname, targetLocale) {
  const parts = String(pathname || "").split("/").filter(Boolean);
  if (isLocale(parts[0])) parts[0] = targetLocale;
  else parts.unshift(targetLocale);

  const result = `/${parts.join("/")}`;
  return `${result}/`;
}

export function getBrowserLocale() {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  let saved = null;
  try {
    saved = window.localStorage.getItem("eiad_locale");
  } catch {
    // Storage can be unavailable in strict privacy contexts.
  }
  if (isLocale(saved)) return saved;

  const languages = window.navigator.languages || [window.navigator.language];
  return languages.map(localeFromLanguageTag).find(Boolean) || DEFAULT_LOCALE;
}
