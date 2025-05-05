"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ResumeItem } from "../../../../components/shared/ResumeItem";
import { ProfileContactInfo } from "./ProfileContactInfo";
import { ProfileAboutInfo } from "./ProfileAboutInfo";
import { useProfile } from "../hooks/use-profile";
import {
  ProfileHeaderSkeleton,
  ProfileAboutSkeleton,
  ProfileContactSkeleton,
} from "./skeletons";
import { ResumeSkeleton } from "./ResumeSkeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Edit } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProfileContainer() {
  const { data: profile, isLoading } = useProfile();
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");

  const getFullName = (
    firstName: string | null | undefined,
    lastName: string | null | undefined
  ): string => {
    if (!firstName && !lastName) return tCommon("placeholders.noName");
    return [firstName, lastName]
      .filter((name): name is string => Boolean(name))
      .join(" ");
  };

  const getLocation = (
    city: string | null | undefined,
    country: string | null | undefined
  ): string => {
    if (!city || !country) return tCommon("placeholders.noLocation");
    return tCommon("location.format", { city, country });
  };

  const getInitials = (
    firstName: string | null | undefined,
    lastName: string | null | undefined
  ): string => {
    if (!firstName && !lastName) return "?";
    return [firstName, lastName]
      .filter((name): name is string => Boolean(name))
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Section */}
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex items-center gap-6 flex-1">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              {profile?.image ? (
                <AvatarImage
                  src={
                    profile.image instanceof File
                      ? URL.createObjectURL(profile.image)
                      : typeof profile.image === "string"
                      ? profile.image
                      : undefined
                  }
                  alt={getFullName(profile.first_name, profile.last_name)}
                />
              ) : null}
              <AvatarFallback>
                {getInitials(profile?.first_name, profile?.last_name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold">
                {getFullName(profile?.first_name, profile?.last_name)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getLocation(profile?.city, profile?.country)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 sm:mt-0">
            <Link href="/edit/profile" className="w-full sm:w-[170px]">
              <Button
                variant="outline"
                size="sm"
                className="w-full hover:bg-primary/10 transition-colors"
              >
                <Edit className="mr-2 h-4 w-4" />
                {tCommon("actions.editProfile")}
              </Button>
            </Link>
            <Link href="/profile/postuly-cv" className="w-full sm:w-[170px]">
              <Button variant="default" size="sm" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                {tCommon("actions.generateCV")}
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Contact Section - Moved up */}
      {isLoading ? (
        <ProfileContactSkeleton />
      ) : (
        <ProfileContactInfo
          phone={profile?.phone || tCommon("placeholders.noPhone")}
          address={profile?.address || tCommon("placeholders.noAddress")}
          birthdate={profile?.birthdate || tCommon("placeholders.noBirthdate")}
          isMale={profile?.is_male || null}
          postalCode={
            profile?.postal_code || tCommon("placeholders.noPostalCode")
          }
          city={profile?.city || tCommon("placeholders.noCity")}
          country={profile?.country || tCommon("placeholders.noCountry")}
        />
      )}

      <Separator />
      {/* About Section */}
      {isLoading ? (
        <ProfileAboutSkeleton />
      ) : (
        <ProfileAboutInfo
          bio={profile?.bio || tCommon("placeholders.noBio")}
          skills={profile?.skills || []}
        />
      )}

      <Separator />

      {/* Resume Section */}
      {isLoading ? (
        <ResumeSkeleton />
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            <ResumeItem
              subtitle={t("resume.section.subtitle")}
              type="custom"
              resumeFiles={profile?.files || []}
              source="profile"
            />
          </div>
        </div>
      )}

      <Separator />
    </div>
  );
}
