import type { InterviewResponse } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

const endpoint = "/employee/interview";

export async function fetchInterviews(
  page: number = 1,
  per_page: number = 10
): Promise<InterviewResponse> {
  try {
    const params: Record<string, number> = {};

    // Only add params if they differ from defaults
    if (page !== 1) params.page = page;
    if (per_page !== 10) params.per_page = per_page;

    const response = await api.get(`${endpoint}`, {
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

export async function acceptInterview(uuid: string) {
  try {
    const response = await api.post(`${endpoint}/accept/`, { uuid });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function rejectInterview(uuid: string) {
  try {
    const response = await api.post(`${endpoint}/reject/`, { uuid });
    return response.data;
  } catch (error) {
    throw error;
  }
}
