"use client";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Emplois } from "@/core/interfaces";
import { Building2, MapPin } from "lucide-react";
import { spanBadgeStyle } from "@/core/styles/span-badge.style";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobCardMenu } from "./JobCardMenu";
import { useTranslations, useLocale } from "next-intl";
import { formatDate } from "@/core/utils/date";
import { hasAccessToken } from "@/lib/check-access-token";

interface JobCardProps {
  job: Emplois;
  isSelected?: boolean;
}

export function JobCard({ job, isSelected }: JobCardProps) {
  const t = useTranslations("emplois.jobCard");
  const tCommon = useTranslations("common.actions");
  const locale = useLocale();

  const isAuthenticated = hasAccessToken();

  const handleKeywordClick = (e: React.MouseEvent, skill: string) => {
    e.stopPropagation(); // Prevent job card click
    redirect(`/home?keyword=${encodeURIComponent(skill)}`);
  };

  // Ensure arrays exist with default empty arrays
  const skills = job?.skills || [];
  // const contracts = job?.contracts || [];
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
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              className="rounded-full"
              src={job.company_logo || ""}
              alt={job.title}
            />
            <AvatarFallback>
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold leading-none">{job.title}</h3>
              {isAuthenticated && (
                <div className="flex items-center gap-2">
                  <JobCardMenu jobId={job.uuid} jobSlug={job.slug} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span>{job.company_name}</span>
              </div>
              <div className="flex items-center gap-1">
                {job.city_name && job.city_name !== "null" && (
                  <>
                    <MapPin className="h-3 w-3" />
                    <span>{job.city_name}</span>
                  </>
                )}
              </div>
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
                  onClick={(e) => handleKeywordClick(e, skill)}
                  className={cn(
                    spanBadgeStyle,
                    "cursor-pointer hover:bg-secondary/50 transition-colors"
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
          {/* {contracts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {contracts.map((contract, index) => (
                <span
                  key={index}
                  className={cn(
                    spanBadgeStyle,
                    "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                >
                  {contract}
                </span>
              ))}
            </div>
          )} */}
          <div className="text-xs text-muted-foreground flex justify-between">
            {job.views === 1
              ? t("views", { count: job.views })
              : t("viewsPlural", { count: job.views })}
            {" • "}
            {job.postule === 1
              ? t("applied", { count: job.postule })
              : t("appliedPlural", { count: job.postule })}
            {" • "}
            {t(`status.${job.status}`)}
            {job.saved && ` • ${tCommon("saved")}`}
            <div className="text-end">
              {formatDate(job.created_at, "PPP", locale)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
