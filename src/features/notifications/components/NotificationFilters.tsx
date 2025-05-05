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
import { useTranslations } from "next-intl";

type FilterType = NotificationType | "all";
type ReadStatusType = "all" | "read" | "unread";

export function NotificationFilters() {
  const tCommon = useTranslations("common");
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
            <SelectValue placeholder={tCommon("filters.filterBy.type")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tCommon("filters.types.all")}</SelectItem>
            <SelectItem value={NOTIFICATION_TYPES.JOB}>
              {tCommon("filters.types.job")}
            </SelectItem>
            <SelectItem value={NOTIFICATION_TYPES.INTERVIEW}>
              {tCommon("filters.types.interview")}
            </SelectItem>
            <SelectItem value={NOTIFICATION_TYPES.APPLICATION}>
              {tCommon("filters.types.application")}
            </SelectItem>
            <SelectItem value={NOTIFICATION_TYPES.SYSTEM}>
              {tCommon("filters.types.system")}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={readStatus}
          onValueChange={(value: ReadStatusType) => setReadStatus(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={tCommon("filters.filterBy.status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tCommon("filters.status.all")}</SelectItem>
            <SelectItem value="read">
              {tCommon("filters.status.read")}
            </SelectItem>
            <SelectItem value="unread">
              {tCommon("filters.status.unread")}
            </SelectItem>
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
        {tCommon("actions.clearFilters")}
      </Button>
    </div>
  );
}
