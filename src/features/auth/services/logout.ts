import { AxiosError } from "axios";
import jsCookie from "js-cookie";
import { ApiError } from "next/dist/server/api-utils";

export async function logout() {
  try {
    // Clear the token cookie
    jsCookie.remove("accessToken");

    // Clear the user role cookie
    jsCookie.remove("userRole");
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to logout");
    }
    throw error;
  }
}
