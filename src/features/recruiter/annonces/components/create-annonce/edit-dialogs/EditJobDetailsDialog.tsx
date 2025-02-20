import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobInformationStep } from "../steps/JobInformationStep";

interface EditJobDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditJobDetailsDialog({
  isOpen,
  onClose,
}: EditJobDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier les détails de l&apos;emploi</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <JobInformationStep isDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}
