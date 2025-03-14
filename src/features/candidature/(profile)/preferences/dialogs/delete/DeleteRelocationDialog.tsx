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
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface DeleteRelocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  relocation: {
    id: string;
    willRelocate: boolean;
    locationType: "anywhere" | "specific";
    location?: string;
  };
}

export function DeleteRelocationDialog({
  open,
  onOpenChange,
  onConfirm,
  relocation,
}: DeleteRelocationDialogProps) {
  const getLocationText = () => {
    if (!relocation.willRelocate) return "Pas de relocalisation";
    if (relocation.locationType === "anywhere") return "N'importe où";
    return `À proximité de ${relocation.location}`;
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. La préférence de
            relocalisation sera supprimée définitivement de votre profil.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4">
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm font-medium">{getLocationText()}</p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={() => onConfirm(relocation.id)}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
