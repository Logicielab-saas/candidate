/**
 * Hooks for managing resume files
 * Provides mutations for creating, updating, and deleting files
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeFiles,
  deleteResumeFiles,
  fetchResumeFiles,
  updateResumeFiles,
} from "../services/resume-files";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";
import { profileKeys } from "../../hooks/use-profile";

export function useCreateResumeFiles(t: (key: string) => string) {
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
        title: t("toast.resumeFiles.create.title"),
        description: t("toast.resumeFiles.create.description"),
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

export function useDeleteResumeFiles(t: (key: string) => string) {
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
        title: t("toast.resumeFiles.delete.title"),
        description: t("toast.resumeFiles.delete.description"),
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

export function useUpdateResumeFiles(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: updateResumeFiles,
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
        title: t("toast.resumeFiles.update.title"),
        description: t("toast.resumeFiles.update.description"),
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

export function useFetchResumeFiles() {
  const { data, isLoading, error } = useQuery({
    queryKey: PROFILE_RESUME_QUERY_KEY,
    queryFn: fetchResumeFiles,
  });

  return { data, isLoading, error };
}
