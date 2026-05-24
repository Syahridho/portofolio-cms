export interface LocalizedContent {
  en: string;
  id: string;
}

export interface SocialLinks {
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
  whatsapp: string;
}

export interface UserProfile {
  name: string;
  jobTitle: string;
  photoURL: string;
  socials: SocialLinks;
}

export interface UserDescription {
  name: string;
  description: LocalizedContent;
}

export interface UserSkills {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Mobile" | "Database" | "Tools & Others";
  icons: string;
}

export interface UserCareer {
  id: string;
  logo?: string;
  company: string;
  position: LocalizedContent;
  location: string;
  startMonth: number;
  startYear: number;
  endMonth: number | null;
  endYear: number | null;
  description?: LocalizedContent;
  gallery?: string[];
}

export interface UserAchievement {
  id: string;
  title: LocalizedContent;
  organization: string;
  location: string;
  month: number;
  year: number;
  category: LocalizedContent;
  logo?: string;
  gallery?: string[];
}

// Alias untuk backward compatibility (typo di beberapa file)
export type UserAchivement = UserAchievement;

export interface UserCV {
  id: string;
  language: string;
  fileUrl: string;
  fileName: string;
}

export interface UserProject {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  image: string;
  month: number;
  year: number;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  figmaUrl?: string;
}

export interface UserCertificate {
  id: string;
  name: LocalizedContent;
  issuer: string;
  month: number;
  year: number;
  image?: string;
  credentialUrl?: string;
  category?: string;
  isStar?: boolean;
}

export interface UserContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}
