/**
 * NotificationsList - Main notifications list container
 *
 * Manages the display and filtering of notifications
 * Handles loading states and empty states
 * Uses useNotifications hook for data fetching and state management
 */

"use client";

import { useQueryState } from "nuqs";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationItem } from "./NotificationItem";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNotifications } from "../hooks/use-notifications";
import { Skeleton } from "@/components/ui/skeleton";

export function NotificationsList() {
  const { data: notifications, isLoading, error } = useNotifications();
  const [type] = useQueryState<"job" | "interview" | "resume" | "all">("type", {
    parse: (value: string) => value as "job" | "interview" | "resume" | "all",
    defaultValue: "all",
  });
  const [readStatus] = useQueryState<"all" | "read" | "unread">("status", {
    parse: (value: string) => value as "all" | "read" | "unread",
    defaultValue: "all",
  });

  const handleMarkAsRead = async (_uuid: string) => {
    // TODO: Implement API call to mark notification as read
    // Will need to add a mutation function in the notifications service
  };

  if (error && !isLoading) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load notifications. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!notifications?.length && !isLoading) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Vous n&apos;avez pas encore de notifications.
        </AlertDescription>
      </Alert>
    );
  }

  const filteredNotifications = notifications?.filter((notification) => {
    const matchesType = type === "all" || notification.type === type;
    const matchesReadStatus =
      readStatus === "all" ||
      (readStatus === "read" ? notification.is_read : !notification.is_read);
    return matchesType && matchesReadStatus;
  });

  return (
    <div>
      <NotificationFilters />
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredNotifications?.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No notifications match your filters.
              </AlertDescription>
            </Alert>
          ) : (
            filteredNotifications?.map((notification) => (
              <NotificationItem
                key={notification.uuid}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
