import type { EmploisApplied } from "@/core/interfaces";
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

interface SentApplicationsResponse {
  message: string;
  applied: EmploisApplied[];
}

interface SentApplicationDetailsResponse extends EmploisApplied {
  message: string;
  reponse_questions: ResponseQuestion[];
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

export async function fetchSentApplicationsDetails(
  uuid: string
): Promise<SentApplicationDetailsResponse> {
  try {
    const response = await api.get(`${sentApplicationsEndpoint}`, {
      params: {
        uuid,
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
