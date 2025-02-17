"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ReprogramLeftSide } from "./ReprogramLeftSide";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { WeekdayAvailability } from "@/core/mockData/dispo-data";
import { ArrowLeft } from "lucide-react";

interface FormValues {
  calendarConnections: { [key: string]: boolean };
  exceptions: Array<{
    date: Date;
    isAvailable: boolean;
    startTime?: string;
    endTime?: string;
  }>;
  availabilities: { [key: string]: WeekdayAvailability };
}

interface EntretienReprogramDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EntretienReprogramDialog({
  isOpen,
  onOpenChange,
}: EntretienReprogramDialogProps) {
  const handleSubmit = async (data: FormValues) => {
    try {
      console.log("Form data:", data);
      toast({
        title: "Paramètres de disponibilité mis à jour",
        description:
          "Les paramètres de disponibilité ont été mis à jour avec succès.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erreur lors de la mise à jour des paramètres",
        description:
          "Une erreur est survenue lors de la mise à jour des paramètres.",
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // Only allow closing through the cancel button
        if (!open) {
          onOpenChange(false);
        }
      }}
    >
      <DialogContent className="sm:max-w-[950px] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-8 hover:bg-transparent hover:opacity-70 pl-0"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-4 w-4" />
              <DialogTitle className="hover:cursor-pointer">
                Modifier vos disponibilités
              </DialogTitle>
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-200px)] max-h-[800px]">
          <div className="p-6 pt-0">
            <ReprogramLeftSide onSubmit={handleSubmit} />
          </div>
        </ScrollArea>
        <Separator />
        <DialogFooter className="p-6 pt-4">
          <div className="flex justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" form="reprogram-form">
              Appliquer les modifications
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
