import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { EmploisContracts } from "@/core/interfaces";

const endpoint = "/employee/emploi-contracts";

interface EmploiContractsResponse {
  emploi_contracts: EmploisContracts[];
}

export async function fetchPublicEmploiContracts(q?: string) {
  try {
    const response = await api.get<EmploiContractsResponse>(endpoint, {
      params: { q },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emploi contracts`);
    }
    throw error;
  }
}