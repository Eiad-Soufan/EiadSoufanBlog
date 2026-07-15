import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BrandMark from "../components/BrandMark";
import {
  approachPrinciples,
  approachStages,
  workingRhythm,
} from "../data/approach";
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

function SystemBlueprint({ reduceMotion }) {
  return (
    <Motion.div
      className="system-blueprint"
      data-motion={reduceMotion ? "paused" : "running"}
      aria-label="A connected engineering process from problem framing to production"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.95, rotate: 1.5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.14, ease: premiumEase }}
    >
      <div className="blueprint-grid" aria-hidden="true" />

      <div className="blueprint-toolbar">
        <span><i aria-hidden="true" /> System map</span>
        <small>LIVE PROCESS · 05 STAGES</small>
      </div>

      <svg className="blueprint-connections" viewBox="0 0 520 430" aria-hidden="true">
        <defs>
          <linearGradient id="approach-flow" x1="20" y1="20" x2="500" y2="410" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(91 224 255)" />
            <stop offset="0.52" stopColor="rgb(105 137 255)" />
            <stop offset="1" stopColor="rgb(165 132 255)" />
          </linearGradient>
        </defs>
        <path className="blueprint-path blueprint-path--base" d="M92 104C169 105 173 198 260 213s90-105 171-94" />
        <path className="blueprint-path blueprint-path--base" d="M260 213c-69 30-57 112-145 120M260 213c79 26 76 111 159 123" />
        <path className="blueprint-path blueprint-path--energy" d="M92 104C169 105 173 198 260 213s90-105 171-94" />
        <path className="blueprint-path blueprint-path--energy blueprint-path--energy-two" d="M260 213c-69 30-57 112-145 120M260 213c79 26 76 111 159 123" />
      </svg>

      <div className="blueprint-core">
        <BrandMark className="h-12 w-12" />
        <span className="blueprint-core-label">COHERENT</span>
        <strong className="blueprint-core-name display-font">System</strong>
      </div>

      <span className="blueprint-node blueprint-node--problem"><i />Problem</span>
      <span className="blueprint-node blueprint-node--architecture"><i />Architecture</span>
      <span className="blueprint-node blueprint-node--product"><i />Product</span>
      <span className="blueprint-node blueprint-node--production"><i />Production</span>

      <div className="blueprint-readout blueprint-readout--risk">
        <span>Risk</span>
        <strong>Visible early</strong>
        <i><b /></i>
      </div>
      <div className="blueprint-readout blueprint-readout--feedback">
        <span>Feedback</span>
        <strong>Continuous</strong>
        <i><b /></i>
      </div>

      <div className="blueprint-status">
        <span><i /> Decisions visible</span>
        <span><i /> Release ready</span>
        <span><i /> Learning active</span>
      </div>
    </Motion.div>
  );
}

function ProcessStage({ stage, index, reduceMotion }) {
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
        <span className="process-stage-code">{stage.code}</span>
        <h3 className="display-font">{stage.title}</h3>
        <p>{stage.summary}</p>
        <ul aria-label={`${stage.code.toLowerCase()} deliverables`}>
          {stage.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
      </div>

      <div className="process-stage-output">
        <span>Outcome</span>
        <strong>{stage.output}</strong>
      </div>
    </Motion.article>
  );
}

function ProcessSequence({ reduceMotion }) {
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
      {approachStages.map((stage, index) => (
        <ProcessStage
          key={stage.code}
          stage={stage}
          index={index}
          reduceMotion={reduceMotion}
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
        <div className="principle-signal" aria-hidden="true">
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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const pageTitle = "Engineering Approach — Eiad Soufan";
    const description =
      "How Eiad Soufan takes complex software from problem framing and architecture through delivery, production, and continuous improvement.";
    const previousTitle = document.title;
    document.title = pageTitle;

    const upsertMeta = (key, content, attribute = "name") => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      const previousContent = element.getAttribute("content");
      element.setAttribute("content", content);
      return () => {
        if (previousContent) element.setAttribute("content", previousContent);
        else element.remove();
      };
    };

    const cleanups = [
      upsertMeta("description", description),
      upsertMeta("og:title", pageTitle, "property"),
      upsertMeta("og:description", description, "property"),
      upsertMeta("og:type", "website", "property"),
    ];

    return () => {
      document.title = previousTitle;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="approach-page">
      <section className="approach-hero">
        <div className="approach-hero-grid" aria-hidden="true" />
        <div className="approach-hero-glow approach-hero-glow--one" aria-hidden="true" />
        <div className="approach-hero-glow approach-hero-glow--two" aria-hidden="true" />

        <div className="site-container approach-hero-layout">
          <Motion.div
            className="approach-hero-copy"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: reduceMotion ? 0 : 0.07 }}
          >
            <Motion.p className="approach-eyebrow" variants={reveal} transition={{ duration: 0.5, ease: premiumEase }}>
              <span aria-hidden="true" /> Engineering approach
            </Motion.p>

            <Motion.h1 className="hero-title-scale display-font" variants={reveal} transition={{ duration: 0.68, ease: premiumEase }}>
              From uncertain idea to <em>reliable system.</em>
            </Motion.h1>

            <Motion.p className="approach-hero-lead" variants={reveal} transition={{ duration: 0.62, ease: premiumEase }}>
              I reduce uncertainty early, connect architecture to experience, and ship in
              increments that already resemble production. The goal is not merely to build
              more—it is to make every decision compound.
            </Motion.p>

            <Motion.div className="approach-actions" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              <Link to="/contact" className="approach-action approach-action--primary">
                Discuss a system <ArrowIcon />
              </Link>
              <Link to="/#selected-work" className="approach-action approach-action--secondary">
                See the outcomes
              </Link>
            </Motion.div>

            <Motion.dl className="approach-hero-signals" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              <div><dt>01</dt><dd>Risk front-loaded</dd></div>
              <div><dt>02</dt><dd>Decisions visible</dd></div>
              <div><dt>03</dt><dd>Production included</dd></div>
            </Motion.dl>
          </Motion.div>

          <SystemBlueprint reduceMotion={reduceMotion} />
        </div>
      </section>

      <section className="approach-process">
        <div className="site-container approach-process-layout">
          <div className="approach-process-sticky">
            <SectionIntro
              eyebrow="The delivery sequence"
              title="Five moves. One continuous system."
              copy="The phases are distinct enough to create clarity, but connected enough to avoid hand-off gaps. Learning flows forward—and production insight flows back."
            />
            <Motion.div
              className="process-loop-note"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.62, ease: premiumEase }}
            >
              <span>Continuous loop</span>
              <svg viewBox="0 0 64 24" aria-hidden="true">
                <path d="M6 12h48m-8-7 8 7-8 7" />
              </svg>
              <strong>Frame · Architect · Prove · Build · Evolve</strong>
            </Motion.div>
          </div>

          <ProcessSequence reduceMotion={reduceMotion} />
        </div>
      </section>

      <section className="approach-principles">
        <div className="site-container">
          <SectionIntro
            eyebrow="Decision principles"
            title="The standards behind the work."
            copy="Technology changes quickly. These decisions stay useful because they protect clarity, reliability, and long-term product value."
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
              <p className="approach-eyebrow"><span aria-hidden="true" /> Working rhythm</p>
              <h2 className="display-font">No black box between brief and release.</h2>
              <p>
                Collaboration stays concrete: what we know, what we chose, what is working,
                and what the next release will prove.
              </p>
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
              <span>You always know</span>
              <ul>
                <li><i /> What is being solved now</li>
                <li><i /> Why the current decision exists</li>
                <li><i /> What “ready” means</li>
                <li><i /> What production taught us</li>
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
              <p className="approach-eyebrow"><span aria-hidden="true" /> Start with the real problem</p>
              <h2 className="display-font">Bring the complexity. We’ll find the shape.</h2>
              <p>A useful first conversation needs no polished specification—only an honest problem worth solving.</p>
            </div>
            <div className="approach-outro-actions">
              <Link to="/contact" className="approach-action approach-action--primary">
                Start a conversation <ArrowIcon />
              </Link>
              <Link to="/about-us" className="approach-action approach-action--secondary">
                About Eiad
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
}
