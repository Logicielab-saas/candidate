import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ProfileContainer } from "@/features/candidature/(profile)/components/ProfileContainer";
import Link from "next/link";
import { ProfilePreferencesSection } from "@/features/candidature/(profile)/components/ProfilePreferencesSection";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProfile } from "@/features/candidature/(profile)/services/profile";
import { profileKeys } from "@/features/candidature/(profile)/hooks/use-profile";

export default async function ProfilePage() {
  const queryClient = new QueryClient();

  // Prefetch the data on the server
  await queryClient.prefetchQuery({
    queryKey: profileKeys.me(),
    queryFn: getProfile,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
