import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import ImpactMetrics from "./ImpactMetrics";
import NeuralCosmos from "./NeuralCosmos";
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
  const reduceMotion = useHydrationSafeReducedMotion();
  const initial = reduceMotion ? "visible" : "hidden";
  const { copy, path } = useLocale();

  return (
    <section className="relative isolate overflow-hidden border-b border-line/10">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgb(var(--color-canvas))_0%,rgb(var(--color-canvas-soft))_68%,rgb(11_16_28)_100%)]" />
      <NeuralCosmos />
      <div className="hero-readability-veil pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="site-container relative z-10 pb-14 pt-14 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
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
              className="inline-flex items-center rounded-full border border-line/15 bg-surface/55 px-3.5 py-2 backdrop-blur-md"
            >
              <span className="inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.15em] text-ink/90 sm:text-[0.7rem]">
                <span className="status-pulse h-1.5 w-1.5 rounded-full bg-success" />
                {copy.common.location}
              </span>
            </Motion.div>

            <Motion.p
              variants={entrance}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow-label mt-8"
            >
              {copy.common.name} — {copy.common.role}
            </Motion.p>

            <Motion.h1
              variants={entrance}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title-scale display-font mt-4 max-w-[19ch] font-bold leading-[1.06] tracking-[-0.045em] text-ink"
            >
              {copy.profile.headline.before}{" "}
              <span className="text-gradient">{copy.profile.headline.accent}</span>{" "}
              {copy.profile.headline.after}
            </Motion.h1>

            <Motion.p
              variants={entrance}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="hero-lead mt-6 max-w-[66ch] text-[0.98rem] leading-[1.8] text-muted sm:text-[1.06rem] lg:max-w-[61ch]"
            >
              {copy.profile.summary}
            </Motion.p>

            <Motion.div
              variants={entrance}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Link
                to={path("home", "#selected-work")}
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[15px] bg-ink px-5 text-sm font-extrabold text-canvas shadow-[0_18px_45px_-25px_rgb(var(--color-cyan)_/_0.75)] transition duration-200 ease-premium hover:-translate-y-0.5 hover:bg-white sm:justify-start"
              >
                {copy.home.hero.explore}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                to={path("contact")}
                className="inline-flex min-h-12 items-center justify-center rounded-[15px] border border-line/20 bg-surface/55 px-5 text-sm font-bold text-ink transition duration-200 ease-premium hover:-translate-y-0.5 hover:border-line/35 hover:bg-surface-raised sm:justify-start"
              >
                {copy.home.hero.start}
              </Link>
            </Motion.div>

            <Motion.div
              variants={entrance}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line/10 pt-5"
            >
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-muted">
                {copy.home.hero.profiles}
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
              <span className="text-xs font-semibold text-muted" dir="ltr">
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
