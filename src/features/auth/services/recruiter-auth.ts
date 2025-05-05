/**
 * Authentication Service
 *
 * Handles all authentication-related API calls and data transformations.
 * Uses server actions for secure data handling and Axios for API requests.
 */

import api from "@/lib/axios";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { setAuthToken, setUserRole } from "@/lib/cookies";
import jsCookie from "js-cookie";
import { RecruiterAuthResponse, SignupCredentials } from "../common/interfaces";
import { LoginCredentials } from "../common/interfaces";

interface ApiError {
  message: string;
}

// Server Actions
export async function recruiterLogin(
  credentials: LoginCredentials
): Promise<RecruiterAuthResponse> {
  try {
    const response = await api.post(`recruiter/login`, credentials);

    // Set the token in an HTTP-only cookie
    await setAuthToken(response.data.token);

    // Set the user role in a cookie
    await setUserRole(response.data.type);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to login");
    }
    throw error;
  }
}

export async function recruiterSignup(
  credentials: SignupCredentials
): Promise<RecruiterAuthResponse> {
  try {
    const response = await api.post(`recruiter/register`, credentials);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to signup");
    }
    throw error;
  }
}

export async function recruiterLogout() {
  try {
    const response = await api.post("recruiter/logout");
    if (response.status === 200) {
      // Clear the token cookie
      jsCookie.remove("accessToken");

      // Clear the user role cookie
      jsCookie.remove("userRole");

      // Redirect to login page
      redirect("/login");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to logout");
    }
    throw error;
  }
}
