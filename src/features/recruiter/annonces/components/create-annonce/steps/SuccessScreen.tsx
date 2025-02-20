"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatedCheckmark } from "@/components/ui/animated-checkmark";

export function SuccessScreen() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] w-full max-w-2xl mx-auto flex items-center justify-center p-4">
      <Card className="border-2">
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 space-y-8">
          {/* Animated Checkmark */}
          <AnimatedCheckmark size="lg" />

          {/* Text Content */}
          <h1 className="text-2xl font-semibold text-foreground">
            Annonce créée avec succès
          </h1>
          <p className="text-muted-foreground text-center text-wrap">
            Votre annonce est prête. Vous pouvez la consulter ou retourner au
            tableau de bord.
          </p>
          <div className="flex flex-row gap-2">
            {/* Action Buttons */}
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => router.push("/recruiter/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
              Tableau de bord
            </Button>
            <Button
              size="lg"
              className="gap-2"
              onClick={() => router.push("/recruiter/annonces/publication")}
            >
              <ExternalLink className="w-4 h-4" />
              Voir l&apos;annonce
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
