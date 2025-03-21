"use client";

import { useToast } from "@/hooks/use-toast";
import { useEmploisBySlug } from "@/features/Emplois/hooks/use-emplois";
import LoaderOne from "@/components/ui/loader-one";
import { AnnonceHeader } from "./AnnonceHeader";
import { AnnonceDescription } from "./AnnonceDescription";
import { AnnonceJobDetails } from "./AnnonceJobDetails";
import { AnnonceActions } from "./AnnonceActions";

interface AnnonceDetailsContainerProps {
  slug: string;
}

export function AnnonceDetailsContainer({
  slug,
}: AnnonceDetailsContainerProps) {
  const { toast } = useToast();
  const { data: annonce, isLoading } = useEmploisBySlug(slug);

  function handleApply() {
    if (!annonce) return;
    // TODO: Implement apply logic
    console.log("Applying to job:", annonce.title);
  }

  function handleSave() {
    if (!annonce) return;
    // TODO: Implement save logic
    console.log("Saving job:", annonce.title);
    toast({
      title: "Offre sauvegardée",
      description: "Vous pouvez la retrouver dans votre liste de favoris.",
      variant: "success",
    });
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[400px]">
        <LoaderOne />
      </div>
    );
  }

  if (!annonce) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">
          Offre non trouvée
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <AnnonceHeader annonce={annonce} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <AnnonceDescription annonce={annonce} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <AnnonceJobDetails annonce={annonce} />
          <AnnonceActions
            annonce={annonce}
            onApply={handleApply}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
