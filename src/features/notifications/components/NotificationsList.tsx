/**
 * NotificationsList - Main notifications list container
 *
 * Manages the display and filtering of notifications
 * Handles loading states and empty states
 */

"use client";

import { useQueryState } from "nuqs";
import { useState } from "react";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationItem } from "./NotificationItem";
import type { Notification, NotificationType } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface NotificationsListProps {
  initialNotifications: Notification[];
}

export function NotificationsList({
  initialNotifications,
}: NotificationsListProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [type] = useQueryState<NotificationType | "all">("type", {
    parse: (value: string) => value as NotificationType | "all",
    defaultValue: "all",
  });
  const [readStatus] = useQueryState<"all" | "read" | "unread">("status", {
    parse: (value: string) => value as "all" | "read" | "unread",
    defaultValue: "all",
  });

  const handleMarkAsRead = async (id: string) => {
    // TODO: Implement API call to mark notification as read
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = type === "all" || notification.type === type;
    const matchesReadStatus =
      readStatus === "all" ||
      (readStatus === "read" ? notification.isRead : !notification.isRead);
    return matchesType && matchesReadStatus;
  });

  if (notifications.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Vous n&apos;avez pas encore de notifications.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <NotificationFilters />
      <ScrollArea className="h-[calc(100vh-12rem)]">
        {filteredNotifications.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No notifications match your filters.
            </AlertDescription>
          </Alert>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </ScrollArea>
    </div>
  );
}
