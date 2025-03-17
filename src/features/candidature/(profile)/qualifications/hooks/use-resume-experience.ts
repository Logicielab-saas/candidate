import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createResumeExperience,
  deleteResumeExperience,
  UpdateExperienceDTO,
  updateResumeExperience,
} from "../services/resume-experience";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";

export function useCreateResumeExperience() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: createResumeExperience,
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast.toast({
        variant: "success",
        title: "Experience added",
        description: "Your experience has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to add experience",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}

export function useDeleteResumeExperience() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteResumeExperience,
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast.toast({
        variant: "success",
        title: "Experience deleted",
        description: "Your experience has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to delete experience",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}

export function useUpdateResumeExperience() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExperienceDTO }) =>
      updateResumeExperience(uuid, data),
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast.toast({
        variant: "success",
        title: "Experience updated",
        description: "Your experience has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to update experience",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}
