/**
 * Hooks for managing resume files
 * Provides mutations for creating, updating, and deleting files
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeFiles,
  deleteResumeFiles,
  fetchResumeFiles,
} from "../services/resume-files";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";
import { profileKeys } from "../../hooks/use-profile";

export function useCreateResumeFiles() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResumeFiles,
    onSuccess: async () => {
      // Force refetch both queries
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: PROFILE_RESUME_QUERY_KEY,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: profileKeys.me(),
          refetchType: "all",
        }),
      ]);

      toast({
        variant: "success",
        title: "Files added",
        description: "Files has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to add files",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useDeleteResumeFiles() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteResumeFiles,
    onSuccess: async () => {
      // Force refetch both queries
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: PROFILE_RESUME_QUERY_KEY,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: profileKeys.me(),
          refetchType: "all",
        }),
      ]);

      toast({
        variant: "success",
        title: "Files deleted",
        description: "Files has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete files",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useUpdateResumeFiles() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResumeFiles,
    onSuccess: async () => {
      // Force refetch both queries
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: PROFILE_RESUME_QUERY_KEY,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: profileKeys.me(),
          refetchType: "all",
        }),
      ]);

      toast({
        variant: "success",
        title: "Files updated",
        description: "Files has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to update files",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useFetchResumeFiles() {
  const { data, isLoading, error } = useQuery({
    queryKey: PROFILE_RESUME_QUERY_KEY,
    queryFn: fetchResumeFiles,
  });

  return { data, isLoading, error };
}
