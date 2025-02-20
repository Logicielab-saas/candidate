import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuestionsStep } from "../steps/QuestionsStep";

interface EditQuestionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditQuestionsDialog({
  isOpen,
  onClose,
}: EditQuestionsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier les questions</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <QuestionsStep isDialog onDialogClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
