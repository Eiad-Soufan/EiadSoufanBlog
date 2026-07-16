import { motion as Motion, useReducedMotion } from "framer-motion";
import BrandMark from "./BrandMark";

const NODES = [
  { label: "Django", detail: "Backend", className: "left-[5%] top-[24%]" },
  { label: "React", detail: "Interface", className: "right-[4%] top-[19%]" },
  { label: "AI / RAG", detail: "Intelligence", className: "right-[2%] bottom-[20%]" },
  { label: "Flutter", detail: "Mobile", className: "left-[4%] bottom-[18%]" },
];

function NodeLabel({ label, detail, className }) {
  return (
    <div
      className={`absolute z-20 min-w-[92px] rounded-xl border border-line/15 bg-canvas/80 px-3 py-2 shadow-[0_14px_40px_-20px_rgb(0_0_0_/_0.9)] backdrop-blur-md ${className}`}
    >
      <span className="display-font block text-[0.7rem] font-bold tracking-[-0.01em] text-ink sm:text-xs">
        {label}
      </span>
      <span className="mt-0.5 block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[0.6rem]">
        {detail}
      </span>
    </div>
  );
}

export default function SignatureField() {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.975, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[540px]"
      aria-hidden="true"
    >
      <div className="relative aspect-[0.94/1] min-h-[340px] overflow-hidden rounded-[30px] border border-line/15 bg-[linear-gradient(145deg,rgb(var(--color-surface-raised)/0.78),rgb(var(--color-canvas-soft)/0.55))] p-4 shadow-card sm:aspect-square sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgb(var(--color-brand)/0.16),transparent_37%),radial-gradient(circle_at_64%_62%,rgb(var(--color-cyan)/0.08),transparent_30%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(143 166 205 / .10) 1px, transparent 1px), linear-gradient(90deg, rgb(143 166 205 / .10) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage:
              "radial-gradient(circle at center, black 25%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 25%, transparent 78%)",
          }}
        />

        <div className="relative z-20 flex items-center justify-between text-[0.58rem] font-bold uppercase tracking-[0.18em] text-muted sm:text-[0.64rem]">
          <span>Systems / In motion</span>
          <span className="inline-flex items-center gap-2 text-success/85">
            <span className="status-pulse h-1.5 w-1.5 rounded-full bg-success" />
            Production minded
          </span>
        </div>

        <div className="absolute inset-x-3 bottom-12 top-12 sm:inset-x-5 sm:bottom-14 sm:top-14">
          <svg
            viewBox="0 0 520 520"
            className="h-full w-full overflow-visible"
            role="presentation"
          >
            <defs>
              <linearGradient id="orbit-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgb(91 224 255)" stopOpacity="0.18" />
                <stop offset="0.52" stopColor="rgb(105 137 255)" stopOpacity="0.72" />
                <stop offset="1" stopColor="rgb(165 132 255)" stopOpacity="0.18" />
              </linearGradient>
              <radialGradient id="core-gradient">
                <stop offset="0" stopColor="rgb(91 224 255)" stopOpacity="0.9" />
                <stop offset="1" stopColor="rgb(105 137 255)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <Motion.circle
              cx="260"
              cy="260"
              r="184"
              fill="none"
              stroke="rgb(143 166 205)"
              strokeDasharray="1 12"
              strokeLinecap="round"
              strokeOpacity="0.23"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.25, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />

            <g className="signature-orbit">
              <ellipse
                cx="260"
                cy="260"
                rx="201"
                ry="111"
                fill="none"
                stroke="url(#orbit-gradient)"
                strokeWidth="1.35"
              />
              <circle cx="73" cy="220" r="4.5" fill="rgb(91 224 255)" />
              <circle cx="447" cy="300" r="3.5" fill="rgb(165 132 255)" />
            </g>

            <g className="signature-orbit signature-orbit--reverse">
              <ellipse
                cx="260"
                cy="260"
                rx="118"
                ry="210"
                fill="none"
                stroke="url(#orbit-gradient)"
                strokeDasharray="4 9"
                strokeOpacity="0.68"
                strokeWidth="1"
              />
              <circle cx="260" cy="50" r="3.5" fill="rgb(91 224 255)" />
            </g>

            <circle cx="260" cy="260" r="96" fill="url(#core-gradient)" opacity="0.12" />
            <circle
              cx="260"
              cy="260"
              r="78"
              fill="rgb(8 12 21 / .92)"
              stroke="rgb(143 166 205 / .26)"
            />
            <circle
              cx="260"
              cy="260"
              r="65"
              fill="none"
              stroke="rgb(91 224 255 / .22)"
              strokeDasharray="2 8"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 sm:h-16 sm:w-16">
            <BrandMark className="h-full w-full" />
            <span className="absolute left-1/2 top-[calc(100%+0.45rem)] block w-[8.5rem] -translate-x-1/2 text-center text-[0.46rem] font-bold uppercase leading-[1.35] tracking-[0.16em] text-muted sm:top-[calc(100%+0.5rem)] sm:text-[0.5rem]">
              Architect · Build · Scale
            </span>
          </div>

          {NODES.map((node) => (
            <NodeLabel key={node.label} {...node} />
          ))}
        </div>

        <div className="absolute inset-x-5 bottom-4 z-20 flex items-center justify-between border-t border-line/10 pt-3 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-muted sm:bottom-5 sm:text-[0.6rem]">
          <span>Architecture</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-line/20 to-transparent mx-3" />
          <span>Delivery</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-line/20 to-transparent mx-3" />
          <span>Impact</span>
        </div>
      </div>

      <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(circle,rgb(var(--color-brand)/0.15),transparent_62%)] blur-2xl" />
    </Motion.div>
  );
}
