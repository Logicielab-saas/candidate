/**
 * ArchiveJobDialog - Confirmation dialog for archiving a job
 *
 * This component displays a confirmation dialog when a user attempts to archive a job.
 * It handles the archiving process and displays loading/error states.
 *
 * Props:
 * - open: Boolean to control dialog visibility
 * - onOpenChange: Callback to handle dialog open state changes
 * - jobId: ID of the job to archive
 * - jobTitle: Title of the job to archive
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
import { useArchiveJob } from "../hooks/use-my-archived-jobs";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ArchiveJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle: string;
}

export default function ArchiveJobDialog({
  open,
  onOpenChange,
  jobId,
  jobTitle,
}: ArchiveJobDialogProps) {
  const { mutate: archiveJob, isPending } = useArchiveJob();
  const [error, setError] = useState<string | null>(null);

  const handleArchive = async () => {
    try {
      await archiveJob(jobId);
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue"
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Archiver cette offre d&apos;emploi ?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-2">
              <div>
                Êtes-vous sûr de vouloir archiver l&apos;offre &quot;{jobTitle}
                &quot; ?
              </div>
              <div>
                Cette action déplacera l&apos;offre dans vos archives. Vous
                pourrez la restaurer ultérieurement si nécessaire.
              </div>
              {error && (
                <div className="text-destructive text-sm font-medium">
                  {error}
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleArchive}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Archivage..." : "Archiver"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
