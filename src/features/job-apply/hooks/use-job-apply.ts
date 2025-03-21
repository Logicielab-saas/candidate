/**
 * useApplyToJob - Hook for handling job application submissions
 *
 * Uses React Query for managing the mutation state and API call
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApplyToJob } from "../services/job-apply";
import { useToast } from "@/hooks/use-toast";
import { JobApplyFormData } from "@/core/interfaces";

export const JOB_APPLY_QUERY_KEY = ["job-apply"];

export function useApplyToJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: JobApplyFormData) => ApplyToJob(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: JOB_APPLY_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Candidature envoyée",
        description: "Votre candidature a été envoyée avec succès.",
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
