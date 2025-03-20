/**
 * useSkills - Custom hook for fetching and managing skills
 *
 * This hook provides access to the list of available skills using React Query.
 * It handles caching, loading states, and error handling for skills-related operations.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchPublicSkills } from "@/services/public/skills";
import type { Skills } from "@/core/interfaces";

export const SKILLS_QUERY_KEY = ["skills"] as const;

export function useSkills(q?: string) {
  const { data, isLoading, error } = useQuery<Skills[]>({
    queryKey: [...SKILLS_QUERY_KEY, q],
    queryFn: async () => {
      const response = await fetchPublicSkills(q);
      return response.skills;
    },
  });

  return { data, isLoading, error };
}
