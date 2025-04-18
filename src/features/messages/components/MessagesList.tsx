/**
 * MessagesList - Displays a list of messages with search functionality
 *
 * A simplified message list component that shows messages
 * with search functionality and status filtering.
 */

"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteMessageDialog } from "./DeleteMessageDialog";
import { MessageItem } from "./MessageItem";
import { type Message } from "@/core/mockData/messages-data";
import { ChangeEvent, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { useQueryState, parseAsString } from "nuqs";
import LoaderOne from "@/components/ui/loader-one";
import { useTranslations } from "next-intl";

interface Status {
  id: string;
  label: string;
  color: string;
  className: string;
}

const STATUSES: Status[] = [
  {
    id: "online",
    label: "online",
    color: "bg-green-500",
    className: "text-green-600 dark:text-green-400",
  },
  {
    id: "away",
    label: "away",
    color: "bg-orange-500",
    className: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "busy",
    label: "busy",
    color: "bg-red-500",
    className: "text-red-600 dark:text-red-400",
  },
  {
    id: "offline",
    label: "offline",
    color: "bg-gray-500",
    className: "text-gray-600 dark:text-gray-400",
  },
];

type MessageFilter = "inbox" | "archive" | "spam";

const MESSAGE_FILTERS = [
  { value: "inbox", label: "status.inbox" },
  { value: "archive", label: "status.archive" },
  { value: "spam", label: "status.spam" },
] as const;

interface MessagesListProps {
  messages: Message[];
  onMessageSelect: (message: Message) => void;
  onMessageDelete: (message: Message) => void;
  selectedMessageId?: number;
}

export function MessagesList({
  messages,
  onMessageSelect,
  onMessageDelete,
  selectedMessageId,
}: MessagesListProps) {
  const tCommon = useTranslations("common");
  const t = useTranslations("messages");

  // Manage the "q" URL parameter via nuqs.
  const [query, setQuery] = useQueryState("q", parseAsString);
  // Local state for immediate feedback in the input.
  const [localQuery, setLocalQuery] = useState(query || "");
  const [isSearching, setIsSearching] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [currentStatus, setCurrentStatus] = useState<Status>(STATUSES[0]);
  const [currentFilter, setCurrentFilter] = useState<MessageFilter>("inbox");

  const debouncedSetQuery = useDebouncedCallback((q: string) => {
    // Remove the query param by setting it to null if q is empty or whitespace.
    setQuery(q.trim() ? q : null);
    setIsSearching(false);
  }, 500);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    setIsSearching(true);
    debouncedSetQuery(value);
  };

  // Clear search
  const handleClearSearch = () => {
    setLocalQuery("");
    setQuery(null);
  };

  const filteredMessages = messages.filter((message) => {
    // First apply status filter
    if (currentFilter === "archive" && message.status !== "archived")
      return false;
    if (currentFilter === "spam" && message.status !== "spam") return false;
    if (currentFilter === "inbox" && message.status !== "inbox") return false;

    // Then apply search filter
    const searchLower = localQuery.toLowerCase();
    return localQuery
      ? message.job.name.toLowerCase().includes(searchLower) ||
          message.company.name.toLowerCase().includes(searchLower) ||
          message.participants.some((p) =>
            p.name.toLowerCase().includes(searchLower)
          ) ||
          message.preview.toLowerCase().includes(searchLower)
      : true;
  });

  const handleDeleteClick = (
    message: Message,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.stopPropagation();
    setMessageToDelete(message);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      onMessageDelete(messageToDelete);
    }
    setDeleteDialogOpen(false);
    setMessageToDelete(null);
  };

  return (
    <Card className="border-border h-[calc(100vh-180px)]">
      <CardHeader className="p-3 space-y-3 border-b">
        {/* Status and Count */}
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 gap-2 -ml-2 hover:bg-accent"
              >
                <div
                  className={cn(
                    "relative flex h-2.5 w-2.5 items-center justify-center"
                  )}
                >
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                      currentStatus.color
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex h-2 w-2 rounded-full",
                      currentStatus.color
                    )}
                  />
                </div>
                <span className={cn("text-sm", currentStatus.className)}>
                  {tCommon(`status.${currentStatus.label}`)}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {STATUSES.map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer",
                    currentStatus.id === status.id && "bg-accent"
                  )}
                  onClick={() => setCurrentStatus(status)}
                >
                  <div className={cn("h-2 w-2 rounded-full", status.color)} />
                  <span className={status.className}>
                    {tCommon(`status.${status.label}`)}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {tCommon("counts.messages", { count: filteredMessages.length })}
          </Badge>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("search.placeholder")}
              value={localQuery}
              onChange={handleSearchChange}
              className="h-8 pl-8 pr-16"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {isSearching && <LoaderOne />}
              {localQuery && !isSearching && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:text-primaryHex-500"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Filter Select */}
          <Select
            value={currentFilter}
            onValueChange={(value) => setCurrentFilter(value as MessageFilter)}
          >
            <SelectTrigger className="w-full h-8">
              <SelectValue placeholder={t("filters.title")} />
            </SelectTrigger>
            <SelectContent>
              {MESSAGE_FILTERS.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {tCommon(`filters.status.${filter.value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-290px)]">
          <div className="p-2">
            <div className="space-y-1">
              {filteredMessages.map((message) => (
                <div key={message.id} className="group relative">
                  <MessageItem
                    message={message}
                    isSelected={message.id === selectedMessageId}
                    onClick={() => onMessageSelect(message)}
                    onDelete={() => handleDeleteClick(message)}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>

      <DeleteMessageDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        message={messageToDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
}
