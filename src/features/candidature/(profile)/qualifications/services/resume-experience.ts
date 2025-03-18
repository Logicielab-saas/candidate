import type { ResumeExperience } from "@/core/interfaces";
import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";

export type CreateExperienceDTO = Omit<ResumeExperience, "uuid">;
export type UpdateExperienceDTO = Partial<CreateExperienceDTO> & {
  uuid: string;
};

export type ExperienceDTO = CreateExperienceDTO | UpdateExperienceDTO;

export async function handleResumeExperience(data: ExperienceDTO) {
  try {
    const response = await api.post<ResumeExperience>(
      "/employee/resume/experience",
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      const action = "uuid" in data ? "update" : "create";
      throw new Error(apiError?.message || `Failed to ${action} experience`);
    }
    throw error;
  }
}

export async function deleteResumeExperience(uuid: string) {
  try {
    await api.delete(`/employee/resume/experience/${uuid}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to delete experience");
    }
    throw error;
  }
}
