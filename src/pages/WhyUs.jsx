// src/pages/WhyUs.jsx
import { motion } from "framer-motion";
import { useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

/* ===== Animations (unchanged) ===== */
const easing = [0.22, 1, 0.36, 1];

const sectionParent = {
  hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ease: easing,
      duration: 0.55,
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

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

const fadeLeft = {
  hidden: { opacity: 0, x: -16, scale: 0.985, filter: "blur(3px)" },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.7 },
  },
};

/* ===== Stats data (unchanged) ===== */
const stats = [
  ["32", "+", "Projects delivered", 2],
  ["17", "+", "AI models developed", 2],
  ["22",  "+", "Technologies mastered", 2],
  ["48", "+", "Satisfied clients", 2],
];

/* ===== Stat card (unchanged) ===== */
function Stat({ value, suffix, label, duration, i }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.45 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="
        group relative rounded-2xl p-6
        bg-white/5 ring-1 ring-white/10 backdrop-blur-sm
        transition-all duration-300
        hover:bg-white/7 hover:ring-white/20 hover:-translate-y-1
        overflow-hidden
      "
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(220px 180px at 50% 30%, rgba(124,58,237,0.14), transparent 60%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
      />
      <p
        className="text-4xl font-extrabold tracking-tight
                   bg-clip-text text-transparent
                   bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300
                   drop-shadow-[0_2px_6px_rgba(0,0,0,.25)]"
      >
        {inView ? (
          <CountUp
            key={`stat-${i}-${inView}`}
            end={parseInt(value)}
            duration={duration}
            suffix={suffix}
            useEasing={false}
          />
        ) : (
          0
        )}
      </p>
      <p className="text-indigo-100/90 mt-2">{label}</p>
    </motion.div>
  );
}

export default function WhyUs() {
  const navigate = useNavigate();

  // ===== SEO: title/meta/OG/Twitter + JSON-LD (PERSON) =====
  useEffect(() => {
    const title =
      "Why Eiad Abdulhadi Soufan — React Frontends, Django APIs & Applied AI";
    const description =
      "Eiad Abdulhadi Soufan builds modern React frontends on reliable Django/DRF backends—with CI/CD, performance, and practical AI (LLMs, RAG, embeddings).";
    const keywords =
      "Eiad Abdulhadi Soufan, React developer, Django REST, Full-stack engineer, Tailwind, Framer Motion, PostgreSQL, CI/CD, performance, SEO, AI, LLMs, RAG, embeddings, Kuala Lumpur, Malaysia";

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
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");

    const ldId = "ld-whyus-jsonld";
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
      "description": description,
      "jobTitle": "Senior Full-Stack Engineer (React, Django, AI)",
      "knowsAbout": [
        "React", "Tailwind CSS", "Framer Motion",
        "Django", "Django REST Framework", "PostgreSQL",
        "DevOps", "CI/CD", "Docker", "Nginx",
        "AI", "LLMs", "RAG", "Embeddings", "Analytics"
      ],
      "url": "https://example.com/why-us",
      "homeLocation": "Kuala Lumpur, Malaysia",
      "sameAs": []
    });
  }, []);

  return (
    <section className="relative min-h-screen py-16 md:py-20 overflow-hidden text-indigo-50">
      {/* ===== Background (unchanged) ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0b1020 0%, #141229 40%, #0f172a 100%)",
          }}
        />
        <div
          className="absolute -top-16 -left-12 h-[420px] w-[560px] blur-2xl opacity-40"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.22), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-16 -right-12 h-[480px] w-[680px] blur-[36px] opacity-35"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,0.20), transparent 62%)",
          }}
        />
        <div
          className="absolute top-[22%] left-[12%] h-[260px] w-[260px] blur-2xl opacity-22"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.16), transparent 65%)",
          }}
        />
        <div
          className="absolute top-[36%] right-[14%] h-[300px] w-[300px] blur-2xl opacity-22"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.16), transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-[18%] left-[28%] h-[280px] w-[280px] blur-2xl opacity-20"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,0.14), transparent 68%)",
          }}
        />
        <div
          className="absolute top-[12%] right-[36%] h-[220px] w-[220px] blur-xl opacity-18"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(139,92,246,0.14), transparent 68%)",
          }}
        />
        <div
          className="absolute bottom-[30%] right-[46%] h-[200px] w-[200px] blur-xl opacity-16"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(14,165,233,0.13), transparent 68%)",
          }}
        />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10">
        {/* WHY US */}
        <motion.section
          className="relative py-12 md:py-16 px-6 text-center"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold mb-6a bg-clip-text text-transparent bg-gradient-to-b from-indigo-200 via-violet-200 to-sky-200 drop-shadow"
            variants={fadeUp}
          >
            Why Eiad Abdulhadi Soufan?
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-indigo-100/90 text-lg leading-relaxed"
            variants={fadeUp}
          >
            Build with a developer who ships <strong>beautiful UIs</strong>,{" "}
            <strong>reliable APIs</strong>, and <strong>AI-ready</strong> features.
            Modern React on the front, Django/DRF on the back—delivered with CI/CD,
            observability, and performance in mind.
          </motion.p>
        </motion.section>

        {/* FEATURED POINTS */}
        <motion.section
          className="relative py-12 md:py-16 px-6"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                icon: "🖥️",
                title: "Modern Frontend (React/Tailwind/Framer)",
                desc: "Accessible, responsive UI with tasteful motion. Component systems that scale and feel fast on any device.",
              },
              {
                icon: "🔗",
                title: "Reliable Backend (Django/DRF)",
                desc: "Versioned REST endpoints, JWT/OAuth, caching & pagination—clean contracts your frontend can trust.",
              },
              {
                icon: "🧠",
                title: "Applied AI (LLMs, RAG, Embeddings)",
                desc: "Smart search, content suggestions, and automation that actually improve UX—not demos.",
              },
              {
                icon: "⚡",
                title: "Delivery, SEO & Performance",
                desc: "CI/CD, lazy loading, and Core Web Vitals in mind. Analytics & reporting to guide real decisions.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeLeft}
                className="
                  group relative rounded-2xl p-6
                  bg-white/5 ring-1 ring-white/10 backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-white/7 hover:ring-white/20
                  overflow-hidden
                "
                whileHover={{ rotate: -0.3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.6 }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(220px 180px at 50% 30%, rgba(99,102,241,0.10), transparent 60%)",
                  }}
                />
                <h3 className="text-xl font-bold mb-2 text-indigo-100">
                  <span className="mr-1">{item.icon}</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-violet-200 to-sky-200">
                    {item.title}
                  </span>
                </h3>
                <p className="text-indigo-100/90">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* RESULTS */}
        <motion.section
          className="relative py-12 md:py-16 px-6 text-center"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-10
                       bg-clip-text text-transparent bg-gradient-to-b from-indigo-200 via-violet-200 to-sky-200 drop-shadow"
            variants={fadeUp}
          >
            Results That Speak
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map(([value, suffix, label, duration], i) => (
              <Stat
                key={`${label}-${i}`}
                value={value}
                suffix={suffix}
                label={label}
                duration={duration}
                i={i}
              />
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="relative py-16 md:py-20 px-6 text-center"
          variants={sectionParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            variants={fadeUp}
            className="
              mx-auto max-w-3xl rounded-2xl p-10
              bg-white/8 backdrop-blur-lg ring-1 ring-white/12
              shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]
              transition-shadow duration-300
            "
          >
<motion.h2
  className="text-3xl md:text-4xl font-bold mb-4
             leading-tight md:leading-[1.15] pb-[2px] overflow-visible
             bg-clip-text text-transparent bg-gradient-to-b from-indigo-200 via-violet-200 to-sky-200"
  variants={fadeUp}
>
  Design your website, system, or app your way
</motion.h2>

            <motion.p
              className="mb-8 text-lg text-indigo-100/90 max-w-2xl mx-auto"
              variants={fadeUp}
            >
              Ready to launch? Propose your budget and goals—we’ll reply with a clear plan for frontend, backend, and AI features that fit.
            </motion.p>

            <motion.button
              onClick={() => navigate("/contact")}
              className="
                inline-flex items-center justify-center rounded-xl px-5 py-3
                font-semibold text-white
                bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600
                shadow-[0_6px_20px_-10px_rgba(79,70,229,.65)]
                hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(79,70,229,.75)]
                active:translate-y-0 active:shadow-[0_6px_20px_-10px_rgba(79,70,229,.65)]
                focus:outline-none focus:ring-2 focus:ring-violet-300/70
                focus:ring-offset-2 focus:ring-offset-slate-900
                transition-all duration-200 will-change-transform
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
            >
              Submit Your Offer Now
            </motion.button>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}



