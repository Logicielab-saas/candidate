import type { EmploisApplied } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

const sentApplicationsEndpoint = "/employee/emploi/apply";

interface SentApplicationsResponse {
  message: string;
  applied: EmploisApplied[];
}

export async function fetchSentApplications(): Promise<SentApplicationsResponse> {
  try {
    const response = await api.get(`${sentApplicationsEndpoint}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emplois`);
    }
    throw error;
  }
}

export async function deleteSentApplication(uuid: string) {
  const response = await api.delete(`${sentApplicationsEndpoint}/${uuid}`);
  return response.data;
}
