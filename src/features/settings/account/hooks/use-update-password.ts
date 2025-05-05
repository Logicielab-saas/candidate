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

export function useUpdatePassword(t: (key: string) => string) {
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
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("toast.updatePassword.success.title"),
        description: t("toast.updatePassword.success.description"),
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
}
