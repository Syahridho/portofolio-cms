# Panduan i18n untuk Firestore

## Struktur Data Multi-bahasa di Firestore

Untuk data yang perlu mendukung multi-bahasa, gunakan struktur `LocalizedContent`:

```typescript
interface LocalizedContent {
  en: string;
  id: string;
}
```

## Contoh Struktur Data di Firestore

### 1. UserProfile

```json
{
  "name": "John Doe",
  "jobTitle": {
    "en": "Full Stack Developer",
    "id": "Pengembang Full Stack"
  },
  "about": {
    "en": "Passionate developer with 5 years of experience",
    "id": "Pengembang yang passionate dengan pengalaman 5 tahun"
  },
  "photoURL": "https://example.com/photo.jpg",
  "socials": {
    "email": "john@example.com",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "instagram": "https://instagram.com/johndoe",
    "whatsapp": "https://wa.me/1234567890"
  }
}
```

### 2. UserDescription

```json
{
  "name": "John Doe",
  "description": {
    "en": "I am a passionate full-stack developer...",
    "id": "Saya adalah pengembang full-stack yang passionate..."
  }
}
```

### 3. UserProject

```json
{
  "id": "project-1",
  "title": {
    "en": "E-Commerce Platform",
    "id": "Platform E-Commerce"
  },
  "description": {
    "en": "A modern e-commerce platform built with Next.js",
    "id": "Platform e-commerce modern yang dibangun dengan Next.js"
  },
  "image": "https://example.com/project.jpg",
  "month": 6,
  "year": 2024,
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "github_url": "https://github.com/johndoe/ecommerce"
}
```

### 4. UserCareer

```json
{
  "id": "career-1",
  "company": "Tech Company Inc.",
  "position": {
    "en": "Senior Full Stack Developer",
    "id": "Pengembang Full Stack Senior"
  },
  "location": "Jakarta, Indonesia",
  "startMonth": 1,
  "startYear": 2020,
  "endMonth": null,
  "endYear": null,
  "description": {
    "en": "Leading development of web applications...",
    "id": "Memimpin pengembangan aplikasi web..."
  },
  "logo": "https://example.com/logo.jpg",
  "gallery": ["https://example.com/img1.jpg"]
}
```

### 5. UserAchievement

```json
{
  "id": "achievement-1",
  "title": {
    "en": "Best Developer Award",
    "id": "Penghargaan Pengembang Terbaik"
  },
  "organization": "Tech Conference 2024",
  "location": "Jakarta, Indonesia",
  "month": 3,
  "year": 2024,
  "category": {
    "en": "Technology",
    "id": "Teknologi"
  },
  "logo": "https://example.com/award.jpg",
  "gallery": ["https://example.com/award1.jpg"]
}
```

## Cara Menggunakan di Component

### 1. Menggunakan useI18n Hook

```tsx
"use client";

import { useI18n } from "@/hooks/use-i18n";
import { UserProject } from "@/types";

export function ProjectCard({ project }: { project: UserProject }) {
  const { getContent, t } = useI18n();

  return (
    <div>
      <h3>{getContent(project.title)}</h3>
      <p>{getContent(project.description)}</p>
      <button>{t("common.viewAll")}</button>
    </div>
  );
}
```

### 2. Menggunakan useTranslations Hook

```tsx
"use client";

import { useTranslations } from "next-intl";

export function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <div>
      <h1>{t("title")}</h1>
      <button>{t("addProject")}</button>
    </div>
  );
}
```

## Cara Menyimpan Data ke Firestore

### 1. Menggunakan Form dengan Multi-bahasa

```tsx
"use client";

import { useState } from "react";
import { LocalizedContent } from "@/types";

export function EditProjectDialog() {
  const [titleEn, setTitleEn] = useState("");
  const [titleId, setTitleId] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descId, setDescId] = useState("");

  const handleSubmit = async () => {
    const projectData = {
      title: {
        en: titleEn,
        id: titleId,
      } as LocalizedContent,
      description: {
        en: descEn,
        id: descId,
      } as LocalizedContent,
      // ... other fields
    };

    // Save to Firestore
    await addProject(projectData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title (English)</label>
        <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
      </div>
      <div>
        <label>Title (Indonesia)</label>
        <input value={titleId} onChange={(e) => setTitleId(e.target.value)} />
      </div>
      <div>
        <label>Description (English)</label>
        <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} />
      </div>
      <div>
        <label>Description (Indonesia)</label>
        <textarea value={descId} onChange={(e) => setDescId(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
```

### 2. Menggunakan Tabs untuk Multi-bahasa Form

```tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function EditProjectDialog() {
  const [data, setData] = useState({
    title: { en: "", id: "" },
    description: { en: "", id: "" },
  });

  return (
    <Tabs defaultValue="en">
      <TabsList>
        <TabsTrigger value="en">English</TabsTrigger>
        <TabsTrigger value="id">Indonesia</TabsTrigger>
      </TabsList>

      <TabsContent value="en">
        <input
          placeholder="Title"
          value={data.title.en}
          onChange={(e) =>
            setData({
              ...data,
              title: { ...data.title, en: e.target.value },
            })
          }
        />
        <textarea
          placeholder="Description"
          value={data.description.en}
          onChange={(e) =>
            setData({
              ...data,
              description: { ...data.description, en: e.target.value },
            })
          }
        />
      </TabsContent>

      <TabsContent value="id">
        <input
          placeholder="Judul"
          value={data.title.id}
          onChange={(e) =>
            setData({
              ...data,
              title: { ...data.title, id: e.target.value },
            })
          }
        />
        <textarea
          placeholder="Deskripsi"
          value={data.description.id}
          onChange={(e) =>
            setData({
              ...data,
              description: { ...data.description, id: e.target.value },
            })
          }
        />
      </TabsContent>
    </Tabs>
  );
}
```

## Migration Data Lama

Jika Anda memiliki data lama yang perlu di-migrate ke format multi-bahasa:

```typescript
// Migration script example
async function migrateProjectsToMultiLanguage() {
  const projects = await getProjects();

  for (const project of projects) {
    const updatedProject = {
      ...project,
      title: {
        en: project.title, // Gunakan data lama sebagai English
        id: project.title, // Duplicate untuk sementara, edit manual nanti
      },
      description: {
        en: project.description,
        id: project.description,
      },
    };

    await updateProject(project.id, updatedProject);
  }
}
```

## Best Practices

1. **Selalu isi kedua bahasa** - Pastikan field `en` dan `id` selalu terisi
2. **Gunakan Tabs untuk form** - Lebih user-friendly daripada menampilkan semua field sekaligus
3. **Validasi kedua bahasa** - Pastikan validasi Zod mencakup kedua bahasa
4. **Fallback ke English** - Jika bahasa Indonesia kosong, gunakan English sebagai fallback
5. **Consistent naming** - Gunakan naming convention yang konsisten untuk field multi-bahasa
