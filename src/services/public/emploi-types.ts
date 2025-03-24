import { EmploisTypes } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

const endpoint = "/employee/emploi-types";

interface EmploiTypesResponse {
  emploi_types: EmploisTypes[];
}

export async function fetchPublicEmploiTypes(q?: string) {
  try {
    const response = await api.get<EmploiTypesResponse>(endpoint, {
      params: { q },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emploi types`);
    }
    throw error;
  }
}
