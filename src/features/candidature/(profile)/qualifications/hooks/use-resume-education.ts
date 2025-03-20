import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeEducation,
  deleteResumeEducation,
  type CreateEducationDTO,
  type UpdateEducationDTO,
} from "../services/resume-education";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";

export function useCreateResumeEducation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateEducationDTO) => handleResumeEducation(data),
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast.toast({
        variant: "success",
        title: "Education added",
        description: "Your education has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to add education",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useDeleteResumeEducation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteResumeEducation,
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast.toast({
        variant: "success",
        title: "Education deleted",
        description: "Your education has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to delete education",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useUpdateResumeEducation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateEducationDTO) => handleResumeEducation(data),
    onSuccess: async () => {
      // Wait for the query invalidation to complete
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast.toast({
        variant: "success",
        title: "Education updated",
        description: "Your education has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to update education",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}
