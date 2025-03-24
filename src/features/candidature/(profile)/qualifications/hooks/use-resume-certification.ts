import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleResumeCertification,
  deleteResumeCertification,
  type CreateCertificationDTO,
  type UpdateCertificationDTO,
} from "../services/resume-certification";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";
import { AxiosError } from "axios";

export function useCreateResumeCertification() {
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
        title: "Certification added",
        description: "Your certification has been added successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to add certification",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useDeleteResumeCertification() {
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
        title: "Certification deleted",
        description: "Your certification has been deleted successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to delete certification",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}

export function useUpdateResumeCertification() {
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
        title: "Certification updated",
        description: "Your certification has been updated successfully.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Failed to update certification",
        description:
          (error.response?.data as { message: string }).message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { mutate, isPending };
}
