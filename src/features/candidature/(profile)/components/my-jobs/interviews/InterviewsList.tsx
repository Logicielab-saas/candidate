"use client";

import { Separator } from "@/components/ui/separator";
import { mockInterviews } from "@/core/mockData/jobs";
import { InvitedInterviews } from "./InvitedInterviews";
import { PendingInterviews } from "./PendingInterviews";
import { PastInterviews } from "./PastInterviews";

export function InterviewsList() {
  return (
    <div className="space-y-6">
      <InvitedInterviews
        interviews={mockInterviews.filter(
          (interview) => interview.interviewStatus === "INVITED"
        )}
      />
      <Separator className="bg-primaryHex-700" />
      <PendingInterviews
        interviews={mockInterviews.filter(
          (interview) => interview.interviewStatus === "PENDING"
        )}
      />
      <Separator className="bg-primaryHex-700" />
      <PastInterviews
        interviews={mockInterviews.filter(
          (interview) => interview.interviewStatus === "PASSED"
        )}
      />
    </div>
  );
}
