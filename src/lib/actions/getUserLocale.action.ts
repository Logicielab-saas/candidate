import { cookies } from "next/headers";

export async function getUserLocaleOnServer() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE");
  return locale?.value || "en";
}
