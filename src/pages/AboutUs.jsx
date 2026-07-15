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
  capabilityPillars,
  career,
  education,
  publications,
  recognitions,
} from "../data/about";
import { profile } from "../data/profile";
import "../styles/about.css";

const premiumEase = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function ArrowIcon({ external = false }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {external ? (
        <path d="M7 5h8v8M15 5 6 14" />
      ) : (
        <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" />
      )}
    </svg>
  );
}

function CapabilityIcon({ index }) {
  const icons = {
    "01": (
      <>
        <path d="M5 7.5 12 3l7 4.5-7 4.5-7-4.5Z" />
        <path d="m5 12 7 4.5 7-4.5M5 16.5 12 21l7-4.5" />
      </>
    ),
    "02": (
      <>
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="4.5" r="1.5" />
        <circle cx="19" cy="15.5" r="1.5" />
        <circle cx="5" cy="15.5" r="1.5" />
        <path d="m12 6 0 3m2.8 4.5 2.8 1.4M9.2 13.5l-2.8 1.4" />
      </>
    ),
    "03": (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3 9h18M7 3v4m10-4v4M8 14h3m2 0h3" />
      </>
    ),
    "04": (
      <>
        <circle cx="12" cy="7.5" r="3" />
        <path d="M5.5 21v-2.5A4.5 4.5 0 0 1 10 14h4a4.5 4.5 0 0 1 4.5 4.5V21" />
        <path d="M4.5 9.5a2.5 2.5 0 1 0 0 5M19.5 9.5a2.5 2.5 0 1 1 0 5" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[index]}
    </svg>
  );
}

function SectionIntro({ eyebrow, title, copy, align = "left" }) {
  return (
    <Motion.div
      className={`about-section-intro about-section-intro--${align}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, ease: premiumEase }}
    >
      <p className="about-eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="display-font">{title}</h2>
      {copy ? <p className="about-section-copy">{copy}</p> : null}
    </Motion.div>
  );
}

function CareerConstellation({ reduceMotion }) {
  return (
    <Motion.div
      className="career-constellation"
      data-motion={reduceMotion ? "paused" : "running"}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: premiumEase }}
      aria-label="Eiad's interconnected engineering disciplines"
    >
      <div className="career-constellation-grid" aria-hidden="true" />
      <div className="career-orbit career-orbit--outer" aria-hidden="true" />
      <div className="career-orbit career-orbit--inner" aria-hidden="true" />
      <div className="career-constellation-glow" aria-hidden="true" />

      <div className="career-core">
        <BrandMark className="h-14 w-14 sm:h-16 sm:w-16" />
        <span className="career-core-role">Systems engineer</span>
        <strong className="career-core-name display-font">Eiad Soufan</strong>
      </div>

      <span className="career-node career-node--backend">
        <i aria-hidden="true" /> Backend
      </span>
      <span className="career-node career-node--ai">
        <i aria-hidden="true" /> AI / RAG
      </span>
      <span className="career-node career-node--product">
        <i aria-hidden="true" /> Product
      </span>
      <span className="career-node career-node--delivery">
        <i aria-hidden="true" /> Delivery
      </span>

      <div className="career-signal" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="career-constellation-caption">
        <span>Architecture</span>
        <span>Intelligence</span>
        <span>Production</span>
      </div>
    </Motion.div>
  );
}

function CapabilityCard({ pillar, index, reduceMotion }) {
  return (
    <Motion.article
      className={`capability-card capability-card--${pillar.accent}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.62, delay: reduceMotion ? 0 : index * 0.055, ease: premiumEase }}
    >
      <div className="capability-card-topline">
        <span className="capability-icon">
          <CapabilityIcon index={pillar.index} />
        </span>
        <span className="capability-index">{pillar.index}</span>
      </div>
      <h3 className="display-font">{pillar.title}</h3>
      <p>{pillar.summary}</p>
      <ul aria-label={`${pillar.title} technologies`}>
        {pillar.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </Motion.article>
  );
}

function CareerTimeline({ reduceMotion }) {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 76%", "end 64%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="career-timeline" ref={timelineRef}>
      <span className="career-timeline-line" aria-hidden="true" />
      <Motion.span
        className="career-timeline-progress"
        style={{ scaleY: reduceMotion ? 1 : lineProgress }}
        aria-hidden="true"
      />

      {career.map((position, index) => (
        <Motion.article
          className="career-entry"
          key={`${position.company}-${position.period}`}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.04, ease: premiumEase }}
        >
          <div className="career-entry-marker" aria-hidden="true">
            <span />
          </div>

          <div className="career-entry-meta">
            <span className="career-period">{position.period}</span>
            <span>{position.location}</span>
          </div>

          <div className="career-entry-card">
            <div className="career-entry-heading">
              <div>
                <p>{position.role}</p>
                <h3 className="display-font">{position.company}</h3>
              </div>
              {position.current ? (
                <span className="career-current">
                  <i aria-hidden="true" /> Current
                </span>
              ) : null}
            </div>
            <p className="career-entry-summary">{position.summary}</p>
            <ul>
              {position.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </Motion.article>
      ))}
    </div>
  );
}

function EducationCard({ item, index, reduceMotion }) {
  return (
    <Motion.article
      className="education-card"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.05, ease: premiumEase }}
    >
      <div className="education-card-year">{item.period}</div>
      <div>
        {item.status ? <span className="education-status">{item.status}</span> : null}
        <h3 className="display-font">{item.degree}</h3>
        <p className="education-institution">{item.institution}</p>
        {item.detail ? <p className="education-detail">{item.detail}</p> : null}
        {item.research ? (
          <p className="education-research">
            <span>Research</span>
            {item.research}
          </p>
        ) : null}
      </div>
    </Motion.article>
  );
}

export default function AboutUs() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const pageTitle = "About Eiad Soufan — Lead Software Engineer";
    const description =
      "Lead Software Engineer building dependable backend systems, applied AI products, and production platforms across web and mobile.";
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
      upsertMeta("og:type", "profile", "property"),
    ];

    const schema = document.createElement("script");
    schema.id = "about-person-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Eiad Abdulhadi Soufan",
      jobTitle: "Lead Software Engineer",
      homeLocation: "Kuala Lumpur, Malaysia",
      url: `${window.location.origin}/about-us`,
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: [
        "Python",
        "Django",
        "React",
        "Flutter",
        "Software Architecture",
        "Retrieval-Augmented Generation",
      ],
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      cleanups.forEach((cleanup) => cleanup());
      schema.remove();
    };
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-noise" aria-hidden="true" />
        <div className="about-hero-aurora about-hero-aurora--one" aria-hidden="true" />
        <div className="about-hero-aurora about-hero-aurora--two" aria-hidden="true" />

        <div className="site-container about-hero-grid">
          <Motion.div
            className="about-hero-copy"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: reduceMotion ? 0 : 0.07 }}
          >
            <Motion.p
              className="about-eyebrow"
              variants={reveal}
              transition={{ duration: 0.5, ease: premiumEase }}
            >
              <span aria-hidden="true" /> About the engineer
            </Motion.p>

            <Motion.h1
              className="hero-title-scale display-font"
              variants={reveal}
              transition={{ duration: 0.65, ease: premiumEase }}
            >
              I turn complex operations into <em>systems people can trust.</em>
            </Motion.h1>

            <Motion.p
              className="about-hero-lead"
              variants={reveal}
              transition={{ duration: 0.62, ease: premiumEase }}
            >
              I’m <strong>Eiad Soufan</strong>, a Lead Software Engineer based in Kuala
              Lumpur. I connect backend architecture, applied AI, product interfaces, and
              production delivery into one coherent engineering process.
            </Motion.p>

            <Motion.div
              className="about-hero-actions"
              variants={reveal}
              transition={{ duration: 0.58, ease: premiumEase }}
            >
              <Link to="/#selected-work" className="about-action about-action--primary">
                Explore selected work <ArrowIcon />
              </Link>
              <Link to="/contact" className="about-action about-action--secondary">
                Start a conversation
              </Link>
            </Motion.div>

            <Motion.dl
              className="about-hero-facts"
              variants={reveal}
              transition={{ duration: 0.6, ease: premiumEase }}
            >
              <div>
                <dt>Current focus</dt>
                <dd>Lead Software Engineering</dd>
              </div>
              <div>
                <dt>Working across</dt>
                <dd>Backend · AI · Web · Mobile</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>Arabic · English C1</dd>
              </div>
            </Motion.dl>
          </Motion.div>

          <CareerConstellation reduceMotion={reduceMotion} />
        </div>
      </section>

      <section className="about-capabilities">
        <div className="site-container">
          <div className="about-capability-layout">
            <div className="about-capability-sticky">
              <SectionIntro
                eyebrow="Operating range"
                title="Depth where it matters. Range where the product needs it."
                copy="The strongest systems are not assembled from isolated specialties. They are designed as one continuous experience—from data and intelligence to interface and deployment."
              />

              <Motion.div
                className="about-principle"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, ease: premiumEase }}
              >
                <span>Engineering principle</span>
                <blockquote>
                  “Make complexity invisible to the people who depend on the product.”
                </blockquote>
              </Motion.div>
            </div>

            <div className="capability-grid">
              {capabilityPillars.map((pillar, index) => (
                <CapabilityCard
                  key={pillar.index}
                  pillar={pillar}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-career">
        <div className="site-container">
          <SectionIntro
            eyebrow="Career trajectory"
            title="A path shaped by ownership—not just output."
            copy="Each chapter expanded the surface I could own: from institutional systems to multi-branch operations, then full-cycle product leadership."
            align="center"
          />
          <CareerTimeline reduceMotion={reduceMotion} />
        </div>
      </section>

      <section className="about-academia">
        <div className="site-container">
          <div className="about-academia-heading">
            <SectionIntro
              eyebrow="Academic foundation"
              title="Research depth with production instincts."
              copy="Software engineering gave me the structure; research trained me to challenge assumptions, measure outcomes, and keep learning."
            />

            <Motion.div
              className="about-academia-signal"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.65, ease: premiumEase }}
            >
              <span>2</span>
              <p>completed engineering degrees</p>
              <i aria-hidden="true" />
              <span>1</span>
              <p>IT master’s in progress</p>
            </Motion.div>
          </div>

          <div className="education-list">
            {education.map((item, index) => (
              <EducationCard
                key={`${item.degree}-${item.period}`}
                item={item}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          <div className="recognition-grid">
            {recognitions.map((item, index) => (
              <Motion.article
                key={item.label}
                className="recognition-card"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : index * 0.05,
                  ease: premiumEase,
                }}
              >
                <strong className="display-font">{item.value}</strong>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </Motion.article>
            ))}
          </div>

          <Motion.div
            className="publications-panel"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.68, ease: premiumEase }}
          >
            <div className="publications-heading">
              <p className="about-eyebrow">
                <span aria-hidden="true" /> Selected research
              </p>
              <h2 className="display-font">Published thinking.</h2>
              <p>
                Three peer-reviewed studies applying evidence and analysis to real human
                questions.
              </p>
            </div>

            <ol className="publications-list">
              {publications.map((publication, index) => (
                <li key={publication.href}>
                  <a href={publication.href} target="_blank" rel="noreferrer">
                    <span className="publication-number">0{index + 1}</span>
                    <span className="publication-copy">
                      <small>
                        {publication.year} · {publication.journal}
                      </small>
                      <strong>{publication.title}</strong>
                    </span>
                    <span className="publication-arrow">
                      <ArrowIcon external />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </Motion.div>
        </div>
      </section>

      <section className="about-outro">
        <div className="site-container">
          <Motion.div
            className="about-outro-card"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div>
              <p className="about-eyebrow">
                <span aria-hidden="true" /> The next system
              </p>
              <h2 className="display-font">Building something genuinely difficult?</h2>
              <p>
                I’m interested in products where thoughtful architecture and reliable
                delivery create a meaningful advantage.
              </p>
            </div>
            <div className="about-outro-actions">
              <Link to="/contact" className="about-action about-action--primary">
                Let’s talk <ArrowIcon />
              </Link>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="about-action about-action--secondary"
              >
                LinkedIn <ArrowIcon external />
              </a>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
}
