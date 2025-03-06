import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type JobDetails } from "@/core/mockData/annonces";
import { iconContainerStyle } from "@/core/styles/icon-container.style";
import {
  formatDuration,
  formatSalary,
  formatSchedule,
} from "@/core/utils/format-annonce-details";
import { BriefcaseIcon, CalendarIcon, ClockIcon, EuroIcon } from "lucide-react";

interface AnnonceJobDetailsProps {
  annonce: JobDetails;
}

export function AnnonceJobDetails({ annonce }: AnnonceJobDetailsProps) {
  const { salaryInformation, jobTypeInformation } = annonce;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du poste</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Salary */}
        <div className="flex items-start gap-4">
          <div className={iconContainerStyle}>
            <EuroIcon className="h-5 w-5 text-primaryHex-600" />
          </div>
          <div>
            <h3 className="font-medium">Salaire</h3>
            <p className="text-sm text-muted-foreground">
              {formatSalary(salaryInformation)}
            </p>
          </div>
        </div>

        {/* Contract Type */}
        <div className="flex items-start gap-4">
          <div className={iconContainerStyle}>
            <BriefcaseIcon className="h-5 w-5 text-primaryHex-600" />
          </div>
          <div>
            <h3 className="font-medium">Type de contrat</h3>
            <p className="text-sm text-muted-foreground">
              {jobTypeInformation.contractTypes.join(", ")}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-start gap-4">
          <div className={iconContainerStyle}>
            <CalendarIcon className="h-5 w-5 text-primaryHex-600" />
          </div>
          <div>
            <h3 className="font-medium">Durée</h3>
            <p className="text-sm text-muted-foreground">
              {formatDuration(jobTypeInformation)}
            </p>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex items-start gap-4">
          <div className={iconContainerStyle}>
            <ClockIcon className="h-5 w-5 text-primaryHex-600" />
          </div>
          <div>
            <h3 className="font-medium">Horaires</h3>
            <p className="text-sm text-muted-foreground">
              {formatSchedule(jobTypeInformation)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
