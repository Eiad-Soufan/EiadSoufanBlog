import {
  animate,
  motion as Motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import systems from "../../data/systems";
import {
  AboZeedVisual,
  ArabicaVisual,
  BerkatVisual,
  DatesVisual,
  LawnexVisual,
  YallahVisual,
} from "./SystemVisuals";
import "../../styles/systems.css";

const visualBySystem = {
  lawnex: LawnexVisual,
  "berkat-madinah": BerkatVisual,
  "yallah-baggage": YallahVisual,
  "arabica-restaurant": ArabicaVisual,
  "mohammad-abo-zeed": AboZeedVisual,
  "dates-madinah": DatesVisual,
};

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function parseMetric(value) {
  const match = value.match(/^(~?)([\d,]+)(K?)(\+?)$/);
  if (!match) return null;

  return {
    prefix: match[1],
    value: Number(match[2].replaceAll(",", "")),
    unit: match[3],
    suffix: match[4],
  };
}

function formatMetric(metric, value) {
  const rendered = metric.unit === "K" ? Math.round(value) : numberFormatter.format(Math.round(value));
  return `${metric.prefix}${rendered}${metric.unit}${metric.suffix}`;
}

function AnimatedMetric({ metric, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const valueRef = useRef(null);
  const inView = useInView(valueRef, { once: true, amount: 0.75 });
  const parsed = useMemo(() => parseMetric(metric.value), [metric.value]);

  useEffect(() => {
    const node = valueRef.current;
    if (!node || !parsed) return undefined;

    node.textContent = metric.value;
    if (!inView || reduceMotion) return undefined;

    const controls = animate(0, parsed.value, {
      duration: 1.15,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = formatMetric(parsed, latest);
      },
    });

    return () => controls.stop();
  }, [delay, inView, metric.value, parsed, reduceMotion]);

  return (
    <>
      <span ref={valueRef} aria-hidden="true">
        {metric.value}
      </span>
      <span className="sr-only">{metric.value}</span>
    </>
  );
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M6 4h8v8M14 4 4.5 13.5" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
    </svg>
  );
}

function ProjectMark({ project }) {
  if (project.logo) {
    return (
      <span className="systems-mark">
        <img src={project.logo} alt="" loading="lazy" decoding="async" />
      </span>
    );
  }

  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <span
      className="systems-mark systems-mark--type"
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function Stack({ stack }) {
  return (
    <ul className="systems-stack" aria-label="Technology stack">
      {stack.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ links }) {
  return (
    <div className="systems-links">
      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={index === 0 ? "systems-link systems-link--primary" : "systems-link"}
          aria-label={`${link.label} — opens in a new tab`}
        >
          <span>{link.label}</span>
          <ExternalArrow />
        </a>
      ))}
    </div>
  );
}

function Metrics({ metrics }) {
  if (!metrics.length) return null;

  return (
    <dl className="systems-metrics">
      {metrics.map((metric, index) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>
            <AnimatedMetric metric={metric} delay={index * 0.08} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function SystemCard({ project }) {
  const Visual = visualBySystem[project.id];
  const reduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const visualInView = useInView(cardRef, { amount: 0.08, margin: "120px 0px" });

  return (
    <Motion.article
      ref={cardRef}
      className={`systems-card systems-card--uniform systems-card--${project.id}`}
      style={{ "--system-accent": project.accent.glow }}
      data-visual-active={visualInView ? "true" : "false"}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={reveal}
      transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="systems-card-glow" aria-hidden="true" />
      <div className="systems-card-meta">
        <span>{project.index}</span>
        <span>{project.category}</span>
        <span>{project.tier === "flagship" ? "Flagship" : "Production system"}</span>
      </div>

      <div className="systems-card-media">
        <Visual logo={project.logo} />
      </div>

      <div className="systems-card-copy">
        <div className="systems-card-title-row">
          <ProjectMark project={project} />
          <h3>{project.title}</h3>
        </div>
        <p className="systems-tagline">{project.tagline}</p>
        <p className="systems-summary">{project.summary}</p>
        <Metrics metrics={project.metrics} />

        <div className="systems-role systems-role--uniform">
          <span>My contribution</span>
          <p>{project.role}</p>
        </div>

        <Stack stack={project.stack} />
        <ProjectLinks links={project.links} />
      </div>
    </Motion.article>
  );
}

function SystemsThread() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className="systems-thread"
      viewBox="0 0 1440 2400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="systems-thread-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(var(--color-cyan))" stopOpacity="0" />
          <stop offset="0.22" stopColor="rgb(var(--color-cyan))" stopOpacity="0.34" />
          <stop offset="0.62" stopColor="rgb(var(--color-violet))" stopOpacity="0.22" />
          <stop offset="1" stopColor="rgb(var(--color-violet))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Motion.path
        d="M1120 0C960 170 1180 280 910 470S520 720 760 920s430 260 120 500-450 350-120 590 160 300 0 390"
        fill="none"
        stroke="url(#systems-thread-gradient)"
        strokeWidth="1.2"
        initial={reduceMotion ? { pathLength: 1, opacity: 0.75 } : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.75 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <circle cx="910" cy="470" r="4" fill="rgb(var(--color-cyan))" opacity="0.44" />
      <circle cx="760" cy="920" r="4" fill="rgb(var(--color-violet))" opacity="0.38" />
      <circle cx="880" cy="1420" r="4" fill="rgb(var(--color-cyan))" opacity="0.32" />
    </svg>
  );
}

export default function SelectedSystems() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="selected-work" className="systems-section scroll-mt-20">
      <div className="systems-atmosphere" aria-hidden="true">
        <span className="systems-orb systems-orb--one" />
        <span className="systems-orb systems-orb--two" />
        <span className="systems-grid" />
      </div>
      <SystemsThread />

      <div className="site-container systems-container">
        <Motion.header
          className="systems-intro"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="systems-intro-kicker">
            <span>02</span>
            <span>Selected systems</span>
          </div>
          <div className="systems-intro-grid">
            <h2>
              Built for complexity.
              <span> Proven in production.</span>
            </h2>
            <div>
              <p>
                Selected products and platforms delivered across legal intelligence,
                enterprise operations, logistics, and digital commerce.
              </p>
              <span className="systems-intro-count">
                06 production systems · Across web &amp; mobile
              </span>
            </div>
          </div>
        </Motion.header>

        <div className="systems-unified-grid">
          {systems.map((project) => (
            <SystemCard key={project.id} project={project} />
          ))}
        </div>

        <Motion.div
          className="systems-capability-rail"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="systems-capability-label">Engineering range</span>
          <ul>
            <li>Architecture</li>
            <li>Backend systems</li>
            <li>Product interfaces</li>
            <li>Applied AI</li>
            <li>Production delivery</li>
          </ul>
        </Motion.div>

        <Motion.div
          className="systems-outro"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="systems-outro-kicker">Have a complex system in mind?</span>
            <h2>Let&apos;s make it feel simple.</h2>
            <p>
              From architecture and APIs to polished interfaces and production delivery.
            </p>
          </div>
          <div className="systems-outro-actions">
            <Link to="/contact" className="systems-outro-primary">
              Start a conversation <Arrow />
            </Link>
            <a
              href="https://github.com/Eiad-Soufan"
              target="_blank"
              rel="noreferrer"
              className="systems-outro-secondary"
            >
              Explore GitHub <ExternalArrow />
            </a>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
