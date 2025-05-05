/**
 * NotInterestedDialog - Alert dialog for confirming job masking action
 *
 * A dialog component that confirms with users before masking a job from their feed.
 * Uses the masking functionality to hide jobs users aren't interested in.
 *
 * Props:
 * - open: boolean - Controls dialog visibility
 * - onOpenChange: (open: boolean) => void - Handler for dialog open state changes
 * - jobId: string - UUID of the job to be masked
 * - onConfirm: (jobId: string) => void - Optional callback after successful masking
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
import LoaderOne from "@/components/ui/loader-one";
import { useMaskEmploi } from "@/hooks/use-mask-emploi";
import { useTranslations } from "next-intl";

interface NotInterestedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
}

export default function NotInterestedDialog({
  open,
  onOpenChange,
  jobId,
}: NotInterestedDialogProps) {
  const t = useTranslations("emplois.jobCard.notInterestedDialog");
  const tCommon = useTranslations("common");
  const { mutate: maskJob, isPending } = useMaskEmploi(tCommon);

  const handleConfirm = () => {
    maskJob(jobId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {tCommon("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-yellow-600 hover:bg-yellow-700"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoaderOne />
                <span className="ml-2">{t("masking")}</span>
              </>
            ) : (
              tCommon("actions.confirm")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
