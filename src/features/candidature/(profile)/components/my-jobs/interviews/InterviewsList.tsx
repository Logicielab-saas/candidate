/**
 * InterviewsList - Displays all interviews grouped by their status
 *
 * This component organizes interviews into three sections:
 * 1. Invited - Interviews the candidate has been invited to
 * 2. Pending - Interviews awaiting confirmation or scheduling
 * 3. Past - Completed interviews
 *
 * Props:
 * - interviews: Array of all Interview objects
 */
"use client";

import { Separator } from "@/components/ui/separator";
import { Interview } from "@/core/interfaces/interview";
import { InvitedInterviews } from "./InvitedInterviews";
import { PendingInterviews } from "./PendingInterviews";
import { PastInterviews } from "./PastInterviews";

interface InterviewsListProps {
  interviews: Interview[];
}

export function InterviewsList({ interviews }: InterviewsListProps) {
  return (
    <div className="space-y-6">
      {/* Interviews where candidate has been invited */}
      <InvitedInterviews
        interviews={interviews.filter(
          (interview) => interview.interviewStatus === "INVITED"
        )}
      />
      <Separator className="bg-primaryHex-700" />

      {/* Interviews pending confirmation or scheduling */}
      <PendingInterviews
        interviews={interviews.filter(
          (interview) => interview.interviewStatus === "PENDING"
        )}
      />
      <Separator className="bg-primaryHex-700" />

      {/* Past/completed interviews */}
      <PastInterviews
        interviews={interviews.filter(
          (interview) => interview.interviewStatus === "PASSED"
        )}
      />
    </div>
  );
}
