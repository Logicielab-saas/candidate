import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmWithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmWithdrawDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmWithdrawDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer le retrait</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir retirer votre candidature ?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            className="ml-2 text-white bg-destructive hover:bg-destructive/90"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Confirmer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
