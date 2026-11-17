-- ─────────────────────────────────────────────────────────────
-- Supabase SQL Editor'da çalıştır. Betik tekrar çalıştırılabilir.
--
-- Ayrıca Supabase Dashboard → Authentication → Providers → Email
-- altında "Allow new users to sign up" seçeneğini KAPAT; admin
-- kullanıcılarını Authentication → Users ekranından elle oluştur.
-- ─────────────────────────────────────────────────────────────

-- 1) İçerik tablosu (bölüm → JSON)
CREATE TABLE IF NOT EXISTS public.content (
  section    TEXT PRIMARY KEY,
  data       JSONB        NOT NULL,
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- 2) Admin listesi: yalnızca buradaki e-postalar içerik yazabilir
--    ve iletişim mesajlarını okuyabilir.
CREATE TABLE IF NOT EXISTS public.admins (
  email      TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins
    WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- Admin e-postanı buraya yaz (Supabase Auth'ta aynı e-postayla kullanıcı olmalı)
INSERT INTO public.admins (email) VALUES ('info@teacherx.online')
ON CONFLICT (email) DO NOTHING;

-- 3) İçerik politikaları: herkes okur, yalnızca admin yazar
DROP POLICY IF EXISTS "public_read" ON public.content;
DROP POLICY IF EXISTS "auth_write"  ON public.content;
DROP POLICY IF EXISTS "admin_write" ON public.content;

CREATE POLICY "public_read" ON public.content
  FOR SELECT USING (true);

CREATE POLICY "admin_write" ON public.content
  FOR ALL TO authenticated
  USING  (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4) updated_at otomatik güncellenir
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS set_updated_at ON public.content;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 5) İletişim formu mesajları: ziyaretçi ekler, yalnızca admin okur/siler
CREATE TABLE IF NOT EXISTS public.messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  organization TEXT,
  subject      TEXT NOT NULL,
  message      TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert" ON public.messages;
DROP POLICY IF EXISTS "admin_read"    ON public.messages;
DROP POLICY IF EXISTS "admin_delete"  ON public.messages;

CREATE POLICY "public_insert" ON public.messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name)    BETWEEN 1  AND 120 AND
    char_length(email)   BETWEEN 3  AND 200 AND
    char_length(subject) BETWEEN 1  AND 200 AND
    char_length(message) BETWEEN 10 AND 5000
  );

CREATE POLICY "admin_read" ON public.messages
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "admin_delete" ON public.messages
  FOR DELETE TO authenticated USING (public.is_admin());

-- 6) İlk içerik: admin paneline girip Dashboard'daki "İlk Kurulum"
--    butonuna bas; content/data.js içindeki statik veriler yüklenir.
