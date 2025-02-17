"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { MessagesList } from "./MessagesList";
import { MessageChatContent } from "./MessageChatContent";
import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Message, MOCK_MESSAGES } from "@/core/mockData/messages-data";
import { useDebouncedCallback } from "use-debounce";

export function MessagesContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

      <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-6">
        {/* Left Side - Messages List */}
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

        {/* Right Side - Message Content */}
        <div className="hidden xl:block">
          <MessageChatContent message={selectedMessage} />
        </div>
      </div>
    </div>
  );
}
