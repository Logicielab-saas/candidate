"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Download, Minus, Paperclip, Send, X, ZoomIn } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { UploadDialog } from "@/components/shared/UploadDialog";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Attachment {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "candidate";
  timestamp: Date;
  attachments?: Attachment[];
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

// Mock initial messages with attachments
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
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{
    images: Array<{ src: string; alt: string }>;
    initialIndex: number;
  } | null>(null);

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

  const handleFileUpload = (files: File[]) => {
    // Create attachments from files
    const attachments: Attachment[] = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    // Create new message with attachments
    const newMessage: Message = {
      id: Date.now().toString(),
      content: "Fichiers partagés:",
      sender: "user",
      timestamp: new Date(),
      attachments,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Helper function to get all images from messages
  const getAllImagesFromMessages = () => {
    return messages
      .flatMap((msg) =>
        (msg.attachments || []).filter((att) => att.type.startsWith("image/"))
      )
      .map((att) => ({
        src: att.url,
        alt: att.name,
      }));
  };

  // Helper function to render file preview
  const renderFilePreview = (attachment: Attachment) => {
    const isImage = attachment.type.startsWith("image/");

    return (
      <div className="mt-2 rounded-md bg-background/50 p-2 border">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {attachment.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(attachment.size)}
                </p>
              </div>
            </div>
            <a
              href={attachment.url}
              download={attachment.name}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full shrink-0"
              >
                <Download className="h-4 w-4" />
              </Button>
            </a>
          </div>

          {isImage && (
            <div
              className="relative w-full aspect-video rounded-md overflow-hidden border cursor-pointer group"
              onClick={() => {
                const allImages = getAllImagesFromMessages();
                const currentIndex = allImages.findIndex(
                  (img) => img.src === attachment.url
                );
                setLightboxImages({
                  images: allImages,
                  initialIndex: Math.max(0, currentIndex),
                });
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <Image
                src={attachment.url}
                alt={attachment.name}
                fill
                className="object-contain bg-background/50"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen || !portalContainer) return null;

  const chatContent = (
    <div
      className={`fixed bottom-1 right-4 w-[340px] bg-background rounded-lg shadow-lg z-[49] transition-all duration-200 ease-in-out overflow-hidden ${
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
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3 py-2",
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      {msg.attachments?.map((attachment, index) => (
                        <div key={index}>{renderFilePreview(attachment)}</div>
                      ))}
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
                  onClick={() => setIsUploadOpen(true)}
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

      {/* Upload Dialog */}
      <UploadDialog
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUpload={handleFileUpload}
        maxFiles={5}
        acceptedTypes=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
      />

      {/* Image Lightbox */}
      {lightboxImages && (
        <ImageLightbox
          isOpen={!!lightboxImages}
          onOpenChange={(open) => !open && setLightboxImages(null)}
          images={lightboxImages.images}
          initialIndex={lightboxImages.initialIndex}
        />
      )}
    </div>
  );

  return createPortal(chatContent, portalContainer);
}
