import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { ResumeCertifications } from "@/core/interfaces";

const endpoint = "/employee/resume/certification";

export type CreateCertificationDTO = Omit<ResumeCertifications, "uuid">;
export type UpdateCertificationDTO = Partial<CreateCertificationDTO> & {
  uuid: string;
};

export type CertificationDTO = CreateCertificationDTO | UpdateCertificationDTO;

export async function handleResumeCertification(data: CertificationDTO) {
  try {
    const response = await api.post<ResumeCertifications>(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      const action = "uuid" in data ? "update" : "create";
      throw new Error(apiError?.message || `Failed to ${action} certification`);
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
