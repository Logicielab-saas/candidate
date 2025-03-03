/**
 * MessageItem - Displays a single message item in the messages list
 *
 * Shows company avatar, recruiter name with unread count, date of last message, and message preview
 */

"use client";

import { cn } from "@/lib/utils";
import { Building2, Trash2 } from "lucide-react";
import { type Message } from "@/core/mockData/messages-data";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface MessageItemProps {
  message: Message;
  onClick?: () => void;
  onDelete?: () => void;
  isSelected?: boolean;
}

export function MessageItem({
  message,
  onClick,
  onDelete,
  isSelected,
}: MessageItemProps) {
  const [imageError, setImageError] = useState(false);
  const recruiter = message.participants.find((p) => p.role === "Recruteur");

  return (
    <div
      onClick={onClick}
      className={cn(
        "group w-full rounded-lg transition-colors cursor-pointer relative",
        isSelected ? "bg-accent" : "hover:bg-accent/50"
      )}
    >
      <div className="p-3 flex items-start gap-3">
        {/* Company Avatar */}
        <div className="relative h-10 w-10 shrink-0">
          {message.company.logo && !imageError ? (
            <Image
              src={message.company.logo}
              alt={message.company.name}
              fill
              className="object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Company name and date */}
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "text-sm font-medium truncate",
                isSelected ? "text-accent-foreground" : "text-foreground"
              )}
            >
              {message.company.name}
            </p>
            <span
              className={cn(
                "text-xs shrink-0",
                isSelected
                  ? "text-accent-foreground/70"
                  : "text-muted-foreground"
              )}
            >
              {message.date}
            </span>
          </div>

          {/* Recruiter name and unread count */}
          <div className="flex items-center justify-between gap-2">
            {recruiter && (
              <p
                className={cn(
                  "text-xs truncate",
                  isSelected
                    ? "text-accent-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {recruiter.name}
              </p>
            )}
            {message.isUnread && (
              <Badge
                variant="secondary"
                className={cn(
                  "h-5 min-w-5 px-1.5 flex items-center justify-center rounded-full text-xs font-medium text-red-500 bg-red-600",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "bg-red-600/20 hover:bg-red-600/30"
                )}
              >
                1
              </Badge>
            )}
          </div>

          {/* Message preview */}
          <p
            className={cn(
              "text-sm line-clamp-2 text-left",
              isSelected ? "text-accent-foreground/70" : "text-muted-foreground"
            )}
          >
            {message.preview}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className={cn(
              "text-destructive hover:text-destructive/90 text-xs font-medium transition-colors flex items-center gap-1",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            <Trash2 className="h-4 w-4" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
