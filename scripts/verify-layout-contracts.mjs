import { readFile } from "node:fs/promises";

const [hero, signature, header, metrics, base] = await Promise.all([
  readFile(new URL("../src/components/HeroNova.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/SignatureField.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/Header.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/ImpactMetrics.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/styles/base.css", import.meta.url), "utf8"),
]);

function assert(condition, message) {
  if (!condition) throw new Error(`Layout contract failed: ${message}`);
}

for (const hook of [
  "home-hero-container",
  "home-hero-grid",
  "home-hero-copy",
  "home-hero-visual",
]) {
  assert(hero.includes(hook), `HeroNova is missing the ${hook} hook`);
}

assert(
  signature.includes("home-signature-field"),
  "SignatureField must expose its bounded layout hook",
);
assert(
  header.includes("header-container"),
  "Header must share the explicit centered-container contract",
);
assert(
  metrics.includes("impact-metric") && metrics.includes("min-w-0"),
  "compact metric cells must be protected against numeric overflow",
);

assert(
  /\.site-container\s*\{[\s\S]*?width:\s*100%;[\s\S]*?max-width:\s*var\(--site-width\);[\s\S]*?margin-left:\s*auto;[\s\S]*?margin-right:\s*auto;/.test(
    base,
  ),
  "site-container must use symmetric physical auto margins",
);
assert(
  /\.site-container\.home-hero-container\s*\{[\s\S]*?max-width:\s*var\(--site-width\);/.test(
    base,
  ),
  "Home hero must retain the same maximum rail width as every site container",
);

const fullWidthRules = [...base.matchAll(/([^{}]+)\{([^{}]*max-width:\s*100%[^{}]*)\}/g)];
assert(
  fullWidthRules.every(([, selectors]) => !selectors.includes(".home-hero-container")),
  "Home hero container must never be widened beyond the shared site rail",
);
assert(
  /\.home-hero-grid\s*\{[\s\S]*?direction:\s*ltr;[\s\S]*?grid-template-areas:[\s\S]*?"copy"[\s\S]*?"visual";[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\);/.test(
    base,
  ),
  "mobile and tablet hero layout must remain a single explicit column",
);
assert(
  /@media\s*\(min-width:\s*70rem\)[\s\S]*?grid-template-areas:\s*"copy visual";[\s\S]*?grid-template-columns:\s*minmax\(0,\s*7fr\)\s*minmax\(20rem,\s*5fr\);/.test(
    base,
  ),
  "desktop LTR hero tracks must preserve the 7/5 copy-to-visual hierarchy",
);
assert(
  /\[dir="rtl"\]\s*\.home-hero-grid\s*\{[\s\S]*?grid-template-areas:\s*"visual copy";[\s\S]*?grid-template-columns:\s*minmax\(20rem,\s*5fr\)\s*minmax\(0,\s*7fr\);/.test(
    base,
  ),
  "desktop RTL hero tracks must explicitly mirror areas and weights",
);

for (const cell of ["home-hero-copy", "home-hero-visual"]) {
  assert(
    new RegExp(`\\.${cell}[^}]*\\{[\\s\\S]*?min-width:\\s*0;`).test(base) ||
      base.includes(`.${cell},`),
    `${cell} must be protected against intrinsic-width overflow`,
  );
}

assert(
  !/(?:100vw|w-screen|-mx-)/.test(hero),
  "HeroNova must not introduce viewport-width or negative-margin overflow",
);

process.stdout.write("Layout contract verification passed: 17 checks.\n");
