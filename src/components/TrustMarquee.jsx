import { motion as Motion } from "framer-motion";
import arabicaMark from "../assets/arabica-mark.webp";
import berkatMark from "../assets/berkat-mark.webp";
import lawnexMark from "../assets/lawnex-mark.webp";
import mohammadAboZeedMark from "../assets/mohammad-abo-zeed-mark.webp";
import ugarixMark from "../assets/ugarix-mark.webp";
import yallahMark from "../assets/yallah-mark.webp";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/trust-marquee.css";

const brands = [
  { name: "Ugarix Systems", logo: ugarixMark, wide: true },
  { name: "LAWNEX", logo: lawnexMark },
  { name: "Berkat Madinah", logo: berkatMark },
  { name: "Yallah Baggage", logo: yallahMark },
  { name: "Arabica Restaurant", logo: arabicaMark },
  { name: "Mohammad Abo Zeed", logo: mohammadAboZeedMark },
];

function BrandSet({ hidden = false }) {
  return (
    <div className="trust-marquee-set" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <div className={`trust-brand${brand.wide ? " trust-brand--wide" : ""}`} key={brand.name}>
          <img src={brand.logo} alt={hidden ? "" : brand.name} loading="lazy" decoding="async" />
          {!brand.wide && <span>{brand.name}</span>}
        </div>
      ))}
    </div>
  );
}

export default function TrustMarquee() {
  const reduceMotion = useHydrationSafeReducedMotion();
  const { copy } = useLocale();

  return (
    <section className="trust-section" aria-labelledby="trust-title">
      <div className="site-container trust-container">
        <Motion.header
          className="trust-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{copy.home.trust.kicker}</span>
          <h2 id="trust-title">{copy.home.trust.title}</h2>
          <p>{copy.home.trust.description}</p>
        </Motion.header>

        <div className={`trust-marquee${reduceMotion ? " trust-marquee--still" : ""}`}>
          <div className="trust-marquee-track">
            <BrandSet />
            {!reduceMotion && <BrandSet hidden />}
          </div>
        </div>
      </div>
    </section>
  );
}
