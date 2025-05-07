import { cookies } from "next/headers";

export async function getUserLocaleOnServer() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE");
  return locale?.value || "en";
}

export async function getUserRoleOnServer() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("userRole");
  return userRole?.value || "public";
}
