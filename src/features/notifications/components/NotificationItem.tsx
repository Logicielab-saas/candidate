/**
 * NotificationItem - Individual notification display component
 *
 * Renders a single notification with appropriate styling based on type and read status
 *
 * Props:
 * - notification: Notification - The notification data to display from API
 * - onMarkAsRead: (uuid: string) => void - Callback to mark notification as read
 */

"use client";

import { Bell, Calendar, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notification } from "@/core/interfaces";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { formatDate } from "@/core/utils/date";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (uuid: string) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const getIcon = () => {
    switch (notification.type) {
      case "job":
        return <Briefcase className="h-5 w-5" />;
      case "interview":
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <Card
      className={cn(
        "mb-4 transition-all hover:shadow-md",
        !notification.is_read && "border-l-4 border-l-primary bg-accent/10"
      )}
    >
      <CardHeader className="flex flex-row items-center gap-3 py-4 px-4">
        {notification.image ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={notification.image}
              alt={notification.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="text-primary">{getIcon()}</div>
        )}
        <div className="flex-1">
          <CardTitle className="text-base">{notification.title}</CardTitle>
          <CardDescription>
            {formatDate(notification.created_at, "d MMM yyyy HH:mm", locale)}
          </CardDescription>
        </div>
        {!notification.is_read && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification.uuid)}
            className="h-7 px-2 text-sm"
          >
            {tCommon("actions.markAsRead")}
          </Button>
        )}
      </CardHeader>
      <CardContent className="py-2 px-4">
        <p className="text-sm text-muted-foreground">{notification.message}</p>
      </CardContent>
    </Card>
  );
}
