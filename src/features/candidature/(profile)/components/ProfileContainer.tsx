"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import Link from "next/link";
import { ResumeItem } from "./ResumeItem";
import { ProfilePreferencesSection } from "./ProfilePreferencesSection";
import { ProfileContactInfo } from "./ProfileContactInfo";
import { ProfileAboutInfo } from "./ProfileAboutInfo";
import { useProfile } from "../hooks/use-profile";
import {
  ProfileHeaderSkeleton,
  ProfileAboutSkeleton,
  ProfileContactSkeleton,
  ProfileResumeSkeleton,
} from "./skeletons";

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
        ) : profile ? (
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              {profile.profile_picture ? (
                <AvatarImage
                  src={URL.createObjectURL(profile.profile_picture)}
                  alt={`${profile.first_name} ${profile.last_name}`}
                />
              ) : null}
              <AvatarFallback>
                {[profile.first_name, profile.last_name]
                  .filter(Boolean)
                  .map((n) => n?.[0])
                  .join("")
                  .toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold">
                {[profile.first_name, profile.last_name]
                  .filter(Boolean)
                  .join(" ") || "No name provided"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {profile.city_uuid && profile.country
                  ? `${profile.city_uuid}, ${profile.country}`
                  : "No location provided"}
              </p>
            </div>
          </div>
        ) : null}

        <div className="space-y-8">
          {/* About Section */}
          {isLoading ? (
            <ProfileAboutSkeleton />
          ) : profile ? (
            <ProfileAboutInfo bio={profile.bio} skills={profile.skills} />
          ) : null}

          <Separator />

          {/* Contact Section */}
          {isLoading ? (
            <ProfileContactSkeleton />
          ) : profile ? (
            <ProfileContactInfo
              phone={profile.phone}
              address={profile.address}
              birthdate={profile.birthdate}
              isMale={profile.is_male}
              postalCode={profile.postal_code}
              city={profile.city_uuid}
              country={profile.country}
            />
          ) : null}

          <Separator />

          {/* Resume Section */}
          {isLoading ? (
            <ProfileResumeSkeleton />
          ) : profile ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">CV</h3>
              <div className="space-y-3">
                <ResumeItem title="Postuly CV" subtitle="Non validé" />
                <ResumeItem
                  title="Resume_LASTNAME.pdf"
                  subtitle="Ajouté le 19 Fev 2024"
                />
              </div>
            </div>
          ) : null}

          <Separator />

          {/* Preferences Section - Always visible */}
          <ProfilePreferencesSection />
        </div>
      </div>
    </div>
  );
}
