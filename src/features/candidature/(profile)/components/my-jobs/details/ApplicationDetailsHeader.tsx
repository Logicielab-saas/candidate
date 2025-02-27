import { Card, CardContent } from "@/components/ui/card";
import { Company } from "@/core/types";

interface ApplicationDetailsHeaderProps {
  jobTitle: string;
  company: Company;
  location: string;
  applyTime: number;
}

const formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(new Date(timestamp));
};

export function ApplicationDetailsHeader({
  jobTitle,
  company,
  location,
  applyTime,
}: ApplicationDetailsHeaderProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="p-4">
          <h2 className="text-xl font-bold">{jobTitle}</h2>
          <p className="text-md font-medium">{company.name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
          <p className="text-sm text-muted-foreground">
            Candidature envoyée le {formatDate(applyTime)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
