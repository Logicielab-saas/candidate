/**
 * useDataWebJson - Custom hook for fetching and managing data-web-json
 *
 * This hook provides access to the data-web-json using React Query.
 * It handles caching, loading states, and error handling for data-web-json-related operations.
 */

import { useQuery } from "@tanstack/react-query";
import { getDataWebJson } from "@/services/data-web-json";

export const DATA_WEB_JSON_QUERY_KEY = ["data-web-json"] as const;

export function useDataWebJson(userRole: string, locale: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: DATA_WEB_JSON_QUERY_KEY,
    queryFn: async () => {
      const response = await getDataWebJson(userRole, locale);
      return response.data;
    },
  });

  return { data, isLoading, error };
}
