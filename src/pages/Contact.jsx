import { motion as Motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import BrandMark from "../components/BrandMark";
import { profile } from "../data/profile";
import "../styles/contact.css";

const premiumEase = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const projectTypes = [
  "Product platform",
  "Applied AI or RAG",
  "Backend, APIs, or architecture",
  "Web or mobile experience",
  "Technical consultation",
  "Something else",
];

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

function ConversationSignal({ reduceMotion }) {
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
        <span><i /> Conversation map</span>
        <small>Signal / 04</small>
      </div>

      <div className="contact-signal-node contact-signal-node--context">
        <small>01</small>
        <strong>Context</strong>
      </div>
      <div className="contact-signal-node contact-signal-node--constraint">
        <small>02</small>
        <strong>Constraint</strong>
      </div>
      <div className="contact-signal-node contact-signal-node--outcome">
        <small>03</small>
        <strong>Outcome</strong>
      </div>
      <div className="contact-signal-node contact-signal-node--evidence">
        <small>04</small>
        <strong>Evidence</strong>
      </div>

      <div className="contact-signal-core">
        <span className="contact-signal-core-ring" />
        <BrandMark className="contact-signal-mark" />
        <strong>Next move</strong>
        <small>made explicit</small>
      </div>

      <div className="contact-signal-readout">
        <span>Ambiguity</span>
        <i><b /></i>
        <strong>Reduced</strong>
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
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const pageTitle = "Contact Eiad Soufan — Start a Conversation";
    const description =
      "Discuss a software platform, applied AI system, backend architecture, or product engineering challenge with Eiad Soufan.";
    const previousTitle = document.title;
    const canonicalUrl = `${window.location.origin}/contact`;
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
      upsertMeta("og:url", canonicalUrl, "property"),
    ];

    let canonical = document.querySelector('link[rel="canonical"]');
    const canonicalWasCreated = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.getAttribute("href");
    canonical.setAttribute("href", canonicalUrl);

    const schema = document.createElement("script");
    schema.id = "contact-page-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: pageTitle,
      url: canonicalUrl,
      description,
      mainEntity: {
        "@type": "Person",
        name: "Eiad Abdulhadi Soufan",
        jobTitle: profile.role,
        email: `mailto:${profile.email}`,
        telephone: profile.phoneHref,
      },
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      cleanups.forEach((cleanup) => cleanup());
      if (canonicalWasCreated) canonical.remove();
      else if (previousCanonical) canonical.setAttribute("href", previousCanonical);
      schema.remove();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const messageLines = [
    "Hello Eiad — portfolio enquiry",
    "",
    `Name: ${form.name || "Not provided"}`,
    `Email: ${form.email || "Not provided"}`,
    `Organisation: ${form.organization || "Not provided"}`,
    `Project focus: ${form.projectType || "Not selected"}`,
    "",
    "What I am trying to solve:",
    form.message || "Not provided",
  ];

  const encodedMessage = encodeURIComponent(messageLines.join("\n"));
  const whatsappHref = `${profile.whatsapp}?text=${encodedMessage}`;
  const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    form.projectType ? `Project enquiry — ${form.projectType}` : "Project enquiry",
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
              <span aria-hidden="true" /> Start a conversation
            </Motion.p>

            <Motion.h1 className="hero-title-scale display-font" variants={reveal} transition={{ duration: 0.66, ease: premiumEase }}>
              The right system starts with a <em>clear problem.</em>
            </Motion.h1>

            <Motion.p className="contact-hero-lead" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              Tell me what is difficult, what already exists, and what success must look
              like. We can turn that context into a useful technical next move.
            </Motion.p>

            <Motion.div className="contact-hero-actions" variants={reveal} transition={{ duration: 0.58, ease: premiumEase }}>
              <a href="#project-brief" className="contact-action contact-action--primary">
                Share the problem <ArrowIcon />
              </a>
              <a href={`mailto:${profile.email}`} className="contact-action contact-action--secondary">
                Email directly
              </a>
            </Motion.div>

            <Motion.dl className="contact-hero-facts" variants={reveal} transition={{ duration: 0.6, ease: premiumEase }}>
              <div><dt>Based in</dt><dd>{profile.location}</dd></div>
              <div><dt>Useful context</dt><dd>Problem · Constraint · Outcome</dd></div>
              <div><dt>Best for</dt><dd>Systems that need clarity and depth</dd></div>
            </Motion.dl>
          </Motion.div>

          <ConversationSignal reduceMotion={reduceMotion} />
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
              <p className="contact-eyebrow"><span aria-hidden="true" /> Project brief</p>
              <h2 className="display-font">Start with the part that is hardest to explain.</h2>
            </div>
            <p>
              A polished specification is not required. A few honest details are enough to
              begin framing the opportunity, the risk, and the smallest useful next step.
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
                <span><i /> Secure handoff</span>
                <small>Brief / 01</small>
              </div>

              <div className="contact-form-grid">
                <label className="contact-field">
                  <span>Your name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="How should I address you?"
                    required
                  />
                </label>

                <label className="contact-field">
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                  />
                </label>

                <label className="contact-field">
                  <span>Organisation <small>Optional</small></span>
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    autoComplete="organization"
                    placeholder="Company or team"
                  />
                </label>

                <label className="contact-field">
                  <span>Project focus</span>
                  <select name="projectType" value={form.projectType} onChange={handleChange} required>
                    <option value="" disabled>Select the closest fit</option>
                    {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </label>

                <label className="contact-field contact-field--wide">
                  <span>What are you trying to solve?</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={7}
                    placeholder="The current situation, the constraint that matters, and the outcome you need…"
                    required
                  />
                </label>
              </div>

              <div className="contact-form-footer">
                <div className="contact-form-actions">
                  <button type="submit" className="contact-action contact-action--primary">
                    Continue in WhatsApp <ArrowIcon external />
                  </button>
                  <a href={emailHref} className="contact-action contact-action--secondary">
                    Compose email
                  </a>
                </div>
                <p>No account or portal. Your details are passed only to the channel you choose.</p>
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
                <p className="contact-side-label">Direct channels</p>
                <div className="contact-channels">
                  <DirectChannel type="email" label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                  <DirectChannel type="whatsapp" label="WhatsApp" value={profile.phone} href={profile.whatsapp} />
                  <DirectChannel type="linkedin" label="LinkedIn" value="Professional profile" href={profile.linkedin} />
                </div>
              </div>

              <div className="contact-side-card contact-side-card--framework">
                <p className="contact-side-label">A useful first message</p>
                <ol>
                  <li><span>01</span><div><strong>Context</strong><p>What exists today and who depends on it?</p></div></li>
                  <li><span>02</span><div><strong>Constraint</strong><p>What cannot be compromised?</p></div></li>
                  <li><span>03</span><div><strong>Outcome</strong><p>What becomes measurably better?</p></div></li>
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
              <p className="contact-eyebrow"><span aria-hidden="true" /> Low-context is welcome</p>
              <h2 className="display-font">One honest paragraph is enough to begin.</h2>
              <p>Send the difficult part first. Structure can come after the signal is clear.</p>
            </div>
            <a href={`mailto:${profile.email}`} className="contact-action contact-action--primary">
              Write to Eiad <ArrowIcon />
            </a>
          </div>
        </Motion.div>
      </section>
    </div>
  );
}
