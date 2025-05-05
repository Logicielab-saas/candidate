import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EmploisDetails } from "@/core/interfaces";
import { ArrowRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useJobBookmark } from "@/core/utils/job-bookmark-handler";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { hasAccessToken } from "@/lib/check-access-token";
import { formatDate } from "@/core/utils/date";

interface AnnonceActionsProps {
  annonce: EmploisDetails;
}

export function AnnonceActions({ annonce }: AnnonceActionsProps) {
  const tCommon = useTranslations("common");
  const t = useTranslations("annonces");
  const locale = useLocale();

  const isAuthenticated = hasAccessToken();

  const { isSaved, isProcessing, toggleSaved } = useJobBookmark({
    initialIsSaved: annonce.saved,
    jobId: annonce.uuid,
    jobSlug: annonce.slug,
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Apply Button */}
          {annonce.applied ? (
            <Button size="lg" className="w-full" disabled={annonce.applied}>
              <span>{tCommon("actions.alreadyApplied")}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full"
              disabled={annonce.applied}
              asChild
            >
              <Link href={`/job-apply/${annonce.slug}`}>
                <span>{tCommon("actions.apply")}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}

          {/* Save Button */}
          {isAuthenticated && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSaved();
              }}
              size="lg"
              className={cn(
                "w-full",
                isProcessing && "opacity-50 cursor-not-allowed"
              )}
              disabled={isProcessing}
            >
              <Heart
                className={cn(
                  "mr-2 h-4 w-4",
                  isSaved && "fill-current text-primary",
                  isProcessing && "animate-pulse"
                )}
              />
              <span>
                {isSaved ? tCommon("actions.saved") : tCommon("actions.save")}
              </span>
            </Button>
          )}

          {/* Deadline Info */}
          {annonce.expireDate && (
            <p className="text-sm text-muted-foreground text-center">
              {t("details.jobDetails.deadline", {
                date: formatDate(
                  annonce.expireDate,
                  "EEEE dd MMMM yyyy",
                  locale
                ),
              })}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
