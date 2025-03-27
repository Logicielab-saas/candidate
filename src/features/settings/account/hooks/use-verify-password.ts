/**
 * useVerifyPassword - Hook for verifying user password
 *
 * Provides a mutation for verifying the current user's password
 * using the verifyPassword API endpoint.
 */

import { useMutation } from "@tanstack/react-query";
import { verifyPassword } from "@/features/auth/services/verify-password";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export function useVerifyPassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: verifyPassword,
    onSuccess: (response) => {
      toast({
        variant: "success",
        title: "Mot de passe vérifié",
        description: response.message || "Le mot de passe fourni est correct",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Erreur de vérification",
        description:
          (error.response?.data as { message: string }).message ||
          "Une erreur est survenue lors de la vérification du mot de passe",
      });
    },
  });
}
