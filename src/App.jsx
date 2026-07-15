import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";

const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WhyUs = lazy(() => import("./pages/WhyUs"));

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    let firstFrame;
    let secondFrame;

    if (location.hash) {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          const target = document.getElementById(location.hash.slice(1));
          target?.scrollIntoView({ block: "start" });
        });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return () => {
      if (firstFrame) window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [location.pathname, location.hash]);

  return null;
}

function PageFallback() {
  return (
    <div className="site-container grid min-h-[45vh] place-items-center" role="status">
      <span className="text-sm font-semibold text-muted">Loading page…</span>
    </div>
  );
}

export default function App() {
  return (
    <div className="site-shell flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <RouteEffects />
      <Header />

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="min-w-0 flex-1 outline-none"
      >
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/whyus" element={<WhyUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
