export interface ProfileData {
  name: string;
  role: string;
  location: string;
  bio: string;
  avatar: string;
  email: string;
  socials: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export const initialProfile: ProfileData = {
  name: "Syahridho Arjuna Syahputra",
  role: "Programmer",
  location: "Pekanbaru, Riau, Indonesia",
  bio: "I am a Programmer with a focus on creating aesthetically pleasing and responsive user interfaces. With skills focusing on Bootstrap, Tailwind, PHP, React JS, Next JS and Laravel.",
  avatar: "/avatar.jpg", // Placeholder, will handle if file doesn't exist
  email: "syahridho.arjuna@example.com",
  socials: {
    linkedin: "https://linkedin.com/in/syahridho",
    github: "https://github.com/syahridho",
    instagram: "https://instagram.com/syahridho",
    whatsapp: "https://wa.me/6282392251258",
  },
};
