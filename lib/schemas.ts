import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  photoURL: z
    .string()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Foto harus URL yang valid",
    }),
  jobTitle: z.string().min(3, "Pekerjaan minimal 3 karakter"),
  socials: z.object({
    email: z
      .string()
      .refine((val) => !val || z.string().email().safeParse(val).success, {
        message: "Email harus valid",
      }),
    linkedin: z
      .string()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "LinkedIn harus URL yang valid",
      }),
    github: z
      .string()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "GitHub harus URL yang valid",
      }),
    instagram: z
      .string()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "Instagram harus URL yang valid",
      }),
    whatsapp: z
      .string()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "WhatsApp harus URL yang valid",
      }),
  }),
});

export const userDescriptionSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  description_en: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  description_id: z.string().min(10, "Deskripsi minimal 10 karakter"),
});

export const userSkillSchema = z.object({
  name: z.string().min(2, "Nama teknologi minimal 2 karakter"),
  category: z
    .string()
    .refine(
      (val) =>
        [
          "Frontend",
          "Backend",
          "Mobile",
          "Database",
          "Tools & Others",
        ].includes(val),
      { message: "Pilih kategori yang valid" }
    ),
  icons: z
    .string()
    .min(2, "Slug Simple Icons minimal 2 karakter")
    .regex(/^[a-z0-9]+$/, "Slug hanya boleh huruf kecil dan angka tanpa spasi"),
});

export const userCareerSchema = z.object({
  company: z.string().min(2, "Nama perusahaan minimal 2 karakter"),
  position_en: z.string().min(2, "Position must be at least 2 characters"),
  position_id: z.string().min(2, "Posisi minimal 2 karakter"),
  location: z.string().min(2, "Lokasi minimal 2 karakter"),
  startMonth: z.number().min(1).max(12),
  startYear: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 10),
  endMonth: z.number().min(1).max(12).nullable(),
  endYear: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 10)
    .nullable(),
  description_en: z.string().optional(),
  description_id: z.string().optional(),
  logo: z.string().optional(),
  gallery: z.array(z.string()).optional(),
});

export const userAchievementSchema = z.object({
  title_en: z.string().min(2, "Title must be at least 2 characters"),
  title_id: z.string().min(2, "Judul penghargaan minimal 2 karakter"),
  organization: z.string().min(2, "Nama organisasi minimal 2 karakter"),
  location: z.string().min(2, "Lokasi minimal 2 karakter"),
  month: z.number().min(1).max(12),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 10),
  category_en: z.string().min(2, "Category must be at least 2 characters"),
  category_id: z.string().min(2, "Kategori minimal 2 karakter"),
  logo: z.string().optional(),
  gallery: z.array(z.string()).optional(),
});

export const userCVSchema = z.object({
  language: z.string().min(2, "Bahasa minimal 2 karakter"),
  fileUrl: z.string().optional(),
  fileName: z.string().optional(),
});

export const userProjectSchema = z.object({
  title_en: z.string().min(3, "Title must be at least 3 characters"),
  title_id: z.string().min(3, "Judul project minimal 3 karakter"),
  description_en: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  description_id: z.string().min(10, "Deskripsi minimal 10 karakter"),
  image: z.string().optional(),
  month: z.number().min(1).max(12),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 10),
  technologies: z.array(z.string()).min(1, "Minimal 1 teknologi harus dipilih"),
  githubUrl: z
    .string()
    .url("GitHub URL harus valid")
    .optional()
    .or(z.literal("")),
  liveDemoUrl: z
    .string()
    .url("Live Demo URL harus valid")
    .optional()
    .or(z.literal("")),
  figmaUrl: z
    .string()
    .url("Figma URL harus valid")
    .optional()
    .or(z.literal("")),
});

export const userCertificateSchema = z.object({
  name_en: z.string().min(3, "Certificate name must be at least 3 characters"),
  name_id: z.string().min(3, "Nama sertifikat minimal 3 karakter"),
  issuer: z.string().min(2, "Penerbit sertifikat minimal 2 karakter"),
  month: z.number().min(1).max(12),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 10),
  image: z.string().optional(),
  credentialUrl: z
    .string()
    .url("Credential URL harus valid")
    .optional()
    .or(z.literal("")),
  category: z.string().optional(),
  isStar: z.boolean().optional(),
});
