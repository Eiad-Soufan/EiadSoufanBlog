import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import BrandMark from "./BrandMark";

const NAV_ITEMS = [
  { to: "/#selected-work", label: "Work" },
  { to: "/about-us", label: "About" },
  { to: "/why-us", label: "Approach" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="M5.5 14.5 14.5 5.5M7 5.5h7.5V13"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <span className="relative block h-5 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-[5px] h-px w-5 bg-current transition-transform duration-200 ease-premium ${
          open ? "translate-y-[5px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[10px] h-px w-5 bg-current transition-opacity duration-150 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-[15px] h-px w-5 bg-current transition-transform duration-200 ease-premium ${
          open ? "-translate-y-[5px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function DesktopNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative inline-flex min-h-11 items-center px-3 text-sm font-semibold transition-colors duration-200 ${
          isActive ? "text-ink" : "text-muted hover:text-ink"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span className="absolute inset-x-3 bottom-1.5 h-px overflow-hidden rounded-full bg-line/15">
            {isActive ? (
              <Motion.span
                layoutId="desktop-nav-active"
                className="block h-full w-full bg-gradient-to-r from-cyan to-violet"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            ) : null}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuId = useId();
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 80);

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      triggerRef.current?.focus();
    };

    const onPointerDown = (event) => {
      if (
        menuRef.current?.contains(event.target) ||
        triggerRef.current?.contains(event.target)
      ) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-[200] isolate h-16 md:h-[72px]">
      <div
        aria-hidden="true"
        className={`header-glass ${scrolled ? "header-glass--scrolled" : ""}`}
      />

      <div className="site-container relative z-10 flex h-full items-center justify-between">
        <Link
          to="/"
          className="group inline-flex min-h-11 items-center gap-3 rounded-xl pr-2"
          aria-label="Eiad Soufan — Home"
        >
          <BrandMark />
          <span className="leading-tight">
            <span className="display-font block text-sm font-bold tracking-[-0.02em] text-ink sm:text-[0.96rem]">
              Eiad Soufan
            </span>
            <span className="mt-0.5 hidden text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted sm:block">
              Lead Software Engineer
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <nav className="flex items-center" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <DesktopNavLink key={item.to} to={item.to}>
                {item.label}
              </DesktopNavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="ml-3 inline-flex min-h-11 items-center gap-2 rounded-[14px] border border-cyan/20 bg-ink px-4 text-sm font-bold text-canvas shadow-[0_10px_30px_-18px_rgb(var(--color-cyan)_/_0.75)] transition duration-200 ease-premium hover:-translate-y-0.5 hover:bg-white focus-visible:outline-offset-2"
          >
            Let&apos;s talk
            <ArrowIcon />
          </Link>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-[14px] border border-line/20 bg-surface/75 text-ink transition-colors hover:border-line/35 hover:bg-surface-raised md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <Motion.div
            ref={menuRef}
            id={menuId}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-20 border-b border-line/[0.24] bg-canvas/[0.86] px-[var(--site-gutter)] pb-5 pt-3 shadow-[0_28px_70px_-30px_rgb(0_0_0_/_0.95)] backdrop-blur-[24px] backdrop-saturate-[1.4] md:hidden"
          >
            <nav
              className="mx-auto flex max-w-[var(--site-width)] flex-col rounded-2xl border border-line/15 bg-surface/65 p-2"
              aria-label="Mobile navigation"
            >
              {[...NAV_ITEMS, { to: "/contact", label: "Contact" }].map(
                (item, index) => (
                  <NavLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-surface-raised text-ink"
                          : "text-muted hover:bg-surface-raised/60 hover:text-ink"
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowIcon />
                  </NavLink>
                ),
              )}
            </nav>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
