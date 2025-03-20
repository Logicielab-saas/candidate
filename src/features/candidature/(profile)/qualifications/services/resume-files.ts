import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { FilesResponse } from "@/core/interfaces";

const endpoint = "/employee/resume/file";

interface ResumeFilesItem {
  uuid?: string;
  file: string;
  url_file: string;
  server: string;
  resume_uuid: string;
}

export interface CreateFilesDTO {
  resume_files: ResumeFilesItem[];
}

export interface UpdateFilesDTO extends CreateFilesDTO {
  uuid: string;
}

export type FilesDTO = CreateFilesDTO | UpdateFilesDTO;

export async function handleResumeFiles(data: FilesDTO) {
  try {
    const response = await api.post<FilesResponse>(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      const action = "uuid" in data ? "update" : "create";
      throw new Error(apiError?.message || `Failed to ${action} files`);
    }
    throw error;
  }
}

export async function deleteResumeFiles(uuid: string) {
  try {
    await api.delete(`${endpoint}/${uuid}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to delete files");
    }
    throw error;
  }
}
