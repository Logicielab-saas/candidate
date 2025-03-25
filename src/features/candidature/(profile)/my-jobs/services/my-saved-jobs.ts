import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

const saveEndpoint = "/employee/emploi/save";
export async function fetchSavedJobs() {
  try {
    const response = await api.get(`${saveEndpoint}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emplois`);
    }
    throw error;
  }
}

export async function saveEmplois(uuid: string) {
  const response = await api.post(`${saveEndpoint}`, { emploi_uuid: uuid });
  return response.data;
}

export async function cancelSaveEmplois(uuid: string) {
  const response = await api.delete(`${saveEndpoint}/${uuid}`);
  return response.data;
}
