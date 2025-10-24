// src/pages/AboutUs.jsx
import { motion } from 'framer-motion';
import { useEffect } from 'react';

// ===== Easing موحّد
const easing = [0.22, 1, 0.36, 1];

/* يحرك القسم بالكامل ويُكاسْكِد العناصر */
const sectionParent = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: easing,
      duration: 0.55,
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

/* عنصر فردي: دخول “بريميوم” */
const fadeUp = {
  hidden: { opacity: 0, y: 16, scale: 0.98, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.7 },
  },
};

/* عنوان قسم بمسافات مضبوطة */
const SectionTitle = ({ children, className = '' }) => (
  <motion.h2
    className={`text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent
                bg-gradient-to-b from-indigo-200 via-violet-200 to-sky-200 drop-shadow ${className}`}
    variants={fadeUp}
  >
    {children}
  </motion.h2>
);

/* بطاقة زجاجية عامة */
const GlassCard = ({ title, icon, children }) => (
  <motion.div
    className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 backdrop-blur-md shadow-lg
               transition-colors duration-300 hover:bg-white/7 hover:ring-white/20"
    variants={fadeUp}
    whileHover={{ y: -6, scale: 1.015 }}
    transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.6 }}
  >
    {title ? (
      <h3 className="text-xl font-bold text-indigo-100 mb-2">
        {title} {icon && <span className="ml-2">{icon}</span>}
      </h3>
    ) : null}
    <div className="text-indigo-100/90 leading-relaxed">{children}</div>
  </motion.div>
);

export default function AboutUs() {
  // ===== Basic SEO (no deps): title/meta/OG/Twitter + JSON-LD (Person) =====
  useEffect(() => {
    const title = "About Eiad Abdulhadi Soufan — Frontend, Backend & AI";
    const description =
      "Senior full-stack engineer. Modern React/Tailwind UIs, Django/DRF APIs, and applied AI (LLMs, RAG, embeddings). Led teams, shipped production systems, and taught across universities.";
    const keywords =
      "Eiad Abdulhadi Soufan, React, Tailwind, Framer Motion, Django, DRF, PostgreSQL, CI/CD, Docker, Nginx, AI, LLMs, RAG, embeddings, full-stack, Malaysia, Kuala Lumpur";

    document.title = title;

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "profile", "property");
    setMeta("twitter:card", "summary_large_image");

    // JSON-LD Person
    const ldId = "ld-about-jsonld";
    let ld = document.getElementById(ldId);
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = ldId;
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Eiad Abdulhadi Soufan",
      "jobTitle": "Senior Full-Stack Engineer (React, Django, AI)",
      "knowsAbout": [
        "React", "Tailwind CSS", "Framer Motion",
        "Django", "Django REST Framework", "PostgreSQL",
        "DevOps", "CI/CD", "Docker", "Nginx",
        "AI", "LLMs", "RAG", "Embeddings", "Analytics"
      ],
      "url": "https://example.com/about",
      "homeLocation": "Kuala Lumpur, Malaysia",
      "sameAs": []
    });
  }, []);

  return (
    /* ===== غلاف الصفحة بخلفية ثابتة ===== */
    <section className="relative min-h-screen overflow-hidden text-indigo-50">
      {/* الخلفية */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #0b1020 0%, #141229 40%, #0f172a 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute -top-14 -left-10 h-[420px] w-[560px] blur-2xl opacity-40"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.22), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -right-12 h-[500px] w-[720px] blur-[36px] opacity-35"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,0.20), transparent 62%)',
          }}
        />
        <div
          aria-hidden
          className="absolute top-[22%] left-[12%] h-[260px] w-[260px] blur-2xl opacity-22"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.16), transparent 65%)',
          }}
        />
        <div
          aria-hidden
          className="absolute top-[36%] right-[14%] h-[300px] w-[300px] blur-2xl opacity-22"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.16), transparent 65%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.75) 1px, transparent 1px), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '220px 220px, 240px 240px, 260px 260px, 280px 280px',
          }}
        />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 px-6 py-16 md:py-20 max-w-6xl mx-auto">
        {/* ===== About Eiad ===== */}
        <motion.section
          className="scroll-mt-24"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
        >
          <SectionTitle className="mt-4 mb-8">About Eiad</SectionTitle>

          <motion.p
            className="max-w-3xl mx-auto text-lg mb-12 text-indigo-100/90 text-center"
            variants={fadeUp}
          >
            I’m <span className="font-bold text-indigo-200">Eiad Abdulhadi Soufan</span>,
            a senior full-stack engineer focused on{" "}
            <strong>modern React frontends</strong>,{" "}
            <strong>reliable Django/DRF APIs</strong>, and{" "}
            <strong>applied AI</strong> features. I lead roadmaps, ship to production,
            and teach best practices that teams can adopt quickly.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={fadeUp}
          >
            <GlassCard title="Frontend Engineer" icon="🖥️">
              React with Tailwind & Framer Motion. Accessible, responsive UIs with
              component systems that feel fast and polished.
            </GlassCard>
            <GlassCard title="Backend Engineer" icon="🔗">
              Django/DRF with versioned REST endpoints, JWT/OAuth, caching & pagination,
              plus PostgreSQL modeling and performance tuning.
            </GlassCard>
            <GlassCard title="AI Engineer" icon="🧠">
              LLM integration, RAG with embeddings/vector search, prompt design, and
              data pipelines that unlock real product value.
            </GlassCard>
            <GlassCard title="Leader & Educator" icon="👥">
              Roadmaps, estimates, code reviews, onboarding docs, and workshops that
              lift teams while keeping delivery predictable.
            </GlassCard>
            <GlassCard title="Data & Analytics" icon="📊">
              Python/SQL pipelines, metrics and dashboards, and exports/reporting for
              decision-making across product and ops.
            </GlassCard>
            <GlassCard title="Research & Publications" icon="🧪">
              Evidence-driven experiments and peer-reviewed work; when needed, I validate
              approaches with benchmarks—not guesswork.
            </GlassCard>
          </motion.div>
        </motion.section>

        {/* ===== Professional Experience ===== */}
        <motion.section
          className="mt-16 scroll-mt-24"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.38 }}
        >
          <SectionTitle>Professional Experience</SectionTitle>

          <div className="space-y-10 text-left">
            <GlassCard title="Berkat Madinah Sdn. Bhd. · Kuala Lumpur, Malaysia" icon="🏢">
              <p className="mt-2">
                Food & retail group with multiple branches undergoing digital transformation.
              </p>
              <p className="mt-2">
                <strong>Software Engineer (Mar 2025 – Present):</strong> Company portal,
                internal forms/complaints workflows, dashboards, and reporting APIs with
                CI/CD and observability.
              </p>
            </GlassCard>

            <GlassCard title="Yalla Baggage · Dubai, UAE" icon="✈️">
              <p className="mt-2">
                Airport logistics platform enabling smart baggage tracking and delivery.
              </p>
              <p className="mt-2">
                <strong>Team Lead — Platform (Feb 2025 – Jun 2025):</strong> Real-time
                tracking, scalable Django/DRF backend, JWT auth, Flutter client, and admin
                dashboards—iterated with measurable APIs.
              </p>
            </GlassCard>

            <GlassCard title="Homs University · Homs, Syria" icon="🎓">
              <p className="mt-2">
                4th ranked university in Syria with a leading informatics faculty.
              </p>
              <p className="mt-2">
                <strong>Information Systems Developer (Oct 2021 – Jan 2025):</strong>{" "}
                Automation for university processes and faculty websites.
              </p>
              <p>
                <strong>Teacher (Mar 2019 – Jan 2025):</strong> AI, software engineering,
                databases, multimedia, and more across six faculties.
              </p>
            </GlassCard>

            <GlassCard title="Al-Andalus Hospital · Homs, Syria" icon="🏥">
              <p className="mt-2">
                Major healthcare facility; designed the 13-floor network and database
                infrastructure to support hospital operations.
              </p>
              <p className="mt-2">
                <strong>Network/IT/DB Designer (Jan 2022 – Jan 2024):</strong> End-to-end
                documentation and implementation with the construction team.
              </p>
            </GlassCard>

            <GlassCard title="Shababek Institute · Homs, Syria" icon="🏫">
              <p className="mt-2">
                Private training institute focused on practical digital skills.
              </p>
              <p className="mt-2">
                <strong>Teacher & IT Trainer (Mar 2019 – Jan 2025):</strong> Courses in AI,
                software engineering, networks, and programming (Java, C++, Python).
              </p>
            </GlassCard>
          </div>
        </motion.section>

        {/* ===== Contributions ===== */}
        <motion.section
          className="mt-16 scroll-mt-24"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
        >
          <SectionTitle>Contributions</SectionTitle>

          <div className="space-y-10 text-left">
            <GlassCard title="MTN · Syria" icon="📺">
              <p className="mt-2">
                Telecommunications provider. Contributed to IPTV app updates and a YouTube
                service integration using React.
              </p>
            </GlassCard>

            <GlassCard title="ShamFM · Syria" icon="🛰️">
              <p className="mt-2">
                Popular Syrian station. Rebuilt backend with Django as part of a full
                website redevelopment.
              </p>
            </GlassCard>
          </div>
        </motion.section>

        {/* ===== Freelance & Projects ===== */}
        <motion.section
          className="mt-16 scroll-mt-24"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.42 }}
        >
          <SectionTitle>Freelance & Projects</SectionTitle>

          <div className="space-y-10 text-left">
            <GlassCard title="ProCafe Restaurant Management System" icon="🍽️">
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Inventory:</strong> Real-time/monthly/annual tracking and alerts.</li>
                <li><strong>Staff & Performance:</strong> Activity monitoring and audit trails.</li>
                <li><strong>Billing:</strong> Sales/purchase invoicing with exports & reports.</li>
              </ul>
            </GlassCard>

            <GlassCard title="Network Intrusion Detection (DL)" icon="🛡️">
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>CNN/RNN pipelines for anomaly detection in network traffic.</li>
                <li>Improved precision/recall with feature engineering and tuning.</li>
              </ul>
            </GlassCard>

            <GlassCard title="Crypto Price Prediction (RNN)" icon="📈">
              <p className="mt-2">
                Time-series modeling for cryptocurrency prices using recurrent networks.
              </p>
            </GlassCard>

            <GlassCard title="Sign Language Recognition" icon="🤟">
              <p className="mt-2">
                Deep-learning models to interpret sign language for assistive interfaces.
              </p>
            </GlassCard>

            <GlassCard title="Synthetic Medical Images (GANs)" icon="🧬">
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>GAN-based augmentation for COVID-19 datasets to improve diagnostic accuracy.</li>
                <li>Boosted generalization with controlled synthesis and validation.</li>
              </ul>
            </GlassCard>
          </div>
        </motion.section>

        {/* ===== Publications ===== */}
        <motion.section
          className="mt-16 scroll-mt-24"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.42 }}
        >
          <SectionTitle>Publications</SectionTitle>

          <div className="space-y-10 text-left">
            <GlassCard>
              <h3 className="text-lg font-bold text-indigo-100">
                How do college courses and materials affect students’ logical thinking of the Medical College at Al Baath University in Syria
              </h3>
              <p className="text-sm text-indigo-200 mt-1">
                Soufan EA, Bairkdar BO, Soufan BA, Samaan M. Educ Médica. 2023;24(3):100797.{` `}
                <a
                  href="http://dx.doi.org/10.1016/j.edumed.2023.100797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  View Paper
                </a>
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Pioneering research on logical thinking; cited in the 2024 Homs University accreditation report.</li>
                <li>Proposed a modified Test of Logical Thinking (TOLT).</li>
                <li>Top-20 most-read in Educación Médica for 3 months (Feb–Apr 2023).</li>
                <li>Invited lecture at Faculty of Medicine, Homs University (May 2023).</li>
                <li>Cited by 3 research studies.</li>
              </ul>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold text-indigo-100">
                Studying the effect of COVID-19 on mental health: Comparing levels of anxiety in the Arab society before and after the COVID-19 pandemic
              </h3>
              <p className="text-sm text-indigo-200 mt-1">
                Soufan EA, Bairkdar BO & Soufan BA. QScience Connect. 2022;2022(2).{` `}
                <a
                  href="http://dx.doi.org/10.5339/connect.2022.spt.3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  View Paper
                </a>
              </p>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-bold text-indigo-100">
                Assessing the validity of society individuals' information about COVID-19 and its references nature that reflect to disease spreading
              </h3>
              <p className="text-sm text-indigo-200 mt-1">
                Soufan EA & Soufan BA. AJSP. 2020;2020 (25).{` `}
                <a
                  href="https://www.ajsp.net/research/%D8%AA%D9%82%D9%8A%D9%8A%D9%85_%D8%B5%D8%AD%D8%A9_%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA_%D8%A3%D9%81%D8%B1%D8%A7%D8%AF_%D8%A7%D9%84%D9%85%D8%AC%D8%AA%D9%85%D8%B9_%D8%AD%D9%88%D9%84_%D9%83%D9%88%D9%81%D9%8A%D8%AF_19.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  View PDF
                </a>
              </p>
            </GlassCard>
          </div>
        </motion.section>

        {/* ===== Core Skills ===== */}
        <motion.section
          className="mt-16 scroll-mt-24"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.45 }}
        >
          <SectionTitle>Core Skills</SectionTitle>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={fadeUp}
          >
            {/* Advanced — Rose Glass */}
            <div className="relative rounded-2xl p-[1px]
                    bg-gradient-to-br from-rose-500/55 via-rose-400/35 to-rose-600/45">
              <div className="relative overflow-hidden rounded-2xl h-full w-full
                      bg-white/[0.06] backdrop-blur-xl p-6 ring-1 ring-white/15
                      shadow-[0_10px_35px_-10px_rgba(244,63,94,0.35)]
                      transition-colors duration-300 hover:bg-white/[0.08] hover:ring-white/25">
                <div aria-hidden className="pointer-events-none absolute -inset-24 opacity-25 blur-3xl"
                  style={{ background: 'radial-gradient(60% 60% at 30% 30%, rgba(244,63,94,0.45), transparent 60%)' }} />
                <div aria-hidden className="pointer-events-none absolute top-0 left-0 w-40 h-40 opacity-20 rotate-12"
                  style={{ background: 'conic-gradient(from 0deg, rgba(255,255,255,0.35), transparent 40%)' }} />
                <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(1px 1px at 25% 35%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 70% 65%, #fff 1px, transparent 1px)', backgroundSize: '200px 200px' }} />
                <h3 className="relative text-xl font-bold text-rose-200/95 mb-4 drop-shadow">Advanced</h3>
                <div className="relative flex flex-wrap gap-2">
                  {[
                    'React', 'Tailwind CSS', 'Framer Motion',
                    'Django', 'Django REST Framework', 'Python',
                    'PostgreSQL', 'Docker', 'GitHub Actions', 'Nginx',
                    'RAG', 'Embeddings', 'Prompt Engineering',
                    'Software Engineering', 'Team Leading'
                  ].map((s, i) => (
                    <span key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full
                         bg-rose-400/10 text-rose-50 ring-1 ring-rose-300/30
                         hover:bg-rose-400/15 hover:ring-rose-200/40 transition-colors text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Intermediate — Amber Glass */}
            <div className="relative rounded-2xl p-[1px]
                    bg-gradient-to-br from-amber-400/60 via-amber-300/35 to-yellow-300/45">
              <div className="relative overflow-hidden rounded-2xl h-full w-full
                      bg-white/[0.06] backdrop-blur-xl p-6 ring-1 ring-white/15
                      shadow-[0_10px_35px_-10px_rgba(245,158,11,0.35)]
                      transition-colors duration-300 hover:bg-white/[0.08] hover:ring-white/25">
                <div aria-hidden className="pointer-events-none absolute -inset-24 opacity-25 blur-3xl"
                  style={{ background: 'radial-gradient(60% 60% at 70% 30%, rgba(245,158,11,0.45), transparent 60%)' }} />
                <div aria-hidden className="pointer-events-none absolute top-0 left-0 w-40 h-40 opacity-20 rotate-12"
                  style={{ background: 'conic-gradient(from 0deg, rgba(255,255,255,0.35), transparent 40%)' }} />
                <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(1px 1px at 25% 35%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 70% 65%, #fff 1px, transparent 1px)', backgroundSize: '200px 200px' }} />
                <h3 className="relative text-xl font-bold text-amber-200/95 mb-4 drop-shadow">Intermediate</h3>
                <div className="relative flex flex-wrap gap-2">
                  {[
                    'Node.js', 'Flutter', 'Java', 'C++',
                    'Analytics', 'Testing', 'API Security'
                  ].map((s, i) => (
                    <span key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full
                         bg-amber-400/10 text-amber-50 ring-1 ring-amber-300/30
                         hover:bg-amber-400/15 hover:ring-amber-200/40 transition-colors text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Beginner — Emerald Glass */}
            <div className="relative rounded-2xl p-[1px]
                bg-gradient-to-br from-emerald-400/60 via-emerald-300/35 to-green-400/45">
              <div className="relative overflow-hidden rounded-2xl h-full w-full
                  bg-white/[0.06] backdrop-blur-xl p-6 ring-1 ring-white/15
                  shadow-[0_10px_35px_-10px_rgba(16,185,129,0.35)]
                  transition-colors duration-300 hover:bg-white/[0.08] hover:ring-white/25">
                <div aria-hidden
                  className="pointer-events-none absolute -inset-24 opacity-25 blur-3xl"
                  style={{ background: 'radial-gradient(60% 60% at 50% 70%, rgba(16,185,129,0.45), transparent 60%)' }} />
                <div aria-hidden
                  className="pointer-events-none absolute top-0 left-0 w-40 h-40 opacity-20 rotate-12"
                  style={{ background: 'conic-gradient(from 0deg, rgba(255,255,255,0.35), transparent 40%)' }} />
                <div aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(1px 1px at 25% 35%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 70% 65%, #fff 1px, transparent 1px)', backgroundSize: '200px 200px' }} />
                <h3 className="relative text-xl font-bold text-emerald-200/95 mb-4 drop-shadow">
                  Beginner
                </h3>
                <div className="relative flex flex-wrap gap-2">
                  {['WordPress', 'Figma', 'Statistics'].map((s, i) => (
                    <span key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full
                     bg-emerald-400/10 text-emerald-50 ring-1 ring-emerald-300/30
                     hover:bg-emerald-400/15 hover:ring-emerald-200/40 transition-colors text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* فاصل بصري خفيف */}
          <motion.div
            className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
            variants={fadeUp}
          />
        </motion.section>
      </div>
    </section>
  );
}
