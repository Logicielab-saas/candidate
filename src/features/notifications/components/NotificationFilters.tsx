/**
 * NotificationFilters - Filter controls for notifications
 *
 * Provides UI for filtering notifications by type and read status
 * Uses URL state management with nuqs for persistence
 */

"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NOTIFICATION_TYPES, type NotificationType } from "../types";

type FilterType = NotificationType | "all";
type ReadStatusType = "all" | "read" | "unread";

export function NotificationFilters() {
  const [type, setType] = useQueryState<FilterType>("type", {
    parse: (value: string): FilterType =>
      Object.values(NOTIFICATION_TYPES).includes(value as NotificationType) ||
      value === "all"
        ? (value as FilterType)
        : "all",
    defaultValue: "all",
  });

  const [readStatus, setReadStatus] = useQueryState<ReadStatusType>("status", {
    parse: (value: string): ReadStatusType =>
      ["all", "read", "unread"].includes(value)
        ? (value as ReadStatusType)
        : "all",
    defaultValue: "all",
  });

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <Select
          value={type}
          onValueChange={(value: FilterType) => setType(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value={NOTIFICATION_TYPES.JOB}>Jobs</SelectItem>
            <SelectItem value={NOTIFICATION_TYPES.INTERVIEW}>
              Interviews
            </SelectItem>
            <SelectItem value={NOTIFICATION_TYPES.APPLICATION}>
              Applications
            </SelectItem>
            <SelectItem value={NOTIFICATION_TYPES.SYSTEM}>System</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={readStatus}
          onValueChange={(value: ReadStatusType) => setReadStatus(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        onClick={() => {
          setType("all");
          setReadStatus("all");
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
}
