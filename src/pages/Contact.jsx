import { motion as Motion } from "framer-motion";
import { useState } from "react";
import BrandMark from "../components/BrandMark";
import { profile } from "../data/profile";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/contact.css";

const premiumEase = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const initialForm = {
  name: "",
  email: "",
  organization: "",
  projectType: "",
  message: "",
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

function ChannelIcon({ type }) {
  const paths = {
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" />
        <path d="M9 8.2c.4 2.3 2.1 4 4.4 4.6l1.1-1.1 2 .8-.2 1.8c-.2.7-.8 1-1.6 1-4.6-.2-8-3.7-8.1-8.1 0-.8.4-1.4 1-1.6l1.8-.2.8 2L9 8.2Z" />
      </>
    ),
    linkedin: (
      <>
        <rect x="4" y="9" width="3" height="10" />
        <path d="M5.5 5.2v.1M11 19v-6a3.5 3.5 0 0 1 7 0v6M11 9v10" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

function ConversationSignal({ reduceMotion, content }) {
  return (
    <Motion.div
      className="contact-signal"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.12, ease: premiumEase }}
      aria-hidden="true"
    >
      <div className="contact-signal-grid" />
      <div className="contact-signal-orbit contact-signal-orbit--outer" />
      <div className="contact-signal-orbit contact-signal-orbit--inner" />

      <svg className="contact-signal-paths" viewBox="0 0 520 470">
        <path className="contact-signal-path contact-signal-path--one" d="M104 116C166 142 182 192 234 224" />
        <path className="contact-signal-path contact-signal-path--two" d="M416 128C356 150 340 194 286 224" />
        <path className="contact-signal-path contact-signal-path--three" d="M113 354C165 323 190 284 236 252" />
        <path className="contact-signal-path contact-signal-path--four" d="M284 252C334 279 358 319 413 351" />
      </svg>

      <div className="contact-signal-toolbar">
        <span><i /> {content.map}</span>
        <small>{content.count}</small>
      </div>

      <div className="contact-signal-node contact-signal-node--context">
        <small>01</small>
        <strong>{content.nodes[0]}</strong>
      </div>
      <div className="contact-signal-node contact-signal-node--constraint">
        <small>02</small>
        <strong>{content.nodes[1]}</strong>
      </div>
      <div className="contact-signal-node contact-signal-node--outcome">
        <small>03</small>
        <strong>{content.nodes[2]}</strong>
      </div>
      <div className="contact-signal-node contact-signal-node--evidence">
        <small>04</small>
        <strong>{content.nodes[3]}</strong>
      </div>

      <div className="contact-signal-core">
        <span className="contact-signal-core-ring" />
        <BrandMark className="contact-signal-mark" />
        <strong>{content.next}</strong>
        <small>{content.explicit}</small>
      </div>

      <div className="contact-signal-readout">
        <span>{content.ambiguity}</span>
        <i><b /></i>
        <strong>{content.reduced}</strong>
      </div>
    </Motion.div>
  );
}

function DirectChannel({ type, label, value, href }) {
  return (
    <a className="contact-channel" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      <span className="contact-channel-icon"><ChannelIcon type={type} /></span>
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
      <ArrowIcon external={href.startsWith("http")} />
    </a>
  );
}

export default function Contact() {
  const reduceMotion = useHydrationSafeReducedMotion();
  const [form, setForm] = useState(initialForm);
  const { copy } = useLocale();
  const content = copy.contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const selectedProject = content.projectTypes.find((type) => type.id === form.projectType);
  const messageLines = [
    content.message.greeting,
    "",
    `${content.message.name}: ${form.name || content.message.notProvided}`,
    `${content.message.email}: ${form.email || content.message.notProvided}`,
    `${content.message.organization}: ${form.organization || content.message.notProvided}`,
    `${content.message.focus}: ${selectedProject?.label || content.message.notSelected}`,
    "",
    content.message.problem,
    form.message || content.message.notProvided,
  ];

  const encodedMessage = encodeURIComponent(messageLines.join("\n"));
  const whatsappHref = `${profile.whatsapp}?text=${encodedMessage}`;
  const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    selectedProject ? `${content.message.subject} — ${selectedProject.label}` : content.message.subject,
  )}&body=${encodedMessage}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-grid" aria-hidden="true" />
        <div className="contact-hero-glow contact-hero-glow--one" aria-hidden="true" />
        <div className="contact-hero-glow contact-hero-glow--two" aria-hidden="true" />

        <div className="site-container contact-hero-layout">
          <Motion.div
            className="contact-hero-copy"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: reduceMotion ? 0 : 0.07 }}
          >
            <Motion.p className="contact-eyebrow" variants={reveal} transition={{ duration: 0.5, ease: premiumEase }}>
              <span aria-hidden="true" /> {content.hero.eyebrow}
            </Motion.p>

            <Motion.h1 className="hero-title-scale page-hero-title display-font" variants={reveal} transition={{ duration: 0.66, ease: premiumEase }}>
              <span>{content.hero.titleBefore}</span>
              <em>{content.hero.titleAccent}</em>
            </Motion.h1>

            <Motion.p className="contact-hero-lead" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              {content.hero.lead}
            </Motion.p>

            <Motion.div className="contact-hero-actions" variants={reveal} transition={{ duration: 0.58, ease: premiumEase }}>
              <a href="#project-brief" className="contact-action contact-action--primary">
                {content.hero.share} <ArrowIcon />
              </a>
              <a href={`mailto:${profile.email}`} className="contact-action contact-action--secondary">
                {content.hero.email}
              </a>
            </Motion.div>

            <Motion.dl className="contact-hero-facts" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              {content.hero.facts.map((fact) => (
                <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
              ))}
            </Motion.dl>
          </Motion.div>

          <ConversationSignal reduceMotion={reduceMotion} content={content.signal} />
        </div>
      </section>

      <section className="contact-workspace" id="project-brief">
        <div className="site-container">
          <Motion.div
            className="contact-section-heading"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.65, ease: premiumEase }}
          >
            <div>
              <p className="contact-eyebrow"><span aria-hidden="true" /> {content.brief.eyebrow}</p>
              <h2 className="display-font">{content.brief.title}</h2>
            </div>
            <p>
              {content.brief.copy}
            </p>
          </Motion.div>

          <div className="contact-workspace-grid">
            <Motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.68, ease: premiumEase }}
            >
              <div className="contact-form-toolbar">
                <span><i /> {content.form.secure}</span>
                <small>{content.form.count}</small>
              </div>

              <div className="contact-form-grid">
                <label className="contact-field">
                  <span>{content.form.name}</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder={content.form.namePlaceholder}
                    required
                  />
                </label>

                <label className="contact-field">
                  <span>{content.form.email}</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="name@example.com"
                    required
                  />
                </label>

                <label className="contact-field">
                  <span>{content.form.organization} <small>{content.form.optional}</small></span>
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    autoComplete="organization"
                    placeholder={content.form.organizationPlaceholder}
                  />
                </label>

                <label className="contact-field">
                  <span>{content.form.focus}</span>
                  <select name="projectType" value={form.projectType} onChange={handleChange} required>
                    <option value="" disabled>{content.form.select}</option>
                    {content.projectTypes.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
                  </select>
                </label>

                <label className="contact-field contact-field--wide">
                  <span>{content.form.problem}</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={7}
                    placeholder={content.form.problemPlaceholder}
                    required
                  />
                </label>
              </div>

              <div className="contact-form-footer">
                <div className="contact-form-actions">
                  <button type="submit" className="contact-action contact-action--primary">
                    {content.form.whatsapp} <ArrowIcon external />
                  </button>
                  <a href={emailHref} className="contact-action contact-action--secondary">
                    {content.form.compose}
                  </a>
                </div>
                <p>{content.form.privacy}</p>
              </div>
            </Motion.form>

            <Motion.aside
              className="contact-sidebar"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, delay: reduceMotion ? 0 : 0.08, ease: premiumEase }}
            >
              <div className="contact-side-card">
                <p className="contact-side-label">{content.sidebar.direct}</p>
                <div className="contact-channels">
                  <DirectChannel type="email" label={content.sidebar.email} value={profile.email} href={`mailto:${profile.email}`} />
                  <DirectChannel type="whatsapp" label="WhatsApp" value={profile.phone} href={profile.whatsapp} />
                  <DirectChannel type="linkedin" label="LinkedIn" value={content.sidebar.professional} href={profile.linkedin} />
                </div>
              </div>

              <div className="contact-side-card contact-side-card--framework">
                <p className="contact-side-label">{content.sidebar.firstMessage}</p>
                <ol>
                  {content.sidebar.prompts.map((prompt, index) => (
                    <li key={prompt.title}>
                      <span>0{index + 1}</span>
                      <div><strong>{prompt.title}</strong><p>{prompt.copy}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
            </Motion.aside>
          </div>
        </div>
      </section>

      <section className="contact-outro">
        <Motion.div
          className="site-container"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.68, ease: premiumEase }}
        >
          <div className="contact-outro-card">
            <div>
              <p className="contact-eyebrow"><span aria-hidden="true" /> {content.outro.eyebrow}</p>
              <h2 className="display-font">{content.outro.title}</h2>
              <p>{content.outro.copy}</p>
            </div>
            <a href={`mailto:${profile.email}`} className="contact-action contact-action--primary">
              {content.outro.write} <ArrowIcon />
            </a>
          </div>
        </Motion.div>
      </section>
    </div>
  );
}
