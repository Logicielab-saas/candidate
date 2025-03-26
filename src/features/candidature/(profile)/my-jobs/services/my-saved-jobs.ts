import type { EmploiSaved, Pagination } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

const saveEndpoint = "/employee/emploi/save";

export interface SavedJobsResponse {
  message: string;
  saved: EmploiSaved[];
  pagination: Pagination;
}

export async function fetchSavedJobs(
  page: number = 1,
  per_page: number = 10
): Promise<SavedJobsResponse> {
  try {
    const params: Record<string, number> = {};

    if (page !== 1) params.page = page;
    if (per_page !== 10) params.per_page = per_page;

    const response = await api.get(`${saveEndpoint}`, {
      params: Object.keys(params).length ? params : undefined,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emplois`);
    }
    throw error;
  }
}

export async function saveEmplois(uuid: string) {
  const response = await api.post(`${saveEndpoint}`, { emploi_uuid: uuid });
  return response.data;
}

export async function cancelSaveEmplois(uuid: string) {
  const response = await api.delete(`${saveEndpoint}/${uuid}`);
  return response.data;
}
