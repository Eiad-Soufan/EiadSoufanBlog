import { motion as Motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import ImpactMetrics from "./ImpactMetrics";
import SignatureField from "./SignatureField";

const entrance = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        d="M7 5h8v8M15 5 6 14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function HeroNova() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <section className="relative isolate overflow-hidden border-b border-line/10">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(var(--color-canvas))_0%,rgb(var(--color-canvas-soft))_68%,rgb(11_16_28)_100%)]" />
      <div className="pointer-events-none absolute left-[-18rem] top-[-18rem] -z-10 h-[42rem] w-[42rem] rounded-full bg-brand/[0.09] blur-3xl" />
      <div className="pointer-events-none absolute right-[-16rem] top-[-10rem] -z-10 h-[38rem] w-[38rem] rounded-full bg-cyan/[0.055] blur-3xl" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(143 166 205 / .07) 1px, transparent 1px), linear-gradient(90deg, rgb(143 166 205 / .07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 74%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 74%)",
        }}
      />

      <div className="site-container pb-14 pt-14 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <Motion.div
            initial={initial}
            animate="visible"
            transition={{ staggerChildren: reduceMotion ? 0 : 0.065 }}
            className="lg:col-span-7"
          >
            <Motion.div
              variants={entrance}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-line/15 bg-surface/45 px-3.5 py-2"
            >
              <span className="inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.15em] text-ink/88 sm:text-[0.7rem]">
                <span className="status-pulse h-1.5 w-1.5 rounded-full bg-success" />
                {profile.location}
              </span>
              <span className="h-3 w-px bg-line/20" aria-hidden="true" />
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-muted sm:text-[0.7rem]">
                {profile.availability}
              </span>
            </Motion.div>

            <Motion.p
              variants={entrance}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow-label mt-8"
            >
              {profile.name} — {profile.role}
            </Motion.p>

            <Motion.h1
              variants={entrance}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="display-font mt-4 max-w-[13ch] text-[clamp(2.65rem,6.7vw,6.15rem)] font-bold leading-[0.98] tracking-[-0.065em] text-ink"
            >
              I engineer <span className="text-gradient">intelligent systems</span> for
              real-world complexity.
            </Motion.h1>

            <Motion.p
              variants={entrance}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[66ch] text-[0.98rem] leading-[1.8] text-muted sm:text-[1.06rem] lg:max-w-[61ch]"
            >
              {profile.summary}
            </Motion.p>

            <Motion.div
              variants={entrance}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Link
                to="/#selected-work"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[15px] bg-ink px-5 text-sm font-extrabold text-canvas shadow-[0_18px_45px_-25px_rgb(var(--color-cyan)_/_0.75)] transition duration-200 ease-premium hover:-translate-y-0.5 hover:bg-white sm:justify-start"
              >
                Explore selected work
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-[15px] border border-line/20 bg-surface/55 px-5 text-sm font-bold text-ink transition duration-200 ease-premium hover:-translate-y-0.5 hover:border-line/35 hover:bg-surface-raised sm:justify-start"
              >
                Start a conversation
              </Link>
            </Motion.div>

            <Motion.div
              variants={entrance}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line/10 pt-5"
            >
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-muted">
                Profiles
              </span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-ink/85 transition-colors hover:text-cyan"
              >
                GitHub <ExternalIcon />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-ink/85 transition-colors hover:text-cyan"
              >
                LinkedIn <ExternalIcon />
              </a>
              <span className="hidden h-3 w-px bg-line/20 sm:block" aria-hidden="true" />
              <span className="text-xs font-semibold text-muted">
                Python · Django · React · Flutter · RAG
              </span>
            </Motion.div>
          </Motion.div>

          <div className="lg:col-span-5">
            <SignatureField />
          </div>
        </div>

        <ImpactMetrics />
      </div>
    </section>
  );
}
