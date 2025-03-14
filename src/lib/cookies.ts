/**
 * Cookie Management Utility
 *
 * Provides a centralized way to handle cookie operations in Next.js 15
 * with proper typing and async handling.
 */

import { cookies } from "next/headers";

export type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
  maxAge?: number;
};

const defaultOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};

export async function getCookie(key: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  return cookie?.value;
}

export async function setCookie(
  key: string,
  value: string,
  options: CookieOptions = {}
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    ...defaultOptions,
    ...options,
  });
}

export async function deleteCookie(key: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}

export async function hasCookie(key: string): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(key);
}

// Auth specific cookie helpers
export const AUTH_TOKEN_KEY = "accessToken";

export async function getAuthToken(): Promise<string | undefined> {
  return getCookie(AUTH_TOKEN_KEY);
}

export async function setAuthToken(token: string): Promise<void> {
  return setCookie(AUTH_TOKEN_KEY, token);
}

export async function removeAuthToken(): Promise<void> {
  return deleteCookie(AUTH_TOKEN_KEY);
}

export async function isAuthenticated(): Promise<boolean> {
  return hasCookie(AUTH_TOKEN_KEY);
}
