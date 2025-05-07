/**
 * InterviewsList - Displays all interviews grouped by their status
 *
 * This component organizes interviews into three sections:
 * 1. Invited - Interviews the candidate has been invited to (status: accepted)
 * 2. Pending - Interviews awaiting confirmation or scheduling (status: pending)
 * 3. Past - Interviews that have been rejected (status: rejected)
 *
 * Props:
 * - interviews: Array of all Interview objects
 * - isLoading: Boolean indicating if data is being fetched
 * - error: Error object if fetch failed
 */
"use client";

import { Separator } from "@/components/ui/separator";
import type { Interview } from "@/core/interfaces/";
import { InvitedInterviews } from "./InvitedInterviews";
import { PendingInterviews } from "./PendingInterviews";
import { PastInterviews } from "./PastInterviews";
import LoaderOne from "@/components/ui/loader-one";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface InterviewsListProps {
  interviews: Interview[];
  isLoading: boolean;
  error: Error | null;
}

export default function InterviewsList({
  interviews,
  isLoading,
  error,
}: InterviewsListProps) {
  const t = useTranslations("myJobsPage.empty");
  const tCommon = useTranslations("common.actions");

  if (isLoading) return <LoaderOne />;

  if (error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {tCommon("error")}: {error.message}
        </AlertDescription>
      </Alert>
    );

  if (!interviews || interviews.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{t("noInterviews")}</AlertDescription>
      </Alert>
    );
  }

  // Filter interviews by status
  const invitedInterviews = interviews.filter(
    (interview) => interview.interview_status === "accepted"
  );
  const pendingInterviews = interviews.filter(
    (interview) => interview.interview_status === "pending"
  );
  const pastInterviews = interviews.filter(
    (interview) => interview.interview_status === "rejected"
  );

  return (
    <div className="space-y-6">
      {/* Interviews where candidate has been invited */}
      <InvitedInterviews interviews={invitedInterviews} />
      <Separator className="bg-primaryHex-700" />

      {/* Interviews pending confirmation or scheduling */}
      <PendingInterviews interviews={pendingInterviews} />
      <Separator className="bg-primaryHex-700" />

      {/* Past/completed interviews */}
      <PastInterviews interviews={pastInterviews} />
    </div>
  );
}
