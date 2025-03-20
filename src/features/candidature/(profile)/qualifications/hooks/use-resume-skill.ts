/**
 * Hooks for managing resume skills
 * Provides mutations for creating, updating, and deleting skills
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleResumeSkill, deleteResumeSkill } from "../services/resume-skill";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";

export function useCreateResumeSkill() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResumeSkill,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Skill added",
        description: "Skill has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to add skill",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useDeleteResumeSkill() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteResumeSkill,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Skill deleted",
        description: "Skill has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete skill",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useUpdateResumeSkill() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResumeSkill,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Skill updated",
        description: "Skill has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to update skill",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}
