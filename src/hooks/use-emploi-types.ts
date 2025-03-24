import { fetchPublicEmploiTypes } from "@/services/public/emploi-types";
import { useQuery } from "@tanstack/react-query";
import type { EmploisTypes } from "@/core/interfaces";

export const EMPLOI_TYPES_QUERY_KEY = ["emploi-types"] as const;

export function useEmploiTypes() {
  const { data, isLoading, error } = useQuery<EmploisTypes[]>({
    queryKey: EMPLOI_TYPES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchPublicEmploiTypes();
      return response.emploi_types;
    },
  });

  return { data, isLoading, error };
}
