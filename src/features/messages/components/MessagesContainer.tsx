/**
 * MessagesContainer - Main container for the messages feature
 *
 * Manages the state and layout for the messages list and chat content,
 * including responsive behavior for mobile views.
 *
 * URL state for the selected message is managed using nuqs with a default value,
 * eliminating the need for useEffect side-effects.
 */

"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MessagesList } from "./MessagesList";
import { MessageChatContent } from "./MessageChatContent";
import { useState } from "react";
import { type Message, MOCK_MESSAGES } from "@/core/mockData/messages-data";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useTranslations } from "next-intl";

/**
 * MessagesContainer - Manages the messages list and chat content display.
 *
 * Uses nuqs to manage the "message" URL state without defaulting to the first message.
 */
export function MessagesContainer() {
  const tCommon = useTranslations("common");
  const [isMobileView, setIsMobileView] = useState(false);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  // Manage the "message" URL parameter via nuqs without a default value.
  const [messageId, setMessageId] = useQueryState("message", {
    parse: (value) => value || null,
  });

  // Compute the selected message only if messageId exists.
  const selectedMessage = messageId
    ? messages.find((m) => m.id.toString() === messageId)
    : undefined;

  const handleMessageSelect = (message: Message) => {
    setMessageId(message.id.toString());
    setIsMobileView(true);
  };

  const handleMessageDelete = (messageToDelete: Message) => {
    // Remove the message from the messages array
    setMessages((prev) => prev.filter((msg) => msg.id !== messageToDelete.id));

    // If the deleted message was selected, clear the message ID and return to list view in mobile
    if (selectedMessage?.id === messageToDelete.id) {
      setMessageId(null);
      setIsMobileView(false);
    }
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

  const handleReport = (message: Message, reason: string, _details: string) => {
    if (reason === "restore") {
      // Restore message from spam
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "inbox" } : msg
        )
      );
      // When a message is restored, keep the current view
      return;
    }
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === message.id ? { ...msg, status: "spam" } : msg
      )
    );
    // When a message is marked as spam, clear the message ID and return to list view in mobile
    setMessageId(null);
    setIsMobileView(false);
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
              {tCommon("actions.backToList")}
            </Button>
          </div>
          <MessageChatContent
            message={selectedMessage}
            onArchive={
              selectedMessage ? () => handleArchive(selectedMessage) : undefined
            }
            onReport={
              selectedMessage
                ? (reason, details) =>
                    handleReport(selectedMessage, reason, details)
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
