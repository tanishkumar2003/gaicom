export default function GaicomLogo({ className = "", size = 40 }) {
  return (
    <svg
      viewBox="0 0 300 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: size, width: "auto" }}
      aria-hidden="true"
    >
      {/* Outer oval */}
      <path
        d="
          M150 30
          C75 30 35 100 35 250
          C35 400 75 470 150 470
          C225 470 265 400 265 250
          C265 100 225 30 150 30
          Z
        "
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner horizontal sweep */}
      <path
        d="M75 240 Q150 215 225 240"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Top inner shape */}
      <path
        d="
          M150 95
          C120 95 100 125 100 155
          C100 175 200 175 200 155
          C200 125 180 95 150 95
          Z
        "
        fill="currentColor"
      />

      {/* Inner dot */}
      <circle cx="150" cy="135" r="10" fill="#000000" />

      {/* Vertical bar */}
      <rect
        x="140"
        y="285"
        width="20"
        height="130"
        rx="10"
        fill="currentColor"
      />
    </svg>
  );
}
