/**
 * MessageHeader - Displays the header of a message conversation
 *
 * Shows company and job information for candidate's message view
 * with enhanced visual hierarchy and interaction patterns
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Users2,
  MoreVertical,
  Building2,
  Briefcase,
  Archive,
  Flag,
  User,
  ExternalLink,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArchiveMessageDialog } from "./ArchiveMessageDialog";
import { SpamReportDialog } from "./SpamReportDialog";
import { type Message } from "@/core/mockData/messages-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

interface MessageHeaderProps {
  company: {
    name: string;
    logo: string;
  };
  job: {
    name: string;
    type?: string;
  };
  participants: Array<{
    name: string;
    role: string;
  }>;
  onArchive?: () => void;
  onReport?: (reason: string, details: string) => void;
  message: Message;
}

export function MessageHeader({
  company,
  job,
  participants = [],
  onArchive,
  onReport,
  message,
}: MessageHeaderProps) {
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const recruiter = participants.find((p) => p.role === "Recruteur");

  const isArchived = message.status === "archived";

  // Translations
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("messages");

  const handleArchive = () => {
    if (onArchive) {
      onArchive();
    }
  };

  const handleReport = (reason: string, details: string) => {
    if (onReport) {
      onReport(reason, details);
    }
  };

  return (
    <div className="flex items-start justify-between gap-4 py-1">
      {/* Left side - Company and Job info */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {/* Company Logo */}
        <div className="relative h-12 w-12">
          <Avatar>
            <AvatarImage src={company.logo} alt={company.name} />
            <AvatarFallback>
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Company and Job Details */}
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold truncate">{company.name}</h2>
            <Badge variant="outline" className="h-5 text-xs font-normal">
              {tMessages("chat.company")}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Briefcase className="h-4 w-4 text-primaryHex-500" />
              <p className="text-sm font-medium text-primaryHex-700 truncate">
                {job.name}
              </p>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="group flex items-center gap-1.5 px-1.5 py-0.5 rounded-md hover:bg-accent transition-colors">
                    <Users2 className="h-4 w-4 text-primaryHex-500" />
                    <span className="text-sm">
                      <span className="font-medium text-primaryHex-700">
                        {participants.length}
                      </span>{" "}
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {tMessages("chat.participants")}
                      </span>
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="p-0 w-72 border-none shadow-lg"
                >
                  <div className="rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-primaryHex-500/10 px-3 py-2 border-b">
                      <p className="text-sm font-medium text-primaryHex-700">
                        {tMessages("chat.participantsList")}
                      </p>
                    </div>

                    {/* Participants List */}
                    <div className="p-2 bg-card">
                      <div className="space-y-1">
                        {participants.map((participant, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-primaryHex-500/10 flex items-center justify-center">
                                <User className="h-3.5 w-3.5 text-primaryHex-500" />
                              </div>
                              <span className="text-sm font-medium">
                                {participant.name}
                              </span>
                            </div>
                            <Badge
                              variant={
                                participant.role === "Recruteur"
                                  ? "default"
                                  : "secondary"
                              }
                              className="h-5 text-[10px] font-medium"
                            >
                              {participant.role}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {recruiter && (
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              {tMessages("chat.discussingWith")}{" "}
              <span className="font-medium text-foreground">
                {recruiter.name}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-accent"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem asChild>
              <Link
                href={`/annonce-details/${message.job.id}`}
                className="flex"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {tMessages("chat.viewJob")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsArchiveDialogOpen(true)}>
              <Archive className="h-4 w-4 mr-2" />
              {isArchived
                ? tMessages("chat.unarchiveConversation")
                : tMessages("chat.archiveConversation")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                message.status === "spam"
                  ? onReport?.("restore", "")
                  : setIsReportDialogOpen(true)
              }
              className={cn(
                message.status === "spam"
                  ? "text-primary focus:text-primary"
                  : "text-destructive focus:text-destructive"
              )}
            >
              {message.status === "spam" ? (
                <>
                  <Archive className="h-4 w-4 mr-2" />
                  {tCommon("actions.restore")}
                </>
              ) : (
                <>
                  <Flag className="h-4 w-4 mr-2" />
                  {tMessages("chat.reportSpam")}
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ArchiveMessageDialog
          isOpen={isArchiveDialogOpen}
          onOpenChange={setIsArchiveDialogOpen}
          messageToArchive={message}
          onConfirm={handleArchive}
        />

        <SpamReportDialog
          isOpen={isReportDialogOpen}
          onOpenChange={setIsReportDialogOpen}
          messageToReport={message}
          onConfirm={handleReport}
        />
      </div>
    </div>
  );
}
