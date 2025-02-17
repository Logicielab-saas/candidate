"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowLeft } from "lucide-react";
import { MessagesList } from "./MessagesList";
import { MessageChatContent } from "./MessageChatContent";
import { useEffect, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Message, MOCK_MESSAGES } from "@/core/mockData/messages-data";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

export function MessagesContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileView, setIsMobileView] = useState(false);

  // Get URL parameters
  const messageId = searchParams.get("message");
  const currentTab = (searchParams.get("tab") as "all" | "unread") || "all";
  const searchQuery = searchParams.get("q") || "";
  const jobsFilter = searchParams.get("jobs")?.split(",") || [];

  const selectedMessage = messageId
    ? MOCK_MESSAGES.find((m) => m.id === Number(messageId))
    : undefined;

  // Effect to handle initial load and invalid message IDs
  useEffect(() => {
    if (messageId) {
      const message = MOCK_MESSAGES.find((m) => m.id === Number(messageId));
      if (!message) {
        // If message ID is invalid, clear it from URL
        updateSearchParams({ message: null });
      }
    } else if (MOCK_MESSAGES.length > 0) {
      // If no message is selected, select the first one
      updateSearchParams({
        message: MOCK_MESSAGES[0].id.toString(),
        tab: currentTab,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageId, currentTab]);

  const handleMessageSelect = (message: Message) => {
    updateSearchParams({ message: message.id.toString() });
    setIsMobileView(true);
  };

  const handleBackToList = () => {
    setIsMobileView(false);
  };

  const handleTabChange = (tab: "all" | "unread") => {
    updateSearchParams({ tab });
  };

  // Debounced search handler
  const debouncedSearch = useDebouncedCallback((query: string) => {
    updateSearchParams({ q: query || null });
  }, 300);

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  const handleJobsFilter = (jobs: string[]) => {
    updateSearchParams({
      jobs: jobs.length > 0 ? jobs.join(",") : null,
    });
  };

  // Helper function to update search params
  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update or remove each parameter
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Use replace for initial load/cleanup, push for user actions
      const method = updates.message === null ? "replace" : "push";
      router[method](`/recruiter/messages?${params.toString()}`);
    },
    [router, searchParams]
  );

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
            selectedMessageId={selectedMessage?.id}
            currentTab={currentTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
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
