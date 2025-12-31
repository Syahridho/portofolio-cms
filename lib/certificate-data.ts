export interface CertificateItem {
  id: string;
  name: string;
  issuedDate: string; // ISO date string YYYY-MM-DD
  expirationDate?: string; // Optional ISO date string
  image: string;
  isFeatured: boolean; // "isStar"
}

export const initialCertificates: CertificateItem[] = [
  {
    id: "1",
    name: "Dicoding: Belajar Dasar Pemrograman Web",
    issuedDate: "2024-02-15",
    image: "https://placehold.co/600x400/png?text=Certificate+1",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Alibaba Cloud Certified Developer",
    issuedDate: "2023-11-20",
    expirationDate: "2025-11-20",
    image: "https://placehold.co/600x400/png?text=Certificate+2",
    isFeatured: true,
  },
  {
    id: "3",
    name: "Udemy: Fullstack Programming",
    issuedDate: "2023-08-10",
    image: "https://placehold.co/600x400/png?text=Certificate+3",
    isFeatured: false,
  },
];
