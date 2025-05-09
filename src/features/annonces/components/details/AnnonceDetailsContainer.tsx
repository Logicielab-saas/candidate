"use client";

import { useEmploisBySlug } from "@/features/Emplois/hooks/use-emplois";
import LoaderOne from "@/components/ui/loader-one";
import { AnnonceHeader } from "./AnnonceHeader";
import { AnnonceDescription } from "./AnnonceDescription";
import { AnnonceJobDetails } from "./AnnonceJobDetails";
import { AnnonceActions } from "./AnnonceActions";
import { AnnonceStatusAlert } from "./AnnonceStatusAlert";
import { useTranslations } from "next-intl";

interface AnnonceDetailsContainerProps {
  slug: string;
}

export function AnnonceDetailsContainer({
  slug,
}: AnnonceDetailsContainerProps) {
  const { data: annonce, isLoading } = useEmploisBySlug(slug);
  const t = useTranslations("annonces");

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
          {t("details.error.notFound")}
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <AnnonceHeader annonce={annonce} />

      {/* Status Alerts */}
      <AnnonceStatusAlert annonce={annonce} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <AnnonceDescription annonce={annonce} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <AnnonceJobDetails annonce={annonce} />
          <AnnonceActions annonce={annonce} />
        </div>
      </div>
    </div>
  );
}
