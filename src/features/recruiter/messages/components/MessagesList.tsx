"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Search, Loader2, X, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageItem } from "./MessageItem";
import { DeleteMessageDialog } from "./DeleteMessageDialog";
import {
  type Message,
  JOBS_OPTIONS,
  MOCK_MESSAGES,
} from "@/core/mockData/messages-data";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  currentTab: "all" | "unread";
  onTabChange: (tab: "all" | "unread") => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedJobs: string[];
  onJobsChange: (jobs: string[]) => void;
}

export function MessagesList({
  onMessageSelect,
  onMessageDelete,
  selectedMessageId,
  currentTab,
  onTabChange,
  searchQuery,
  onSearch,
  selectedJobs,
  onJobsChange,
}: MessagesListProps) {
  // Local states for immediate feedback
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localSelectedJobs, setLocalSelectedJobs] = useState(selectedJobs);
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Status>(STATUSES[0]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  // Sync local states with props when they change
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalSelectedJobs(selectedJobs);
  }, [selectedJobs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value); // Update local state immediately
    setIsSearching(true); // Show loading indicator
    onSearch(value); // Trigger debounced search
  };

  const handleJobsChange = (jobs: string[]) => {
    setLocalSelectedJobs(jobs); // Update local state immediately
    setIsFiltering(true); // Show loading indicator
    onJobsChange(jobs); // Update URL state
  };

  // Clear search
  const handleClearSearch = () => {
    setLocalSearchQuery("");
    onSearch("");
  };

  // Clear all filters
  const handleClearFilters = () => {
    setLocalSelectedJobs([]);
    onJobsChange([]);
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

  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isFiltering]);

  const filteredMessages = messages.filter((message) => {
    const matchesTab = currentTab === "all" || message.isUnread;
    const matchesJobs =
      selectedJobs.length === 0 || selectedJobs.includes(message.jobType);
    const matchesSearch = searchQuery
      ? message.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.candidate.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        message.preview.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTab && matchesJobs && matchesSearch;
  });

  const handleTabChange = (value: string) => {
    onTabChange(value as "all" | "unread");
  };

  // Get active filter labels
  const activeFilters = JOBS_OPTIONS.filter((option) =>
    localSelectedJobs.includes(option.value)
  );

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

        {/* Message Tabs */}
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="flex h-8 w-full items-center gap-6 bg-transparent p-0 border-b border-secondaryHex-200 dark:border-secondaryHex-800">
            <TabsTrigger
              value="all"
              className="relative h-full rounded-none border-b-2 border-transparent px-3 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
            >
              Tous les messages
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="relative h-full rounded-none border-b-2 border-transparent px-3 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
            >
              Non lus
              {MOCK_MESSAGES.filter((m) => m.isUnread).length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-primaryHex-100 dark:bg-primaryHex-900/30 text-primaryHex-700 dark:text-primaryHex-400 border-primaryHex-200 dark:border-primaryHex-800"
                >
                  {MOCK_MESSAGES.filter((m) => m.isUnread).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filter Section */}
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

          <div className="relative">
            <MultiSelect
              options={JOBS_OPTIONS}
              value={localSelectedJobs}
              onValueChange={handleJobsChange}
              placeholder="Filtrer par emploi"
              className={cn(
                "h-8 w-full",
                isFiltering &&
                  "border-primaryHex-500 ring-2 ring-primaryHex-500/20"
              )}
              contentClassName="min-w-[315px]"
            />
            {isFiltering && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-primaryHex-500" />
              </div>
            )}
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Filter className="h-3 w-3" />
                <span>Filtres actifs:</span>
              </div>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.value}
                  variant="secondary"
                  className="bg-primaryHex-50 text-primaryHex-700 border-primaryHex-200"
                >
                  {filter.label}
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-2 text-xs text-muted-foreground hover:text-primaryHex-500"
                onClick={handleClearFilters}
              >
                Effacer tout
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-380px)]">
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
