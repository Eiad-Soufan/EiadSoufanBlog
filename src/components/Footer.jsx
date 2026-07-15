import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import "../styles/footer.css";
import BrandMark from "./BrandMark";

const footerLinks = [
  { label: "Work", to: "/#selected-work" },
  { label: "About", to: "/about-us" },
  { label: "Approach", to: "/why-us" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { label: "GitHub", href: profile.github, icon: <FaGithub aria-hidden="true" /> },
  { label: "LinkedIn", href: profile.linkedin, icon: <FaLinkedinIn aria-hidden="true" /> },
  {
    label: "WhatsApp",
    href: `${profile.whatsapp}?text=${encodeURIComponent("Hello Eiad — I found your portfolio.")}`,
    icon: <FaWhatsapp aria-hidden="true" />,
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-glow site-footer-glow--one" aria-hidden="true" />
      <div className="site-footer-glow site-footer-glow--two" aria-hidden="true" />

      <div className="site-container site-footer-inner">
        <div className="site-footer-cta">
          <div>
            <p><span aria-hidden="true" /> Next system</p>
            <h2 className="display-font">Complex problem? Let’s make it legible.</h2>
          </div>
          <Link to="/contact" className="site-footer-cta-link">
            Start a conversation <ArrowIcon />
          </Link>
        </div>

        <div className="site-footer-main">
          <div className="site-footer-brand">
            <Link to="/" className="site-footer-identity" aria-label="Eiad Soufan — Home">
              <BrandMark className="site-footer-mark" />
              <span>
                <strong className="display-font">Eiad Soufan</strong>
                <small>{profile.role}</small>
              </span>
            </Link>
            <p>{profile.headline}</p>
          </div>

          <nav className="site-footer-nav" aria-label="Footer navigation">
            <p>Navigate</p>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-contact">
            <p>Direct</p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            <span>{profile.location}</span>
          </div>

          <div className="site-footer-social">
            <p>Elsewhere</p>
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
          <p>© {year} Eiad Abdulhadi Soufan.</p>
          <p>Engineered with clarity, depth, and care.</p>
        </div>
      </div>
    </footer>
  );
}
