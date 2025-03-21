import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmploisDetails } from "@/core/interfaces";
import { iconContainerStyle } from "@/core/styles/icon-container.style";
import { BriefcaseIcon, CalendarIcon, ClockIcon, EuroIcon } from "lucide-react";

interface AnnonceJobDetailsProps {
  annonce: EmploisDetails;
}

export function AnnonceJobDetails({ annonce }: AnnonceJobDetailsProps) {
  const hasSalary =
    annonce.salaryType &&
    (annonce.normalPrice || (annonce.startPrice && annonce.endPrice));
  const hasSchedule =
    annonce.minWorkingHours && annonce.maxWorkingHours && annonce.durationType;
  const hasDuration = annonce.workingDuration && annonce.durationType;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du poste</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Salary */}
        {hasSalary && (
          <div className="flex items-start gap-4">
            <div className={iconContainerStyle}>
              <EuroIcon className="h-5 w-5 text-primaryHex-600" />
            </div>
            <div>
              <h3 className="font-medium">Salaire</h3>
              <p className="text-sm text-muted-foreground">
                {annonce.salaryType === "range" &&
                annonce.startPrice &&
                annonce.endPrice
                  ? `${annonce.startPrice}€ - ${annonce.endPrice}€`
                  : `${annonce.normalPrice}€`}
                {annonce.durationType && `/${annonce.durationType}`}
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
              <h3 className="font-medium">Type de contrat</h3>
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
              <h3 className="font-medium">Durée</h3>
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
              <h3 className="font-medium">Horaires</h3>
              <p className="text-sm text-muted-foreground">
                {annonce.minWorkingHours}-{annonce.maxWorkingHours}h
                {annonce.durationType && `/${annonce.durationType}`}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
