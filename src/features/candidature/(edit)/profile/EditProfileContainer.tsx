"use client";

import { EditProfileForm } from "./EditProfileForm";
import { EditProfileSkeleton } from "./EditProfileSkeleton";
import { useProfile } from "../../(profile)/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function EditProfileContainer() {
  const router = useRouter();
  const { data: profile, isLoading } = useProfile();

  return (
    <div className="container py-10 space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="flex items-center gap-2 -ml-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Edit Profile</h2>
        <p className="text-muted-foreground">
          Update your personal information and how others see you on the
          platform.
        </p>
      </div>

      {isLoading ? (
        <EditProfileSkeleton />
      ) : profile ? (
        <EditProfileForm profile={profile} />
      ) : null}
    </div>
  );
}
