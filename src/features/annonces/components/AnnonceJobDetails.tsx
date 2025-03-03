import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalaryDisplayType } from "@/core/enums/salary.enum";
import { type Annonce } from "@/core/mockData/annonces";
import { BriefcaseIcon, CalendarIcon, ClockIcon, EuroIcon } from "lucide-react";

interface AnnonceJobDetailsProps {
  annonce: Annonce;
}

export function AnnonceJobDetails({ annonce }: AnnonceJobDetailsProps) {
  const { salaryInformation, jobTypeInformation } = annonce;

  function formatSalary() {
    if (salaryInformation?.displayType === SalaryDisplayType.RANGE) {
      return `${salaryInformation.minSalary}€ - ${
        salaryInformation.maxSalary
      }€ ${
        salaryInformation.frequency === "monthly"
          ? "par mois"
          : salaryInformation.frequency === "yearly"
          ? "par an"
          : "par heure"
      }`;
    }
    return "À négocier";
  }

  function formatSchedule() {
    if (jobTypeInformation.partTimeDetails) {
      const { hoursPerWeek, scheduleType } = jobTypeInformation.partTimeDetails;
      return `${hoursPerWeek}h/semaine - ${
        scheduleType === "FIXED" ? "Horaires fixes" : "Horaires flexibles"
      }`;
    }
    return "Temps plein";
  }

  function formatDuration() {
    if (jobTypeInformation.cddDetails) {
      return `${jobTypeInformation.cddDetails.duration} mois`;
    }
    if (jobTypeInformation.internshipDetails) {
      return `${jobTypeInformation.internshipDetails.duration} mois`;
    }
    if (jobTypeInformation.interimDetails) {
      return `${jobTypeInformation.interimDetails.duration} mois`;
    }
    return "CDI";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du poste</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Salary */}
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <EuroIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Salaire</h3>
            <p className="text-sm text-muted-foreground">{formatSalary()}</p>
          </div>
        </div>

        {/* Contract Type */}
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <BriefcaseIcon className="h-5 w-5 text-primary" />
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
          <div className="rounded-lg bg-primary/10 p-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Durée</h3>
            <p className="text-sm text-muted-foreground">{formatDuration()}</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <ClockIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Horaires</h3>
            <p className="text-sm text-muted-foreground">{formatSchedule()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
