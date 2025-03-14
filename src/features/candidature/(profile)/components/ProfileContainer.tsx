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
  const { data: user, isLoading } = useProfile();

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
        ) : user ? (
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : null}
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ) : null}

        <div className="space-y-8">
          {/* About Section */}
          {isLoading ? (
            <ProfileAboutSkeleton />
          ) : user ? (
            <ProfileAboutInfo />
          ) : null}

          <Separator />

          {/* Contact Section */}
          {isLoading ? (
            <ProfileContactSkeleton />
          ) : user ? (
            <ProfileContactInfo
              phone={user.phone}
              address={user.address}
              birthdate={user.birthdate}
              isMale={user.isMale}
            />
          ) : null}

          <Separator />

          {/* Resume Section */}
          {isLoading ? (
            <ProfileResumeSkeleton />
          ) : user ? (
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
