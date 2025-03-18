import type { ResumeEducation } from "@/core/interfaces";
import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";

const endpoint = "/employee/resume/education";

export type CreateEducationDTO = Omit<ResumeEducation, "uuid">;
export type UpdateEducationDTO = Partial<CreateEducationDTO> & {
  uuid: string;
};

export type EducationDTO = CreateEducationDTO | UpdateEducationDTO;

export async function handleResumeEducation(data: EducationDTO) {
  try {
    const response = await api.post<ResumeEducation>(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      const action = "uuid" in data ? "update" : "create";
      throw new Error(apiError?.message || `Failed to ${action} education`);
    }
    throw error;
  }
}

export async function deleteResumeEducation(uuid: string) {
  try {
    await api.delete(`${endpoint}/${uuid}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to delete Education");
    }
    throw error;
  }
}
