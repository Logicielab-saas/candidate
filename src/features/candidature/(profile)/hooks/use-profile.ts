import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, getProfile, updateProfile } from "../services/profile";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_RESUME_QUERY_KEY } from "../qualifications/hooks/use-profile-resume";

export const profileKeys = {
  all: ["profile"] as const,
  me: () => [...profileKeys.all, "me"] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: getProfile,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: getCurrentUser,
  });
}

export function useUpdateProfile(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(profileKeys.me(), data);
      queryClient.invalidateQueries({ queryKey: profileKeys.me() });
      queryClient.invalidateQueries({ queryKey: PROFILE_RESUME_QUERY_KEY });

      toast.toast({
        variant: "success",
        title: t("toast.profile.update.title"),
        description: t("toast.profile.update.description"),
      });
    },
    onError: () => {
      toast.toast({
        variant: "destructive",
        title: t("toast.error.title"),
        description: t("toast.error.description"),
      });
    },
  });
}
