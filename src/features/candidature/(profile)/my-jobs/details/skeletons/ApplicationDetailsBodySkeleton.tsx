/**
 * ApplicationDetailsBodySkeleton - Loading placeholder for ApplicationDetailsBody
 *
 * This component provides a loading skeleton that matches the structure and layout
 * of the ApplicationDetailsBody component, maintaining visual consistency during data fetching.
 * It includes placeholders for contact information, resume, cover letter, additional files,
 * and questionnaire responses.
 */
"use client";

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function ApplicationDetailsBodySkeleton() {
  return (
    <Card className="flex flex-col gap-4 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Skeleton className="h-8 w-64" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Contact Information Section */}
        <div className="shadow dark:border p-4 rounded-lg flex flex-col gap-4">
          <Skeleton className="h-6 w-48" /> {/* Section title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Skeleton className="h-5 w-28" /> {/* Label */}
                <Skeleton className="h-5 w-40" /> {/* Value */}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Skeleton className="h-5 w-28" /> {/* Label */}
                <Skeleton className="h-5 w-56" /> {/* Value */}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Skeleton className="h-5 w-28" /> {/* Label */}
                <Skeleton className="h-5 w-36" /> {/* Value */}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Skeleton className="h-5 w-28" /> {/* Label */}
                <Skeleton className="h-5 w-48" /> {/* Value */}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Resume Section */}
        <div className="shadow dark:border p-4 rounded-lg">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-40" /> {/* Section title */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-12 w-12 rounded-lg" /> {/* File icon */}
              <div className="space-y-1">
                <Skeleton className="h-5 w-48" /> {/* Filename */}
                <Skeleton className="h-4 w-32" /> {/* File info */}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Cover Letter Section */}
        <div className="shadow dark:border p-4 rounded-lg flex flex-col items-start gap-2">
          <Skeleton className="h-6 w-36" /> {/* Section title */}
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <Separator />

        {/* Additional Files Section */}
        <div className="shadow dark:border p-4 rounded-lg flex flex-col items-start gap-2">
          <Skeleton className="h-6 w-48" /> {/* Section title */}
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="h-5 w-5" /> {/* Icon */}
            <Skeleton className="h-5 w-36" /> {/* Text */}
          </div>
        </div>

        <Separator />

        {/* Questions and Answers Section */}
        <div className="shadow dark:border p-4 rounded-lg flex flex-col gap-4">
          <Skeleton className="h-6 w-40" /> {/* Section title */}
          <div className="space-y-4">
            {/* Question 1 */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            {/* Question 2 */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        <Separator />
      </CardContent>
    </Card>
  );
}
