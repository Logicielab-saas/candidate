"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface AnnonceDetailsProps {
  // TODO: Replace with proper type when API integration is done
  data?: {
    intitule: string;
    candidatures: {
      tous: number;
      nouveaux: number;
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
};

export function AnnonceDetails({ data }: AnnonceDetailsProps) {
  const router = useRouter();

  const annonceData = data || mockData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="cursor-pointer text-primaryHex-600 hover:text-primaryHex-500 transition-colors dark:text-secondaryHex-50
         bg-primaryHex-50 rounded-full p-2" onClick={() => router.back()}>
          <ArrowLeft
            className="w-8 h-8 cursor-pointer"
          />
        </span>
        <h1 className="text-2xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
          {annonceData.intitule}
        </h1>
      </div>
      <div className="flex gap-6">
        <Card className="bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50 w-fit border border-secondaryHex-200 dark:border-secondaryHex-700 shadow-sm hover:shadow-md transition-all">
          <CardContent className="flex items-center gap-16 p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-3">
                <Users className="w-8 h-8 text-primaryHex-600 dark:text-primaryHex-400" />
              </div>
              <span className="text-3xl font-bold text-secondaryHex-900 dark:text-secondaryHex-50">
                {annonceData.candidatures.tous}
              </span>
              <span className="text-sm font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
                Candidatures totales
              </span>
            </div>
            <div className="w-px h-20 bg-secondaryHex-200 dark:bg-secondaryHex-700" />
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-3">
                <UserPlus className="w-8 h-8 text-primaryHex-600 dark:text-primaryHex-400" />
              </div>
              <span className="text-3xl font-bold text-secondaryHex-900 dark:text-secondaryHex-50">
                {annonceData.candidatures.nouveaux}
              </span>
              <span className="text-sm font-medium text-secondaryHex-600 dark:text-secondaryHex-400">
                Nouvelles candidatures
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}