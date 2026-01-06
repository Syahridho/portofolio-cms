"use client";

import { useLocale, Locale } from "@/lib/i18n-simple";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLanguage } from "@tabler/icons-react";
import { ClientOnly } from "@/components/ui/client-only";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <ClientOnly
      fallback={
        <div
          className={`flex items-center justify-center cursor-pointer ${className}`}
        >
          <IconLanguage className="w-4 h-4" />
        </div>
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={`flex items-center justify-center cursor-pointer ${className}`}
            suppressHydrationWarning
          >
            <IconLanguage className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[120px]">
          <DropdownMenuItem
            onClick={() => changeLanguage("en")}
            className={`cursor-pointer ${
              locale === "en" ? "bg-accent font-semibold" : ""
            }`}
          >
            <span className="mr-2">🇬🇧</span>
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => changeLanguage("id")}
            className={`cursor-pointer ${
              locale === "id" ? "bg-accent font-semibold" : ""
            }`}
          >
            <span className="mr-2">🇮🇩</span>
            Indonesia
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ClientOnly>
  );
}
