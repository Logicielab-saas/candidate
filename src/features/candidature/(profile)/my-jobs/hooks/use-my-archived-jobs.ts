/**
 * use-my-archived-jobs - Hook for managing archived jobs functionality
 *
 * This hook provides functionality to:
 * 1. Fetch archived jobs with pagination
 * 2. Fetch archived job details
 * 3. Delete archived jobs
 *
 * Uses React Query for data fetching and caching
 * Integrates with the tabs count store for archived jobs count
 */

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { EMPLOIS_QUERY_KEY } from "@/features/Emplois/hooks/use-emplois";
import { useTabsCountStore } from "../store/tabs-count.store";
import { useEffect } from "react";
import {
  fetchArchivedJobs,
  archiveEmplois,
  cancelArchiveEmplois,
} from "../services/my-archived-jobs";

export const ARCHIVED_JOBS_QUERY_KEY = ["archived-jobs"];

export function useFetchArchivedJobs(page: number = 1, perPage: number = 10) {
  // Get the setter from the tabs count store
  const setArchivedCount = useTabsCountStore((state) => state.setArchivedCount);

  const { data, isLoading, error } = useQuery({
    queryKey: [...ARCHIVED_JOBS_QUERY_KEY, page, perPage],
    queryFn: () => fetchArchivedJobs(page, perPage),
    placeholderData: keepPreviousData,
  });

  // Update the count in the store when data changes
  useEffect(() => {
    if (data?.pagination?.total !== undefined) {
      setArchivedCount(data.pagination.total);
    }
  }, [data?.pagination?.total, setArchivedCount]);

  return { data, isLoading, error };
}

export function useArchiveJob(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => archiveEmplois(uuid),
    onSuccess: async () => {
      // Invalidate both emplois and archived jobs queries
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EMPLOIS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: ARCHIVED_JOBS_QUERY_KEY,
        }),
      ]);

      toast.toast({
        variant: "success",
        title: t("toast.myArchivedJobs.update.title"),
        description: t("toast.myArchivedJobs.update.description"),
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

export function useUnarchiveJob(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => cancelArchiveEmplois(uuid),
    onSuccess: async () => {
      // Invalidate both emplois and archived jobs queries
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EMPLOIS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: ARCHIVED_JOBS_QUERY_KEY,
        }),
      ]);

      toast.toast({
        variant: "success",
        title: t("toast.myArchivedJobs.delete.title"),
        description: t("toast.myArchivedJobs.delete.description"),
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
