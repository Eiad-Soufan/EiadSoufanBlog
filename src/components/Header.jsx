// src/components/Header.jsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

/**
 * Header — Glass + Adaptive Scrim
 * تحسينات الموبايل:
 * - منع أي overflow أفقي.
 * - روابط الناف تجي بسطر واحد قابل للتمرير (whitespace-nowrap + overflow-x-auto).
 * - حجم العنوان وحشوات أصغر على الشاشات الصغيرة.
 */

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/why-us", label: "Why Us" },
  { to: "/contact", label: "Contact" },
];

function useSmooth(value, stiffness = 220, damping = 28) {
  const spring = useSpring(value, { stiffness, damping });
  useEffect(() => spring.set(value.get()), [value]); // keep in sync
  return spring;
}

export default function Header() {
  // تأثير scrim بحسب التمرير
  const scrollY = useMotionValue(0);
  const y = useSmooth(scrollY);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [sparkKey, setSparkKey] = useState(0);

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  const scrimOpacity = useMemo(() => {
    const v = Math.min(1, Math.max(0, (y.get() ?? 0) / 80));
    return v * 0.9; // أقصى عتامة
  }, [y]);

  return (
    <header
      className="
        sticky top-0 z-50
        w-full
        overflow-x-clip               /* منع تسرب أي عناصر */
        bg-transparent
        backdrop-blur-xl
      "
      style={{
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      {/* طبقة scrim حسب التمرير */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,15,25,0.8), rgba(10,15,25,0.35))",
          opacity: scrimOpacity,
        }}
      />

      <div
        className="
          max-w-7xl mx-auto
          px-3 sm:px-4 md:px-6
          py-2 sm:py-3               /* موبايل أصغر */
        "
      >
        {/* صف الشعار + العنوان */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={logo}
            alt="Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-1 ring-white/15 shadow"
          />
          <div className="min-w-0">
            <h1
              className="
                text-white font-extrabold tracking-tight
                text-lg sm:text-xl md:text-2xl
                leading-tight
                drop-shadow-[0_1px_1px_rgba(0,0,0,.6)]
                truncate
              "
              title="Eiad Abdulhadi Soufan"
            >
              Eiad Abdulhadi Soufan
            </h1>

            {/* شِبس المهارات — صف واحد قابل للتمرير على الموبايل */}
            <div
              className="
                mt-1
                flex gap-1.5 sm:gap-2
                overflow-x-auto md:overflow-visible
                whitespace-nowrap
                scrollbar-none
                [-webkit-overflow-scrolling:touch]
                pr-1
              "
              role="list"
              aria-label="Topics"
            >
              {["React", "Django", "AI", "Data", "Teaching"].map((t) => (
                <span
                  key={t}
                  className="
                    inline-block
                    text-[11px] sm:text-[12px]
                    px-2.5 py-1
                    rounded-full
                    text-slate-50/90
                    bg-white/10
                    ring-1 ring-white/15
                    shadow-[0_2px_8px_rgba(0,0,0,.25)]
                  "
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* شريط الروابط — يلف ويتمدد على الديسكتوب، ويتمScroll أفقياً على الموبايل */}
        <nav
          className="
            mt-2 sm:mt-3
            -mx-1
            overflow-x-auto md:overflow-visible
            whitespace-nowrap md:whitespace-normal
            scrollbar-none
            [-webkit-overflow-scrolling:touch]
          "
          aria-label="Primary"
        >
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 px-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative isolate overflow-hidden rounded-md px-3 py-1.5
                   text-[13px] md:text-sm font-semibold tracking-wide transition
                   ${isActive ? "text-slate-50" : "text-slate-200/90 hover:text-white"}
                   bg-white/5 ring-1 ring-white/10
                   backdrop-blur
                   shadow-[0_2px_8px_rgba(0,0,0,.2)]
                  `
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
                />
                <span className="relative z-10">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
