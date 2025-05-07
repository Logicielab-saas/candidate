import type { DataWebJsonResponse, StaticData } from "@/core/interfaces/";
import type { Locale } from "@/i18n/config";
import axios from "axios";
import { cookies } from "next/headers";

// Map our locale codes to API locale codes
const apiLocaleMap: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_MA",
};

export async function getDataWeb({
  userRole,
  locale,
}: {
  userRole: string;
  locale: Locale;
}) {
  const response = await axios.post<DataWebJsonResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}data-web-json`,
    {
      type: userRole,
      country_code: apiLocaleMap[locale],
      locale: locale,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const cookiesStore = await cookies();
  let isNewVersion = false;
  if (
    !cookiesStore.get("versionwebjs") ||
    response.data.data.version !== cookiesStore.get("versionwebjs")?.value
  ) {
    isNewVersion = true;
  }

  return {
    version: response.data.data.version,
    url: response.data.data.url,
    isNewVersion,
  };
}

/**
 * Fetches static data from the API
 * @param locale The locale to fetch data for
 * @returns The static data
 */
export async function fetchStaticData(url: string): Promise<StaticData> {
  try {
    const jsonDataDetailResponse = await fetch(url);
    const jsonDataDetail = await jsonDataDetailResponse.json();
    return jsonDataDetail;
  } catch (error) {
    console.error(`Error fetching static data`, error);
    // Return empty data structure
    return {
      emploi_contracts: [],
      emploi_categories: [],
      emploi_types: [],
      languages: [],
      support_categories: [],
    };
  }
}
