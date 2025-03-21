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

  const sanitizedHTML = DOMPurify.sanitize(job?.html_description || "");

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

  return (
    <Card className="sticky top-14">
      <CardHeader>
        <div className="space-y-4">
          {/* Job Title, Location and Actions */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold leading-tight">{job.title}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{job.company_name}</span>
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{job.city_name}</span>
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
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{job.employeesNum} poste(s)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>
                {job.minWorkingHours}-{job.maxWorkingHours}h/{job.durationType}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Euro className="h-4 w-4" />
              <span>
                {job.salaryType === "range"
                  ? `${job.startPrice}€ - ${job.endPrice}€`
                  : `${job.normalPrice}€`}
                /{job.durationType}
              </span>
            </div>
          </div>

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
            <Link href={`/job-apply?jobId=${job.uuid}`}>
              Postuler <ArrowRight className="h-4 w-4" />
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
            <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none">
              {parse(sanitizedHTML)}
            </div>
          </div>

          {/* Requirements */}
          {job.emploi_requirements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Prérequis</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                {job.emploi_requirements.map((req) => (
                  <li key={req.uuid}>{req.requirement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {job.emploi_skills.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Compétences requises</h3>
              <div className="flex flex-wrap gap-2">
                {job.emploi_skills.map((skill) => (
                  <span
                    key={skill}
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs",
                      "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Questions */}
          {job.emploi_questions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Questions de candidature</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                {job.emploi_questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
