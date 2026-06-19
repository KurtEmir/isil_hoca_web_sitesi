// Static content — replace fetch calls when CMS API is ready
// Each export maps to a CMS collection endpoint

export const site = {
  name: "Dr. Işıl Boy Ergül",
  shortName: "IBE",
  tagline: "Öğretmen Gelişir, Toplum Değişir",
  description: "Eğitim Teknolojileri Uzmanı, Girişimci & Akademisyen",
  url: "https://teacherx.online",
  email: "info@teacherx.online",
  social: {
    linkedin: { url: "https://linkedin.com/in/isilboyergul", label: "LinkedIn" },
    twitter:  { url: "https://x.com/isilboyergul",          label: "X" },
    instagram:{ url: "https://instagram.com/isilboyergul",  label: "Instagram" }
  }
};

export const hero = {
  eyebrow: "Eğitim Teknolojileri Uzmanı · Girişimci · Akademisyen",
  name: "Dr. Işıl Boy Ergül",
  tagline: "Öğretmen Gelişir,\nToplum Değişir.",
  quote: "Yapay zeka eğitimde bir araç değil, yeni bir boyuttur. Bu boyutta eğitimin kalbi yine öğretmendir.",
  cta: [
    { text: "Konuşmacı Daveti", href: "#contact", variant: "primary" },
    { text: "Hakkımda",         href: "#about",   variant: "secondary" }
  ],
  photo: {
    src: "public/images/isil-boy-ergul.jpg",
    alt: "Dr. Işıl Boy Ergül"
  }
};

export const about = {
  eyebrow: "Hakkımda",
  title: "Eğitimde değişimi\nbir misyon olarak taşıyorum.",
  bio: [
    "Dr. Işıl Boy Ergül, eğitim teknolojileri alanında Türkiye'nin önde gelen uzmanlarından, girişimcilerinden ve akademisyenlerinden biridir.",
    "Kariyeri boyunca öğretmenlerin dijital dönüşümüne, eğitimde yapay zekanın doğru kullanımına ve yeni nesil eğitim metotlarına odaklanmıştır.",
    "Temel felsefesi \"Öğretmen gelişir, toplum değişir\" üzerine kuruludur; öğretmeni dönüşümün merkez aktörü olarak konumlandırır ve bu fikri her platformda kararlılıkla savunur."
  ],
  stats: [
    { value: "20+",  label: "Yıllık Deneyim" },
    { value: "10K+", label: "Eğitim Alan Öğretmen" },
    { value: "50+",  label: "Uluslararası Sunum" },
    { value: "2",    label: "Kurulan Platform" }
  ],
  roles: [
    {
      org:         "TeacherX",
      role:        "Kurucu",
      description: "Öğretmenlerin mesleki ve dijital gelişimini destekleyen sürdürülebilir eğitim platformu."
    },
    {
      org:         "Eğitim Teknolojileri Zirvesi (ETZ)",
      role:        "Kurucu",
      description: "Türkiye'nin en prestijli eğitim teknolojileri zirvesi; alanın güncel gelişmelerini buluşturan yıllık etkinlik."
    },
    {
      org:         "Yıldız Teknik Üniversitesi",
      role:        "Bilişim Danışmanı",
      description: "Yönetim Rektör Yardımcısı bünyesinde stratejik bilişim danışmanlığı."
    },
    {
      org:         "Kent Üniversitesi (UK) & Pilgrims Teacher Training",
      role:        "Eğitim Teknolojileri Eğitmeni",
      description: "Uluslararası kurumlarda eğitim teknolojileri eğitmenliği."
    }
  ]
};

export const expertise = {
  eyebrow: "Uzmanlık Alanları",
  title: "Odaklandığım Konular",
  items: [
    {
      icon: "✦",
      title: "Eğitimde Yapay Zeka",
      description: "Yapay zekanın eğitimdeki rolü, Human+ yaklaşımı ve yapay zeka okuryazarlığı eğitimleri."
    },
    {
      icon: "✦",
      title: "Öğretmen Gelişimi",
      description: "Öğretmenlerin çağın gereksinimlerine göre donatılması, mesleki gelişim ve dijital yetkinlik."
    },
    {
      icon: "✦",
      title: "Dijital Dönüşüm",
      description: "Eğitim kurumlarında dijitalleşme stratejileri ve mobil teknolojilerin sınıfta kullanımı."
    },
    {
      icon: "✦",
      title: "Keynote Konuşmacılık",
      description: "Zirveler, paneller ve kurumsal etkinlikler için eğitim teknolojileri ve yapay zeka sunumları."
    },
    {
      icon: "✦",
      title: "Akademik Araştırma",
      description: "Bilişsel teslimiyet, yapay zeka okuryazarlığı ve yeni nesil beceriler üzerine çalışmalar."
    },
    {
      icon: "✦",
      title: "Kurumsal Danışmanlık",
      description: "Kurum ve okullara dijitalleşme stratejisi, eğitim teknolojileri entegrasyonu ve yol haritası."
    }
  ]
};

export const media = {
  eyebrow: "Medya & Basın",
  title: "Söylediklerim,\nPaylaştıklarım.",
  featured: {
    title:       "\"Yapay zeka öğretmenin yerini alamaz\"",
    source:      "Bloomberg HT — Kariyer 4.0",
    host:        "Melis Yaşar ile",
    description: "Yapay zekanın eğitimdeki dönüştürücü rolü, öğretmenin geri döndürülemez önemi ve insan+yapay zeka sinerjisi üzerine kapsamlı bir konuşma.",
    videoId:     null
  },
  press: [
    {
      title:  "Yapay Zeka Okuryazarlığı Eğitimde Yeni Bir Temel Beceri",
      source: "Deniz Akademi",
      type:   "Video Röportaj",
      date:   "2025"
    },
    {
      title:  "Eğitimde Dijital Dönüşümün Öncüleri",
      source: "Wtech — Teknolojide Kadın",
      type:   "Basın",
      date:   "2024"
    },
    {
      title:  "TeacherX: Öğretmenin Dijital Geleceği",
      source: "ETZ Zirvesi",
      type:   "Konuşma",
      date:   "2024"
    }
  ]
};

export const insights = {
  eyebrow: "Görüşler & Makaleler",
  title: "Düşündüklerim,\nYazdıklarım.",
  cta: { text: "Tüm Yazılar", href: "#" },
  articles: [
    {
      category: "Yapay Zeka",
      title:    "Bilişsel Teslimiyet: Yapay Zekaya Düşüncemizi Devretmek",
      excerpt:  "Yapay zekayı bir düşünce ortağı olarak değil de bir düşünce ikamesi olarak kullandığımızda ne kaybediyoruz? Öğretmenler bu tehlikeyi nasıl yönetebilir?",
      date:     "Haziran 2025",
      readTime: "6 dk"
    },
    {
      category: "Öğretmen Gelişimi",
      title:    "Human+: Öğretmen ve Yapay Zekanın Sinerjisi",
      excerpt:  "\"Human+\" yaklaşımı, yapay zekayı bir araç olarak değil, öğretmenin kapasitesini genişleten bir ortak olarak konumlandırır.",
      date:     "Nisan 2025",
      readTime: "8 dk"
    },
    {
      category: "Eğitim Politikası",
      title:    "Yeni Nesil Eğitimde Öğretmenin Değişmeyen Rolü",
      excerpt:  "Teknoloji ne kadar ilerlerse ilerlesin, eğitimin kalbi insan ilişkisindedir. Peki bu ilişkiyi nasıl koruyoruz?",
      date:     "Şubat 2025",
      readTime: "5 dk"
    }
  ]
};

export const contact = {
  eyebrow: "İletişim",
  title: "Birlikte\nÇalışalım.",
  description: "Konuşmacılık davetleri, kurumsal iş birlikleri ve projeler için iletişime geçin.",
  email: "info@teacherx.online",
  formLabels: {
    name:         "Adınız Soyadınız",
    email:        "E-posta Adresiniz",
    organization: "Kurumunuz",
    subject:      "Konu",
    message:      "Mesajınız",
    submit:       "Mesaj Gönder"
  }
};
