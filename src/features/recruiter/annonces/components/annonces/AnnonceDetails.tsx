import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  Eye,
  MousePointerClick,
  UserCircle2,
  FileCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PerformanceCard } from "./PerformanceCard";
import { AnnonceDescription } from "./AnnonceDescription";
import { Separator } from "@/components/ui/separator";
import { BackArrow } from "@/components/shared/BackArrow";
import {
  mockAnnonceDetails,
  AnnonceDetails as AnnonceDetailsType,
} from "@/core/mockData/annonces-details-data";
import Link from "next/link";

interface AnnonceDetailsProps {
  annonceId: string;
  data?: AnnonceDetailsType;
}

export function AnnonceDetails({ annonceId, data }: AnnonceDetailsProps) {
  // Get the annonce details from mock data if not provided
  const annonceData = data || mockAnnonceDetails[annonceId];

  // If no data found, show error or placeholder
  if (!annonceData) {
    return (
      <div className="flex flex-col gap-8">
        <BackArrow title="Annonce non trouvée" />
        <div className="text-center text-muted-foreground">
          Cette annonce n&apos;existe pas ou a été supprimée.
        </div>
      </div>
    );
  }

  const performanceMetrics = [
    {
      icon: Eye,
      value: annonceData.performance.impressions,
      label: "Impressions",
    },
    {
      icon: MousePointerClick,
      value: annonceData.performance.clicks,
      label: "Clicks",
    },
    {
      icon: UserCircle2,
      value: annonceData.performance.candidaturesCommencees,
      label: "Candidatures commencées",
    },
    {
      icon: FileCheck,
      value: annonceData.performance.candidatures,
      label: "Candidatures",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <BackArrow title={annonceData.intitule} />

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className="w-full lg:w-[350px]">
          <h2 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50 mb-4">
            Candidatures
          </h2>
          <Card
            className="bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50 border p-1
           border-secondaryHex-200 dark:border-secondaryHex-700 shadow-sm hover:shadow-md transition-all"
          >
            <CardContent className="flex items-center justify-between p-5 min-h-full">
              <Link
                href={`/recruiter/candidates?annonce=${annonceId}`}
                className="flex flex-col items-center gap-2"
              >
                <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-3">
                  <Users className="w-6 h-6 text-primaryHex-600 dark:text-primaryHex-400" />
                </div>
                <span className="text-2xl font-bold text-secondaryHex-900 dark:text-secondaryHex-50">
                  {annonceData.candidatures.tous}
                </span>
                <span className="text-xs font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
                  Voir les candidatures
                </span>
              </Link>
              <Separator orientation="vertical" className="h-16" />
              <Link
                href={`/recruiter/candidates?annonce=${annonceId}&tab=new`}
                className="flex flex-col items-center gap-2"
              >
                <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-3">
                  <UserPlus className="w-6 h-6 text-primaryHex-600 dark:text-primaryHex-400" />
                </div>
                <span className="text-2xl font-bold text-secondaryHex-900 dark:text-secondaryHex-50">
                  {annonceData.candidatures.nouveaux}
                </span>
                <span className="text-xs font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
                  Nouvelles candidatures
                </span>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Separator
          orientation="vertical"
          className="hidden lg:block h-40 mt-11 bg-secondaryHex-200 dark:bg-secondaryHex-700"
        />
        <Separator className="block lg:hidden h-px w-full bg-secondaryHex-200 dark:bg-secondaryHex-700" />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50 mb-4">
            Récapitulatif des performances
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-0">
            {performanceMetrics.map((metric, index) => (
              <PerformanceCard
                key={index}
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="bg-white dark:bg-zinc-800 text-primaryHex-600 border-primaryHex-200 hover:bg-primaryHex-50 dark:hover:bg-primaryHex-900/20"
        >
          Sponsoriser l&apos;annonce
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white dark:bg-zinc-800 text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          Améliorer la visibilité
        </Button>
      </div>
      <AnnonceDescription annonceId={annonceId} />
    </div>
  );
}
