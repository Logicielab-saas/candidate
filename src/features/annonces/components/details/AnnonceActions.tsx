import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EmploisDetails } from "@/core/interfaces";
import { ArrowRight, Heart } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useJobBookmark } from "@/core/utils/job-bookmark-handler";
import Link from "next/link";

interface AnnonceActionsProps {
  annonce: EmploisDetails;
}

export function AnnonceActions({ annonce }: AnnonceActionsProps) {
  const { isSaved, isProcessing, toggleSaved } = useJobBookmark({
    initialIsSaved: annonce.saved,
    jobId: annonce.uuid,
    jobTitle: annonce.title,
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Apply Button */}
          {annonce.applied ? (
            <Button size="lg" className="w-full" disabled={annonce.applied}>
              <span>{annonce.applied ? "Déjà postulé" : "Postuler"}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full"
              disabled={annonce.applied}
              asChild
            >
              <Link href={`/job-apply/${annonce.slug}`}>
                <span>{annonce.applied ? "Déjà postulé" : "Postuler"}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}

          {/* Save Button */}
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaved();
            }}
            size="lg"
            className={cn(
              "w-full",
              isProcessing && "opacity-50 cursor-not-allowed"
            )}
            disabled={isProcessing}
          >
            <Heart
              className={cn(
                "mr-2 h-4 w-4",
                isSaved && "fill-current text-primary",
                isProcessing && "animate-pulse"
              )}
            />
            <span>{isSaved ? "Sauvegardé" : "Sauvegarder"}</span>
          </Button>

          {/* Deadline Info */}
          {annonce.expireDate && (
            <p className="text-sm text-muted-foreground text-center">
              Date limite de candidature :{" "}
              <span className="font-bold">
                {format(new Date(annonce.expireDate), "EEEE d MMMM yyyy", {
                  locale: fr,
                })}
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
