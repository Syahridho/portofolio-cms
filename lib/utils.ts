import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get cookie value by name (client-side).
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

/**
 * Convert a string to a URL-friendly slug.
 * Example: "My Awesome Project!" -> "my-awesome-project"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars except hyphen
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Generate a slug for a project using its title and id for uniqueness.
 */
export function generateProjectSlug(title: string, id: string): string {
  const baseSlug = slugify(title);
  return `${baseSlug}-${id}`;
}

/**
 * Find a project by its slug from the list of projects.
 */
export function findProjectBySlug<T extends { id: string; title: string }>(
  projects: T[],
  slug: string
): T | undefined {
  return projects.find((project) => {
    const generatedSlug = generateProjectSlug(project.title, project.id);
    return generatedSlug === slug;
  });
}
