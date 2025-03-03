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
              ? "Désarchiver la conversation"
              : "Archiver la conversation"}
          </AlertDialogTitle>
          <div className="space-y-2.5">
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir {isArchived ? "désarchiver" : "archiver"}{" "}
              cette conversation avec{" "}
              <span className="font-medium text-foreground">
                {messageToArchive.company.name}
              </span>
              {recruiter && (
                <>
                  {" "}
                  concernant le poste de{" "}
                  <span className="font-medium text-foreground">
                    {messageToArchive.job.name}
                  </span>{" "}
                  ?
                </>
              )}
            </AlertDialogDescription>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              {isArchived
                ? "La conversation sera déplacée vers la boîte de réception."
                : 'La conversation sera déplacée vers les archives. Vous pourrez la retrouver dans l\'onglet "Archive".'}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(isArchived && "bg-primary hover:bg-primary/90")}
          >
            {isArchived ? "Désarchiver" : "Archiver"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
