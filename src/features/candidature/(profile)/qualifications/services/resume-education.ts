import { ResumeEducation } from "@/core/interfaces";
import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";

const endpoint = "/employee/resume/education";

export type CreateEducationDTO = Omit<ResumeEducation, "uuid">;

export type UpdateEducationDTO = Partial<CreateEducationDTO>;

export async function createResumeEducation(data: CreateEducationDTO) {
  try {
    const response = await api.post<ResumeEducation>(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to create Education");
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

export async function updateResumeEducation(
  uuid: string,
  data: UpdateEducationDTO
) {
  try {
    const response = await api.post<ResumeEducation>(
      `${endpoint}/${uuid}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to update Education");
    }
    throw error;
  }
}
