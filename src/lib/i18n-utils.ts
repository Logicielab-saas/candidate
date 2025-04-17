import Cookies from "js-cookie";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

const LOCALE_COOKIE_KEY = "NEXT_LOCALE";

/**
 * Gets the user's locale from cookies or falls back to default locale
 * This should only be used in client components
 * @returns Locale The user's locale
 */
export function getUserLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }
  return (Cookies.get(LOCALE_COOKIE_KEY) as Locale) ?? defaultLocale;
}

/**
 * Sets the user's locale in cookies
 * @param locale The locale to set
 */
export function setUserLocale(locale: Locale): void {
  Cookies.set(LOCALE_COOKIE_KEY, locale, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // 1 year expiration
    expires: 365,
  });
}
