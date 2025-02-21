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

interface AnnonceDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  annonceId: number;
  annonceName: string;
}

export function AnnonceDeleteDialog({
  isOpen,
  onOpenChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  annonceId,
  annonceName,
}: AnnonceDeleteDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement
            l&apos;annonce{" "}
            <span className="font-bold text-zinc-800 dark:text-zinc-50">
              {annonceName}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700">
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
