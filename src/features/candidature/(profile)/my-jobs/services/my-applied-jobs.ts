import type { EmploisApplied, Pagination } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

interface ResponseQuestion {
  uuid: string;
  emploi_question_uuid: string;
  emploi_apply_uuid: string;
  user_id: number;
  reponse: string | string[];
}

const sentApplicationsEndpoint = "/employee/emploi/apply";

export interface SentApplicationsResponse {
  message: string;
  applied: EmploisApplied[];
  pagination: Pagination;
}

interface SentApplicationDetailsResponse extends EmploisApplied {
  message: string;
  reponse_questions: ResponseQuestion[];
}

export async function fetchSentApplications(
  page: number = 1,
  per_page: number = 10
): Promise<SentApplicationsResponse> {
  try {
    const params: Record<string, number> = {};

    // Only add params if they differ from defaults
    if (page !== 1) params.page = page;
    if (per_page !== 10) params.per_page = per_page;

    const response = await api.get(`${sentApplicationsEndpoint}`, {
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

export async function fetchSentApplicationsDetails(
  slug: string
): Promise<SentApplicationDetailsResponse> {
  try {
    const response = await api.get(`${sentApplicationsEndpoint}`, {
      params: {
        slug,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(
        apiError?.message || `Failed to fetch application details`
      );
    }
    throw error;
  }
}

export async function deleteSentApplication(uuid: string) {
  const response = await api.delete(`${sentApplicationsEndpoint}/${uuid}`);
  return response.data;
}
