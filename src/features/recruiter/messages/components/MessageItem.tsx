"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface Message {
  id: number;
  jobTitle: string;
  jobType: string;
  date: string;
  candidate: {
    name: string;
    position: string;
    city: string;
  };
  preview: string;
  isUnread: boolean;
}

interface MessageItemProps {
  message: Message;
  onClick?: () => void;
}

export function MessageItem({ message, onClick }: MessageItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-3 rounded-lg transition-colors text-left",
        "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        message.isUnread && "bg-accent/30"
      )}
    >
      <div className="space-y-2">
        {/* Header: Job Title and Date */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium line-clamp-1 text-foreground">
            {message.jobTitle}
          </p>
          <span className="text-xs text-muted-foreground shrink-0">
            {message.date}
          </span>
        </div>

        {/* Candidate Info */}
        <div className="flex flex-col gap-1.5">
          {/* Name and Position */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {message.candidate.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {message.candidate.position}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{message.candidate.city}</span>
          </div>

          {/* Message Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {message.preview}
          </p>
        </div>

        {/* Unread Badge */}
        {message.isUnread && (
          <div className="pt-1">
            <Badge
              variant="outline"
              className="w-fit bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
            >
              Nouveau message
            </Badge>
          </div>
        )}
      </div>
    </button>
  );
}
