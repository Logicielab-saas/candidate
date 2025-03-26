import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { EMPLOIS_QUERY_KEY } from "@/features/Emplois/hooks/use-emplois";
import {
  fetchSentApplications,
  fetchSentApplicationsDetails,
} from "../services/my-applied-jobs";
import { deleteSentApplication } from "../services/my-applied-jobs";
import { useTabsCountStore } from "../store/tabs-count.store";
import { useEffect } from "react";

export const SENT_APPLICATIONS_QUERY_KEY = ["sent-applications"];

export function useFetchSentApplications(
  page: number = 1,
  perPage: number = 10
) {
  // Get the setter from the tabs count store
  const setSentApplicationsCount = useTabsCountStore(
    (state) => state.setSentApplicationsCount
  );

  const { data, isLoading, error } = useQuery({
    queryKey: [...SENT_APPLICATIONS_QUERY_KEY, page, perPage],
    queryFn: () => fetchSentApplications(page, perPage),
  });

  // Update the count in the store when data changes
  useEffect(() => {
    if (data?.pagination?.total !== undefined) {
      setSentApplicationsCount(data.pagination.total);
    }
  }, [data?.pagination?.total, setSentApplicationsCount]);

  return { data, isLoading, error };
}

export function useFetchSentApplicationsDetails(slug: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: [SENT_APPLICATIONS_QUERY_KEY, slug],
    queryFn: () => fetchSentApplicationsDetails(slug),
  });
  return { data, isLoading, error };
}

export function useDeleteSentApplication() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => deleteSentApplication(uuid),
    onSuccess: async (data) => {
      // Wait for the query invalidation to complete
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EMPLOIS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: SENT_APPLICATIONS_QUERY_KEY,
        }),
      ]);
      console.log(data);
      toast.toast({
        variant: "success",
        title: "Application deleted",
        description:
          data.message || "Your application has been deleted successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to delete application",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}
