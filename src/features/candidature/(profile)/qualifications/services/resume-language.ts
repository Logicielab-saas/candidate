import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { ResumeLanguage } from "@/core/interfaces";

const endpoint = "/employee/resume/language";

export type CreateLanguageDTO = Omit<ResumeLanguage, "resume_uuid">;
export type UpdateLanguageDTO = Partial<CreateLanguageDTO> & {
  resume_uuid: string;
};

export type LanguageDTO = CreateLanguageDTO | UpdateLanguageDTO;

export async function handleResumeLanguage(data: LanguageDTO) {
  try {
    const response = await api.post<ResumeLanguage>(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      const action = "resume_uuid" in data ? "update" : "create";
      throw new Error(apiError?.message || `Failed to ${action} language`);
    }
    throw error;
  }
}

export async function deleteResumeLanguage(resume_uuid: string) {
  try {
    await api.delete(`${endpoint}/${resume_uuid}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to delete language");
    }
    throw error;
  }
}
