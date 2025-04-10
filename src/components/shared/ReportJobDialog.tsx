/**
 * ReportJobDialog - An alert dialog component for reporting inappropriate job listings
 *
 * Allows users to report jobs with a specific reason and additional information.
 * Uses form validation with zod and integrates with the reporting API.
 *
 * Props:
 * - open: boolean - Controls dialog visibility
 * - jobId: string - UUID of the job being reported
 * - onOpenChange: (open: boolean) => void - Handler for dialog open state changes
 */

"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReportEmploi } from "@/hooks/use-report-emplois";
import { useState } from "react";

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

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportJobDialogProps {
  open: boolean;
  jobId: string;
  onOpenChange: (open: boolean) => void;
}

export default function ReportJobDialog({
  open,
  jobId,
  onOpenChange,
}: ReportJobDialogProps) {
  const { mutate: reportJob, isPending } = useReportEmploi();
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: "",
      additionalInfo: "",
    },
  });

  const onSubmit: SubmitHandler<ReportFormData> = (data) => {
    setIsDeleting(true);
    reportJob(
      {
        emploi_uuid: jobId,
        reason: data.reason,
        message: data.additionalInfo,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setIsDeleting(false);
          reset();
        },
        onError: () => {
          onOpenChange(false);
          setIsDeleting(false);
          reset();
        },
      }
    );
  };

  const isLoading = isPending || isDeleting;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isLoading) {
          onOpenChange(newOpen);
        }
      }}
    >
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Signaler cette offre d&apos;emploi
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sélectionnez une raison et fournissez des informations
            supplémentaires si nécessaire.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <Controller
            control={control}
            name="reason"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="space-y-4"
              >
                {reportReasons.map((reason) => (
                  <div key={reason} className="flex items-center space-x-3">
                    <RadioGroupItem value={reason} id={reason} />
                    <Label htmlFor={reason} className="flex-1 cursor-pointer">
                      <span className="font-medium break-words">{reason}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.reason && (
            <span className="text-red-500 block">{errors.reason.message}</span>
          )}

          <div className="space-y-2">
            <Label>Informations complémentaires</Label>
            <Textarea
              className="w-full border rounded-md p-2"
              rows={4}
              maxLength={300}
              {...register("additionalInfo")}
            />
            {errors.additionalInfo && (
              <span className="text-red-500 block">
                {errors.additionalInfo.message}
              </span>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
              disabled={isLoading}
            >
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction asChild disabled={!watch("reason") || isLoading}>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!watch("reason") || isLoading}
              >
                {isLoading ? "Envoi..." : "Envoyer"}
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
