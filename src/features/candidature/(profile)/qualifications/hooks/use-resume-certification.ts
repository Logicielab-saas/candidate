import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createResumeCertification,
  deleteResumeCertification,
  UpdateCertificationDTO,
  updateResumeCertification,
} from "../services/resume-certification";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "./use-profile-resume";

export function useCreateResumeCertification() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: createResumeCertification,
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
}

export function useDeleteResumeCertification() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteResumeCertification,
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
}

export function useUpdateResumeCertification() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({
      uuid,
      data,
    }: {
      uuid: string;
      data: UpdateCertificationDTO;
    }) => updateResumeCertification(uuid, data),
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
}
