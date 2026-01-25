# 🌍 i18n Quick Reference

## 🚀 Import yang Dibutuhkan

```tsx
// Untuk UI text (translations)
import { useTranslations } from "next-intl";

// Untuk LocalizedContent dari Firestore
import { useI18n } from "@/hooks/use-i18n";

// Untuk form multi-bahasa
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Untuk language switcher
import { LanguageSwitcher } from "@/components/language-switcher";
```

## 📝 Pattern Penggunaan

### 1. UI Text (Hardcoded Text)

```tsx
export function MyComponent() {
  const t = useTranslations("namespace"); // namespace: common, nav, dashboard, etc.

  return (
    <div>
      <h1>{t("title")}</h1>
      <button>{t("save")}</button>
      <p>{t("description")}</p>
    </div>
  );
}
```

### 2. Data dari Firestore (LocalizedContent)

```tsx
export function ProjectCard({ project }) {
  const { getContent } = useI18n();

  return (
    <div>
      <h3>{getContent(project.title)}</h3>
      <p>{getContent(project.description)}</p>
    </div>
  );
}
```

### 3. Form Multi-bahasa

```tsx
export function EditDialog() {
  const t = useTranslations("projects");
  const [data, setData] = useState({
    title: { en: "", id: "" },
    description: { en: "", id: "" },
  });

  return (
    <Tabs defaultValue="en">
      <TabsList>
        <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
        <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
      </TabsList>

      <TabsContent value="en">
        <Input
          placeholder="Title"
          value={data.title.en}
          onChange={(e) =>
            setData({
              ...data,
              title: { ...data.title, en: e.target.value },
            })
          }
        />
      </TabsContent>

      <TabsContent value="id">
        <Input
          placeholder="Judul"
          value={data.title.id}
          onChange={(e) =>
            setData({
              ...data,
              title: { ...data.title, id: e.target.value },
            })
          }
        />
      </TabsContent>
    </Tabs>
  );
}
```

### 4. Submit Form dengan LocalizedContent

```tsx
const handleSubmit = (values) => {
  const projectData = {
    title: {
      en: values.title_en,
      id: values.title_id,
    },
    description: {
      en: values.description_en,
      id: values.description_id,
    },
    // ... other fields
  };

  await addProject(projectData);
};
```

## 🗂️ Translation Namespaces

| Namespace      | Digunakan untuk            |
| -------------- | -------------------------- |
| `common`       | Button, label, status umum |
| `nav`          | Navigation menu            |
| `dashboard`    | Dashboard pages            |
| `profile`      | Profile section            |
| `description`  | Description section        |
| `skills`       | Skills section             |
| `career`       | Career section             |
| `achievements` | Achievements section       |
| `projects`     | Projects section           |
| `certificates` | Certificates section       |
| `cv`           | CV section                 |
| `contact`      | Contact section            |
| `validation`   | Form validation messages   |
| `months`       | Month names                |
| `home`         | Homepage sections          |

## 🔑 Common Translation Keys

### Common

```tsx
t("common.loading"); // "Loading..." / "Memuat..."
t("common.save"); // "Save" / "Simpan"
t("common.cancel"); // "Cancel" / "Batal"
t("common.delete"); // "Delete" / "Hapus"
t("common.edit"); // "Edit" / "Edit"
t("common.add"); // "Add" / "Tambah"
t("common.noData"); // "No data available" / "Tidak ada data"
t("common.error"); // "An error occurred" / "Terjadi kesalahan"
t("common.success"); // "Success" / "Berhasil"
```

### Validation

```tsx
t("validation.required"); // "This field is required"
t("validation.email"); // "Please enter a valid email"
t("validation.url"); // "Please enter a valid URL"
```

### Months

```tsx
t("months.1"); // "January" / "Januari"
t("months.2"); // "February" / "Februari"
// ... dst
```

## 📊 LocalizedContent Fields

Field yang menggunakan `LocalizedContent` (object dengan `en` dan `id`):

```typescript
UserProfile: -jobTitle - about;

UserDescription: -description;

UserCareer: -position - description(optional);

UserAchievement: -title - category;

UserProject: -title - description;
```

## 🎨 Form Pattern dengan React Hook Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title_en: z.string().min(3, "Title must be at least 3 characters"),
  title_id: z.string().min(3, "Judul minimal 3 karakter"),
  description_en: z.string().min(10),
  description_id: z.string().min(10),
});

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title_en: "",
      title_id: "",
      description_en: "",
      description_id: "",
    },
  });

  const handleSubmit = (values) => {
    const data = {
      title: { en: values.title_en, id: values.title_id },
      description: { en: values.description_en, id: values.description_id },
    };
    // Save data
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Tabs defaultValue="en">
          <TabsList>
            <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
            <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
          </TabsList>

          <TabsContent value="en">
            <FormField
              control={form.control}
              name="title_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="id">
            <FormField
              control={form.control}
              name="title_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## 🔄 Update Existing Data

### Load data untuk edit:

```tsx
const form = useForm({
  defaultValues: {
    title_en: existingData?.title?.en || "",
    title_id: existingData?.title?.id || "",
    description_en: existingData?.description?.en || "",
    description_id: existingData?.description?.id || "",
  },
});
```

## 🌐 Language Switcher

```tsx
import { LanguageSwitcher } from "@/components/language-switcher";

// Di header atau navigation
<LanguageSwitcher className="..." />;
```

## 🎯 Best Practices

1. **Selalu isi kedua bahasa**

   ```tsx
   // ✅ Good
   title: { en: "My Project", id: "Proyek Saya" }

   // ❌ Bad
   title: { en: "My Project", id: "" }
   ```

2. **Gunakan getContent untuk display**

   ```tsx
   // ✅ Good
   <h1>{getContent(project.title)}</h1>

   // ❌ Bad
   <h1>{project.title.en}</h1> // Tidak responsive terhadap locale
   ```

3. **Gunakan Tabs untuk form**

   ```tsx
   // ✅ Good - User friendly
   <Tabs>
     <TabsContent value="en">...</TabsContent>
     <TabsContent value="id">...</TabsContent>
   </Tabs>

   // ❌ Bad - Terlalu panjang
   <div>
     <Input name="title_en" />
     <Input name="title_id" />
     <Textarea name="desc_en" />
     <Textarea name="desc_id" />
   </div>
   ```

4. **Validasi kedua bahasa**

   ```tsx
   // ✅ Good
   const schema = z.object({
     title_en: z.string().min(3),
     title_id: z.string().min(3),
   });

   // ❌ Bad
   const schema = z.object({
     title_en: z.string().min(3),
     title_id: z.string().optional(), // ID jadi optional
   });
   ```

## 🐛 Common Issues

### Issue: Translation not found

```tsx
// ❌ Wrong
t("projects.titl"); // Typo

// ✅ Correct
t("projects.title");
```

### Issue: LocalizedContent undefined

```tsx
// ❌ Wrong
<h1>{project.title}</h1> // Akan tampil [object Object]

// ✅ Correct
<h1>{getContent(project.title)}</h1>
```

### Issue: Form tidak save LocalizedContent

```tsx
// ❌ Wrong
const data = {
  title: values.title_en, // Hanya save EN
};

// ✅ Correct
const data = {
  title: {
    en: values.title_en,
    id: values.title_id,
  },
};
```

## 📚 Dokumentasi Lengkap

- **Quick Start**: `docs/i18n-README.md`
- **Firestore Guide**: `docs/i18n-firestore-guide.md`
- **Implementation Summary**: `docs/i18n-IMPLEMENTATION-SUMMARY.md`
- **Update Checklist**: `docs/i18n-UPDATE-CHECKLIST.md`
- **Contoh Components**: `components/examples/`

## 🆘 Need Help?

1. Check translation keys di `messages/en.json` dan `messages/id.json`
2. Lihat contoh component di `components/examples/`
3. Baca dokumentasi lengkap di `docs/`
4. Check console untuk error messages
