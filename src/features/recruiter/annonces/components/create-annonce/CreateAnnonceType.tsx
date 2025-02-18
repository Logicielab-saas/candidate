"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { ArrowRight, CheckCircle2, Copy, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";

export function CreateAnnonceType() {
  const { annonceType, setAnnonceType, nextStep, canProceed } =
    useCreateAnnonceStore();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Créer une nouvelle annonce"
        description="Choisissez comment vous souhaitez créer votre annonce"
      />

      {/* Selection Cards */}
      <RadioGroup
        value={annonceType || ""}
        onValueChange={(value) => setAnnonceType(value as "existing" | "new")}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="relative">
          <RadioGroupItem
            value="existing"
            id="existing"
            className="peer sr-only"
          />
          <Label
            htmlFor="existing"
            className={cn(
              "flex flex-col h-full cursor-pointer rounded-lg border-2 transition-all",
              "hover:border-primaryHex-500 hover:shadow-md",
              "peer-checked:border-primaryHex-500 peer-checked:shadow-md",
              annonceType === "existing"
                ? "border-primaryHex-500"
                : "border-transparent"
            )}
          >
            <Card
              className={cn(
                "h-full transition-all",
                "peer-checked:bg-primaryHex-50",
                "dark:peer-checked:bg-primaryHex-900/20",
                "relative overflow-hidden border-0"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 right-4 transition-opacity",
                  annonceType === "existing" ? "opacity-100" : "opacity-0"
                )}
              >
                <CheckCircle2 className="w-6 h-6 text-primaryHex-500" />
              </div>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primaryHex-100 dark:bg-primaryHex-900/30 p-2">
                    <Copy className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
                    Utiliser une annonce existante
                  </h3>
                </div>
                <p className="text-secondaryHex-600 dark:text-secondaryHex-400">
                  Créez une nouvelle annonce en utilisant une de vos annonces
                  existantes comme modèle
                </p>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div className="relative">
          <RadioGroupItem value="new" id="new" className="peer sr-only" />
          <Label
            htmlFor="new"
            className={cn(
              "flex flex-col h-full cursor-pointer rounded-lg border-2 transition-all",
              "hover:border-primaryHex-500 hover:shadow-md",
              "peer-checked:border-primaryHex-500 peer-checked:shadow-md",
              annonceType === "new"
                ? "border-primaryHex-500"
                : "border-transparent"
            )}
          >
            <Card
              className={cn(
                "h-full transition-all",
                "peer-checked:bg-primaryHex-50",
                "dark:peer-checked:bg-primaryHex-900/20",
                "relative overflow-hidden border-0"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 right-4 transition-opacity",
                  annonceType === "new" ? "opacity-100" : "opacity-0"
                )}
              >
                <CheckCircle2 className="w-6 h-6 text-primaryHex-500" />
              </div>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primaryHex-100 dark:bg-primaryHex-900/30 p-2">
                    <PlusCircle className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
                    Créer une nouvelle annonce
                  </h3>
                </div>
                <p className="text-secondaryHex-600 dark:text-secondaryHex-400">
                  Commencez à partir de zéro et créez une nouvelle annonce
                  personnalisée
                </p>
              </CardContent>
            </Card>
          </Label>
        </div>
      </RadioGroup>

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button onClick={nextStep} disabled={!canProceed()} className="gap-2">
          Continuer
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
