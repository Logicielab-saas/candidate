/**
 * MessagesList - Displays a list of messages with search functionality
 *
 * A simplified message list component that shows messages
 * with search functionality.
 */

"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Loader2, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteMessageDialog } from "./DeleteMessageDialog";
import { MessageItem } from "./MessageItem";
import { type Message, MOCK_MESSAGES } from "@/core/mockData/messages-data";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Status {
  id: string;
  label: string;
  color: string;
  className: string;
}

const STATUSES: Status[] = [
  {
    id: "online",
    label: "En ligne",
    color: "bg-green-500",
    className: "text-green-600 dark:text-green-400",
  },
  {
    id: "away",
    label: "Absent",
    color: "bg-orange-500",
    className: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "busy",
    label: "Ne pas déranger",
    color: "bg-red-500",
    className: "text-red-600 dark:text-red-400",
  },
  {
    id: "offline",
    label: "Hors ligne",
    color: "bg-gray-500",
    className: "text-gray-600 dark:text-gray-400",
  },
];

interface MessagesListProps {
  onMessageSelect: (message: Message) => void;
  onMessageDelete: () => void;
  selectedMessageId?: number;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export function MessagesList({
  onMessageSelect,
  onMessageDelete,
  selectedMessageId,
  searchQuery,
  onSearch,
}: MessagesListProps) {
  // Local states for immediate feedback
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [currentStatus, setCurrentStatus] = useState<Status>(STATUSES[0]);

  // Sync local states with props when they change
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value); // Update local state immediately
    setIsSearching(true); // Show loading indicator
    onSearch(value); // Trigger debounced search
  };

  // Clear search
  const handleClearSearch = () => {
    setLocalSearchQuery("");
    onSearch("");
  };

  // Effect to handle loading states
  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isSearching]);

  const filteredMessages = messages.filter((message) => {
    const searchLower = searchQuery.toLowerCase();
    return searchQuery
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
    if (e) {
      e.stopPropagation(); // Prevent message selection
    }
    setMessageToDelete(message);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== messageToDelete.id)
      );
      if (selectedMessageId === messageToDelete.id) {
        const nextMessage = messages.find(
          (msg) => msg.id !== messageToDelete.id
        );
        if (nextMessage) {
          onMessageSelect(nextMessage);
        }
      }
      onMessageDelete();
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
                <div className="relative flex h-2.5 w-2.5 items-center justify-center">
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
                  {currentStatus.label}
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
                  <span className={status.className}>{status.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {filteredMessages.length} messages
          </Badge>
        </div>

        {/* Search Section */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un message..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              className="h-8 pl-8 pr-16"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {isSearching && (
                <Loader2 className="h-4 w-4 animate-spin text-primaryHex-500" />
              )}
              {localSearchQuery && !isSearching && (
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
        messageToDelete={messageToDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
}
