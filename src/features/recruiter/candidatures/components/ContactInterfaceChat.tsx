"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Paperclip, Send, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Message {
  id: string;
  content: string;
  sender: "user" | "candidate";
  timestamp: Date;
}

// Quick reply suggestions
const QUICK_REPLIES = [
  {
    id: "1",
    content:
      "Bonjour, je suis intéressé(e) par votre profil. Êtes-vous disponible pour échanger ?",
  },
  {
    id: "2",
    content:
      "Bonjour, votre candidature a retenu notre attention. Pourrions-nous planifier un entretien ?",
  },
  {
    id: "3",
    content:
      "Bonjour, merci pour votre candidature. Quelles sont vos disponibilités cette semaine ?",
  },
] as const;

// Mock initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Bonjour, je suis très intéressé par votre profil pour le poste de développeur frontend.",
    sender: "user",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "2",
    content:
      "Bonjour ! Merci de votre intérêt. Je suis disponible pour échanger sur cette opportunité.",
    sender: "candidate",
    timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
  },
  {
    id: "3",
    content:
      "Parfait ! Seriez-vous disponible pour un entretien cette semaine ?",
    sender: "user",
    timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
  },
  {
    id: "4",
    content:
      "Oui, je suis disponible jeudi après-midi ou vendredi matin si cela vous convient.",
    sender: "candidate",
    timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
  },
];

interface ContactInterfaceChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  candidat: {
    nom: string;
  };
}

export function ContactInterfaceChat({
  isOpen,
  onOpenChange,
  candidat,
}: ContactInterfaceChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isMinimized, setIsMinimized] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const [showSuggestions, setShowSuggestions] = useState(messages.length === 0);

  useEffect(() => {
    // Find the portal container
    const container = document.getElementById("floating-elements");
    setPortalContainer(container);
  }, []);

  const handleSendMessage = (content: string = message) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen || !portalContainer) return null;

  const chatContent = (
    <div
      className={`fixed bottom-1 right-4 w-[340px] bg-background rounded-lg shadow-lg z-[100] transition-all duration-200 ease-in-out overflow-hidden ${
        isMinimized ? "h-[48px]" : "h-[480px]"
      }`}
    >
      <div className="flex flex-col h-full border rounded-lg">
        {/* Header */}
        <div className="p-3 border-b flex items-center justify-between bg-primary text-primary-foreground">
          <h2 className="font-semibold text-sm">{candidat.nom}</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-primary-foreground/10"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-primary-foreground/10"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {showSuggestions && messages.length === 0 && (
                  <div className="flex flex-col gap-2 mb-4">
                    <p className="text-sm text-muted-foreground">
                      Engager la conversation :
                    </p>
                    <div className="flex flex-col gap-2">
                      {QUICK_REPLIES.map((reply) => (
                        <Button
                          key={reply.id}
                          variant="outline"
                          className="justify-start h-auto whitespace-normal text-left py-2 text-sm font-normal"
                          onClick={() => handleSendMessage(reply.content)}
                        >
                          {reply.content}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-[10px] opacity-70">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-3 bg-background rounded-b-lg">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-[44px] w-[44px] shrink-0 hover:bg-muted"
                  title="Joindre un fichier"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Écrivez votre message..."
                  className="min-h-[44px] max-h-[120px] resize-none text-sm"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="icon"
                  className="h-[44px] w-[44px] shrink-0"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(chatContent, portalContainer);
}
