"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageHeader } from "./MessageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatMessage {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  isRecruiter: boolean;
}

interface MessageChatContentProps {
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

// Mock chat messages
const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    content:
      "Bonjour, Je suis très intéressé par le poste de Social Media Manager. J'ai une solide expérience dans le domaine et je souhaiterais discuter des opportunités...",
    sender: "Ayoub BOUKHANE",
    timestamp: "10:30",
    isRecruiter: false,
  },
  {
    id: 2,
    content:
      "Bonjour Ayoub, merci de votre intérêt ! J'ai bien reçu votre candidature. Votre profil est très intéressant. Pourrions-nous prévoir un entretien cette semaine ?",
    sender: "Recruteur",
    timestamp: "11:45",
    isRecruiter: true,
  },
  {
    id: 3,
    content:
      "Bien sûr, je suis disponible. Quels créneaux vous conviendraient le mieux ?",
    sender: "Ayoub BOUKHANE",
    timestamp: "12:15",
    isRecruiter: false,
  },
  {
    id: 4,
    content:
      "Je vous propose jeudi à 14h ou vendredi à 11h. Quelle option vous conviendrait le mieux ?",
    sender: "Recruteur",
    timestamp: "14:20",
    isRecruiter: true,
  },
];

export function MessageChatContent({ message }: MessageChatContentProps) {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newChatMessage: ChatMessage = {
      id: chatMessages.length + 1,
      content: newMessage,
      sender: "Recruteur",
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRecruiter: true,
    };

    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!message) {
    return (
      <Card className="h-[calc(100vh-180px)] overflow-hidden">
        <CardContent className="flex h-full items-center justify-center text-muted-foreground">
          Sélectionnez un message pour afficher son contenu
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[calc(100vh-180px)] overflow-hidden">
      <div className="h-full flex flex-col">
        <CardHeader className="p-3 space-y-3 shrink-0 border-b">
          <MessageHeader
            candidate={message.candidate}
            jobTitle={message.jobTitle}
            participants={message.participants}
          />
        </CardHeader>

        <CardContent className="flex-1 p-0 min-h-0 flex flex-col">
          {/* Messages Area */}
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isRecruiter ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 break-all overflow-hidden ${
                      msg.isRecruiter
                        ? "bg-primaryHex-500 text-white ml-auto"
                        : "bg-accent"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium truncate">
                        {msg.sender}
                      </span>
                      <span className="text-xs opacity-70 shrink-0">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-sm break-all whitespace-pre-wrap overflow-hidden">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="shrink-0 p-3 border-t bg-background">
            <div className="flex gap-2">
              <Input
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                maxLength={2000}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
