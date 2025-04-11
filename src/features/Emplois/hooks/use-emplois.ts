import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchEmplois,
  fetchEmploisBySlug,
  fetchSearchSuggestions,
} from "../services/emplois";

export const EMPLOIS_QUERY_KEY = ["emplois"];

interface UseEmploisParams {
  page?: number;
  per_page?: number;
}

export function useEmplois(params?: UseEmploisParams) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [...EMPLOIS_QUERY_KEY, "infinite"],
    queryFn: ({ pageParam = 1 }) => fetchEmplois(pageParam, params?.per_page),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.current_page < lastPage.pagination.last_page) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Combine all jobs from all pages
  const allJobs = data?.pages.flatMap((page) => page.emplois) || [];
  const latestPagination = data?.pages[data.pages.length - 1]?.pagination;

  return {
    data: allJobs,
    pagination: latestPagination,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

export function useSearchSuggestions(query: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: [EMPLOIS_QUERY_KEY, "search-suggestions", query],
    queryFn: () => fetchSearchSuggestions(query),
    enabled: query.length >= 2, // Only fetch when query is at least 2 characters
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });

  return {
    suggestions: data?.results || [],
    isLoading,
    error,
  };
}

export function useEmploisBySlug(slug: string | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: [EMPLOIS_QUERY_KEY, slug],
    queryFn: () => fetchEmploisBySlug(slug as string),
    enabled: !!slug, // Only fetch when we have a slug
  });

  return {
    data: data?.emploi,
    isLoading,
    error,
  };
}
