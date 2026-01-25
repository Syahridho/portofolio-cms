# i18n Implementation Guide

## 🌍 Overview

Aplikasi ini mendukung 2 bahasa:

- 🇬🇧 **English (en)** - Default
- 🇮🇩 **Indonesia (id)**

## 📁 File Structure

```
portofolio/
├── i18n/
│   ├── config.ts          # Konfigurasi locale
│   └── request.ts         # Next-intl request config
├── messages/
│   ├── en.json           # Translations English
│   └── id.json           # Translations Indonesia
├── hooks/
│   └── use-i18n.ts       # Custom i18n hooks
├── lib/
│   └── i18n-helpers.ts   # Helper functions
├── types/
│   └── index.ts          # LocalizedContent type
└── docs/
    └── i18n-firestore-guide.md  # Panduan lengkap
```

## 🚀 Quick Start

### 1. Menggunakan Translations di Component

```tsx
"use client";

import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("common");

  return (
    <div>
      <h1>{t("title")}</h1>
      <button>{t("save")}</button>
    </div>
  );
}
```

### 2. Menggunakan LocalizedContent

```tsx
"use client";

import { useI18n } from "@/hooks/use-i18n";
import { UserProject } from "@/types";

export function ProjectCard({ project }: { project: UserProject }) {
  const { getContent } = useI18n();

  return (
    <div>
      <h3>{getContent(project.title)}</h3>
      <p>{getContent(project.description)}</p>
    </div>
  );
}
```

### 3. Menambahkan Language Switcher

```tsx
import { LanguageSwitcher } from "@/components/language-switcher";

export function Header() {
  return (
    <header>
      <nav>
        {/* ... other nav items ... */}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
```

## 📝 Struktur Data Firestore

### Data yang Perlu Multi-bahasa

Gunakan `LocalizedContent` untuk field berikut:

```typescript
interface LocalizedContent {
  en: string;
  id: string;
}
```

**Field yang menggunakan LocalizedContent:**

- `UserProfile.jobTitle`
- `UserProfile.about`
- `UserDescription.description`
- `UserCareer.position`
- `UserCareer.description`
- `UserAchievement.title`
- `UserAchievement.category`
- `UserProject.title`
- `UserProject.description`

### Contoh Data di Firestore

```json
{
  "title": {
    "en": "E-Commerce Platform",
    "id": "Platform E-Commerce"
  },
  "description": {
    "en": "A modern e-commerce platform",
    "id": "Platform e-commerce modern"
  }
}
```

## 🎨 Form dengan Multi-bahasa

### Menggunakan Tabs

```tsx
<Tabs defaultValue="en">
  <TabsList>
    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
  </TabsList>

  <TabsContent value="en">
    <Input name="title_en" placeholder="Title" />
    <Textarea name="description_en" placeholder="Description" />
  </TabsContent>

  <TabsContent value="id">
    <Input name="title_id" placeholder="Judul" />
    <Textarea name="description_id" placeholder="Deskripsi" />
  </TabsContent>
</Tabs>
```

## 🔧 Available Hooks

### useI18n()

```tsx
const { locale, t, getContent } = useI18n();

// locale: 'en' | 'id'
// t: translation function
// getContent: get localized content from LocalizedContent
```

### useI18nTranslations(namespace)

```tsx
const t = useI18nTranslations("projects");

// t('title') => "Projects" or "Proyek"
// t('addProject') => "Add Project" or "Tambah Proyek"
```

## 📚 Translation Keys

Lihat file `messages/en.json` dan `messages/id.json` untuk semua translation keys yang tersedia.

**Namespace yang tersedia:**

- `common` - Common UI elements
- `nav` - Navigation
- `dashboard` - Dashboard pages
- `profile` - Profile section
- `skills` - Skills section
- `career` - Career section
- `achievements` - Achievements section
- `projects` - Projects section
- `certificates` - Certificates section
- `cv` - CV section
- `contact` - Contact section
- `validation` - Form validation messages
- `months` - Month names
- `home` - Homepage sections

## 🔄 Migration Data Lama

Jika Anda memiliki data lama yang perlu di-migrate:

```typescript
// Contoh migration
const oldProject = {
  title: "My Project",
  description: "Project description",
};

const newProject = {
  title: {
    en: oldProject.title,
    id: oldProject.title, // Duplicate dulu, edit manual nanti
  },
  description: {
    en: oldProject.description,
    id: oldProject.description,
  },
};
```

## ✅ Best Practices

1. **Selalu isi kedua bahasa** - Jangan biarkan field kosong
2. **Gunakan Tabs untuk form** - Lebih user-friendly
3. **Validasi kedua bahasa** - Pastikan validasi mencakup EN dan ID
4. **Fallback ke English** - Jika ID kosong, gunakan EN
5. **Consistent naming** - Gunakan `_en` dan `_id` suffix untuk form fields

## 📖 Dokumentasi Lengkap

Lihat `docs/i18n-firestore-guide.md` untuk panduan lengkap termasuk:

- Struktur data detail
- Contoh component lengkap
- Migration scripts
- Advanced usage

## 🐛 Troubleshooting

### Translations tidak muncul

- Pastikan file `messages/en.json` dan `messages/id.json` ada
- Check console untuk error loading messages
- Pastikan key translation ada di file JSON

### LocalizedContent tidak ter-render

- Pastikan menggunakan `getContent()` dari `useI18n()`
- Check struktur data di Firestore sudah benar
- Pastikan field memiliki property `en` dan `id`

### Language switcher tidak bekerja

- Check cookie `locale` di browser
- Clear cache dan reload page
- Pastikan middleware sudah setup dengan benar
