# AGENT.md — Dr. Işıl Boy Ergül Kişisel Web Sitesi

Bir AI agent olarak bu projeye dahil olduğunda bu dosyayı ilk oku. Proje boyunca aşağıdaki tasarım sistemine uy. Proje yapısı ve kod kuralları için [CLAUDE.md](./CLAUDE.md).

---

## Proje Özeti

Dr. Işıl Boy Ergül için tek sayfalık kişisel site; içerik Supabase destekli admin panelinden yönetilir. Ziyaretçinin görevi: kim olduğunu ve neyi savunduğunu birkaç saniyede anlamak, sonra konuşmacı daveti / iş birliği için yazmak.

Tasarım 2026-11-12'de ikinci kez, **Impeccable** (pbakaus/impeccable) skill'inin yöntemiyle baştan kuruldu. Kullanıcı üç yön arasından **"Kırmızı Manifesto"**yu seçti. Bu dosya o yönün sözleşmesidir.

---

## Tasarım Fikri (yön sözleşmesi)

- **TEZ:** Slogan sitenin kendisidir. "Öğretmen Gelişir, Toplum Değişir" tipografiyle anlatılır: *Öğretmen* ince (300), *Gelişir,* harf harf inceden kalına büyür, *Toplum Değişir.* en kalın (800). Reddedilen kalıp: başlık + foto bölünmüş hero, renkli zeminli istatistik kartları/bandı, kart ızgarası, başlık üstü etiketler. Hero'nun en altındaki 4 rakamlık satır bilinçli olarak tutulur. 2026-11-17'de kullanıcı hero'daki kırmızıyı yorucu buldu; rakamlar kırmızı alanın altındaki kâğıt şeride (`.hero__ground`) taşındı, figür bu sınırın üstünde durur. Rakamlar kırmızı, ince dikey çizgilerle ayrılır, kart değildir; rakamlar sayfadaki diğer verilerle (platform kartları vb.) birebir tutarlı olmalı.
- **DÜNYA:** TeacherX kırmızısı yalnızca üç büyük alanın sahibidir: hero, Human+ bandı ve kapanış (iletişim + footer). 2026-11-15'te kullanıcı "çok kırmızı, göz yoruyor" dedi; yeni renk eklenmedi, kırmızının alanı daraltıldı (~%32 → ~%23): menü çubuğu kâğıt zemin + mürekkep yazı ve kırmızı CTA oldu, manifesto siyaha geçti. Yeni bir kırmızı alan eklemeden önce sor. Ara bölümler beyaz kâğıt üzerinde katı 12 sütunlu ızgara ve kalın siyah çizgilerle kurulur. Üç siyah alan (platformlar, medya, manifesto) ritmi kırar; iki siyah bölüm asla art arda gelmez. Hero'da Işıl Hoca büyük ve tam renklidir; Human+ bandında iş ortamından tam renkli 1–3 fotoğraf (sahne, röportaj, salon) yer alır. 2026-11-17'de duotone portre kullanıcı isteğiyle kaldırıldı.
- **HİKÂYE:** Ziyaretçi önce yüzü ve sloganı görür, alıntıyla düşünceyi okur, rakamlarla kanıtı görür; ardından yolculuk (zaman çizelgesi), Human+ yaklaşımı, uzmanlık, platform ekosistemi, davet seçenekleri, kurumlar, medya, yazılar ve manifestodan geçip kırmızı kapanışta formu doldurur.
- **İLK EKRAN:** Kırmızı zemin. Solda (7 sütun) slogan sütun genişliğine göre ölçeklenir (`15.6cqi`), altında alıntı, imza ve "Konuşmacı Daveti" (beyaz buton). Sağda arka planı silinmiş büyük renkli figür alt kenara oturur ve rakam satırının ince beyaz çizgisinin üstünde durur. En altta 4 rakam. Sayfanın `h1`'i Işıl Hoca'nın adıdır (imza satırı); slogan görsel olarak afiştir ama `p` olarak işaretlenir. Mobilde sıra: slogan → isim ve ünvan → buton → fotoğraf → alıntı → rakamlar; ilk ekranda kim olduğu okunur.
- **İMZA ETKİLEŞİM:** "Gelişir" fikri hareket diline dönüşür. Hero'da büyüyen kelime yüklemede canlanır; uzmanlık başlıkları kaydırdıkça 300'den 700'e kalınlaşır (CSS scroll-driven animation); link ve menü hover'ında yazı kalınlaşır. Host Grotesk *uniwidth* olduğu için ağırlık değişirken satır kaymaz.

---

## Kaynaklar

- **Impeccable** (pbakaus/impeccable): yön seçimi, refleks font listesi, craft-floor kuralları, AI-slop kalibrasyonu
- **design-motion-principles** (kylezantos/design-motion-principles): hareket felsefesi
- Referans siteler (reshmasaujani.com, bernardmarr.com, sigrun.com) yalnızca kategori bilgisidir; görünüm onlardan alınmadı.

### Sayfa Ritmi
hero (kırmızı, büyük renkli figür; altında kâğıt zeminde rakamlar) → hakkımda (beyaz) → yolculuk (beyaz, hat haritası + yıl yıl liste) → Human+ bandı (kırmızı, iş fotoğrafları + özet + denklem) → uzmanlık (beyaz) → platformlar (siyah, ekosistem şeması + kartlar) → davet seçenekleri (beyaz) → kurumlar (beyaz) → medya (siyah) → görüşler (beyaz) → manifesto (siyah) → iletişim + footer (kırmızı, kesintisiz kapanış)

### Token Kuralı
Aşağıdaki değerler `styles/tokens.css` ile birebir aynıdır; o dosya tek doğruluk kaynağıdır. Yeni değer gerekiyorsa önce `tokens.css`'e ekle, sonra buraya yansıt. `styles/main.css` içinde ham renk, boşluk veya süre değeri yazma.

---

## Renk Sistemi (OKLCH)

### TeacherX kırmızısı (büyük alanlar)
```css
--color-red:             oklch(52% 0.205 28);        /* #c31214 — hero, kapanış, menü, kırmızı buton */
--color-red-deep:        oklch(44% 0.18 27);         /* odaklanmış input zemini, foto yer tutucu */
--color-red-light:       oklch(66.5% 0.19 29);       /* siyah zeminde kırmızı metin */
--color-on-red:          oklch(99% 0.004 30);        /* kırmızı üstünde metin (5.9:1) */
--color-on-red-muted:    oklch(91.5% 0.035 22);      /* kırmızı üstünde ikincil metin + input çizgisi (4.7:1) */
--color-rule-on-red:     oklch(99% 0.004 30 / 0.38); /* kırmızı üstünde dekoratif ince çizgi */
```

### Mürekkep ve kâğıt
```css
--color-ink:             oklch(17% 0.012 28);   /* başlıklar, kalın çizgiler */
--color-ink-body:        oklch(29% 0.012 28);   /* gövde metni */
--color-ink-muted:       oklch(46% 0.012 28);   /* açıklama, meta */
--color-paper:           oklch(99.4% 0.002 30); /* sayfa zemini (krem değil) */
--color-rule:            oklch(86% 0.006 30);   /* tablo satır çizgisi */
```

### Siyah alan (medya)
```css
--color-black:           oklch(16.5% 0.012 28);
--color-on-black:        oklch(99.4% 0.002 30);
--color-on-black-muted:  oklch(79% 0.008 30);
--color-rule-on-black:   oklch(99.4% 0.002 30 / 0.16);
--color-black-raised:    oklch(21.5% 0.012 28);         /* platform kartı zemini */
```

### Kurallar
- Kırmızı, alan rengidir: hero, menü çubuğu, iletişim + footer. Beyaz bölümlerde yalnızca küçük işaretler (rol adları, kategori, yazı kartlarının üst çizgisi) ve kırmızı buton.
- Kırmızı üstünde metin `--color-on-red` / `--color-on-red-muted`; asla gri. Siyah zeminde kırmızı metin `--color-red-light`.
- Gradient, glassmorphism, gölge yok.

---

## Tipografi

### Font
Tek aile: **Host Grotesk** (İstanbul'daki Element Type dökümhanesinden Doğukan Karapınar ve İbrahim Kaçtıoğlu'nun tasarımı; variable 300–800, uniwidth, Türkçe karakterler özenle çizilmiş). `next/font` `--font-host`'u sağlar, `tokens.css` `--font-sans`'a bağlar.
```css
--font-sans: var(--font-host), 'Helvetica Neue', Arial, system-ui, sans-serif;
```
Refleks fontları kullanma (Inter, Bricolage Grotesque, Instrument Serif, Fraunces, Playfair, DM Sans/Serif, Space Grotesk, Plus Jakarta Sans, Outfit, Syne, IBM Plex…). İkinci bir aile eklemeden önce sor.

### Ağırlıklar
```css
--weight-light: 300;  --weight-book: 400;  --weight-mid: 500;
--weight-semi:  600;  --weight-bold: 700;  --weight-black: 800;
```

### Ölçek
```css
--text-sm:      0.9375rem;
--text-base:    1rem;
--text-body:    1.0625rem;
--text-lead:    clamp(1.25rem,  1.05rem + 0.8vw,  1.75rem);  /* alıntı, giriş paragrafı, basın başlığı */
--text-h3:      clamp(1.375rem, 1.15rem + 0.9vw,  1.875rem); /* rol, yazı başlığı */
--text-list:    clamp(1.75rem,  1.15rem + 2.6vw,  3.5rem);   /* uzmanlık listesi */
--text-feature: clamp(1.75rem,  1.3rem + 1.7vw,   2.75rem);  /* öne çıkan video başlığı, footer isim */
--text-h2:      clamp(2.5rem,   1.4rem + 4.4vw,   5.25rem);  /* bölüm başlıkları */
--text-closing: clamp(3.25rem,  1.2rem + 8.4vw,   8.75rem);  /* "Birlikte Çalışalım." */
--text-fact:    clamp(2.25rem,  1.6rem + 2.4vw,   4rem);     /* hero rakamları (kâğıt şerit) */
--text-xs:      0.8125rem;                                     /* hat haritası durak adları */
--text-statement: clamp(2rem, 1.15rem + 3.6vw, 4.5rem);      /* manifesto cümleleri */

--poster-size:        15.6cqi; /* hero sloganı, masaüstü (7 sütunluk metin kolonuna göre) */
--poster-size-narrow: 21cqi;   /* hero sloganı, ≤768px */
--spotlight-word:     27.5cqi; /* Human+ bandındaki dev kelime, gövde kolonunun ~%97'si */
--hero-stage-h:       calc(min(100svh, 980px) - var(--nav-height) - 128px); /* hero'nun rakam satırı hariç yüksekliği */
--hero-figure-min:    520px;   /* büyük figür kutusunun en az yüksekliği */
```

| Rol                 | Token            | Ağırlık        | Letter-spacing | Line-height |
|---------------------|------------------|----------------|----------------|-------------|
| Hero sloganı        | `--poster-size`  | 300 → 800      | -0.04em        | 0.88        |
| Kapanış başlığı     | `--text-closing` | 1. satır 300, sonra 800 | -0.04em | 0.94  |
| Bölüm başlığı       | `--text-h2`      | 700            | -0.035em       | 1           |
| Uzmanlık listesi    | `--text-list`    | 300 → 700 (kaydırma) | -0.035em | 1.04        |
| Rol / yazı başlığı  | `--text-h3`      | 700            | -0.018em       | 1.22        |
| Alıntı / giriş      | `--text-lead`    | 400            | -0.018em       | 1.36        |
| Gövde               | `--text-body`    | 400            | 0              | 1.62        |
| Meta / küçük başlık | `--text-sm`      | 500–600        | 0              | —           |

### Kurallar
- **Başlık üstü etiket (eyebrow) yok.** Başlık tek başına durur; büyük harf + harf aralıklı küçük etiketler kullanılmaz. Kategori, tarih, kitle gibi meta bilgiler başlığın **altına** yazılır.
- Çok satırlı başlıklar içerikte gerçek satır sonu taşır (`white-space: pre-line`).
- Hero alıntısında açılış tırnağı kenara asılır (`text-indent: -0.42em`).
- Türkçe tırnak: “…” (düz `"` kullanma).
- Rakamlar `font-variant-numeric: tabular-nums`.

---

## Izgara ve Çizgiler

- 12 sütunlu ızgara: `.grid-12` (`--gap-grid: clamp(16px, 2vw, 32px)`).
- Her beyaz/siyah bölüm `.section-head` ile başlar: üstte 3px mürekkep çizgisi (`--rule-bold`), altında başlık.
- Tablolar (roller, uzmanlık, kurumlar, basın): 1px satır çizgileri (`--rule-thin`), üstte koyu çizgi.
- Yazı kartı yok; her yazı sütununun üstünde 3px kırmızı çizgi.
- Köşe yarıçapı yok (butonlar, video, fotoğraf köşeli).

```css
--gap-grid:    clamp(16px, 2vw, 32px);
--gap-heading: clamp(40px, 5vw, 80px);
--gap-block:   clamp(32px, 4vw, 56px);
--rule-thin:   1px;
--rule-bold:   3px;
```

### Boşluk
4px tabanlı: `--sp-1: 4px` … `--sp-24: 96px`.
`--section-pad-v: clamp(80px, 9vw, 136px)`, `--content-pad-h: clamp(20px, 5vw, 64px)`.

---

## Bileşenler

- **Buton:** köşeli dikdörtgen, 54px (`--btn--sm` 44px). Beyaz zeminde kırmızı (`.btn`), kırmızı zeminde beyaz (`.btn--light`). Hover'da mürekkep siyahı. Pill buton yok.
- **Link:** 2px alt çizgi; hover'da ağırlık 500 → 800 (kayma olmaz).
- **Menü:** kâğıt zeminli çubuk, mürekkep yazı, kırmızı "Konuşmacı Daveti" butonu; scroll sonrası altta `--color-rule` çizgisi. Mobil menü açılınca çubuk ve çekmece birlikte kırmızıya döner. 1024px ve altında linkler ve menü butonu yerine hamburger gelir (tablet dikeyde menü taşmasın diye). Çekmece tam ekran kırmızı, `aria-modal`; linkler hover/focus'ta kalınlaşır, bir linke basınca odak hedef bölüme taşınır.
- **Form (kırmızı zeminde):** etiket üstte, input'lar şeffaf, alt çizgi `--color-on-red-muted`; odakta çizgi beyazlaşır ve zemin `--color-red-deep` olur; zemin ve çizgi `box-shadow` ile iki yana `--sp-3` genişler, metin yerinden kaymaz. Yazılan metin 500, placeholder 300 ağırlıkta (ayrım renkle değil ağırlıkla, kontrast tabanı korunur). Konu bir seçim kutusudur (`contact.subjects`); Davet Seçenekleri'ndeki linkler `data-topic` ile Konu'yu doldurur. Zorunlu olmayan alan "(isteğe bağlı)" diye işaretlenir. Doğrulama tarayıcıya bırakılmaz: hatalı alan kesikli beyaz çizgi alır ve altında `contact.fieldErrors`'tan Türkçe mesaj çıkar; sunucu da aynı kuralı (`lib/contactValidation.js`) uygular.
- **Medya rozeti:** videonun sol üst köşesinde kırmızı etiket (`media.featuredBadge`). Oynat ikonu kırmızı kare.
- **Hero figürü:** `hero.photo` arka planı silinmiş (şeffaf) bir fotoğraf olmalı; `object-fit: contain` ile sağ alta oturur. ≤768px'de sıra: slogan → CTA → kare kırpılmış figür (baş-omuz) → alıntı → imza.
- **Human+ bandı (`Spotlight`):** kırmızı alanda üstte fotoğraf galerisi (`spotlight.photos`, en fazla 3: ilki 7 sütun 4:3, diğer ikisi sağda üst üste; tam renk, köşesiz, hover'da hafif yakınlaşma, altında küçük alt yazı; `position` kırpma odağı). Altında solda dev kelime (`spotlight.backdrop`) + kısa açıklama, sağda 2–3 cümlelik özet (`spotlight.summary`) ve denklem şeması: terimler kutu içinde, `+` ve `=` ile bağlanır, son terim beyaz dolgulu sonuçtur. Mobilde ilk fotoğraf tam genişlik, diğer ikisi yan yana.
- **Yolculuk:** üstte giriş cümlesi (`journey.intro`), ortada veriden çizilen **hat haritası** (metro haritası): yıllar sütun, `journey.tracks` satır. Hat 1 mürekkep, hat 2 kırmızı, hat 3 çift çizgi (ray). Duraklar kare; aynı yıl+hatta birden çok olay varsa kare dolar ve sayıyı gösterir. Hatlar kaydırınca soldan sağa çizilir (`animation-timeline: view()`). Harita `aria-hidden`; asıl içerik altındaki yıl yıl listedir (yıl solda kırmızı ve yapışkan, başlık + hat etiketi, sağda açıklama). ≤768px'de harita yatay kayar, hat adları solda sabit kalır.
- **Platformlar:** önce ekosistem döngü şeması (`EcosystemDiagram`, veriden çizilen SVG; ilk platform kırmızı çekirdek, oklar saat yönünde, ortada `platforms.center`), yanında `platforms.intro`. Altında 2×2 platform kartı: üstte 3px kırmızı çizgi, 16:10 görsel (hover'da hafif yakınlaşır), görsel yoksa kırmızı zeminde dev isim; isim, rol, açıklama, rakamlar, link. Kart yapısı kullanıcı isteğiyle yalnızca bu bölümde kullanılır.
- **Davet seçenekleri:** 3 sütunlu tablo, sütunlar ince dikey çizgilerle ayrılır; her sütunda başlık → açıklama → kitle (kırmızı) → link.
- **Manifesto:** siyah alanda (yazıların ardından, kırmızı kapanıştan hemen önce) büyük cümleler (`--text-statement`, 800) solda, kısa açıklama sağda, alt hizalı.

---

## Hareket

```css
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--dur-fast: 120ms;  --dur-default: 220ms;  --dur-slow: 380ms;  --dur-grow: 900ms;
--delay-grow: 250ms;  --step-grow: 75ms;
```
- Tek imza an: hero'da "Gelişir," harfleri sırayla 300'den hedef ağırlığa büyür (`.grow__letter`, `--w` ve `--i` inline gelir).
- Uzmanlık başlıkları `animation-timeline: view()` ile kaydırmaya bağlı kalınlaşır. Desteklemeyen tarayıcıda sabit 600 kalır.
- Hover'da kalınlaşma: `--dur-slow` + `--ease-out-expo`.
- Sayfa genelinde fade-in / reveal yok; içerik her zaman görünür başlar.
- `prefers-reduced-motion`: animasyonlar kapanır, son hâl (ağırlık rampası) statik görünür.

---

## Layout

- Max genişlik `--max-width: 1280px`, menü yüksekliği `--nav-height: 72px`.
- Hero: `.hero__poster` bir container'dır (`container-type: inline-size`). Slogan ve portre `cqi` ile ölçeklenir, böylece kompozisyon her masaüstü genişliğinde aynı orantıda kalır. ≤768px'de portre sloganın altına iner (%34 genişlik), slogan `21cqi` olur.
- Kırılımlar: 1024px, 768px, 480px (`main.css` sonunda).
- Human+ galerisi için en az 1600px genişliğinde yatay fotoğraf önerilir.

---

## İçerik Ayrımı

- Tüm metinler `content/data.js` alanlarından gelir ve Supabase'den override edilebilir.
- `hero.tagline` satır sonlarıyla gelir (`Öğretmen\nGelişir,\nToplum Değişir.`); `hero.taglineHighlight` büyüyen kısımdır (`Gelişir,`).
- `hero.eyebrow` = isim altındaki ünvan satırı (alan adı geriye uyumluluk için korunuyor).
- Rakamlar `hero.stats`, kurumlar `about.affiliations`, menü butonu `site.navCta`, medya rozeti `media.featuredBadge`.
- Bölümler: `journey` (zaman çizelgesi), `spotlight` (Human+ bandı: `image`, `backdrop`, `caption`, `captionSource`, `equation[]`), `platforms` (`center`, `intro`, kartlarda `short`, `focus`, `image`), `offers`, `manifesto`.
- Portre `/images/isil-boy-ergul-dekupe.webp`: teacherx.online/about'taki 1356×1653 dekupe, hero'da.
- Human+ fotoğrafları `public/images/spotlight/`: ETZ sahnesi (ETZ sitesinin 2025 arşiv kopyası), ETZ25 röportajı ve salon konuşması (ETZ YouTube kanalı video kareleri, 1280×720). Daha yüksek çözünürlüklü orijinaller Işıl Hoca/ETZ ekibinden istenmeli.
- Yolculuk olaylarının her biri kaynakla doğrulandı (teacherx.online/about, Companies House, CNN Türk, Para Dergi, DHA, OEB, EUN). TeacherX Ltd 2021'dir (2022 değil).
- Platform görselleri `public/images/platforms/`: TeacherX ders ekranı (teacherx.online), CertifiX marka görseli (certifixonline.com), Işıl Hoca'nın ETZ konuşmacı fotoğrafı (egitimteknolojilerizirvesi.com).

---

## Kaçınılacak Anti-Pattern'ler (Impeccable craft-floor)

- [ ] Başlık üstü eyebrow / kicker etiketi (yasak)
- [ ] Anlamsız bölüm numaraları (01 / 02 / 03)
- [ ] Hero-metric şablonu (dev rakam bandı)
- [ ] İkonlu eşit kart ızgarası, iç içe kartlar
- [ ] Pill butonlar, gradient, glass/blur, gölge
- [ ] Krem zemin + serif + kırmızı vurgu (AI kümelenmesi #1)
- [ ] Monospace etiket kostümü
- [ ] Her bölüme aynı fade-in
- [ ] Renkli zemin üstünde gri metin
- [ ] Sahte logo / placeholder görsel (logo yoksa kurum adı yazılır)

---

## Erişilebilirlik

- WCAG 2.1 AA; tüm metin çiftleri 4.5:1 üstünde (kırmızı üstünde ikincil metin 4.7:1), input sınır çizgisi 3:1 üstünde.
- `:focus-visible` beyaz zeminde kırmızı, kırmızı zeminde beyaz, siyah zeminde açık kırmızı 2px outline. `::selection` zemine göre tersine döner.
- Büyüyen kelimenin harfleri `aria-hidden`; kelimenin kendisi `.sr-only` olarak okunur.
- Form alanları görünür `label` ile bağlı; durum mesajı `role="status"`.
- Dokunma hedefleri en az 44px; mobil menü Escape ile kapanır, açıkken Tab menünün içinde döner, kapanınca odak menü butonuna döner.
- Sayfanın başında klavyeyle görünen "İçeriğe geç" linki (`content/navigation.js` → `skipLink`) `main#main`'e atlar.
