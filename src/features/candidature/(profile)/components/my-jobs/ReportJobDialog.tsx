"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "react-hook-form";

const reportReasons = [
  "Offre offensante ou discriminatoire",
  "Offre potentiellement frauduleuse",
  "Offre inexacte",
  "Il s'agit d'une publicité",
  "Autre",
];

const reportSchema = z.object({
  reason: z.string().min(1, "Veuillez sélectionner une raison"),
  additionalInfo: z.string().max(300, "Maximum 300 caractères"),
});

interface ReportJobDialogProps {
  open: boolean;
  jobId: string;
  onOpenChange: (open: boolean) => void;
}

export function ReportJobDialog({
  open,
  jobId,
  onOpenChange,
}: ReportJobDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const reportData = {
      jobId,
      reason: data.reason,
      additionalInfo: data.additionalInfo,
    };
    console.log("Reporting job with data:", reportData);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Signaler cette offre d&apos;emploi</DialogTitle>
          <DialogDescription>
            Sélectionnez une raison et fournissez des informations
            supplémentaires si nécessaire.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RadioGroup className="space-y-4 mb-4">
            {reportReasons.map((reason) => (
              <div key={reason} className="flex items-center space-x-3">
                <RadioGroupItem
                  value={reason}
                  id={reason}
                  {...register("reason")}
                />
                <Label htmlFor={reason} className="flex-1 cursor-pointer">
                  <span className="font-medium break-words">{reason}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.reason && (
            <span className="text-red-500">
              {(errors.reason as FieldError).message}
            </span>
          )}
          <Label>Informations complémentaires</Label>
          <Textarea
            className="w-full border rounded-md p-2"
            rows={4}
            maxLength={300}
            {...register("additionalInfo")}
          />
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button className="ml-2" type="submit">
              Envoyer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
