const COLORS = {
  ink: "#1F1B16",
  coral: "#FF6B5E",
  teal: "#4FB6B0",
  yellow: "#F6C744",
};

/**
 * SketchrLogo — a hand-drawn "S" stroke inside a dashed marker-circle,
 * with a pencil nib at the start and an ink-dot where the stroke lifts off.
 * size: pixel width/height of the square logo.
 */
export default function SketchrLogo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sketchr logo"
    >
      <defs>
        <linearGradient id="sketchr-s-grad" x1="18" y1="12" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={COLORS.teal} />
          <stop offset="100%" stopColor={COLORS.coral} />
        </linearGradient>
      </defs>

      {/* dashed marker-circle frame */}
      <circle
        cx="30"
        cy="30"
        r="26"
        stroke={COLORS.ink}
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />

      {/* the hand-drawn S stroke */}
      <path
        d="M39,18 C39,11 25,11 23,18 C21,25 37,26 37,34 C37,41 21,43 19,36"
        stroke="url(#sketchr-s-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* pencil nib at the stroke's start */}
      <g transform="translate(39,18) rotate(45)">
        <rect x="-2.5" y="-13" width="5" height="10" rx="1" fill={COLORS.yellow} stroke={COLORS.ink} strokeWidth="1.2" />
        <path d="M-2.5,-3 L0,3 L2.5,-3 Z" fill={COLORS.ink} />
      </g>

      {/* ink dot where the pen lifts off */}
      <circle cx="19" cy="36" r="3.2" fill={COLORS.coral} stroke={COLORS.ink} strokeWidth="1" />
    </svg>
  );
}