import { motion as Motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useHydrationSafeReducedMotion from "../hooks/useHydrationSafeReducedMotion";
import { useLocale } from "../i18n/LocaleContext";
import BrandMark from "./BrandMark";
import LanguageSwitcher from "./LanguageSwitcher";

function MenuIcon() {
  return (
    <span className="header-menu-icon" aria-hidden="true">
      <span />
      <span />
      <span />
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
          {children}
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const firstLinkRef = useRef(null);
  const { copy, locale, path } = useLocale();
  const homePath = path("home");
  const navItems = [
    { to: homePath, label: copy.common.nav.home, end: true },
    { to: path("about"), label: copy.common.nav.about, end: true },
    { to: path("approach"), label: copy.common.nav.approach, end: true },
    { to: path("contact"), label: copy.common.nav.contact, end: true },
  ];

  const closeMenu = useCallback((restoreFocus = false) => {
    const menu = menuRef.current;
    if (!menu?.open) return;
    if (restoreFocus) triggerRef.current?.focus();
    menu.open = false;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event) => {
      if (event.matches) closeMenu();
    };
    const closeOnHistory = () => closeMenu();
    const closeOnOutsidePointer = (event) => {
      if (!menuRef.current?.contains(event.target)) closeMenu();
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    window.addEventListener("popstate", closeOnHistory);
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("popstate", closeOnHistory);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [closeMenu]);

  return (
    <header className="sticky top-0 z-[200] isolate h-16 md:h-[72px]">
      <div
        aria-hidden="true"
        className={`header-glass ${scrolled ? "header-glass--scrolled" : ""}`}
      />

      <div className="header-container site-container relative z-10 flex h-full items-center justify-between">
        <Link
          to={homePath}
          className="group inline-flex min-h-11 shrink-0 items-center gap-3 rounded-xl pe-2"
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

        <div className="header-desktop-tools hidden shrink-0 items-center gap-2 lg:flex">
          <nav className="flex items-center gap-2" aria-label={copy.common.nav.primaryAria}>
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

        <details
          ref={menuRef}
          className="header-mobile-menu lg:hidden"
          suppressHydrationWarning
          onToggle={(event) => {
            if (event.target === event.currentTarget && event.currentTarget.open && document.activeElement === triggerRef.current) {
              firstLinkRef.current?.focus({ preventScroll: true });
            }
          }}
          onBlur={(event) => {
            if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
          }}
          onKeyDown={(event) => {
            if (event.key !== "Escape" || !event.currentTarget.open) return;
            event.preventDefault();
            closeMenu(true);
          }}
        >
          <summary
            ref={triggerRef}
            className="header-mobile-toggle grid h-11 w-11 cursor-pointer place-items-center rounded-md text-muted transition-colors hover:text-ink"
            aria-label={copy.common.nav.mobileAria}
          >
            <MenuIcon />
          </summary>
          <div className="header-mobile-panel absolute inset-x-0 top-full z-20 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-line/[0.24] bg-canvas/[0.86] px-[var(--site-gutter)] pb-5 pt-3 shadow-[0_28px_70px_-30px_rgb(0_0_0_/_0.95)] backdrop-blur-[24px] backdrop-saturate-[1.4] md:max-h-[calc(100dvh-4.5rem)]">
            <nav
              className="mx-auto flex max-w-[var(--site-width)] flex-col"
              aria-label={copy.common.nav.mobileAria}
            >
              {navItems.map(
                (item, index) => (
                  <NavLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => closeMenu(location.pathname === item.to && !location.hash)}
                    className={({ isActive }) =>
                      `header-mobile-nav-link ${
                        isActive ? "header-mobile-nav-link--active" : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>
            <div className="mx-auto mt-2 max-w-[var(--site-width)] border-t border-line/15 pt-1">
              <LanguageSwitcher
                variant="mobile"
                onSelect={(nextLocale) => closeMenu(nextLocale === locale)}
              />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
