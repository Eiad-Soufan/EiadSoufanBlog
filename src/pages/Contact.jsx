// src/pages/Contact.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

/* ===== Variants موحّدة وخفيفة ===== */
const sectionParent = {
  hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)", scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.7 },
  },
};

export default function Contact() {
  /* ===== نموذج البيانات ===== */
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessType: "",
    message: "",
    yourQuote: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `
📩 New Quote Request

👤 Name: ${form.name}
📧 Email: ${form.email}
🏢 Business Type: ${form.businessType || "N/A"}
📝 Message: ${form.message}
💰 Quote (MYR): ${form.yourQuote}
`.trim();

    const phone = "60183035842"; // بدون +
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  /* ===== تحكّم مركزي بالحركة لمنع الرفرفة ===== */
  const controls = useAnimation();
  const { ref, inView } = useInView({
    // هامش آمن يمنع التذبذب عند الحواف، مع تحفيز سريع عند الدخول
    rootMargin: "-12% 0px -18% 0px",
    threshold: 0.15,
    triggerOnce: false,
  });

  useEffect(() => {
    let t;
    if (inView) {
      controls.start("show");
    } else {
      // تأخير بسيط لإرجاع الحالة يمنع الرفرفة عند الحافة
      t = setTimeout(() => controls.start("hidden"), 150);
    }
    return () => clearTimeout(t);
  }, [inView, controls]);

  return (
    <section className="relative min-h-screen overflow-hidden text-indigo-50">
      {/* الخلفية — داكنة متناسقة مع الهوية */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0b1020 0%, #141229 40%, #0f172a 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-14 -left-10 h-[420px] w-[560px] blur-2xl opacity-40"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.22), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -right-12 h-[500px] w-[720px] blur-[36px] opacity-35"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,0.20), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="absolute top-[22%] left-[12%] h-[260px] w-[260px] blur-2xl opacity-22"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.16), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="absolute top-[36%] right-[14%] h-[300px] w-[300px] blur-2xl opacity-22"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.16), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.75) 1px, transparent 1px), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize:
              "220px 220px, 240px 240px, 260px 260px, 280px 280px",
          }}
        />
      </div>

      {/* المحتوى + تحكم الحركة */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20">
        <motion.div ref={ref} variants={sectionParent} initial="hidden" animate={controls}>
          {/* العنوان */}
           <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center
                       leading-tight md:leading-[1.12] pb-[3px] mb-10 overflow-visible
                       bg-clip-text text-transparent bg-gradient-to-b
                       from-indigo-200 via-violet-200 to-sky-200 drop-shadow"
          >
            Start Your Project With Eiad
          </motion.h1>


          {/* بطاقة الفورم */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-6 sm:p-8 shadow-lg shadow-indigo-950/20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="block text-sm font-semibold text-indigo-200 mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="w-full rounded-xl bg-white/10 text-indigo-50 placeholder-indigo-200/60
                             ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-300/60
                             px-4 py-3 outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-sm font-semibold text-indigo-200 mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="w-full rounded-xl bg-white/10 text-indigo-50 placeholder-indigo-200/60
                             ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-300/60
                             px-4 py-3 outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="businessType"
                  className="block text-sm font-semibold text-indigo-200 mb-2"
                >
                  Your Business Type (e.g. Mini Market)
                </label>
                <input
                  id="businessType"
                  type="text"
                  name="businessType"
                  placeholder="Your Business Type (e.g. Mini Market)"
                  value={form.businessType}
                  onChange={handleChange}
                  autoComplete="organization-title"
                  className="w-full rounded-xl bg-white/10 text-indigo-50 placeholder-indigo-200/60
                             ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-300/60
                             px-4 py-3 outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-indigo-200 mb-2">
                  What kind of project do you need?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="What kind of project do you need?"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/10 text-indigo-50 placeholder-indigo-200/60
                             ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-300/60
                             px-4 py-3 outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="yourQuote" className="block text-sm font-semibold text-indigo-200 mb-2">
                  How much can you pay? (USD)
                </label>
                <input
                  id="yourQuote"
                  type="number"
                  name="yourQuote"
                  placeholder="How much can you pay? (USD)"
                  value={form.yourQuote}
                  onChange={handleChange}
                  required
                  min={0}
                  step="1"
                  inputMode="numeric"
                  className="w-full rounded-xl bg-white/10 text-indigo-50 placeholder-indigo-200/60
                             ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-300/60
                             px-4 py-3 outline-none transition-all"
                />
              </div>
            </div>

            {/* زر موحّد */}
            <div className="mt-7 flex items-center justify-center">
              <motion.button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3
                           font-semibold text-white
                           bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600
                           shadow-[0_6px_20px_-10px_rgba(79,70,229,.65)]
                           hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(79,70,229,.75)]
                           active:translate-y-0 active:shadow-[0_6px_20px_-10px_rgba(79,70,229,.65)]
                           focus:outline-none focus:ring-2 focus:ring-violet-300/70
                           focus:ring-offset-2 focus:ring-offset-slate-900
                           transition-all duration-200 will-change-transform"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.985 }}
              >
                Send via WhatsApp
              </motion.button>
            </div>

            {/* فاصلة ناعمة */}
            <div className="mt-8 border-t border-white/10" />

            {/* خيار البريد */}
            <motion.div variants={fadeUp} className="mt-6 text-center text-sm text-indigo-100/90">
              Or email me at{" "}
              <a
                href={`mailto:eiad.soufan.2@gmail.com?subject=Quote Your Store&body=${encodeURIComponent(
                  `Name: ${form.name}\nEmail: ${form.email}\nBusiness Type: ${form.businessType}\nMessage: ${form.message}\nQuote (MYR): ${form.yourQuote}`
                )}`}
                className="underline decoration-indigo-300/70 underline-offset-4 hover:decoration-indigo-200 hover:text-white transition"
              >
                eiad.soufan.2@gmail.com
              </a>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

