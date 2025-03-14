import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/profile";

export const profileKeys = {
  all: ["profile"] as const,
  me: () => [...profileKeys.all, "me"] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: getCurrentUser,
  });
}
