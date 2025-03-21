import { useQuery } from "@tanstack/react-query";
import {
  type EmploisResponse,
  fetchEmplois,
  fetchEmploisBySlug,
} from "../services/emplois";

export const EMPLOIS_QUERY_KEY = ["emplois"];

export function useEmplois() {
  const { data, isLoading, error } = useQuery<EmploisResponse>({
    queryKey: EMPLOIS_QUERY_KEY,
    queryFn: fetchEmplois,
  });

  return {
    data: data?.emplois || [],
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
