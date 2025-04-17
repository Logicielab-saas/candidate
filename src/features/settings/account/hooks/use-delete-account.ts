/**
 * useDeleteAccount - Hook for deleting user account
 *
 * Provides a mutation for deleting the user's account with proper
 * validation and error handling.
 */

import { useMutation } from "@tanstack/react-query";
import {
  type DeleteAccount,
  DeleteMyAccount,
} from "@/features/settings/account/services/delete-account";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export function useDeleteAccount() {
  const { toast } = useToast();

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: (data: DeleteAccount) => DeleteMyAccount(data),
    onSuccess: (response) => {
      toast({
        variant: "success",
        title: "Compte supprimé",
        description: response.message || "Le compte a été supprimé avec succès",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Erreur de suppression",
        description:
          (error.response?.data as { message: string }).message ||
          "Une erreur est survenue lors de la suppression du compte",
      });
    },
  });

  return { deleteAccount, isPending };
}
