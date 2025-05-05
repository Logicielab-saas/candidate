"use client";

import { ApplicationDetailsHeader } from "./ApplicationDetailsHeader";
import { ApplicationDetailsBody } from "./ApplicationDetailsBody";
import { useFetchSentApplicationsDetails } from "../hooks/use-my-applied-jobs";
import { useProfile } from "../../hooks/use-profile";
import { ApplicationDetailsHeaderSkeleton } from "./skeletons/ApplicationDetailsHeaderSkeleton";
import { ApplicationDetailsBodySkeleton } from "./skeletons/ApplicationDetailsBodySkeleton";
import { useTranslations } from "next-intl";

interface ApplicationDetailsContainerProps {
  slug: string;
}

export function ApplicationDetailsContainer({
  slug,
}: ApplicationDetailsContainerProps) {
  const tCommon = useTranslations("common");
  const { data, isLoading, error } = useFetchSentApplicationsDetails(slug);
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useProfile();

  if (isLoading || profileLoading)
    return (
      <div className="flex flex-col gap-4">
        <ApplicationDetailsHeaderSkeleton />
        <ApplicationDetailsBodySkeleton />
      </div>
    );
  if (error || profileError)
    return (
      <div>
        {tCommon("actions.error")}: {error?.message || profileError?.message}
      </div>
    );
  if (!data)
    //* No {variable} found text
    return <div>{tCommon("noVarFound", { variable: "applicaton" })}</div>;

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
