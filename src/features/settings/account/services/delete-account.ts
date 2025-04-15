import { AxiosError } from "axios";
import api from "@/lib/axios";
import type { ApiError } from "next/dist/server/api-utils";

const deleteEndPoint = "employee/user/delete";

export interface DeleteAccount {
  email: string;
  password: string;
  token_device: string;
}

export async function DeleteMyAccount(data: DeleteAccount) {
  try {
    const response = await api.post(deleteEndPoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to delete account`);
    }
    throw error;
  }
}
