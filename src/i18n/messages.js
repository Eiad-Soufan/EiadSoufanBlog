import ar from "./locales/ar";
import de from "./locales/de";
import en from "./locales/en";
import fr from "./locales/fr";
import ms from "./locales/ms";

function mergeLocale(base, override) {
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    return base.map((value, index) => mergeLocale(value, override[index]));
  }

  if (base && typeof base === "object") {
    const result = { ...base };
    Object.entries(override || {}).forEach(([key, value]) => {
      result[key] = key in base ? mergeLocale(base[key], value) : value;
    });
    return result;
  }

  return override === undefined ? base : override;
}

export const messages = {
  en,
  ar: mergeLocale(en, ar),
  ms: mergeLocale(en, ms),
  fr: mergeLocale(en, fr),
  de: mergeLocale(en, de),
};

export default messages;
