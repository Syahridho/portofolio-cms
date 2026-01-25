import { LocalizedContent } from "@/types";
import { Locale } from "@/i18n/config";

/**
 * Helper function untuk mendapatkan konten berdasarkan locale
 */
export function getLocalizedContent(
  content: LocalizedContent | string,
  locale: Locale,
): string {
  if (typeof content === "string") {
    return content;
  }
  return content[locale] || content.en || "";
}

/**
 * Helper function untuk membuat LocalizedContent dari string
 */
export function createLocalizedContent(
  enContent: string,
  idContent: string,
): LocalizedContent {
  return {
    en: enContent,
    id: idContent,
  };
}

/**
 * Helper function untuk update LocalizedContent
 */
export function updateLocalizedContent(
  existing: LocalizedContent,
  locale: Locale,
  newContent: string,
): LocalizedContent {
  return {
    ...existing,
    [locale]: newContent,
  };
}
