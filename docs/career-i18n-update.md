# ✅ Update Career Multi-bahasa - Selesai!

## 🎉 Yang Sudah Dikerjakan

### 1. **Update Types**

✅ `types/index.ts` - `UserCareer` interface

- Fixed typo: `UserCarrer` → `UserCareer`
- Fixed typo: `UserAchivement` → `UserAchievement`
- Update `position` dari `string` → `LocalizedContent`
- Update `description` dari `string | undefined` → `LocalizedContent | undefined`
- Fixed field names: `github_url` → `githubUrl`, `credential_url` → `credentialUrl`

```typescript
export interface UserCareer {
  id: string;
  logo?: string;
  company: string;
  position: LocalizedContent; // ✅ Multi-bahasa
  location: string;
  startMonth: number;
  startYear: number;
  endMonth: number | null;
  endYear: number | null;
  description?: LocalizedContent; // ✅ Multi-bahasa
  gallery?: string[];
}
```

### 2. **Update Schema**

✅ `lib/schemas.ts` - `userCareerSchema`

**Perubahan:**

```typescript
// Sebelum
position: z.string().min(2);
description: z.string().optional();

// Sesudah
position_en: z.string().min(2, "Position must be at least 2 characters");
position_id: z.string().min(2, "Posisi minimal 2 karakter");
description_en: z.string().optional();
description_id: z.string().optional();
```

### 3. **Update CareerCard**

✅ `components/features/dashboard/home/CareerCard.tsx`

**Perubahan:**

- ✅ Import `useI18n` hook
- ✅ Fixed type: `UserCarrer` → `UserCareer`
- ✅ Gunakan `getContent()` untuk display position
- ✅ Gunakan `getContent()` untuk display description

**Sebelum:**

```tsx
<p>{career.position}</p>
<p>{career.description}</p>
```

**Sesudah:**

```tsx
const { getContent } = useI18n();
<p>{getContent(career.position)}</p>
<p>{getContent(career.description)}</p>
```

### 4. **Update EditCareerDialog**

✅ `components/edit-career-dialog.tsx`

**Perubahan Besar:**

- ✅ Import `LocalizedContent` type dan `Tabs` components
- ✅ Fixed all `UserCarrer` → `UserCareer`
- ✅ Update form defaultValues untuk `position_en`, `position_id`, `description_en`, `description_id`
- ✅ Update `handleEditClick` untuk handle LocalizedContent
- ✅ Update `onSubmit` untuk convert form values ke LocalizedContent
- ✅ Replace Position field dengan **Tabs** (ID/EN)
- ✅ Replace Description field dengan **Tabs** (ID/EN)

**UI Baru - Position Field:**

```tsx
<Tabs defaultValue="id">
  <TabsList>
    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
  </TabsList>

  <TabsContent value="id">
    <Input name="position_id" placeholder="Contoh: Software Engineer" />
  </TabsContent>

  <TabsContent value="en">
    <Input name="position_en" placeholder="Example: Software Engineer" />
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
const career: UserCareer = {
  // ... other fields
  position: {
    en: values.position_en,
    id: values.position_id,
  },
};

// Add description only if at least one language has content
if (values.description_en || values.description_id) {
  career.description = {
    en: values.description_en || "",
    id: values.description_id || "",
  };
}
```

## 📊 Struktur Data di Firestore

**Collection:** `userProfile`  
**Document:** `carrer`

```json
{
  "items": [
    {
      "id": "1234567890",
      "company": "Google Indonesia",
      "position": {
        "en": "Senior Software Engineer",
        "id": "Software Engineer Senior"
      },
      "location": "Jakarta, Indonesia",
      "startMonth": 1,
      "startYear": 2020,
      "endMonth": null,
      "endYear": null,
      "description": {
        "en": "Leading development of web applications using React and Node.js",
        "id": "Memimpin pengembangan aplikasi web menggunakan React dan Node.js"
      },
      "logo": "https://example.com/logo.jpg",
      "gallery": ["https://example.com/img1.jpg"]
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
  company,
  position_en, position_id,
  description_en, description_id,
  ...
}
  ↓
Convert to LocalizedContent: {
  company,
  position: { en, id },
  description: { en, id },
  ...
}
  ↓
addCareer() / updateCareer() → Firestore
```

### Display Data:

```
Firestore → { position: { en, id }, description: { en, id } }
  ↓
useCarrers() hook
  ↓
getContent(position) → Tampil sesuai locale
getContent(description) → Tampil sesuai locale
  ↓
User melihat career dalam bahasa yang dipilih
```

## 🎯 Cara Menggunakan

### 1. **Add/Edit Career**

1. Klik tombol Edit (✏️) di CareerCard
2. Klik "Tambah" untuk career baru atau Edit untuk career existing
3. Isi data perusahaan, lokasi, tanggal
4. **Position:**
   - Klik tab 🇮🇩 Indonesia → Isi posisi dalam bahasa Indonesia
   - Klik tab 🇬🇧 English → Isi posisi dalam bahasa Inggris
5. **Description (Opsional):**
   - Klik tab 🇮🇩 Indonesia → Isi deskripsi dalam bahasa Indonesia
   - Klik tab 🇬🇧 English → Isi deskripsi dalam bahasa Inggris
6. Upload logo dan gallery (opsional)
7. Klik "Simpan"

### 2. **Lihat Hasil**

1. Gunakan Language Switcher untuk ganti bahasa
2. Position dan Description akan otomatis berubah sesuai bahasa
3. Jika bahasa Indonesia dipilih → tampil `position.id` dan `description.id`
4. Jika bahasa English dipilih → tampil `position.en` dan `description.en`

## ✨ Fitur

- ✅ Input terpisah untuk EN dan ID dengan Tabs
- ✅ Validasi untuk kedua bahasa position (wajib)
- ✅ Description opsional untuk kedua bahasa
- ✅ Auto-display sesuai bahasa yang dipilih user
- ✅ Smooth transition saat ganti bahasa
- ✅ Support edit existing data (backward compatible)
- ✅ Upload logo dan gallery tetap berfungsi

## 🔧 Backward Compatibility

Code sudah handle data lama yang masih format string:

```typescript
// Di handleEditClick
position_en: typeof career.position === "string"
  ? career.position
  : career.position?.en || "";
```

Ini memastikan data lama tetap bisa diedit tanpa error.

## 🐛 Troubleshooting

### Error: "position is not defined"

**Solusi:** Pastikan data di Firestore sudah format `LocalizedContent`:

```json
{
  "position": {
    "en": "...",
    "id": "..."
  }
}
```

### Position/Description tidak berubah saat ganti bahasa

**Solusi:**

1. Check apakah `getContent()` sudah digunakan di CareerCard
2. Pastikan LanguageSwitcher berfungsi
3. Clear cache browser dan reload

### Form validation error

**Solusi:** Pastikan kedua field position (EN dan ID) diisi minimal 2 karakter

## 📝 Files yang Diubah

1. ✅ `types/index.ts` - Update UserCareer interface
2. ✅ `lib/schemas.ts` - Update userCareerSchema
3. ✅ `components/features/dashboard/home/CareerCard.tsx` - Display dengan i18n
4. ✅ `components/edit-career-dialog.tsx` - Form dengan Tabs multi-bahasa

## 🎉 Selesai!

Career sekarang sudah support multi-bahasa! User bisa:

- ✅ Input position dan description dalam 2 bahasa
- ✅ Lihat career sesuai bahasa yang dipilih
- ✅ Switch bahasa dengan smooth
- ✅ Edit data lama tanpa masalah

**Happy coding! 🚀**
