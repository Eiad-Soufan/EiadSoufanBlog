// src/components/Header.jsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

/**
 * Header — iOS Glass + Adaptive Scrim (وضوح عالٍ فوق الأبيض والداكن)
 * - زجاج: backdrop-blur-xl + ring + contrast/brightness محسنين
 * - طبقة scrim غامقة رقيقة تتكيف مع التمرير لضمان التباين
 * - drop-shadow للنص لزيادة الوضوح دون تغيير اللون
 * - المحتوى والهوفر واللوغو/العنوان كما هي
 */

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About" },         // كان "About Us"
  { to: "/why-us", label: "Why Eiad" },        // كان "Why Us"
  { to: "/contact", label: "Contact" },        // كان "Contact me"
];

function ScrollRestorer() {
  useEffect(() => {
    const scrollTop = () => {
      if (window.location.hash) return;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function (...args) {
      const ret = origPush.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };
    history.replaceState = function (...args) {
      const ret = origReplace.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };
    window.addEventListener("popstate", scrollTop);
    window.addEventListener("hashchange", scrollTop);
    window.addEventListener("locationchange", scrollTop);
    scrollTop();
    return () => {
      history.pushState = origPush;
      history.replaceState = origReplace;
      window.removeEventListener("popstate", scrollTop);
      window.removeEventListener("hashchange", scrollTop);
      window.removeEventListener("locationchange", scrollTop);
    };
  }, []);
  return null;
}

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        key: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: 1.0 + Math.random() * 1.2,
        d: 6 + Math.random() * 6,
        t: 3.6 + Math.random() * 2.2,
      })),
    []
  );
  return (
    <svg
      className="absolute inset-0 -z-10 w-full h-[132px] md:h-[144px] opacity-40"
      aria-hidden
      role="presentation"
    >
      {dots.map((d) => (
        <motion.circle
          key={d.key}
          cx={`${d.x}%`}
          cy={`${d.y}%`}
          r={d.r}
          fill="url(#g)"
          initial={{ opacity: 0.5 }}
          animate={{ y: [0, -d.d, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: d.t, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <defs>
        <radialGradient id="g">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// تبويب بنفس الهوفر السابق، مع drop-shadow أقوى للنص
function TabLink({ to, children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [sparkKey, setSparkKey] = useState(0);
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative isolate overflow-hidden rounded-md px-3 py-2 text-[13px] md:text-sm font-semibold tracking-wide transition
         ${isActive ? "text-slate-50" : "text-slate-200/90 hover:text-white"} filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]`
      }
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setSparkKey((k) => k + 1)}
    >
      {/* Spotlight */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-200"
        style={{
          background: `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.14), transparent 60%)`,
        }}
        aria-hidden
      />
      {/* Overlay خفيف للعمق */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04))`,
        }}
        aria-hidden
      />
      {/* Spark */}
      <motion.span
        key={sparkKey}
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full"
        initial={{ opacity: 0, scale: 0.4, y: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0.4, 1.05, 0.8], y: [-6, -12, -18] }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.2))",
          filter: "blur(0.3px)",
        }}
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
    </NavLink>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [depth, setDepth] = useState(0); // 0..1

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sX = useSpring(tiltX, { stiffness: 120, damping: 20 });
  const sY = useSpring(tiltY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 8);
      const d = Math.max(0, Math.min(1, y / 160));
      setDepth(d);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const rx = (e.clientY / innerHeight - 0.5) * 2.2;
      const ry = (e.clientX / innerWidth - 0.5) * -2.2;
      tiltX.set(rx);
      tiltY.set(ry);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [tiltX, tiltY]);

  // ظل رقيق
  const boxShadow = `
    0 ${Math.round(1 + 1.5 * depth)}px ${Math.round(6 + 6 * depth)}px rgba(15,23,42,${(0.06 + 0.04 * depth).toFixed(2)}),
    0 ${Math.round(4 + 3 * depth)}px ${Math.round(18 + 10 * depth)}px rgba(15,23,42,${(0.10 + 0.05 * depth).toFixed(2)})
  `;

  // زجاجية محسّنة للوضوح على الأبيض
  const glassClass =
    "backdrop-blur-xl bg-white/10 ring-1 ring-white/15 backdrop-contrast-135 backdrop-brightness-[0.88]";

  // Opacity للـscrim (أعمق من السابق + يتزايد قليلاً مع التمرير)
  const scrimOpacity = 0.30 + depth * 0.18; // ~0.30 → ~0.48

  return (
    // رفعنا طبقة الهيدر وأضفنا isolate لضمان التصدّر فوق الخلفيات
    <header className="sticky top-0 z-[200] isolate">
      <ScrollRestorer />

      {/* فاصل علوي رفيع */}
      <div className="h-[1px] w-full bg-white/5" />

      {/* حاوية زجاجية شفافة + scrim متكيف */}
      <motion.div
        style={{ rotateX: sX, rotateY: sY, transformStyle: "preserve-3d", boxShadow }}
        className={`relative ${glassClass} border-b border-white/10`}
      >
        {/* طبقة Scrim لضمان وضوح النص فوق الخلفيات البيضاء */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.66) 0%, rgba(2,6,23,0.48) 45%, rgba(2,6,23,0.24) 100%)",
            opacity: scrimOpacity,
            mixBlendMode: "normal",
          }}
        />

        {/* نسيج ض噪 رقيق جداً */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 80% 70%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 60% 20%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, #fff 1px, transparent 1px)",
            backgroundSize: "220px 220px, 240px 240px, 260px 260px, 280px 280px",
          }}
        />

        {/* Particles */}
        <Particles />

        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* الهوية */}
            <div className="flex items-center gap-3">
              <motion.img
                src={logo}
                alt="Eiad Abdulhadi Soufan — logo"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
              <div className="leading-tight select-none">
                <motion.h1
                  className="font-extrabold tracking-tight text-lg md:text-xl text-white filter drop-shadow-[0_1px_0_rgba(0,0,0,0.85)]"
                  style={{ lineHeight: 1.1 }}
                >
                  Eiad Abdulhadi Soufan
                </motion.h1>
                <div className="mt-0.5">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-1
               text-[12px] md:text-[13px] font-medium tracking-wide
               text-white/95 bg-black/25 backdrop-blur-[2px]
               ring-1 ring-white/15
               drop-shadow-[0_1px_0_rgba(0,0,0,0.85)]"
                  >
                    React • Django • AI • Data • Teaching
                  </span>
                </div>

              </div>
            </div>

            {/* الناف */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => "relative"}>
                  {({ isActive }) => (
                    <span className="relative inline-flex items-center">
                      <TabLink to={item.to}>{item.label}</TabLink>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-2 right-2 -bottom-1 h-[2px] rounded bg-white/80"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* فاصل صغير أسفل الهيدر */}
      <div className="w-full h-[8px]" />
    </header>
  );
}
