import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeProject,
  deleteResumeProject,
  type CreateProjectDTO,
  type UpdateProjectDTO,
} from "../services/resume-project";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";
import { AxiosError } from "axios";

export function useCreateResumeProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateProjectDTO) => handleResumeProject(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Project added",
        description: "Your project has been added successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to add project",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useDeleteResumeProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteResumeProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Project deleted",
        description: "Your project has been deleted successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to delete project",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useUpdateResumeProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateProjectDTO) => handleResumeProject(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to update project",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}
