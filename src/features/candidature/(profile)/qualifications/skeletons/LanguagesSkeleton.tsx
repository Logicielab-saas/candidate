/**
 * LanguagesSkeleton - Loading state component for the languages list
 *
 * Displays a placeholder animation while the languages data is being loaded
 */

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "../SectionHeader";
import { LanguagesIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function LanguagesSkeleton() {
  const tCommon = useTranslations("common");
  return (
    <div className="border p-4 rounded-lg shadow-sm space-y-4">
      <SectionHeader
        title={tCommon("languages")}
        icon={<LanguagesIcon className="w-6 h-6 text-primaryHex-400 mr-2" />}
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-4">
              {/* Avatar skeleton */}
              <Skeleton className="h-12 w-12 rounded-full" />

              <div className="flex-1 min-w-0 space-y-2">
                {/* Title and actions row */}
                <div className="flex items-center justify-between gap-2">
                  {/* Language name */}
                  <Skeleton className="h-6 w-24" />

                  {/* Action buttons */}

                  {/* <div className="flex gap-1">
                    <Skeleton className="h-8 w-8" />

                    <Skeleton className="h-8 w-8" />
                  </div> */}
                </div>
                {/* Proficiency badge */}
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
