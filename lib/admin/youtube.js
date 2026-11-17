const PATTERNS = [
  /youtu\.be\/([\w-]{11})/,
  /[?&]v=([\w-]{11})/,
  /\/embed\/([\w-]{11})/,
  /\/shorts\/([\w-]{11})/,
  /\/live\/([\w-]{11})/,
]

export function extractYouTubeId(input) {
  const value = String(input ?? '').trim()
  if (!value) return null
  if (/^[\w-]{11}$/.test(value)) return value

  for (const pattern of PATTERNS) {
    const match = value.match(pattern)
    if (match) return match[1]
  }

  return value
}
