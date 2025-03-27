/**
 * useVerifyPassword - Hook for verifying user password
 *
 * Provides a mutation for verifying the current user's password
 * using the verifyPassword API endpoint.
 */

import { useMutation } from "@tanstack/react-query";
import { verifyPassword } from "@/features/auth/services/verify-password";
import { useToast } from "@/hooks/use-toast";

export function useVerifyPassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: verifyPassword,
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur de vérification",
        description: "Le mot de passe fourni est incorrect",
      });
    },
  });
}
