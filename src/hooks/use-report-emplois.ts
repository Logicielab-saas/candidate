/**
 * useReportEmploi - Hook for handling job report submissions and queries
 *
 * Uses React Query for managing the mutation state and API calls
 * Provides optimistic updates and targeted cache invalidation
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { CreateReportEmploi } from "@/core/interfaces";
import { EMPLOIS_QUERY_KEY } from "@/features/Emplois/hooks/use-emplois";
import { fetchReportEmploi, ReportEmploi } from "@/services/emploi-report";

export const REPORT_EMPLOI_QUERY_KEY = ["report-emploi"] as const;

export function useFetchReportEmploi() {
  const { data, isLoading, error } = useQuery({
    queryKey: REPORT_EMPLOI_QUERY_KEY,
    queryFn: fetchReportEmploi,
  });

  return { data, isLoading, error };
}

export function useReportEmploi(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateReportEmploi) => ReportEmploi(data),
    onSuccess: async (_, variables) => {
      // Only invalidate the specific job's data
      await queryClient.invalidateQueries({
        queryKey: [...EMPLOIS_QUERY_KEY, variables.emploi_uuid],
      });

      // Update the reports list if it exists in cache
      await queryClient.invalidateQueries({
        queryKey: [...REPORT_EMPLOI_QUERY_KEY, variables.emploi_uuid],
      });

      toast({
        variant: "success",
        title: t("toast.reportEmploi.success.title"),
        description: t("toast.reportEmploi.success.description"),
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("toast.error.title"),
        description: t("toast.error.description"),
      });
    },
  });

  return { mutate, isPending };
}
