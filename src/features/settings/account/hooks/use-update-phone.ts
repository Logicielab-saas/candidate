/**
 * useUpdatePhone - Hook for updating user phone number
 *
 * Provides a mutation for updating the user's phone number
 * using the updateProfile API endpoint.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/features/candidature/(profile)/services/profile";
import { profileKeys } from "@/features/candidature/(profile)/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/features/candidature/(profile)/hooks/use-profile";

export function useUpdatePhone(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: profile } = useProfile();

  return useMutation({
    mutationFn: async (phone: string) => {
      if (!profile) {
        toast({
          variant: "destructive",
          title: t("toast.error.title"),
          description: t("toast.error.description"),
        });
        return;
      }

      return updateProfile({
        phone,
      });
    },
    onSuccess: () => {
      // Invalidate profile data to trigger a refetch
      queryClient.invalidateQueries({ queryKey: profileKeys.me() });
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
