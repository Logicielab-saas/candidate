/**
 * DeleteRelocationDialog - Dialog for confirming relocation preference deletion
 *
 * Displays a confirmation dialog before deleting a relocation preference.
 *
 * Props:
 * - open: boolean - Controls dialog visibility
 * - onOpenChange: (open: boolean) => void - Handles dialog open state changes
 * - onConfirm: (id: string) => void - Handles deletion confirmation
 * - relocation: Relocation - The relocation preference to delete
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

interface DeleteRelocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  relocation: {
    id: string;
  };
}

export function DeleteRelocationDialog({
  open,
  onOpenChange,
  onConfirm,
  relocation,
}: DeleteRelocationDialogProps) {
  const { toast } = useToast();
  const tCommon = useTranslations("common");

  const handleConfirm = () => {
    onConfirm(relocation.id);
    onOpenChange(false);
    toast({
      variant: "success",
      title: tCommon(
        "preferences.sections.relocation.dialog.toast.delete.title"
      ),
      description: tCommon(
        "preferences.sections.relocation.dialog.toast.delete.description"
      ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {tCommon("preferences.sections.relocation.dialog.delete.title")}
          </DialogTitle>
          <DialogDescription>
            {tCommon(
              "preferences.sections.relocation.dialog.delete.description"
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {tCommon("actions.cancel")}
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {tCommon("actions.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
