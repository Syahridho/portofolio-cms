export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  month: number;
  year: number;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const initialProjects: ProjectItem[] = [
  {
    id: "1",
    title: "Portfolio CMS",
    description:
      "A comprehensive content management system for personal portfolios.",
    image: "https://placehold.co/600x400/png",
    month: 12,
    year: 2024,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
    githubUrl: "https://github.com/syahridho/portfolio-cms",
  },
  {
    id: "2",
    title: "E-Commerce App",
    description:
      "Full-stack e-commerce application with payment gateway integration.",
    image: "https://placehold.co/600x400/png",
    month: 8,
    year: 2024,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://store.example.com",
    githubUrl: "https://github.com/syahridho/ecommerce",
  },
  {
    id: "3",
    title: "E-Commerce App",
    description:
      "Full-stack e-commerce application with payment gateway integration.",
    image: "https://placehold.co/600x400/png",
    month: 8,
    year: 2024,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://store.example.com",
    githubUrl: "https://github.com/syahridho/ecommerce",
  },
  {
    id: "4",
    title: "E-Commerce App",
    description:
      "Full-stack e-commerce application with payment gateway integration.",
    image: "https://placehold.co/600x400/png",
    month: 8,
    year: 2024,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://store.example.com",
    githubUrl: "https://github.com/syahridho/ecommerce",
  },
  {
    id: "5",
    title: "E-Commerce App",
    description:
      "Full-stack e-commerce application with payment gateway integration.",
    image: "https://placehold.co/600x400/png",
    month: 8,
    year: 2024,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://store.example.com",
    githubUrl: "https://github.com/syahridho/ecommerce",
  },
  {
    id: "6",
    title: "E-Commerce App",
    description:
      "Full-stack e-commerce application with payment gateway integration.",
    image: "https://placehold.co/600x400/png",
    month: 8,
    year: 2024,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://store.example.com",
    githubUrl: "https://github.com/syahridho/ecommerce",
  },
];
