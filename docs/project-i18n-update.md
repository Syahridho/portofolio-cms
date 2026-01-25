# ✅ Update Project Multi-bahasa - Selesai!

## 🎉 Yang Sudah Dikerjakan

### 1. **Update Types**

✅ `types/index.ts` - `UserProject` interface

- ✅ `title`: `LocalizedContent` (sudah ada)
- ✅ `description`: `LocalizedContent` (sudah ada)
- ✅ `githubUrl`: `string` (sudah ada)

```typescript
export interface UserProject {
  id: string;
  title: LocalizedContent; // ✅ Multi-bahasa
  description: LocalizedContent; // ✅ Multi-bahasa
  image: string;
  month: number;
  year: number;
  technologies: string[];
  githubUrl: string;
}
```

### 2. **Update Schema**

✅ `lib/schemas.ts` - `userProjectSchema`

**Perubahan:**

```typescript
// Sebelum
title: z.string().min(3);
description: z.string().min(10);
github_url: z.string().url().optional();

// Sesudah
title_en: z.string().min(3, "Title must be at least 3 characters");
title_id: z.string().min(3, "Judul project minimal 3 karakter");
description_en: z.string().min(
  10,
  "Description must be at least 10 characters",
);
description_id: z.string().min(10, "Deskripsi minimal 10 karakter");
githubUrl: z.string().url("GitHub URL harus valid").optional();
```

### 3. **Update Projects Page**

✅ `app/dashboard/projects/page.tsx`

**Perubahan:**

- ✅ Import `useI18n` hook
- ✅ Gunakan `getContent()` untuk display title dan description
- ✅ Update filter search untuk support LocalizedContent
- ✅ Update AlertDialog untuk display title dengan getContent

**Sebelum:**

```tsx
p.title.toLowerCase().includes(searchQuery.toLowerCase())
<span>{project.title}</span>
<span>{project.description}</span>
```

**Sesudah:**

```tsx
const { getContent } = useI18n();
getContent(p.title).toLowerCase().includes(searchQuery.toLowerCase())
<span>{getContent(project.title)}</span>
<span>{getContent(project.description)}</span>
```

### 4. **Update EditProjectDialog**

✅ `components/edit-project-dialog.tsx` - **DIBUAT ULANG**

**Perubahan Besar:**

- ✅ Import `Tabs` components
- ✅ Update form defaultValues untuk `title_en`, `title_id`, `description_en`, `description_id`
- ✅ Update `useEffect` untuk handle LocalizedContent saat edit
- ✅ Update `onSubmit` untuk convert form values ke LocalizedContent
- ✅ Replace Title field dengan **Tabs** (ID/EN)
- ✅ Replace Description field dengan **Tabs** (ID/EN)
- ✅ Fix field name: `github_url` → `githubUrl`

**UI Baru - Title Field:**

```tsx
<Tabs defaultValue="id">
  <TabsList>
    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
  </TabsList>

  <TabsContent value="id">
    <Input name="title_id" placeholder="Contoh: Website E-Commerce" />
  </TabsContent>

  <TabsContent value="en">
    <Input name="title_en" placeholder="Example: E-Commerce Website" />
  </TabsContent>
</Tabs>
```

**UI Baru - Description Field:**

```tsx
<Tabs defaultValue="id">
  <TabsList>
    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
  </TabsList>

  <TabsContent value="id">
    <Textarea name="description_id" placeholder="Ceritakan..." />
  </TabsContent>

  <TabsContent value="en">
    <Textarea name="description_en" placeholder="Tell about..." />
  </TabsContent>
</Tabs>
```

**Data Conversion di onSubmit:**

```typescript
const projectData: UserProject = {
  // ... other fields
  title: {
    en: values.title_en,
    id: values.title_id,
  },
  description: {
    en: values.description_en,
    id: values.description_id,
  },
  githubUrl: values.githubUrl || "",
};
```

## 📊 Struktur Data di Firestore

**Collection:** `userProfile`  
**Document:** `projects`

```json
{
  "items": [
    {
      "id": "1234567890",
      "title": {
        "en": "E-Commerce Website",
        "id": "Website E-Commerce"
      },
      "description": {
        "en": "A full-stack e-commerce platform built with Next.js and Node.js",
        "id": "Platform e-commerce full-stack yang dibangun dengan Next.js dan Node.js"
      },
      "image": "https://example.com/project.jpg",
      "month": 6,
      "year": 2024,
      "technologies": ["Next.js", "Node.js", "MongoDB", "TailwindCSS"],
      "githubUrl": "https://github.com/username/ecommerce"
    }
  ]
}
```

## 🔄 Flow Data

### Submit Form:

```
User Input (Tabs)
  ↓
Form Values: {
  title_en, title_id,
  description_en, description_id,
  image, month, year, technologies, githubUrl
}
  ↓
Convert to LocalizedContent: {
  title: { en, id },
  description: { en, id },
  ...
}
  ↓
addProject() / updateProject() → Firestore
```

### Display Data:

```
Firestore → { title: { en, id }, description: { en, id } }
  ↓
useProjects() hook
  ↓
getContent(title) → Tampil sesuai locale
getContent(description) → Tampil sesuai locale
  ↓
User melihat project dalam bahasa yang dipilih
```

## 🎯 Cara Menggunakan

### 1. **Add/Edit Project**

1. Buka halaman `/dashboard/projects`
2. Klik "Tambah Project" atau Edit pada project existing
3. Upload gambar project (opsional)
4. **Title:**
   - Klik tab 🇮🇩 Indonesia → "Website E-Commerce"
   - Klik tab 🇬🇧 English → "E-Commerce Website"
5. **Description:**
   - Klik tab 🇮🇩 Indonesia → "Platform e-commerce full-stack..."
   - Klik tab 🇬🇧 English → "A full-stack e-commerce platform..."
6. Tambahkan teknologi (React, Node.js, dll)
7. Isi GitHub URL (opsional)
8. Pilih bulan dan tahun
9. Klik "Tambah Project" atau "Perbarui Project"

### 2. **Lihat Hasil**

1. Gunakan Language Switcher untuk ganti bahasa
2. Title dan Description akan otomatis berubah sesuai bahasa
3. Jika bahasa Indonesia dipilih → tampil `title.id` dan `description.id`
4. Jika bahasa English dipilih → tampil `title.en` dan `description.en`

## ✨ Fitur

- ✅ Input terpisah untuk EN dan ID dengan Tabs
- ✅ Validasi untuk kedua bahasa title dan description (wajib)
- ✅ Auto-display sesuai bahasa yang dipilih user
- ✅ Smooth transition saat ganti bahasa
- ✅ Support edit existing data (backward compatible)
- ✅ Upload image tetap berfungsi
- ✅ Technologies management tetap berfungsi
- ✅ Search filter support multi-bahasa

## 🔧 Backward Compatibility

Code sudah handle data lama yang masih format string:

```typescript
// Di useEffect
title_en: typeof project.title === "string"
  ? project.title
  : project.title?.en || "";
```

Ini memastikan data lama tetap bisa diedit tanpa error.

## 🐛 Troubleshooting

### Error: "title is not defined"

**Solusi:** Pastikan data di Firestore sudah format `LocalizedContent`:

```json
{
  "title": {
    "en": "...",
    "id": "..."
  }
}
```

### Title/Description tidak berubah saat ganti bahasa

**Solusi:**

1. Check apakah `getContent()` sudah digunakan di projects page
2. Pastikan LanguageSwitcher berfungsi
3. Clear cache browser dan reload

### Form validation error

**Solusi:** Pastikan kedua field title dan description (EN dan ID) diisi sesuai minimal karakter

### Build error "Parsing ecmascript source code failed"

**Solusi:** File `edit-project-dialog.tsx` sudah diperbaiki dan dibuat ulang dengan struktur yang benar

## 📝 Files yang Diubah

1. ✅ `lib/schemas.ts` - Update userProjectSchema + fix githubUrl
2. ✅ `app/dashboard/projects/page.tsx` - Display dengan i18n + search filter
3. ✅ `components/edit-project-dialog.tsx` - **DIBUAT ULANG** dengan Tabs multi-bahasa

## 🎉 Selesai!

Project sekarang sudah support multi-bahasa! User bisa:

- ✅ Input title dan description dalam 2 bahasa
- ✅ Lihat project sesuai bahasa yang dipilih
- ✅ Switch bahasa dengan smooth
- ✅ Edit data lama tanpa masalah
- ✅ Search project dalam kedua bahasa

**Happy coding! 🚀**
