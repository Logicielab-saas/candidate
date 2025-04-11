import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { spanBadgeStyle } from "@/core/styles/span-badge.style";
import { Avatar } from "@radix-ui/react-avatar";
import { Building2, Flag, MapPin, Users2 } from "lucide-react";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { ShareJobPopover } from "@/features/Emplois/components/ShareJobPopover";
import { cn } from "@/lib/utils";
import type { EmploisDetails } from "@/core/interfaces";

const ReportJobDialog = dynamic(
  () => import("@/components/shared/ReportJobDialog"),
  { ssr: false }
);

interface AnnonceHeaderProps {
  annonce: EmploisDetails;
}

export function AnnonceHeader({ annonce }: AnnonceHeaderProps) {
  const [openReportDialog, setOpenReportDialog] = useState(false);

  const handleReport = useCallback(() => {
    setOpenReportDialog(true);
  }, []);

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-start gap-4 sm:gap-6">
        {/* Company Logo */}
        <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
          <Avatar>
            <AvatarImage
              className="rounded-full"
              src={annonce.company_logo || ""}
              alt={annonce.title}
            />
            <AvatarFallback>
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-semibold line-clamp-2">
                {annonce.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                {annonce.city_name && (
                  <>
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{annonce.city_name}</span>
                    <span className="text-xs hidden sm:inline">•</span>{" "}
                  </>
                )}
                {annonce.employeesNum && (
                  <>
                    <Users2 className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">
                      {annonce.employeesNum} poste
                      {annonce.employeesNum !== 1 && "s"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-start">
              <div className="h-8 w-8 sm:h-9 sm:w-9 md:w-auto md:px-4 flex items-center justify-center rounded-full hover:bg-accent">
                <ShareJobPopover
                  jobTitle={annonce.title}
                  companyName={annonce.company_name || ""}
                  jobLocation={annonce.city_name || ""}
                  slug={annonce.slug}
                />
              </div>
              <button
                type="button"
                className={cn(
                  "h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center",
                  "text-destructive hover:text-destructive/80 hover:bg-accent rounded-full"
                )}
                onClick={handleReport}
              >
                <Flag className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>

          {openReportDialog && (
            <ReportJobDialog
              open={openReportDialog}
              onOpenChange={setOpenReportDialog}
              jobId={annonce.uuid}
            />
          )}

          {/* Tags */}
          {annonce.emploi_contracts.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {annonce.emploi_contracts.map((contract) => (
                <span key={contract.uuid} className={spanBadgeStyle}>
                  {contract.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
