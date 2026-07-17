import ar from "../src/i18n/locales/ar.js";
import de from "../src/i18n/locales/de.js";
import en from "../src/i18n/locales/en.js";
import fr from "../src/i18n/locales/fr.js";
import ms from "../src/i18n/locales/ms.js";

const LOCALES = { ar, de, fr, ms };

// These values are deliberately shared with English: technology and product
// names, stable identifiers, dates, and numeric evidence. Any other missing
// leaf is treated as an accidental translation fallback and fails the build.
const ALLOWED_INHERITED_PATHS = [
  /^home\.signature\.nodes\[\d+\]\.label$/,
  /^systems\.(lawnex|yallah-baggage)\.title$/,
  /^about\.capabilities\[(0|2)\]\.skills$/,
  /^about\.career\[\d+\]\.(company|period)$/,
  /^about\.education\[\d+\]\.period$/,
  /^about\.recognitions\[\d+\]\.value$/,
  /^contact\.projectTypes\[\d+\]\.id$/,
];

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isAllowedInheritance(path, baseValue) {
  if (Array.isArray(baseValue) && baseValue.length === 0) return true;
  return ALLOWED_INHERITED_PATHS.some((pattern) => pattern.test(path));
}

function valueType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function verifyNode(base, localized, locale, path, issues) {
  if (Array.isArray(base)) {
    if (!Array.isArray(localized)) {
      issues.push(`${locale}:${path} expected array, received ${valueType(localized)}`);
      return;
    }

    if (localized.length !== base.length) {
      issues.push(
        `${locale}:${path} expected ${base.length} entries, received ${localized.length}`,
      );
    }

    base.forEach((value, index) => {
      if (index >= localized.length) return;
      verifyNode(value, localized[index], locale, `${path}[${index}]`, issues);
    });
    return;
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(localized)) {
      issues.push(`${locale}:${path || "<root>"} expected object, received ${valueType(localized)}`);
      return;
    }

    Object.keys(localized).forEach((key) => {
      if (!Object.hasOwn(base, key)) {
        issues.push(`${locale}:${path ? `${path}.` : ""}${key} is not present in English`);
      }
    });

    Object.entries(base).forEach(([key, value]) => {
      const childPath = path ? `${path}.${key}` : key;
      if (!Object.hasOwn(localized, key)) {
        if (!isAllowedInheritance(childPath, value)) {
          issues.push(`${locale}:${childPath} is missing and would fall back to English`);
        }
        return;
      }

      verifyNode(value, localized[key], locale, childPath, issues);
    });
    return;
  }

  if (valueType(localized) !== valueType(base)) {
    issues.push(
      `${locale}:${path} expected ${valueType(base)}, received ${valueType(localized)}`,
    );
  }
}

const issues = [];

Object.entries(LOCALES).forEach(([locale, messages]) => {
  verifyNode(en, messages, locale, "", issues);
});

if (issues.length > 0) {
  process.stderr.write(`Translation verification failed:\n- ${issues.join("\n- ")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Translation verification passed: ${Object.keys(LOCALES).length + 1} locales.\n`,
  );
}
