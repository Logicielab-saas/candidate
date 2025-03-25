import { useQuery } from "@tanstack/react-query";
import {
  type EmploisResponse,
  fetchEmplois,
  fetchEmploisBySlug,
} from "../services/emplois";

export const EMPLOIS_QUERY_KEY = ["emplois"];

interface UseEmploisParams {
  page?: number;
  per_page?: number;
}

export function useEmplois(params?: UseEmploisParams) {
  const { data, isLoading, error } = useQuery<EmploisResponse>({
    queryKey: [...EMPLOIS_QUERY_KEY, params?.page, params?.per_page].filter(
      Boolean
    ),
    queryFn: () => fetchEmplois(params?.page, params?.per_page),
  });

  return {
    data: data?.emplois || [],
    pagination: data?.pagination,
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
