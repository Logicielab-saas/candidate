export type Locale = (typeof locales)[number];

export const locales = ["fr", "en", "ar"] as const;

export const defaultLocale: Locale = "fr";
