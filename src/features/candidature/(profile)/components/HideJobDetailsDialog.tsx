"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface HideJobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HideJobDetailsDialog({
  open,
  onOpenChange,
}: HideJobDetailsDialogProps) {
  const [hiddenDetails] = useState<string[]>([]);
  const tCommon = useTranslations("common");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ScrollArea className="h-[400px] pr-4">
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {tCommon("preferences.hideJobDetails.title")}
            </DialogTitle>
            <DialogDescription>
              {tCommon("preferences.hideJobDetails.dialog.description")}
            </DialogDescription>
          </DialogHeader>

          {hiddenDetails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <p className="text-sm text-muted-foreground">
                {tCommon("preferences.hideJobDetails.dialog.empty.description")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Future implementation: List of hidden job details */}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {tCommon("actions.close")}
            </Button>
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
