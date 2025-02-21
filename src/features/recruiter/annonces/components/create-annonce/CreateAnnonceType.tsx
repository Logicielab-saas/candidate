"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { CheckCircle2, Copy, PlusCircle, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockAnnonceData } from "@/core/mockData/annonces-real-data";
import { useToast } from "@/hooks/use-toast";
import { convertAnnonceToSelectedQuestions } from "@/features/recruiter/annonces/common/utils/questions.utils";
import { AnnonceSelectionList } from "./AnnonceSelectionList";

function ExistingAnnonceSelection({ onBack }: { onBack: () => void }) {
  const {
    setAnnonceType,
    setBaseInformation,
    setJobTypeInformation,
    setSalaryInformation,
    setDescription,
    setPreferences,
    setQuestions,
    reset,
  } = useCreateAnnonceStore();
  const [selectedAnnonceId, setSelectedAnnonceId] = useState<string | null>(
    null
  );
  const { toast } = useToast();

  const handleBack = () => {
    reset(); // Reset store when going back
    onBack();
  };

  const handleContinue = () => {
    if (!selectedAnnonceId) return;

    const selectedAnnonce = mockAnnonceData.find(
      (annonce) => annonce.id === selectedAnnonceId
    );

    if (selectedAnnonce) {
      // Reset store before initializing with new data
      reset();

      // Initialize the store with the selected annonce data
      setAnnonceType("duplicate");
      setBaseInformation(selectedAnnonce.baseInformation);
      setJobTypeInformation(selectedAnnonce.jobTypeInformation);
      setSalaryInformation(selectedAnnonce.salaryInformation);
      setDescription(selectedAnnonce.description);
      setPreferences(selectedAnnonce.preferences);
      setQuestions(
        convertAnnonceToSelectedQuestions(selectedAnnonce.questions)
      );

      toast({
        title: "Annonce sélectionnée",
        description:
          "Les informations de l'annonce ont été chargées avec succès.",
        variant: "success",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-secondaryHex-900 dark:text-secondaryHex-50">
          Sélectionner une annonce
        </h1>
        <p className="text-secondaryHex-600 dark:text-secondaryHex-400 text-lg">
          Choisissez une annonce existante comme modèle
        </p>
      </div>

      {/* Annonce Selection */}
      <Card>
        <CardContent className="pt-6">
          <AnnonceSelectionList
            selectedAnnonceId={selectedAnnonceId}
            onAnnonceChange={setSelectedAnnonceId}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={handleBack} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        <Button onClick={handleContinue} disabled={!selectedAnnonceId}>
          Continuer
        </Button>
      </div>
    </div>
  );
}

export function CreateAnnonceType() {
  const { setAnnonceType, reset } = useCreateAnnonceStore();
  const [selectedType, setSelectedType] = useState<"existing" | "new" | null>(
    null
  );
  const [showExistingSelection, setShowExistingSelection] = useState(false);

  const handleContinue = () => {
    if (selectedType === "existing") {
      setShowExistingSelection(true);
    } else if (selectedType === "new") {
      reset(); // Reset store before creating new annonce
      setAnnonceType("new");
    }
  };

  const handleTypeChange = (value: string) => {
    reset(); // Reset store when switching between types
    setSelectedType(value as "existing" | "new");
  };

  if (showExistingSelection) {
    return (
      <ExistingAnnonceSelection
        onBack={() => setShowExistingSelection(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Simple Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-secondaryHex-900 dark:text-secondaryHex-50">
          Créer une nouvelle annonce
        </h1>
        <p className="text-secondaryHex-600 dark:text-secondaryHex-400 text-lg">
          Choisissez comment vous souhaitez créer votre annonce
        </p>
      </div>

      {/* Selection Cards */}
      <RadioGroup
        value={selectedType || ""}
        onValueChange={handleTypeChange}
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
              selectedType === "existing"
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
                  selectedType === "existing" ? "opacity-100" : "opacity-0"
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
              selectedType === "new"
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
                  selectedType === "new" ? "opacity-100" : "opacity-0"
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

      {/* Navigation - Only show next button for first step */}
      <FormStepsNavigation
        onPrevious={() => {}}
        onNext={handleContinue}
        canProceed={!!selectedType}
        className="flex justify-end pt-6"
        previousLabel={null}
      />
    </div>
  );
}
