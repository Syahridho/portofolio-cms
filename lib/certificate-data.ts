export interface CertificateItem {
  id: string;
  name: string;
  issuedDate: string; // ISO date string YYYY-MM-DD
  expirationDate?: string; // Optional ISO date string
  image: string;
  isFeatured: boolean; // "isStar"
  role: "frontend" | "backend" | "cloud" | "other";
}

export const initialCertificates: CertificateItem[] = [
  {
    id: "1",
    name: "Dicoding: Belajar Dasar Pemrograman Web",
    issuedDate: "2024-02-15",
    image: "https://placehold.co/600x400/png?text=Certificate+1",
    isFeatured: true,
    role: "frontend",
  },
  {
    id: "2",
    name: "Alibaba Cloud Certified Developer",
    issuedDate: "2023-11-20",
    expirationDate: "2025-11-20",
    image: "https://placehold.co/600x400/png?text=Certificate+2",
    isFeatured: true,
    role: "cloud",
  },
  {
    id: "3",
    name: "Udemy: Fullstack Programming",
    issuedDate: "2023-08-10",
    image: "https://placehold.co/600x400/png?text=Certificate+3",
    isFeatured: true,
    role: "backend",
  },
  {
    id: "4",
    name: "Dicoding: Belajar Dasar Pemrograman Web",
    issuedDate: "2024-02-15",
    image: "https://placehold.co/600x400/png?text=Certificate+1",
    isFeatured: true,
    role: "frontend",
  },
  {
    id: "5",
    name: "Alibaba Cloud Certified Developer",
    issuedDate: "2023-11-20",
    expirationDate: "2025-11-20",
    image: "https://placehold.co/600x400/png?text=Certificate+2",
    isFeatured: true,
    role: "cloud",
  },
  {
    id: "6",
    name: "Udemy: Fullstack Programming",
    issuedDate: "2023-08-10",
    image: "https://placehold.co/600x400/png?text=Certificate+3",
    isFeatured: true,
    role: "backend",
  },
  {
    id: "7",
    name: "Dicoding: Belajar Dasar Pemrograman Web",
    issuedDate: "2024-02-15",
    image: "https://placehold.co/600x400/png?text=Certificate+1",
    isFeatured: false,
    role: "frontend",
  },
  {
    id: "8",
    name: "Alibaba Cloud Certified Developer",
    issuedDate: "2023-11-20",
    expirationDate: "2025-11-20",
    image: "https://placehold.co/600x400/png?text=Certificate+2",
    isFeatured: false,
    role: "cloud",
  },
  {
    id: "9",
    name: "Udemy: Fullstack Programming",
    issuedDate: "2023-08-10",
    image: "https://placehold.co/600x400/png?text=Certificate+3",
    isFeatured: false,
    role: "backend",
  },
];
