import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { EmploisApplied } from "@/core/interfaces";

interface ApplicationDetailsHeaderProps {
  application: EmploisApplied;
}

export function ApplicationDetailsHeader({
  application,
}: ApplicationDetailsHeaderProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="p-4">
          <h2 className="text-xl font-bold">{application.emploi.title}</h2>
          <p className="text-md font-medium">
            {application.emploi.company_name}
          </p>
          <p className="text-sm text-muted-foreground">
            {application.emploi.city_name || "Inconnu"}
          </p>
          <p className="text-sm text-muted-foreground">
            Candidature envoyée le{" "}
            {format(new Date(application.applied_at), "d MMM yyyy", {
              locale: fr,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
