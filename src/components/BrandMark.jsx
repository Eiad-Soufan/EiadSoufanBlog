const E_PATH = "M4 8h37l-6 7H15v5.5h17l-5.5 7H15V33h23l-6 7H4Z";
const S_PATH = "M45 8h25l-6 7H46c-2.5 0-4 1.1-4 3.2 0 1.8 1.4 2.7 4.2 2.7h11.2c8.8 0 13.6 3.3 13.6 9.4C71 36.7 65.8 40 57.2 40H31l6-7h20.7c2.8 0 4.2-1 4.2-2.7 0-1.6-1.4-2.4-4.4-2.4H46.2c-8.4 0-13.1-3.2-13.1-9.3C33.1 12 37.4 8 45 8Z";

export default function BrandMark({ className = "h-9 w-[3.4rem]" }) {
  return (
    <span
      className={`block shrink-0 overflow-visible text-ink drop-shadow-[0_10px_24px_rgb(0_0_0_/_0.38)] transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:scale-[1.025] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 74 48"
        className="h-full w-full"
        focusable="false"
        shapeRendering="geometricPrecision"
      >
        <path d={E_PATH} fill="currentColor" fillOpacity="0.92" />
        <path d={S_PATH} fill="currentColor" />
      </svg>
    </span>
  );
}
