'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { seedContent } from '@/app/admin/actions'

export default function SeedBanner() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState(null)

  const run = () => startTransition(async () => {
    setError(null)
    const result = await seedContent().catch(e => ({ ok: false, error: e.message }))
    if (result.ok) router.refresh()
    else setError(result.error)
  })

  return (
    <div className={`admin-setup-banner${error ? ' admin-setup-banner--error' : ''}`}>
      <p>
        Veritabanında eksik içerik bölümleri var. Statik verileri yüklemek için "İlk Kurulum"u çalıştır; mevcut kayıtlar korunur.
        {error && <> <strong>Hata:</strong> {error}</>}
      </p>
      <button type="button" className="admin-seed-btn" onClick={run} disabled={isPending}>
        {isPending ? 'Yükleniyor…' : '⚡ İlk Kurulum'}
      </button>
    </div>
  )
}
