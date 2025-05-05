import { format, parseISO } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";

export const dateLocales = {
  en: enUS,
  fr: fr,
  ar: ar,
} as const;

export type SupportedDateLocale = keyof typeof dateLocales;

/**
 * Get date-fns locale object based on locale string
 * @param locale - The locale string (en, fr, ar)
 * @returns The corresponding date-fns locale object
 */
export function getDateFnsLocale(locale: string) {
  return dateLocales[locale as SupportedDateLocale] || enUS;
}

const locales = {
  en: enUS,
  fr: fr,
  ar: ar,
} as const;

type SupportedLocale = keyof typeof locales;

/**
 * Convert numbers to Arabic numerals if locale is Arabic
 */
export function convertToLocaleNumber(
  num: number | string,
  locale: string
): string {
  if (locale !== "ar") return String(num);

  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num).replace(/[0-9]/g, (d) => arabicNumbers[parseInt(d)]);
}

/**
 * Get date-fns locale object based on locale string
 */
export function getDateLocale(locale: string) {
  return locales[locale as SupportedLocale] || enUS;
}

/**
 * Format a date string with the given locale
 * @param date - ISO date string or Date object
 * @param pattern - date-fns format pattern (default: 'PPP' for full date)
 * @param locale - locale string (en, fr, ar)
 */
export function formatDate(
  date: string | Date,
  pattern: string = "PPP",
  locale: string
) {
  const dateToFormat = typeof date === "string" ? parseISO(date) : date;
  const dateLocale = getDateLocale(locale);

  const formattedDate = format(dateToFormat, pattern, {
    locale: dateLocale,
  });

  // Convert numbers to Arabic if locale is Arabic
  if (locale === "ar") {
    return convertToLocaleNumber(formattedDate, locale);
  }

  return formattedDate;
}

/**
 * Format a date with time
 * @param date - ISO date string or Date object
 * @param locale - locale string (en, fr, ar)
 */
export function formatDateTime(date: string | Date, locale: string) {
  return formatDate(date, "PPp", locale);
}

/**
 * Format a date for relative time (e.g., "2 hours ago")
 * @param date - ISO date string or Date object
 * @param locale - locale string (en, fr, ar)
 */
export function formatRelativeDate(date: string | Date, locale: string) {
  return formatDate(date, "PP", locale);
}

/**
 * Format a date for short display (e.g., "Apr 15")
 * @param date - ISO date string or Date object
 * @param locale - locale string (en, fr, ar)
 */
export function formatShortDate(date: string | Date, locale: string) {
  return formatDate(date, "MMM d", locale);
}

/**
 * Get text direction based on locale
 */
export function getTextDirection(locale: string) {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * Formats a date and time into an ISO timestamp
 * @param date - The date object
 * @param time - The time string in format "HH:mm"
 * @returns ISO timestamp string
 */
export function formatDateTimeToISO(date: Date, time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:00.000Z`;
}
