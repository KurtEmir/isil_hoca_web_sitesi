# State.md — Proje Durumu

**Son güncelleme:** 2026-11-12

---

## Mevcut Aşama

Next.js 15 (App Router) + Supabase üzerinde çalışan tek sayfalık site ve admin paneli. Ana sayfa statik üretilip (ISR, 1 saat) admin kaydettiğinde anında yenileniyor. Admin panelinde 12 içerik bölümü (Site Ayarları, Hero, Hakkımda, Yolculuk, Human+ Bandı, Uzmanlık, Platformlar, Davet Seçenekleri, Medya, Manifesto, Görüşler, İletişim) ve gelen mesajlar ekranı var.

### 2026-11-12 yeniden tasarım — "Kırmızı Manifesto"
Önceki tasarım (Bricolage Grotesque + Inter + Instrument Serif, kırmızı istatistik bandı, eyebrow etiketleri) "AI slop" bulunduğu için değiştirildi. Impeccable skill'inin yöntemiyle üç yön sunuldu; kullanıcı "Kırmızı Manifesto"yu seçti. Ardından sayfa uzatıldı, görsellerle ve şemalarla zenginleştirildi (yön sözleşmesi AGENT.md'de).
- **Font:** tek aile Host Grotesk (Element Type, İstanbul; variable 300–800, uniwidth).
- **Sayfa sırası:** hero → hakkımda → yolculuk → Human+ bandı → uzmanlık → platformlar → davet seçenekleri → kurumlar → medya → manifesto → görüşler → iletişim + footer.
- **Hero:** kırmızı zemin. Solda slogan ("Öğretmen" ince, "Gelişir," harf harf inceden kalına büyüyor, "Toplum Değişir." kalın), alıntı, imza ve CTA; sağda büyük, renkli dekupe portre; altta rakamlar.
- **Yolculuğum** (`journey`): metro hattı zaman çizelgesi. Duraklar: 2014 ETZ, 2015 Apple Distinguished Educator, 2020 TeacherX, 2022 İngiltere, 2025 ETZ25, 2026 ETZ26. Kaynaklar: teacherx.online/about, oeb.global/node/13070, paradergi.com.tr (24.02.2022 ve 18.03.2025), hurriyet.com.tr (31.01.2021).
- **Human+ bandı** (`spotlight`): kırmızı zeminde duotone portre, dev "Human+" ve [Öğretmen] + [Yapay Zeka] = [Human+] denklem şeması.
- **Kurduğum Platformlar** (`platforms`, siyah): ekosistem döngü şeması (SVG) ve görselli 2×2 kart (TeacherX, StudentX, CertifiX, ETZ). Görseller kurumların kendi sitelerinden alındı (`public/images/platforms/`). TeacherX rakamları teacherx.online/about'tan.
- **Birlikte neler yapabiliriz?** (`offers`): keynote, öğretmen eğitimi, danışmanlık; her biri iletişim formuna bağlı.
- **Neye inanıyorum?** (`manifesto`, kırmızı): sitedeki mevcut yazılardan türetilmiş 4 ilke.
- **Diğer bölümler:** 12 sütunlu ızgara ve kalın başlık çizgileri kullanıyor. Uzmanlık başlıkları kaydırdıkça kalınlaşıyor. Medya siyah alanda, yazılarda meta bilgisi başlığın altında. İletişim + footer kesintisiz kırmızı kapanış. Menüye "Platformlar" eklendi.
- **Kaldırılanlar:** bölüm eyebrow'ları, `hero.highlight`, `hero.photo.placeholder`, `site.nameHighlight`, `lib/highlight.js`, scroll reveal (`RevealObserver`), pill butonlar.
- **Değişen alan anlamları:** `hero.eyebrow` artık isim altındaki ünvan satırı; `hero.taglineHighlight` sloganın büyüyen kısmı (`Gelişir,`); `hero.tagline` üç satır (`Öğretmen\nGelişir,\nToplum Değişir.`).
- **Portre:** `public/images/isil-boy-ergul-dekupe.webp` (teacherx.online/about'taki 1356×1653 dekupe). Eski `public/images/isil-boy-ergul.jpg` artık kullanılmıyor.
- **Admin:** yeni editörler (Yolculuk, Human+ Bandı, Platformlar, Davet Seçenekleri, Manifesto), sidebar ve dashboard kartları; mevcut editörler yeni alan anlamlarına göre etiketlendi.

### 2026-11-09 temizliği
- Login sayfası admin kenar çubuğundan ayrıldı (route group `(panel)`)
- İletişim formu gerçek gönderim yapıyor: `messages` tablosu + `/admin/messages`
- RLS yazma yetkisi `admins` tablosundaki e-postalarla sınırlandı
- `site` bölümü artık Nav, Footer, metadata ve Contact tarafından okunuyor; editörü eklendi
- `getContent` cookie kullanmıyor → ana sayfa yeniden statik; DB satırları statik varsayılanlarla merge ediliyor
- Sahte `#` linkler kaldırıldı; makale/basın/CTA linkleri opsiyonel alan oldu
- Editörler ortak hook (`useSectionContent`) ve bileşenlere (`EditorShell`) taşındı; hata yakalama eklendi
- `@/` alias, `.nvmrc` (Node 20), `engines` eklendi

---

## Supabase'de Manuel Yapılacaklar

1. `supabase/schema.sql` dosyasını SQL Editor'da çalıştır (yeni `admins` ve `messages` tabloları, güncellenmiş politikalar; betik tekrar çalıştırılabilir).
2. `admins` tablosunda admin e-postasının olduğunu doğrula (betik `info@teacherx.online` ekliyor; farklıysa değiştir). Bunu yapmadan kaydetme işlemleri RLS hatası verir.
3. Authentication → Providers → Email altında "Allow new users to sign up" seçeneğini kapat.
4. Admin paneline girip Dashboard'daki "İlk Kurulum"a bas; eksik bölümler (`site` dahil) yüklenir, mevcut kayıtlar korunur.
5. Vercel'de `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` tanımlı olmalı.
6. Daha önce kaydedilmiş `hero`, `about` ve `site` satırları varsa yeni alanlar (rakamlar, kurumlar listesi, menü butonu) statik varsayılanlardan gelir; admin'den bir kez kaydedince DB'ye yazılır.
7. Supabase'de daha önce kaydedilmiş bir `hero` satırı varsa eski slogan yapısı yeni tasarımı ezer. Admin → Hero'da "Ana Başlık"ı üç satır olarak gir (Öğretmen ⏎ Gelişir, ⏎ Toplum Değişir.), "Büyüyen Kısım"a `Gelişir,` yaz ve kaydet. (2026-11-12'de bu ortamdan Supabase'e bağlanılamadı, kayıtlı satırlar kontrol edilemedi.)
8. Yeni bölümler (`journey`, `spotlight`, `platforms`, `offers`, `manifesto`) Supabase'de henüz yok. Site statik verilerle çalışır, admin'de ilk kayıtta satır oluşur. Dashboard'daki "İlk Kurulum" butonu hepsini birden ekler. `getContent` üst düzey alanları birleştirir (`equation`, `center`, `intro` eksikse varsayılandan gelir), ama dizileri birleştirmez. Daha önce `platforms` kaydedildiyse DB'deki `items` listesi statik listenin yerine geçer; StudentX ve CertifiX kartları, kart görselleri ve şema etiketleri görünmez. Bu durumda Admin → Platformlar'dan ekle.

---

## Sıradaki Adımlar

- StudentX için açıklama, link ve görsel ekle (herkese açık kaynak bulunamadı; şu an kartta yalnızca "TeacherX ekosisteminin öğrencilere yönelik eğitim platformu" yazıyor, rolü "TeacherX ekosistemi").
- Ekosistem şemasındaki rol ifadeleri ("Öğretmen gelişir", "Öğrenci öğrenir", "Başarı belgelenir", "Topluluk buluşur") ve şema açıklaması yorum içeriyor; Işıl Hoca'yla teyit et.
- Hero rakamı "10K+ Eğitim Alan Öğretmen" ile TeacherX sayfasındaki "50.000+ öğretmen" farklı ölçütler; Işıl Hoca'yla teyit et.
- Kurumlar listesine logo görselleri ekle (Hakkımda → Kurumlar & Yayınlar → Logo Görseli)
- Gerçek sosyal medya linklerini Site Ayarları'ndan gir (şu an placeholder kullanıcı adları)
- Öne çıkan videonun YouTube linkini Medya editöründen gir
- Makale ve basın linklerini doldur (boşken link gösterilmiyor)
- İsteğe bağlı: referans/görüş (testimonial) bölümü — gerçek alıntılar toplandığında eklenebilir
- İsteğe bağlı: mesajlar için silme / okundu işareti
