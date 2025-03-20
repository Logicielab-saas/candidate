import { QualificationsContainer } from "@/features/candidature/(profile)/qualifications/QualificationsContainer";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { PROFILE_RESUME_QUERY_KEY } from "@/features/candidature/(profile)/qualifications/hooks/use-profile-resume";
import { getProfileResume } from "@/features/candidature/(profile)/qualifications/services/resume";

export default async function ResumePage() {
  const queryClient = new QueryClient();

  // Prefetch the data on the server
  await queryClient.prefetchQuery({
    queryKey: PROFILE_RESUME_QUERY_KEY,
    queryFn: getProfileResume,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QualificationsContainer />
    </HydrationBoundary>
  );
}
