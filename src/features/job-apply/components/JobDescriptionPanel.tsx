/**
 * JobDescriptionPanel - Displays job details for reference during application
 *
 * Shows the job title, description, and other relevant information
 * Provides a sticky panel that stays visible while the user completes the application
 */

"use client";

import { MOCK_ANNONCES } from "@/core/mockData/annonces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ContractType } from "@/core/enums/contract-type.enum";
import {
  formatSalary,
  formatSchedule,
  formatDuration,
} from "@/core/utils/format-annonce-details";
import { Separator } from "@/components/ui/separator";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Using the same type as in MOCK_ANNONCES
type JobDetails = (typeof MOCK_ANNONCES)[0];

interface JobDescriptionPanelProps {
  jobDetails: JobDetails;
}

export function JobDescriptionPanel({ jobDetails }: JobDescriptionPanelProps) {
  const {
    baseInformation,
    jobTypeInformation,
    salaryInformation,
    description,
    preferences,
  } = jobDetails;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLongDescription, setIsLongDescription] = useState(false);

  // Clean HTML content for safe rendering
  const cleanDescription = DOMPurify.sanitize(description);

  // Check if description is long (more than 300 characters)
  useEffect(() => {
    // Using a simple heuristic - if the description has more than 500 characters
    // This could be improved to check actual rendered height
    setIsLongDescription(cleanDescription.length > 500);
  }, [cleanDescription]);

  // Format contract types manually since the utility doesn't handle this specific case
  const formatContractTypes = () => {
    return jobTypeInformation.contractTypes
      .map((type) => {
        switch (type) {
          case ContractType.FULL_TIME:
            return "Full-time";
          case ContractType.PART_TIME:
            return "Part-time";
          case ContractType.CDI:
            return "CDI";
          case ContractType.CDD:
            return "CDD";
          case ContractType.INTERNSHIP:
            return "Internship";
          case ContractType.FREELANCE:
            return "Freelance";
          default:
            return type;
        }
      })
      .join(", ");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="sticky top-4 overflow-auto max-h-[calc(100vh-8rem)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          {baseInformation.jobTitle}
        </CardTitle>
        <div className="flex flex-wrap gap-1 mt-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="capitalize">
              {baseInformation.promotionLocation}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" />
            <span>{formatContractTypes()}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatSalary(salaryInformation)}</span>
          </div>
        </div>

        {/* Additional details */}
        <div className="flex flex-wrap gap-2 mt-2">
          {jobTypeInformation.partTimeDetails && (
            <Badge variant="outline" className="text-xs">
              {formatSchedule(jobTypeInformation)}
            </Badge>
          )}

          {jobTypeInformation.cddDetails && (
            <Badge variant="outline" className="text-xs">
              {formatDuration(jobTypeInformation)}
            </Badge>
          )}

          {jobTypeInformation.internshipDetails && (
            <Badge variant="outline" className="text-xs">
              {formatDuration(jobTypeInformation)}
            </Badge>
          )}

          {preferences.hasDeadline && preferences.deadline && (
            <Badge
              variant="outline"
              className="text-xs flex items-center gap-1"
            >
              <Calendar className="h-3 w-3" />
              Apply by {new Date(preferences.deadline).toLocaleDateString()}
            </Badge>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <div
          className={cn(
            "prose prose-sm max-w-none dark:prose-invert relative",
            !isExpanded && isLongDescription && "max-h-[200px] overflow-hidden"
          )}
        >
          {parse(cleanDescription)}

          {!isExpanded && isLongDescription && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
          )}
        </div>

        {isLongDescription && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full flex items-center justify-center text-muted-foreground hover:text-foreground"
            onClick={toggleExpand}
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                <span>View More</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
