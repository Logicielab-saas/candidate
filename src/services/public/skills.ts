import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { Skills } from "@/core/interfaces";

const endpoint = "/employee/skills";

interface SkillsResponse {
  skills: Skills[];
}

export async function fetchPublicSkills(q?: string) {
  try {
    const response = await api.get<SkillsResponse>(endpoint, {
      params: { q },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch skills`);
    }
    throw error;
  }
}