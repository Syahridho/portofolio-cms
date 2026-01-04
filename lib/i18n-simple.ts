"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "id";

export const translations = {
  en: {
    common: {
      home: "Home",
      project: "Project",
      certificate: "Certificate",
      contact: "Contact",
      socialMedia: "Social Media",
      downloadCV: "Download CV",
    },
    home: {
      greeting: "Hi, I'm",
      role: "Programmer",
      location: "Pekanbaru, Riau, Indonesia",
      bio: "I am a Programmer with a focus on creating aesthetically pleasing and responsive user interfaces. With skills focusing on Bootstrap, Tailwind, PHP, React JS, Next JS and Laravel.",
      description:
        "I am a Programmer with a focus on creating aesthetically pleasing and responsive user interfaces. With skills focusing on Bootstrap, Tailwind, PHP, React JS, Next JS and Laravel.",
      skills: "Skills",
      mySkills: "My Coding Skills",
      contribution: "Contribution",
      myContribution: "My Contribution in GitHub",
      less: "Less",
      more: "More",
    },
    contact: {
      title: "Contact",
      subtitle:
        "Get in touch with me for collaborations or just a friendly hello.",
      sendMessage: "Send a Message",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "Your email address",
      subject: "Subject",
      subjectPlaceholder: "What is this regarding?",
      message: "Message",
      messagePlaceholder: "Type your message here...",
      sendButton: "Send Message",
    },
  },
  id: {
    common: {
      home: "Beranda",
      project: "Proyek",
      certificate: "Sertifikat",
      contact: "Kontak",
      socialMedia: "Media Sosial",
      downloadCV: "Unduh CV",
    },
    home: {
      greeting: "Hai, Saya",
      role: "Programmer",
      location: "Pekanbaru, Riau, Indonesia",
      bio: "Saya adalah seorang Programmer dengan fokus pada pembuatan antarmuka pengguna yang estetis dan responsif. Dengan keterampilan yang berfokus pada Bootstrap, Tailwind, PHP, React JS, Next JS dan Laravel.",
      description:
        "Saya adalah seorang Programmer dengan fokus pada pembuatan antarmuka pengguna yang estetis dan responsif. Dengan keterampilan yang berfokus pada Bootstrap, Tailwind, PHP, React JS, Next JS dan Laravel.",
      skills: "Keterampilan",
      mySkills: "Keterampilan Coding Saya",
      contribution: "Kontribusi",
      myContribution: "Kontribusi Saya di GitHub",
      less: "Sedikit",
      more: "Banyak",
    },
    contact: {
      title: "Kontak",
      subtitle: "Hubungi saya untuk kolaborasi atau sekadar menyapa.",
      sendMessage: "Kirim Pesan",
      name: "Nama",
      namePlaceholder: "Nama Anda",
      email: "Email",
      emailPlaceholder: "Alamat email Anda",
      subject: "Subjek",
      subjectPlaceholder: "Perihal apa ini?",
      message: "Pesan",
      messagePlaceholder: "Ketik pesan Anda di sini...",
      sendButton: "Kirim Pesan",
    },
  },
};

type TranslationKeys = typeof translations.en;

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

export const useLocale = () => useContext(LocaleContext);
