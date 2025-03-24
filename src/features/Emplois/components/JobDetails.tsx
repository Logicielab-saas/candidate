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
  ArrowRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
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

export function JobDetails() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedJobSlug] = useQueryState("job");
  const { toast } = useToast();

  // Fetch job details
  const { data: job, isLoading } = useEmploisBySlug(selectedJobSlug);

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

  const sanitizedHTML = job?.html_description
    ? DOMPurify.sanitize(job.html_description)
    : "";

  if (isLoading) {
    return (
      <Card className="sticky top-14">
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">
          <LoaderOne />
        </CardContent>
      </Card>
    );
  }

  if (!job) {
    return (
      <Card className="sticky top-14">
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">
          Sélectionnez une offre pour voir les détails
        </CardContent>
      </Card>
    );
  }

  // Format salary based on type and available values
  const formatSalary = () => {
    if (job.salaryType === "invoice" && job.startPrice && job.endPrice) {
      return `${job.startPrice} - ${job.endPrice} MAD`;
    }
    if (job.normalPrice) {
      return `${job.normalPrice} MAD`;
    }
    return "Non spécifié";
  };

  // Format working hours
  const formatWorkingHours = () => {
    if (job.minWorkingHours && job.maxWorkingHours) {
      return `${job.minWorkingHours}-${job.maxWorkingHours}h${
        job.durationType ? `/${job.durationType}` : ""
      }`;
    }
    if (job.workingHours) {
      return `${job.workingHours}h${
        job.durationType ? `/${job.durationType}` : ""
      }`;
    }
    return "Non spécifié";
  };

  return (
    <Card className="sticky top-14">
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
                <Tooltip>
                  <TooltipTrigger>
                    <span
                      className={cn(
                        "h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-accent rounded-full",
                        isBookmarked && "text-primary hover:text-primary/80"
                      )}
                      onClick={handleBookmark}
                    >
                      <Heart
                        className={cn(
                          "h-6 w-6",
                          isBookmarked && "fill-current"
                        )}
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ajouter aux favoris</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Key Information */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {job.employeesNum && (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{job.employeesNum} poste(s)</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formatWorkingHours()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Euro className="h-4 w-4" />
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
                Date limite: {new Date(job.expireDate).toLocaleDateString()}
              </span>
            </div>
          )}

          <Button size="sm" className="w-full" asChild>
            <Link
              href={
                job.applied
                  ? `/profile/my-jobs?tab=sent-applications`
                  : `/job-apply/${job.slug}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.applied ? "Déjà postulé" : "Postuler"}{" "}
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
            <h3 className="font-semibold mb-2">Description du poste</h3>
            <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none dark:prose-invert">
              {parse(sanitizedHTML)}
            </div>
          </div>

          {/* Requirements */}
          {job.emploi_requirements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Prérequis</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                {job.emploi_requirements.map((req) => (
                  <li key={req.requirement}>{req.requirement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills
          {job.emploi_skills.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Compétences requises</h3>
              <div className="flex flex-wrap gap-2">
                {job.emploi_skills.map((skill) => (
                  <Badge key={skill.uuid} variant="outline">
                    {skill.resumeskill_name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
*/}
          {/* Questions Preview
          {job.emploi_questions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Questions de candidature</h3>
              <div className="space-y-3">
                {job.emploi_questions.map((question) => (
                  <div key={question.uuid} className="text-sm">
                    <p className="font-medium">{question.title}</p>
                    {question.description && (
                      <p className="text-muted-foreground mt-1">
                        {question.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
