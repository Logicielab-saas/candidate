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
import LoaderOne from "@/components/ui/loader-one";
import { useTranslations } from "next-intl";

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
  const tCommon = useTranslations("common");
  const t = useTranslations("myJobsPage.archiveJobDialog");

  const { mutate: archiveJob, isPending } = useArchiveJob();
  const [error, setError] = useState<string | null>(null);

  const handleArchive = () => {
    try {
      archiveJob(jobId);
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : tCommon("toast.error.description")
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-2">
              <div>{t("description", { jobTitle })}</div>
              <div>{t("warning")}</div>
              {error && (
                <div className="text-destructive text-sm font-medium">
                  {error}
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {tCommon("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleArchive}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isPending && <LoaderOne />}
            {isPending
              ? tCommon("actions.archiving")
              : tCommon("actions.archive")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
