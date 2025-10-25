// src/components/RightShowcase.jsx
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * RightShowcase — Responsive fan deck
 * - موبايل: وسط الشاشة + تقليل التباعد + تصغير خفيف لظهور الثلاث بطاقات كاملة
 * - md+: نفس المظهر السابق (fan أوسع) بدون تغيير بصري
 */

const CARD_W = 220;
const CARD_H = 320;

const BRAND = {
  blue: "#1A43BF",
  indigo: "#6366F1",
  violet: "#7C3AED",
  glassLight: "rgba(255,255,255,0.92)",
  glassLightDark: "rgba(255,255,255,0.88)",
  stroke: "rgba(148,163,184,.60)",
  ink: "rgba(0,0,0,.12)",
};

// hook بسيط لمعرفة هل العرض >= md (768px)
function useIsMdUp() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const h = () => setOk(m.matches);
    h();
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return ok;
}

export default function RightShowcase() {
  const reduce = useReducedMotion();
  const isMd = useIsMdUp();

  // إزاحات المروحة: أضيق على الموبايل، أوسع على md+
  const fan = isMd
    ? { leftX: -120, rightX: 120, liftSide: -20, liftCenter: -36, rot: 16 }
    : { leftX: -80, rightX: 80, liftSide: -12, liftCenter: -22, rot: 10 };

  const parent = reduce
    ? { initial: {}, animate: {} }
    : {
        initial: { opacity: 1 },
        animate: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
      };

  return (
    <motion.div
      className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] select-none"
      variants={parent}
      initial="initial"
      animate="animate"
      style={{ zIndex: 2 }}
    >
      {/* وهج الخلفية (كما هو) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute right-[12%] top-[6%] w-56 h-56 rounded-full blur-3xl"
          style={{ background: "rgba(56,189,248,0.18)" }}
        />
        <div
          className="absolute right-[24%] bottom-[10%] w-64 h-64 rounded-full blur-3xl"
          style={{ background: "rgba(124,58,237,0.16)" }}
        />
      </div>

      {/* المنصّة — وسط الشاشة على الموبايل، وتبقى مناسبة على md+ */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="
            relative group/cards
            w-full max-w-[460px] sm:max-w-[520px] md:max-w-[620px]
            h-[300px] sm:h-[340px] lg:h-[360px]
            origin-center
            scale-[0.9] sm:scale-[0.95] md:scale-100 lg:scale-105
          "
        >
          <CardFan
            role="tablet"
            title="Web Applications"
            accent="sky"
            final={{ x: fan.leftX, r: -fan.rot, z: 10, lift: fan.liftSide }}
            delay={0.0}
          />
          <CardFan
            role="laptop"
            title="Desktop Applications"
            accent="violet"
            final={{ x: 0, r: 0, z: 20, lift: fan.liftCenter }}
            delay={0.06}
            featured
          />
          <CardFan
            role="phone"
            title="Mobile Applications"
            accent="rose"
            final={{ x: fan.rightX, r: fan.rot, z: 30, lift: fan.liftSide }}
            delay={0.12}
            lightPhoneUI
          />
        </div>
      </div>

      {/* تحسين بصري خفيف */}
      <style>{`
        .group\\/cards:hover .card-slot {
          opacity: .85;
          filter: saturate(1.02) contrast(1.01);
          transition: opacity .22s ease, filter .22s ease;
        }
        .group\\/cards .card-slot:hover {
          opacity: 1 !important;
          filter: saturate(1.08) contrast(1.05);
        }
        .group\\/cards .card-slot:active {
          opacity: 1 !important;
          filter: saturate(1.08) contrast(1.05);
        }
      `}</style>
    </motion.div>
  );
}

/* ======================== Card Fan ======================== */

function CardFan({
  role = "laptop", // laptop | tablet | phone
  title = "",
  accent = "violet", // sky | violet | rose
  final = { x: 0, r: 0, z: 10, lift: 0 },
  delay = 0,
  featured = false,
  lightPhoneUI = false,
}) {
  const reduce = useReducedMotion();
  const color = getAccent(accent);

  const from = { x: 0, y: 0, rotate: 0, scale: 0.96, opacity: 0 };
  const to = {
    x: final.x,
    y: final.lift || 0,
    rotate: final.r,
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.6,
      duration: reduce ? 0 : 0.9,
    },
  };

  return (
    <motion.div
      className="card-slot absolute left-1/2 top-1/2 will-change-transform"
      style={{ zIndex: final.z, transform: "translate(-50%, -50%)" }}
      initial={from}
      animate={to}
      whileHover={{ zIndex: final.z + 100 }}
    >
      <motion.div
        whileHover={{
          y: -12,
          scale: 1.06,
          rotate: final.r * 0.5,
          boxShadow:
            "0 18px 50px -12px rgba(0,0,0,.45), 0 3px 18px rgba(0,0,0,.25)",
        }}
        whileTap={{
          y: -12,
          scale: 1.06,
          rotate: final.r * 0.5,
          boxShadow:
            "0 18px 50px -12px rgba(0,0,0,.45), 0 3px 18px rgba(0,0,0,.25)",
        }}
        transition={{ type: "spring", stiffness: 140, damping: 16, mass: 0.5 }}
        className="relative rounded-[22px] overflow-hidden"
        style={{ width: CARD_W, height: CARD_H }}
      >
        {/* إطار Conic */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          style={{
            background: `
              radial-gradient(120% 90% at 50% 0%,
                rgba(255,255,255,0.55), rgba(255,255,255,0) 40%),
              conic-gradient(from 220deg,
                ${color.a}33, ${color.b}33, ${color.c}33, ${color.a}33)
            `,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            padding: 1.2,
            opacity: 0.95,
            filter: "saturate(1.05)",
          }}
        />

        {/* جسم البطاقة */}
        <div
          className="absolute inset-0 rounded-[20px] backdrop-blur"
          style={{
            background: `linear-gradient(
              180deg,
              ${BRAND.glassLight} 0%,
              ${BRAND.glassLightDark} 100%
            )`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,.8), inset 0 -1px 0 rgba(17,24,39,.06)",
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,.02) 0 6px, rgba(0,0,0,0) 6px 12px)",
          }}
        />

        {/* لمعان */}
        <div
          aria-hidden
          className="absolute -inset-1 rounded-[22px] opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,.16), rgba(255,255,255,0), rgba(255,255,255,.12))",
            mixBlendMode: "screen",
            transition: "opacity .35s ease",
          }}
        />

        {/* عنوان البطاقة */}
        <div
          className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide drop-shadow"
          style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          {title}
        </div>

        {/* محتوى البطاقة */}
        <div className="absolute inset-0 p-10 pt-12">
          {role === "laptop" && <LaptopGlyph accent={color} />}
          {role === "tablet" && <TabletGlyph accent={color} />}
          {role === "phone" && <PhoneGlyph accent={color} lightUI={lightPhoneUI} />}
        </div>

        {/* توهج سفلي */}
        <motion.div
          aria-hidden
          className="absolute -inset-4 rounded-[26px] pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.28 }}
          style={{
            background: `radial-gradient(220px 190px at 50% 70%, ${color.a}24, transparent 70%)`,
            filter: "blur(12px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ====================== Glyphs ====================== */

function LaptopGlyph({ accent }) {
  const screenH = 100;
  return (
    <div className="relative w-full h-full">
      <div
        className="mx-auto rounded-lg border bg-white overflow-hidden shadow-[0_10px_24px_-10px_rgba(0,0,0,.20)]"
        style={{ width: "100%", height: screenH, borderColor: BRAND.stroke }}
      >
        <div className="h-full w-full p-3">
          <div className="flex items-center gap-2">
            <Badge color={accent.a} />
            <Badge color={accent.b} />
            <Badge color={accent.c} />
            <div className="ml-1 h-2.5 w-24 rounded" style={{ background: BRAND.ink }} />
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            <CardMini c={`${accent.a}22`} />
            <CardMini c={`${accent.b}22`} />
            <CardMini c={`${accent.c}22`} />
          </div>
          <div className="mt-2.5 space-y-2">
            <Bar w="85%" />
            <Bar w="60%" opacity={0.85} />
            <Bar w="42%" opacity={0.78} />
          </div>
        </div>
      </div>
      <div
        className="mx-auto mt-1.5 h-2.5 rounded-md border shadow-sm w-[90%]"
        style={{
          background: "linear-gradient(to bottom, #E5E7EB, #CBD5E1)",
          borderColor: "rgba(255,255,255,.7)",
        }}
      />
    </div>
  );
}

function TabletGlyph({ accent }) {
  const w = 140, h = 190;
  return (
    <div className="relative w-full h-full">
      <div
        className="mx-auto rounded-[18px] border bg-white overflow-hidden shadow-[0_10px_22px_-10px_rgba(0,0,0,.18)]"
        style={{ width: w, height: h, borderColor: BRAND.stroke }}
      >
        <div className="relative w-full h-full p-3">
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full"
            style={{ background: "rgba(203,213,225,0.9)" }}
          />
          <div className="grid grid-cols-2 gap-2 mt-4">
            <CardMini c={`${accent.a}28`} />
            <CardMini c={`${accent.b}28`} />
            <CardMini c={`${accent.c}28`} />
            <CardMini c={"rgba(0,0,0,.08)"} border="rgba(0,0,0,.05)" />
          </div>
          <div className="mt-2.5 space-y-2">
            <Bar w="75%" />
            <Bar w="52%" opacity={0.85} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneGlyph({ accent, lightUI = false }) {
  const w = 96, h = 180;
  return (
    <div className="relative w-full h-full">
      <div
        className="mx-auto rounded-[16px] border bg-white overflow-hidden shadow-[0_10px_22px_-10px_rgba(0,0,0,.18)]"
        style={{ width: w, height: h, borderColor: BRAND.stroke }}
      >
        <div className="relative w-full h-full p-3">
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full"
            style={{ background: "rgba(203,213,225,0.9)" }}
          />
          <div className="flex items-center gap-2">
            <Badge color={accent.a} />
            <Badge color={accent.b} />
            <Badge color={accent.c} />
            <div className="ml-1 h-2.5 w-12 rounded" style={{ background: BRAND.ink }} />
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            <CardMini c={`${accent.a}${lightUI ? "28" : "33"}`} border="rgba(0,0,0,.06)" />
            <CardMini c={`${accent.b}${lightUI ? "28" : "33"}`} border="rgba(0,0,0,.06)" />
            <CardMini c={`${accent.c}${lightUI ? "28" : "33"}`} border="rgba(0,0,0,.06)" />
          </div>
          <div className="mt-2.5 space-y-2">
            <Bar w="80%" />
            <Bar w="62%" opacity={0.85} />
            <Bar w="44%" opacity={0.78} />
          </div>
          <div className="mt-2.5 flex gap-1.5">
            <Chip c={`${accent.a}24`} />
            <Chip c="rgba(0,0,0,.06)" darkText />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================== Utilities ====================== */

function Badge({ color }) {
  return <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />;
}
function Bar({ w = "60%", opacity = 1 }) {
  return <div className="h-2.5 rounded" style={{ width: w, opacity, background: BRAND.ink }} />;
}
function CardMini({ c = "rgba(0,0,0,.08)", border = "rgba(0,0,0,.06)" }) {
  return <div className="h-9 rounded-md" style={{ background: c, border: `1px solid ${border}` }} />;
}
function Chip({ c = "rgba(0,0,0,.06)", darkText = false }) {
  return (
    <div
      className="px-2 py-0.5 rounded-md text-[10px] font-medium"
      style={{
        background: c,
        color: darkText ? "rgba(0,0,0,.7)" : "rgba(0,0,0,.75)",
        border: "1px solid rgba(0,0,0,.08)",
      }}
    >
      ●
    </div>
  );
}

function getAccent(name) {
  switch (name) {
    case "sky":
      return { a: "rgba(2,132,199,1)", b: "rgba(14,165,233,1)", c: "rgba(56,189,248,1)" };
    case "rose":
      return { a: "rgba(244,63,94,1)", b: "rgba(225,29,72,1)", c: "rgba(253,164,175,1)" };
    default:
      return { a: BRAND.violet, b: BRAND.indigo, c: "rgba(196,181,253,1)" };
  }
}
