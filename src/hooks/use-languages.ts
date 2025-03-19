/**
 * useLanguages - Custom hook for fetching and managing languages
 *
 * This hook provides access to the list of available languages using React Query.
 * It handles caching, loading states, and error handling for language-related operations.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchPublicLanguages } from "@/services/public/languages";
import type { Languages } from "@/core/interfaces";

export const LANGUAGES_QUERY_KEY = ["languages"] as const;

export function useLanguages() {
  return useQuery<Languages[]>({
    queryKey: LANGUAGES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchPublicLanguages();
      return response.languages;
    },
  });
}
