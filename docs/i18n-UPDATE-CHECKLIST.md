# ✅ Checklist Update Components untuk i18n

## 📋 Component Update Checklist

### ✅ Setup (Sudah Selesai)

- [x] Install dan konfigurasi next-intl
- [x] Buat translation files (en.json, id.json)
- [x] Update types dengan LocalizedContent
- [x] Buat helper functions dan hooks
- [x] Setup NextIntlClientProvider di layout
- [x] Update LanguageSwitcher

### 🔄 Components yang Perlu Diupdate

#### 1. Dashboard Pages

**File: `app/dashboard/page.tsx`**

- [ ] Import `useTranslations` dari next-intl
- [ ] Replace hardcoded text dengan `t('key')`
- [ ] Update title, description, dan button labels

**File: `app/dashboard/home/page.tsx`**

- [ ] Update ProfileCard untuk gunakan `getContent()` untuk jobTitle dan about
- [ ] Update DescriptionCard untuk gunakan `getContent()` untuk description
- [ ] Replace UI text dengan translations

**File: `app/dashboard/skills/page.tsx`**

- [ ] Update title dan description dengan translations
- [ ] Update button labels
- [ ] Update category labels dengan translations

**File: `app/dashboard/career/page.tsx`**

- [ ] Update untuk gunakan `getContent()` untuk position dan description
- [ ] Update UI text dengan translations
- [ ] Update form labels

**File: `app/dashboard/achievements/page.tsx`**

- [ ] Update untuk gunakan `getContent()` untuk title dan category
- [ ] Update UI text dengan translations
- [ ] Update form labels

**File: `app/dashboard/projects/page.tsx`**

- [ ] Update untuk gunakan `getContent()` untuk title dan description
- [ ] Update UI text dengan translations
- [ ] Update form labels

**File: `app/dashboard/certificates/page.tsx`**

- [ ] Update UI text dengan translations
- [ ] Update form labels
- [ ] Update button labels

**File: `app/dashboard/cv/page.tsx`**

- [ ] Update UI text dengan translations
- [ ] Update form labels
- [ ] Update button labels

#### 2. Edit Dialogs

**Pattern untuk semua Edit Dialogs:**

```tsx
// Import
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Di component
const t = useTranslations("namespace");

// Untuk field multi-bahasa, gunakan Tabs
<Tabs defaultValue="en">
  <TabsList>
    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
  </TabsList>

  <TabsContent value="en">{/* Input fields untuk English */}</TabsContent>

  <TabsContent value="id">{/* Input fields untuk Indonesia */}</TabsContent>
</Tabs>;
```

**Dialogs yang perlu diupdate:**

- [ ] `components/features/dashboard/home/EditProfileDialog.tsx`

  - [ ] Add Tabs untuk jobTitle (en/id)
  - [ ] Add Tabs untuk about (en/id)
  - [ ] Update labels dengan translations

- [ ] `components/features/dashboard/home/EditDescriptionDialog.tsx`

  - [ ] Add Tabs untuk description (en/id)
  - [ ] Update labels dengan translations

- [ ] `components/features/dashboard/career/EditCareerDialog.tsx`

  - [ ] Add Tabs untuk position (en/id)
  - [ ] Add Tabs untuk description (en/id)
  - [ ] Update labels dengan translations

- [ ] `components/features/dashboard/achievements/EditAchievementDialog.tsx`

  - [ ] Add Tabs untuk title (en/id)
  - [ ] Add Tabs untuk category (en/id)
  - [ ] Update labels dengan translations

- [ ] `components/features/dashboard/projects/EditProjectDialog.tsx`
  - [ ] Add Tabs untuk title (en/id)
  - [ ] Add Tabs untuk description (en/id)
  - [ ] Update labels dengan translations
  - [ ] Lihat contoh di: `components/examples/edit-project-dialog-i18n.tsx`

#### 3. Display Components

**Components yang menampilkan data:**

- [ ] `components/features/dashboard/home/ProfileCard.tsx`

  ```tsx
  import { useI18n } from "@/hooks/use-i18n";
  const { getContent } = useI18n();

  // Gunakan getContent untuk LocalizedContent
  <p>{getContent(profile.jobTitle)}</p>
  <p>{getContent(profile.about)}</p>
  ```

- [ ] `components/features/dashboard/home/DescriptionCard.tsx`

  ```tsx
  <p>{getContent(description.description)}</p>
  ```

- [ ] `components/features/dashboard/career/CareerCard.tsx`

  ```tsx
  <h3>{getContent(career.position)}</h3>
  <p>{getContent(career.description)}</p>
  ```

- [ ] `components/features/dashboard/achievements/AchievementCard.tsx`

  ```tsx
  <h3>{getContent(achievement.title)}</h3>
  <span>{getContent(achievement.category)}</span>
  ```

- [ ] `components/features/dashboard/projects/ProjectCard.tsx`
  ```tsx
  <h3>{getContent(project.title)}</h3>
  <p>{getContent(project.description)}</p>
  ```

#### 4. Homepage Components

**File: `app/(public)/page.tsx`**

- [ ] Update hero section dengan translations
- [ ] Update section titles dengan translations
- [ ] Update button labels

**Components di homepage:**

- [ ] Hero section - gunakan `t('home.hero.*')`
- [ ] About section - gunakan `getContent()` untuk about
- [ ] Skills section - gunakan `t('home.skills.*')`
- [ ] Projects section - gunakan `getContent()` untuk project data
- [ ] Contact section - gunakan `t('home.contact.*')`

#### 5. Navigation & Layout

- [ ] `components/site-header.tsx`

  - [ ] Update navigation labels dengan `t('nav.*')`
  - [ ] Pastikan LanguageSwitcher sudah ada

- [ ] `components/site-footer.tsx`
  - [ ] Update footer text dengan translations

### 📝 Schema Updates (Optional tapi Recommended)

**File: `lib/schemas.ts`**

Update schemas untuk validasi multi-bahasa:

```typescript
// Contoh untuk userProfileSchema
export const userProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  photoURL: z.string().url("Must be a valid URL"),
  jobTitle_en: z.string().min(3, "Job title must be at least 3 characters"),
  jobTitle_id: z.string().min(3, "Pekerjaan minimal 3 karakter"),
  about_en: z.string().min(10, "About must be at least 10 characters"),
  about_id: z.string().min(10, "Tentang minimal 10 karakter"),
  socials: z.object({
    email: z.string().email("Must be a valid email"),
    linkedin: z.string().url("Must be a valid URL"),
    github: z.string().url("Must be a valid URL"),
    instagram: z.string().url("Must be a valid URL"),
    whatsapp: z.string().url("Must be a valid URL"),
  }),
});
```

Schemas yang perlu diupdate:

- [ ] `userProfileSchema`
- [ ] `userDescriptionSchema`
- [ ] `userCareerSchema`
- [ ] `userAchievementSchema`
- [ ] `userProjectSchema`

### 🗄️ Firestore Data Migration

Jika Anda sudah punya data di Firestore:

**Option 1: Manual Update via Firebase Console**

1. [ ] Buka Firebase Console
2. [ ] Edit setiap document
3. [ ] Update field dari string ke object `{ en: "...", id: "..." }`

**Option 2: Migration Script**

1. [ ] Buat script migration
2. [ ] Backup data terlebih dahulu
3. [ ] Run migration script
4. [ ] Verify data

Contoh migration script:

```typescript
// scripts/migrate-to-i18n.ts
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

async function migrateProjects() {
  const projectsRef = collection(db, "projects");
  const snapshot = await getDocs(projectsRef);

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();

    // Update title dan description
    await updateDoc(doc(db, "projects", docSnap.id), {
      title: {
        en: data.title,
        id: data.title, // Duplicate dulu, edit manual nanti
      },
      description: {
        en: data.description,
        id: data.description,
      },
    });
  }

  console.log("Migration completed!");
}
```

### 🧪 Testing Checklist

Setelah update, test hal-hal berikut:

- [ ] Switch bahasa dari EN ke ID dan sebaliknya
- [ ] Semua text UI berubah sesuai bahasa
- [ ] Data dari Firestore tampil dengan bahasa yang benar
- [ ] Form untuk add/edit data bisa input kedua bahasa
- [ ] Validasi form bekerja untuk kedua bahasa
- [ ] Tidak ada error di console
- [ ] Tidak ada missing translation keys
- [ ] Cookie locale tersimpan dengan benar
- [ ] Refresh page tetap maintain bahasa yang dipilih

### 📚 Referensi Cepat

**Untuk UI Text (hardcoded):**

```tsx
import { useTranslations } from "next-intl";
const t = useTranslations("namespace");
<button>{t("save")}</button>;
```

**Untuk Data dari Firestore:**

```tsx
import { useI18n } from "@/hooks/use-i18n";
const { getContent } = useI18n();
<h1>{getContent(data.title)}</h1>;
```

**Untuk Form Multi-bahasa:**

```tsx
<Tabs defaultValue="en">
  <TabsList>
    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
  </TabsList>
  <TabsContent value="en">
    <Input name="title_en" />
  </TabsContent>
  <TabsContent value="id">
    <Input name="title_id" />
  </TabsContent>
</Tabs>
```

### 🎯 Priority Order

**High Priority (Core Functionality):**

1. Dashboard pages
2. Edit dialogs untuk data yang sering diupdate
3. Homepage

**Medium Priority:** 4. Display components 5. Navigation & layout

**Low Priority:** 6. Schema updates (bisa dilakukan bertahap) 7. Data migration (jika sudah ada data)

### 💡 Tips

1. **Update satu component per waktu** - Jangan sekaligus semua
2. **Test setelah setiap update** - Pastikan tidak ada breaking changes
3. **Commit setelah setiap section** - Mudah rollback jika ada masalah
4. **Gunakan contoh component** - Lihat `components/examples/` untuk referensi
5. **Check translation keys** - Pastikan key ada di en.json dan id.json

### 📖 Dokumentasi

- Quick Start: `docs/i18n-README.md`
- Firestore Guide: `docs/i18n-firestore-guide.md`
- Implementation Summary: `docs/i18n-IMPLEMENTATION-SUMMARY.md`
- Contoh Components: `components/examples/`

---

**Good luck! 🚀**

Jika ada pertanyaan atau butuh bantuan, lihat dokumentasi atau contoh component yang sudah dibuat.
