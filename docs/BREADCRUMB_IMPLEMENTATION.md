# Implementasi Dynamic Breadcrumb

## 📋 Ringkasan

Breadcrumb dinamis telah berhasil dipasang di semua halaman dashboard. Breadcrumb akan otomatis menampilkan path navigasi berdasarkan URL yang sedang dibuka.

## 🎯 Komponen yang Dibuat/Dimodifikasi

### 1. **DynamicBreadcrumb Component** (`components/dynamic-breadcrumb.tsx`)
   - Komponen client-side yang membaca pathname dari Next.js
   - Otomatis generate breadcrumb berdasarkan URL segments
   - Mendukung custom labels untuk setiap path
   - Menggunakan komponen UI breadcrumb dari shadcn/ui

### 2. **SiteHeader Component** (`components/site-header.tsx`)
   - Diupdate untuk menggunakan `DynamicBreadcrumb`
   - Menggantikan teks statis "Document" dengan breadcrumb dinamis

## 📍 Halaman yang Sudah Terpasang

Breadcrumb sudah otomatis terpasang di semua halaman dashboard:
- ✅ `/dashboard` - Dashboard
- ✅ `/dashboard/home` - Dashboard > Home
- ✅ `/dashboard/projects` - Dashboard > Projects
- ✅ `/dashboard/certificates` - Dashboard > Certificates
- ✅ `/dashboard/contact` - Dashboard > Contact

## 🎨 Contoh Tampilan Breadcrumb

```
Home > Dashboard
Home > Dashboard > Projects
Home > Dashboard > Certificates
Home > Dashboard > Contact
```

## ⚙️ Cara Kerja

1. **Automatic Path Detection**: Komponen menggunakan `usePathname()` dari Next.js untuk mendapatkan URL saat ini
2. **Path Segmentation**: URL dipecah menjadi segments (contoh: `/dashboard/projects` → `['dashboard', 'projects']`)
3. **Label Mapping**: Setiap segment dikonversi ke label yang user-friendly menggunakan `pathLabelMap`
4. **Dynamic Rendering**: Breadcrumb di-render dengan link untuk navigasi, kecuali item terakhir (current page)

## 🔧 Kustomisasi Label

Untuk menambah atau mengubah label breadcrumb, edit object `pathLabelMap` di `components/dynamic-breadcrumb.tsx`:

```typescript
const pathLabelMap: Record<string, string> = {
  dashboard: "Dashboard",
  home: "Home",
  projects: "Projects",
  certificates: "Certificates",
  contact: "Contact",
  // Tambahkan mapping baru di sini
};
```

## 📝 Fitur

- ✅ **Dinamis**: Otomatis update berdasarkan URL
- ✅ **Clickable**: Setiap breadcrumb item (kecuali current page) bisa diklik untuk navigasi
- ✅ **Responsive**: Tampilan menyesuaikan dengan ukuran layar
- ✅ **Accessible**: Menggunakan proper ARIA attributes
- ✅ **Styled**: Menggunakan design system dari shadcn/ui

## 🚀 Testing

Untuk menguji breadcrumb:
1. Login ke aplikasi
2. Navigasi ke berbagai halaman dashboard
3. Perhatikan breadcrumb di header akan berubah sesuai halaman yang dibuka
4. Klik pada breadcrumb item untuk navigasi ke halaman tersebut

## 📦 Dependencies

- `next/navigation` - untuk `usePathname()` dan `Link`
- `@/components/ui/breadcrumb` - komponen UI dari shadcn/ui
- `lucide-react` - untuk icon separator (ChevronRight)
