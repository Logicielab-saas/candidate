import { ProfileContainer } from "@/features/candidature/(profile)/components/ProfileContainer";
import { ProfilePreferencesSection } from "@/features/candidature/(profile)/components/ProfilePreferencesSection";

export default async function ProfilePage() {
  return (
    <div className="w-full space-y-8">
      <ProfileContainer />
      {/* Preferences Section - Always visible */}
      <ProfilePreferencesSection />
    </div>
  );
}
