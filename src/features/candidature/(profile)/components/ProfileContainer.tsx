"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import Link from "next/link";
import { ResumeItem } from "./ResumeItem";
import { ProfilePreferencesSection } from "./ProfilePreferencesSection";
import { ProfileContactInfo } from "./ProfileContactInfo";
import { ProfileAboutInfo } from "./ProfileAboutInfo";

export function ProfileContainer() {
  return (
    <>
      <div className="w-full space-y-8">
        <div className="flex items-center justify-end">
          <Link href="/edit/profile">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div>
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  Sarah Connor
                </h3>
                <p className="text-sm text-muted-foreground">
                  sarah@example.com
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <ProfileAboutInfo />

            <Separator />

            <ProfileContactInfo />

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">CV</h3>
              <div className="space-y-3">
                <ResumeItem title="IndeedCV" subtitle="Non validé" />
                <ResumeItem
                  title="Resume_LASTNAME.pdf"
                  subtitle="Ajouté le 19 Fev 2024"
                />
              </div>
            </div>

            <Separator />

            {/* Preferences Section */}
            <ProfilePreferencesSection />
          </div>
        </div>
      </div>
    </>
  );
}
