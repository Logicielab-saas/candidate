"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageHeader } from "./MessageHeader";

interface MessageContentProps {
  message?: {
    id: number;
    jobTitle: string;
    jobType: string;
    date: string;
    candidate: {
      name: string;
      position: string;
      city: string;
      telephone?: string;
    };
    preview: string;
    isUnread: boolean;
    participants?: Array<{
      name: string;
      role: string;
    }>;
  };
}

export function MessageContent({ message }: MessageContentProps) {
  if (!message) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full items-center justify-center text-muted-foreground">
          Sélectionnez un message pour afficher son contenu
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="p-4 space-y-4">
        <MessageHeader
          candidate={message.candidate}
          jobTitle={message.jobTitle}
          participants={message.participants}
        />
        <Separator />
      </CardHeader>

      <CardContent className="p-4">
        {/* Message content will go here */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{message.preview}</p>
        </div>
      </CardContent>
    </Card>
  );
}
