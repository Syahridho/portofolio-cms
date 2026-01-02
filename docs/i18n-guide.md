# Multi-Language Implementation Guide

## Overview

Sistem multi-bahasa telah diimplementasikan menggunakan pendekatan sederhana dengan React Context dan localStorage untuk menyimpan preferensi bahasa pengguna.

## Bahasa yang Didukung

- **English (en)** - Default
- **Indonesia (id)**

## Komponen Utama

### 1. Language Switcher

Tombol dropdown untuk mengganti bahasa, terletak di:

- **Desktop**: Pojok kiri atas sidebar (berlawanan dengan theme toggler)
- **Mobile**: Sebelah kiri tombol menu hamburger

### 2. Struktur File

```
lib/
├── i18n-simple.ts          # Definisi terjemahan dan context
└── locale-provider.tsx     # Provider untuk mengelola state bahasa

components/
└── language-switcher.tsx   # Komponen dropdown pemilih bahasa
```

### 3. Cara Menambah Terjemahan Baru

Edit file `lib/i18n-simple.ts`:

```typescript
export const translations = {
  en: {
    common: {
      home: "Home",
      // Tambahkan terjemahan baru di sini
      newKey: "New Text",
    },
  },
  id: {
    common: {
      home: "Beranda",
      // Tambahkan terjemahan Indonesia di sini
      newKey: "Teks Baru",
    },
  },
};
```

### 4. Cara Menggunakan Terjemahan di Komponen

```tsx
import { useLocale } from "@/lib/i18n-simple";

export function MyComponent() {
  const { t, locale, setLocale } = useLocale();

  return (
    <div>
      <h1>{t.common.home}</h1>
      <p>Current language: {locale}</p>
      <button onClick={() => setLocale("id")}>Ganti ke Indonesia</button>
    </div>
  );
}
```

### 5. Fitur

✅ Tombol language switcher dengan dropdown
✅ Penyimpanan preferensi bahasa di localStorage
✅ Smooth transition saat mengganti bahasa
✅ Icon bendera untuk setiap bahasa (🇬🇧 English, 🇮🇩 Indonesia)
✅ Highlight bahasa yang sedang aktif
✅ Responsive (desktop & mobile)

## Catatan Penting

- Preferensi bahasa disimpan di `localStorage` dengan key `"locale"`
- Default bahasa adalah **English (en)**
- Untuk menambah bahasa baru, tambahkan di array `locales` dan object `translations`
- Semua komponen yang menggunakan terjemahan harus dibungkus dengan `<LocaleProvider>`

## Contoh Implementasi

Sudah diimplementasikan di:

- ✅ Navigation menu (Home, Project, Certificate, Contact)
- ✅ Social Media label

Untuk halaman lain, gunakan hook `useLocale()` dan akses terjemahan melalui `t` object.
