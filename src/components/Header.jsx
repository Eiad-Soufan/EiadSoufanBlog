import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import BrandMark from "./BrandMark";
import LanguageSwitcher from "./LanguageSwitcher";

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

function DesktopNavLink({ to, children, end = false, reduceMotion = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `header-nav-link ${isActive ? "header-nav-link--active" : ""}`
      }
    >
      {({ isActive }) => (
        <>
          <span className="header-nav-link__label">{children}</span>
          <span className="header-nav-link__track" aria-hidden="true">
            <span className="header-nav-link__hover" />
            {isActive ? (
              <Motion.span
                layoutId="desktop-nav-active"
                className="header-nav-link__active"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 360, damping: 34 }
                }
              />
            ) : null}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function Header() {
  const reduceMotion = useHydrationSafeReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuId = useId();
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const firstLinkRef = useRef(null);
  const { copy, path } = useLocale();
  const navItems = [
    { to: path("home", "#selected-work"), label: copy.common.nav.work, end: true },
    { to: path("about"), label: copy.common.nav.about, end: true },
    { to: path("approach"), label: copy.common.nav.approach, end: true },
    { to: path("contact"), label: copy.common.nav.contact, end: true },
  ];

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
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

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
          to={path("home")}
          className="group inline-flex min-h-11 items-center gap-3 rounded-xl pe-2"
          aria-label={copy.common.nav.homeAria}
        >
          <BrandMark />
          <span className="leading-tight">
            <span className="display-font block text-sm font-bold tracking-[-0.02em] text-ink sm:text-[0.96rem]">
              Eiad Soufan
            </span>
            <span className="mt-0.5 hidden text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted sm:block">
              {copy.common.role}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <nav className="flex items-center gap-1" aria-label={copy.common.nav.primaryAria}>
            {navItems.map((item) => (
              <DesktopNavLink
                key={item.to}
                to={item.to}
                end={item.end}
                reduceMotion={reduceMotion}
              >
                {item.label}
              </DesktopNavLink>
            ))}
          </nav>

          <LanguageSwitcher className="ms-2" />
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-[14px] border border-line/20 bg-surface/75 text-ink transition-colors hover:border-line/35 hover:bg-surface-raised lg:hidden"
          aria-label={menuOpen ? copy.common.nav.closeMenu : copy.common.nav.openMenu}
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
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-20 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-line/[0.24] bg-canvas/[0.86] px-[var(--site-gutter)] pb-5 pt-3 shadow-[0_28px_70px_-30px_rgb(0_0_0_/_0.95)] backdrop-blur-[24px] backdrop-saturate-[1.4] md:max-h-[calc(100dvh-4.5rem)] lg:hidden"
          >
            <nav
              className="mx-auto flex max-w-[var(--site-width)] flex-col rounded-2xl border border-line/15 bg-surface/65 p-2"
              aria-label={copy.common.nav.mobileAria}
            >
              {navItems.map(
                (item, index) => (
                  <NavLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `header-mobile-nav-link ${
                        isActive ? "header-mobile-nav-link--active" : ""
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowIcon />
                  </NavLink>
                ),
              )}
            </nav>
            <div className="mx-auto mt-2 max-w-[var(--site-width)]">
              <LanguageSwitcher
                variant="mobile"
                onSelect={() => setMenuOpen(false)}
              />
            </div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
