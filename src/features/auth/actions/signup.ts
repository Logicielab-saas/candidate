/**
 * Signup Server Action - Handles the signup form submission, authentication, and redirection
 *
 * Detailed description:
 * This server action receives signup credentials, retrieves client details such as user agent and IP address,
 * combines them into a single string, logs the result, and then delegates to the signup service. It also revalidates
 * the necessary paths and redirects the user based on their type (employee or recruiter).
 *
 * Props:
 * - data (SignupCredentials): The signup form fields including name, email, password, and type.
 *
 * Additional notes:
 * - Retrieves user agent from the "user-agent" header.
 * - Retrieves IP address from the "x-forwarded-for" header or falls back to "x-real-ip".
 * - Combines the user agent and IP address in "useragent/userip" format.
 */

"use server";

import { employeeSignup } from "../services/employee-auth";
import { recruiterSignup } from "../services/recruiter-auth";
import { SignupCredentials } from "../common/interfaces";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getUserAgentAndIp } from "@/core/utils/get-user-agent-n-ip";

/**
 * SignupActionResponse interface - Defines the response shape of signupAction.
 */
export interface SignupActionResponse {
  error?: string;
  success?: boolean;
}

/**
 * signupAction - Handles the signup form submission.
 *
 * Detailed description:
 * This server action transforms the incoming signup data, logs the combined user agent and IP address,
 * calls the signup service, revalidates static paths, and redirects the user based on their type.
 *
 * @param data - SignupCredentials containing name, email, password, and type.
 * @returns A promise that resolves to SignupActionResponse indicating success or an error.
 */
export async function signupAction(
  data: SignupCredentials
): Promise<SignupActionResponse> {
  try {
    const headersList = await headers();
    const combinedUA = await getUserAgentAndIp(headersList);
    // console.log("Combined UA/IP:", combinedUA);

    // Transform the signup form data to match the API expectations.
    const signupData: SignupCredentials = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      user_type: data.user_type,
      device_name: combinedUA,
    };

    // Call the appropriate signup service based on user type
    if (data.user_type === "employee") {
      await employeeSignup(signupData);
    } else if (data.user_type === "recruiter") {
      await recruiterSignup(signupData);
    } else {
      throw new Error("Invalid user type");
    }

    // Revalidate relevant paths.
    revalidatePath("/");
    revalidatePath("/login");
    revalidatePath("/signup");

    // Redirect based on user type.

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "An error occurred during signup",
    };
  }
}
