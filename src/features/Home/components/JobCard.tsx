import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Emplois } from "@/core/interfaces";
import { Building2, MapPin, Users } from "lucide-react";
import { spanBadgeStyle } from "@/core/styles/span-badge.style";
import { redirect } from "next/navigation";

interface JobCardProps {
  job: Emplois;
  isSelected?: boolean;
}

export function JobCard({ job, isSelected }: JobCardProps) {
  const handleKeywordClick = (e: React.MouseEvent, skill: string) => {
    e.stopPropagation(); // Prevent job card click
    redirect(`/home?keyword=${encodeURIComponent(skill)}`);
  };

  // Ensure arrays exist with default empty arrays
  const skills = job?.skills || [];
  const contracts = job?.contracts || [];

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        "hover:border-primary/50 hover:shadow-md",
        "cursor-pointer group",
        isSelected && "border-primary/50 shadow-md"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{job.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span>{job.company_name}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{job.city_name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{job.postule} applied</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  onClick={(e) => handleKeywordClick(e, skill.name)}
                  className={cn(
                    spanBadgeStyle,
                    "cursor-pointer hover:bg-secondary/50 transition-colors"
                  )}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
          {contracts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {contracts.map((contract, index) => (
                <span
                  key={index}
                  className={cn(
                    spanBadgeStyle,
                    "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                >
                  {contract.name}
                </span>
              ))}
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            {job.views} views • {job.status === "open" ? "Active" : "Closed"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
