import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import type { Locale } from "./config";
import { defaultLocale } from "./config";

const LOCALE_COOKIE_KEY = "NEXT_LOCALE";

export default getRequestConfig(async () => {
  // Get the cookie from headers on the server side
  const headersList = await headers();
  const cookies = headersList.get("cookie") || "";
  const localeCookie = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith(`${LOCALE_COOKIE_KEY}=`));

  const locale = localeCookie
    ? (localeCookie.split("=")[1].trim() as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
