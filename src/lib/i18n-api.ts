import type { Locale } from "@/i18n/config";

// TODO : move to env implementing the other URL

const API_BASE_URL = "https://cdntest.postuly.com/v1/json/employee";

/**
 * Fetches locale messages from the API
 * @param locale The locale to fetch
 * @returns The locale messages
 */
export async function fetchLocaleMessages(locale: Locale) {
  try {
    // Map our locale codes to API locale codes
    const apiLocaleMap: Record<Locale, string> = {
      en: "en_US",
      fr: "fr_FR",
      ar: "ar_MA",
    };

    const response = await fetch(
      `${API_BASE_URL}/${apiLocaleMap[locale]}/lang-web.json`,
      {
        next: {
          // Cache for 1 hour
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch locale messages for ${locale}`);
    }

    const data = await response.json();
    return data[0]; // The API returns an array with a single object
  } catch (error) {
    console.error(`Error fetching locale messages for ${locale}:`, error);
    // Fallback to empty messages object
    return {};
  }
}
