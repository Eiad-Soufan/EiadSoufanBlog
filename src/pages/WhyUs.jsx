import {
  motion as Motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import approachHero1080 from "../assets/approach-hero-v2-1080.webp";
import approachHero768 from "../assets/approach-hero-v2-768.webp";
import PageHeroArtwork from "../components/PageHeroArtwork";
import {
  approachPrinciples as baseApproachPrinciples,
  approachStages as baseApproachStages,
  workingRhythm as baseWorkingRhythm,
} from "../data/approach";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/approach.css";

const premiumEase = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function ArrowIcon({ external = false }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {external ? <path d="M7 5h8v8M15 5 6 14" /> : <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" />}
    </svg>
  );
}

function StageIcon({ code }) {
  const paths = {
    FRAME: (
      <>
        <circle cx="8" cy="8" r="3.5" />
        <path d="m10.7 10.7 3.2 3.2M16 5h4v4M5 16v4h4" />
      </>
    ),
    ARCHITECT: (
      <>
        <path d="m4 8 8-5 8 5-8 5-8-5Z" />
        <path d="m4 13 8 5 8-5M4 17l8 5 8-5" />
      </>
    ),
    PROVE: (
      <>
        <path d="M9 3h6M10 3v5l-5.5 9.5A2.3 2.3 0 0 0 6.5 21h11a2.3 2.3 0 0 0 2-3.5L14 8V3" />
        <path d="M7 16h10" />
      </>
    ),
    BUILD: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M8 14h3m2 0h3" />
      </>
    ),
    EVOLVE: (
      <>
        <path d="M20 7v5h-5M4 17v-5h5" />
        <path d="M6.1 8.2A7 7 0 0 1 18.8 9M17.9 15.8A7 7 0 0 1 5.2 15" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[code]}
    </svg>
  );
}

function SectionIntro({ eyebrow, title, copy, center = false }) {
  return (
    <Motion.div
      className={`approach-section-intro${center ? " approach-section-intro--center" : ""}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, ease: premiumEase }}
    >
      <p className="approach-eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="display-font">{title}</h2>
      {copy ? <p className="approach-section-copy">{copy}</p> : null}
    </Motion.div>
  );
}

function ProcessStage({ stage, index, reduceMotion, outcomeLabel, deliverablesLabel }) {
  return (
    <Motion.article
      className={`process-stage process-stage--${stage.accent}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.035, ease: premiumEase }}
    >
      <div className="process-stage-rail">
        <span className="process-stage-icon"><StageIcon code={stage.code} /></span>
        <span className="process-stage-index">{stage.index}</span>
      </div>

      <div className="process-stage-body">
        <span className="process-stage-code" lang="en" dir="ltr">{stage.code}</span>
        <h3 className="display-font">{stage.title}</h3>
        <p>{stage.summary}</p>
        <ul aria-label={`${stage.title} — ${deliverablesLabel}`}>
          {stage.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
      </div>

      <div className="process-stage-output">
        <span>{outcomeLabel}</span>
        <strong>{stage.output}</strong>
      </div>
    </Motion.article>
  );
}

function ProcessSequence({ reduceMotion, items, labels }) {
  const processRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 76%", "end 68%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div className="process-sequence" ref={processRef}>
      <span className="process-line" aria-hidden="true" />
      <Motion.span
        className="process-line-progress"
        style={{ scaleY: reduceMotion ? 1 : progress }}
        aria-hidden="true"
      />
      {items.map((stage, index) => (
        <ProcessStage
          key={stage.code}
          stage={stage}
          index={index}
          reduceMotion={reduceMotion}
          outcomeLabel={labels.outcome}
          deliverablesLabel={labels.deliverables}
        />
      ))}
    </div>
  );
}

function PrincipleCard({ principle, index, reduceMotion }) {
  return (
    <Motion.article
      className={`principle-card principle-card--${principle.accent}${principle.featured ? " principle-card--featured" : ""}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: 0.62, delay: reduceMotion ? 0 : index * 0.05, ease: premiumEase }}
    >
      <div className="principle-card-top">
        <span>{principle.index}</span>
        <i aria-hidden="true" />
      </div>
      <h3 className="display-font">{principle.title}</h3>
      <p>{principle.summary}</p>
      {principle.featured ? (
        <div
          className="principle-signal"
          data-label={principle.signalLabel}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : null}
    </Motion.article>
  );
}

export default function WhyUs() {
  const reduceMotion = useHydrationSafeReducedMotion();
  const { copy, path } = useLocale();
  const content = copy.approach;
  const approachStages = useMemo(
    () => baseApproachStages.map((item, index) => ({ ...item, ...content.stages[index] })),
    [content.stages],
  );
  const approachPrinciples = useMemo(
    () => baseApproachPrinciples.map((item, index) => ({ ...item, ...content.principles[index] })),
    [content.principles],
  );
  const workingRhythm = useMemo(
    () => baseWorkingRhythm.map((item, index) => ({ ...item, ...content.workingRhythm[index] })),
    [content.workingRhythm],
  );

  return (
    <div className="approach-page">
      <section className="approach-hero">
        <div className="approach-hero-grid" aria-hidden="true" />
        <div className="approach-hero-glow approach-hero-glow--one" aria-hidden="true" />
        <div className="approach-hero-glow approach-hero-glow--two" aria-hidden="true" />

        <div className="site-container page-hero-frame approach-hero-layout">
          <Motion.div
            className="approach-hero-copy"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: reduceMotion ? 0 : 0.07 }}
          >
            <Motion.p className="approach-eyebrow" variants={reveal} transition={{ duration: 0.5, ease: premiumEase }}>
              <span aria-hidden="true" /> {content.hero.eyebrow}
            </Motion.p>

            <Motion.h1 className="hero-title-scale page-hero-title display-font" variants={reveal} transition={{ duration: 0.68, ease: premiumEase }}>
              <span>{content.hero.titleBefore}</span>
              <em>{content.hero.titleAccent}</em>
            </Motion.h1>

            <Motion.p className="approach-hero-lead" variants={reveal} transition={{ duration: 0.62, ease: premiumEase }}>
              {content.hero.lead}
            </Motion.p>

            <Motion.div className="approach-actions" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              <Link to={path("contact")} className="approach-action approach-action--primary">
                {content.hero.discuss} <ArrowIcon />
              </Link>
              <Link to={path("home", "#selected-work")} className="approach-action approach-action--secondary">
                {content.hero.outcomes}
              </Link>
            </Motion.div>

            <Motion.dl className="approach-hero-signals" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              {content.hero.signals.map((signal, index) => (
                <div key={signal}><dt>0{index + 1}</dt><dd>{signal}</dd></div>
              ))}
            </Motion.dl>
          </Motion.div>

          <PageHeroArtwork
            image={approachHero1080}
            image768={approachHero768}
            imageWidth={1080}
            status={content.blueprint.coherent}
            labels={[
              content.blueprint.nodes[0],
              content.blueprint.nodes[1],
              content.blueprint.nodes[3],
            ]}
            variant="approach"
          />
        </div>
      </section>

      <section className="approach-process">
        <div className="site-container approach-process-layout">
          <div className="approach-process-sticky">
            <SectionIntro
              eyebrow={content.processIntro.eyebrow}
              title={content.processIntro.title}
              copy={content.processIntro.copy}
            />
            <Motion.div
              className="process-loop-note"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.62, ease: premiumEase }}
            >
              <span>{content.processIntro.loop}</span>
              <svg viewBox="0 0 64 24" aria-hidden="true">
                <path d="M6 12h48m-8-7 8 7-8 7" />
              </svg>
              <strong>{content.processIntro.sequence}</strong>
            </Motion.div>
          </div>

          <ProcessSequence
            reduceMotion={reduceMotion}
            items={approachStages}
            labels={content.processIntro}
          />
        </div>
      </section>

      <section className="approach-principles">
        <div className="site-container">
          <SectionIntro
            eyebrow={content.principlesIntro.eyebrow}
            title={content.principlesIntro.title}
            copy={content.principlesIntro.copy}
            center
          />

          <div className="principles-grid">
            {approachPrinciples.map((principle, index) => (
              <PrincipleCard
                key={principle.index}
                principle={principle}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="approach-rhythm">
        <div className="site-container">
          <Motion.div
            className="rhythm-panel"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.68, ease: premiumEase }}
          >
            <div className="rhythm-heading">
              <p className="approach-eyebrow"><span aria-hidden="true" /> {content.rhythm.eyebrow}</p>
              <h2 className="display-font">{content.rhythm.title}</h2>
              <p>{content.rhythm.copy}</p>
            </div>

            <ol className="rhythm-steps">
              {workingRhythm.map((item, index) => (
                <li key={item.phase}>
                  <span className="rhythm-number">0{index + 1}</span>
                  <div>
                    <small>{item.cadence}</small>
                    <h3 className="display-font">{item.phase}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rhythm-contract">
              <span>{content.rhythm.always}</span>
              <ul>
                {content.rhythm.promises.map((promise) => <li key={promise}><i /> {promise}</li>)}
              </ul>
            </div>
          </Motion.div>
        </div>
      </section>

      <section className="approach-outro">
        <div className="site-container">
          <Motion.div
            className="approach-outro-card"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div>
              <p className="approach-eyebrow"><span aria-hidden="true" /> {content.outro.eyebrow}</p>
              <h2 className="display-font">{content.outro.title}</h2>
              <p>{content.outro.copy}</p>
            </div>
            <div className="approach-outro-actions">
              <Link to={path("contact")} className="approach-action approach-action--primary">
                {content.outro.start} <ArrowIcon />
              </Link>
              <Link to={path("about")} className="approach-action approach-action--secondary">
                {content.outro.about}
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
}
