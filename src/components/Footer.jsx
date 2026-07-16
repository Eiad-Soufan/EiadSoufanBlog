import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/footer.css";
import BrandMark from "./BrandMark";

export default function Footer() {
  const year = new Date().getFullYear();
  const { copy, path } = useLocale();
  const footerLinks = [
    { label: copy.common.nav.work, to: path("home", "#selected-work") },
    { label: copy.common.nav.about, to: path("about") },
    { label: copy.common.nav.approach, to: path("approach") },
    { label: copy.common.nav.contact, to: path("contact") },
  ];
  const socialLinks = [
    { label: "GitHub", href: profile.github, icon: <FaGithub aria-hidden="true" /> },
    { label: "LinkedIn", href: profile.linkedin, icon: <FaLinkedinIn aria-hidden="true" /> },
    {
      label: "WhatsApp",
      href: `${profile.whatsapp}?text=${encodeURIComponent(copy.footer.whatsapp)}`,
      icon: <FaWhatsapp aria-hidden="true" />,
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-glow site-footer-glow--one" aria-hidden="true" />
      <div className="site-footer-glow site-footer-glow--two" aria-hidden="true" />

      <div className="site-container site-footer-inner">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <Link to={path("home")} className="site-footer-identity" aria-label={copy.common.nav.homeAria}>
              <BrandMark className="site-footer-mark" />
              <span>
                <strong className="display-font">Eiad Soufan</strong>
                <small>{copy.common.role}</small>
              </span>
            </Link>
            <p>{copy.profile.headlineText}</p>
          </div>

          <nav className="site-footer-nav" aria-label={copy.common.nav.footerAria}>
            <p>{copy.footer.navigate}</p>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-contact">
            <p>{copy.footer.direct}</p>
            <a href={`mailto:${profile.email}`} dir="ltr">{profile.email}</a>
            <a href={`tel:${profile.phoneHref}`} dir="ltr">{profile.phone}</a>
            <span>{copy.common.location}</span>
          </div>

          <div className="site-footer-social">
            <p>{copy.footer.elsewhere}</p>
            <div>
              {socialLinks.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  {icon}
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© {year} {copy.footer.copyright}</p>
          <p>{copy.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
