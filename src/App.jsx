import { Component, Suspense, useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation, useNavigationType, useParams } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Seo from "./components/Seo";
import {
  LEGACY_PAGE_PATHS,
  getBrowserLocale,
  getPageFromPath,
  isLocale,
  localizedPath,
} from "./i18n/config";
import { useLocale } from "./i18n/LocaleContext";
import Home from "./pages/Home";
import { clientRouteComponents } from "./pages/routeComponents";

function RouteEffects() {
  const { hash, key, pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPathRef = useRef(pathname);
  const followsSectionLink = hash === "#selected-work" || hash === "#publications";
  const goesHome = !hash && getPageFromPath(pathname) === "home";
  const navigationKey = navigationType !== "POP" && (followsSectionLink || goesHome)
    ? key
    : null;

  useEffect(() => {
    let firstFrame;
    let secondFrame;
    let focusFrame;
    const pathChanged = previousPathRef.current !== pathname;
    previousPathRef.current = pathname;

    if (hash) {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          const target = document.getElementById(hash.slice(1));
          const heading = followsSectionLink && navigationKey
            ? document.getElementById(`${hash.slice(1)}-title`)
            : null;
          target?.scrollIntoView({ block: "start", behavior: heading ? "instant" : "auto" });
          heading?.focus({ preventScroll: true });
        });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (pathChanged || navigationKey) {
        focusFrame = window.requestAnimationFrame(() => {
          document.getElementById("main-content")?.focus({ preventScroll: true });
        });
      }
    }

    return () => {
      if (firstFrame) window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      if (focusFrame) window.cancelAnimationFrame(focusFrame);
    };
  }, [pathname, hash, followsSectionLink, navigationKey]);

  return null;
}

function PageFallback() {
  const { copy } = useLocale();

  return (
    <div className="site-container grid min-h-[45vh] place-items-center" role="status">
      <span className="text-sm font-semibold text-muted">{copy.common.loading}</span>
    </div>
  );
}

function PageErrorFallback() {
  const { copy } = useLocale();
  const titleRef = useRef(null);
  const { title, message, retry } = copy.common.pageLoadError;

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div className="site-container grid min-h-[45vh] items-center py-16">
      <section aria-labelledby="page-error-title" className="max-w-xl rounded-3xl border border-line/20 bg-surface p-6 sm:p-8">
        <h1 ref={titleRef} id="page-error-title" tabIndex={-1} className="display-font text-2xl font-bold leading-snug text-ink">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{message}</p>
        <button
          type="button"
          className="page-hero-action page-hero-action--primary mt-6"
          onClick={() => window.location.reload()}
        >
          {retry}
        </button>
      </section>
    </div>
  );
}

class RouteErrorBoundary extends Component {
  state = { failed: false, locationKey: this.props.locationKey };

  static getDerivedStateFromProps({ locationKey }, state) {
    return locationKey === state.locationKey ? null : { failed: false, locationKey };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <PageErrorFallback /> : this.props.children;
  }
}

function RootGateway() {
  return <Navigate replace to={localizedPath(getBrowserLocale())} />;
}

function LocaleRoute({ children, notFoundElement }) {
  const { locale } = useParams();
  if (!isLocale(locale)) return notFoundElement;
  return children;
}

export default function App({ routeComponents = clientRouteComponents }) {
  const { copy } = useLocale();
  const { key: locationKey } = useLocation();
  const {
    about: AboutPage,
    approach: ApproachPage,
    contact: ContactPage,
    notFound: NotFoundPage,
  } = routeComponents;

  return (
    <div className="site-shell flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        {copy.common.skipToContent}
      </a>

      <Seo />
      <Header />

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="min-w-0 flex-1 outline-none"
      >
        <RouteErrorBoundary locationKey={locationKey}>
          <Suspense fallback={<PageFallback />}>
            <RouteEffects />
            <Routes>
              <Route path="/" element={<RootGateway />} />
              <Route
                path="/:locale"
                element={
                  <LocaleRoute notFoundElement={<NotFoundPage />}>
                    <Home />
                  </LocaleRoute>
                }
              />
              <Route
                path="/:locale/about"
                element={
                  <LocaleRoute notFoundElement={<NotFoundPage />}>
                    <AboutPage />
                  </LocaleRoute>
                }
              />
              <Route
                path="/:locale/approach"
                element={
                  <LocaleRoute notFoundElement={<NotFoundPage />}>
                    <ApproachPage />
                  </LocaleRoute>
                }
              />
              <Route
                path="/:locale/contact"
                element={
                  <LocaleRoute notFoundElement={<NotFoundPage />}>
                    <ContactPage />
                  </LocaleRoute>
                }
              />
              {Object.entries(LEGACY_PAGE_PATHS).map(([legacyPath, page]) => (
                <Route
                  key={legacyPath}
                  path={`/${legacyPath}`}
                  element={<Navigate replace to={localizedPath("en", page)} />}
                />
              ))}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
