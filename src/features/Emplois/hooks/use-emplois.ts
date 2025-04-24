import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchEmplois,
  fetchEmploisBySlug,
  fetchSearchSuggestions,
} from "../services/emplois";
import { useQueryState } from "nuqs";

export const EMPLOIS_QUERY_KEY = ["emplois"];

interface UseEmploisParams {
  page?: number;
  per_page?: number;
}

export function useEmplois(params?: UseEmploisParams) {
  const [searchText] = useQueryState("q");
  const [selectedCity] = useQueryState("city");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      ...EMPLOIS_QUERY_KEY,
      "infinite",
      { q: searchText, city: selectedCity },
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchEmplois(
        pageParam,
        params?.per_page,
        searchText || undefined,
        selectedCity || undefined
      ),
    getNextPageParam: (lastPage) => {
      if (
        lastPage &&
        lastPage.pagination &&
        typeof lastPage.pagination.current_page === "number" &&
        typeof lastPage.pagination.last_page === "number"
      ) {
        if (lastPage.pagination.current_page < lastPage.pagination.last_page) {
          return lastPage.pagination.current_page + 1;
        }
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

export function useSearchSuggestions(params: string | { q?: string; city?: string }) {
  // Support both legacy (string) and new (object) usage
  let fetchParams: { q?: string; city?: string } = {};
  if (typeof params === 'string') {
    fetchParams.q = params;
  } else {
    fetchParams = params;
  }
  const enabled = !!((fetchParams.q && fetchParams.q.length >= 2) || (fetchParams.city && fetchParams.city.length >= 2));
  const { data, isLoading, error } = useQuery({
    queryKey: [EMPLOIS_QUERY_KEY, "search-suggestions", fetchParams],
    queryFn: () => fetchSearchSuggestions(fetchParams),
    enabled,
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
