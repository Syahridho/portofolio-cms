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
  about: string;
  avatarUrl: string;
  photoURL: string;
  resumeUrl: string;
  socials: SocialLinks;
}

export interface UserDescription {
  name: string;
  description: string;
}

export interface UserSkills {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Mobile" | "Database" | "Tools & Others";
  icons: string;
}

export interface UserCarrer {
  id: string;
  logo?: string;
  company: string;
  position: string;
  location: string;
  startMonth: number;
  startYear: number;
  endMonth: number | null;
  endYear: number | null;
  description?: string;
  gallery?: string[];
}

export interface UserAchivement {
  id: string;
  title: string;
  organization: string;
  location: string;
  month: number;
  year: number;
  category: string;
  logo?: string;
  gallery?: string[];
}

export interface UserCV {
  id: string;
  language: string;
  fileUrl: string;
  fileName: string;
}

export interface UserProject {
  id: string;
  title: string;
  description: string;
  image: string;
  month: number;
  year: number;
  technologies: string[];
  github_url: string;
}

export interface UserCertificate {
  id: string;
  name: string;
  issuer: string;
  month: number;
  year: number;
  image?: string;
  credential_url?: string;
}

export interface UserContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}
