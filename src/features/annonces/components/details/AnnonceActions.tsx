import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EmploisDetails } from "@/core/interfaces";
import { ArrowRight, Heart } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface AnnonceActionsProps {
  annonce: EmploisDetails;
  onApply: () => void;
  onSave?: () => void;
}

export function AnnonceActions({
  annonce,
  onApply,
  onSave,
}: AnnonceActionsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Apply Button */}
          <Button
            onClick={onApply}
            size="lg"
            className="w-full"
            disabled={annonce.applied}
          >
            <span>{annonce.applied ? "Déjà postulé" : "Postuler"}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Save Button */}
          {onSave && (
            <Button
              variant="outline"
              onClick={onSave}
              size="lg"
              className="w-full"
              disabled={annonce.saved}
            >
              <Heart
                className={cn("mr-2 h-4 w-4", annonce.saved && "fill-current")}
              />
              <span>{annonce.saved ? "Sauvegardé" : "Sauvegarder"}</span>
            </Button>
          )}

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
