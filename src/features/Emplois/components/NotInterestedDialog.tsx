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
import { useMaskEmploi } from "@/hooks/use-mask-emploi";
import { Loader2 } from "lucide-react";

interface NotInterestedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  onConfirm?: (jobId: string) => void;
}

export default function NotInterestedDialog({
  open,
  onOpenChange,
  jobId,
  onConfirm,
}: NotInterestedDialogProps) {
  const { mutate: maskJob, isPending } = useMaskEmploi();

  const handleConfirm = () => {
    maskJob(jobId, {
      onSuccess: () => {
        onOpenChange(false);
        onConfirm?.(jobId);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer votre choix</AlertDialogTitle>
          <AlertDialogDescription>
            Cette offre ne sera plus visible dans votre flux principal. Vous
            pouvez toujours la retrouver dans vos paramètres.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-yellow-600 hover:bg-yellow-700"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Masquage...
              </>
            ) : (
              "Confirmer"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
