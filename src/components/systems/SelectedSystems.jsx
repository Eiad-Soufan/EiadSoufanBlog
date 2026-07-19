import {
  animate,
  motion as Motion,
  useInView,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import systems from "../../data/systems";
import useHydrationSafeReducedMotion from "../../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../../i18n/LocaleContext";
import "../../styles/systems.css";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

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

function formatMetric(metric, value, formatter) {
  const rendered = metric.unit === "K" ? Math.round(value) : formatter.format(Math.round(value));
  return `${metric.prefix}${rendered}${metric.unit}${metric.suffix}`;
}

function AnimatedMetric({ metric, delay = 0, formatter }) {
  const reduceMotion = useHydrationSafeReducedMotion();
  const valueRef = useRef(null);
  const inView = useInView(valueRef, { once: true, amount: 0.75 });
  const parsed = useMemo(() => parseMetric(metric.value), [metric.value]);
  const finalText = parsed ? formatMetric(parsed, parsed.value, formatter) : metric.value;

  useEffect(() => {
    const node = valueRef.current;
    if (!node || !parsed) return undefined;

    node.textContent = finalText;
    if (!inView || reduceMotion) return undefined;

    const controls = animate(0, parsed.value, {
      duration: 1.15,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = formatMetric(parsed, latest, formatter);
      },
    });

    return () => controls.stop();
  }, [delay, finalText, formatter, inView, parsed, reduceMotion]);

  return (
    <>
      <span ref={valueRef} aria-hidden="true">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
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

function Stack({ stack, ariaLabel }) {
  return (
    <ul className="systems-stack" aria-label={ariaLabel} dir="ltr">
      {stack.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ links, externalTab }) {
  return (
    <div className="systems-links">
      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={index === 0 ? "systems-link systems-link--primary" : "systems-link"}
          aria-label={`${link.label} — ${externalTab}`}
        >
          <span>{link.label}</span>
          <ExternalArrow />
        </a>
      ))}
    </div>
  );
}

function Metrics({ metrics, formatter }) {
  if (!metrics.length) return null;

  return (
    <dl className="systems-metrics">
      {metrics.map((metric, index) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>
            <AnimatedMetric metric={metric} delay={index * 0.08} formatter={formatter} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectPreview({ project }) {
  if (project.preview.kind === "brand") {
    return (
      <div className="systems-project-preview systems-project-preview--brand" role="img" aria-label={project.preview.alt}>
        <span className="systems-preview-aura" aria-hidden="true" />
        <div className="systems-preview-frame systems-preview-frame--brand" aria-hidden="true">
          <span className="systems-brand-grid" />
          <span className="systems-brand-orbit systems-brand-orbit--one" />
          <span className="systems-brand-orbit systems-brand-orbit--two" />
          <span className="systems-brand-location">DAMASCUS · GLOBAL DELIVERY</span>
          <img src={project.preview.logo} alt="" loading="lazy" decoding="async" draggable={false} />
          <span className="systems-brand-capabilities">ENTERPRISE · DIGITAL PRODUCTS · AI</span>
          <span className="systems-preview-finish" />
        </div>
      </div>
    );
  }

  return (
    <div className="systems-project-preview">
      <span className="systems-preview-aura" aria-hidden="true" />
      <div className="systems-preview-frame">
        <img
          className="systems-preview-image"
          src={project.preview.src}
          alt={project.preview.alt}
          width={project.preview.width}
          height={project.preview.height}
          style={{ objectPosition: project.preview.position }}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          draggable={false}
        />
        <span className="systems-preview-finish" aria-hidden="true" />
      </div>
    </div>
  );
}

function SystemCard({ project, labels, common, formatter }) {
  const reduceMotion = useHydrationSafeReducedMotion();

  return (
    <Motion.article
      className={`systems-card systems-card--uniform systems-card--${project.id}`}
      style={{ "--system-accent": project.accent.glow }}
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
        <span>{project.tier === "flagship" ? labels.flagship : labels.production}</span>
      </div>

      <div className="systems-card-media">
        <ProjectPreview project={project} />
      </div>

      <div className="systems-card-copy">
        <div className="systems-card-title-row">
          <ProjectMark project={project} />
          <h3 dir="auto">{project.title}</h3>
        </div>
        <p className="systems-tagline">{project.tagline}</p>
        <p className="systems-summary">{project.summary}</p>
        <Metrics metrics={project.metrics} formatter={formatter} />

        <div className="systems-role systems-role--uniform">
          <span>{labels.contribution}</span>
          <p>{project.role}</p>
        </div>

        <Stack stack={project.stack} ariaLabel={common.stackAria} />
        <ProjectLinks links={project.links} externalTab={common.externalTab} />
      </div>
    </Motion.article>
  );
}

function SystemsThread() {
  const reduceMotion = useHydrationSafeReducedMotion();

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
  const reduceMotion = useHydrationSafeReducedMotion();
  const { copy, localeMeta, path } = useLocale();
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeMeta.intl, { maximumFractionDigits: 0 }),
    [localeMeta.intl],
  );
  const localizedSystems = useMemo(
    () =>
      systems.map((project) => {
        const localized = copy.systems[project.id];
        return {
          ...project,
          category: localized.category,
          title: localized.title,
          tagline: localized.tagline,
          summary: localized.summary,
          role: localized.role,
          stack: project.stack.map((technology) =>
            technology === "AI / RAG" ? copy.common.aiRag : technology,
          ),
          metrics: project.metrics.map((metric, index) => ({
            ...metric,
            label: localized.metricLabels[index] || metric.label,
          })),
          links: project.links.map((link, index) => ({
            ...link,
            label: localized.linkLabels[index] || link.label,
          })),
          preview: { ...project.preview, alt: localized.alt },
        };
      }),
    [copy.common.aiRag, copy.systems],
  );

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
            <span>{copy.home.systems.kicker}</span>
          </div>
          <div className="systems-intro-grid">
            <h2>
              {copy.home.systems.titleBefore}
              <span> {copy.home.systems.titleAfter}</span>
            </h2>
            <div>
              <p>
                {copy.home.systems.description}
              </p>
              <span className="systems-intro-count">
                {copy.home.systems.count}
              </span>
            </div>
          </div>
        </Motion.header>

        <div className="systems-unified-grid">
          {localizedSystems.map((project) => (
            <SystemCard
              key={project.id}
              project={project}
              labels={copy.home.systems}
              common={copy.common}
              formatter={numberFormatter}
            />
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
          <span className="systems-capability-label">{copy.home.systems.range}</span>
          <ul>
            {copy.home.systems.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
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
            <span className="systems-outro-kicker">{copy.home.systems.outroKicker}</span>
            <h2>{copy.home.systems.outroTitle}</h2>
            <p>{copy.home.systems.outroCopy}</p>
          </div>
          <div className="systems-outro-actions">
            <Link to={path("contact")} className="systems-outro-primary">
              {copy.home.systems.start} <Arrow />
            </Link>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
