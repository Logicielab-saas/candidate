/**
 * useCities - Custom hook for fetching and managing cities
 *
 * This hook provides access to the list of available cities using React Query.
 * It handles caching, loading states, and error handling for city-related operations.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchPublicCities } from "@/services/public/cities";
import type { Cities } from "@/core/interfaces";

export const CITIES_QUERY_KEY = ["cities"] as const;

export function useCities() {
  return useQuery<Cities[]>({
    queryKey: CITIES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchPublicCities();
      return response.cities;
    },
  });
}
