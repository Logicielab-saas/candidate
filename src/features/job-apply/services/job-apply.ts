/**
 * Job application service
 *
 * Handles API calls for submitting job applications
 */

import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { JobApplyFormData } from "@/core/types";
import { hasAccessToken } from "@/lib/check-access-token";

const isAuthenticated = hasAccessToken();
console.log(isAuthenticated);
const endpoint = isAuthenticated ? "/employee/emploi/apply" : "/emplois/apply";

export async function ApplyToJob(data: JobApplyFormData) {
  try {
    // Debug logging
    console.log("Sending job application with data:", {
      endpoint,
      formDataEntries: Array.from((data as FormData).entries()),
    });

    const response = await api.post(endpoint, data, {
      headers: {
        // Let axios set the proper multipart/form-data header with boundary
        ...(data instanceof FormData && {
          "Content-Type": "multipart/form-data",
        }),
      },
      // Important: This tells axios to automatically handle the Content-Type header
      transformRequest: [
        (data, headers) => {
          // If it's FormData, return as is
          if (data instanceof FormData) {
            return data;
          }
          // For other types, use default transform
          return JSON.stringify(data);
        },
      ],
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      console.error("Job application error:", {
        status: error.response?.status,
        data: error.response?.data,
        originalError: error.message,
      });
      throw new Error(apiError?.message || `Failed to apply to job`);
    }
    throw error;
  }
}
