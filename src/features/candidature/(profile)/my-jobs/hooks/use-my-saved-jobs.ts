import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import {
  cancelSaveEmplois,
  fetchSavedJobs,
  saveEmplois,
} from "@/features/candidature/(profile)/my-jobs/services/my-saved-jobs";
import { EMPLOIS_QUERY_KEY } from "@/features/Emplois/hooks/use-emplois";
import { useTabsCountStore } from "../store/tabs-count.store";
import { useEffect, useRef } from "react";

export const SAVED_EMPLOIS_QUERY_KEY = ["saved-emplois"];

export function useFetchSavedEmplois(page: number = 1, per_page: number = 10) {
  const setSavedJobsCount = useTabsCountStore(
    (state) => state.setSavedJobsCount
  );

  const prevCountRef = useRef<number | null>(null);

  const result = useQuery({
    queryKey: [...SAVED_EMPLOIS_QUERY_KEY, page, per_page],
    queryFn: () => fetchSavedJobs(page, per_page),
  });

  useEffect(() => {
    const total = result.data?.pagination?.total;

    if (total !== undefined && total !== prevCountRef.current) {
      setSavedJobsCount(total);
      prevCountRef.current = total;
    }
  }, [result.data?.pagination?.total, setSavedJobsCount]);

  return result;
}

export function useSaveEmplois(jobSlug: string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => saveEmplois(uuid),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EMPLOIS_QUERY_KEY,
          type: "all",
          exact: false,
        }),
        queryClient.invalidateQueries({
          queryKey: SAVED_EMPLOIS_QUERY_KEY,
          type: "all",
          exact: false,
        }),
        queryClient.invalidateQueries({
          queryKey: [EMPLOIS_QUERY_KEY, jobSlug],
        }),
      ]);

      toast.toast({
        variant: "success",
        title: "Emploi saved",
        description: "Your emploi has been saved successfully.",
      });
    },
    onError: (error: AxiosError) => {
      if (
        (error.response?.data as { message: string }).message ===
        "You have already saved to this emploi"
      ) {
        toast.toast({
          variant: "info",
          title: "Emploi already saved",
          description: (error.response?.data as { message: string }).message,
        });
      } else {
        toast.toast({
          variant: "destructive",
          title: "Failed to save emploi",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    },
  });

  return { mutate, isPending };
}

export function useCancelSaveEmplois(jobSlug: string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => cancelSaveEmplois(uuid),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EMPLOIS_QUERY_KEY,
          type: "all",
          exact: false,
        }),
        queryClient.invalidateQueries({
          queryKey: SAVED_EMPLOIS_QUERY_KEY,
          type: "all",
          exact: false,
        }),
        queryClient.invalidateQueries({
          queryKey: [EMPLOIS_QUERY_KEY, jobSlug],
        }),
      ]);

      toast.toast({
        variant: "success",
        title: "Emploi removed",
        description: "Your emploi has been removed successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to remove emploi",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}
