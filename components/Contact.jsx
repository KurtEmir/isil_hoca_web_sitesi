'use client'
import { useState } from 'react'
import { site } from '../content/data'

export default function Contact({ contact }) {
  const [status,   setStatus]   = useState('')
  const [sending,  setSending]  = useState(false)
  const l = contact.formLabels

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    // TODO: Replace with real API call
    setTimeout(() => {
      setSending(false)
      setStatus('Mesajınız alındı, en kısa sürede dönüş yapılacaktır.')
      e.target.reset()
    }, 1200)
  }

  return (
    <section className="section section--dark" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info reveal">
            <span className="t-eyebrow">{contact.eyebrow}</span>
            <h2 className="contact__info-title" id="contact-title">{contact.title}</h2>
            <p className="contact__info-desc">{contact.description}</p>

            <a
              className="contact__email-link"
              href={`mailto:${contact.email}`}
              aria-label="E-posta gönder"
            >
              <span aria-hidden="true">✉</span>
              <span>{contact.email}</span>
            </a>

            <p className="contact__social-label">Sosyal Medya</p>
            <div className="contact__social-links">
              {Object.values(site.social).map(s => (
                <a
                  key={s.label}
                  className="contact__social-btn"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form
            className="contact-form reveal reveal--delay-2"
            onSubmit={handleSubmit}
            noValidate
            aria-label="İletişim formu"
          >
            <div className="form__row">
              <div className="form__group">
                <label className="form__label" htmlFor="f-name">{l.name}</label>
                <input className="form__input" id="f-name" type="text" name="name" placeholder="Adınız Soyadınız" autoComplete="name" required />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="f-email">{l.email}</label>
                <input className="form__input" id="f-email" type="email" name="email" placeholder="ornek@mail.com" autoComplete="email" required />
              </div>
            </div>

            <div className="form__row">
              <div className="form__group">
                <label className="form__label" htmlFor="f-org">{l.organization}</label>
                <input className="form__input" id="f-org" type="text" name="organization" placeholder="Şirket / Kurum" />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="f-subject">{l.subject}</label>
                <input className="form__input" id="f-subject" type="text" name="subject" placeholder="Konuşmacı daveti" required />
              </div>
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="f-message">{l.message}</label>
              <textarea className="form__textarea" id="f-message" name="message" placeholder="Mesajınızı buraya yazın..." rows={5} required />
            </div>

            <button className="form__submit" type="submit" disabled={sending}>
              {sending ? 'Gönderiliyor…' : l.submit}
            </button>

            {status && (
              <p className="form__status is-visible" role="status">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
