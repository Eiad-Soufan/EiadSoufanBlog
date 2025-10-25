// src/components/ShowcaseGrid.jsx
import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

export default function ShowcaseGrid({ items = [] }) {
  const doubled = [...items, ...items];         // محتوى مزدوج لضمان الالتفاف
  const trackRef = useRef(null);

  // حالة الحركة
  const [offset, setOffset] = useState(0);      // إزاحة المسار (px)
  const [dragging, setDragging] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [velocity, setVelocity] = useState(0);  // قصور ذاتي لحظي بعد السحب

  // قياسات
  const singleWidthRef = useRef(1);             // عرض مجموعة واحدة (نصف المسار)
  const lastXRef = useRef(0);
  const lastTsRef = useRef(performance.now());
  const wheelTimerRef = useRef(null);

  // احسب عرض نصف المسار (مجموعة واحدة)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // بما أننا نرسم العناصر مضاعفة، عرض مجموعة واحدة = scrollWidth / 2
    const measure = () => {
      const half = el.scrollWidth / 2;
      singleWidthRef.current = Math.max(half, 1);
    };
    measure();

    // إعادة القياس عند تغيير الحجم/الخطوط
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  // سرعات: نحسب السرعة الأساسية من مدة الدورة المطلوبة
  // نريد قطع "مجموعة واحدة" خلال 28 ثانية (مطابقة للأنيميشن السابق).
  const baseSpeed = useRef(0);
  useEffect(() => {
    const recalcBase = () => {
      baseSpeed.current = singleWidthRef.current / 28; // px/sec
    };
    recalcBase();
    const id = setInterval(recalcBase, 500); // تحديث بسيط حتى يتم تثبيت القياسات
    return () => clearInterval(id);
  }, []);

  // حلقة الرسوم (تشغيل تلقائي + قصور ذاتي + التفاف لا نهائي)
  useEffect(() => {
    let raf;
    const step = (ts) => {
      const dt = Math.max(0, (ts - lastTsRef.current) / 1000); // بالثواني
      lastTsRef.current = ts;

      setOffset((prev) => {
        let next = prev;

        // حركة تلقائية لليسار
        if (autoPlay && !dragging) {
          next -= baseSpeed.current * dt;
        }

        // قصور ذاتي بعد السحب (يتلاشى تدريجيًا)
        if (!dragging && Math.abs(velocity) > 0.01) {
          next += velocity * dt;
          // تخميد أسي لطيف
          setVelocity((v) => v * 0.94);
        }

        // التفاف لا نهائي: أبقِ الإزاحة داخل [-W, 0]
        const W = singleWidthRef.current;
        if (next <= -W) next += W;
        if (next > 0) next -= W;

        return next;
      });

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [autoPlay, dragging, velocity]);

  // سحب بالماوس/اللمس
  const onPointerDown = useCallback((e) => {
    // أوقف الأوتو أثناء السحب
    setAutoPlay(false);
    setDragging(true);
    lastXRef.current = getClientX(e);
    // منع سحب الصور الافتراضي
    e.preventDefault?.();
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    const x = getClientX(e);
    const dx = x - lastXRef.current;
    lastXRef.current = x;

    // حدّث الإزاحة (اتجاه السحب الطبيعي)
    setOffset((prev) => {
      let next = prev + dx;
      const W = singleWidthRef.current;
      if (next <= -W) next += W;
      if (next > 0) next -= W;
      return next;
    });

    // خزّن سرعة لحظية (px/sec تقريبية) لاستخدامها كقصور ذاتي قصير
    // هنا نستخدم معامل بسيط بدل dt دقيق (يكفي للسلاسة)
    setVelocity(dx * 8);
  }, [dragging]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
    // المطلوب: يعود فورًا للتشغيل التلقائي
    // سنبقي velocity للحظة لدمج السلاسة، لكن الأوتو يعمل فورًا
    setAutoPlay(true);
  }, []);

  // تمرير العجلة: يحرّك أفقيًا ويوقف الأوتو لحظيًا ثم يستأنف بعد مهلة قصيرة
  const onWheel = useCallback((e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta === 0) return;

    setAutoPlay(false);
    setOffset((prev) => {
      let next = prev - delta;
      const W = singleWidthRef.current;
      if (next <= -W) next += W;
      if (next > 0) next -= W;
      return next;
    });

    // استئناف تلقائي بعد عدم نشاط قصير
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => setAutoPlay(true), 600);
  }, []);


  return (
    <div className="relative group overflow-hidden">

      {/* ظلال الجانبين */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0b1020] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0b1020] to-transparent z-20" />

      {/* المسار (JS-driven transform) */}
      <div
        ref={trackRef}
        className={`
          relative flex items-stretch gap-4 will-change-transform
          select-none touch-pan-x ${dragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        {doubled.map((item, i) => {
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
    </div>
  );
}

/* ===== Utilities ===== */
function getClientX(e) {
  // يدعم الماوس واللمس عبر PointerEvents
  // بعض المتصفحات قد لا تملأ clientX مع اللمس، فنfallback إلى touches
  return e.clientX ?? e.pageX ?? (e.touches?.[0]?.clientX ?? 0);
}
