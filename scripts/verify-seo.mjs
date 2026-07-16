import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { LOCALE_META, getPageFromPath } from "../src/i18n/config.js";
import {
  SITE_URL,
  getAlternateLinks,
  getSeoCopy,
  getSitemapEntries,
} from "../src/seo/site.js";

const PAGE_MODULES = {
  about: "src/pages/AboutUs.jsx",
  approach: "src/pages/WhyUs.jsx",
  contact: "src/pages/Contact.jsx",
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

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

function outputPathForUrl(outputDirectory, url) {
  const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
  return path.join(outputDirectory, pathname, "index.html");
}

export async function verifySeoPages(outputDirectory = "dist") {
  const absoluteOutputDirectory = path.resolve(process.cwd(), outputDirectory);
  const manifest = JSON.parse(
    await readFile(
      path.join(absoluteOutputDirectory, ".vite", "manifest.json"),
      "utf8",
    ),
  );
  const isProduction = process.env.CONTEXT === "production";
  const expectedRobots = isProduction
    ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    : "noindex,nofollow,noarchive";
  const entries = getSitemapEntries();

  const routeExpectations = new Map([
    ["/", "home"],
    ["/ar/", "home"],
    ["/de/about", "about"],
    ["/fr/approach", "approach"],
    ["/ms/contact", "contact"],
    ["/about-us", "about"],
    ["/approach", "approach"],
    ["/why-us", "approach"],
    ["/foo", "notFound"],
    ["/en/about/extra", "notFound"],
    ["/en/contact/anything", "notFound"],
  ]);
  for (const [pathname, expectedPage] of routeExpectations) {
    assert(
      getPageFromPath(pathname) === expectedPage,
      `${pathname}: expected ${expectedPage} route classification`,
    );
  }

  const gateway = await readFile(
    path.join(absoluteOutputDirectory, "index.html"),
    "utf8",
  );
  assert(
    gateway.includes(`<meta name="robots" content="${expectedRobots}" />`),
    "Root language gateway has the wrong indexing policy",
  );

  assert(entries.length === 20, `Expected 20 locale routes, received ${entries.length}`);

  for (const entry of entries) {
    const filePath = outputPathForUrl(absoluteOutputDirectory, entry.url);
    const html = await readFile(filePath, "utf8");
    const seo = getSeoCopy(entry.locale, entry.page);
    const direction = LOCALE_META[entry.locale].dir;

    assert(
      html.includes(`<html lang="${entry.locale}" dir="${direction}">`),
      `${filePath}: incorrect document language or direction`,
    );
    assert(
      html.includes(`<title>${escapeHtml(seo.title)}</title>`),
      `${filePath}: incorrect title`,
    );
    assert(
      html.includes(`<link rel="canonical" href="${entry.url}" />`),
      `${filePath}: missing self-canonical`,
    );
    assert(
      html.includes(`<meta name="robots" content="${expectedRobots}" />`),
      `${filePath}: incorrect robots policy for this build context`,
    );
    assert(countMatches(html, /<link rel="canonical"/g) === 1, `${filePath}: duplicate canonical`);
    assert(countMatches(html, /<title>/g) === 1, `${filePath}: duplicate title`);
    assert(countMatches(html, /<meta name="description"/g) === 1, `${filePath}: duplicate description`);
    assert(
      html.includes('<div id="root" data-prerendered="true"><div'),
      `${filePath}: application HTML was not rendered with the hydration guard`,
    );
    assert(html.includes("<h1"), `${filePath}: rendered page has no primary heading`);
    assert(
      !html.includes('id="S:') && !html.includes("$RC("),
      `${filePath}: route content is hidden behind a streamed Suspense payload`,
    );
    assert(!html.includes("/src/assets/"), `${filePath}: unresolved source asset URL`);
    assert(html.includes("/og-cover.png"), `${filePath}: missing social sharing image`);

    const renderedApplication = html.slice(html.indexOf('<div id="root"'));
    for (const alternate of getAlternateLinks(entry.page).filter(
      ({ hreflang }) => hreflang !== "x-default",
    )) {
      const alternatePath = new URL(alternate.href).pathname;
      assert(
        renderedApplication.includes(`href="${alternatePath}"`),
        `${filePath}: missing crawlable ${alternate.hreflang} language link`,
      );
    }

    for (const alternate of getAlternateLinks(entry.page)) {
      assert(
        html.includes(
          `<link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`,
        ),
        `${filePath}: missing ${alternate.hreflang} alternate`,
      );
    }

    const structuredDataMatch = html.match(
      /<script id="eiad-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/,
    );
    assert(structuredDataMatch, `${filePath}: missing structured data`);
    const structuredData = JSON.parse(structuredDataMatch[1]);
    assert(
      structuredData["@graph"]?.some((node) => node["@type"] === "Person"),
      `${filePath}: structured data has no Person entity`,
    );

    const moduleId = PAGE_MODULES[entry.page];
    for (const cssFile of moduleId ? manifest[moduleId]?.css ?? [] : []) {
      assert(
        html.includes(`href="/${cssFile}"`),
        `${filePath}: missing route stylesheet ${cssFile}`,
      );
    }
  }

  const sitemap = await readFile(
    path.join(absoluteOutputDirectory, "sitemap.xml"),
    "utf8",
  );
  assert(countMatches(sitemap, /<url>/g) === 20, "Sitemap must contain 20 URL entries");
  assert(
    countMatches(sitemap, /<xhtml:link /g) === 120,
    "Sitemap must contain six language alternates for every URL",
  );
  for (const entry of entries) {
    assert(
      new RegExp(`<loc>${escapeRegex(entry.url)}</loc>`).test(sitemap),
      `Sitemap is missing ${entry.url}`,
    );
  }

  const redirects = await readFile(
    path.join(absoluteOutputDirectory, "_redirects"),
    "utf8",
  );
  const redirectLines = redirects
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const firstPathRuleIndex = redirectLines.findIndex((line) => line.startsWith("/"));
  for (const alternateHost of [
    "eiadsoufan.blog",
    "www.eiadsoufan.blog",
    "eiadsoufanblog.netlify.app",
  ]) {
    const source = `https://${alternateHost}/*`;
    const lineIndex = redirectLines.findIndex((candidate) =>
      candidate.startsWith(source),
    );
    const line = redirectLines[lineIndex];
    assert(
      line,
      `Missing permanent redirect from ${alternateHost}`,
    );
    const [actualSource, actualTarget, status] = line.split(/\s+/);
    assert(actualSource === source, `Incorrect redirect source for ${alternateHost}`);
    assert(
      actualTarget === `${SITE_URL}/:splat`,
      `${alternateHost} must redirect to the canonical production origin`,
    );
    assert(status === "301!", `${alternateHost} redirect must be a forced 301`);
    assert(
      firstPathRuleIndex === -1 || lineIndex < firstPathRuleIndex,
      `${alternateHost} host redirect must appear before path-only rules`,
    );
  }
  assert(
    !redirectLines.some((line) => line.startsWith(`${SITE_URL}/*`)),
    "Canonical production origin must not redirect to an alternate hostname",
  );

  for (const [locale, meta] of Object.entries(LOCALE_META)) {
    const notFound = await readFile(
      path.join(absoluteOutputDirectory, locale, "404.html"),
      "utf8",
    );
    const notFoundSeo = getSeoCopy(locale, "notFound");
    assert(
      notFound.includes(`<html lang="${locale}" dir="${meta.dir}">`),
      `${locale} 404 has the wrong language or direction`,
    );
    assert(
      notFound.includes(`<title>${escapeHtml(notFoundSeo.title)}</title>`),
      `${locale} 404 has the wrong title`,
    );
    assert(notFound.includes('<meta name="robots" content="noindex,'), `${locale} 404 must be noindex`);
    assert(!notFound.includes('rel="canonical"'), `${locale} 404 must not declare a canonical URL`);
    assert(!notFound.includes("hreflang="), `${locale} 404 must not declare language alternates`);
    assert(
      notFound.includes('<div id="root" data-prerendered="true"><div'),
      `${locale} 404 application HTML was not rendered with the hydration guard`,
    );
  }

  const defaultNotFound = await readFile(
    path.join(absoluteOutputDirectory, "404.html"),
    "utf8",
  );
  assert(
    defaultNotFound.includes('<html lang="en" dir="ltr">'),
    "Default 404 must use English",
  );

  return { routes: entries.length, context: isProduction ? "production" : "preview" };
}

const executedFile = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : null;

if (executedFile === import.meta.url) {
  verifySeoPages(process.argv[2] || "dist")
    .then(({ routes, context }) => {
      process.stdout.write(`SEO verification passed: ${routes} routes (${context}).\n`);
    })
    .catch((error) => {
      process.stderr.write(`${error.stack || error.message}\n`);
      process.exitCode = 1;
    });
}
