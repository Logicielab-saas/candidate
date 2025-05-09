import LoaderOne from "@/components/ui/loader-one";
import { ProfileContainer } from "@/features/candidature/(profile)/components/ProfileContainer";
import { ProfilePreferencesSection } from "@/features/candidature/(profile)/components/ProfilePreferencesSection";
import { Suspense } from "react";

export default async function ProfilePage() {
  return (
    <div className="w-full space-y-8">
      <Suspense
        fallback={
          <div>
            <LoaderOne />
          </div>
        }
      >
        <ProfileContainer />
        {/* Preferences Section - Always visible */}
        <ProfilePreferencesSection />
      </Suspense>
    </div>
  );
}
