/**
 * NotificationItem - Individual notification display component
 *
 * Renders a single notification with appropriate styling based on type and read status
 *
 * Props:
 * - notification: Notification - The notification data to display
 * - onMarkAsRead: (id: string) => void - Callback to mark notification as read
 */

"use client";

import { Bell, Calendar, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Notification } from "../types";
import { NOTIFICATION_TYPES } from "../types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.JOB:
        return <Briefcase className="h-5 w-5" />;
      case NOTIFICATION_TYPES.INTERVIEW:
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <Card
      className={cn(
        "mb-4 transition-all hover:shadow-md",
        !notification.isRead && "border-l-4 border-l-primary bg-accent/10"
      )}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="text-primary">{getIcon()}</div>
        <div className="flex-1">
          <CardTitle className="text-base">{notification.title}</CardTitle>
          <CardDescription>
            {format(new Date(notification.createdAt), "d MMM yyyy HH:mm")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
      </CardContent>
      {!notification.isRead && (
        <CardFooter>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
          >
            Mark as read
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
