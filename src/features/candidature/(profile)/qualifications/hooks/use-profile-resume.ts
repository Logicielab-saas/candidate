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

export function useUpdateProfileResume() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: updateProfileResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_RESUME_QUERY_KEY });

      toast.toast({
        variant: "success",
        title: "Resume updated successfully",
        description: "Your resume description has been updated successfully",
      });
    },
    onError: (error) => {
      toast.toast({
        variant: "destructive",
        title: "Failed to update resume",
        description: error.message || "Failed to update resume description",
      });
    },
  });

  return { mutate, isPending, isError };
}
