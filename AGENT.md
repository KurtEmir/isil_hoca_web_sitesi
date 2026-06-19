# AGENT.md — Işıl Hoca Kişisel Web Sitesi

Bir AI agent olarak bu projeye dahil olduğunda bu dosyayı ilk oku. Proje boyunca aşağıdaki tasarım sistemine ve prensiplere uygun davran.

---

## Proje Özeti

Bu, öğretmen Işıl için profesyonel bir kişisel web sitesidir. İçerikler sonradan entegre edilecek bir CMS sistemi aracılığıyla yönetilebilir olacak. Tasarım rafine, temiz ve üretim kalitesinde olmalı — "AI slop" görünümünden kaçın.

---

## Tasarım Prensipleri

### Kaynak Sistemler
- **Impeccable** (pbakaus/impeccable): Renk, tipografi, boşluk, anti-pattern dedektörü
- **design-motion-principles** (kylezantos/design-motion-principles): Hareket felsefesi ve animasyon kuralları

---

## Renk Sistemi (OKLCH)

Tüm renk tanımlamaları OKLCH formatında olmalı. Hex kullanma.

### Brand Renkleri
```css
--color-primary:        oklch(58% 0.18 280);   /* derin mor-lacivert, sofistike */
--color-primary-light:  oklch(72% 0.14 280);   /* hover state */
--color-primary-deep:   oklch(42% 0.16 280);   /* active / pressed */
--color-accent:         oklch(72% 0.15 60);    /* sıcak altın, vurgu */
--color-accent-light:   oklch(82% 0.10 60);    /* accent hover */
```

### Yüzey (Surface) Renkleri
```css
--color-bg:             oklch(98% 0.008 95);   /* ana arka plan — sıcak beyaz */
--color-bg-subtle:      oklch(95% 0.010 95);   /* section arka planı */
--color-bg-raised:      oklch(100% 0 0);       /* card yüzeyi */
--color-bg-inset:       oklch(92% 0.008 95);   /* input, inset alanlar */
```

### Metin Renkleri
```css
--color-text-headline:  oklch(18% 0.020 95);   /* başlıklar */
--color-text-body:      oklch(32% 0.015 95);   /* gövde metni */
--color-text-muted:     oklch(52% 0.010 95);   /* ikincil, açıklamalar */
--color-text-faint:     oklch(68% 0.008 95);   /* placeholder, devre dışı */
```

### Çizgi ve Kenarlık
```css
--color-border:         oklch(82% 0 0 / 0.6);  /* standart kenarlık */
--color-border-strong:  oklch(72% 0.04 280 / 0.25); /* vurgulu kenarlık */
```

### Kurallar
- Hiçbir zaman saf siyah (`#000`) veya saf beyaz (`#fff`) kullanma — tinted versiyonları kullan
- Renkli arka plan üzerine gri metin koyma
- Gradient'lerde mor→mavi kombinasyonundan kaçın (aşınmış)
- Glassmorphism yapma

---

## Tipografi

### Font Ailesi
```css
--font-display:  'Playfair Display', 'Georgia', serif;
--font-body:     'Inter', 'Helvetica Neue', Arial, system-ui, sans-serif;
--font-mono:     'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Ölçek
| Rol         | Font           | Boyut (clamp)                    | Ağırlık | Letter-spacing |
|-------------|----------------|----------------------------------|---------|----------------|
| Display H1  | Playfair Display | `clamp(2.8rem, 5vw, 4.8rem)` | 400     | -0.01em        |
| Headline H2 | Playfair Display | `clamp(2rem, 3.2vw, 3rem)`   | 600     | -0.005em       |
| Title H3    | Inter           | `clamp(1.1rem, 1.8vw, 1.3rem)` | 600   | 0              |
| Body        | Inter           | `1rem`                          | 400     | 0              |
| Eyebrow     | Inter           | `0.72rem`                       | 600     | 0.15em         |
| Caption     | Inter           | `0.85rem`                       | 400     | 0              |

### Kurallar
- Eyebrow etiketleri her zaman `text-transform: uppercase` olmalı
- Satır yüksekliği: başlıklar `1.05–1.15`, gövde `1.75–1.85`
- Hiçbir zaman varsayılan sistem fontları veya Arial'ı tek başına kullanma

---

## Boşluk Sistemi

8px tabanlı ızgara:

```css
--space-xs:   8px;
--space-sm:   16px;
--space-md:   24px;
--space-lg:   32px;
--space-xl:   48px;
--space-2xl:  80px;
--space-3xl:  120px;
```

---

## Köşe Yarıçapı

```css
--radius-xs:   2px;
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   20px;
--radius-pill: 999px;
```

---

## Gölge (Shadow)

```css
--shadow-sm:   0 1px 3px oklch(10% 0.02 280 / 0.08);
--shadow-md:   0 4px 16px oklch(10% 0.02 280 / 0.10);
--shadow-lg:   0 12px 40px oklch(10% 0.02 280 / 0.12);
--shadow-xl:   0 24px 64px oklch(10% 0.02 280 / 0.14);
```

---

## Hareket ve Animasyon

### Felsefe: Jakub Krehel Lens — "Production Polish"
Bu proje için doğru lens: **üretim cilası**. Hareket içeriğin önüne geçmemeli.

**Temel soru:** *"Bu yeterince ince mi?"*

### Zamanlama ve Easing
```css
--ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);    /* genel geçiş */
--ease-enter:     cubic-bezier(0, 0, 0.2, 1);       /* elemanlar girerken */
--ease-exit:      cubic-bezier(0.4, 0, 1, 1);       /* elemanlar çıkarken */
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);      /* vurgulu geçişler */

--duration-fast:    120ms;
--duration-default: 220ms;
--duration-slow:    380ms;
--duration-slower:  500ms;
```

### Animasyon Kuralları
- Hover geçişleri: `180–220ms` — `var(--ease-standard)`
- Enter animasyonlar: hafif `translateY(8px) → translateY(0)` + `opacity 0→1`
- Scroll animasyonları: `IntersectionObserver` ile tetikle, `prefers-reduced-motion` destekle
- Stagger: maksimum 3–4 eleman, 60ms ara

### Kesinlikle Yapma
- Bounce / elastic easing
- `scale(0)` başlangıç noktası
- Durağan içerikte pulse animasyonu
- Her elemana hover-scale uygulamak
- 5+ elemana stagger uygulamak (stagger-spam)
- Animasyonsuz conditional render / mount/unmount

### `prefers-reduced-motion` Zorunlu
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Layout

- Max genişlik: `1280px`
- Grid: 12 sütun, `24px` gutter
- Mobil önce (mobile-first) yaklaşım

---

## CMS Hazırlık Kuralları

Bu kural kritik: içerik her zaman koddan ayrılmalı.

- Tüm sayfa metinleri, başlıklar, açıklamalar, liste öğeleri bir `content/` klasöründe JSON veya Markdown dosyalarında saklanmalı
- Resimler `public/images/` altında olmalı ve referansları content dosyalarında tutulmalı
- Hiçbir zaman sabit metin HTML içine gömülmemeli — her zaman bir content kaynağından gelmeli
- Component'lar props aracılığıyla içerik almalı, hardcode etmemeli
- Alan isimleri tutarlı ve açıklayıcı olmalı (`title`, `subtitle`, `body`, `ctaText`, `ctaUrl`)

---

## Kaçınılacak Anti-Pattern'ler (Impeccable Dedektörü)

- [ ] Purple-to-blue gradient arka planlar
- [ ] Side border ile aktif tab belirtme
- [ ] Renkli zemin üzerinde gri metin
- [ ] Aşırı iç içe card/wrapper
- [ ] Küçük dokunma hedefleri (< 44px)
- [ ] Boşluk ritmini bozan tutarsız padding
- [ ] Anlamsız blur efektleri
- [ ] Uniform fade-in tüm sayfa elemanlarına

---

## Tasarım Komutları

Şu komutları konuşmaya dahil ederek tasarım yönünü ayarlayabilirsin:

| Komut       | Anlamı                                         |
|-------------|------------------------------------------------|
| `polish`    | Detayları rafine et, kenarları temizle         |
| `bolder`    | Hiyerarşiyi güçlendir, kontrast artır          |
| `quieter`   | Gürültüyü azalt, içeriğe odaklan              |
| `animate`   | Uygun hareket ekle                             |
| `typeset`   | Tipografiyi iyileştir                          |
| `critique`  | Tasarım sorunlarını tespit et                  |
| `audit`     | Erişilebilirlik ve performans kontrol          |
| `harden`    | Daha sert, ciddi ton                           |
| `delight`   | Ince detaylar ve sürprizler ekle               |

---

## Erişilebilirlik

- WCAG 2.1 AA minimum
- Tüm interaktif elemanlar klavye ile erişilebilir
- `aria-label` eksik bırakma
- Renk kontrastı: metin üzerinde minimum 4.5:1
- Her görsel için `alt` metni
