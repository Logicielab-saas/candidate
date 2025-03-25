"use client";

import { ApplicationDetailsHeader } from "./ApplicationDetailsHeader";
import { ApplicationDetailsBody } from "./ApplicationDetailsBody";
import { useFetchSentApplicationsDetails } from "../hooks/use-my-applied-jobs";
import { useCurrentUser } from "../../hooks/use-profile";

interface ApplicationDetailsContainerProps {
  slug: string;
}

export function ApplicationDetailsContainer({
  slug,
}: ApplicationDetailsContainerProps) {
  const { data, isLoading, error } = useFetchSentApplicationsDetails(slug);
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useCurrentUser();

  if (isLoading || profileLoading) return <div>Loading...</div>;
  if (error || profileError)
    return <div>Error: {error?.message || profileError?.message}</div>;
  if (!data) return <div>No application found</div>;

  return (
    <div className="flex flex-col gap-4">
      <ApplicationDetailsHeader application={data} />
      <ApplicationDetailsBody
        application={data}
        profile={profile}
        reponse_questions={data.reponse_questions}
      />
    </div>
  );
}
