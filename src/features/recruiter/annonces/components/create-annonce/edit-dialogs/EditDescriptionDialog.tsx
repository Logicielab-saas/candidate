import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DescriptionStep } from "../steps/DescriptionStep";

interface EditDescriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditDescriptionDialog({
  isOpen,
  onClose,
}: EditDescriptionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier la description</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <DescriptionStep isDialog onDialogClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
