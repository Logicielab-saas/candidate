import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CancelSaveEmplois,
  type EmploisResponse,
  fetchEmplois,
  fetchEmploisBySlug,
  SaveEmplois,
} from "../services/emplois";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export const EMPLOIS_QUERY_KEY = ["emplois"];

export function useEmplois() {
  const { data, isLoading, error } = useQuery<EmploisResponse>({
    queryKey: EMPLOIS_QUERY_KEY,
    queryFn: fetchEmplois,
  });

  return {
    data: data?.emplois || [],
    isLoading,
    error,
  };
}

export function useEmploisBySlug(slug: string | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: [EMPLOIS_QUERY_KEY, slug],
    queryFn: () => fetchEmploisBySlug(slug as string),
    enabled: !!slug, // Only fetch when we have a slug
  });

  return {
    data: data?.emploi,
    isLoading,
    error,
  };
}

export function useSaveEmplois() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => SaveEmplois(uuid),
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await queryClient.invalidateQueries({
        queryKey: EMPLOIS_QUERY_KEY,
      });

      toast.toast({
        variant: "success",
        title: "Emploi saved",
        description: "Your emploi has been saved successfully.",
      });
    },
    onError: (error: AxiosError) => {
      console.log(error);
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
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (uuid: string) => CancelSaveEmplois(uuid),
    onSuccess: async () => {
      toast.toast({
        variant: "success",
        title: "Emploi removed",
        description: "Your emploi has been removed successfully.",
      });
    },
  });

  return { mutate, isPending };
}
