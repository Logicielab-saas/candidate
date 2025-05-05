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

export function useDeleteAccount(t: (key: string) => string) {
  const { toast } = useToast();

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: (data: DeleteAccount) => DeleteMyAccount(data),
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("toast.deleteAccount.success.title"),
        description: t("toast.deleteAccount.success.description"),
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

  return { deleteAccount, isPending };
}
