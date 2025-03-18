import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { ResumeProject } from "@/core/interfaces";

const endpoint = "/employee/resume/project";

export type CreateProjectDTO = Omit<ResumeProject, "uuid">;

export type UpdateProjectDTO = Partial<CreateProjectDTO>;

export async function createResumeProject(data: CreateProjectDTO) {
  try {
    const response = await api.post<ResumeProject>(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to create project");
    }
    throw error;
  }
}

export async function deleteResumeProject(uuid: string) {
  try {
    await api.delete(`${endpoint}/${uuid}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to delete project");
    }
    throw error;
  }
}

export async function updateResumeProject(
  uuid: string,
  data: UpdateProjectDTO
) {
  try {
    const response = await api.post<ResumeProject>(`${endpoint}/${uuid}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to update project");
    }
    throw error;
  }
}
