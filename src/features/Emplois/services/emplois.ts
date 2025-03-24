import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { Emplois, EmploisDetails } from "@/core/interfaces";

export interface EmploisResponse {
  message: string;
  emplois: Emplois[];
}

export interface EmploisDetailsResponse {
  message: string;
  emploi: EmploisDetails;
}

const endpoint = "/employee/emplois";
const saveEndpoint = "/employee/emplois/save";

export async function fetchEmplois() {
  try {
    const response = await api.get<EmploisResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emplois`);
    }
    throw error;
  }
}

export async function fetchEmploisBySlug(slug: string) {
  const response = await api.get<EmploisDetailsResponse>(`${endpoint}/${slug}`);
  return response.data;
}

export async function SaveEmplois(uuid: string) {
  const response = await api.post(`${saveEndpoint}`, { emploi_uuid: uuid });
  return response.data;
}

export async function CancelSaveEmplois(uuid: string) {
  const response = await api.delete(`${saveEndpoint}/${uuid}`);
  return response.data;
}
