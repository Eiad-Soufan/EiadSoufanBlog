import { readFile } from "node:fs/promises";

const readSource = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");
const heroFiles = [
  "src/components/HeroNova.jsx",
  "src/pages/AboutUs.jsx",
  "src/pages/WhyUs.jsx",
  "src/pages/Contact.jsx",
];
const [heroes, header, metrics, base] = await Promise.all([
  Promise.all(heroFiles.map(readSource)),
  readSource("src/components/Header.jsx"),
  readSource("src/components/ImpactMetrics.jsx"),
  readSource("src/styles/base.css"),
]);

function assert(condition, message) {
  if (!condition) throw new Error(`Layout contract failed: ${message}`);
}

for (const [index, hero] of heroes.entries()) {
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
    assert(hero.includes(hook), `${heroFiles[index]} is missing the ${hook} hook`);
  }

  assert(
    !/(?:100vw|w-screen|-mx-)/.test(hero.split("</section>", 1)[0]),
    `${heroFiles[index]} must keep its hero within the container gutters`,
  );
}

assert(
  !/<(?:img|picture|SignatureField)\b/.test(heroes[0]),
  "The homepage hero must use the shared text layout without side artwork",
);
assert(
  heroes[0].includes("<NeuralCosmos />") && heroes[0].includes("hero-readability-veil"),
  "The homepage hero must keep its animated background and readability overlay",
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
