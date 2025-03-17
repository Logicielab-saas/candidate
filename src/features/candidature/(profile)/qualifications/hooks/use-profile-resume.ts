import { useQuery } from "@tanstack/react-query";
import { getProfileResume } from "../services/resume";

export const PROFILE_RESUME_QUERY_KEY = ["profile-resume"];

export function useProfileResume() {
  return useQuery({
    queryKey: PROFILE_RESUME_QUERY_KEY,
    queryFn: getProfileResume,
  });
}
