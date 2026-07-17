# Eiad Soufan Portfolio

A multilingual React portfolio for Eiad Soufan, built with Vite and deployed on Netlify.

## Language architecture

The complete interface and page content are available in:

- English: `/en/`
- Arabic: `/ar/` with native RTL layout and Arabic typography
- Bahasa Melayu: `/ms/`
- French: `/fr/`
- German: `/de/`

Each locale has dedicated Home, About, Approach, and Contact URLs. The root URL is a Netlify Edge language gateway: a saved user choice wins, then an unambiguous country match, then `Accept-Language`, with English as the final fallback. Explicit locale URLs are never geo-redirected.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run verify:geo
npm run verify:seo
```

## Build and indexing policy

Preview and local builds are deliberately `noindex`:

```bash
npm run build
```

Only a production build should become indexable:

```bash
CONTEXT=production npm run build
```

Netlify sets `CONTEXT` automatically. The build generates fully rendered HTML for all 20 localized routes, localized 404 documents, canonical and reciprocal `hreflang` links, Open Graph and Twitter metadata, Person/ProfilePage/WebPage/Breadcrumb JSON-LD, and the XML sitemap. Automated verification fails the build if these contracts drift.

## Production checklist

The canonical production origin is `https://eiadsoufan.netlify.app`. Keep the former custom domains and the previous Netlify hostname redirected to this origin. After launch, verify the URL-prefix property in Google Search Console and submit `https://eiadsoufan.netlify.app/sitemap.xml`.
