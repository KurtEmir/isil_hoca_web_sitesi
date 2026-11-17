const SIZE   = 640
const CENTER = SIZE / 2
const RADIUS = 228
const NODE_W = 176
const NODE_H = 78
const GAP    = 0.36

const point = (angle) => [CENTER + RADIUS * Math.cos(angle), CENTER + RADIUS * Math.sin(angle)]
const angleAt = (i, n) => -Math.PI / 2 + (i * 2 * Math.PI) / n
const fixed = (n) => Math.round(n * 10) / 10

export default function EcosystemDiagram({ items, center, titleId }) {
  const n     = items.length
  const lines = (center ?? '').split('\n').filter(Boolean)

  return (
    <svg className="ecosystem__svg" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-labelledby={titleId}>
      <title id={titleId}>{`${items.map(item => item.short || item.name).join(' → ')} → ${items[0].short || items[0].name}`}</title>

      <defs>
        <marker id="eco-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path className="ecosystem__arrow" d="M0 0L10 5L0 10z" />
        </marker>
      </defs>

      <circle className="ecosystem__ring" cx={CENTER} cy={CENTER} r={RADIUS} />

      {items.map((_, i) => {
        const [x1, y1] = point(angleAt(i, n) + GAP)
        const [x2, y2] = point(angleAt(i + 1, n) - GAP)
        return (
          <path
            key={i}
            className="ecosystem__arc"
            d={`M${fixed(x1)} ${fixed(y1)} A${RADIUS} ${RADIUS} 0 0 1 ${fixed(x2)} ${fixed(y2)}`}
            markerEnd="url(#eco-arrow)"
          />
        )
      })}

      <text className="ecosystem__center" x={CENTER} y={CENTER - (lines.length - 1) * 19}>
        {lines.map((line, i) => (
          <tspan key={i} x={CENTER} dy={i === 0 ? 0 : 38} className={i === 0 ? 'ecosystem__center-light' : 'ecosystem__center-bold'}>
            {line}
          </tspan>
        ))}
      </text>

      {items.map((item, i) => {
        const [x, y] = point(angleAt(i, n))
        return (
          <g key={i} className={`ecosystem__node${i === 0 ? ' ecosystem__node--core' : ''}`} transform={`translate(${fixed(x)} ${fixed(y)})`}>
            <rect x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} />
            <text className="ecosystem__name" y={-4}>{item.short || item.name}</text>
            {item.focus && <text className="ecosystem__focus" y={22}>{item.focus}</text>}
          </g>
        )
      })}
    </svg>
  )
}
