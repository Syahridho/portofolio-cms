export interface CareerItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startMonth: number; // 1-12
  startYear: number;
  endMonth: number | null; // 1-12 or null for current
  endYear: number | null;
  logo?: string; // URL to logo image
  description?: string;
  gallery?: string[]; // Max 5 images
}

export const initialCareer: CareerItem[] = [
  {
    id: "1",
    company: "Garuda Cyber Indonesia",
    position: "Programmer Internship",
    location: "Indonesia, Riau",
    startMonth: 1,
    startYear: 2024,
    endMonth: null,
    endYear: null,
    description:
      "Bekerja sebagai programmer intern, mengembangkan aplikasi web dan mobile.",
    gallery: [],
  },
  {
    id: "2",
    company: "Media Cakapiah",
    position: "Web Developer Internship",
    location: "Indonesia, Riau",
    startMonth: 11,
    startYear: 2024,
    endMonth: 2,
    endYear: 2025,
    description:
      "Mengembangkan website company profile dan sistem manajemen konten.",
    gallery: [],
  },
  {
    id: "3",
    company: "Lancang Kuning University",
    position: "Informatics Engineering",
    location: "Indonesia, Riau",
    startMonth: 7,
    startYear: 2023,
    endMonth: null,
    endYear: null,
    description: "Menempuh pendidikan S1 Teknik Informatika.",
    gallery: [],
  },
  {
    id: "4",
    company: "Lancang Kuning University",
    position: "Informatics Engineering",
    location: "Indonesia, Riau",
    startMonth: 7,
    startYear: 2023,
    endMonth: null,
    endYear: null,
    description: "Menempuh pendidikan S1 Teknik Informatika.",
    gallery: [],
  },
];
