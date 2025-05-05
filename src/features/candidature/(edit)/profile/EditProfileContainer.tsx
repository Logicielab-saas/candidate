"use client";

import { EditProfileForm } from "./EditProfileForm";
import { EditProfileSkeleton } from "./EditProfileSkeleton";
import { useProfile } from "../../(profile)/hooks/use-profile";
import { useProfileResume } from "../../(profile)/qualifications/hooks/use-profile-resume";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function EditProfileContainer() {
  const tEditProfile = useTranslations("editProfile");
  const tCommon = useTranslations("common");

  const router = useRouter();
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: resume, isLoading: isResumeLoading } = useProfileResume();

  const isLoading = isProfileLoading || isResumeLoading;

  return (
    <div className="container py-10 space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="flex items-center gap-2 -ml-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        {tCommon("actions.back")}
      </Button>

      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          {tEditProfile("title")}
        </h2>
        <p className="text-muted-foreground">{tEditProfile("description")}</p>
      </div>

      {isLoading ? (
        <EditProfileSkeleton />
      ) : profile ? (
        <EditProfileForm
          profile={profile}
          resumeDescription={resume?.resume?.description}
        />
      ) : null}
    </div>
  );
}
