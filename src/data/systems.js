import lawnexMark from "../assets/lawnex-mark.webp";
import berkatMadinahMark from "../assets/berkat-mark.webp";
import yallahBaggageMark from "../assets/yallah-mark.webp";

export const systems = [
  {
    id: "lawnex",
    index: "01",
    tier: "flagship",
    category: "Legal intelligence platform",
    title: "LAWNEX",
    tagline: "Legal intelligence, engineered for real-world practice.",
    summary:
      "An AI-powered legal platform that combines structured legal data with retrieval and reasoning workflows across web and mobile.",
    role:
      "Built the Django backend and React platform, and contributed approximately half of the Flutter application.",
    metrics: [
      { value: "4,000+", label: "Active users" },
      { value: "200,000+", label: "Legal units" },
    ],
    stack: ["Django", "React", "Flutter", "AI / RAG"],
    links: [
      { label: "Visit platform", href: "https://lawnex.app/" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.lawnex.app&hl=en-US",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/lawnex/id6771798710",
      },
    ],
    logo: lawnexMark,
    accent: { primary: "#f7b955", glow: "247 185 85" },
  },
  {
    id: "berkat-madinah",
    index: "02",
    tier: "featured",
    category: "Enterprise operations",
    title: "Berkat Madinah Portal",
    tagline: "One operational layer for a multi-branch business.",
    summary:
      "An internal platform for HR requests, complaints, tasks, notifications, and coordinated operations across five branches.",
    role:
      "Led software delivery, workflow implementation, production support, and continuous improvement.",
    metrics: [
      { value: "100+", label: "Employees" },
      { value: "5", label: "Branches" },
    ],
    stack: ["Django", "React", "PostgreSQL"],
    links: [
      {
        label: "View portal",
        href: "https://berkatmadinahportal.netlify.app/",
      },
    ],
    logo: berkatMadinahMark,
    accent: { primary: "#54d68b", glow: "84 214 139" },
  },
  {
    id: "yallah-baggage",
    index: "03",
    tier: "featured",
    category: "Travel logistics",
    title: "Yallah Baggage",
    tagline: "From development environment to reliable production delivery.",
    summary:
      "A web and mobile logistics platform supporting airport-related baggage operations.",
    role:
      "Led deployment, hosting, production readiness, and technical delivery coordination across the product stack.",
    metrics: [],
    stack: ["Node.js", "Vue.js", "Flutter"],
    links: [
      {
        label: "Visit platform",
        href: "https://yalla-baggage.vercel.app/",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.yallapass.app",
      },
    ],
    logo: yallahBaggageMark,
    accent: { primary: "#55b8ff", glow: "85 184 255" },
  },
  {
    id: "mohammad-abo-zeed",
    index: "04",
    tier: "compact",
    category: "Personal brand platform",
    title: "Mohammad Abo Zeed",
    tagline: "A focused Arabic platform for content, products, and consultation.",
    summary:
      "A responsive website with dynamic courses, digital products, articles, and consultation booking.",
    role:
      "Built the platform and managed hosting, domain configuration, deployment, and production release.",
    metrics: [],
    stack: ["Django", "React", "PostgreSQL"],
    links: [
      { label: "Visit website", href: "https://mohammadabozeed.com/" },
    ],
    logo: null,
    accent: { primary: "#b892ff", glow: "184 146 255" },
  },
  {
    id: "arabica-restaurant",
    index: "05",
    tier: "compact",
    category: "Hospitality platform",
    title: "Arabica Restaurant",
    tagline: "A custom publishing platform built for discovery and demand.",
    summary:
      "A production restaurant website with a custom content management system and responsive customer experience.",
    role:
      "Delivered the Django and React website and custom CMS for content publishing and marketing.",
    metrics: [
      { value: "~1,000", label: "Monthly organic visitors" },
      { value: "10K+", label: "Campaign visitors" },
    ],
    stack: ["Django", "React"],
    links: [
      { label: "Visit website", href: "https://arabicarestaurant.my/" },
    ],
    logo: null,
    accent: { primary: "#f08b70", glow: "240 139 112" },
  },
  {
    id: "dates-madinah",
    index: "06",
    tier: "compact",
    category: "Performance marketing",
    title: "Berkat Dates Campaign",
    tagline: "A campaign experience designed to turn attention into action.",
    summary:
      "A focused marketing landing page supporting high-volume dates campaigns and online sales.",
    role:
      "Built the responsive React experience for campaign traffic and conversion-focused journeys.",
    metrics: [{ value: "10K+", label: "Campaign visitors" }],
    stack: ["React"],
    links: [
      { label: "Visit landing page", href: "https://dates.madinah.com.my/" },
    ],
    logo: null,
    accent: { primary: "#e5b96f", glow: "229 185 111" },
  },
];

export default systems;
