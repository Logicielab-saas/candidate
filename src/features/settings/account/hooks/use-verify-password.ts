/**
 * useVerifyPassword - Hook for verifying user password
 *
 * Provides a mutation for verifying the current user's password
 * using the verifyPassword API endpoint.
 */

import { useMutation } from "@tanstack/react-query";
import { verifyPassword } from "@/features/auth/services/verify-password";
import { useToast } from "@/hooks/use-toast";

export function useVerifyPassword(t: (key: string) => string) {
  const { toast } = useToast();

  return useMutation({
    mutationFn: verifyPassword,
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("toast.verifyPassword.success.title"),
        description: t("toast.verifyPassword.success.description"),
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
