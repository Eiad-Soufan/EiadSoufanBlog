/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        "canvas-soft": "rgb(var(--color-canvas-soft) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--color-surface-raised) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        ink: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        brand: "rgb(var(--color-brand) / <alpha-value>)",
        cyan: "rgb(var(--color-cyan) / <alpha-value>)",
        violet: "rgb(var(--color-violet) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      transitionTimingFunction: {
        premium: "var(--ease-premium)",
      },
    },
  },
  plugins: [],
}
