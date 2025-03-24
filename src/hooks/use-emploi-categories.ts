/**
 * useEmploiCategories - Custom hook for fetching and managing emploi categories
 *
 * This hook provides access to the list of available emploi categories using React Query.
 * It handles caching, loading states, and error handling for emploi categories-related operations.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchPublicEmploiCategories } from "@/services/public/emploi-categories";
import type { EmploisCategories } from "@/core/interfaces";

export const EMPLOI_CATEGORIES_QUERY_KEY = ["emploi-categories"] as const;

export function useEmploiCategories() {
  const { data, isLoading, error } = useQuery<EmploisCategories[]>({
    queryKey: EMPLOI_CATEGORIES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchPublicEmploiCategories();
      return response.emploi_categories;
    },
  });

  return { data, isLoading, error };
}
