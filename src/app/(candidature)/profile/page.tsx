import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ProfileContainer } from "@/features/candidature/(profile)/components/ProfileContainer";
import Link from "next/link";
import { ProfilePreferencesSection } from "@/features/candidature/(profile)/components/ProfilePreferencesSection";

export default function ProfilePage() {
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
      <ProfileContainer />
      {/* Preferences Section - Always visible */}
      <ProfilePreferencesSection />
    </div>
  );
}
