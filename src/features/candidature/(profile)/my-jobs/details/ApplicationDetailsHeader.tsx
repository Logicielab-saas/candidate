import { Card, CardContent } from "@/components/ui/card";
import type { EmploisApplied } from "@/core/interfaces";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/core/utils/date";

interface ApplicationDetailsHeaderProps {
  application: EmploisApplied;
}

export function ApplicationDetailsHeader({
  application,
}: ApplicationDetailsHeaderProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const formattedDate = formatDate(
    application.created_at,
    "d MMM yyyy",
    locale
  );
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="p-4 flex items-start gap-4">
          <Avatar className="h-12 w-12">
            {application.company_logo && (
              <AvatarImage
                src={application.company_logo}
                alt={application.company_name || ""}
              />
            )}
            <AvatarFallback className="bg-muted">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-xl font-bold">{application.title}</h2>
            <p className="text-md font-medium text-muted-foreground">
              {application.company_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {application.city_name || t("locationUndefined")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("actions.applicationSentAt", {
                date: formattedDate,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
