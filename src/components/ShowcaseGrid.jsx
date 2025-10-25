// src/components/ShowcaseGrid.jsx
import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";

export default function ShowcaseGrid({ items = [] }) {
  const loopItems = [...items, ...items];
  const cycleSeconds = 28;

  // سحب يدوي
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const dragX = useRef(0);   // آخر clientX
  const base = useRef(0);    // الإزاحة الأساسية قبل السحب

  const onPointerDown = useCallback((e) => {
    setPaused(true);
    setDragging(true);
    dragX.current = e.clientX ?? (e.touches?.[0]?.clientX || 0);
    base.current = offset;
    // تفعيل التقاط المؤشر كي لا نفقد السحب خارج الحاوية
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, [offset]);

  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    const x = e.clientX ?? (e.touches?.[0]?.clientX || 0);
    const dx = x - dragX.current;
    dragX.current = x;
    setOffset((prev) => prev + dx);
  }, [dragging]);

  const endDrag = useCallback((e) => {
    if (!dragging) return;
    setDragging(false);
    // نبقي الإيقاف مؤقتًا بعد السحب؛ يرجع تلقائيًا بالزر
    // (لو بدك يرجع أوتو فورًا بعد السحب، استبدل السطر التالي بـ setPaused(false))
  }, [dragging]);

  // تمرير بعجلة الماوس (أفقي/رأسي) يوقف الأوتو ويحرّك الشريط
  const onWheel = useCallback((e) => {
    // deltaX للأفقي، إن لم يوجد نستعمل deltaY كتحريك أفقي
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta !== 0) {
      setPaused(true);
      setOffset((prev) => prev - delta);
    }
  }, []);

  // إعادة تشغيل الأوتو (زر اختياري صغير)
  const AutoPlayButton = () => (
    <button
      type="button"
      onClick={() => setPaused(false)}
      className="absolute right-2 -top-10 md:top-0 z-30 hidden sm:inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs
                 bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/14 transition"
      aria-label="Resume auto scroll"
      title="Resume auto scroll"
    >
      ▶ Auto
    </button>
  );

  return (
    <div className="relative group">
      {/* زر استئناف الأوتو (اختياري يظهر على الشاشات الأوسع) */}
      <AutoPlayButton />

      {/* تدرّجات جانبية داكنة لقطع الحواف */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0b1020] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0b1020] to-transparent z-20" />

      {/* المسار — إمّا أوتو بالـCSS أو تحكم يدوي بالـtransform */}
      <div
        ref={trackRef}
        className={`
          relative flex items-stretch gap-4 will-change-transform
          select-none touch-pan-x
          ${paused ? "" : "marquee"}
          ${dragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        style={
          paused
            ? { transform: `translateX(${offset}px)` }
            : { animation: `marquee ${cycleSeconds}s linear infinite` }
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
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
                  draggable={false}
                />
                {/* حافة داخلية */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />

                {/* شريط العنوان */}
                {caption ? (
                  <figcaption className="absolute inset-x-0 bottom-0">
                    <div className="h-10 bg-gradient-to-t from-black/40 via-black/15 to-transparent backdrop-blur-[2px]" />
                    <div className="absolute inset-x-0 bottom-0 px-2 py-1 text-center text-xs text-white/95 drop-shadow">
                      {caption}
                    </div>
                  </figcaption>
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
        /* إيقاف الأوتو عند المرور بالفأرة (كما كان) */
        .group:hover .marquee { animation-play-state: paused !important; }
      `}</style>
    </div>
  );
}
