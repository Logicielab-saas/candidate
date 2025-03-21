import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { Emplois } from "@/core/interfaces";

interface EmploisResponse {
  message: string;
  emplois: Emplois[];
}

const endpoint = "/employee/emplois";

export async function fetchEmplois() {
  try {
    const response = await api.get<EmploisResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emplois`);
    }
    throw error;
  }
}
