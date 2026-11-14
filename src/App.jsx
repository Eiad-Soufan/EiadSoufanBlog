import { Suspense, useEffect, useRef } from "react";
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
      </main>

      <Footer />
    </div>
  );
}
