import { readFile } from "node:fs/promises";

const readSource = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");
const heroFiles = [
  "src/pages/Home.jsx",
  "src/pages/AboutUs.jsx",
  "src/pages/WhyUs.jsx",
  "src/pages/Contact.jsx",
];
const heroPages = ["home", "about", "approach", "contact"];
const [pages, hero, header, metrics, base, cosmos] = await Promise.all([
  Promise.all(heroFiles.map(readSource)),
  readSource("src/components/PageHero.jsx"),
  readSource("src/components/Header.jsx"),
  readSource("src/components/ImpactMetrics.jsx"),
  readSource("src/styles/base.css"),
  readSource("src/components/NeuralCosmos.jsx"),
]);

function assert(condition, message) {
  if (!condition) throw new Error(`Layout contract failed: ${message}`);
}

for (const [index, page] of pages.entries()) {
  assert(
    page.includes(`<PageHero page="${heroPages[index]}" />`),
    `${heroFiles[index]} must use the shared hero for ${heroPages[index]}`,
  );
}

for (const hook of [
  "page-hero",
  "page-hero-frame",
  "page-hero-copy",
  "page-hero-eyebrow",
  "page-hero-title",
  "page-hero-lead",
  "page-hero-actions",
  "page-hero-meta",
]) {
  assert(hero.includes(hook), `PageHero is missing the ${hook} hook`);
}

assert(
  !/(?:100vw|w-screen|-mx-)/.test(hero),
  "PageHero must keep its content within the container gutters",
);

assert(
  hero.includes("<NeuralCosmos page={page} />"),
  "PageHero must supply the current page to its shared background",
);

assert(
  !/<(?:img|picture|SignatureField)\b/.test(hero),
  "The homepage hero must use the shared text layout without side artwork",
);
assert(
  cosmos.includes("hero-readability-veil"),
  "The shared background must keep its readability overlay",
);
assert(
  header.includes("header-container"),
  "Header must share the explicit centered-container contract",
);
assert(
  metrics.includes("impact-metric") && metrics.includes("min-w-0"),
  "Compact metric cells must be protected against numeric overflow",
);
assert(
  /\.site-container\s*\{[^}]*width:\s*100%;[^}]*max-width:\s*var\(--site-width\);[^}]*margin-left:\s*auto;[^}]*margin-right:\s*auto;/.test(base),
  "Site container must use symmetric physical auto margins",
);
assert(
  /\.page-hero-copy\s*\{[^}]*max-width:\s*60rem;[^}]*margin-inline-end:\s*auto;[^}]*text-align:\s*start;/.test(base),
  "Hero text must share a readable width and align to the start of each language",
);

process.stdout.write("Layout contract verification passed for all four page heroes.\n");
