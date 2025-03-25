import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import {
  cancelSaveEmplois,
  fetchSavedJobs,
  saveEmplois,
} from "@/features/candidature/(profile)/my-jobs/services/my-saved-jobs";
import { EMPLOIS_QUERY_KEY } from "@/features/Emplois/hooks/use-emplois";

export const SAVED_EMPLOIS_QUERY_KEY = ["saved-emplois"];

export function useFetchSavedEmplois() {
  const { data, isLoading, error } = useQuery({
    queryKey: SAVED_EMPLOIS_QUERY_KEY,
    queryFn: fetchSavedJobs,
  });
  return { data, isLoading, error };
}

export function useSaveEmplois() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => saveEmplois(uuid),
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EMPLOIS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: SAVED_EMPLOIS_QUERY_KEY,
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

export function useCancelSaveEmplois() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => cancelSaveEmplois(uuid),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EMPLOIS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: SAVED_EMPLOIS_QUERY_KEY,
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
