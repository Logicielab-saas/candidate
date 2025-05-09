/**
 * Authentication Service
 *
 * Handles all authentication-related API calls and data transformations.
 * Uses server actions for secure data handling and Axios for API requests.
 */

import api from "@/lib/axios";
import axios from "axios";
import { AxiosError } from "axios";
import { setAuthToken, setUserRole } from "@/lib/cookies";
import type {
  EmployeeAuthResponse,
  SignupCredentials,
} from "../common/interfaces";
import type { LoginCredentials } from "../common/interfaces";

interface ApiError {
  message: string;
}

// Server Actions
export async function employeeLogin(
  credentials: LoginCredentials
): Promise<EmployeeAuthResponse> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}employee/login`,
      credentials
    );

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

export async function employeeSignup(
  credentials: SignupCredentials
): Promise<EmployeeAuthResponse> {
  try {
    const response = await api.post(`employee/register`, credentials);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to signup");
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
