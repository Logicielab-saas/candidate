/**
 * useApplyToJob - Hook for handling job application submissions
 *
 * Uses React Query for managing the mutation state and API call
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CreateReportEmploi } from "@/core/interfaces";
import { EMPLOIS_QUERY_KEY } from "@/features/Emplois/hooks/use-emplois";
import { fetchReportEmploi, ReportEmploi } from "@/services/emploi-report";

export const REPORT_EMPLOI_QUERY_KEY = ["report-emploi"];

export function useFetchReportEmploi() {
  const { data, isLoading, error } = useQuery({
    queryKey: REPORT_EMPLOI_QUERY_KEY,
    queryFn: fetchReportEmploi,
  });

  return { data, isLoading, error };
}

export function useReportEmploi() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateReportEmploi) => ReportEmploi(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: EMPLOIS_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Report envoyé",
        description: "Votre report a été envoyé avec succès.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          error.message || "Une erreur est survenue. Veuillez réessayer.",
      });
    },
  });

  return { mutate, isPending };
}
