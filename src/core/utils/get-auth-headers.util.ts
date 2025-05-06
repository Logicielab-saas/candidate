/**
 * Auth Utilities
 *
 * Collection of authentication-related utility functions used across the application.
 * These functions handle common authentication tasks like header generation and token management.
 */

import { cookies } from "next/headers";

/**
 * getAuthHeaders - Generates authentication headers for API requests
 *
 * Retrieves the access token from cookies and constructs appropriate headers
 * for authenticated and non-authenticated requests.
 *
 * @returns {Promise<Record<string, string>>} Headers object with Content-Type, Accept, and optional Authorization
 */
export async function getAuthHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const isAuthenticated = !!accessToken?.value;

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(isAuthenticated && { Authorization: `Bearer ${accessToken.value}` }),
  } as const;
}
