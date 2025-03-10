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
  Euro,
  Heart,
  XCircle,
  ArrowRight,
  FileSignature,
  Flag,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { MOCK_ANNONCES } from "@/core/mockData/annonces";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { NotInterestedDialog } from "./NotInterestedDialog";
import { useNotInterestedStore } from "../store/not-interested.store";
import {
  formatSalary,
  formatSchedule,
  formatDuration,
} from "@/core/utils/format-annonce-details";
import { cn } from "@/lib/utils";
import { mockJobsList } from "@/core/mockData/jobs-list";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { ReportJobDialog } from "@/features/candidature/(profile)/components/my-jobs/ReportJobDialog";
import { ShareJobPopover } from "./ShareJobPopover";
import Link from "next/link";

export function JobDetails() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isNotInterestedOpen, setIsNotInterestedOpen] = useState(false);
  const [isSignalerOpen, setIsSignalerOpen] = useState(false);
  const [jobId, setJobId] = useQueryState("jobId");
  const { markAsNotInterested } = useNotInterestedStore();
  const { toast } = useToast();

  const job = MOCK_ANNONCES.find((job) => job.id === jobId);

  const jobCompanyName = mockJobsList.find(
    (job) => job.id === jobId
  )?.companyName;

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

  const handleNotInterested = () => {
    if (job) {
      markAsNotInterested(job.id);
      setJobId(null);
      toast({
        title: "Offre écartée",
        description: "Cette offre ne s'affichera plus dans votre flux",
        variant: "default",
      });
      setIsNotInterestedOpen(false);
    }
  };

  const sanitizedHTML = DOMPurify.sanitize(job?.description || "");

  if (!job) {
    return (
      <Card className="sticky top-14">
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">
          Sélectionnez une offre pour voir les détails
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="sticky top-14">
        <CardHeader>
          <div className="space-y-4">
            {/* Job Title, Location and Actions */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold leading-tight">
                  {job.baseInformation.jobTitle}
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium capitalize">
                    {jobCompanyName}
                  </span>
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium capitalize">
                    {job.baseInformation.promotionLocation}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-accent rounded-full",
                    isBookmarked && "text-primary hover:text-primary/80"
                  )}
                  onClick={handleBookmark}
                >
                  <Heart
                    className={cn("h-6 w-6", isBookmarked && "fill-current")}
                  />
                </span>
                <ShareJobPopover
                  jobTitle={job.baseInformation.jobTitle}
                  companyName={jobCompanyName || ""}
                  jobLocation={job.baseInformation.promotionLocation}
                />

                <span
                  className={cn(
                    "h-9 w-9 flex items-center justify-center cursor-pointer",
                    "text-destructive hover:bg-accent rounded-full"
                  )}
                  onClick={() => setIsSignalerOpen(true)}
                >
                  <Flag className="h-6 w-6" />
                </span>
                <span
                  className={cn(
                    "h-9 w-9 flex items-center justify-center cursor-pointer",
                    "text-yellow-600 hover:text-yellow-700 hover:bg-accent rounded-full"
                  )}
                  onClick={() => setIsNotInterestedOpen(true)}
                >
                  <XCircle className="h-6 w-6" />
                </span>
              </div>
            </div>

            {/* Key Information */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{job.baseInformation.numberOfPeople} poste(s)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{formatSchedule(job.jobTypeInformation)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileSignature className="h-4 w-4" />
                <span> {formatDuration(job.jobTypeInformation)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Euro className="h-4 w-4" />
                <span>{formatSalary(job.salaryInformation)}</span>
              </div>
            </div>

            {/* Deadline if exists */}
            {job.preferences.hasDeadline && (
              <div className="flex items-center gap-1.5 text-sm text-yellow-600">
                <Calendar className="h-4 w-4" />
                <span>
                  Date limite:{" "}
                  {formatDistanceToNow(new Date(job.preferences.deadline), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            )}
            <Button size="sm" className="w-full" asChild>
              <Link href={`/job-apply?jobId=${job.id}`}>
                Postuler <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          {/* <ScrollArea> */}
          {/* Description */}
          <div className="space-y-6 px-4">
            <div>
              <h3 className="font-semibold mb-2">Description du poste</h3>
              <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none" />
              {parse(sanitizedHTML)}
            </div>

            {/* Questions */}
            {/* {job.questions.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Questions de candidature</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                  {job.questions.map((q) => (
                    <li key={q.id}>
                      {q.question}
                      {q.isRequired && <span className="text-red-500">*</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
          {/* </ScrollArea> */}
        </CardContent>
      </Card>

      <NotInterestedDialog
        open={isNotInterestedOpen}
        onOpenChange={setIsNotInterestedOpen}
        jobId={job.id}
        onConfirm={handleNotInterested}
      />

      <ReportJobDialog
        open={isSignalerOpen}
        onOpenChange={setIsSignalerOpen}
        jobId={job.id}
      />
    </>
  );
}
