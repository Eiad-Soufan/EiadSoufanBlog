import { motion as Motion } from "framer-motion";
import arabicaMark from "../assets/arabica-mark.webp";
import berkatMark from "../assets/berkat-mark.webp";
import homsUniversityMark from "../assets/homs-university-mark.webp";
import lawnexMark from "../assets/lawnex-mark.webp";
import mohammadAboZeedMark from "../assets/mohammad-abo-zeed-mark.webp";
import mtnSyriaMark from "../assets/mtn-syria-mark.webp";
import ugarixSymbol from "../assets/ugarix-symbol.webp";
import yallahMark from "../assets/yallah-mark.webp";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/trust-marquee.css";

const brands = [
  { name: "Ugarix Systems", logo: ugarixSymbol },
  { name: "MTN Syria", logo: mtnSyriaMark },
  { name: "Homs University", logo: homsUniversityMark },
  { name: "LAWNEX", logo: lawnexMark },
  { name: "Berkat Madinah", logo: berkatMark },
  { name: "Yallah Baggage", logo: yallahMark },
  { name: "Arabica Restaurant", logo: arabicaMark },
  { name: "Mohammad Abo Zeed", logo: mohammadAboZeedMark },
];

export default function TrustMarquee() {
  const reduceMotion = useHydrationSafeReducedMotion();
  const { copy } = useLocale();

  return (
    <section className="trust-section" aria-label={copy.home.trust.kicker}>
      <div className="site-container trust-container">
        <Motion.header
          className="trust-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{copy.home.trust.kicker}</span>
        </Motion.header>

        <Motion.div
          className="trust-grid"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.045 } },
          }}
        >
          {brands.map((brand) => (
            <Motion.div
              className="trust-brand"
              key={brand.name}
              dir="ltr"
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={brand.logo} alt="" loading="lazy" decoding="async" />
              <span>{brand.name}</span>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}
