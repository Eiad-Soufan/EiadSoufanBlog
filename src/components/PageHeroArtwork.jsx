import { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/page-hero-artwork.css";

export default function PageHeroArtwork({
  image,
  image768,
  status,
  labels,
  variant,
  imageWidth = 1254,
}) {
  const artworkRef = useRef(null);
  const reduceMotion = useHydrationSafeReducedMotion();
  const isInView = useInView(artworkRef, { initial: true, margin: "120px 0px" });
  const { locale, localeMeta } = useLocale();

  return (
    <Motion.div
      ref={artworkRef}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      className={`page-hero-artwork page-hero-artwork--${variant} hero-artwork`}
      data-locale={locale}
      data-motion={reduceMotion || !isInView ? "paused" : "running"}
      dir={localeMeta.dir}
      aria-hidden="true"
    >
      <div className="hero-artwork-shell page-hero-artwork-shell">
        <div className="hero-artwork-grid" />
        <div className="hero-artwork-halo hero-artwork-halo--cyan" />
        <div className="hero-artwork-halo hero-artwork-halo--violet" />

        <div className="hero-artwork-header">
          <span className="hero-artwork-status">
            <span className="status-pulse" />
            {status}
          </span>
        </div>

        <div className="hero-artwork-canvas">
          <div className="hero-artwork-orbit hero-artwork-orbit--outer" />
          <div className="hero-artwork-orbit hero-artwork-orbit--inner" />
          <picture className="hero-artwork-picture">
            <img
              src={image}
              srcSet={`${image768} 768w, ${image} ${imageWidth}w`}
              sizes="(min-width: 70rem) 35rem, (min-width: 48rem) 33.75rem, calc(100vw - 2.25rem)"
              width={imageWidth}
              height={imageWidth}
              alt=""
              decoding="async"
              fetchPriority="high"
              draggable="false"
              className="hero-artwork-image"
            />
          </picture>
        </div>

        <div className="hero-artwork-footer">
          <span>{labels[0]}</span>
          <i aria-hidden="true" />
          <span>{labels[1]}</span>
          <i aria-hidden="true" />
          <span>{labels[2]}</span>
        </div>
      </div>
    </Motion.div>
  );
}
