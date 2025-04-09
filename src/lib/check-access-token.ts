import jsCookie from "js-cookie";

export function hasAccessToken(): boolean {
  const token = jsCookie.get("accessToken");
  return !!token;
}
