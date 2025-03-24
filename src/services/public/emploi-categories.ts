import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { EmploisCategories } from "@/core/interfaces";

const endpoint = "/employee/emploi-categories";

interface EmploiCategoriesResponse {
  emploi_categories: EmploisCategories[];
}

export async function fetchPublicEmploiCategories() {
  try {
    const response = await api.get<EmploiCategoriesResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emploi categories`);
    }
    throw error;
  }
}