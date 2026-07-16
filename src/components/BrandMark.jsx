export default function BrandMark({ className = "h-10 w-10" }) {
  return (
    <span
      className={`block shrink-0 drop-shadow-[0_10px_24px_rgb(0_0_0_/_0.32)] transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:scale-[1.025] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        className="h-full w-full"
        focusable="false"
      >
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="13"
          fill="#101827"
          stroke="#8ea6c8"
          strokeOpacity="0.2"
        />
        <path
          d="M35 13.5H14V24H34V34.5H13"
          fill="none"
          stroke="#f4f7fb"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
