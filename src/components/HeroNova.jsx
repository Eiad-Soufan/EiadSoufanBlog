// src/components/HeroNova.jsx
import { motion } from "framer-motion";
import { useMemo } from "react";
import NeuralBackground3D from "./NeuralBackground3D";
import RightShowcase from "./RightShowcase";

/**
 * HERO — Animated Aurora + word-by-word title reveal (crisp, no blur) + smooth subtitle
 * - No backdrop blur over the title. Gradient shine keeps the look without blurring text.
 * - الخلفيات والزخارف أسفل الهيدر دائمًا (z-index سالب).
 */

export default function HeroNova({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden py-14 md:py-20 lg:py-24">
      {/* خلفية متحركة — توضع أسفل الهيدر دائمًا */}
      <div className="absolute inset-0 -z-[1] pointer-events-none" aria-hidden>
        <NeuralBackground3D offsetX="0vw" />
      </div>

      {/* إذا عندك CSS سابق يعمل blur هنا، نوقِفه عبر الـstyle أدناه */}
      <div className="hero-overlay-gradient pointer-events-none" />

      {/* مطر المصطلحات داخل الهيرو (أسفل القسم) */}
      <StrongTermCascade />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="relative md:col-span-7 overflow-visible">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 md:-inset-8 -z-[1]
             [mask-image:radial-gradient(closest-side,white,transparent)]
             bg-black/20"
            ></div>

            {/* عنوان — كشف كلمة-بكلمة بسلاسة (بدون أي blur) */}
            <TitleReveal text={title} />

            {/* سطر ثانٍ — حركة احترافية + خط تأكيد يتمدّد */}
            <div className="mt-4 max-w-2xl">
              <div className="mt-2 md:mt-3 max-w-2xl">
                <SubtitleReveal text={subtitle} />
              </div>

              {/* شريط تأكيد يتمدّد تحت النص الثانوي */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0.6 }}
                whileInView={{ scaleX: 0.4, opacity: 0.9 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="origin-left h-1 rounded-full mt-3
             bg-gradient-to-r from-indigo-500/80 via-violet-500/80 to-sky-500/80"
              />
            </div>
          </div>

          <div className="md:col-span-5 relative h-[380px] sm:h-[420px] md:h-[460px] lg:h-[520px] overflow-visible">
            <div className="absolute inset-0 origin-center scale-[.82] sm:scale-[.9] md:scale-100 lg:scale-105">
              <RightShowcase />
            </div>
          </div>

          {/* عمود توازن تخطيطي */}
          <div className="md:col-span-5" />
        </div>
      </div>

      {/* Overrides مضمونة لإيقاف أي تغبيش على الطبقات الزخرفية فوق العنوان
          + جعل الغطاء تحت الهيدر عبر z-index: -1 */}
      <style>{`
        /* امنع أي blur/backdrop-blur على الغطاء العام إن كان معرفاً في CSS العام */
        .hero-overlay-gradient{
          filter: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: -1; /* تحت كل المحتوى والهيدر */
          background: transparent;
        }

        /* لمعان أفقي بدون أي blur — نفس الجمالية بلا طمس */
        .title-shine{
          filter: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          background:
            radial-gradient(60% 60% at 50% 50%, rgba(124,58,237,0.16), transparent 68%),
            radial-gradient(46% 46% at 55% 50%, rgba(56,189,248,0.12), transparent 70%);
          opacity: .35;
          z-index: 0;  /* يبقى تحت العنوان */
        }
      `}</style>
    </section>
  );
}

/* ===== Title word-by-word reveal — CRISP (no blur) ===== */
function TitleReveal({ text }) {
  const words = (text || "").split(" ").filter(Boolean);

  const STAGGER = 0.035;
  const DELAY = 0.05;
  const SPRING = { type: "spring", stiffness: 180, damping: 20, mass: 0.7 };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER, delayChildren: DELAY } },
  };

  // لا blur نهائياً — فقط y + opacity
  const word = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { ...SPRING } },
  };

  return (
    <div className="relative inline-block align-top overflow-visible pt-2 pb-6">
      <motion.h1
        className="relative z-10 text-balance
                   font-extrabold tracking-tight
                   text-4xl sm:text-5xl md:text-6xl
                   leading-[1.20] sm:leading-[1.16] md:leading-[1.12]
                   pb-2 md:pb-3
                   after:block after:content-[''] after:h-[6px]
                   drop-shadow-[0_2px_6px_rgba(0,0,0,.3)]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.8 }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={word}
            className="inline-block align-baseline mr-[0.35ch] pb-[2px]
                       text-transparent bg-clip-text
                       [-webkit-text-fill-color:transparent]
                       [background-image:linear-gradient(135deg,#1A43BF,#6366F1,#7C3AED)]
                       [background-size:140%_140%] [background-position:20%_50%]"
          >
            {w}
          </motion.span>
        ))}
      </motion.h1>

      {/* لمعان أفقي — بدون أي blur (تم ضبطه في الـ<style> أعلاه) */}
      <span
        aria-hidden
        className="title-shine pointer-events-none absolute inset-x-0 top-[12%] bottom-[12%] z-0"
      />
    </div>
  );
}

/* ===== Subtitle — clean, subtle motion; no blur ===== */
function SubtitleReveal({ text = "" }) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.05 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
  };

  return (
    <div className="relative">
      <motion.p
        className="text-pretty text-slate-300 md:text-slate-200/90
                   text-base sm:text-lg md:text-xl leading-relaxed"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.8 }}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={child} className="inline-block mr-[0.35ch]">
            {w}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}

/* ===== StrongTermCascade — one-time flip+drop, then stay ===== */
function StrongTermCascade() {
  const TERMS = [
    "Python", "Django", "DRF", "React", "TypeScript", "Tailwind",
    "Docker", "PostgreSQL", "CI/CD", "AWS", "GraphQL",
    "Next.js", "FastAPI", "Pandas", "NumPy"
  ];

  return (
    <div className="absolute inset-x-0 bottom-0 z-[5] pointer-events-none select-none h-11 md:h-12">
      <div className="absolute inset-0 pointer-events-none
                bg-gradient-to-b from-[#0b1222]/0 via-[#0b1222]/40 to-[#0b1222]/60" />
      <div className="relative h-full">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-end gap-3 md:gap-4 flex-wrap">
          {TERMS.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ type: "spring", stiffness: 420, damping: 26, delay: i * 0.055 }}
              className="font-mono text-[11px] md:text-xs
                         rounded-full px-3 py-1
                         text-slate-100/95
                         bg-white/10 backdrop-blur
                         ring-1 ring-white/15
                         shadow-[0_4px_12px_rgba(0,0,0,.25)]"
              style={{ whiteSpace: "nowrap" }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
