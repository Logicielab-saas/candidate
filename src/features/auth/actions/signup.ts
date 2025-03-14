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

import { redirect } from "next/navigation";
import { signup } from "../services/auth";
import { SignupCredentials } from "../common/interfaces";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

/**
 * SignupActionResponse interface - Defines the response shape of signupAction.
 */
export interface SignupActionResponse {
  error?: string;
  success?: boolean;
}

/**
 * getUserAgentAndIp - Retrieves user agent and IP address from request headers and returns a combined string.
 *
 * @param headersList - The HTTP headers object from Next.js.
 * @returns A string in the format "useragent/ip" combining the user agent and IP address.
 */
function getUserAgentAndIp(headersList: Headers): string {
  // Retrieve the user agent from headers; default to "unknown" if not provided.
  const userAgentHeader = headersList.get("user-agent") || "unknown";
  // Retrieve the raw IP address from "x-forwarded-for", split and trim if multiple values exist,
  // or fallback to "x-real-ip"; default to "unknown" if neither is provided.
  const rawIpAddress =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  // Normalize the IP to remove the IPv6 prefix if it exists.
  const normalizedIpAddress = rawIpAddress.startsWith("::ffff:")
    ? rawIpAddress.substring(7)
    : rawIpAddress;

  return `${userAgentHeader}/${normalizedIpAddress}`;
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
    const combinedUA = getUserAgentAndIp(headersList);
    console.log("Combined UA/IP:", combinedUA);
    // Transform the signup form data to match the API expectations.
    const signupData: SignupCredentials = {
      name: data.name,
      email: data.email,
      password: data.password,
      user_type: data.user_type,
      device_name: combinedUA,
    };
    console.log(signupData);

    // Call the signup service.
    const result = await signup(signupData);

    // Revalidate relevant paths.
    revalidatePath("/");
    revalidatePath("/login");
    revalidatePath("/signup");

    // Redirect based on user type.
    if (result.user?.user_type === "employee") redirect("/home");
    else if (result.user?.user_type === "recruiter") redirect("/recruiter");

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
