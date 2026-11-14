import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/contact.css";

const premiumEase = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(7px)" },
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

function ProjectBriefForm({ content }) {
  const { form, message: messageCopy, projectTypes } = content;
  const handleSubmit = (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const fields = new FormData(formElement);
    const name = fields.get("name").trim();
    const message = fields.get("message").trim();

    if (!name || !message) {
      const field = formElement.elements.namedItem(name ? "message" : "name");
      field.setCustomValidity(form.required);
      field.reportValidity();
      return;
    }

    const email = fields.get("email").trim();
    const organization = fields.get("organization").trim();
    const project = projectTypes.find((type) => type.id === fields.get("projectType"));
    const messageLines = [messageCopy.greeting, "", `${messageCopy.name}: ${name}`];

    if (email) messageLines.push(`${messageCopy.email}: ${email}`);
    if (organization) messageLines.push(`${messageCopy.organization}: ${organization}`);
    if (project) messageLines.push(`${messageCopy.focus}: ${project.label}`);
    messageLines.push("", messageCopy.problem, message);

    if (event.nativeEvent.submitter?.value === "email") {
      const subject = project ? `${messageCopy.subject} — ${project.label}` : messageCopy.subject;
      const emailBody = messageLines.join("\n").replace(/\r?\n/g, "\r\n");
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      return;
    }

    const whatsappHref = `${profile.whatsapp}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  const clearFieldError = (event) => event.currentTarget.setCustomValidity("");

  return (
    <form className="contact-form" method="post" onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <label className="contact-field">
          <span>{form.name}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder={form.namePlaceholder}
            onInput={clearFieldError}
            required
          />
        </label>

        <label className="contact-field">
          <span>{form.email} <small>{form.optional}</small></span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@example.com"
          />
        </label>

        <label className="contact-field">
          <span>{form.organization} <small>{form.optional}</small></span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            placeholder={form.organizationPlaceholder}
          />
        </label>

        <label className="contact-field">
          <span>{form.focus} <small>{form.optional}</small></span>
          <select name="projectType" defaultValue="">
            <option value="">{form.select}</option>
            {projectTypes.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
          </select>
        </label>

        <label className="contact-field contact-field--wide">
          <span>{form.problem}</span>
          <textarea
            name="message"
            rows={7}
            placeholder={form.problemPlaceholder}
            onInput={clearFieldError}
            required
          />
        </label>
      </div>

      <div className="contact-form-footer">
        <div className="contact-form-actions">
          <button type="submit" value="whatsapp" className="contact-action contact-action--primary">
            {form.whatsapp} <ArrowIcon external />
          </button>
          <button type="submit" value="email" className="contact-action contact-action--secondary">
            {form.compose}
          </button>
        </div>
        <p>{form.privacy}</p>
      </div>
    </form>
  );
}

export default function Contact() {
  const reduceMotion = useHydrationSafeReducedMotion();
  const [formReady, setFormReady] = useState(false);
  const { copy } = useLocale();
  const content = copy.contact;

  // The direct links work in the generated HTML. Mount the form once its
  // submit handler can intercept submission and open the selected draft.
  useEffect(() => {
    setFormReady(true);
  }, []);

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-grid" aria-hidden="true" />
        <div className="contact-hero-glow contact-hero-glow--one" aria-hidden="true" />
        <div className="contact-hero-glow contact-hero-glow--two" aria-hidden="true" />

        <div className="site-container page-hero-frame contact-hero-layout">
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

            <div className="contact-hero-actions">
              <a href="#project-brief" className="contact-action contact-action--primary">
                {content.hero.share} <ArrowIcon />
              </a>
              <a href={`mailto:${profile.email}`} className="contact-action contact-action--secondary">
                {content.hero.email}
              </a>
            </div>

            <Motion.dl className="contact-hero-facts" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              {content.hero.facts.map((fact) => (
                <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
              ))}
            </Motion.dl>
          </Motion.div>
        </div>
      </section>

      <section className="contact-workspace" id="project-brief">
        <div className="site-container">
          <div className="contact-section-heading">
            <div>
              <p className="contact-eyebrow"><span aria-hidden="true" /> {content.brief.eyebrow}</p>
              <h2 className="display-font">{content.brief.title}</h2>
            </div>
            <p>
              {content.brief.copy}
            </p>
          </div>

          <div className="contact-workspace-grid">
            {formReady && <ProjectBriefForm content={content} />}

            <aside className="contact-sidebar">
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
            </aside>
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
