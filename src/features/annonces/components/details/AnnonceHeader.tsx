import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type JobDetails } from "@/core/mockData/annonces";
import { spanBadgeStyle } from "@/core/styles/span-badge.style";
import { Avatar } from "@radix-ui/react-avatar";
import { Building2, Flag, MapPin, Share2, Users2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useState } from "react";
import { ReportJobDialog } from "@/features/candidature/(profile)/components/my-jobs/ReportJobDialog";
import { cn } from "@/lib/utils";

interface AnnonceHeaderProps {
  annonce: JobDetails;
}

export function AnnonceHeader({ annonce }: AnnonceHeaderProps) {
  const { toast } = useToast();
  const [openReportDialog, setOpenReportDialog] = useState(false);

  const handleReport = useCallback(() => {
    setOpenReportDialog(true);
  }, []);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        variant: "success",
        title: "URL copiée",
        description: "L'URL de l'annonce a été copiée dans le presse-papiers",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier l'URL",
        variant: "destructive",
      });
      console.log(error);
    }
  }, [toast]);

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
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 md:w-auto md:px-4"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Partager</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 md:w-auto md:px-4"
                onClick={handleReport}
              >
                <Flag className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Signaler</span>
              </Button>
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
