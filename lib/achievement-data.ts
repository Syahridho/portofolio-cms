export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  month: number;
  year: number;
  category?: string;
  logo?: string;
  gallery?: string[]; // Max 3 images
}

export const initialAchievements: AchievementItem[] = [
  {
    id: "1",
    title: "Chairperson of the Duckathon 2024 Organizing Committee",
    organization: "Event & Community",
    location: "Indonesia, Riau",
    month: 2,
    year: 2025,
    category: "Coding competition event",
    gallery: [],
  },
  {
    id: "2",
    title: "Healthkathon 2024",
    organization: "Online",
    location: "",
    month: 11,
    year: 2024,
    category: "Innovation system categories",
    gallery: [],
  },
  {
    id: "3",
    title: "First Place Winner of DesFast 2024",
    organization: "Competition",
    location: "Indonesia, Riau",
    month: 3,
    year: 2024,
    category: "Design competition",
    gallery: [],
  },
  {
    id: "4",
    title: "First Place Winner of DesFast 2024",
    organization: "Competition",
    location: "Indonesia, Riau",
    month: 3,
    year: 2024,
    category: "Design competition",
    gallery: [],
  },
];
