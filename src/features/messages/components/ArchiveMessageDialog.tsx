/**
 * ArchiveMessageDialog - Dialog for confirming message archival/unarchival
 *
 * Displays a confirmation dialog when archiving or unarchiving a message,
 * showing relevant message details and handling the action
 */

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type Message } from "@/core/mockData/messages-data";
import { Archive, ArchiveRestore } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ArchiveMessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messageToArchive: Message | null;
  onConfirm: () => void;
}

export function ArchiveMessageDialog({
  isOpen,
  onOpenChange,
  messageToArchive,
  onConfirm,
}: ArchiveMessageDialogProps) {
  // Translations
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("messages");

  if (!messageToArchive) return null;

  const recruiter = messageToArchive.participants.find(
    (p) => p.role === "Recruteur"
  );

  const isArchived = messageToArchive.status === "archived";

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {isArchived ? (
              <ArchiveRestore className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Archive className="h-5 w-5 text-muted-foreground" />
            )}
            {isArchived
              ? tMessages("chat.unarchiveConversation")
              : tMessages("chat.archiveConversation")}
          </AlertDialogTitle>
          <div className="space-y-2.5">
            <AlertDialogDescription>
              {tMessages("chat.archive.confirmMessage", {
                action: isArchived
                  ? tMessages("chat.archive.unarchive")
                  : tMessages("chat.archive.archive"),
                company: messageToArchive.company.name,
                job: messageToArchive.job.name,
                hasRecruiter: recruiter ? "true" : "false",
              })}
            </AlertDialogDescription>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              {isArchived
                ? tMessages("chat.archive.unarchiveDescription")
                : tMessages("chat.archive.archiveDescription")}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tCommon("actions.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(isArchived && "bg-primary hover:bg-primary/90")}
          >
            {isArchived
              ? tMessages("chat.archive.unarchive")
              : tMessages("chat.archive.archive")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
