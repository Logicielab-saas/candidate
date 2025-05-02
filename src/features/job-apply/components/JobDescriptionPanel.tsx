/**
 * JobDescriptionPanel - Displays job details for reference during application
 *
 * Shows the job title, description, and other relevant information
 * Provides a sticky panel that stays visible while the user completes the application
 */

"use client";

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
import { Separator } from "@/components/ui/separator";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmploisDetails } from "@/core/interfaces";
import { useTranslations } from "next-intl";

interface JobDescriptionPanelProps {
  jobDetails: EmploisDetails;
}

export function JobDescriptionPanel({ jobDetails }: JobDescriptionPanelProps) {
  const tCommon = useTranslations("common");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLongDescription, setIsLongDescription] = useState(false);

  // Clean HTML content for safe rendering
  const cleanDescription = DOMPurify.sanitize(
    jobDetails.html_description || ""
  );

  // Check if description is long (more than 300 characters)
  useEffect(() => {
    setIsLongDescription(cleanDescription.length > 500);
  }, [cleanDescription]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Format salary range
  const formatSalary = () => {
    if (jobDetails.startPrice && jobDetails.endPrice) {
      return `${jobDetails.startPrice} - ${jobDetails.endPrice} MAD`;
    }
    if (jobDetails.normalPrice) {
      return `${jobDetails.normalPrice} MAD`;
    }
    return tCommon("undefined");
  };

  return (
    <Card className="sticky top-4 overflow-auto max-h-[calc(100vh-8rem)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{jobDetails.title}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-1 text-sm text-muted-foreground">
          {jobDetails.city_name && (
            <>
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span className="capitalize">{jobDetails.city_name}</span>
              </div>
              <span>•</span>
            </>
          )}
          <div className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" />
            <span>
              {jobDetails.emploi_contracts
                .map((contract) => contract.name.toUpperCase())
                .join(", ")}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatSalary()}</span>
          </div>
        </div>

        {/* Additional details */}
        <div className="flex flex-wrap gap-2 mt-2">
          {jobDetails.emploi_types.map((type) => (
            <Badge key={type.uuid} variant="outline" className="text-xs">
              {type.title}
            </Badge>
          ))}

          {jobDetails.expireDate && (
            <Badge
              variant="outline"
              className="text-xs flex items-center gap-1"
            >
              <Calendar className="h-3 w-3" />
              {tCommon("applyBefore", {
                date: new Date(jobDetails.expireDate).toLocaleDateString(),
              })}
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
                <span>{tCommon("seeLess")}</span>
                <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                <span>{tCommon("seeMore")}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
