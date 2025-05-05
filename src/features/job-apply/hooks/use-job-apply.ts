/**
 * useApplyToJob - Hook for handling job application submissions
 *
 * Uses React Query for managing the mutation state and API call
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApplyToJob } from "../services/job-apply";
import { useToast } from "@/hooks/use-toast";
import type { JobApplyFormData } from "@/core/interfaces";
import { EMPLOIS_QUERY_KEY } from "@/features/Emplois/hooks/use-emplois";

export const JOB_APPLY_QUERY_KEY = ["job-apply"];

export function useApplyToJob(t: (k: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: JobApplyFormData) => ApplyToJob(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: EMPLOIS_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: t("toast.jobApply.create.title"),
        description: t("toast.jobApply.create.description"),
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
