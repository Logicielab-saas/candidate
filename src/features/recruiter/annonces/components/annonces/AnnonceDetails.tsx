"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, UserPlus, Eye, MousePointerClick, UserCircle2, FileCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PerformanceCard } from "./PerformanceCard";
import { AnnonceDescription } from "./AnnonceDescription";
import { Separator } from "@/components/ui/separator";

interface AnnonceDetailsProps {
  // TODO: Replace with proper type when API integration is done
  data?: {
    intitule: string;
    candidatures: {
      tous: number;
      nouveaux: number;
    };
    performance?: {
      impressions: number;
      clicks: number;
      candidaturesCommencees: number;
      candidatures: number;
    };
  };
}

// TODO: Remove this mock data when API integration is done
const mockData = {
  intitule: "Social Media Manager",
  candidatures: {
    tous: 10,
    nouveaux: 0,
  },
  performance: {
    impressions: 240,
    clicks: 30,
    candidaturesCommencees: 18,
    candidatures: 100,
  },
};

export function AnnonceDetails({ data }: AnnonceDetailsProps) {
  const router = useRouter();

  const annonceData = data || mockData;

  const performanceMetrics = [
    {
      icon: Eye,
      value: annonceData.performance?.impressions || 0,
      label: "Impressions",
    },
    {
      icon: MousePointerClick,
      value: annonceData.performance?.clicks || 0,
      label: "Clicks",
    },
    {
      icon: UserCircle2,
      value: annonceData.performance?.candidaturesCommencees || 0,
      label: "Candidatures commencées",
    },
    {
      icon: FileCheck,
      value: annonceData.performance?.candidatures || 0,
      label: "Candidatures",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <span className="cursor-pointer text-primaryHex-600 hover:text-primaryHex-500 transition-colors
         dark:bg-primaryHex-900/20 dark:text-primaryHex-400 bg-primaryHex-50 rounded-full p-2" onClick={() => router.back()}>
          <ArrowLeft className="w-8 h-8 cursor-pointer" />
        </span>
        <h1 className="text-2xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
          {annonceData.intitule}
        </h1>
      </div>

      <div className="flex gap-6 items-stretch">
        <div className="w-[350px]">
          <h2 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50 mb-4">
            Candidatures
          </h2>
          <Card className="bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50 border p-1
           border-secondaryHex-200 dark:border-secondaryHex-700 shadow-sm hover:shadow-md transition-all">
            <CardContent className="flex items-center justify-between p-5 min-h-full">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-3">
                  <Users className="w-6 h-6 text-primaryHex-600 dark:text-primaryHex-400" />
                </div>
                <span className="text-2xl font-bold text-secondaryHex-900 dark:text-secondaryHex-50">
                  {annonceData.candidatures.tous}
                </span>
                <span className="text-xs font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
                  Candidatures totales
                </span>
              </div>
              <div className="w-px h-16 bg-secondaryHex-200 dark:bg-secondaryHex-700" />
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-3">
                  <UserPlus className="w-6 h-6 text-primaryHex-600 dark:text-primaryHex-400" />
                </div>
                <span className="text-2xl font-bold text-secondaryHex-900 dark:text-secondaryHex-50">
                  {annonceData.candidatures.nouveaux}
                </span>
                <span className="text-xs font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
                  Nouvelles candidatures
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator orientation="vertical" className="h-40 mt-11 bg-secondaryHex-200 dark:bg-secondaryHex-700" />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50 mb-4">
            Récapitulatif des performances
          </h2>

          <div className="grid grid-cols-4 gap-3 p-0">
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
          Sponsoriser l'annonce
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white dark:bg-zinc-800 text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          Améliorer la visibilité
        </Button>
      </div>
      <AnnonceDescription />
    </div>
  );
}