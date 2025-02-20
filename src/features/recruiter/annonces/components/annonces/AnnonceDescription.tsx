import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Gift } from "lucide-react";
import { mockAnnonceDetails } from "@/core/mockData/annonces-details-data";

interface AnnonceDescriptionProps {
  annonceId: string;
}

export function AnnonceDescription({ annonceId }: AnnonceDescriptionProps) {
  const annonceData = mockAnnonceDetails[annonceId];

  if (!annonceData) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
        Description du poste
      </h2>

      <div className="grid gap-6">
        <Card className="bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50">
          <CardContent className="flex flex-col gap-6 p-6">
            {/* Description Section */}
            <div className="flex gap-4 items-start">
              <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-2.5">
                <Briefcase className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
                  Description du poste
                </h3>
                <p className="text-secondaryHex-600 dark:text-secondaryHex-400 text-sm leading-relaxed">
                  {annonceData.description.poste}
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-secondaryHex-600 dark:text-secondaryHex-400 ml-4">
                  {annonceData.description.missions.map((mission, index) => (
                    <li key={index}>{mission}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex gap-4 items-start">
              <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-2.5">
                <GraduationCap className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
                  Profil recherché
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-secondaryHex-600 dark:text-secondaryHex-400 ml-4">
                  {annonceData.description.profil.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="flex gap-4 items-start">
              <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-2.5">
                <Gift className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
                  Ce que nous offrons
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-secondaryHex-600 dark:text-secondaryHex-400 ml-4">
                  {annonceData.description.avantages.map((avantage, index) => (
                    <li key={index}>{avantage}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
