import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { Languages } from "@/core/interfaces";

const endpoint = "/employee/languages";

export async function fetchPublicLanguages() {
  try {
    const response = await api.get<Languages[]>(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch languages`);
    }
    throw error;
  }
}