/**
 * MessagesContainer - Main container for the messages feature
 *
 * Manages the state and layout for the messages list and chat content,
 * including responsive behavior for mobile views.
 */

"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MessagesList } from "./MessagesList";
import { MessageChatContent } from "./MessageChatContent";
import { useEffect, useState } from "react";
import { type Message, MOCK_MESSAGES } from "@/core/mockData/messages-data";
import { cn } from "@/lib/utils";
import { useQueryState, parseAsString } from "nuqs";

export function MessagesContainer() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  // URL state management with nuqs
  const [messageId, setMessageId] = useQueryState("message", parseAsString);
  const [searchQuery, setSearchQuery] = useQueryState("q", parseAsString);

  const selectedMessage = messageId
    ? messages.find((m) => m.id === Number(messageId))
    : undefined;

  // Effect to handle initial load and invalid message IDs
  useEffect(() => {
    if (messageId) {
      const message = messages.find((m) => m.id === Number(messageId));
      if (!message) {
        // If message ID is invalid, clear it from URL
        setMessageId(null);
      }
    } else if (messages.length > 0) {
      // If no message is selected, select the first one
      setMessageId(messages[0].id.toString());
    }
  }, [messageId, setMessageId, messages]);

  const handleMessageSelect = (message: Message) => {
    setMessageId(message.id.toString());
    setIsMobileView(true);
  };

  const handleMessageDelete = () => {
    // When a message is deleted, clear the message ID and return to list view in mobile
    setMessageId(null);
    setIsMobileView(false);
  };

  const handleArchive = (message: Message) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === message.id
          ? { ...msg, status: msg.status === "archived" ? "inbox" : "archived" }
          : msg
      )
    );
  };

  const handleBackToList = () => {
    setIsMobileView(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query || null);
  };

  return (
    <div className="space-y-6">
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
            messages={messages}
            onMessageSelect={handleMessageSelect}
            onMessageDelete={handleMessageDelete}
            selectedMessageId={selectedMessage?.id}
            searchQuery={searchQuery || ""}
            onSearch={handleSearch}
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
          <MessageChatContent
            message={selectedMessage}
            onArchive={
              selectedMessage ? () => handleArchive(selectedMessage) : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
