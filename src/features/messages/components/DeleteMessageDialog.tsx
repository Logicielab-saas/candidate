/**
 * DeleteMessageDialog - Confirmation dialog for message deletion
 *
 * Displays a modal dialog to confirm message deletion with company and job title context.
 * Uses Shadcn UI Dialog components and next-intl for translations.
 */

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Message } from "@/core/mockData/messages-data";
import { useTranslations } from "next-intl";

interface DeleteMessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  message: Message | null;
  onConfirm: () => void;
}

export function DeleteMessageDialog({
  isOpen,
  onOpenChange,
  message,
  onConfirm,
}: DeleteMessageDialogProps) {
  const t = useTranslations("messages");
  const tCommon = useTranslations("common");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("delete.title")}</DialogTitle>
          <DialogDescription>
            {t("delete.description", {
              company: message?.company.name ?? "",
              job: message?.job.name ?? "",
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tCommon("actions.cancel")}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {tCommon("actions.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
