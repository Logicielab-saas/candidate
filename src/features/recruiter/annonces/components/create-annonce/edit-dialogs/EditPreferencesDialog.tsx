import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PreferencesStep } from "../steps/PreferencesStep";

interface EditPreferencesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditPreferencesDialog({
  isOpen,
  onClose,
}: EditPreferencesDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier les paramètres</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <PreferencesStep isDialog onDialogClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
