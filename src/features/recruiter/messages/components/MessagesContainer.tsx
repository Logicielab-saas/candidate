"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowLeft } from "lucide-react";
import { MessagesList } from "./MessagesList";
import { MessageChatContent } from "./MessageChatContent";
import { useEffect, useState } from "react";
import { type Message, MOCK_MESSAGES } from "@/core/mockData/messages-data";
import { cn } from "@/lib/utils";
import { useQueryState, parseAsString } from "nuqs";

type TabValue = "all" | "unread";

export function MessagesContainer() {
  const [isMobileView, setIsMobileView] = useState(false);

  // URL state management with nuqs
  const [messageId, setMessageId] = useQueryState("message", parseAsString);
  const [currentTab, setCurrentTab] = useQueryState<TabValue>("tab", {
    defaultValue: "all",
    parse: (value: string | null) => (value === "unread" ? "unread" : "all"),
    serialize: (value: TabValue) => value,
  });
  const [searchQuery, setSearchQuery] = useQueryState("q", parseAsString);
  const [jobsFilter, setJobsFilter] = useQueryState<string[]>("jobs", {
    defaultValue: [],
    parse: (value: string | null) =>
      value ? value.split(",").filter(Boolean) : [],
    serialize: (value: string[]) => value.join(","),
  });

  const selectedMessage = messageId
    ? MOCK_MESSAGES.find((m) => m.id === Number(messageId))
    : undefined;

  // Effect to handle initial load and invalid message IDs
  useEffect(() => {
    if (messageId) {
      const message = MOCK_MESSAGES.find((m) => m.id === Number(messageId));
      if (!message) {
        // If message ID is invalid, clear it from URL
        setMessageId(null);
      }
    } else if (MOCK_MESSAGES.length > 0) {
      // If no message is selected, select the first one
      setMessageId(MOCK_MESSAGES[0].id.toString());
    }
  }, [messageId, setMessageId]);

  const handleMessageSelect = (message: Message) => {
    setMessageId(message.id.toString());
    setIsMobileView(true);
  };

  const handleMessageDelete = () => {
    // When a message is deleted, clear the message ID and return to list view in mobile
    setMessageId(null);
    setIsMobileView(false);
  };

  const handleBackToList = () => {
    setIsMobileView(false);
  };

  const handleTabChange = (tab: TabValue) => {
    setCurrentTab(tab);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query || null);
  };

  const handleJobsFilter = (jobs: string[]) => {
    setJobsFilter(jobs);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Publier annonce
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-6 relative overflow-hidden">
        {/* Messages List */}
        <div
          className={cn(
            "transition-[transform,opacity] duration-300 ease-in-out xl:transform-none xl:opacity-100 xl:relative w-full",
            isMobileView &&
              "xl:relative opacity-0 -translate-x-full absolute inset-0",
            !isMobileView && "opacity-100 translate-x-0 relative"
          )}
        >
          <MessagesList
            onMessageSelect={handleMessageSelect}
            onMessageDelete={handleMessageDelete}
            selectedMessageId={selectedMessage?.id}
            currentTab={currentTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery || ""}
            onSearch={handleSearch}
            selectedJobs={jobsFilter}
            onJobsChange={handleJobsFilter}
          />
        </div>

        {/* Message Content */}
        <div
          className={cn(
            "transition-[transform,opacity] duration-300 ease-in-out xl:transform-none xl:opacity-100 xl:relative w-full",
            !isMobileView && "opacity-0 translate-x-full absolute inset-0",
            isMobileView && "opacity-100 translate-x-0 relative"
          )}
        >
          <div className="xl:hidden mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToList}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la liste
            </Button>
          </div>
          <MessageChatContent message={selectedMessage} />
        </div>
      </div>
    </div>
  );
}
