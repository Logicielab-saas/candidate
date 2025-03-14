import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile";

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
