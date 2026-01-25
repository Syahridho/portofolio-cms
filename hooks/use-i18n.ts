"use client";

import { useLocale as useNextIntlLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import { LocalizedContent } from "@/types";

/**
 * Custom hook untuk mendapatkan locale dan helper functions
 */
export function useI18n() {
  const locale = useNextIntlLocale() as Locale;
  const t = useTranslations();

  /**
   * Get localized content berdasarkan current locale
   */
  const getContent = (content: LocalizedContent | string): string => {
    if (typeof content === "string") {
      return content;
    }
    return content[locale] || content.en || "";
  };

  return {
    locale,
    t,
    getContent,
  };
}

/**
 * Hook untuk mendapatkan translations dari namespace tertentu
 */
export function useI18nTranslations(namespace?: string) {
  const t = useTranslations(namespace);
  return t;
}
