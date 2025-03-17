import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../services/profile";
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

export function useUpdateProfile() {
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
        title: "Profile updated successfully",
        description: "Your profile has been updated successfully",
      });
    },
    onError: (error) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: error.message || "Failed to update profile",
      });
    },
  });
}
