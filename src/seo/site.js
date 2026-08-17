import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  PAGE_PATHS,
  isLocale,
  localizedPath,
} from "../i18n/config.js";

export const SITE_URL = "https://eiadsoufan.netlify.app";

export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/og-cover.png`,
  width: 1200,
  height: 630,
  type: "image/png",
};

export const SITE_IDENTITY = {
  name: "Eiad Soufan",
  email: "eiad.soufan.2@gmail.com",
  phone: "+60183035842",
  city: "Kuala Lumpur",
  country: "MY",
  github: "https://github.com/Eiad-Soufan",
  linkedin: "https://www.linkedin.com/in/eiad-soufan-a11914358/",
};

export const INDEXABLE_PAGES = ["home", "about", "approach", "contact"];

export const SEO_COPY = {
  en: {
    siteName: "Eiad Soufan",
    jobTitle: "Lead Software Engineer",
    socialImageAlt: "Eiad Soufan — Lead Software Engineer and Applied AI Builder",
    noscript:
      "JavaScript is disabled. The full portfolio remains available below; only motion and interactive controls are unavailable.",
    pages: {
      home: {
        label: "Home",
        title: "Eiad Soufan — Lead Software Engineer & Applied AI Builder",
        description:
          "Portfolio of Eiad Soufan, a Kuala Lumpur-based lead software engineer building production-grade enterprise, SaaS, web, mobile, and AI/RAG systems.",
      },
      about: {
        label: "About",
        title: "About Eiad Soufan — Engineering Leadership & Applied AI",
        description:
          "Meet Eiad Soufan: a senior Python, Django, and React engineer, technical lead, published researcher, and builder of AI-powered enterprise and SaaS products.",
      },
      approach: {
        label: "Approach",
        title: "Engineering Approach — Architecture & AI | Eiad Soufan",
        description:
          "How Eiad Soufan turns complex requirements into maintainable systems through clear architecture, pragmatic delivery, observability, and continuous improvement.",
      },
      contact: {
        label: "Contact",
        title: "Contact Eiad Soufan — Software Engineering & AI",
        description:
          "Contact Eiad Soufan for engineering leadership, Python and Django platforms, React and Flutter products, SaaS delivery, or applied AI collaboration.",
      },
      notFound: {
        label: "Page not found",
        title: "Page Not Found | Eiad Soufan",
        description: "The requested page is unavailable. Return to Eiad Soufan's portfolio.",
      },
    },
  },
  ar: {
    siteName: "إياد صوفان",
    jobTitle: "مهندس برمجيات قيادي",
    socialImageAlt: "إياد صوفان — هندسة برمجيات قيادية وأنظمة ذكاء اصطناعي",
    noscript:
      "JavaScript غير مفعّل. يبقى محتوى الموقع كاملاً أدناه؛ الذي يتوقف فقط هو الحركات والعناصر التفاعلية.",
    pages: {
      home: {
        label: "الرئيسية",
        title: "إياد صوفان — هندسة برمجيات تقود الأنظمة الذكية إلى الواقع",
        description:
          "الموقع المهني لإياد صوفان، مهندس برمجيات قيادي في كوالالمبور يبني منصات مؤسسية ومنتجات SaaS وحلول ويب وموبايل وأنظمة ذكاء اصطناعي موثوقة.",
      },
      about: {
        label: "عن إياد",
        title: "عن إياد صوفان — خبرة هندسية تصنع أثراً قابلاً للقياس",
        description:
          "تعرّف إلى إياد صوفان: مهندس برمجيات أول وقائد تقني بخبرة عميقة في Python وDjango وReact، يبني منصات مؤسسية ومنتجات SaaS مدعومة بالذكاء الاصطناعي.",
      },
      approach: {
        label: "المنهج",
        title: "منهجي الهندسي — وضوح في المعمارية وقوة في التنفيذ",
        description:
          "منهج إياد صوفان لتحويل التعقيد إلى أنظمة قابلة للصيانة والتوسع، عبر معمارية واضحة وتنفيذ عملي ومراقبة دقيقة وتحسين مستمر.",
      },
      contact: {
        label: "التواصل",
        title: "تواصل مع إياد صوفان — لنبنِ نظاماً يستحق الثقة",
        description:
          "تواصل مع إياد صوفان من أجل قيادة هندسية أو منصات Python وDjango أو منتجات React وFlutter أو حلول SaaS وتطبيقات الذكاء الاصطناعي.",
      },
      notFound: {
        label: "الصفحة غير موجودة",
        title: "الصفحة غير موجودة | إياد صوفان",
        description: "تعذّر الوصول إلى الصفحة المطلوبة. عد إلى الموقع المهني لإياد صوفان.",
      },
    },
  },
  ms: {
    siteName: "Eiad Soufan",
    jobTitle: "Jurutera Perisian Utama",
    socialImageAlt: "Eiad Soufan — Jurutera Perisian Utama dan Pembangun AI Gunaan",
    noscript:
      "JavaScript dinyahaktifkan. Kandungan penuh portfolio kekal tersedia di bawah; hanya gerakan dan kawalan interaktif tidak tersedia.",
    pages: {
      home: {
        label: "Utama",
        title: "Eiad Soufan — Jurutera Perisian Utama & Pembangun AI Gunaan",
        description:
          "Portfolio Eiad Soufan, jurutera perisian utama di Kuala Lumpur yang membina sistem perusahaan, SaaS, web, mudah alih dan AI/RAG bertaraf produksi.",
      },
      about: {
        label: "Tentang",
        title: "Tentang Eiad Soufan — Kepimpinan Kejuruteraan & AI Gunaan",
        description:
          "Kenali Eiad Soufan, jurutera kanan Python, Django dan React serta peneraju teknikal yang membina platform perusahaan berkuasa AI dan produk SaaS.",
      },
      approach: {
        label: "Pendekatan",
        title: "Pendekatan Kejuruteraan — Seni Bina & AI | Eiad Soufan",
        description:
          "Cara Eiad Soufan menukar keperluan kompleks kepada sistem yang mudah diselenggara melalui seni bina jelas, penyampaian pragmatik dan penambahbaikan berterusan.",
      },
      contact: {
        label: "Hubungi",
        title: "Hubungi Eiad Soufan — Kejuruteraan Perisian & AI",
        description:
          "Hubungi Eiad Soufan di Kuala Lumpur untuk kepimpinan kejuruteraan, platform Python dan Django, produk React dan Flutter, SaaS atau kerjasama AI gunaan.",
      },
      notFound: {
        label: "Halaman tidak ditemui",
        title: "Halaman Tidak Ditemui | Eiad Soufan",
        description: "Halaman yang diminta tidak tersedia. Kembali ke portfolio Eiad Soufan.",
      },
    },
  },
  fr: {
    siteName: "Eiad Soufan",
    jobTitle: "Ingénieur logiciel principal",
    socialImageAlt: "Eiad Soufan — Ingénieur logiciel principal et expert en IA appliquée",
    noscript:
      "JavaScript est désactivé. Le portfolio complet reste disponible ci-dessous ; seuls les mouvements et contrôles interactifs sont indisponibles.",
    pages: {
      home: {
        label: "Accueil",
        title: "Eiad Soufan — Ingénieur logiciel principal & IA appliquée",
        description:
          "Portfolio d’Eiad Soufan, ingénieur logiciel principal à Kuala Lumpur, spécialisé dans les systèmes d’entreprise, SaaS, web, mobile et IA/RAG en production.",
      },
      about: {
        label: "À propos",
        title: "À propos d’Eiad Soufan — Leadership technique & IA appliquée",
        description:
          "Découvrez Eiad Soufan : ingénieur senior Python, Django et React, responsable technique et créateur de plateformes d’entreprise et de produits SaaS propulsés par l’IA.",
      },
      approach: {
        label: "Méthode",
        title: "Méthode d’ingénierie — Architecture & IA | Eiad Soufan",
        description:
          "Eiad Soufan transforme les besoins complexes en systèmes maintenables avec une architecture claire, une exécution pragmatique et une amélioration continue.",
      },
      contact: {
        label: "Contact",
        title: "Contacter Eiad Soufan — Ingénierie logicielle & IA",
        description:
          "Contactez Eiad Soufan pour du leadership technique, des plateformes Python et Django, des produits React et Flutter, du SaaS ou de l’IA appliquée.",
      },
      notFound: {
        label: "Page introuvable",
        title: "Page introuvable | Eiad Soufan",
        description: "La page demandée n’est pas disponible. Revenez au portfolio d’Eiad Soufan.",
      },
    },
  },
  de: {
    siteName: "Eiad Soufan",
    jobTitle: "Leitender Softwareingenieur",
    socialImageAlt: "Eiad Soufan — Leitender Softwareingenieur und Entwickler angewandter KI",
    noscript:
      "JavaScript ist deaktiviert. Das vollständige Portfolio bleibt unten verfügbar; lediglich Animationen und interaktive Bedienelemente sind nicht verfügbar.",
    pages: {
      home: {
        label: "Startseite",
        title: "Eiad Soufan — Leitender Softwareingenieur & angewandte KI",
        description:
          "Portfolio von Eiad Soufan, leitender Softwareingenieur in Kuala Lumpur für produktionsreife Unternehmens-, SaaS-, Web-, Mobile- und KI/RAG-Systeme.",
      },
      about: {
        label: "Über mich",
        title: "Über Eiad Soufan — Engineering Leadership & angewandte KI",
        description:
          "Eiad Soufan ist Senior Engineer für Python, Django und React sowie Technical Lead für KI-gestützte Unternehmensplattformen und SaaS-Produkte.",
      },
      approach: {
        label: "Arbeitsweise",
        title: "Engineering-Ansatz — Architektur & KI | Eiad Soufan",
        description:
          "Wie Eiad Soufan komplexe Anforderungen durch klare Architektur, pragmatische Delivery, Beobachtbarkeit und laufende Verbesserung in wartbare Systeme überführt.",
      },
      contact: {
        label: "Kontakt",
        title: "Eiad Soufan kontaktieren — Software Engineering & KI",
        description:
          "Kontaktieren Sie Eiad Soufan in Kuala Lumpur für Engineering Leadership, Python- und Django-Plattformen, React- und Flutter-Produkte, SaaS oder angewandte KI.",
      },
      notFound: {
        label: "Seite nicht gefunden",
        title: "Seite nicht gefunden | Eiad Soufan",
        description: "Die angeforderte Seite ist nicht verfügbar. Kehren Sie zu Eiad Soufans Portfolio zurück.",
      },
    },
  },
};

export function normalizeSeoPage(page) {
  return INDEXABLE_PAGES.includes(page) ? page : "notFound";
}

export function getSeoCopy(locale = DEFAULT_LOCALE, page = "home") {
  const safeLocale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const safePage = normalizeSeoPage(page);
  const localeCopy = SEO_COPY[safeLocale] || SEO_COPY[DEFAULT_LOCALE];

  return {
    locale: safeLocale,
    localeMeta: LOCALE_META[safeLocale],
    siteName: localeCopy.siteName,
    jobTitle: localeCopy.jobTitle,
    socialImageAlt: localeCopy.socialImageAlt,
    noscript: localeCopy.noscript,
    page: safePage,
    ...localeCopy.pages[safePage],
  };
}

export function getLocalizedUrl(locale, page = "home") {
  const safePage = normalizeSeoPage(page);
  const pageForUrl = safePage === "notFound" ? "home" : safePage;
  return new URL(localizedPath(locale, pageForUrl), `${SITE_URL}/`).href;
}

export function getXDefaultUrl(page = "home") {
  const safePage = normalizeSeoPage(page);
  if (safePage === "home") return `${SITE_URL}/`;
  if (safePage === "notFound") return null;
  return getLocalizedUrl(DEFAULT_LOCALE, safePage);
}

export function getAlternateLinks(page = "home") {
  const safePage = normalizeSeoPage(page);
  if (safePage === "notFound") return [];

  return [
    ...LOCALES.map((locale) => ({
      hreflang: locale,
      href: getLocalizedUrl(locale, safePage),
    })),
    { hreflang: "x-default", href: getXDefaultUrl(safePage) },
  ];
}

export function getStructuredData(locale = DEFAULT_LOCALE, page = "home") {
  const seo = getSeoCopy(locale, page);
  if (seo.page === "notFound") return null;

  const canonical = getLocalizedUrl(seo.locale, seo.page);
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${canonical}#webpage`;
  const pageTypes = {
    home: "WebPage",
    about: "ProfilePage",
    approach: "WebPage",
    contact: "ContactPage",
  };

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_IDENTITY.name,
      url: `${SITE_URL}/`,
      jobTitle: seo.jobTitle,
      email: `mailto:${SITE_IDENTITY.email}`,
      telephone: SITE_IDENTITY.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_IDENTITY.city,
        addressCountry: SITE_IDENTITY.country,
      },
      sameAs: [SITE_IDENTITY.github, SITE_IDENTITY.linkedin],
      knowsAbout: [
        "Software Architecture",
        "Python",
        "Django",
        "React",
        "Flutter",
        "SaaS",
        "Artificial Intelligence",
        "Retrieval-Augmented Generation",
        "Technical Leadership",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_URL}/`,
      name: SITE_IDENTITY.name,
      inLanguage: LOCALES,
      publisher: { "@id": personId },
    },
    {
      "@type": pageTypes[seo.page],
      "@id": webpageId,
      url: canonical,
      name: seo.title,
      description: seo.description,
      inLanguage: seo.locale,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      about: { "@id": personId },
      ...(seo.page !== "home"
        ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } }
        : {}),
    },
  ];

  if (seo.page !== "home") {
    const homeSeo = getSeoCopy(seo.locale, "home");
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: homeSeo.label,
          item: getLocalizedUrl(seo.locale, "home"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.label,
          item: canonical,
        },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function getSitemapEntries() {
  return LOCALES.flatMap((locale) =>
    INDEXABLE_PAGES.map((page) => ({
      locale,
      page,
      url: getLocalizedUrl(locale, page),
      alternates: getAlternateLinks(page),
    })),
  );
}

export function pageFromSegment(segment = "") {
  const match = Object.entries(PAGE_PATHS).find(([, value]) => value === segment);
  return match?.[0] || "notFound";
}
