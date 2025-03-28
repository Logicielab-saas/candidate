/**
 * Authentication Server Actions
 *
 * Server-side functions for handling authentication-related operations
 */

import { cookies } from "next/headers";

/**
 * Check if the user is authenticated by verifying the presence of auth tokens
 * @returns {boolean} True if user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  const userRole = cookieStore.get("userRole");

  return !!(token?.value && userRole?.value);
}
