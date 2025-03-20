"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import Link from "next/link";
import { ResumeItem } from "../../../../components/shared/ResumeItem";
import { ProfilePreferencesSection } from "./ProfilePreferencesSection";
import { ProfileContactInfo } from "./ProfileContactInfo";
import { ProfileAboutInfo } from "./ProfileAboutInfo";
import { useProfile } from "../hooks/use-profile";
import {
  ProfileHeaderSkeleton,
  ProfileAboutSkeleton,
  ProfileContactSkeleton,
} from "./skeletons";
import { ResumeSkeleton } from "./ResumeSkeleton";

export function ProfileContainer() {
  const { data: profile, isLoading } = useProfile();

  return (
    <div className="w-full space-y-8">
      {/* Static Edit Button - Always visible */}
      <div className="flex items-center justify-end">
        <Link href="/edit/profile">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Profile Header Section */}
        {isLoading ? (
          <ProfileHeaderSkeleton />
        ) : (
          <div className="flex items-center gap-6">
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
                  alt={`${profile?.first_name} ${profile?.last_name}`}
                />
              ) : null}
              <AvatarFallback>
                {profile
                  ? [profile.first_name, profile.last_name]
                      .filter(Boolean)
                      .map((n) => n?.[0])
                      .join("")
                      .toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold">
                {profile
                  ? [profile.first_name, profile.last_name]
                      .filter(Boolean)
                      .join(" ") || "No name provided"
                  : "No name provided"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {profile?.city_uuid && profile?.country
                  ? `${profile.city_uuid}, ${profile.country}`
                  : "No location provided"}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* About Section */}
          {isLoading ? (
            <ProfileAboutSkeleton />
          ) : (
            <ProfileAboutInfo
              bio={profile?.bio || "No biography provided"}
              skills={profile?.skills || []}
            />
          )}

          <Separator />

          {/* Contact Section */}
          {isLoading ? (
            <ProfileContactSkeleton />
          ) : (
            <ProfileContactInfo
              phone={profile?.phone || "Phone not provided"}
              address={profile?.address || "Address not provided"}
              birthdate={profile?.birthdate || "Birthdate not provided"}
              isMale={profile?.is_male || null}
              postalCode={profile?.postal_code || "Postal code not provided"}
              city={profile?.city_uuid || "City not provided"}
              country={profile?.country || "Country not provided"}
            />
          )}

          <Separator />

          {/* Resume Section */}
          {isLoading ? (
            <ResumeSkeleton />
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                {/* <ResumeItem
                  title="Postuly CV"
                  subtitle="Non validé"
                  type="postuly"
                  source="profile"
                /> */}
                <ResumeItem
                  title={`Resume_${profile?.last_name?.toUpperCase()}.pdf`}
                  subtitle="PDF format, max 2MB"
                  type="custom"
                  resumeFiles={profile?.resume_files || []}
                  source="profile"
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Preferences Section - Always visible */}
          <ProfilePreferencesSection />
        </div>
      </div>
    </div>
  );
}
