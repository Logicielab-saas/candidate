"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { MessagesList } from "./MessagesList";

export function MessagesContainer() {
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
        <MessagesList />

        {/* Right Side - Message Content */}
        <div className="hidden xl:block border border-border rounded-lg bg-background">
          {/* Message content will go here */}
        </div>
      </div>
    </div>
  );
}
