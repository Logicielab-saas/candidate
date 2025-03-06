import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Job } from "@/core/interfaces";
import { formatDistanceToNow } from "date-fns";
import { Building2, MapPin, Users, XCircle, Undo2 } from "lucide-react";
import { spanBadgeStyle } from "@/core/styles/span-badge.style";
import { JobCardMenu } from "./JobCardMenu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function JobCard({ job }: { job: Job }) {
  const [isNotInterested, setIsNotInterested] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const handleNotInterested = () => {
    setIsNotInterested(true);
    toast({
      title: "Offre masquée",
      description: "Cette offre ne s'affichera plus dans votre flux",
      variant: "default",
    });
  };

  const handleUndo = () => {
    setIsNotInterested(false);
    toast({
      title: "Action annulée",
      description: "L'offre a été restaurée dans votre flux",
      variant: "default",
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked
        ? "Offre retirée des favoris"
        : "Offre ajoutée aux favoris",
      description: isBookmarked
        ? "Cette offre a été retirée de vos favoris"
        : "Cette offre a été ajoutée à vos favoris",
      variant: "default",
    });
  };

  if (isNotInterested) {
    return (
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center gap-2 py-4">
            <XCircle className="h-8 w-8 text-yellow-600" />
            <div className="space-y-1">
              <h3 className="font-medium text-muted-foreground">
                Pas intéressé(e)
              </h3>
              <p className="text-sm text-muted-foreground/80">
                Cette offre a été masquée de votre flux
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-yellow-600 hover:text-yellow-700"
                onClick={handleUndo}
              >
                <Undo2 className="h-3 w-3 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        "hover:border-primary/50 hover:shadow-md",
        "cursor-pointer group"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{job.jobTitle}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span>{job.companyName}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{job.city}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{job.applications} applied</span>
            </div>

            <JobCardMenu
              jobId={job.id}
              onNotInterested={handleNotInterested}
              isBookmarked={isBookmarked}
              onBookmark={handleBookmark}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{job.description}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.keyWords.map((keyword) => (
              <span key={keyword} className={spanBadgeStyle}>
                {keyword}
              </span>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            Posted{" "}
            {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
