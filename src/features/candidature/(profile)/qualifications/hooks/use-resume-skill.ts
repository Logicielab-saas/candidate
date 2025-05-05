/**
 * Hooks for managing resume skills
 * Provides mutations for creating, updating, and deleting skills
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleResumeSkill, deleteResumeSkill } from "../services/resume-skill";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";
import { SKILLS_QUERY_KEY } from "@/hooks/use-skills";

export function useCreateResumeSkill(t: (k: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResumeSkill,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: PROFILE_RESUME_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: SKILLS_QUERY_KEY,
        }),
      ]);

      toast({
        variant: "success",
        title: t("toast.resumeSkill.create.title"),
        description: t("toast.resumeSkill.create.description"),
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

export function useDeleteResumeSkill(t: (k: string) => string) {
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
        title: t("toast.resumeSkill.delete.title"),
        description: t("toast.resumeSkill.delete.description"),
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

export function useUpdateResumeSkill(t: (k: string) => string) {
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
        title: t("toast.resumeSkill.update.title"),
        description: t("toast.resumeSkill.update.description"),
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
