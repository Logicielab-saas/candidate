/**
 * Authentication Service
 *
 * Handles all authentication-related API calls and data transformations.
 * Uses server actions for secure data handling and Axios for API requests.
 */

import api from "@/lib/axios";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { setAuthToken } from "@/lib/cookies";
import jsCookie from "js-cookie";
import { AuthResponse, SignupCredentials } from "../common/interfaces";
import { LoginCredentials } from "../common/interfaces";

interface ApiError {
  message: string;
}
// Server Actions
export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>(
      `employee/login`,
      credentials
    );

    // Set the token in an HTTP-only cookie
    await setAuthToken(response.data.token);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to login");
    }
    throw error;
  }
}

export async function signup(
  credentials: SignupCredentials
): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>(
      `employee/register`,
      credentials
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to signup");
    }
    throw error;
  }
}

export async function logout() {
  try {
    // Clear the token cookie
    jsCookie.remove("accessToken");

    // Redirect to login page
    redirect("/login");
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to logout");
    }
    throw error;
  }
}

// export async function forgotPassword(email: string) {
//   try {
//     await api.post(`employee/forgot-password`, { email });
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       const apiError = error.response?.data as ApiError;
//       throw new Error(
//         apiError?.message || "Failed to send reset password email"
//       );
//     }
//     throw error;
//   }
// }

// export async function resetPassword(token: string, password: string) {
//   try {
//     await api.post(`employee/reset-password`, { token, password });
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       const apiError = error.response?.data as ApiError;
//       throw new Error(apiError?.message || "Failed to reset password");
//     }
//     throw error;
//   }
// }
