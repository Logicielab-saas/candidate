/**
 * useUpdatePassword - Hook for updating user password
 *
 * Provides a mutation for updating the user's password with proper
 * validation and error handling.
 */

import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  ChangePasswordResponse,
} from "@/features/auth/services/change-password";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  password_confirmation: string;
}

export function useUpdatePassword() {
  const { toast } = useToast();

  return useMutation<
    ChangePasswordResponse,
    AxiosError<ChangePasswordResponse>,
    ChangePassword
  >({
    mutationFn: (data) =>
      changePassword({
        old_password: data.currentPassword,
        password: data.newPassword,
        password_confirmation: data.password_confirmation,
      }),
    onSuccess: (response) => {
      toast({
        variant: "success",
        title: "Mot de passe changé",
        description:
          response.message || "Le mot de passe a été changé avec succès",
      });
    },
    onError: (error) => {
      const errors = error.response?.data?.errors;
      const errorMessage = errors
        ? Object.values(errors).flat().join(", ")
        : "Une erreur est survenue lors du changement du mot de passe";

      toast({
        variant: "destructive",
        title: "Erreur de changement",
        description: errorMessage,
      });
    },
  });
}
