'use client'

export function EditorTopbar({ icon, title, previewHref }) {
  return (
    <div className="admin-topbar">
      <span className="admin-topbar__title">{icon} {title}</span>
      {previewHref && (
        <a className="admin-topbar__view-link" href={previewHref} target="_blank" rel="noopener">
          Önizleme ↗
        </a>
      )}
    </div>
  )
}

export function Section({ title, children }) {
  return (
    <div className="admin-form__section">
      <div className="admin-form__section-header">{title}</div>
      <div className="admin-form__body">{children}</div>
    </div>
  )
}

export function Field({ label, hint, children }) {
  return (
    <label className="admin-field">
      <span className="admin-label">{label}</span>
      {children}
      {hint && <span className="admin-field-hint">{hint}</span>}
    </label>
  )
}

export function ArrayItem({ label, onRemove, children }) {
  return (
    <div className="admin-array-item">
      <div className="admin-array-item__header">
        <span className="admin-array-item__label">{label}</span>
        {onRemove && (
          <button type="button" className="admin-remove-btn" onClick={onRemove}>Sil</button>
        )}
      </div>
      {children}
    </div>
  )
}

export function AddButton({ onClick, children }) {
  return (
    <button type="button" className="admin-add-btn" onClick={onClick}>+ {children}</button>
  )
}

export function SaveBar({ onSave, saving, msg }) {
  return (
    <div className="admin-save-bar">
      {msg ? <span className={`admin-save-msg admin-save-msg--${msg.type}`}>{msg.text}</span> : <span />}
      <button type="button" className="admin-save-btn" onClick={onSave} disabled={saving}>
        {saving ? 'Kaydediliyor…' : 'Kaydet'}
      </button>
    </div>
  )
}

export function Loading() {
  return <div className="admin-loading">Yükleniyor…</div>
}
