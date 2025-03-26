import { ProfileContainer } from "@/features/candidature/(profile)/components/ProfileContainer";
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
        <ProfileContainer />
        {/* Preferences Section - Always visible */}
        <ProfilePreferencesSection />
      </div>
    </HydrationBoundary>
  );
}
