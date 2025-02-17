"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { MessagesList } from "./MessagesList";
import { MessageChatContent } from "./MessageChatContent";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Message, MOCK_MESSAGES } from "@/core/mockData/messages-data";

export function MessagesContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get URL parameters
  const messageId = searchParams.get("message");
  const selectedMessage = messageId
    ? MOCK_MESSAGES.find((m) => m.id === Number(messageId))
    : undefined;

  // Effect to handle initial load and invalid message IDs
  useEffect(() => {
    if (messageId) {
      const message = MOCK_MESSAGES.find((m) => m.id === Number(messageId));
      if (!message) {
        // If message ID is invalid, clear it from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete("message");
        router.replace(`/recruiter/messages?${params.toString()}`);
      }
    } else if (MOCK_MESSAGES.length > 0) {
      // If no message is selected, select the first one
      const params = new URLSearchParams(searchParams.toString());
      params.set("message", MOCK_MESSAGES[0].id.toString());
      router.replace(`/recruiter/messages?${params.toString()}`);
    }
  }, [messageId, router, searchParams]);

  const handleMessageSelect = (message: Message) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("message", message.id.toString());
    router.push(`/recruiter/messages?${params.toString()}`);
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

      <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-6">
        {/* Left Side - Messages List */}
        <MessagesList
          onMessageSelect={handleMessageSelect}
          selectedMessageId={selectedMessage?.id}
        />

        {/* Right Side - Message Content */}
        <div className="hidden xl:block">
          <MessageChatContent message={selectedMessage} />
        </div>
      </div>
    </div>
  );
}
