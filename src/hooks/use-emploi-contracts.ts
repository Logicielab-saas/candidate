import type { EmploisContracts } from "@/core/interfaces";
import { fetchPublicEmploiContracts } from "@/services/public/emploi-contracts";
import { useQuery } from "@tanstack/react-query";

export const EMPLOI_CONTRACTS_QUERY_KEY = ["emploi-contracts"] as const;

export function useEmploiContracts() {
  const { data, isLoading, error } = useQuery<EmploisContracts[]>({
    queryKey: EMPLOI_CONTRACTS_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchPublicEmploiContracts();
      return response.emploi_contracts;
    },
  });

  return { data, isLoading, error };
}
