"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { type Message } from "@/core/mockData/messages-data";

interface MessageItemProps {
  message: Message;
  onClick?: () => void;
  isSelected?: boolean;
}

export function MessageItem({
  message,
  onClick,
  isSelected,
}: MessageItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-lg p-1 transition-colors",
        isSelected ? "bg-accent border border-border" : "hover:bg-accent/50"
      )}
    >
      <div className="p-3 space-y-2">
        {/* Header: Job Title and Date */}
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm font-medium line-clamp-1",
              isSelected ? "text-accent-foreground" : "text-foreground"
            )}
          >
            {message.jobTitle}
          </p>
          <span
            className={cn(
              "text-xs",
              isSelected ? "text-accent-foreground/70" : "text-muted-foreground"
            )}
          >
            {message.date}
          </span>
        </div>

        {/* Candidate Info */}
        <div className="flex flex-col gap-1.5">
          {/* Name and Position */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-sm font-medium",
                isSelected ? "text-accent-foreground" : "text-foreground"
              )}
            >
              {message.candidate.name}
            </span>
            <span
              className={cn(
                "text-xs",
                isSelected
                  ? "text-accent-foreground/70"
                  : "text-muted-foreground"
              )}
            >
              {message.candidate.position}
            </span>
          </div>

          {/* Location */}
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              isSelected ? "text-accent-foreground/70" : "text-muted-foreground"
            )}
          >
            <MapPin className="h-3 w-3" />
            <span>{message.candidate.city}</span>
          </div>

          {/* Message Preview */}
          <p
            className={cn(
              "text-sm line-clamp-2 mt-1",
              isSelected ? "text-accent-foreground/70" : "text-muted-foreground"
            )}
          >
            {message.preview}
          </p>
        </div>

        {/* Unread Badge */}
        {message.isUnread && (
          <div className="pt-1">
            <Badge
              variant="outline"
              className={cn(
                "w-fit",
                isSelected
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                  : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              )}
            >
              Nouveau message
            </Badge>
          </div>
        )}
      </div>
    </button>
  );
}
