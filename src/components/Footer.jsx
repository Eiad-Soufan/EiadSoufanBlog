// src/components/Footer.jsx
import { FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-0 text-slate-100">
      {/* موجة زخرفية علوية */}
      <div aria-hidden="true" className="absolute -top-px left-0 w-full">
        <svg viewBox="0 0 1440 100" className="block h-[72px] w-full text-[#0b1020]" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0,64L80,69.3C160,75,320,85,480,96C640,107,800,117,960,106.7C1120,96,1280,64,1360,48L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      {/* خلفية متناسقة مع كل الصفحات */}
      <div className="relative overflow-hidden">
        {/* التدرّج الأساسي */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0b1020 0%, #141229 50%, #0f172a 100%)",
          }}
        />
        {/* بقع توهج رقيقة */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 360px at 12% 0%, rgba(99,102,241,.22), transparent 60%), radial-gradient(660px 320px at 88% 18%, rgba(147,51,234,.18), transparent 55%), radial-gradient(620px 340px at 50% 100%, rgba(56,189,248,.14), transparent 55%)",
          }}
        />
        {/* نسيج نجوم خفيف */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.75) 1px, transparent 1px), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "220px 220px, 240px 240px, 260px 260px, 280px 280px",
          }}
        />

        {/* شريط زخرفي رقيق أعلى المحتوى */}
        <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

        {/* المحتوى */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* التعريف الشخصي */}
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-violet-200 to-sky-200 drop-shadow">
                Eiad Abdulhadi Soufan
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-indigo-100/90">
                Full-stack engineer — modern React/Tailwind UIs, Django/DRF APIs, and applied AI (LLMs, RAG, embeddings). Teaching, data, and delivery you can trust.
              </p>
            </div>

            {/* الروابط السريعة */}
            <div>
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="mt-4 space-y-1 text-sm">
                {[
                  { name: "Home", to: "/" },
                  { name: "About", to: "/about-us" },   // توحيد مع الهيدر
                  { name: "Why Eiad", to: "/why-us" },  // توحيد مع الهيدر
                  { name: "Contact", to: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-indigo-100 transition-all duration-200
                                 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 block h-px w-0 bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* معلومات التواصل */}
            <div>
              <h4 className="text-lg font-semibold text-white">Contact</h4>
              <ul className="mt-4 space-y-2 text-sm text-indigo-100">
                <li>
                  <span className="font-medium text-white">Email:</span> eiad.soufan.2@gmail.com
                </li>
                <li>
                  <span className="font-medium text-white">Phone:</span> +60 18-303 5842
                </li>
                <li>
                  <span className="font-medium text-white">Location:</span> Kuala Lumpur, Malaysia
                </li>
              </ul>
            </div>

            {/* السوشيال */}
            <div>
              <h4 className="text-lg font-semibold text-white">Follow</h4>
              <div className="mt-4 flex items-center gap-4">
                {[
                  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/eiad-soufan-39924a178/", label: "LinkedIn" },
                  { icon: <FaWhatsapp />, href: `https://wa.me/60183035842?text=${encodeURIComponent("Hi Eiad!")}`, label: "WhatsApp" },
                  { icon: <FaTelegramPlane />, href: "https://t.me/ESBusinessaccount", label: "Telegram" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full
                               bg-white/10 ring-1 ring-white/15 backdrop-blur
                               transition-all duration-300 hover:bg-white/15 hover:ring-white/25
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    {/* لمعة حلقيّة ناعمة */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "conic-gradient(from 0deg, rgba(99,102,241,.45), rgba(147,51,234,.35), rgba(56,189,248,.35), rgba(99,102,241,.45))",
                        mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                        WebkitMask:
                          "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                        padding: "1px",
                      }}
                    />
                    <span className="relative transition-transform duration-300 group-hover:-translate-y-[1px]">
                      {s.icon}
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-4 text-xs text-indigo-200/80">Let’s build something legendary.</p>
            </div>
          </div>

          {/* الشريط السفلي */}
          <div className="mt-12 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-indigo-200/80">&copy; {year} Eiad Abdulhadi Soufan. All rights reserved.</p>
          </div>
        </div>

        {/* شريط زخرفي سفلي خفيف */}
        <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-violet-400/35 to-transparent" />
      </div>
    </footer>
  );
}
