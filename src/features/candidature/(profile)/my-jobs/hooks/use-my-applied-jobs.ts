import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
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
    placeholderData: keepPreviousData,
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

export function useDeleteSentApplication(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => deleteSentApplication(uuid),
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EMPLOIS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: SENT_APPLICATIONS_QUERY_KEY,
        }),
      ]);
      toast.toast({
        variant: "success",
        title: t("toast.myAppliedJobs.delete.title"),
        description: t("toast.myAppliedJobs.delete.description"),
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
