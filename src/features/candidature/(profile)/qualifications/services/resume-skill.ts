import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { ResumeSkill } from "@/core/interfaces";

const endpoint = "/employee/resume/skill-resume";

interface ResumeSkillItem {
  uuid: string;
  skill_uuid: string | null;
  resumeskill_level: string | null;
}

export interface CreateSkillDTO {
  resume_skills: ResumeSkillItem[];
}

export interface UpdateSkillDTO extends CreateSkillDTO {
  uuid: string;
}

export type SkillDTO = CreateSkillDTO | UpdateSkillDTO;

export async function handleResumeSkill(data: SkillDTO) {
  try {
    const response = await api.post<ResumeSkill>(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      const action = "uuid" in data ? "update" : "create";
      throw new Error(apiError?.message || `Failed to ${action} skill`);
    }
    throw error;
  }
}

export async function deleteResumeSkill(uuid: string) {
  try {
    await api.delete(`${endpoint}/${uuid}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to delete skill");
    }
    throw error;
  }
}
