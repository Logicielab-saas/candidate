import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { type JobDetails } from "@/core/mockData/annonces";
import { spanBadgeStyle } from "@/core/styles/span-badge.style";
import { Avatar } from "@radix-ui/react-avatar";
import { Building2, Flag, MapPin, Users2 } from "lucide-react";
import { useCallback, useState } from "react";
import { ReportJobDialog } from "@/features/candidature/(profile)/components/my-jobs/ReportJobDialog";
import { ShareJobPopover } from "@/features/Home/components/ShareJobPopover";
import { cn } from "@/lib/utils";

interface AnnonceHeaderProps {
  annonce: JobDetails;
}

export function AnnonceHeader({ annonce }: AnnonceHeaderProps) {
  const [openReportDialog, setOpenReportDialog] = useState(false);

  const handleReport = useCallback(() => {
    setOpenReportDialog(true);
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-start gap-6">
        {/* Company Logo */}
        <div className="relative h-16 w-16">
          <Avatar>
            <AvatarImage
              src="/placeholder.png"
              alt={annonce.baseInformation.jobTitle}
            />
            <AvatarFallback>
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">
                {annonce.baseInformation.jobTitle}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {annonce.baseInformation.promotionLocation}
                </span>
                <span className="text-xs">•</span>
                <Users2 className="h-4 w-4" />
                <span className="text-sm">
                  {annonce.baseInformation.numberOfPeople} poste
                  {annonce.baseInformation.numberOfPeople !== "1" && "s"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 md:w-auto md:px-4 flex items-center justify-center">
                <ShareJobPopover
                  jobTitle={annonce.baseInformation.jobTitle}
                  companyName="Company Name" // TODO: Add company name from data
                  jobLocation={annonce.baseInformation.promotionLocation}
                />
              </div>
              <div
                className={cn(
                  "h-9 w-9 flex items-center justify-center cursor-pointer",
                  "text-destructive hover:text-destructive/80 hover:bg-accent rounded-full"
                )}
                onClick={handleReport}
              >
                <Flag className="h-6 w-6" />
              </div>
            </div>
          </div>

          <ReportJobDialog
            open={openReportDialog}
            onOpenChange={setOpenReportDialog}
            jobId={annonce.id}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {annonce.jobTypeInformation.contractTypes.map((type) => (
              <span key={type} className={spanBadgeStyle}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
