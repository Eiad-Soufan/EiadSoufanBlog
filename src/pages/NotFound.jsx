// src/pages/NotFound.jsx
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * 404 — Dark Aurora + Glass Card
 * - لا حركات خلفيّة (الـAurora ساكنة)
 * - أُزيل الشِيمر (الخط العمودي المتوهّج الأبيض داخل البطاقة)
 * - أنيميشن دخول المحتوى مطابق للنسخة الأولى (fade/slide لطيف)
 */
export default function NotFound() {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden isolate">
      {/* Base gradient */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, #0b1020 0%, #141229 40%, #0f172a 100%)",
        }}
      />

      {/* Soft static glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute -top-24 -left-16 h-[460px] w-[680px] blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,.28), transparent 60%)",
          }}
        />
        <div
          className="absolute top-8 right-[-8%] h-[420px] w-[640px] blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(147,51,234,.24), transparent 62%)",
          }}
        />
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 h-[420px] w-[620px] blur-3xl opacity-28"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,.22), transparent 62%)",
          }}
        />
      </div>

      {/* Aurora stripe — ساكن */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40%] w-[140%] opacity-30 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(168,85,247,0.22), rgba(99,102,241,0.22), rgba(56,189,248,0.22))",
          maskImage:
            "radial-gradient(60% 60% at 50% 50%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 50%, black 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-28">
        {/* نفس أنيميشن الدخول القديم */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl rounded-3xl p-8 md:p-10 text-center bg-white/8 backdrop-blur-lg ring-1 ring-white/12 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* inner border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
          />

          {/* ✂️ أُزيل الشِيمر الذي كان يمرّ عمودياً هنا */}

          <motion.h1
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[64px] md:text-[88px] font-extrabold leading-none"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300 drop-shadow">
              404
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-xl md:text-2xl font-bold text-indigo-100"
          >
            Oops! Page not found
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-slate-200/85"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-slate-900 bg-white hover:bg-white/95 transition"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* starfield dots ثابتة */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.75) 1px, transparent 1px), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize:
              "220px 220px, 240px 240px, 260px 260px, 280px 280px",
          }}
        />
      </div>
    </div>
  );
}
