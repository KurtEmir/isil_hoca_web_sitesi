# CLAUDE.md — Dr. Işıl Boy Ergül Kişisel Web Sitesi

## Proje Hakkında

Dr. Işıl Boy Ergül (eğitim teknolojileri uzmanı, TeacherX kurucusu) için tek sayfalık profesyonel tanıtım sitesi ve içeriklerini yönetmek için küçük bir admin paneli. İçerik Supabase'de tutulur, admin panelinden düzenlenir.

**Alan adı:** teacherx.online
**Dil:** Türkçe
**Deploy:** Vercel (`.vercel/project.json`)

---

## Tasarım Sistemi

Tasarım kararları için [AGENT.md](./AGENT.md). Token'ların tek doğruluk kaynağı `styles/tokens.css`'tir; AGENT.md bu dosyayı belgeler. Yeni bir renk, boşluk veya animasyon değeri gerekiyorsa önce `tokens.css`'e token ekle, sonra kullan. `main.css` içinde ham değer yazma. Font değişkeni `--font-host` `next/font` tarafından `html` üzerinde tanımlanır; `tokens.css` bunu `--font-sans` stack'ine bağlar. Sitede tek aile var (Host Grotesk); ikinci bir font eklemeden önce sor.

---

## Teknoloji Yığını

- **Next.js 15** (App Router), **React 19**, JavaScript (TypeScript yok)
- **Supabase**: `content` tablosu (bölüm → JSONB), `messages` tablosu (iletişim formu), Supabase Auth (admin girişi), RLS ile yetki
- **Saf CSS**: `styles/tokens.css` + `styles/main.css` (site), `styles/admin.css` (panel)
- `next/font` (Host Grotesk — İstanbul'daki Element Type dökümhanesinin variable, uniwidth fontu), `next/image`
- Node 20+ (`.nvmrc`), `@/` import alias (`jsconfig.json`)

### Veri Akışı

1. `content/data.js` — statik varsayılan içerik; aynı zamanda Supabase seed kaynağı.
2. `lib/content.js` → `getContent(section)` — Supabase'den okur; yoksa veya erişilemezse statik veriye düşer. DB satırı statik varsayılanlarla shallow-merge edilir, böylece yeni eklenen alanlar eski kayıtlarda da çalışır.
3. Server component'lar `getContent` ile veri çeker. Ana sayfa statik üretilir (`revalidate = 3600`); admin kaydettiğinde `revalidatePath('/', 'layout')` ile anında yenilenir.
4. Admin editörleri `lib/admin/useSectionContent.js` ile okur, `app/admin/actions.js` → `saveContent` ile yazar.
5. İletişim formu `app/actions/contact.js` → `sendMessage` ile `messages` tablosuna yazar; admin `/admin/messages`'ta görür.

---

## Proje Yapısı

```
isil_hoca_web_sitesi/
├── app/
│   ├── layout.js               # Font (--font-host), generateMetadata
│   ├── icon.svg                # Favicon
│   ├── page.js                 # Ana sayfa (statik + ISR)
│   ├── globals.css             # tokens.css + main.css import
│   ├── actions/contact.js      # İletişim formu server action
│   └── admin/
│       ├── layout.jsx          # Sadece admin.css; sidebar yok
│       ├── actions.js          # saveContent, seedContent, logout
│       ├── login/page.jsx      # Giriş (sidebar'sız)
│       └── (panel)/            # Route group: sidebar'lı panel
│           ├── layout.jsx
│           ├── page.jsx        # Dashboard + seed banner
│           ├── site/ hero/ about/ journey/ spotlight/ expertise/ platforms/ offers/ media/ manifesto/ insights/ contact/
│           └── messages/       # Gelen mesajlar (salt okunur)
├── components/                 # Site bölümleri (server) + Nav/Contact (client)
│   ├── Hero.jsx                # Kırmızı afiş: büyüyen slogan, figür, kâğıt şeritte rakamlar
│   ├── HeroFacts.jsx           # Hero rakamları: görünce sayan, kalınlaşan sayaç (client)
│   ├── Journey.jsx             # Yolculuk: dikey zaman çizgisi (yıl → olaylar)
│   ├── Spotlight.jsx           # Human+ bandı: kaydırma hikâyesi + özet + denklem
│   ├── SpotlightStory.jsx      # Sabitlenen ekran, kaydırdıkça sırayla gelen fotoğraf + açıklama (client)
│   ├── Expertise.jsx / TopicIndex.jsx  # Odaklandığım Konular: yapışkan açıklama paneli + kalınlaşan liste (client)
│   ├── Platforms.jsx           # Ekosistem şeması + platform kartları
│   ├── EcosystemDiagram.jsx    # Veriden çizilen SVG döngü şeması
│   ├── Offers.jsx Manifesto.jsx  # Davet seçenekleri, ilkeler
│   ├── Affiliations.jsx        # Kurum/yayın listesi (about.affiliations'tan okur)
│   ├── ArrowIcon.jsx           # Buton ve linklerdeki ok ikonu
│   ├── Icon.jsx                # Tek ikon ailesi (mic, board, compass); Davet Seçenekleri'nde
│   ├── Footer.jsx              # Tek cümle + e-posta + menü/platform/sosyal sütunları (server, async)
│   └── admin/                  # AdminSidebar, EditorShell, SeedBanner
├── content/
│   ├── data.js                 # Tüm statik içerik (bölüm başına export)
│   └── navigation.js           # Menü maddeleri (Nav + Footer paylaşır)
├── lib/
│   ├── content.js              # getContent, CONTENT_SECTIONS
│   ├── images.js               # resolveImage: /images yolu ya da https linki
│   ├── admin/                  # useSectionContent, arrays, youtube
│   └── supabase/               # config, public (cookie'siz), server, client
├── middleware.js               # /admin koruması
├── styles/                     # tokens.css, main.css, admin.css
├── supabase/schema.sql         # Tablolar, RLS, admins listesi (idempotent)
└── public/images/             # portre dekupesi + platforms/ (TeacherX, CertifiX, ETZ) + spotlight/ (iş fotoğrafları)
```

---

## İçerik Kuralları

- JSX içine sabit metin yazma. Etiket gibi küçük metinler bile (`readMoreLabel`, `socialLabel`, form placeholder'ları) `content/data.js`'den gelir. İstisna: admin paneli arayüz metinleri.
- Yeni bir **alan** eklerken üçünü birlikte yap: `content/data.js` → ilgili component → ilgili admin editörü.
- Yeni bir **bölüm** eklerken: `CONTENT_SECTIONS` (`lib/content.js`), `data.js`, component, editör sayfası, sidebar + dashboard kartı.
- Liste elemanlarında `key` olarak index kullan; admin boş veya aynı başlıklı eleman ekleyebilir.
- Boş bırakılan opsiyonel alanlar (link, sosyal medya URL'si, CTA) arayüzde gizlenir; `#` gibi sahte linkler kullanma.
- Görseller `public/images/` altında; hero ve Human+ bandı fotoğrafları `/images/...` yolu ya da doğrudan https görsel linki (`lib/images.js` → `resolveImage`).
- Hero'daki rakamlar `hero.stats`'tan, kurum listesi `about.affiliations`'tan, menü butonu `site.navCta`'dan okunur. Kurum logosu (`image`) boşsa kurum adı yazı olarak gösterilir. `hero.eyebrow` alan adı geriye uyumluluk için korunur ama artık isim altındaki ünvan satırıdır.
- `hero.taglineHighlight` sloganın "büyüyen" kısmıdır: `Hero.jsx` onu harflere böler ve ağırlığı 300'den 800'e çıkarır. Öncesi ince, sonrası kalın yazılır; metinde birebir geçmeli.
- Bölüm başlıklarının üstüne etiket (eyebrow) koyma; başlık tek başına durur.
- `hero.lead` hero'daki somut tanıtım cümlesidir (ne, kime). `hero.quote` artık okunmuyor; alıntı `spotlight.caption`'da.
- İletişim formuna giden butonlar (`site.navCta`, `hero.cta[]`, `offers.items[]`) `topic` ile formdaki Konu'yu doldurur; değer `contact.subjects`'tekilerden biriyle birebir aynı olmalı.
- CTA etiketi tıklayınca ne olacağını söyler; süre, ücret, dönüş süresi gibi doğrulanmamış koşul yazma.
- İkon yalnızca `components/Icon.jsx` ailesinden; yeni ikon gerekiyorsa aynı ızgara ve çizgiyle oraya ekle.

---

## Admin Paneli

- `/admin/*` `middleware.js` ile korunur. Supabase env yoksa `/`'a yönlendirir (admin Supabase'siz çalışmaz).
- Giriş sayfası `app/admin/login`, panel `app/admin/(panel)` route group'unda; login sidebar almaz.
- Yetki Supabase RLS'te: yalnızca `admins` tablosundaki e-postalar içerik yazabilir ve mesaj okuyabilir. Yeni admin = Supabase Auth'ta kullanıcı + `admins` tablosuna e-posta. Auth'ta public sign-up kapalı olmalı.
- Server action'lar hata fırlatmaz, `{ ok, error }` döner (prod'da fırlatılan hata mesajları maskelenir).
- `admin.css` iç araç olduğu için AGENT.md token kuralından muaftır.

---

## Kod Kuralları

- Mobile-first CSS, CSS custom property, BEM-vari açıklayıcı class isimleri
- Server component varsayılan; `'use client'` yalnızca etkileşim gerekiyorsa
- Yorum satırı ekleme; iyi isimlendirme yeterli
- Framework veya kütüphane eklemeden önce sor
- Dış linklerde `target="_blank" rel="noopener noreferrer"`

### Performans
- Ana sayfa statik + ISR; `getContent` `cookies()` kullanmaz (kullanırsa sayfa dinamikleşir)
- Hero görseli `priority`, uzak görseller `unoptimized`; kurum logoları düz `<img loading="lazy">`
- `font-display: swap`, iframe `loading="lazy"`
- LCP hedefi 2.5s altı

---

## Ortam Değişkenleri

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
`.env.example` şablon, `.env.local` lokal değerler (git'e girmez). Vercel'de aynı iki değişken tanımlı olmalı.

---

## Komutlar

```
npm run dev              # geliştirme (3000 doluysa: npx next dev -p 3001)
npm run build            # üretim derlemesi
npm run start
```

---

## Referanslar

- Tasarım sistemi: [AGENT.md](./AGENT.md)
- Proje durumu: [State.md](./State.md)
- Impeccable design skill: https://github.com/pbakaus/impeccable
- Motion principles: https://github.com/kylezantos/design-motion-principles
