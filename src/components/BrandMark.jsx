export default function BrandMark() {
  return (
    <span
      className="block h-10 w-10 shrink-0 drop-shadow-[0_10px_24px_rgb(0_0_0_/_0.32)] transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:scale-[1.025]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        className="h-full w-full"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="brand-mark-rim"
            x1="8"
            y1="6"
            x2="40"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5be0ff" stopOpacity="0.8" />
            <stop offset="1" stopColor="#a584ff" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient
            id="brand-mark-path"
            x1="13"
            y1="12"
            x2="35"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f4f7ff" />
            <stop offset="0.55" stopColor="#cfeaff" />
            <stop offset="1" stopColor="#a584ff" />
          </linearGradient>
        </defs>

        <rect x="2" y="2" width="44" height="44" rx="14" fill="#111928" />
        <rect
          x="2.75"
          y="2.75"
          width="42.5"
          height="42.5"
          rx="13.25"
          fill="none"
          stroke="url(#brand-mark-rim)"
          strokeOpacity="0.42"
          strokeWidth="1.5"
        />
        <path
          d="M14.5 33V14h15.25c3.2 0 5.25 1.75 5.25 4.35 0 2.65-2.05 4.4-5.25 4.4H20.5c-3.75 0-6 2.05-6 5.15 0 3.15 2.25 5.1 6 5.1H34"
          fill="none"
          stroke="url(#brand-mark-path)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="14" r="1.7" fill="#5be0ff" />
        <circle cx="34" cy="33" r="1.7" fill="#a584ff" />
      </svg>
    </span>
  );
}
