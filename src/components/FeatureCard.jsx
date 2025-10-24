// src/components/FeatureCard.jsx
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { LuStar } from "react-icons/lu";

export default function FeatureCard({ icon = <LuStar />, title, desc, delay = 0 }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gX: 50, gY: 50 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;
    const max = 6;
    const rx = -ny * max;
    const ry = nx * max;
    setTilt({ rx, ry, gX: (x / rect.width) * 100, gY: (y / rect.height) * 100 });
  };

  const onLeave = () => setTilt({ rx: 0, ry: 0, gX: 50, gY: 50 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      style={{ perspective: 1000 }}
      className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-indigo-500/60 via-violet-500/40 to-sky-500/40"
    >
      <motion.div
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.6 }}
        className="rounded-2xl p-6 h-full relative overflow-hidden
                   bg-white/8 backdrop-blur-lg ring-1 ring-white/12"
      >
        {/* mouse-follow glow */}
        <div
          className="pointer-events-none absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px 200px at ${tilt.gX}% ${tilt.gY}%, rgba(99,102,241,0.18), rgba(147,51,234,0.12) 40%, transparent 65%)`,
            mixBlendMode: "screen",
          }}
        />
        {/* film */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(56,189,248,0.06), rgba(168,85,247,0.06), rgba(99,102,241,0.06), rgba(56,189,248,0.06))",
          }}
        />

        <div className="text-2xl mb-3 text-indigo-300">{icon}</div>
        <h3 className="text-lg font-bold text-indigo-100">{title}</h3>
        <p className="mt-2 text-slate-200/85 leading-relaxed">{desc}</p>
      </motion.div>

      {/* outer soft glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-60 blur-md bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-sky-500/30" />
    </motion.div>
  );
}
