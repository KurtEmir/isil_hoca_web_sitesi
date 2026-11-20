const SHAPES = {
  mic: (
    <>
      <rect x="12" y="4" width="8" height="15" rx="4" />
      <path d="M7.5 15a8.5 8.5 0 0 0 17 0M16 23.5V28M11 28h10" />
    </>
  ),
  board: (
    <>
      <rect x="4" y="5" width="24" height="16" />
      <path d="M9 11h9M9 15h5M11 21l-3 7M21 21l3 7M16 21v3" />
    </>
  ),
  compass: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="m20.5 11.5-2.6 6.4-6.4 2.6 2.6-6.4z" />
    </>
  ),
}

export const ICON_NAMES = Object.keys(SHAPES)

export default function Icon({ name, className = '' }) {
  const shape = SHAPES[name]
  if (!shape) return null

  return (
    <svg
      className={`icon${className ? ` ${className}` : ''}`}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  )
}
