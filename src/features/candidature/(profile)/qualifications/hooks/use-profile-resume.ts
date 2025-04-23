import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileResume, updateProfileResume } from "../services/resume";
import { useToast } from "@/hooks/use-toast";

export const PROFILE_RESUME_QUERY_KEY = ["profile-resume"];

export function useProfileResume() {
  const { data, isLoading, error } = useQuery({
    queryKey: PROFILE_RESUME_QUERY_KEY,
    queryFn: getProfileResume,
  });

  return { data, isLoading, error };
}

export function useUpdateProfileResume(t: (k: string) => string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: updateProfileResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_RESUME_QUERY_KEY });

      toast.toast({
        variant: "success",
        title: t("toast.resumeProfile.update.title"),
        description: t("toast.resumeProfile.update.description"),
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

  return { mutate, isPending, isError };
}
