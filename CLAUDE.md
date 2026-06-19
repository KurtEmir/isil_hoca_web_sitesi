# CLAUDE.md — Işıl Hoca Kişisel Web Sitesi

## Proje Hakkında

Öğretmen Işıl için profesyonel bir kişisel web sitesi. Ziyaretçilere Işıl Hoca'yı tanıtır, verdiği hizmetleri ve dersleri gösterir. Site içerikleri sonradan entegre edilecek bir CMS üzerinden yönetilebilir olacak.

**Alan adı:** teacherx.online  
**Dil:** Türkçe (birincil), İngilizce (ikincil — opsiyonel)

---

## Tasarım Sistemi

Tasarım kararları için her zaman [AGENT.md](./AGENT.md) dosyasına başvur. AGENT.md'de tanımlı renk, tipografi, boşluk ve animasyon değerlerini kullan — dışarıdan değer türetme.

---

## Teknoloji Yığını

### Şu An
- Saf HTML, CSS, JavaScript (framework yok)
- İçerik: `content/` klasöründe JSON dosyaları
- Görseller: `public/images/` altında

### CMS Entegrasyonu Sonrası (Planlanan)
- Headless CMS (muhtemelen Sanity veya Strapi)
- API'dan gelen JSON içerik aynı content şemasını takip edecek

### Neden Bu Yığın
CMS olmadan önce içeriği JSON'da saklamak, gelecekteki CMS geçişini sorunsuz yapar. HTML dosyaları içerik almak için bu JSON'ları okur — CMS geldiğinde sadece veri kaynağı değişir, şablon değil.

---

## Proje Yapısı

```
isil_hoca_web_sitesi/
├── index.html
├── CLAUDE.md
├── AGENT.md
├── State.md
├── content/                  # Tüm düzenlenebilir içerik burada
│   ├── site.json             # Global site ayarları (başlık, meta, iletişim)
│   ├── hero.json             # Ana sayfa hero bölümü
│   ├── about.json            # Hakkımda bölümü
│   ├── services.json         # Hizmetler / dersler listesi
│   ├── testimonials.json     # Referanslar / yorumlar
│   └── contact.json          # İletişim bilgileri
├── public/
│   └── images/               # Tüm görseller
├── src/
│   ├── css/
│   │   ├── tokens.css        # Design token'lar (CSS custom properties)
│   │   ├── base.css          # Reset, tipografi temeli
│   │   ├── components.css    # Yeniden kullanılabilir bileşenler
│   │   └── layout.css        # Sayfa düzeni
│   └── js/
│       ├── content.js        # JSON içeriği DOM'a bağlayan yükleyici
│       └── animations.js     # Scroll ve interaction animasyonları
└── components/               # Yeniden kullanılabilir HTML parçaları (opsiyonel)
```

---

## İçerik Şeması Kuralı

Her JSON dosyasında `_meta` alanı olmalı:
```json
{
  "_meta": {
    "section": "hero",
    "lastUpdated": "2026-06-18",
    "cmsReady": true
  }
}
```

Bu alan CMS entegrasyonunda hangi içeriğin hangi bölüme ait olduğunu izlemek için kullanılır.

---

## Sayfalar ve Bölümler

### Ana Sayfa (index.html)
1. **Hero** — Işıl Hoca'nın güçlü bir ilk izlenimi, kısa başlık + CTA
2. **Hakkımda** — Biyografi, uzmanlık alanları, kısa bir hikaye
3. **Hizmetler / Dersler** — Verdiği ders ve hizmetlerin kartları
4. **Referanslar** — Öğrenci / veli yorumları
5. **İletişim** — Form + iletişim bilgileri

---

## Kod Kuralları

### Genel
- Mobile-first CSS yaz
- CSS custom property kullan, hardcode değer yazma
- BEM veya basit, açıklayıcı class isimleri
- JavaScript minimal tut — DOM manipülasyonu için framework gerekmez

### İçerik
- HTML içine asla sabit metin yazma
- Tüm metinler `content/*.json` dosyalarından `content.js` aracılığıyla gelmeli
- Görseller için `public/images/` kullan, yolları JSON'da tut

### Bileşenler
- Her bölüm kendi CSS bloğuna sahip olmalı
- Bileşenler props/data nitelikleri aracılığıyla özelleştirilebilir olmalı

### Performans
- Kritik CSS satır içi (inline) olmalı
- Görseller için `loading="lazy"` kullan
- Font'lar için `font-display: swap`
- İlk yükleme (LCP) 2.5s altında hedefle

---

## Yapma Kuralları

- Yorum satırı ekleme — iyi isimlendirilmiş değişkenler ve etiketler yeterli
- Framework kurmadan önce sor
- İçeriği hardcode etme
- CMS için tasarlanmamış özel bir admin paneli yapma — CMS ayrı bir proje olacak
- Renk, boşluk veya animasyon için AGENT.md dışında değer türetme

---

## Referanslar

- Tasarım sistemi: [AGENT.md](./AGENT.md)
- Proje durumu: [State.md](./State.md)
- Impeccable design skill: https://github.com/pbakaus/impeccable
- Motion principles: https://github.com/kylezantos/design-motion-principles
