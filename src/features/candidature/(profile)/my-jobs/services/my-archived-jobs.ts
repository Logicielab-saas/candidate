import type { ArchivedJob, Pagination } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

const archiveEndpoint = "/employee/emploi/archive";

export interface ArchivedJobsResponse {
  message: string;
  archives: ArchivedJob[];
  pagination: Pagination;
}

export async function fetchArchivedJobs(
  page: number = 1,
  per_page: number = 10
): Promise<ArchivedJobsResponse> {
  try {
    const params: Record<string, number> = {};

    if (page !== 1) params.page = page;
    if (per_page !== 10) params.per_page = per_page;

    const response = await api.get(`${archiveEndpoint}`, {
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

export async function archiveEmplois(uuid: string) {
  const response = await api.post(`${archiveEndpoint}`, { emploi_uuid: uuid });
  return response.data;
}

export async function cancelArchiveEmplois(uuid: string) {
  const response = await api.delete(`${archiveEndpoint}/${uuid}`);
  return response.data;
}
