import api from "@/lib/axios";

interface VerifyPasswordResponse {
  message: string;
  status: "success" | "error";
}

export async function verifyPassword(
  password: string
): Promise<VerifyPasswordResponse> {
  try {
    const response = await api.post<VerifyPasswordResponse>(
      `employee/check-password`,
      { password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
