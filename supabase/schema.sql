-- ─────────────────────────────────────────────────
-- Supabase SQL Editor'da çalıştır
-- ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS content (
  section    TEXT PRIMARY KEY,
  data       JSONB        NOT NULL,
  updated_at TIMESTAMPTZ  DEFAULT NOW()
);

ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Websitesi (anonim) her içeriği okuyabilir
CREATE POLICY "public_read" ON content
  FOR SELECT USING (true);

-- Sadece giriş yapmış admin yazabilir
CREATE POLICY "auth_write" ON content
  FOR ALL TO authenticated
  USING  (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- updated_at otomatik güncellenir
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── İlk veri (seed) ─────────────────────────────
-- Admin portala giriş yaptıktan sonra "İlk Kurulum" butonuna bas.
-- Ya da aşağıdaki INSERT'leri düzenleyip manuel çalıştır.

-- Örnek hero verisi:
-- INSERT INTO content (section, data) VALUES (
--   'hero',
--   '{"eyebrow":"Eğitim Teknolojileri Uzmanı · Girişimci · Akademisyen", ...}'::jsonb
-- ) ON CONFLICT (section) DO NOTHING;
