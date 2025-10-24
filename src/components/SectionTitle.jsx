// src/components/SectionTitle.jsx
import { motion } from "framer-motion";

/**
 * SectionTitle (clean, brand-tuned)
 * tone: "dark" | "light"  (default: "dark")
 *   - dark: يستخدم تدرّج الهوية مع نص فاتح للواجهات الداكنة
 * API:
 *   <SectionTitle eyebrow title subtitle center tone="dark" />
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  tone = "dark",
}) {
  const isDark = tone === "dark";
  const wrap = `relative mx-auto ${center ? "text-center" : "text-left"} max-w-3xl`;

  // Title colors
  const titleClass = isDark
    ? // تدرّج الهوية: أزرق #1A43BF → نيلي #6366F1 → بنفسجي #7C3AED
    "text-transparent bg-clip-text [background-image:linear-gradient(135deg,#1A43BF,#6366F1,#7C3AED)]"
    : "text-slate-900";

  // Eyebrow styles (اختياري)
  const eyebrowBox = isDark
    ? "inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 ring-white/10 bg-white/5 backdrop-blur"
    : "inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 ring-slate-900/10 bg-slate-900/5 backdrop-blur";
  const eyebrowText = isDark ? "text-indigo-100" : "text-slate-700";

  // Subtitle
  const subtitleText = isDark ? "text-slate-200/90" : "text-slate-700";

  return (
    <div className={wrap}>
      {/* Eyebrow (اختياري) */}
      {eyebrow ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.75 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={eyebrowBox}
        >
          <span className="inline-block size-1.5 rounded-full bg-gradient-to-r from-[#1A43BF] via-[#6366F1] to-[#7C3AED]" />
          <span className={`text-xs font-semibold tracking-wide ${eyebrowText}`}>
            {eyebrow}
          </span>
        </motion.div>
      ) : null}

      {/* Title — نظيف، بدون مؤثرات إضافية */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
      >
        <span className={titleClass}>{title}</span>
      </motion.h2>

      {/* Subtitle (اختياري) */}
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.35, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-3 text-[15.5px] leading-relaxed ${subtitleText}`}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
