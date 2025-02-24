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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ScrollArea className="h-[400px] pr-4">
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Masquer les emplois avec ces détails</DialogTitle>
            <DialogDescription>
              Nous allons faire notre possible pour masquer les emplois qui
              requièrent ces qualifications ou préférences.
            </DialogDescription>
          </DialogHeader>

          {hiddenDetails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <p className="text-sm text-muted-foreground">
                Lorsque vous donnez votre avis sur les emplois présentés dans
                vos résultats de recherche et vos notifications par email, vous
                en trouverez le détail ici.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Future implementation: List of hidden job details */}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
