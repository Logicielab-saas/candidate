/**
 * Hooks for managing resume languages
 * Provides mutations for creating, updating, and deleting languages
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeLanguage,
  deleteResumeLanguage,
} from "../services/resume-language";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";
import { AxiosError } from "axios";

export function useCreateResumeLanguage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResumeLanguage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Language added",
        description: "Language has been added successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to add language",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useDeleteResumeLanguage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteResumeLanguage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Language deleted",
        description: "Language has been deleted successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to delete language",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useUpdateResumeLanguage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResumeLanguage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Language updated",
        description: "Language has been updated successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to update language",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}
