import { createServerSupabaseClient } from '@/lib/supabase/server'

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone:  'Europe/Istanbul',
})

export default async function MessagesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: messages, error } = await supabase
    .from('messages')
    .select('id, name, email, organization, subject, message, created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar__title">
          ▤ Mesajlar
          {messages && <span className="admin-count">{messages.length}</span>}
        </span>
      </div>

      <div className="admin-content">
        {error && (
          <div className="admin-setup-banner admin-setup-banner--error">
            <p>
              Mesajlar okunamadı: {error.message}. supabase/schema.sql dosyasının güncel halinin çalıştırıldığından
              ve e-postanın "admins" tablosunda olduğundan emin olun.
            </p>
          </div>
        )}

        {!error && messages.length === 0 && (
          <div className="admin-empty">Henüz iletişim formundan gelen mesaj yok.</div>
        )}

        {!error && messages.length > 0 && (
          <div className="admin-messages">
            {messages.map(m => (
              <article key={m.id} className="admin-message">
                <div className="admin-message__head">
                  <h2 className="admin-message__subject">{m.subject}</h2>
                  <time className="admin-message__date" dateTime={m.created_at}>
                    {dateFormatter.format(new Date(m.created_at))}
                  </time>
                </div>
                <p className="admin-message__meta">
                  <strong>{m.name}</strong>
                  <span>·</span>
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + m.subject)}`}>{m.email}</a>
                  {m.organization && <><span>·</span><span>{m.organization}</span></>}
                </p>
                <p className="admin-message__body">{m.message}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
