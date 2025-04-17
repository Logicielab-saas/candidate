/**
 * useNotifications - Custom hook for fetching and managing notifications
 *
 * This hook provides access to the list of available notifications using React Query.
 * It handles caching, loading states, and error handling for notifications-related operations.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "@/features/notifications/services/notifications";
import type { Notification } from "@/core/interfaces";

export const NOTIFICATIONS_QUERY_KEY = ["notifications"] as const;

export function useNotifications() {
  const { data, isLoading, error } = useQuery<Notification[]>({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchNotifications();
      return response.notifications;
    },
  });

  return { data, isLoading, error };
}
