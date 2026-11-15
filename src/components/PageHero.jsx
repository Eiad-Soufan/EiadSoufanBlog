import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import NeuralCosmos from "./NeuralCosmos";

const entrance = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};
const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
const arrowPaths = {
  forward: "M4 10h11m-4.5-4.5L15 10l-4.5 4.5",
  down: "M10 4v11m-4.5-4.5L10 15l4.5-4.5",
  external: "M7 5h8v8M15 5 6 14",
};

function HeroArrow({ direction }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={arrowPaths[direction]} />
    </svg>
  );
}

function HeroAction({ action, sizing }) {
  const { label, to, href, kind, arrow } = action;
  const className = `page-hero-action page-hero-action--${kind}`;
  const children = <>{label}{arrow && <HeroArrow direction={arrow} />}</>;

  if (sizing) return <span className={className}>{children}</span>;
  if (to) return <Link to={to} className={className}>{children}</Link>;
  return <a href={href} className={className}>{children}</a>;
}

function HeroMeta({ variant, content, sizing, animation }) {
  const Meta = sizing ? "div" : Motion.div;
  const Facts = sizing ? "dl" : Motion.dl;

  if (variant === "home") {
    const ProfileLink = sizing ? "span" : "a";
    return (
      <Meta className="page-hero-meta home-hero-meta" {...animation}>
        <span>{content.location}</span>
        <div className="home-hero-profiles" role="group" aria-label={content.profilesLabel}>
          {[
            ["GitHub", profile.github],
            ["LinkedIn", profile.linkedin],
          ].map(([label, href]) => (
            <ProfileLink
              key={label}
              className="home-hero-profile"
              dir="ltr"
              {...(sizing ? {} : { href, target: "_blank", rel: "noreferrer" })}
            >
              {label} <HeroArrow direction="external" />
            </ProfileLink>
          ))}
        </div>
        <span dir="ltr">Python · Django · React · Flutter · RAG</span>
      </Meta>
    );
  }

  const facts = content.facts;
  const className = variant === "approach" ? "approach-hero-signals" : `${variant}-hero-facts`;
  return (
    <Facts className={`page-hero-meta ${className}`} {...animation}>
      {facts.map(({ label, value }) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
      ))}
    </Facts>
  );
}

function HeroCopy({ variant, content, sizing, reduceMotion }) {
  const Block = sizing ? "div" : Motion.div;
  const Text = sizing ? "p" : Motion.p;
  const Title = sizing ? "p" : Motion.h1;
  const animation = sizing ? {} : { variants: entrance, transition };
  const reveal = sizing ? {} : {
    initial: reduceMotion ? false : "hidden",
    animate: "visible",
    transition: { staggerChildren: reduceMotion ? 0 : 0.07 },
  };

  return (
    <Block className="page-hero-copy" inert={sizing || undefined} {...reveal}>
      <div>
        <Text className="page-hero-eyebrow" {...animation}>
          <span aria-hidden="true" /> {content.eyebrow}
        </Text>
        <Title className="page-hero-title display-font" {...animation}>
          <span>{content.titleBefore}</span>{" "}
          {variant === "home" ? (
            <span><em>{content.titleAccent}</em> {content.titleAfter}</span>
          ) : (
            <em>{content.titleAccent}</em>
          )}
        </Title>
      </div>

      <Text className="page-hero-lead" {...animation}>{content.lead}</Text>

      <Block className={`page-hero-actions ${variant === "about" ? "about-hero-actions" : ""}`} {...animation}>
        {content.actions.map((action) => <HeroAction key={action.kind} action={action} sizing={sizing} />)}
      </Block>

      <HeroMeta variant={variant} content={content} sizing={sizing} animation={animation} />
    </Block>
  );
}

export default function PageHero({ page }) {
  const reduceMotion = useHydrationSafeReducedMotion();
  const { copy, path, locale } = useLocale();
  const { headline, summary } = copy.profile;
  const home = copy.home.hero;
  const about = copy.about.hero;
  const approach = copy.approach.hero;
  const contact = copy.contact.hero;
  const workPath = path("home", "#selected-work");
  const contactPath = path("contact");

  const heroes = {
    home: {
      eyebrow: `${copy.common.name} — ${copy.common.role}`,
      titleBefore: headline.before,
      titleAccent: headline.accent,
      titleAfter: headline.after,
      lead: summary,
      location: copy.common.location,
      profilesLabel: home.profiles,
      actions: [
        { kind: "primary", to: workPath, label: home.explore, arrow: "forward" },
        { kind: "secondary", to: contactPath, label: home.start },
      ],
    },
    about: {
      ...about,
      lead: <>{about.leadBefore} <strong>{copy.common.name}</strong>{locale === "ar" ? "،" : ","} {about.leadAfter}</>,
      actions: [
        { kind: "primary", to: workPath, label: about.explore, arrow: "forward" },
        { kind: "secondary", to: contactPath, label: about.start },
        { kind: "text", to: path("about", "#publications"), label: about.publications, arrow: "down" },
      ],
    },
    approach: {
      ...approach,
      facts: approach.signals.map((value, index) => ({ label: `0${index + 1}`, value })),
      actions: [
        { kind: "primary", to: contactPath, label: approach.discuss, arrow: "forward" },
        { kind: "secondary", to: workPath, label: approach.outcomes },
      ],
    },
    contact: {
      ...contact,
      actions: [
        { kind: "primary", href: "#project-brief", label: contact.share, arrow: "forward" },
        { kind: "secondary", href: `mailto:${profile.email}`, label: contact.email },
      ],
    },
  };

  return (
    <section className="page-hero">
      <NeuralCosmos page={page} />
      <div className="site-container page-hero-frame">
        {/* The copies share one grid cell, so the current language's tallest copy sizes it. */}
        {Object.entries(heroes).map(([variant, content]) => (
          <HeroCopy
            key={variant}
            variant={variant}
            content={content}
            sizing={variant !== page}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}
