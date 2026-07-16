import {
  motion as Motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import BrandMark from "../components/BrandMark";
import {
  capabilityPillars as baseCapabilityPillars,
  career as baseCareer,
  education as baseEducation,
  publications as basePublications,
  recognitions as baseRecognitions,
} from "../data/about";
import { profile } from "../data/profile";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
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

function CareerConstellation({ reduceMotion, content }) {
  return (
    <Motion.div
      className="career-constellation"
      data-motion={reduceMotion ? "paused" : "running"}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: premiumEase }}
      aria-label={content.aria}
    >
      <div className="career-constellation-grid" aria-hidden="true" />
      <div className="career-orbit career-orbit--outer" aria-hidden="true" />
      <div className="career-orbit career-orbit--inner" aria-hidden="true" />
      <div className="career-constellation-glow" aria-hidden="true" />

      <div className="career-core">
        <BrandMark className="h-12 w-[4.5rem] sm:h-14 sm:w-[5.25rem]" />
        <span className="career-core-role">{content.role}</span>
        <strong className="career-core-name display-font">Eiad Soufan</strong>
      </div>

      <span className="career-node career-node--backend">
        <i aria-hidden="true" /> {content.nodes[0]}
      </span>
      <span className="career-node career-node--ai">
        <i aria-hidden="true" /> {content.nodes[1]}
      </span>
      <span className="career-node career-node--product">
        <i aria-hidden="true" /> {content.nodes[2]}
      </span>
      <span className="career-node career-node--delivery">
        <i aria-hidden="true" /> {content.nodes[3]}
      </span>

      <div className="career-signal" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="career-constellation-caption">
        {content.captions.map((caption) => <span key={caption}>{caption}</span>)}
      </div>
    </Motion.div>
  );
}

function CapabilityCard({ pillar, index, reduceMotion, skillsAria }) {
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
      <ul aria-label={`${pillar.title} — ${skillsAria}`}>
        {pillar.skills.map((skill) => (
          <li key={skill} dir="auto">{skill}</li>
        ))}
      </ul>
    </Motion.article>
  );
}

function CareerTimeline({ reduceMotion, items, currentLabel }) {
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

      {items.map((position, index) => (
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
                  <i aria-hidden="true" /> {currentLabel}
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

function EducationCard({ item, index, reduceMotion, researchLabel }) {
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
            <span>{researchLabel}</span>
            {item.research}
          </p>
        ) : null}
      </div>
    </Motion.article>
  );
}

export default function AboutUs() {
  const reduceMotion = useHydrationSafeReducedMotion();
  const { copy, locale, path } = useLocale();
  const content = copy.about;
  const capabilityPillars = useMemo(
    () => baseCapabilityPillars.map((item, index) => ({ ...item, ...content.capabilities[index] })),
    [content.capabilities],
  );
  const career = useMemo(
    () => baseCareer.map((item, index) => ({ ...item, ...content.career[index] })),
    [content.career],
  );
  const education = useMemo(
    () => baseEducation.map((item, index) => ({ ...item, ...content.education[index] })),
    [content.education],
  );
  const recognitions = useMemo(
    () => baseRecognitions.map((item, index) => ({ ...item, ...content.recognitions[index] })),
    [content.recognitions],
  );
  const publications = useMemo(
    () => basePublications.map((item, index) => ({
      ...item,
      title: content.publications[index],
      titleLanguage: content.publications[index] === item.title ? "en" : undefined,
    })),
    [content.publications],
  );

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
              <span aria-hidden="true" /> {content.hero.eyebrow}
            </Motion.p>

            <Motion.h1
              className="hero-title-scale display-font"
              variants={reveal}
              transition={{ duration: 0.65, ease: premiumEase }}
            >
              {content.hero.titleBefore} <em>{content.hero.titleAccent}</em>
            </Motion.h1>

            <Motion.p
              className="about-hero-lead"
              variants={reveal}
              transition={{ duration: 0.62, ease: premiumEase }}
            >
              {content.hero.leadBefore} <strong>{copy.common.name}</strong>
              {locale === "ar" ? "،" : ","}{" "}
              {content.hero.leadAfter}
            </Motion.p>

            <Motion.div
              className="about-hero-actions"
              variants={reveal}
              transition={{ duration: 0.58, ease: premiumEase }}
            >
              <Link to={path("home", "#selected-work")} className="about-action about-action--primary">
                {content.hero.explore} <ArrowIcon />
              </Link>
              <Link to={path("contact")} className="about-action about-action--secondary">
                {content.hero.start}
              </Link>
            </Motion.div>

            <Motion.dl
              className="about-hero-facts"
              variants={reveal}
              transition={{ duration: 0.6, ease: premiumEase }}
            >
              {content.hero.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </Motion.dl>
          </Motion.div>

          <CareerConstellation reduceMotion={reduceMotion} content={content.constellation} />
        </div>
      </section>

      <section className="about-capabilities">
        <div className="site-container">
          <div className="about-capability-layout">
            <div className="about-capability-sticky">
              <SectionIntro
                eyebrow={content.capabilitiesIntro.eyebrow}
                title={content.capabilitiesIntro.title}
                copy={content.capabilitiesIntro.copy}
              />

              <Motion.div
                className="about-principle"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, ease: premiumEase }}
              >
                <span>{content.capabilitiesIntro.principleLabel}</span>
                <blockquote>
                  {locale === "ar" ? "«" : "“"}
                  {content.capabilitiesIntro.principle}
                  {locale === "ar" ? "»" : "”"}
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
                  skillsAria={copy.common.stackAria}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-career">
        <div className="site-container">
          <SectionIntro
            eyebrow={content.careerIntro.eyebrow}
            title={content.careerIntro.title}
            copy={content.careerIntro.copy}
            align="center"
          />
          <CareerTimeline
            reduceMotion={reduceMotion}
            items={career}
            currentLabel={content.careerIntro.current}
          />
        </div>
      </section>

      <section className="about-academia">
        <div className="site-container">
          <div className="about-academia-heading">
            <SectionIntro
              eyebrow={content.academicIntro.eyebrow}
              title={content.academicIntro.title}
              copy={content.academicIntro.copy}
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
              <p>{content.academicIntro.degreesCount}</p>
              <i aria-hidden="true" />
              <span>1</span>
              <p>{content.academicIntro.mastersCount}</p>
            </Motion.div>
          </div>

          <div className="education-list">
            {education.map((item, index) => (
              <EducationCard
                key={`${item.degree}-${item.period}`}
                item={item}
                index={index}
                reduceMotion={reduceMotion}
                researchLabel={content.academicIntro.research}
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
                <span aria-hidden="true" /> {content.publicationsIntro.eyebrow}
              </p>
              <h2 className="display-font">{content.publicationsIntro.title}</h2>
              <p>{content.publicationsIntro.copy}</p>
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
                      <strong
                        lang={publication.titleLanguage}
                        dir={publication.titleLanguage ? "ltr" : "auto"}
                      >
                        {publication.title}
                      </strong>
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
                <span aria-hidden="true" /> {content.outro.eyebrow}
              </p>
              <h2 className="display-font">{content.outro.title}</h2>
              <p>{content.outro.copy}</p>
            </div>
            <div className="about-outro-actions">
              <Link to={path("contact")} className="about-action about-action--primary">
                {content.outro.talk} <ArrowIcon />
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
