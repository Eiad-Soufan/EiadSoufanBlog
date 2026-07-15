import { motion as Motion, useReducedMotion } from "framer-motion";
import { impactMetrics } from "../data/profile";

export default function ImpactMetrics() {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.dl
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-12 grid grid-cols-2 overflow-hidden rounded-[22px] border border-line/15 bg-surface/45 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.035)] backdrop-blur-sm lg:mt-16 lg:grid-cols-4"
      aria-label="Selected impact metrics"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan/45 to-transparent"
      />
      {impactMetrics.map((metric, index) => (
        <div
          key={metric.label}
          className={`relative flex min-h-[124px] flex-col justify-center px-5 py-6 sm:px-7 lg:min-h-[136px] ${
            index % 2 === 0 ? "border-r border-line/10" : ""
          } ${index < 2 ? "border-b border-line/10 lg:border-b-0" : ""} ${
            index === 1 ? "lg:border-r" : ""
          } ${index === 2 ? "lg:border-r" : ""}`}
        >
          <dt className="order-2 mt-2 max-w-[15rem] text-[0.72rem] font-semibold leading-relaxed tracking-[0.01em] text-muted sm:text-xs">
            {metric.label}
          </dt>
          <dd className="display-font order-1 text-[clamp(1.55rem,3vw,2.35rem)] font-bold tracking-[-0.045em] text-ink">
            {metric.value}
          </dd>
        </div>
      ))}
    </Motion.dl>
  );
}
