import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { LOCALES, LOCALE_META, replaceLocaleInPath } from "../i18n/config";
import { useLocale } from "../i18n/LocaleContext";

const ACCESSIBLE_COPY = {
  en: {
    change: "Change language",
    current: "Current language",
    menu: "Available languages",
  },
  ar: {
    change: "تغيير اللغة",
    current: "اللغة الحالية",
    menu: "اللغات المتاحة",
  },
  ms: {
    change: "Tukar bahasa",
    current: "Bahasa semasa",
    menu: "Bahasa yang tersedia",
  },
  fr: {
    change: "Changer de langue",
    current: "Langue actuelle",
    menu: "Langues disponibles",
  },
  de: {
    change: "Sprache ändern",
    current: "Aktuelle Sprache",
    menu: "Verfügbare Sprachen",
  },
};

function LanguageIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.1" />
      <path d="M2.9 10h14.2M10 2.9c2 2 3 4.35 3 7.1s-1 5.1-3 7.1M10 2.9C8 4.9 7 7.25 7 10s1 5.1 3 7.1" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4.5 6 3.5 3.5L11.5 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3.5 8.1 2.8 2.8 6.2-6.2" />
    </svg>
  );
}

/**
 * Compact locale control for both the desktop header and mobile navigation.
 * Use variant="mobile" inside the expanded mobile menu so the trigger fills
 * the available row. onSelect is useful when the parent wants to close its
 * own navigation after a locale change.
 */
export default function LanguageSwitcher({
  className = "",
  variant = "desktop",
  onSelect,
}) {
  const { locale, localeMeta, switchLocale } = useLocale();
  const location = useLocation();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const labels = ACCESSIBLE_COPY[locale] || ACCESSIBLE_COPY.en;

  const focusItem = (index) => {
    const nextIndex = (index + LOCALES.length) % LOCALES.length;
    rootRef.current.open = true;
    itemRefs.current[nextIndex]?.focus();
  };

  const closeMenu = (restoreFocus = false) => {
    if (restoreFocus) triggerRef.current?.focus();
    rootRef.current.open = false;
  };

  useEffect(() => {
    const onPointerDown = (event) => {
      const menu = rootRef.current;
      if (menu?.open && !menu.contains(event.target)) menu.open = false;
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const handleTriggerKeyDown = (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    if (event.key === "ArrowUp" || event.key === "End") {
      focusItem(LOCALES.length - 1);
      return;
    }

    focusItem(event.key === "Home" ? 0 : LOCALES.indexOf(locale));
  };

  const handleItemKeyDown = (event, index) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(index + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusItem(LOCALES.length - 1);
    } else if (event.key === " ") {
      event.preventDefault();
      selectLocale(LOCALES[index]);
    }
  };

  const selectLocale = (nextLocale) => {
    closeMenu(!onSelect);
    if (nextLocale !== locale) switchLocale(nextLocale);
    onSelect?.(nextLocale);
  };

  const localeHref = (nextLocale) =>
    `${replaceLocaleInPath(location.pathname, nextLocale)}${location.search}${location.hash}`;

  const handleLocaleClick = (event, nextLocale) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    selectLocale(nextLocale);
  };

  const handleRootKeyDown = (event) => {
    if (event.key !== "Escape" || !event.currentTarget.open) return;
    event.preventDefault();
    event.stopPropagation();
    closeMenu(true);
  };

  return (
    <details
      ref={rootRef}
      className={`locale-switcher locale-switcher--${variant} ${className}`.trim()}
      suppressHydrationWarning
      onKeyDown={handleRootKeyDown}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
    >
      <summary
        ref={triggerRef}
        className="locale-switcher__trigger"
        aria-label={`${labels.change}. ${labels.current}: ${localeMeta.label}`}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="locale-switcher__globe">
          <LanguageIcon />
        </span>
        <span className="locale-switcher__current" lang={locale} dir={localeMeta.dir}>
          <span className="locale-switcher__current-full">{localeMeta.label}</span>
          <span className="locale-switcher__current-short" aria-hidden="true">
            {localeMeta.shortLabel}
          </span>
        </span>
        <span className="locale-switcher__chevron">
          <ChevronIcon />
        </span>
      </summary>

      <div className="locale-switcher__menu">
        <span className="locale-switcher__menu-kicker" aria-hidden="true">
          {labels.change}
        </span>
        <ul className="locale-switcher__options" aria-label={labels.menu}>
          {LOCALES.map((code, index) => {
            const option = LOCALE_META[code];
            const active = code === locale;

            return (
              <li key={code}>
                <a
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  href={localeHref(code)}
                  hrefLang={code}
                  className={`locale-switcher__option ${active ? "locale-switcher__option--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  dir="ltr"
                  onClick={(event) => handleLocaleClick(event, code)}
                  onKeyDown={(event) => handleItemKeyDown(event, index)}
                >
                  <span className="locale-switcher__code" aria-hidden="true">{option.shortLabel}</span>
                  <span className="locale-switcher__label" lang={code} dir={option.dir}>
                    {option.label}
                  </span>
                  <span className="locale-switcher__check" aria-hidden="true">
                    {active ? <CheckIcon /> : null}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
