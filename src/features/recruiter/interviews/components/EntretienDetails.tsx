"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarClock,
  Video,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Entretien } from "@/core/mockData/entretiens-data";
import Link from "next/link";

interface EntretienDetailsProps {
  entretien: Entretien;
  className?: string;
}

const TYPE_ICONS = {
  Visioconférence: Video,
  Téléphone: Phone,
  Présentiel: MapPin,
} as const;

export function EntretienDetails({
  entretien,
  className,
}: EntretienDetailsProps) {
  const Icon = TYPE_ICONS[entretien.type];

  const handleCancelInterview = () => {
    // Handle the cancellation logic here
    console.log("Interview cancelled:", entretien.id);
  };

  return (
    <Card className={cn("flex flex-col p-6", className)}>
      <div className="space-y-6">
        {/* Status Badge */}
        <Badge
          variant={entretien.isConfirmed ? "default" : "secondary"}
          className="w-fit"
        >
          {entretien.isConfirmed ? "Confirmé" : "En attente"}
        </Badge>

        {/* Interview Type and Candidate */}
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-full border p-2">
            <Icon className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
              {entretien.type}
            </h3>
            <p className="text-lg font-semibold">{entretien.candidatName}</p>
          </div>
        </div>

        {/* Time Slot */}
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-full border p-2">
            <CalendarClock className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
              Créneau proposé pour le
            </h3>
            <div className="space-y-1">
              <p className="font-medium">
                {format(entretien.date, "d MMMM", { locale: fr })}
                <span className="ml-1 text-secondaryHex-600">
                  ({format(entretien.date, "EEEE", { locale: fr })})
                </span>
              </p>
              <p className="text-sm text-secondaryHex-600 dark:text-secondaryHex-400">
                de {entretien.startTime} à {entretien.endTime}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Reprogrammer
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-1">
                Annuler
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Annuler l&apos;entretien</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir annuler l&apos;entretien avec{" "}
                  {entretien.candidatName} prévu le{" "}
                  {format(entretien.date, "d MMMM", { locale: fr })} à{" "}
                  {entretien.startTime} ?
                  <br />
                  <br />
                  Cette action est irréversible. Un email sera envoyé au
                  candidat pour l&apos;informer de l&apos;annulation.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Retour</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancelInterview}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Confirmer l&apos;annulation
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Separator />

        {/* Job Title Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
            Intitulé du poste
          </h3>
          <Button variant="link" className="h-auto p-0" asChild>
            <Link
              href={`/recruiter/annonces/details/${entretien.id}`}
              className="flex items-center gap-2"
            >
              {entretien.poste}
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </div>

        <Separator />

        {/* Candidature Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
            Coup d&apos;œil sur la candidature
          </h3>
          <Button variant="link" className="h-auto p-0" asChild>
            <Link
              href={`/recruiter/candidates/details?id=${entretien.candidatName}&source=entretien`}
              className="flex items-center gap-2"
            >
              {entretien.candidatName}
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
