"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { MessagesList } from "./MessagesList";
import { MessageContent } from "./MessageContent";
import { useState } from "react";

// Types
interface Message {
  id: number;
  jobTitle: string;
  jobType: string;
  date: string;
  candidate: {
    name: string;
    position: string;
    city: string;
  };
  preview: string;
  isUnread: boolean;
  participantsCount?: number;
}

export function MessagesContainer() {
  const [selectedMessage, setSelectedMessage] = useState<Message | undefined>();

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
        <MessagesList onMessageSelect={setSelectedMessage} />

        {/* Right Side - Message Content */}
        <div className="hidden xl:block">
          <MessageContent message={selectedMessage} />
        </div>
      </div>
    </div>
  );
}
