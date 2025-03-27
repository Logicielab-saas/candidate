/**
 * changePassword - Service for changing user password
 *
 * Makes a POST request to the API to change the user's password
 * using FormData to send the password fields with exact field names
 * expected by the API.
 */

import api from "@/lib/axios";

export interface ChangePasswordResponse {
  message: string;
  status: "success" | "error";
  errors?: {
    password?: string[];
    password_confirmation?: string[];
    old_password?: string[];
  };
}

export interface ChangePassword {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export async function changePassword(
  data: ChangePassword
): Promise<ChangePasswordResponse> {
  const formData = new FormData();

  // Append password fields to FormData with exact field names
  formData.append("old_password", data.old_password);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  // Log FormData contents for debugging (excluding sensitive data)
  console.log("Password change FormData fields:", Array.from(formData.keys()));

  const response = await api.post<ChangePasswordResponse>(
    `employee/change-password`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}
