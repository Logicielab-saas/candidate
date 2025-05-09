/**
 * Login Server Action
 *
 * Handles the login form submission, authentication, and redirection
 * based on user type. Includes proper header and cookie management.
 */

"use server";

import { employeeLogin } from "../services/employee-auth";
import { recruiterLogin } from "../services/recruiter-auth";
import { LoginCredentials } from "../common/interfaces";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getUserAgentAndIp } from "@/core/utils/get-user-agent-n-ip";

export interface LoginActionResponse {
  error?: string;
  success?: boolean;
  redirectTo?: string;
}

export async function loginAction(
  credentials: LoginCredentials
): Promise<LoginActionResponse> {
  try {
    const headersList = await headers();
    const deviceName = await getUserAgentAndIp(headersList);

    // Create the credentials object with device name
    const loginData = {
      ...credentials,
      device_name: deviceName,
    };

    // Call the appropriate login service based on user type
    if (credentials.user_type === "employee") {
      await employeeLogin(loginData);

      // Revalidate relevant pathss
      revalidatePath("/");
      revalidatePath("/login");
      revalidatePath("/emplois");

      // Return success and redirect path
      return {
        success: true,
        redirectTo: "/emplois",
      };
    } else if (credentials.user_type === "recruiter") {
      await recruiterLogin(loginData);

      // Revalidate relevant paths
      revalidatePath("/");
      revalidatePath("/login");
      revalidatePath("/recruiter");

      // Return success and redirect path
      return {
        success: true,
        redirectTo: "/recruiter/annonces",
      };
    } else {
      throw new Error("Invalid user type");
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to login",
    };
  }
}
