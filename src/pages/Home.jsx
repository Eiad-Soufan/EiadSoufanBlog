// src/pages/Home.jsx
import one from "../assets/1.png";
import two from "../assets/2.png";
import three from "../assets/3.png";
import four from "../assets/4.png";
import five from "../assets/5.png";
import deco from "../assets/6.png";
import FeatureCard from "../components/FeatureCard";
import HeroNova from "../components/HeroNova";
import SectionTitle from "../components/SectionTitle";
import ShowcaseGrid from "../components/ShowcaseGrid";

/* خلفية داكنة موحّدة للقسم الثاني — تحسين ألوان وإزالة الشريط الرمادي */
function FeatureSectionBG({ children, className = "" }) {
  return (
    <section
      className={
        "relative py-16 sm:py-20 md:py-28 overflow-x-clip overflow-y-visible isolation-isolate " +
        className
      }
    >
      {/* base gradient (ثابت) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #0b1020 0%, #141229 40%, #0f172a 100%)",
        }}
        aria-hidden
      />
      {/* glows (ألطف وبنِسَب أدق) — مخفية على الشاشات الصغيرة */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block" aria-hidden>
        <div
          className="absolute -top-24 -left-16 h-[420px] w-[640px] blur-2xl opacity-35"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,.26), transparent 60%)",
          }}
        />
        <div
          className="absolute top-0 right-[-8%] h-[380px] w-[600px] blur-2xl opacity-28"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(147,51,234,.22), transparent 62%)",
          }}
        />
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 h-[380px] w-[580px] blur-2xl opacity-24"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,.20), transparent 62%)",
          }}
        />
        {/* dots أدقّ (أخفّ) */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.045] text-white">
          <defs>
            <pattern id="dots2" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots2)" />
        </svg>
        {/* تلاشي علوي لطيف */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0b1022]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <HeroNova />
      
      {/* ===== SECTION 2: FEATURES (What I Do) — داكن موحّد =====
          ملاحظة: margin-top صغيرة تمنع أي تراكب مع شرائط المهارات أسفل الهيرو على الموبايل */}
      <FeatureSectionBG>
        <SectionTitle
          eyebrow="What I Do"
          title="Full-stack engineering, AI, and reliable delivery"
          subtitle="Modern React frontends, robust Django APIs, and practical machine learning—shipped with CI/CD and measured by outcomes."
          center
          tone="dark"
        />
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <FeatureCard
            icon="🖥️"
            title="Frontend Engineering"
            desc="React with Tailwind & Framer Motion, accessible UI, responsive layouts, and clean component systems that feel fast and polished."
          />
          <FeatureCard
            icon="🔗"
            title="Backend & APIs (Django/DRF)"
            desc="Versioned REST endpoints, auth (JWT/OAuth), pagination & caching—clear contracts your frontend can trust."
            delay={0.05}
          />
          <FeatureCard
            icon="🧠"
            title="AI & Applied ML"
            desc="LLM integration, embeddings & vector search (RAG), prompt engineering, light fine-tuning, and inference optimization for real features."
            delay={0.1}
          />
          <FeatureCard
            icon="📊"
            title="Data & Analytics"
            desc="Python/SQL pipelines, PostgreSQL modeling, ETL, and dashboards/reports that turn raw data into decisions."
            delay={0.15}
          />
          <FeatureCard
            icon="⚙️"
            title="DevOps & Performance"
            desc="Docker, Nginx, GitHub Actions, observability (logs/metrics/traces), and zero-downtime deploys that keep releases smooth."
            delay={0.2}
          />
          <FeatureCard
            icon="👥"
            title="Product Leadership & Mentorship"
            desc="Roadmaps, estimation, PR reviews, and workshops—alignment, speed, and documentation that scales teams."
            delay={0.25}
          />
        </div>
      </FeatureSectionBG>

      {/* ===== SECTION 3: SHOWCASE — داكن موحّد (تناغم ألوان ومسافات) ===== */}
      <section
        id="selected-work"
        className="relative scroll-mt-24 py-16 sm:py-20 md:py-28 overflow-x-clip overflow-y-visible"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #0b1020 0%, #141229 40%, #0f172a 100%)",
          }}
          aria-hidden
        />
        {/* glows/dots — مخفية على الشاشات الصغيرة */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block" aria-hidden>
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 h-[520px] w-[980px] blur-3xl opacity-28"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.22), transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-[-18%] right-[-10%] h-[560px] w-[920px] blur-3xl opacity-22"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,0.20), transparent 62%)",
            }}
          />
          {/* نقاط أنعم */}
          <div
            className="absolute inset-0 opacity-[0.045] mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.75) 1px, transparent 1px), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "220px 220px, 240px 240px, 260px 260px, 280px 280px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            eyebrow="Case Studies"
            title="Selected Projects — Frontend, Backend & AI"
            subtitle="Modern React UIs, Django/DRF APIs, and applied ML (RAG, embeddings, analytics) shipped to production for logistics, retail, and internal tools."
            center
            tone="dark"
          />
          <div className="mt-10 md:mt-12" />
          <ShowcaseGrid items={[one, two, three, four, five, deco]} />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20 sm:py-24 md:py-32 overflow-x-clip overflow-y-visible">
        {/* طبقة الخلفية والزخرفة — مخفية على الشاشات الصغيرة */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0b1020 0%, #141229 40%, #0f172a 100%)",
            }}
          />
          <div
            className="absolute -top-10 -left-8 h-[380px] w-[520px] blur-2xl opacity-36"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.26), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-10 -right-8 h-[420px] w-[580px] blur-[36px] opacity-32"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,0.24), transparent 62%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40%] w-[120%] opacity-30"
            style={{
              background:
                "linear-gradient(90deg, rgba(168,85,247,0.22), rgba(99,102,241,0.22), rgba(56,189,248,0.22))",
              transform: "translate3d(0,0,0)",
              animation: "auroraSlide 18s linear infinite",
              maskImage:
                "radial-gradient(60% 60% at 50% 50%, black 60%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(60% 60% at 50% 50%, black 60%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.75) 1px, transparent 1px), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "220px 220px, 240px 240px, 260px 260px, 280px 280px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl p-8 sm:p-10 md:p-14 text-center bg-white/8 backdrop-blur-lg ring-1 ring-white/12 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
            />
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300">
                Ship beautiful frontends on rock-solid APIs — with AI inside.
              </span>
            </h3>
            <p className="mt-4 text-slate-200/85 max-w-2xl mx-auto">
              React/Tailwind/Framer Motion on the UI, Django/DRF and CI/CD on the core, plus applied ML (LLMs, RAG, embeddings) where it drives real value.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/why-us"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3
             font-semibold text-slate-900 bg-white
             shadow-[0_6px_20px_-10px_rgba(0,0,0,.45)]
             hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,.55)]
             active:translate-y-0 active:shadow-[0_6px_20px_-10px_rgba(0,0,0,.45)]
             focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-slate-900
             transition-all duration-200 will-change-transform"
              >
                Why Work With Me
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3
             font-semibold text-white
             bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600
             shadow-[0_6px_20px_-10px_rgba(79,70,229,.65)]
             hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(79,70,229,.75)]
             active:translate-y-0 active:shadow-[0_6px_20px_-10px_rgba(79,70,229,.65)]
             focus:outline-none focus:ring-2 focus:ring-violet-300/70 focus:ring-offset-2 focus:ring-offset-slate-900
             transition-all duration-200 will-change-transform"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes auroraSlide {
            0%   { transform: translate3d(-10%, -50%, 0); }
            100% { transform: translate3d(10%, -50%, 0); }
          }
          @keyframes shine {
            0% { transform: translate3d(0,0,0); }
            100% { transform: translate3d(140%,0,0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee, [style*="auroraSlide"], [style*="shine"] {
              animation: none !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}

