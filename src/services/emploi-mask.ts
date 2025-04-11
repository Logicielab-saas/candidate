import { AxiosError } from "axios";
import api from "@/lib/axios";
import type { ApiError } from "next/dist/server/api-utils";

const maskEndPoint = "employee/emploi/mask";

interface MaskEmploiResponse {
  message: string;
  uuid: string;
  user_uuid: string;
  emploi_uuid: string;
}
export async function MaskEmploi(emploi_uuid: string) {
  try {
    const response = await api.post<MaskEmploiResponse>(
      `${maskEndPoint}?emploi_uuid=${emploi_uuid}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to mask job`);
    }
    throw error;
  }
}
