import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeProject,
  deleteResumeProject,
  type CreateProjectDTO,
  type UpdateProjectDTO,
} from "../services/resume-project";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";

export function useCreateResumeProject(t: (key: string) => string) {
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
        title: t("toast.resumeProject.create.title"),
        description: t("toast.resumeProject.create.description"),
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

export function useDeleteResumeProject(t: (key: string) => string) {
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
        title: t("toast.resumeProject.delete.title"),
        description: t("toast.resumeProject.delete.description"),
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

export function useUpdateResumeProject(t: (key: string) => string) {
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
        title: t("toast.resumeProject.update.title"),
        description: t("toast.resumeProject.update.description"),
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
