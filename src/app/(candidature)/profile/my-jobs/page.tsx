import { Suspense } from "react";
import { MyJobsContainer } from "@/features/candidature/(profile)/components/my-jobs/MyJobsContainer";
import { Loader2 } from "lucide-react";

export default function MyJobsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <MyJobsContainer />
    </Suspense>
  );
}
