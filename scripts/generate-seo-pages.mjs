import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createServer } from "vite";
import { DEFAULT_LOCALE, LOCALE_META } from "../src/i18n/config.js";
import {
  SOCIAL_IMAGE,
  SITE_IDENTITY,
  getAlternateLinks,
  getSeoCopy,
  getSitemapEntries,
  getStructuredData,
} from "../src/seo/site.js";

const MANAGED_META_NAMES = [
  "description",
  "author",
  "robots",
  "googlebot",
  "application-name",
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "twitter:image:alt",
];

const MANAGED_META_PROPERTIES = [
  "og:title",
  "og:description",
  "og:type",
  "og:url",
  "og:site_name",
  "og:locale",
  "og:locale:alternate",
  "og:image",
  "og:image:secure_url",
  "og:image:type",
  "og:image:width",
  "og:image:height",
  "og:image:alt",
];

const PAGE_MODULES = {
  about: "src/pages/AboutUs.jsx",
  approach: "src/pages/WhyUs.jsx",
  contact: "src/pages/Contact.jsx",
};

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function injectBeforeHeadClose(html, content) {
  return html.replace(/^[ \t]*<\/head>/m, `${content}  </head>`);
}

function removeMeta(html, attribute, key) {
  const pattern = new RegExp(
    `\\s*<meta\\b(?=[^>]*\\b${attribute}\\s*=\\s*["']${escapeRegex(key)}["'])[^>]*\\/?>`,
    "gi",
  );
  return html.replace(pattern, "");
}

function stripManagedSeo(html) {
  let output = html.replace(/\s*<title\b[^>]*>[\s\S]*?<\/title>/gi, "");

  MANAGED_META_NAMES.forEach((name) => {
    output = removeMeta(output, "name", name);
  });
  MANAGED_META_PROPERTIES.forEach((property) => {
    output = removeMeta(output, "property", property);
  });

  output = output.replace(
    /\s*<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi,
    "",
  );
  output = output.replace(
    /\s*<link\b(?=[^>]*\brel\s*=\s*["']alternate["'])(?=[^>]*\bhreflang\s*=)[^>]*>/gi,
    "",
  );
  output = output.replace(
    /\s*<script\b(?=[^>]*\bid\s*=\s*["']eiad-structured-data["'])[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );

  return output;
}

function localizeNoscript(html, message) {
  const block = [
    "<noscript>",
    "      <style>",
    '        #root [style*="opacity:0"] { opacity: 1 !important; filter: none !important; transform: none !important; }',
    '        #root [style*="scaleY(0)"] { transform: none !important; }',
    "      </style>",
    `      <p style="margin:0;padding:.7rem 1rem;background:#101827;color:#cbd5e1;text-align:center;font:600 .78rem/1.6 system-ui,sans-serif">${escapeHtml(message)}</p>`,
    "    </noscript>",
  ].join("\n");

  return html.replace(/<noscript>[\s\S]*?<\/noscript>/i, block);
}

function renderSeoBlock(locale, page, canonical, robots) {
  const seo = getSeoCopy(locale, page);
  const alternates = getAlternateLinks(page);
  const structuredData = getStructuredData(locale, page);
  const ogLocaleAlternates = Object.entries(LOCALE_META)
    .filter(([candidate]) => candidate !== locale)
    .map(
      ([, meta]) =>
        `    <meta property="og:locale:alternate" content="${escapeHtml(meta.og)}" />`,
    );

  return [
    "",
    "    <!-- Route-specific SEO: generated at build time -->",
    `    <title>${escapeHtml(seo.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="author" content="${escapeHtml(SITE_IDENTITY.name)}" />`,
    `    <meta name="robots" content="${escapeHtml(robots)}" />`,
    `    <meta name="googlebot" content="${escapeHtml(robots)}" />`,
    `    <meta name="application-name" content="${escapeHtml(seo.siteName)}" />`,
    `    <link rel="canonical" href="${escapeHtml(canonical)}" />`,
    ...alternates.map(
      ({ hreflang, href }) =>
        `    <link rel="alternate" hreflang="${escapeHtml(hreflang)}" href="${escapeHtml(href)}" />`,
    ),
    `    <meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `    <meta property="og:site_name" content="${escapeHtml(seo.siteName)}" />`,
    `    <meta property="og:locale" content="${escapeHtml(LOCALE_META[locale].og)}" />`,
    ...ogLocaleAlternates,
    `    <meta property="og:image" content="${escapeHtml(SOCIAL_IMAGE.url)}" />`,
    `    <meta property="og:image:secure_url" content="${escapeHtml(SOCIAL_IMAGE.url)}" />`,
    `    <meta property="og:image:type" content="${escapeHtml(SOCIAL_IMAGE.type)}" />`,
    `    <meta property="og:image:width" content="${SOCIAL_IMAGE.width}" />`,
    `    <meta property="og:image:height" content="${SOCIAL_IMAGE.height}" />`,
    `    <meta property="og:image:alt" content="${escapeHtml(seo.socialImageAlt)}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtml(SOCIAL_IMAGE.url)}" />`,
    `    <meta name="twitter:image:alt" content="${escapeHtml(seo.socialImageAlt)}" />`,
    '    <link rel="manifest" href="/site.webmanifest" />',
    `    <script id="eiad-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>`,
    "",
  ].join("\n");
}

function renderLocalizedHtml(baseHtml, locale, page, canonical, robots) {
  let html = stripManagedSeo(baseHtml);
  html = localizeNoscript(html, getSeoCopy(locale, page).noscript);
  html = html.replace(
    /<html\b[^>]*>/i,
    `<html lang="${locale}" dir="${LOCALE_META[locale].dir}">`,
  );
  html = html.replace(
    /\s*<link\b(?=[^>]*\brel\s*=\s*["']manifest["'])[^>]*>/gi,
    "",
  );
  html = injectBeforeHeadClose(
    html,
    renderSeoBlock(locale, page, canonical, robots),
  );
  return html;
}

function renderNotFoundHtml(baseHtml, robots, locale = DEFAULT_LOCALE) {
  const seo = getSeoCopy(locale, "notFound");
  let html = stripManagedSeo(baseHtml);
  html = localizeNoscript(html, seo.noscript);
  html = html.replace(
    /<html\b[^>]*>/i,
    `<html lang="${locale}" dir="${LOCALE_META[locale].dir}">`,
  );
  html = html.replace(
    /\s*<link\b(?=[^>]*\brel\s*=\s*["']manifest["'])[^>]*>/gi,
    "",
  );

  const block = [
    "",
    "    <!-- Real 404 metadata: generated at build time -->",
    `    <title>${escapeHtml(seo.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="author" content="${escapeHtml(SITE_IDENTITY.name)}" />`,
    `    <meta name="robots" content="${escapeHtml(robots)}" />`,
    `    <meta name="googlebot" content="${escapeHtml(robots)}" />`,
    `    <meta name="application-name" content="${escapeHtml(seo.siteName)}" />`,
    `    <meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:site_name" content="${escapeHtml(seo.siteName)}" />`,
    `    <meta property="og:locale" content="${escapeHtml(LOCALE_META[locale].og)}" />`,
    `    <meta property="og:image" content="${escapeHtml(SOCIAL_IMAGE.url)}" />`,
    `    <meta property="og:image:secure_url" content="${escapeHtml(SOCIAL_IMAGE.url)}" />`,
    `    <meta property="og:image:type" content="${escapeHtml(SOCIAL_IMAGE.type)}" />`,
    `    <meta property="og:image:width" content="${SOCIAL_IMAGE.width}" />`,
    `    <meta property="og:image:height" content="${SOCIAL_IMAGE.height}" />`,
    `    <meta property="og:image:alt" content="${escapeHtml(seo.socialImageAlt)}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtml(SOCIAL_IMAGE.url)}" />`,
    `    <meta name="twitter:image:alt" content="${escapeHtml(seo.socialImageAlt)}" />`,
    '    <link rel="manifest" href="/site.webmanifest" />',
    "",
  ].join("\n");

  return injectBeforeHeadClose(html, block);
}

function renderGatewayHtml(baseHtml, robots) {
  let html = removeMeta(baseHtml, "name", "robots");
  html = removeMeta(html, "name", "googlebot");
  const block = [
    "",
    "    <!-- Gateway indexing policy: generated at build time -->",
    `    <meta name="robots" content="${escapeHtml(robots)}" />`,
    `    <meta name="googlebot" content="${escapeHtml(robots)}" />`,
    "",
  ].join("\n");
  return injectBeforeHeadClose(html, block);
}

function renderSitemap(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  entries.forEach((entry) => {
    lines.push("  <url>", `    <loc>${escapeHtml(entry.url)}</loc>`);
    entry.alternates.forEach(({ hreflang, href }) => {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${escapeHtml(hreflang)}" href="${escapeHtml(href)}" />`,
      );
    });
    lines.push("  </url>");
  });

  lines.push("</urlset>", "");
  return lines.join("\n");
}

function injectRenderedApp(html, appHtml) {
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) {
    throw new Error("Could not find the root application marker in built index.html");
  }
  return html.replace(
    marker,
    `<div id="root" data-prerendered="true">${appHtml}</div>`,
  );
}

function resolveBuiltAssetUrls(html, manifest) {
  let resolved = html;
  Object.entries(manifest).forEach(([source, entry]) => {
    if (!source.startsWith("src/assets/") || !entry?.file) return;
    resolved = resolved.replaceAll(`/${source}`, `/${entry.file}`);
  });
  return resolved;
}

function injectRouteStyles(html, page, manifest) {
  const moduleId = PAGE_MODULES[page];
  const cssFiles = moduleId ? manifest[moduleId]?.css ?? [] : [];
  if (cssFiles.length === 0) return html;

  const links = cssFiles
    .map(
      (file) =>
        `    <link rel="stylesheet" crossorigin href="/${escapeHtml(file)}" />`,
    )
    .join("\n");

  return injectBeforeHeadClose(html, `${links}\n`);
}

export async function generateSeoPages(outputDirectory = "dist") {
  const absoluteOutputDirectory = path.resolve(process.cwd(), outputDirectory);
  const baseIndexPath = path.join(absoluteOutputDirectory, "index.html");
  const baseHtml = await readFile(baseIndexPath, "utf8");
  const manifest = JSON.parse(
    await readFile(
      path.join(absoluteOutputDirectory, ".vite", "manifest.json"),
      "utf8",
    ),
  );
  const written = [];
  const isProduction = process.env.CONTEXT === "production";
  const routeRobots = isProduction
    ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    : "noindex,nofollow,noarchive";
  await writeFile(
    baseIndexPath,
    renderGatewayHtml(baseHtml, routeRobots),
    "utf8",
  );
  written.push(baseIndexPath);

  const vite = await createServer({
    appType: "custom",
    logLevel: "error",
    server: { middlewareMode: true },
    resolve: {
      alias: {
        "react-router-dom": path.resolve(
          process.cwd(),
          "node_modules/react-router-dom/dist/index.mjs",
        ),
      },
    },
  });

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

    for (const entry of getSitemapEntries()) {
      const pathname = new URL(entry.url).pathname;
      const relativeDirectory = pathname.replace(/^\/+|\/+$/g, "");
      const directory = path.join(absoluteOutputDirectory, relativeDirectory);
      const outputPath = path.join(directory, "index.html");
      const appHtml = resolveBuiltAssetUrls(await render(pathname), manifest);
      const localizedHtml = injectRenderedApp(
        injectRouteStyles(
          renderLocalizedHtml(
            baseHtml,
            entry.locale,
            entry.page,
            entry.url,
            routeRobots,
          ),
          entry.page,
          manifest,
        ),
        appHtml,
      );

      await mkdir(directory, { recursive: true });
      await writeFile(outputPath, localizedHtml, "utf8");
      written.push(outputPath);
    }

    const notFoundRobots = isProduction
      ? "noindex,follow,noarchive"
      : "noindex,nofollow,noarchive";
    for (const locale of Object.keys(LOCALE_META)) {
      const localeNotFoundPath = path.join(
        absoluteOutputDirectory,
        locale,
        "404.html",
      );
      const notFoundHtml = injectRenderedApp(
        renderNotFoundHtml(baseHtml, notFoundRobots, locale),
        resolveBuiltAssetUrls(await render(`/${locale}/404`), manifest),
      );
      await mkdir(path.dirname(localeNotFoundPath), { recursive: true });
      await writeFile(localeNotFoundPath, notFoundHtml, "utf8");
      written.push(localeNotFoundPath);

      if (locale === DEFAULT_LOCALE) {
        const defaultNotFoundPath = path.join(absoluteOutputDirectory, "404.html");
        await writeFile(defaultNotFoundPath, notFoundHtml, "utf8");
        written.push(defaultNotFoundPath);
      }
    }

    const sitemapPath = path.join(absoluteOutputDirectory, "sitemap.xml");
    await writeFile(sitemapPath, renderSitemap(getSitemapEntries()), "utf8");
    written.push(sitemapPath);
  } finally {
    await vite.close();
  }

  return written;
}

const executedFile = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : null;

if (executedFile === import.meta.url) {
  generateSeoPages(process.argv[2] || "dist").catch((error) => {
    const scriptName = path.basename(fileURLToPath(import.meta.url));
    process.stderr.write(`${scriptName}: ${error.stack || error.message}\n`);
    process.exitCode = 1;
  });
}
