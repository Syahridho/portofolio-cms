# Cara Menambahkan Teknologi/Skill Baru

Sistem skill sekarang menggunakan **Simple Icons** melalui **jsDelivr CDN** yang memungkinkan Anda menambahkan teknologi baru tanpa perlu import icon manual.

## Langkah-langkah:

### 1. Cari Slug Simple Icons

Kunjungi [https://simpleicons.org/](https://simpleicons.org/) dan cari teknologi yang ingin ditambahkan.

Contoh:

- **React** → slug: `react`
- **Vue.js** → slug: `vuedotjs`
- **Docker** → slug: `docker`
- **MongoDB** → slug: `mongodb`

### 2. Tambahkan ke `lib/skills-data.ts`

Buka file `lib/skills-data.ts` dan tambahkan entry baru:

```typescript
{
  id: "24",
  name: "Docker",
  category: "Tools & Others",
  slug: "docker"
}
```

**Field yang tersedia:**

- `id`: ID unik (increment dari yang terakhir)
- `name`: Nama teknologi yang akan ditampilkan
- `category`: Kategori skill (Frontend, Backend, Mobile, Database, Tools & Others)
- `slug`: Slug dari Simple Icons

### 3. Selesai!

Tidak perlu import icon atau mengubah komponen lain. Badge akan otomatis menampilkan icon berwarna dari Simple Icons CDN.

## Contoh Lengkap

Menambahkan Vue.js, Docker, dan MongoDB:

```typescript
export const initialSkills = [
  // ... skills yang sudah ada ...

  // Frontend
  { id: "24", name: "Vue.js", category: "Frontend", slug: "vuedotjs" },

  // Database
  { id: "25", name: "MongoDB", category: "Database", slug: "mongodb" },

  // Tools & Others
  { id: "26", name: "Docker", category: "Tools & Others", slug: "docker" },
];
```

## Tips

1. **Slug yang benar**: Pastikan slug sesuai dengan yang ada di Simple Icons. Beberapa teknologi menggunakan format khusus:

   - Next.js → `nextdotjs` (bukan `nextjs`)
   - Node.js → `nodedotjs` (bukan `nodejs`)
   - Vue.js → `vuedotjs` (bukan `vuejs`)

2. **Kategori yang tersedia**:

   - `Frontend`
   - `Backend`
   - `Mobile`
   - `Database`
   - `Tools & Others`

3. **Icon tidak muncul?** Periksa kembali slug di [simpleicons.org](https://simpleicons.org/)

## Keuntungan Sistem Ini

✅ Tidak perlu import icon manual  
✅ Icon selalu update dari CDN  
✅ Icon berwarna sesuai brand teknologi  
✅ Mudah menambahkan teknologi baru  
✅ Ukuran bundle lebih kecil
