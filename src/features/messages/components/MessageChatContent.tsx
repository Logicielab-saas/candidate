"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageHeader } from "./MessageHeader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Paperclip,
  X,
  File,
  Download,
  ZoomIn,
  FileText,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Zap,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UploadDialog } from "@/components/shared/UploadDialog";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import Image from "next/image";
import {
  type Message,
  type MessageTemplate,
  ChatMessage,
  MESSAGE_TEMPLATES,
} from "@/core/mockData/messages-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_CHAT_MESSAGES } from "@/core/mockData/messages-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MessageChatContentProps {
  message?: Message;
  onArchive?: () => void;
  onReport?: (reason: string, details: string) => void;
}

function InterviewInvitation({
  interview,
}: {
  interview: NonNullable<ChatMessage["interview"]>;
}) {
  return (
    <div className="bg-card border rounded-lg p-4 mt-2">
      <Badge variant="default" className="mb-2">
        Invitation à un entretien
      </Badge>
      <h3 className="text-lg font-semibold text-foreground">
        {interview.jobTitle}
      </h3>
      <div className="space-y-2 mt-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 mr-2" />
          <span>{interview.company.name}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{interview.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{interview.interviewDate}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>{interview.interviewTime}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Zap className="h-4 w-4 mr-2" />
          <span>{interview.interviewType}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button asChild>
          <Link href={`/interviews/programmer/${interview.jobKey}`}>
            Programmer
          </Link>
        </Button>
        <Button variant="outline" className="text-foreground" asChild>
          <Link href={`/interviews/refuser/${interview.jobKey}`}>Refuser</Link>
        </Button>
      </div>
    </div>
  );
}

export function MessageChatContent({
  message,
  onArchive,
  onReport,
}: MessageChatContentProps) {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{
    images: Array<{ src: string; alt: string }>;
    initialIndex: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  // Scroll to bottom on initial load and when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

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
      sender: "Candidat",
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRecruiter: false,
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

  const handleTemplateSelect = (template: MessageTemplate) => {
    setNewMessage(template.content);
    setIsTyping(true);
    // Auto-resize will be handled by the useEffect
  };

  const handleArchive = () => {
    if (onArchive) {
      onArchive();
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
            company={message.company}
            job={message.job}
            participants={message.participants}
            onArchive={handleArchive}
            onReport={onReport}
            message={message}
          />
        </CardHeader>

        <CardContent className="flex-1 p-0 min-h-0 flex flex-col">
          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-3">
            <div className="space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    !msg.isRecruiter ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 break-all overflow-hidden ${
                      !msg.isRecruiter
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
                    {msg.interview && (
                      <InterviewInvitation interview={msg.interview} />
                    )}
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
                <div className="flex gap-1">
                  <Button
                    onClick={() => setIsUploadOpen(true)}
                    size="icon"
                    variant="ghost"
                    className="shrink-0 h-10 w-10 rounded-full hover:bg-accent"
                  >
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="shrink-0 h-10 w-10 rounded-full hover:bg-accent"
                      >
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-72">
                      <DropdownMenuLabel>Modèles de messages</DropdownMenuLabel>
                      {Object.entries(
                        MESSAGE_TEMPLATES.reduce<
                          Record<string, MessageTemplate[]>
                        >((acc, template) => {
                          if (!acc[template.category]) {
                            acc[template.category] = [];
                          }
                          acc[template.category].push(template);
                          return acc;
                        }, {})
                      ).map(([category, templates], index, array) => (
                        <div key={category}>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs text-muted-foreground pl-2">
                              {category}
                            </DropdownMenuLabel>
                            {templates.map((template) => (
                              <DropdownMenuItem
                                key={template.id}
                                onClick={() => handleTemplateSelect(template)}
                                className="flex flex-col items-start gap-1 min-h-[2.5rem]"
                              >
                                <span className="font-medium">
                                  {template.title}
                                </span>
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                  {template.content.split("\n")[0]}
                                </span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                          {index < array.length - 1 && (
                            <DropdownMenuSeparator />
                          )}
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex-1">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="resize-none py-2.5 min-h-[42px] max-h-[120px] overflow-y-auto"
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
