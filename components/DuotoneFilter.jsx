export default function DuotoneFilter({ id }) {
  return (
    <svg className="duotone-filter" aria-hidden="true" focusable="false">
      <filter id={id} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.08 0.767 0.998" />
          <feFuncG type="table" tableValues="0.053 0.069 0.983" />
          <feFuncB type="table" tableValues="0.049 0.08 0.981" />
        </feComponentTransfer>
      </filter>
    </svg>
  )
}
