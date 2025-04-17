import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmploisDetails } from "@/core/interfaces";
import { iconContainerStyle } from "@/core/styles/icon-container.style";
import { BriefcaseIcon, CalendarIcon, ClockIcon, EuroIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface AnnonceJobDetailsProps {
  annonce: EmploisDetails;
}

export function AnnonceJobDetails({ annonce }: AnnonceJobDetailsProps) {
  const tCommon = useTranslations("common");
  const t = useTranslations("annonces");

  const hasSalary =
    annonce.salaryType &&
    (annonce.normalPrice || (annonce.startPrice && annonce.endPrice));
  const hasSchedule =
    annonce.minWorkingHours && annonce.maxWorkingHours && annonce.durationType;
  const hasDuration = annonce.workingDuration && annonce.durationType;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tCommon("labels.jobDetails")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Salary */}
        {hasSalary && (
          <div className="flex items-start gap-4">
            <div className={iconContainerStyle}>
              <EuroIcon className="h-5 w-5 text-primaryHex-600" />
            </div>
            <div>
              <h3 className="font-medium">{tCommon("labels.salary")}</h3>
              <p className="text-sm text-muted-foreground">
                {annonce.salaryType === "range" &&
                annonce.startPrice &&
                annonce.endPrice
                  ? t("details.jobDetails.salary.range", {
                      start: annonce.startPrice,
                      end: annonce.endPrice,
                    })
                  : t("details.jobDetails.salary.fixed", {
                      amount: annonce.normalPrice || 0,
                    })}
                {annonce.durationType &&
                  t("details.jobDetails.salary.perDuration", {
                    duration: annonce.durationType,
                  })}
              </p>
            </div>
          </div>
        )}

        {/* Contract Type */}
        {annonce.emploi_contracts.length > 0 && (
          <div className="flex items-start gap-4">
            <div className={iconContainerStyle}>
              <BriefcaseIcon className="h-5 w-5 text-primaryHex-600" />
            </div>
            <div>
              <h3 className="font-medium">{tCommon("labels.contractType")}</h3>
              <p className="text-sm text-muted-foreground">
                {annonce.emploi_contracts
                  .map((contract) => contract.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Duration */}
        {hasDuration && (
          <div className="flex items-start gap-4">
            <div className={iconContainerStyle}>
              <CalendarIcon className="h-5 w-5 text-primaryHex-600" />
            </div>
            <div>
              <h3 className="font-medium">{tCommon("labels.duration")}</h3>
              <p className="text-sm text-muted-foreground">
                {annonce.workingDuration} {annonce.durationType}
              </p>
            </div>
          </div>
        )}

        {/* Schedule */}
        {hasSchedule && (
          <div className="flex items-start gap-4">
            <div className={iconContainerStyle}>
              <ClockIcon className="h-5 w-5 text-primaryHex-600" />
            </div>
            <div>
              <h3 className="font-medium">{tCommon("labels.schedule")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("details.jobDetails.schedule.range", {
                  min: annonce.minWorkingHours || 0,
                  max: annonce.maxWorkingHours || 0,
                  duration: annonce.durationType || "",
                })}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
