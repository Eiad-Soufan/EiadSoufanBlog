import { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";
import heroEngineering1280 from "../assets/hero-engineering-1280.webp";
import heroEngineering768 from "../assets/hero-engineering-768.webp";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";

export default function SignatureField() {
  const artworkRef = useRef(null);
  const reduceMotion = useHydrationSafeReducedMotion();
  const isInView = useInView(artworkRef, { initial: true, margin: "120px 0px" });
  const { copy, locale, localeMeta } = useLocale();

  return (
    <Motion.div
      ref={artworkRef}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.975, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.76, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="home-signature-field hero-artwork"
      data-locale={locale}
      data-motion={reduceMotion || !isInView ? "paused" : "running"}
      dir={localeMeta.dir}
      aria-hidden="true"
    >
      <div className="hero-artwork-shell">
        <div className="hero-artwork-grid" />
        <div className="hero-artwork-halo hero-artwork-halo--cyan" />
        <div className="hero-artwork-halo hero-artwork-halo--violet" />

        <div className="hero-artwork-header">
          <span className="hero-artwork-status">
            <span className="status-pulse" />
            {copy.home.signature.production}
          </span>
        </div>

        <div className="hero-artwork-canvas">
          <div className="hero-artwork-orbit hero-artwork-orbit--outer" />
          <div className="hero-artwork-orbit hero-artwork-orbit--inner" />
          <picture className="hero-artwork-picture">
            <img
              src={heroEngineering1280}
              srcSet={`${heroEngineering768} 768w, ${heroEngineering1280} 1280w`}
              sizes="(min-width: 70rem) 33vw, (min-width: 48rem) 33.75rem, calc(100vw - 2.25rem)"
              width="1280"
              height="853"
              alt=""
              decoding="async"
              fetchPriority="high"
              draggable="false"
              className="hero-artwork-image"
            />
          </picture>
        </div>

        <div className="hero-artwork-footer">
          <span>{copy.home.signature.architecture}</span>
          <i aria-hidden="true" />
          <span>{copy.home.signature.delivery}</span>
          <i aria-hidden="true" />
          <span>{copy.home.signature.impact}</span>
        </div>
      </div>
    </Motion.div>
  );
}
