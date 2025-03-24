/**
 * Job application service
 *
 * Handles API calls for submitting job applications
 */

import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { JobApplyFormData } from "@/core/interfaces";

const endpoint = "/employee/emploi/apply";

export async function ApplyToJob(data: JobApplyFormData) {
  try {
    const response = await api.post(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to apply to job`);
    }
    throw error;
  }
}
