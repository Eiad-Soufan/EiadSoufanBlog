// src/components/ShowcaseGrid.jsx
import { motion } from "framer-motion";

export default function ShowcaseGrid({ items = [] }) {
  const loopItems = [...items, ...items];
  const cycleSeconds = 28;

  return (
    <div className="relative group overflow-hidden">
      {/* تدرّجات جانبية داكنة لقطع الحواف */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0b1020] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0b1020] to-transparent z-20" />

      {/* المسار المتحرك */}
      <div
        className="marquee flex items-stretch gap-4 will-change-transform"
        style={{ animation: `marquee ${cycleSeconds}s linear infinite`, animationPlayState: "running" }}
      >
        {loopItems.map((item, i) => {
          const src = typeof item === "string" ? item : item?.src;
          const caption = typeof item === "string" ? "" : item?.caption || "";

          return (
            <motion.figure
              key={`${i}-${caption || "card"}`}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 w-[180px] md:w-[210px] rounded-2xl bg-white/8 backdrop-blur-md ring-1 ring-white/12 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.5)] overflow-hidden"
              aria-label={caption || "showcase item"}
            >
              {/* مربع 1:1 */}
              <div className="relative w-full" style={{ paddingTop: "100%" }}>
                <motion.img
                  src={src}
                  alt={caption || "showcase"}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.035 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* حافة داخلية */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />

                {/* شريط العنوان */}
                {caption ? (
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="h-10 bg-gradient-to-t from-black/40 via-black/15 to-transparent backdrop-blur-[2px]" />
                    <div className="absolute inset-x-0 bottom-0 px-2 py-1 text-center text-xs text-white/95 drop-shadow">
                      {caption}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.figure>
          );
        })}
      </div>

      {/* CSS */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee { animation-play-state: running; }
        .group:hover .marquee { animation-play-state: paused !important; }
      `}</style>
    </div>
  );
}
