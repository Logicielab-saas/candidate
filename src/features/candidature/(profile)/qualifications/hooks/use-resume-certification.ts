import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeCertification,
  deleteResumeCertification,
  type CreateCertificationDTO,
  type UpdateCertificationDTO,
} from "../services/resume-certification";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";

export function useCreateResumeCertification(t: (k: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateCertificationDTO) =>
      handleResumeCertification(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: t("toast.resumeCertification.create.title"),
        description: t("toast.resumeCertification.create.description"),
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

export function useDeleteResumeCertification(t: (k: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteResumeCertification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: t("toast.resumeCertification.delete.title"),
        description: t("toast.resumeCertification.delete.description"),
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

export function useUpdateResumeCertification(t: (k: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateCertificationDTO) =>
      handleResumeCertification(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: t("toast.resumeCertification.update.title"),
        description: t("toast.resumeCertification.update.description"),
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
