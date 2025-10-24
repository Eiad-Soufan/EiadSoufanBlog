// App.jsx
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WhyUs from "./pages/WhyUs";

export default function App() {
  return (
    // ⬇⬇⬇  استبدل الخلفية البيضاء بـ bg-app الداكنة
    <div className="min-h-screen flex flex-col bg-app">
      {/* Accessible skip link (appears only on keyboard focus) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-3 left-3 z-[1000] px-3 py-2 rounded-lg bg-blue-600 text-white shadow"
      >
        Skip to content
      </a>

      <Header />

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="flex-1 w-full px-0 outline-none"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
