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
import { AxiosError } from "axios";
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
  const setArchivedJobsCount = useTabsCountStore(
    (state) => state.setArchivedCount
  );

  const { data, isLoading, error } = useQuery({
    queryKey: [...ARCHIVED_JOBS_QUERY_KEY, page, perPage],
    queryFn: () => fetchArchivedJobs(page, perPage),
    placeholderData: keepPreviousData,
  });

  // Update the count in the store when data changes
  useEffect(() => {
    if (data?.pagination?.total !== undefined) {
      setArchivedJobsCount(data.pagination.total);
    }
  }, [data?.pagination?.total, setArchivedJobsCount]);

  return { data, isLoading, error };
}

export function useArchiveJob() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => archiveEmplois(uuid),
    onSuccess: async (data) => {
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
        title: "Job archived",
        description: data.message || "Job has been archived successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to archive job",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useUnarchiveJob() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => cancelArchiveEmplois(uuid),
    onSuccess: async (data) => {
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
        title: "Job unarchived",
        description: data.message || "Job has been unarchived successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to unarchive job",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}
