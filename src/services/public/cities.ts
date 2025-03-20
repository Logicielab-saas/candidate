import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { Cities } from "@/core/interfaces";

const endpoint = "/employee/cities";

interface CitiesResponse {
  cities: Cities[];
}

export async function fetchPublicCities(q?: string) {
  try {
    const response = await api.get<CitiesResponse>(endpoint, {
      params: { q },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch cities`);
    }
    throw error;
  }
}