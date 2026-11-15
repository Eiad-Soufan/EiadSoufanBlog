import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";

const entrance = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const transition = { duration: 0.58, ease: [0.22, 1, 0.36, 1] };

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
  const { copy, path } = useLocale();
  const { headline, summary } = copy.profile;

  return (
    <section className="page-hero home-hero">
      <div className="site-container page-hero-frame">
        <Motion.div
          className="page-hero-copy"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: reduceMotion ? 0 : 0.07 }}
        >
          <Motion.p className="page-hero-eyebrow" variants={entrance} transition={transition}>
            <span aria-hidden="true" /> {copy.common.name} — {copy.common.role}
          </Motion.p>

          <Motion.h1 className="page-hero-title display-font" variants={entrance} transition={transition}>
            <span>{headline.before}</span>{" "}
            <span><em>{headline.accent}</em> {headline.after}</span>
          </Motion.h1>

          <Motion.p className="page-hero-lead" variants={entrance} transition={transition}>
            {summary}
          </Motion.p>

          <Motion.div className="page-hero-actions" variants={entrance} transition={transition}>
            <Link to={path("home", "#selected-work")} className="page-hero-action page-hero-action--primary">
              {copy.home.hero.explore}
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" />
              </svg>
            </Link>
            <Link to={path("contact")} className="page-hero-action page-hero-action--secondary">
              {copy.home.hero.start}
            </Link>
          </Motion.div>

          <Motion.div className="page-hero-meta home-hero-meta" variants={entrance} transition={transition}>
            <span>{copy.common.location}</span>
            <div className="home-hero-profiles" role="group" aria-label={copy.home.hero.profiles}>
              <a href={profile.github} target="_blank" rel="noreferrer" dir="ltr">
                GitHub <ExternalIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" dir="ltr">
                LinkedIn <ExternalIcon />
              </a>
            </div>
            <span dir="ltr">Python · Django · React · Flutter · RAG</span>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}
