'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '../../../lib/supabase/client'

export default function LoginPage() {
  const router  = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createBrowserSupabaseClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-posta veya şifre hatalı.')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <p className="admin-login__logo">Dr. <span>Işıl</span> Boy Ergül</p>
        <p className="admin-login__subtitle">Admin Paneli</p>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label className="admin-label" htmlFor="email">E-posta</label>
            <input
              className="admin-input"
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="info@teacherx.online"
              autoComplete="email"
              required
            />
          </div>

          <div className="admin-field">
            <label className="admin-label" htmlFor="password">Şifre</label>
            <input
              className="admin-input"
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="admin-login__error">{error}</p>}

          <button className="admin-login__submit" type="submit" disabled={loading}>
            {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}
