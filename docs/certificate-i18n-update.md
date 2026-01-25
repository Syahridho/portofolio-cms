# ✅ Update Certificate Multi-bahasa - Selesai!

## 🎉 Yang Sudah Dikerjakan

### 1. **Update Types**

✅ `types/index.ts` - `UserCertificate` interface

**Perubahan:**

```typescript
// Sebelum
export interface UserCertificate {
  id: string;
  name: string;
  issuer: string;
  month: number;
  year: number;
  image?: string;
  credentialUrl?: string;
}

// Sesudah
export interface UserCertificate {
  id: string;
  name: LocalizedContent; // ✅ Multi-bahasa
  issuer: string;
  month: number;
  year: number;
  image?: string;
  credentialUrl?: string;
}
```

### 2. **Update Schema**

✅ `lib/schemas.ts` - `userCertificateSchema`

**Perubahan:**

```typescript
// Sebelum
name: z.string().min(3);
credential_url: z.string().url().optional();

// Sesudah
name_en: z.string().min(3, "Certificate name must be at least 3 characters");
name_id: z.string().min(3, "Nama sertifikat minimal 3 karakter");
credentialUrl: z.string().url("Credential URL harus valid").optional();
```

### 3. **Update Certificates Page**

✅ `app/dashboard/certificates/page.tsx`

**Perubahan:**

- ✅ Import `useI18n` hook
- ✅ Gunakan `getContent()` untuk display name
- ✅ Update filter search untuk support LocalizedContent
- ✅ Update AlertDialog untuk display name dengan getContent
- ✅ Fix field name: `credential_url` → `credentialUrl`

**Sebelum:**

```tsx
<h3>{cert.name}</h3>
{cert.credential_url && ...}
```

**Sesudah:**

```tsx
const { getContent } = useI18n();
<h3>{getContent(cert.name)}</h3>
{cert.credentialUrl && ...}
```

### 4. **Update EditCertificateDialog**

✅ `components/edit-certificate-dialog.tsx` - **DIBUAT ULANG**

**Perubahan Besar:**

- ✅ Import `Tabs` components
- ✅ Update form defaultValues untuk `name_en`, `name_id`
- ✅ Update `useEffect` untuk handle LocalizedContent saat edit
- ✅ Update `onSubmit` untuk convert form values ke LocalizedContent
- ✅ Replace Name field dengan **Tabs** (ID/EN)
- ✅ Fix field name: `credential_url` → `credentialUrl`

**UI Baru - Name Field:**

```tsx
<Tabs defaultValue="id">
  <TabsList>
    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
  </TabsList>

  <TabsContent value="id">
    <Input name="name_id" placeholder="Contoh: Arsitek Solusi..." />
  </TabsContent>

  <TabsContent value="en">
    <Input name="name_en" placeholder="Example: AWS Certified..." />
  </TabsContent>
</Tabs>
```

**Data Conversion di onSubmit:**

```typescript
const certificateData: UserCertificate = {
  // ... other fields
  name: {
    en: values.name_en,
    id: values.name_id,
  },
  credentialUrl: values.credentialUrl || "",
};
```

## 📊 Struktur Data di Firestore

**Collection:** `userProfile`  
**Document:** `certificates`

```json
{
  "items": [
    {
      "id": "1234567890",
      "name": {
        "en": "AWS Certified Solutions Architect - Associate",
        "id": "Arsitek Solusi Bersertifikat AWS - Associate"
      },
      "issuer": "Amazon Web Services",
      "month": 6,
      "year": 2024,
      "image": "https://example.com/certificate.jpg",
      "credentialUrl": "https://www.credly.com/badges/..."
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
  name_en, name_id,
  issuer, month, year, image, credentialUrl
}
  ↓
Convert to LocalizedContent: {
  name: { en, id },
  ...
}
  ↓
addCertificate() / updateCertificate() → Firestore
```

### Display Data:

```
Firestore → { name: { en, id } }
  ↓
useCertificates() hook
  ↓
getContent(name) → Tampil sesuai locale
  ↓
User melihat certificate dalam bahasa yang dipilih
```

## 🎯 Cara Menggunakan

### 1. **Add/Edit Certificate**

1. Buka halaman `/dashboard/certificates`
2. Klik "Tambah Sertifikat" atau Edit pada certificate existing
3. Upload gambar certificate (opsional)
4. **Name:**
   - Klik tab 🇮🇩 Indonesia → "Arsitek Solusi Bersertifikat AWS"
   - Klik tab 🇬🇧 English → "AWS Certified Solutions Architect"
5. Isi Penerbit (Issuer)
6. Pilih bulan dan tahun
7. Isi Credential URL (opsional)
8. Klik "Tambah Sertifikat" atau "Perbarui Sertifikat"

### 2. **Lihat Hasil**

1. Gunakan Language Switcher untuk ganti bahasa
2. Name akan otomatis berubah sesuai bahasa
3. Jika bahasa Indonesia dipilih → tampil `name.id`
4. Jika bahasa English dipilih → tampil `name.en`

## ✨ Fitur

- ✅ Input terpisah untuk EN dan ID dengan Tabs
- ✅ Validasi untuk kedua bahasa name (wajib)
- ✅ Auto-display sesuai bahasa yang dipilih user
- ✅ Smooth transition saat ganti bahasa
- ✅ Support edit existing data (backward compatible)
- ✅ Upload image tetap berfungsi
- ✅ Search filter support multi-bahasa
- ✅ Grid layout dengan hover effects

## 🔧 Backward Compatibility

Code sudah handle data lama yang masih format string:

```typescript
// Di useEffect
name_en: typeof certificate.name === "string"
  ? certificate.name
  : certificate.name?.en || "";
```

Ini memastikan data lama tetap bisa diedit tanpa error.

## 🐛 Troubleshooting

### Error: "name is not defined"

**Solusi:** Pastikan data di Firestore sudah format `LocalizedContent`:

```json
{
  "name": {
    "en": "...",
    "id": "..."
  }
}
```

### Name tidak berubah saat ganti bahasa

**Solusi:**

1. Check apakah `getContent()` sudah digunakan di certificates page
2. Pastikan LanguageSwitcher berfungsi
3. Clear cache browser dan reload

### Form validation error

**Solusi:** Pastikan kedua field name (EN dan ID) diisi minimal 3 karakter

## 📝 Files yang Diubah

1. ✅ `types/index.ts` - Update UserCertificate interface
2. ✅ `lib/schemas.ts` - Update userCertificateSchema + fix credentialUrl
3. ✅ `app/dashboard/certificates/page.tsx` - Display dengan i18n + search filter
4. ✅ `components/edit-certificate-dialog.tsx` - **DIBUAT ULANG** dengan Tabs

## 🎉 Selesai!

Certificate sekarang sudah support multi-bahasa! User bisa:

- ✅ Input name dalam 2 bahasa
- ✅ Lihat certificate sesuai bahasa yang dipilih
- ✅ Switch bahasa dengan smooth
- ✅ Edit data lama tanpa masalah
- ✅ Search certificate dalam kedua bahasa

**Happy coding! 🚀**
