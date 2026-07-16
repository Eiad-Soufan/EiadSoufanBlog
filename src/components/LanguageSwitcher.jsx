import { useEffect, useId, useRef, useState } from "react";
import { LOCALES, LOCALE_META } from "../i18n/config";
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const focusIndexRef = useRef(null);
  const menuId = useId();
  const labels = ACCESSIBLE_COPY[locale] || ACCESSIBLE_COPY.en;

  const focusItem = (index) => {
    const nextIndex = (index + LOCALES.length) % LOCALES.length;
    focusIndexRef.current = nextIndex;
    window.requestAnimationFrame(() => itemRefs.current[nextIndex]?.focus());
  };

  const showMenu = (focusIndex = LOCALES.indexOf(locale)) => {
    focusIndexRef.current = focusIndex;
    setOpen(true);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    focusIndexRef.current = null;
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) closeMenu();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [locale]);

  useEffect(() => {
    if (open && focusIndexRef.current !== null) {
      focusItem(focusIndexRef.current);
    }
  }, [open]);

  const handleTriggerKeyDown = (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    if (event.key === "ArrowUp" || event.key === "End") {
      showMenu(LOCALES.length - 1);
      return;
    }

    showMenu(event.key === "Home" ? 0 : LOCALES.indexOf(locale));
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
    } else if (event.key === "Tab") {
      closeMenu();
    }
  };

  const selectLocale = (nextLocale) => {
    closeMenu({ restoreFocus: !onSelect });
    if (nextLocale !== locale) switchLocale(nextLocale);
    onSelect?.(nextLocale);
  };

  const handleRootKeyDown = (event) => {
    if (event.key !== "Escape" || !open) return;
    event.stopPropagation();
    closeMenu({ restoreFocus: true });
  };

  return (
    <div
      ref={rootRef}
      className={`locale-switcher locale-switcher--${variant} ${open ? "locale-switcher--open" : ""} ${className}`.trim()}
      onKeyDown={handleRootKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        className="locale-switcher__trigger"
        aria-label={`${labels.change}. ${labels.current}: ${localeMeta.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? closeMenu() : showMenu())}
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
      </button>

      {open ? (
        <div
          id={menuId}
          className="locale-switcher__menu"
          role="menu"
          aria-label={labels.menu}
        >
          <span className="locale-switcher__menu-kicker" aria-hidden="true">
            {labels.change}
          </span>
          <div className="locale-switcher__options">
            {LOCALES.map((code, index) => {
              const option = LOCALE_META[code];
              const active = code === locale;

              return (
                <button
                  key={code}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  type="button"
                  className={`locale-switcher__option ${active ? "locale-switcher__option--active" : ""}`}
                  role="menuitemradio"
                  aria-checked={active}
                  dir="ltr"
                  onClick={() => selectLocale(code)}
                  onKeyDown={(event) => handleItemKeyDown(event, index)}
                >
                  <span className="locale-switcher__code" dir="ltr">
                    {option.shortLabel}
                  </span>
                  <span className="locale-switcher__label" lang={code} dir={option.dir}>
                    {option.label}
                  </span>
                  <span className="locale-switcher__check" aria-hidden="true">
                    {active ? <CheckIcon /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
