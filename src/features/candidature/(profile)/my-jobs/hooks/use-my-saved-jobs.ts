import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
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

export function useSaveEmplois(jobSlug: string, t: (key: string) => string) {
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
        title: t("toast.mySavedJobs.save.title"),
        description: t("toast.mySavedJobs.save.description"),
      });
    },
    onError: () => {
      toast.toast({
        variant: "destructive",
        title: t("toast.error.title"),
        description: t("toast.error.description"),
      });
    },
  });

  return { mutate, isPending };
}

export function useCancelSaveEmplois(
  jobSlug: string,
  t: (key: string) => string
) {
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
        title: t("toast.mySavedJobs.unsave.title"),
        description: t("toast.mySavedJobs.unsave.description"),
      });
    },
    onError: () => {
      toast.toast({
        variant: "destructive",
        title: t("toast.error.title"),
        description: t("toast.error.description"),
      });
    },
  });

  return { mutate, isPending };
}
