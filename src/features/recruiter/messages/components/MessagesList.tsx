"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageItem } from "./MessageItem";
import {
  type Message,
  JOBS_OPTIONS,
  MOCK_MESSAGES,
} from "@/core/mockData/messages-data";

interface MessagesListProps {
  onMessageSelect: (message: Message) => void;
  selectedMessageId?: number;
  currentTab: "all" | "unread";
  onTabChange: (tab: "all" | "unread") => void;
}

export function MessagesList({
  onMessageSelect,
  selectedMessageId,
  currentTab,
  onTabChange,
}: MessagesListProps) {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = MOCK_MESSAGES.filter((message) => {
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

  return (
    <Card className="border-border h-[calc(100vh-180px)]">
      <CardHeader className="p-3 space-y-3 border-b">
        {/* Status and Count */}
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-help">
                  <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    En ligne
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Statut de connexion</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8"
            />
          </div>

          <MultiSelect
            options={JOBS_OPTIONS}
            value={selectedJobs}
            onValueChange={setSelectedJobs}
            placeholder="Filtrer par emploi"
            className="h-8 w-full"
            contentClassName="min-w-[315px]"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-380px)]">
          <div className="p-2">
            <div className="space-y-1">
              {filteredMessages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isSelected={message.id === selectedMessageId}
                  onClick={() => onMessageSelect(message)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
