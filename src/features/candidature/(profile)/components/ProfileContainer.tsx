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

export function ProfileContainer() {
  const { data: profile, isLoading } = useProfile();

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
                {profile?.city && profile?.country
                  ? `${profile.city}, ${profile.country}`
                  : "No location provided"}
              </p>
            </div>
          </div>
          <Link href="/edit/profile" className="mt-4 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto hover:bg-primary/10 transition-colors"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>
      )}

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
          city={profile?.city || "City not provided"}
          country={profile?.country || "Country not provided"}
        />
      )}

      <Separator />

      {/* Resume Section */}
      {isLoading ? (
        <ResumeSkeleton />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-end">
            <Link href="/profile/postuly-cv">
              <Button
                variant="default"
                size="sm"
                className="gap-2 hover:animate-pulse"
              >
                <FileText className="h-4 w-4" />
                Generate CV
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {/* <ResumeItem
                  title="Postuly CV"
                  subtitle="Non validé"
                  type="postuly"
                  source="profile"
                /> */}
            <ResumeItem
              subtitle="PDF format, max 2MB"
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
