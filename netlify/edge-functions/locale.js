const SUPPORTED_LOCALES = new Set(["en", "ar", "ms", "fr", "de"]);

const ARABIC_COUNTRIES = new Set([
  "AE",
  "BH",
  "DJ",
  "DZ",
  "EG",
  "IQ",
  "JO",
  "KM",
  "KW",
  "LB",
  "LY",
  "MA",
  "MR",
  "OM",
  "PS",
  "QA",
  "SA",
  "SD",
  "SO",
  "SY",
  "TN",
  "YE",
]);

function readCookie(cookieHeader, name) {
  const pair = String(cookieHeader || "")
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  if (!pair) return null;

  try {
    return decodeURIComponent(pair.slice(name.length + 1));
  } catch {
    return pair.slice(name.length + 1);
  }
}

function localeFromCountry(countryCode) {
  const country = String(countryCode || "").toUpperCase();
  // Keep country defaults deliberately conservative. Multilingual countries
  // fall through to Accept-Language instead of receiving a forced language.
  if (country === "DE" || country === "AT") return "de";
  if (country === "FR") return "fr";
  if (country === "MY" || country === "BN") return "ms";
  if (ARABIC_COUNTRIES.has(country)) return "ar";
  return null;
}

function localeFromAcceptLanguage(header) {
  return String(header || "")
    .split(",")
    .map((entry, index) => {
      const [languageRange, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      const quality = qualityParameter
        ? Number.parseFloat(qualityParameter.trim().slice(2))
        : 1;

      return {
        locale: languageRange.toLowerCase().split("-")[0],
        quality: Number.isFinite(quality) ? quality : 0,
        index,
      };
    })
    .filter(({ locale, quality }) => SUPPORTED_LOCALES.has(locale) && quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)[0]?.locale;
}

export default async function localeGateway(request, context) {
  const url = new URL(request.url);
  if (url.pathname !== "/" || !["GET", "HEAD"].includes(request.method)) {
    return context.next();
  }

  const savedLocale = readCookie(request.headers.get("cookie"), "eiad_locale");
  const countryLocale = localeFromCountry(context.geo?.country?.code);
  const browserLocale = localeFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
  const locale = SUPPORTED_LOCALES.has(savedLocale)
    ? savedLocale
    : countryLocale || browserLocale || "en";

  url.pathname = `/${locale}/`;

  const headers = new Headers({
    location: url.toString(),
    "cache-control": "private, no-store",
    vary: "Cookie, Accept-Language",
  });

  const hostname = new URL(request.url).hostname;
  if (!["eiadsoufan.blog", "www.eiadsoufan.blog"].includes(hostname)) {
    headers.set("x-robots-tag", "noindex, nofollow, noarchive");
  }

  return new Response(null, { status: 302, headers });
}
