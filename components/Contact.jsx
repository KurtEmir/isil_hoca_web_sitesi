'use client'
import { useActionState, useEffect, useRef, useState } from 'react'
import { sendMessage } from '@/app/actions/contact'
import { invalidContactFields, MESSAGE_MIN_LENGTH } from '@/lib/contactValidation'
import ArrowIcon from '@/components/ArrowIcon'

const initialState = { status: 'idle' }
const FIELD_IDS = { name: 'f-name', email: 'f-email', subject: 'f-subject', message: 'f-message' }

function readFields(form) {
  const data = new FormData(form)
  return Object.fromEntries(Object.keys(FIELD_IDS).map(key => [key, data.get(key)]))
}

export default function Contact({ contact, site }) {
  const formRef    = useRef(null)
  const subjectRef = useRef(null)
  const [state, formAction, pending] = useActionState(sendMessage, initialState)
  const [errors, setErrors] = useState([])

  const labels       = contact.formLabels ?? {}
  const placeholders = contact.formPlaceholders ?? {}
  const feedback     = contact.feedback ?? {}
  const fieldErrors  = contact.fieldErrors ?? {}
  const subjects     = (contact.subjects ?? []).filter(Boolean)
  const socials      = Object.values(site.social ?? {}).filter(s => s.url)

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
    setErrors(state.code === 'invalid' ? state.fields ?? [] : [])
  }, [state])

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest?.('a[data-topic]')
      const select = subjectRef.current
      if (!link || !select) return
      const topic = link.dataset.topic
      if ([...select.options].some(option => option.value === topic)) {
        select.value = topic
        setErrors(current => current.filter(key => key !== 'subject'))
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const handleSubmit = (event) => {
    const invalid = invalidContactFields(readFields(event.currentTarget))
    if (invalid.length === 0) return
    event.preventDefault()
    setErrors(invalid)
    document.getElementById(FIELD_IDS[invalid[0]])?.focus()
  }

  const clearError = (event) => {
    const key = event.target.name
    if (errors.includes(key)) setErrors(errors.filter(k => k !== key))
  }

  const fieldProps = (key) => {
    const invalid = errors.includes(key)
    return {
      id:                 FIELD_IDS[key],
      name:               key,
      required:           true,
      'aria-invalid':     invalid || undefined,
      'aria-describedby': invalid ? `${FIELD_IDS[key]}-error` : undefined,
    }
  }

  const fieldError = (key) => errors.includes(key) && fieldErrors[key] && (
    <p className="form__error" id={`${FIELD_IDS[key]}-error`}>{fieldErrors[key]}</p>
  )

  const showStatus = state.status === 'success' || (state.status === 'error' && state.code !== 'invalid')
  const feedbackText =
    state.status === 'success' ? feedback.success :
    state.status === 'error'   ? feedback.error :
    null

  return (
    <section className="section surface-red contact" id="contact" aria-labelledby="contact-title">
      <div className="container grid-12">
        <h2 className="contact__title" id="contact-title">{contact.title}</h2>

        <div className="contact__info">
          <p className="contact__desc">{contact.description}</p>

          {contact.email && (
            <p className="contact__email">
              <a className="link" href={`mailto:${contact.email}`}>
                {contact.email}<ArrowIcon />
              </a>
            </p>
          )}

          {socials.length > 0 && (
            <div className="contact__social">
              {contact.socialLabel && <p className="contact__social-label">{contact.socialLabel}</p>}
              {socials.map(s => (
                <a key={s.label} className="link" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <form
          ref={formRef}
          className="contact-form"
          action={formAction}
          onSubmit={handleSubmit}
          onInput={clearError}
          noValidate
          aria-label="İletişim formu"
        >
          {contact.formHint && <p className="form__hint" id="f-hint">{contact.formHint}</p>}

          <div className="form__row">
            <div className="form__group">
              <label className="form__label" htmlFor="f-name">{labels.name}</label>
              <input className="form__input" type="text" placeholder={placeholders.name || undefined} autoComplete="name" maxLength={120} {...fieldProps('name')} />
              {fieldError('name')}
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="f-email">{labels.email}</label>
              <input className="form__input" type="email" placeholder={placeholders.email || undefined} autoComplete="email" maxLength={200} {...fieldProps('email')} />
              {fieldError('email')}
            </div>
          </div>

          <div className="form__row">
            <div className="form__group">
              <label className="form__label" htmlFor="f-org">
                {labels.organization}
                {labels.optional && <span className="form__optional"> ({labels.optional})</span>}
              </label>
              <input className="form__input" id="f-org" type="text" name="organization" placeholder={placeholders.organization || undefined} autoComplete="organization" maxLength={200} />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="f-subject">{labels.subject}</label>
              {subjects.length > 0 ? (
                <div className="form__select-wrap">
                  <select ref={subjectRef} className="form__input form__select" defaultValue="" onChange={clearError} {...fieldProps('subject')}>
                    <option value="" disabled>{placeholders.subject}</option>
                    {subjects.map((subject, i) => (
                      <option key={i} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <input className="form__input" type="text" placeholder={placeholders.subject || undefined} maxLength={200} {...fieldProps('subject')} />
              )}
              {fieldError('subject')}
            </div>
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="f-message">{labels.message}</label>
            <textarea
              className="form__textarea"
              placeholder={placeholders.message || undefined}
              rows={5}
              minLength={MESSAGE_MIN_LENGTH}
              maxLength={5000}
              {...fieldProps('message')}
              aria-describedby={[contact.formHint && 'f-hint', errors.includes('message') && 'f-message-error'].filter(Boolean).join(' ') || undefined}
            />
            {fieldError('message')}
          </div>

          <div className="form__honeypot" aria-hidden="true">
            <label htmlFor="f-website">Web sitesi</label>
            <input id="f-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="form__actions">
            <button className="btn btn--light" type="submit" disabled={pending}>
              {pending ? labels.sending : labels.submit}
              {!pending && <ArrowIcon />}
            </button>

            <p className="form__status" role="status" aria-live="polite">
              {showStatus && feedbackText}
              {showStatus && state.code === 'unavailable' && contact.email && (
                <> <a href={`mailto:${contact.email}`}>{contact.email}</a></>
              )}
              {errors.length > 0 && feedback.invalid}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
