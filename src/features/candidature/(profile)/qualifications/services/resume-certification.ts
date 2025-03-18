import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { ResumeCertifications } from "@/core/interfaces";

const endpoint = "/employee/resume/certification";

export type CreateCertificationDTO = Omit<ResumeCertifications, "uuid">;

export type UpdateCertificationDTO = Partial<CreateCertificationDTO>;

export async function createResumeCertification(data: CreateCertificationDTO) {
  try {
    const response = await api.post<ResumeCertifications>(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to create certification");
    }
    throw error;
  }
}

export async function deleteResumeCertification(uuid: string) {
  try {
    await api.delete(`${endpoint}/${uuid}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to delete certification");
    }
    throw error;
  }
}

export async function updateResumeCertification(
  uuid: string,
  data: UpdateCertificationDTO
) {
  try {
    const response = await api.post<ResumeCertifications>(
      `${endpoint}/${uuid}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to update certification");
    }
    throw error;
  }
}
