import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Job } from "@/core/interfaces";
import { formatDistanceToNow } from "date-fns";
import { Building2, MapPin, Users } from "lucide-react";
import { spanBadgeStyle } from "@/core/styles/span-badge.style";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card
      className={cn(
        "transition-all duration-200",
        "hover:border-primary/50 hover:shadow-md",
        "cursor-pointer"
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

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{job.applications} applied</span>
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
