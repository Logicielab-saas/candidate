/**
 * JobDetails - Displays detailed information about a selected job
 */

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  Clock,
  HandCoins,
  ArrowRight,
  Flag,
  XCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEmploisBySlug } from "../hooks/use-emplois";
import LoaderOne from "@/components/ui/loader-one";
import { Badge } from "@/components/ui/badge";
import { ShareJobPopover } from "./ShareJobPopover";
import { JobBookmarkButton } from "@/components/shared/JobBookmarkButton";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useEmplois } from "../hooks/use-emplois";
import { useTranslations, useLocale } from "next-intl";
import NotInterestedDialog from "./NotInterestedDialog";
import { hasAccessToken } from "@/lib/check-access-token";
import { formatDate } from "@/core/utils/date";

const ReportJobDialog = dynamic(
  () => import("@/components/shared/ReportJobDialog"),
  { ssr: false }
);

export function JobDetails() {
  const [selectedJobId, setSelectedJobId] = useQueryState("job");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isNotInterestedOpen, setIsNotInterestedOpen] = useState(false);
  const { data: jobs } = useEmplois();

  const t = useTranslations("emplois.jobDetails");
  const tCommon = useTranslations("common.actions");
  const locale = useLocale();

  const isAuthenticated = hasAccessToken();

  // Set default job if none is selected and jobs are available
  useEffect(() => {
    if (!selectedJobId && jobs?.length > 0) {
      setSelectedJobId(jobs[0].slug);
    }
  }, [selectedJobId, jobs, setSelectedJobId]);

  // Fetch job details
  const { data: job, isLoading } = useEmploisBySlug(selectedJobId);

  const sanitizedHTML = job?.html_description
    ? DOMPurify.sanitize(job.html_description)
    : "";

  if (isLoading) {
    return (
      <Card className="sticky top-1">
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">
          <LoaderOne />
        </CardContent>
      </Card>
    );
  }

  if (!job) {
    return (
      <Card className="sticky top-1">
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">
          {t("selectJob")}
        </CardContent>
      </Card>
    );
  }

  const handleNotInterestedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotInterestedOpen(true);
  };

  // Format salary based on type and available values
  const formatSalary = () => {
    if (job.salaryType === "invoice" && job.startPrice && job.endPrice) {
      return t("salary.range", {
        start: job.startPrice,
        end: job.endPrice,
      });
    }
    if (job.normalPrice) {
      return t("salary.fixed", { amount: job.normalPrice });
    }
    return t("salary.unspecified");
  };

  // Format working hours
  const formatWorkingHours = () => {
    if (job.minWorkingHours && job.maxWorkingHours) {
      return t("workingHours.range", {
        min: job.minWorkingHours,
        max: job.maxWorkingHours,
        duration: job.durationType ? `/${job.durationType}` : "",
      });
    }
    if (job.workingHours) {
      return t("workingHours.fixed", {
        hours: job.workingHours,
        duration: job.durationType ? `/${job.durationType}` : "",
      });
    }
    return t("workingHours.unspecified");
  };

  return (
    <Card className="sticky top-1">
      <CardHeader>
        <div className="space-y-4">
          {/* Job Title, Location and Actions */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold leading-tight">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                {job.company_name && (
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{job.company_name}</span>
                  </div>
                )}
                {job.city_name && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{job.city_name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <TooltipProvider delayDuration={100}>
                {isAuthenticated && (
                  <JobBookmarkButton
                    jobId={job.uuid}
                    jobSlug={job.slug}
                    initialIsSaved={job.is_saved}
                    tooltipPosition="top"
                    iconClassName="h-6 w-6"
                    buttonStyle="action"
                  />
                )}

                <Tooltip>
                  <TooltipTrigger>
                    <ShareJobPopover
                      jobTitle={job.title}
                      companyName={job.company_name || ""}
                      jobLocation={job.city_name || ""}
                      slug={job.slug}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("actions.share")}</p>
                  </TooltipContent>
                </Tooltip>
                {isAuthenticated && (
                  <>
                    {/* Report job */}
                    <Tooltip>
                      <TooltipTrigger>
                        <span
                          className={cn(
                            "h-9 w-9 flex items-center justify-center cursor-pointer",
                            "text-destructive hover:bg-accent rounded-full"
                          )}
                          onClick={() => setIsReportDialogOpen(true)}
                        >
                          <Flag className="h-6 w-6" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tCommon("reportJob")}</p>
                      </TooltipContent>
                    </Tooltip>
                    {/* Not interested */}
                    <Tooltip>
                      <TooltipTrigger>
                        <span
                          className={cn(
                            "h-9 w-9 flex items-center justify-center cursor-pointer",
                            "text-yellow-600 hover:text-yellow-700 hover:bg-accent rounded-full"
                          )}
                          onClick={handleNotInterestedClick}
                        >
                          <XCircle className="h-6 w-6" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("actions.notInterested")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </TooltipProvider>
            </div>
          </div>

          {/* Key Information */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {job.employeesNum && (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{t("positions", { count: job.employeesNum })}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formatWorkingHours()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HandCoins className="h-4 w-4" />
              <span>{formatSalary()}</span>
            </div>
          </div>

          {/* Contract Types */}
          {job.emploi_contracts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.emploi_contracts.map((contract) => (
                <Badge key={contract.uuid} variant="secondary">
                  {contract.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Deadline if exists */}
          {job.expireDate && (
            <div className="flex items-center gap-1.5 text-sm text-yellow-600">
              <Calendar className="h-4 w-4" />
              <span>
                {t("deadline", {
                  date: formatDate(job.expireDate, "PPP", locale),
                })}
              </span>
            </div>
          )}

          <Button size="sm" className="w-full" asChild>
            <Link
              href={
                job.is_applied
                  ? `/profile/my-jobs?tab=sent-applications`
                  : `/job-apply/${job.slug}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.is_applied ? t("alreadyApplied") : t("apply")}{" "}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <div className="space-y-6 px-4">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">{t("sections.description")}</h3>
            <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none dark:prose-invert">
              {parse(sanitizedHTML)}
            </div>
          </div>

          {/* Requirements */}
          {job.emploi_requirements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">
                {t("sections.requirements")}
              </h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                {job.emploi_requirements.map((req) => (
                  <li key={req.requirement}>{req.requirement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      {isReportDialogOpen && (
        <ReportJobDialog
          open={isReportDialogOpen}
          onOpenChange={setIsReportDialogOpen}
          jobId={job.uuid}
        />
      )}
      {isNotInterestedOpen && (
        <NotInterestedDialog
          open={isNotInterestedOpen}
          onOpenChange={setIsNotInterestedOpen}
          jobId={job.uuid}
        />
      )}
    </Card>
  );
}
