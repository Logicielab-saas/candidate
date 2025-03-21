import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { FilesResponse } from "@/core/interfaces";

const endpoint = "/employee/resume/file";

interface ResumeFilesItem {
  file: File;
}

export interface CreateFilesDTO {
  file: ResumeFilesItem[];
}

export interface UpdateFilesDTO extends CreateFilesDTO {
  uuid: string;
}

export type FilesDTO = FormData;

export async function handleResumeFiles(data: FilesDTO) {
  try {
    const response = await api.post<FilesResponse>(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to upload file`);
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

export async function fetchResumeFiles() {
  const response = await api.get<FilesResponse>(endpoint);
  return response.data;
}
