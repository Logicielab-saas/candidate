"use client";

import { Languages } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getUserLocale, setUserLocale } from "@/lib/i18n-utils";
import { cn } from "@/lib/utils";

const languageNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

const languageFlags: Record<Locale, string> = {
  fr: "/lang_flags/fr.svg",
  en: "/lang_flags/us.svg",
  ar: "/lang_flags/ma.svg",
};

export function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = getUserLocale();

  const handleLanguageChange = (locale: Locale) => {
    setUserLocale(locale);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-9 px-0"
          aria-label="Switch language"
        >
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={cn(
              "flex items-center gap-2",
              locale === currentLocale ? "bg-accent" : ""
            )}
          >
            <Image
              src={languageFlags[locale]}
              alt={`${languageNames[locale]} flag`}
              width={20}
              height={20}
              className="rounded-sm"
            />
            {languageNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
