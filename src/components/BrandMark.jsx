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
        <rect x="3" y="3" width="42" height="42" rx="13" fill="#101827" />
        <path
          d="M32.5 14.5H16.5V33.5H32.5M16.5 24H28.5"
          fill="none"
          stroke="#eaf7ff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32.5" cy="14.5" r="1.55" fill="#5be0ff" />
        <circle cx="28.5" cy="24" r="1.55" fill="#cfefff" />
        <circle cx="32.5" cy="33.5" r="1.55" fill="#a584ff" />
      </svg>
    </span>
  );
}
