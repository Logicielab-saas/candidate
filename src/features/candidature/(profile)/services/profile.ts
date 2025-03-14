import { GetMeResponse } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export async function getCurrentUser() {
  try {
    const response = await api.get<GetMeResponse>(`/employee/user`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to get current user");
    }
    throw error;
  }
}
