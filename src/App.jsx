import { lazy, Suspense, useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Seo from "./components/Seo";
import {
  LEGACY_PAGE_PATHS,
  getBrowserLocale,
  isLocale,
  localizedPath,
} from "./i18n/config";
import { useLocale } from "./i18n/LocaleContext";
import Home from "./pages/Home";

const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WhyUs = lazy(() => import("./pages/WhyUs"));

function RouteEffects() {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    let firstFrame;
    let secondFrame;
    let focusFrame;
    const pathChanged = previousPathRef.current !== location.pathname;
    previousPathRef.current = location.pathname;

    if (location.hash) {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          const target = document.getElementById(location.hash.slice(1));
          target?.scrollIntoView({ block: "start" });
        });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (pathChanged) {
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
  }, [location.pathname, location.hash]);

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

function LocaleRoute({ children }) {
  const { locale } = useParams();
  if (!isLocale(locale)) return <NotFound />;
  return children;
}

export default function App() {
  const { copy } = useLocale();

  return (
    <div className="site-shell flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        {copy.common.skipToContent}
      </a>

      <RouteEffects />
      <Seo />
      <Header />

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="min-w-0 flex-1 outline-none"
      >
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<RootGateway />} />
            <Route path="/:locale" element={<LocaleRoute><Home /></LocaleRoute>} />
            <Route path="/:locale/about" element={<LocaleRoute><AboutUs /></LocaleRoute>} />
            <Route path="/:locale/approach" element={<LocaleRoute><WhyUs /></LocaleRoute>} />
            <Route path="/:locale/contact" element={<LocaleRoute><Contact /></LocaleRoute>} />
            {Object.entries(LEGACY_PAGE_PATHS).map(([legacyPath, page]) => (
              <Route
                key={legacyPath}
                path={`/${legacyPath}`}
                element={<Navigate replace to={localizedPath("en", page)} />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
