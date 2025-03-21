import { useQuery } from "@tanstack/react-query";
import { fetchEmplois } from "../services/emplois";
import type { Emplois } from "@/core/interfaces";

export const EMPLOIS_QUERY_KEY = ["emplois"];

interface EmploisResponse {
  message: string;
  emplois: Emplois[];
}

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
