"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageHeader } from "./MessageHeader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, X, File, Download, ZoomIn } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UploadDialog } from "@/components/shared/UploadDialog";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import Image from "next/image";

interface ChatMessage {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  isRecruiter: boolean;
  attachments?: Array<{
    name: string;
    size: number;
    type: string;
    url?: string;
    progress?: number;
  }>;
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
  const [isTyping, setIsTyping] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{
    images: Array<{ src: string; alt: string }>;
    initialIndex: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 120) + "px"; // Max height of 120px
    }
  }, [newMessage]);

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
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewMessage(value);
    setIsTyping(value.length > 0);
  };

  const handleClearText = () => {
    setNewMessage("");
    setIsTyping(false);
    textareaRef.current?.focus();
  };

  const handleFileUpload = (files: File[]) => {
    // Simulate file upload with progress
    const newChatMessage: ChatMessage = {
      id: chatMessages.length + 1,
      content: "Fichiers partagés:",
      sender: "Recruteur",
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRecruiter: true,
      attachments: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
      })),
    };

    setChatMessages((prev) => [...prev, newChatMessage]);

    // Simulate upload progress for each file
    const messageIndex = chatMessages.length;
    files.forEach((file, fileIndex) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setChatMessages((prev) => {
            const updated = [...prev];
            if (updated[messageIndex]?.attachments?.[fileIndex]) {
              updated[messageIndex].attachments![fileIndex].progress = progress;
              if (progress === 100) {
                // Simulate a URL when upload is complete
                updated[messageIndex].attachments![fileIndex].url =
                  URL.createObjectURL(file);
              }
            }
            return updated;
          });
        } else {
          clearInterval(interval);
        }
      }, 300);
    });
  };

  // Helper function to get all images from chat messages
  const getAllImages = () => {
    return chatMessages.flatMap((msg) =>
      (msg.attachments || [])
        .filter(
          (attachment): attachment is typeof attachment & { url: string } =>
            attachment.type.startsWith("image/") &&
            attachment.progress === 100 &&
            !!attachment.url
        )
        .map((attachment) => ({
          src: attachment.url,
          alt: attachment.name,
        }))
    );
  };

  // Helper function to render file preview
  const renderFilePreview = (
    attachment: NonNullable<ChatMessage["attachments"]>[number]
  ) => {
    const isImage = attachment.type.startsWith("image/");
    const isComplete = attachment.progress === 100;

    return (
      <div className="mt-2 rounded-md border bg-background/50 p-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              {isImage && isComplete ? (
                <File className="h-5 w-5 text-muted-foreground shrink-0" />
              ) : (
                <File className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {attachment.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(attachment.size)}
                </p>
              </div>
            </div>
            {isComplete && attachment.url && (
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
            )}
          </div>

          {isImage && isComplete && attachment.url && (
            <div
              className="relative w-full aspect-video rounded-md overflow-hidden border cursor-pointer group"
              onClick={() => {
                const allImages = getAllImages();
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

          {attachment.progress !== undefined && attachment.progress < 100 && (
            <div className="mt-1 h-1 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${attachment.progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
                    {msg.attachments?.map((attachment, index) => (
                      <div key={index}>{renderFilePreview(attachment)}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="shrink-0 p-3 border-t bg-background">
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <Button
                  onClick={() => setIsUploadOpen(true)}
                  size="icon"
                  variant="ghost"
                  className="shrink-0 h-10 w-10 rounded-full hover:bg-accent"
                >
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="resize-none py-2.5 min-h-[40px] max-h-[120px] overflow-hidden"
                    rows={1}
                  />
                </div>
                {isTyping && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleClearText}
                    className="shrink-0 h-10 w-10 rounded-full hover:bg-accent"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </Button>
                )}
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="shrink-0 h-10 w-10 rounded-full"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <UploadDialog
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUpload={handleFileUpload}
        maxFiles={5}
      />

      {lightboxImages && (
        <ImageLightbox
          isOpen={!!lightboxImages}
          onOpenChange={(open) => !open && setLightboxImages(null)}
          images={lightboxImages.images}
          initialIndex={lightboxImages.initialIndex}
        />
      )}
    </Card>
  );
}
