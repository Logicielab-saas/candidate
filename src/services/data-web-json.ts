import { Locale } from "@/i18n/config";
import { apiLocaleMap } from "@/lib/i18n-utils";
import axios from "axios";

export async function getDataWebJson(userRole: string, locale: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}data-web-json`,
      {
        type: userRole,
        country_code: apiLocaleMap[locale as Locale],
        locale: locale,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data-web-json", error);
    return null;
  }
}
