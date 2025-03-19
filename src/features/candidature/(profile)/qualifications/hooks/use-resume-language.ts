import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeLanguage,
  deleteResumeLanguage,
  type CreateLanguageDTO,
  type UpdateLanguageDTO,
} from "../services/resume-language";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";

export function useCreateResumeLanguage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateLanguageDTO) => handleResumeLanguage(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Language added",
        description: "Your language has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to add language",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}

export function useDeleteResumeLanguage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteResumeLanguage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Language deleted",
        description: "Your language has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete language",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}

export function useUpdateResumeLanguage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateLanguageDTO) => handleResumeLanguage(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Language updated",
        description: "Your language has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to update language",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}
