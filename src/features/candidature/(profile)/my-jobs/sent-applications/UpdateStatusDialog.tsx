"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CircleDot,
  ThumbsUp,
  UserCheck,
  XCircle,
  AlertOctagon,
} from "lucide-react";
import type { CandidateStatus } from "@/core/types/job";

interface UpdateStatusDialogProps {
  onStatusUpdate: (status: CandidateStatus) => void;
  currentStatus: CandidateStatus;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const statusOptions = [
  {
    id: "INTERVIEWED" as const,
    label: "Entretien en cours",
    description: "Les employeurs ne verront pas cette information.",
    icon: <CircleDot className="h-5 w-5 text-green-600" />,
  },
  {
    id: "OFFER_RECEIVED" as const,
    label: "Offre reçue",
    description: "Les employeurs ne verront pas cette information.",
    icon: <ThumbsUp className="h-5 w-5 text-green-600" />,
  },
  {
    id: "HIRED" as const,
    label: "Recruté",
    description: "Les employeurs ne verront pas cette information.",
    icon: <UserCheck className="h-5 w-5 text-green-600" />,
  },
  {
    id: "REJECTED" as const,
    label: "Non retenue par l'employeur",
    description: "Les employeurs ne verront pas cette information.",
    icon: <XCircle className="h-5 w-5 text-red-600" />,
  },
  {
    id: "NOT_INTERESTED" as const,
    label: "Le poste ne m'intéresse plus",
    description: "Les employeurs ne verront pas cette information.",
    icon: <AlertOctagon className="h-5 w-5 text-gray-600" />,
  },
] as const;

export function UpdateStatusDialog({
  onStatusUpdate,
  currentStatus,
  trigger,
  open,
  onOpenChange,
}: UpdateStatusDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Mettre à jour le statut</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mettre à jour le statut de vos candidatures</DialogTitle>
          <DialogDescription>
            Les employeurs ne verront pas cette information.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <RadioGroup
            defaultValue={currentStatus}
            className="space-y-4"
            onValueChange={(value) => onStatusUpdate(value as CandidateStatus)}
          >
            {statusOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-start space-x-3 space-y-0"
              >
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="mt-1"
                />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer space-y-1"
                >
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
