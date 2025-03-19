import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeCertification,
  deleteResumeCertification,
  type CreateCertificationDTO,
  type UpdateCertificationDTO,
} from "../services/resume-certification";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";

export function useCreateResumeCertification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateCertificationDTO) =>
      handleResumeCertification(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Certification added",
        description: "Your certification has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to add certification",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}

export function useDeleteResumeCertification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteResumeCertification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Certification deleted",
        description: "Your certification has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete certification",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}

export function useUpdateResumeCertification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateCertificationDTO) =>
      handleResumeCertification(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROFILE_RESUME_QUERY_KEY,
      });

      toast({
        variant: "success",
        title: "Certification updated",
        description: "Your certification has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to update certification",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    },
  });
}
