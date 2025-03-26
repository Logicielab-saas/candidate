/**
 * Login Server Action
 *
 * Handles the login form submission, authentication, and redirection
 * based on user type. Includes proper header and cookie management.
 */

"use server";

import { login } from "../services/auth";
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

    // Call login service with credentials and device info
    const result = await login({
      ...credentials,
      device_name: deviceName,
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/login");
    revalidatePath("/dashboard");

    // Return success and redirect path based on user type
    return {
      success: true,
      redirectTo: result.type === "employee" ? "/emplois" : "/recruiter",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to login",
    };
  }
}
