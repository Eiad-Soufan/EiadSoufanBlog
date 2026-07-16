import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LOCALES, LOCALE_META, getPageFromPath } from "../i18n/config.js";
import { useLocale } from "../i18n/LocaleContext.jsx";
import {
  SOCIAL_IMAGE,
  SITE_IDENTITY,
  getAlternateLinks,
  getLocalizedUrl,
  getSeoCopy,
  getStructuredData,
  normalizeSeoPage,
} from "../seo/site.js";

const PRODUCTION_HOSTS = new Set(["eiadsoufan.netlify.app"]);

function getOrCreateMeta(attribute, key) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  return element;
}

function updateMeta(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`;
  const existing = document.head.querySelector(selector);

  if (content == null || content === "") {
    existing?.remove();
    return;
  }

  getOrCreateMeta(attribute, key).setAttribute("content", content);
}

function updateCanonical(href) {
  let canonical = document.head.querySelector('link[rel="canonical"]');

  if (!href) {
    canonical?.remove();
    return;
  }

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = href;
}

function updateLanguageAlternates(alternates) {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((element) => element.remove());

  alternates.forEach(({ hreflang, href }) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = hreflang;
    link.href = href;
    link.dataset.seoManaged = "true";
    document.head.appendChild(link);
  });
}

function updateOgLocaleAlternates(locale) {
  document.head
    .querySelectorAll('meta[property="og:locale:alternate"]')
    .forEach((element) => element.remove());

  LOCALES.filter((candidate) => candidate !== locale).forEach((candidate) => {
    const meta = document.createElement("meta");
    meta.setAttribute("property", "og:locale:alternate");
    meta.setAttribute("content", LOCALE_META[candidate].og);
    meta.dataset.seoManaged = "true";
    document.head.appendChild(meta);
  });
}

function updateStructuredData(data) {
  const id = "eiad-structured-data";
  let script = document.head.querySelector(`#${id}`);

  if (!data) {
    script?.remove();
    return;
  }

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data).replaceAll("<", "\\u003c");
}

function updateManifestLink() {
  let manifest = document.head.querySelector('link[rel="manifest"]');
  if (!manifest) {
    manifest = document.createElement("link");
    manifest.rel = "manifest";
    manifest.href = "/site.webmanifest";
    document.head.appendChild(manifest);
  }
}

function getRobotsPolicy({ hostname, isNotFound, forceNoIndex }) {
  const normalizedHostname = String(hostname || "").split(":")[0].toLowerCase();
  const isProduction = PRODUCTION_HOSTS.has(normalizedHostname);

  if (forceNoIndex || !isProduction) return "noindex,nofollow,noarchive";
  if (isNotFound) return "noindex,follow,noarchive";
  return "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
}

export default function Seo({ page, noIndex = false }) {
  const { locale, localeMeta } = useLocale();
  const location = useLocation();
  const resolvedPage = normalizeSeoPage(page || getPageFromPath(location.pathname));

  const seo = useMemo(
    () => getSeoCopy(locale, resolvedPage),
    [locale, resolvedPage],
  );

  useEffect(() => {
    const isNotFound = resolvedPage === "notFound";
    const robots = getRobotsPolicy({
      hostname: window.location.hostname,
      isNotFound,
      forceNoIndex: noIndex,
    });
    const canonical = isNotFound ? null : getLocalizedUrl(locale, resolvedPage);
    const alternates = isNotFound ? [] : getAlternateLinks(resolvedPage);
    const structuredData = isNotFound
      ? null
      : getStructuredData(locale, resolvedPage);

    document.title = seo.title;
    document.documentElement.lang = locale;
    document.documentElement.dir = localeMeta.dir;

    updateMeta("name", "description", seo.description);
    updateMeta("name", "author", SITE_IDENTITY.name);
    updateMeta("name", "robots", robots);
    updateMeta("name", "googlebot", robots);
    updateMeta("name", "application-name", seo.siteName);

    updateMeta("property", "og:title", seo.title);
    updateMeta("property", "og:description", seo.description);
    updateMeta("property", "og:type", "website");
    updateMeta("property", "og:url", canonical);
    updateMeta("property", "og:site_name", seo.siteName);
    updateMeta("property", "og:locale", localeMeta.og);
    updateMeta("property", "og:image", SOCIAL_IMAGE.url);
    updateMeta("property", "og:image:secure_url", SOCIAL_IMAGE.url);
    updateMeta("property", "og:image:type", SOCIAL_IMAGE.type);
    updateMeta("property", "og:image:width", String(SOCIAL_IMAGE.width));
    updateMeta("property", "og:image:height", String(SOCIAL_IMAGE.height));
    updateMeta("property", "og:image:alt", seo.socialImageAlt);

    updateMeta("name", "twitter:card", "summary_large_image");
    updateMeta("name", "twitter:title", seo.title);
    updateMeta("name", "twitter:description", seo.description);
    updateMeta("name", "twitter:image", SOCIAL_IMAGE.url);
    updateMeta("name", "twitter:image:alt", seo.socialImageAlt);

    updateCanonical(canonical);
    updateLanguageAlternates(alternates);
    updateOgLocaleAlternates(locale);
    updateStructuredData(structuredData);
    updateManifestLink();
  }, [locale, localeMeta.dir, localeMeta.og, noIndex, resolvedPage, seo]);

  return null;
}
